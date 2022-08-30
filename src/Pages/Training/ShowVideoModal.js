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

    let data={
        uId:user.id,
        progress:0
    }

    const hideModal=()=>{
        data.vId=props.videoData.id;
        axios.post(URL+"/videoProgress",data).then((res)=>{
            console.log(res.data.res);
        }).catch(err=>{
            console.log(err);
        })
        props.hideVideoModalHandler(data);
    }

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
                    progressInterval={100}
                    width={"100%"}
                    height={"100%"}
                        url={props?.videoData?.video} 
                        playing={true} 
                        controls={true}
                        onProgress={(progress) => {
                            data.progress=progress.played*100
                          }}
                        />
                </div>   
            </div>
        </>
    )
}