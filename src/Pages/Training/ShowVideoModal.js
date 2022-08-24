import axios from "axios";
import { useRef, useState } from "react";
import {storage} from "../../Components/Firebase";
import { URL } from "../../App";
import moment from "moment-timezone";
import {ref,uploadBytes,getDownloadURL,uploadBytesResumable} from "firebase/storage"
import { toast } from "react-toastify";
import ReactPlayer from 'react-player'


export default function ShowVideoModal(props){

    const hideModal=()=>{
        props.hideVideoModalHandler()
    }
    console.log(props?.videoData);
    const [played, setPlayed] = useState(0);

    return(
        <>
            <div className="w-[calc(100vw)] h-[100vh] absolute top-[calc(0%-121.44px)] left-[calc(0%-17.547584187408493vw)] bg-black opacity-30">
            </div>

            <div className="w-[calc(100vw)]  h-[100vh] absolute z-40 top-[calc(0%-121.44px)] left-[calc(0%-17.547584187408493vw)]">
                <div className="shadow-md max-h-[70.95625942684767vh] max-w-[60vw] overflow-x-hidden  flex flex-col opacity-100 relative z-50 bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[30px]">
                    <div>
                        <img onClick={hideModal} src="./images/xmark-solid.svg" alt="" className="absolute right-[5%] w-[20px] top-[5%] text-gray-300"/>
                        <div className="text-center bg-[#f4f5f5] min-h-[15%] py-[2.5%]">Add Training Videos</div>
                    </div>
                    <ReactPlayer 
                        url={props?.videoData?.video} 
                        // playing={true} 
                        loop={true} 
                        controls={true}
                        onProgress={(progress) => {
                            console.log(progress);
                            setPlayed(progress.playedSeconds);
                          }}
                        />
                </div>   
            </div>
        </>
    )
}