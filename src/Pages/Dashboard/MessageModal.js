import axios from "axios";
import moment from "moment-timezone";
import { useEffect, useRef, useState } from "react";
import { URL } from "../../App";
import { io } from "socket.io-client";


export default function MessageModal(props){
    let logUser=localStorage.getItem("user");
    logUser=JSON.parse(logUser);
    const scrollRef=useRef();
    const [message,setMessage]=useState([]);
    const [newMessage,setNewMessage]=useState(null);
    const [currentChat,setCurrentChat]=useState(null);
    const [fetchConvo,setFecthConvo]=useState(false);
    const [conversation,setConversation]=useState([]);
    const [arriavalMessage,setArriavalMessage]=useState(null);
    const socket=useRef();

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
        arriavalMessage && (currentChat && currentChat[0][1]?.id === arriavalMessage?.sender) && setMessage(prev=>[...prev,arriavalMessage]);
    },[arriavalMessage, currentChat])

    useEffect(()=>{
        socket.current.emit("addUser",logUser?.id);
        socket.current.on("getUsers",(users)=>{
            // console.log(users);
        });
    },[logUser])

    const hideModal=()=>{
        props.hideshowMessageModalHandler()
    }




    useEffect(()=>{
        axios.get(URL+"/singleConversation/"+logUser.id+"/"+props?.userId).then((res)=>{
            if(res.data.res.length===0){
                const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                const currentTime = moment().tz(timezone).format();
                const datetime = currentTime.slice(0, 19).replace('T', ' ');
                let data={
                    senderId:logUser.id,
                    revieverId:props?.userId,
                    createdTime:datetime
                }
                axios.post(URL+"/conversation",data).then((res)=>{
                    console.log(res);
                }).catch((err)=>{
                    console.log(err);
                })
            }else if(res.data.res.length>0){
                setCurrentChat(res.data.res);
            }
        }).catch(err=>{
            console.log(err);
        })
    },[logUser?.id])


    useEffect(()=>{
        let id=currentChat && currentChat[0][0]?.id;
        axios.get(URL+"/message/"+id).then((res)=>{
            setMessage(res.data.res);
        }).catch(err=>{
            console.log(err);
        })
    },[currentChat])

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:"smooth"});
    },[message])



    const handlesubmit=async()=>{
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const currentTime = moment().tz(timezone).format();
        const datetime = currentTime.slice(0, 19).replace('T', ' ');

        let newMessageData={
            sId:logUser.id,
            message:newMessage,
            cId:currentChat && currentChat[0][0]?.id,
            createdTime:datetime
        }

        console.log(newMessage)

        let id2=currentChat && currentChat[0][1]?.id;

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

    return(
        <>
            <div className="w-[calc(100vw)] h-[100vh] fixed top-[calc(0%)] left-[calc(0%)] bg-black opacity-30">
            </div>

            <div className="w-[calc(100vw)]  h-[100vh] fixed top-[0%] left-[calc(0%)] z-40">
                <div className="shadow-md xsm:w-[95%] sm:w-[90%] w-[70%] min-w-[320px] min-h-[500px] overflow-x-hidden flex flex-col opacity-100 relative z-50 bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[30px]">
                    <div>
                        <img onClick={hideModal} src="./images/xmark-solid.svg" alt="" className="absolute right-[5%] w-[20px] top-[2%] text-gray-300 cursor-pointer"/>
                        <div className="text-center bg-[#f4f5f5] min-h-[15%] py-[2.5%]"><h2>Messages</h2></div>
                    </div>


                    <div className="w-[100%]  flex max-h-[35vw] overflow-y-scroll p-[25px] bg-[#f4fdff]">
                        <div className="flex flex-col justify-between flex-1">
                            <div className="flex flex-col">
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

                </div>
            </div>
        </>
    )
}