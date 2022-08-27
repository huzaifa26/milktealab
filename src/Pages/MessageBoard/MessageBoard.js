import { useState,useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { URL } from "../../App";
import "./MessageBoard.css";
import moment from "moment-timezone";
import { io } from "socket.io-client";
import { async } from "@firebase/util";

export default function MessageBoard(props){
    const scrollRef=useRef();

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
        socket.current=io("ws://localhost:5000");
        socket.current.on("getMessage", (data) => {
            setArriavalMessage({
            sender: data.senderId,
            message: data.text,
            createdTime: Date.now(),
          });
        });
      }, []);

    useEffect(()=>{
        arriavalMessage && (currentChat && currentChat[1]?.id === arriavalMessage?.sender) && setMessage(prev=>[...prev,arriavalMessage]);
    },[arriavalMessage, currentChat])

    useEffect(()=>{
        socket.current.emit("addUser",logUser?.id);
        socket.current.on("getUsers",(users)=>{
            // console.log(users);
        });
    },[logUser])

    useEffect(()=>{
        axios.get(URL+"/user").then((res)=>{
            setUsers(res.data.res);
            console.log(res.data.res);
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
            console.log(res.data.res);
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
            cId:currentChat && currentChat[0]?.id,
            createdTime:datetime
        }

        let id2=currentChat && currentChat[1]?.id;

        await socket.current.emit("sendMessage",{
            senderId:logUser.id,
            recieverId:id2,
            text:newMessage
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
            console.log(res);
            setFecthConvo(!fetchConvo);
        }).catch((err)=>{
            console.log(err);
        })
    },[])

        useEffect(()=>{
        console.log(logUser.id);
        axios.get(URL+"/conversation/"+logUser.id).then((res)=>{
            setConversation(res.data.res);
            console.log(res.data.res);
        }).catch(err=>{
            console.log(err);
        })
    },[logUser?.id,createNewConversation])

    return(
    <div className="w-[100%] h-[100%] pt-[20px]">
        <div className="w-[91%] flex flex-col m-auto gap-[30px]">
            <select onChange={(e)=>createNewConversation(e)} className="w-[30%]">
                <option disabled selected>Create New Conversation</option>
                {users && users.map((u)=>{
                    if(u.id === logUser.id){
                        return
                    }
                    return(
                        <option value={u.id}>{u.userName}</option>
                    )
                })
                }
            </select>
            <div className="flex">
                <div class="w-[20%] min-w-[120px]  h-full flex flex-col text-gray-900  bg-gray-100">
                <ul className=" w-[100%]">
                    {conversation && conversation.map((c)=>{
                        return(
                            <li onClick={()=>{setNewMessage("");setCurrentChat(c);console.log(c)}} className="cursor-pointer hover:bg-gray-200 flex items-center gap-[8px] -[100%] h-[60px] pl-[30px]">
                                <h2>{c[1].userName}</h2>
                            </li>
                        )
                    })}
                    </ul>
                    
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
                                <div className="messageTop">
                                    <p className="messageText break-words">{m.message}</p>
                                </div>
                                <p className="messageBottom">{moment(m.createdTime).fromNow()}</p>
                            </div>
                        )})}
                        </div>
                        <div className="flex my-[20px] self-end w-[100%] py-[10px] px-[10px] bg-[#f4f5f5] rounded-[10px]">
                            <textarea onChange={(e)=>setNewMessage(e.target.value)} value={newMessage} rows={"3"} placeholder="Type your message here" className="flex-1 bg-transparent flex py-[10px] "></textarea>
                            <div className="flex flex-col justify-around items-center py-[2vh]">
                                <img className="cursor-pointer self-center w-[1.17vw] min-w-[25px]" src="./images/UploadFile.png"></img>
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
    )
}