import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {storage} from "../../Components/Firebase";
import { URL } from "../../App";
import moment from "moment-timezone";
import {ref,uploadBytes,getDownloadURL,uploadBytesResumable} from "firebase/storage"
import { toast } from "react-toastify";
import ReactPlayer from 'react-player'


export default function ShowVideoModal(props){
    let user;
    user=localStorage.getItem("user");
    user=JSON.parse(user);

    const hideModal=()=>{
        props.hideVideoModalHandler()
    }
    const [played, setPlayed] = useState(0);
    const [progress,setProgress]=useState();
    let prog={}

    useEffect(()=>{

        return ()=>{
            console.log(prog.progress);
            let data={
                uId:user.id,
                vId:props.videoData.id,
                progress:prog?.progress*100
            }
            axios.post(URL+"/videoProgress",data).then((res)=>{
                console.log(res.data.res);
            }).catch(err=>{
                console.log(err);
            })
        }
    },[])

    return(
        <>
            <div className="w-[calc(100vw)] h-[100vh] fixed top-[calc(0%)] left-[calc(0%)] bg-black opacity-30">
            </div>

            <div className="w-[calc(100vw)]  h-[100vh] fixed top-[calc(0%)] left-[calc(0%)]">
                <div className="shadow-md overflow-x-hidden xsm:w-[90%] sm:w-[80%] w-[60%] flex flex-col opacity-100 relative z-50 bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[30px]">
                    <div>
                        <img onClick={hideModal} src="./images/xmark-solid.svg" alt="" className="absolute right-[5%] w-[20px] top-[5%] text-gray-300 cursor-pointer"/>
                        <div className="text-center bg-[#f4f5f5] min-h-[15%] py-[25px]"><h2>Training Videos</h2></div>
                    </div>
                    <ReactPlayer 
                    width={"100%"}
                    height={"100%"}
                        url={props?.videoData?.video} 
                        playing={true} 
                        controls={true}
                        onProgress={(progress) => {
                            // localStorage.setItem(props.videoData.title,progress.played)
                            console.log(progress.played);
                            prog.progress=progress.played;
                          }}
                        />
                </div>   
            </div>
        </>
    )
}