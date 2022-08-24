import axios from "axios";
import { useEffect, useState } from "react";
import { URL } from "../../App";
import ShowVideoModal from "./ShowVideoModal";
import AddTrainingModal from "./AddTrainingModal";

export default function Training(props){

    let user;
    user=localStorage.getItem("user");
    user=JSON.parse(user);

    const [trainingData,setTrainingData]=useState([]);
    const [singletrainingData,setsingleTrainingData]=useState([]);
    const [showVideoModal,setVideoModal]=useState(false);
    const hideVideoModalHandler=()=>{
        setVideoModal(false);
    }

    const [showModal,setShowModal]=useState(false);
    const showTrainingModal=()=>{
        setShowModal(true);
    }
    const hideModalHandler=()=>{
        setShowModal(false);
    }

    useEffect(()=>{
        axios.get(URL+"/training").then((res)=>{
            setTrainingData(res.data.res);
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    return(
    <>
        {showModal &&
            <AddTrainingModal hideModalHandler={hideModalHandler}/>
        }
        {showVideoModal &&
            <ShowVideoModal videoData={singletrainingData} hideVideoModalHandler={hideVideoModalHandler}/>
        }
        <div className="w-[100%] h-[100%]">
            <div className="w-[91%] m-auto">
            {user.role === "admin" && 
                <div>
                    <button onClick={showTrainingModal} class="h-[4.3518518518519vh] mt-[2.051vw] mb-[1.221vw] rounded-full py-1 w-[14.258vw] text-[clamp(14px,0.801vw,32.82px)] bg-[#81c2ff] text-white uppercase font-bold">
                        Add Videos
                    </button>
                </div>
            }
                <table class="table-auto w-[90%] mt-[30px]">
                    <thead>
                        <tr className="flex border-b-[2px] justify-between">
                            <th className="text-left">Chapter Title</th>
                            <th className="w-[11.42vw] text-center">Progress</th>
                        </tr>
                    </thead>
                    <tbody >
                    {trainingData.map((t)=>{
                        return(
                        <tr className="flex my-[20px] justify-between">
                            <td onClick={()=>{setsingleTrainingData(t);setVideoModal(true);}} className="cursor-pointer flex gap-[10px]">
                                <div className="w-[50px] h-[50px] rounded-full"><img src="/images/play.png"></img></div>
                                <div  className="flex flex-col">
                                    <h3>{t.title}</h3>
                                    <p>{t.description}</p>
                                </div>
                            </td>
                            <td className=" flex flex-col">
                                <h2 className="text-blue-400 w-[11.42vw] text-center">33%</h2>
                                <div className="w-[11.42vw] h-[3px] bg-gray-200">
                                    <div className="w-[33%] h-[100%] bg-blue-400"></div>
                                </div>
                            </td>
                        </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    </>
    )
}