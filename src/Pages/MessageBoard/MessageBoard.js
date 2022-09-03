import { useState,useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { URL } from "../../App";
import "./MessageBoard.css";
import moment from "moment-timezone";
import { io } from "socket.io-client";
import { async } from "@firebase/util";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../Components/Firebase";
import { ColorRing } from 'react-loader-spinner';

export default function MessageBoard(props){
    const scrollRef=useRef();
    const [showSpinner,setShowSpinner]=useState(true);
    const socket=useRef();
    const [users,setUsers]=useState([]);
    const [user,setUser]=useState([]);
    const [conversation,setConversation]=useState([]);
    const [currentChat,setCurrentChat]=useState(null);
    const [message,setMessage]=useState([]);
    const [newMessage,setNewMessage]=useState(null);
    const [arriavalMessage,setArriavalMessage]=useState(null);

    let logUser=localStorage.getItem("user");
    logUser=JSON.parse(logUser);

    useEffect(() => {
        socket.current=io("https://milktealab.herokuapp.com");
        socket.current.on("getMessage", (data) => {
            console.log(1);
            setArriavalMessage({
            sender: data.senderId,
            message: data.text,
            createdTime: Date.now(),
          });
        });
      }, []);
      
    useEffect(()=>{
        console.log(2);
        arriavalMessage && (currentChat && currentChat[1]?.id === arriavalMessage?.sender) && setMessage(prev=>[...prev,arriavalMessage]);
    },[arriavalMessage, currentChat])

    useEffect(()=>{
        socket.current.emit("addUser",logUser?.id);
        socket.current.on("getUsers",(users)=>{
            // console.log(users);
        });
    },[logUser])

    useEffect(()=>{
        axios.get(URL+"/userforConvo/"+logUser?.assignedManager+"/"+logUser?.id).then((res)=>{
            setShowSpinner(false)
            setUsers(res.data.res);
        }).catch(err=>{
            console.log(err);
        })
    },[])

    const [fetchConvo,setFecthConvo]=useState(false);


    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:"smooth"});
    },[message])

    useEffect(()=>{
        console.log(currentChat);
        let id=currentChat && currentChat[0]?.id;
        axios.get(URL+"/message/"+id).then((res)=>{
            setMessage(res.data.res);
        }).catch(err=>{
            console.log(err);
        })
    },[currentChat])

    const handlesubmit=async()=>{
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const currentTime = moment().tz(timezone).format();
        const datetime = currentTime.slice(0, 19).replace('T', ' ');

        let newMessageData={
            sId:logUser.id,
            message:newMessage,
            url:null,
            cId:currentChat && currentChat[0]?.id,
            createdTime:datetime
        }

        let id2=currentChat && currentChat[1]?.id;

        await socket.current.emit("sendMessage",{
            senderId:logUser.id,
            recieverId:id2,
            text:newMessage,
            url:null
        })

        axios.post(URL+"/message",newMessageData).then((res)=>{
            newMessageData.id=res.data.res.insertedId;
            setMessage([...message,newMessageData]);
            setNewMessage("");
        }).catch(err=>{
            console.log(err);
        })
    }

    const createNewConversation=useCallback((e)=>{
        let bool=false
        conversation?.forEach(chat => {
            if(+e.target.value === +chat[1].id){
                bool=true
            }
        });
        if (bool) return

        let user =users.find(u=>+u.id === +e.target.value)
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const currentTime = moment().tz(timezone).format();
        const datetime = currentTime.slice(0, 19).replace('T', ' ');

        let data={
            senderId:logUser.id,
            revieverId:e.target.value,
            createdTime:datetime
        }
        axios.post(URL+"/conversation",data).then((res)=>{
            setFecthConvo(!fetchConvo);
        }).catch((err)=>{
            console.log(err);
        })
    },[fetchConvo])

        useEffect(()=>{
        axios.get(URL+"/conversation/"+logUser?.id).then((res)=>{
            setConversation(res.data.res);
        }).catch(err=>{
            console.log(err);
        })
    },[logUser?.id,createNewConversation])


    const messageFileUploader=async(e)=>{
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const currentTime = moment().tz(timezone).format();
            const datetime = currentTime.slice(0, 19).replace('T', ' ');
            toast(0,{autoClose:false, toastId: 1})
    
            try{
                const storageRef = ref(storage, `/message/${e.target.files[0].name}`);
                const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
    
                uploadTask.on('state_changed', 
                (snapshot) => {
                  const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  toast.update(1, {
                    render: 'Upload is ' + p.toFixed(2) + '% done. Please Donot close the window.',
                  });
                  switch (snapshot.state) {
                    case 'paused':
                    //   console.log('Upload is paused');
                      break;
                    case 'running':
                    //   console.log('Upload is running');
                      break;
                  }
                }, 
                (error) => {
                    console.log(error);
                }, 
                () => {
                  getDownloadURL(uploadTask.snapshot.ref).then(async(url) => {
                    let id2=currentChat && currentChat[1]?.id;

                    await socket.current.emit("sendMessage",{
                        senderId:logUser.id,
                        recieverId:id2,
                        text:newMessage,
                        url,
                    })    

                    let newMessageData2={
                        sId:logUser.id,
                        message:e.target.files[0].name,
                        cId:currentChat && currentChat[0]?.id,
                        url,
                        createdTime:datetime
                    }

                    axios.post(URL+"/message",newMessageData2).then((res)=>{
                        newMessageData2.id=res.data.res.insertedId;
                        setMessage([...message,newMessageData2]);
                        setNewMessage("");
                        toast.update(1, {
                            render: 'File upload',
                            autoClose:2000
                          });
                        e.target.value="";
                    }).catch(err=>{
                        console.log(err);
                    })
                  });
                }
              );
            }catch(err){
                console.log(err);
            }
    }

    if(logUser?.role !== "franchisee"){
        return <Navigate to={"/"}/>
    }


    return(
    <>
    {showSpinner === false ?
    <div className="w-[100%] h-[100%] pt-[20px]">
        <div className="w-[91%] flex flex-col m-auto gap-[30px]">
            <select onChange={(e)=>createNewConversation(e)} className="w-[30%]">
                <option disabled selected>Create New Conversation</option>
                {users && users.map((u)=>{
                    // if(u?.id === logUser?.id){
                    //     return
                    // }
                    return(
                        <option value={u?.id}>{u.userName}</option>
                    )
                })
                }
            </select>
            <div className="flex">
                <div class="w-[20%] min-w-[120px]  h-full flex flex-col text-gray-900  bg-gray-100">
                <div className=" w-[100%]">
                    {conversation && conversation.map((c)=>{
                        return(
                            <li onClick={()=>{setNewMessage("");setCurrentChat(c);}} className="cursor-pointer hover:bg-gray-200 flex items-center gap-[8px] -[100%] h-[60px] xsm:pl-[5px] sm:pl-[10px] pl-[30px]">
                                <h2>{c[1].userName}</h2>
                            </li>
                        )
                    })}
                    </div>
                    
                </div>
                {currentChat !== null ?
                <div className="xsm:w-[100%] w-[73%] flex min-h-[450px] max-h-[35vw] mb-[20px] overflow-y-scroll xsm:p-[3px] p-[25px] bg-[#f4fdff] rounded-[50px]">
                    <div className="flex flex-col justify-between flex-1">
                        <div className="flex xsm:min-w-[100%] flex-col">
                        {message && message.map((m)=>{
                            let own=false;
                            if (m.sId === logUser.id){
                                own=true
                            }
                            return(
                            <div ref={scrollRef} key={m.id} className={own ? "message own" : "message"}>
                                
                                <div className="messageTop ">
                                    <div className="flex flex-col messageText">
                                    {(m.url !== null && m.url !== undefined) &&
                                        <a href={m.url} className="messageText break-words self-end">
                                                <img className="" src="./images/UploadFile.png" alt=""></img>
                                        </a>
                                    }
                                    <p className="messageText break-words">{m.message}</p>
                                    </div>
                                </div>
                                <p className="messageBottom">{moment(m.createdTime).fromNow()}</p>
                            </div>
                        )})}
                        </div>
                        <div className="flex my-[20px] self-end w-[100%] py-[10px] px-[10px] bg-[#f4f5f5] rounded-[10px]">
                            <textarea onChange={(e)=>setNewMessage(e.target.value)} value={newMessage} rows={"3"} placeholder="Type your message here" className="flex-1 bg-transparent flex py-[10px] "></textarea>
                            <div className="flex flex-col justify-around items-center py-[2vh]">
                                    <label for="file3">
                                        <img className="cursor-pointer self-center w-[1.17vw] min-w-[25px]" src="./images/UploadFile.png"></img>
                                    </label>
                                    <input id="file3" type={"file"} onChange={messageFileUploader} className="hidden"></input>
                                <img onClick={handlesubmit} className="cursor-pointer w-[1.17vw] min-w-[25px]" src="./images/send.png"></img>
                            </div>
                        </div>
                    </div>
                </div>
                :<h2>Please open a conversation to start a chat.</h2>
                }
            </div>
        </div>
    </div>
    :
    <div className="flex justify-center items-center h-full mt-[10px]">
        <ColorRing 
            visible={true} 
            height="80" 
            width="80" 
            ariaLabel="blocks-loading" 
            wrapperStyle={{}} 
            wrapperClass="blocks-wrapper" 
            colors={['#a4a5a5', '#a4a5a5', '#a4a5a5', '#a4a5a5', '#a4a5a5']} 
            />
    </div>
    }
    </>
    )
}

