import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { URL } from "../../App";
import ShowVideoModal from "./ShowVideoModal";
import AddTrainingModal from "./AddTrainingModal";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../../Components/Firebase";
import { type } from "@testing-library/user-event/dist/type";

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
    const hideModalHandler=useCallback(()=>{
        setShowModal(false);
    },[])

    const deleteTraining=useCallback((id,video)=>{
        // const desertRef = ref(storage, `/TrainingVideos/${video}`);

        // deleteObject(desertRef).then(() => {
        // // File deleted successfully
        //     console.log("deleted");
            
        // }).catch((error) => {
        //     console.log(error);
        // });

        axios.delete(URL+"/training/"+id).then((res)=>{
            console.log(res.data.res);
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    useEffect(()=>{
        axios.get(URL+"/training/"+user.id).then((res)=>{
            setTrainingData(res.data.res);
            console.log(res.data.res);
        }).catch((err)=>{
            console.log(err);
        })
    },[showModal,deleteTraining])

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
                    <button onClick={showTrainingModal} class="min-w-[136px] h-[4.3518518518519vh] mt-[2.051vw] mb-[1.221vw] rounded-full py-1 w-[14.258vw] text-[clamp(14px,0.801vw,32.82px)] bg-[#81c2ff] text-white uppercase font-bold">
                        Add Videos
                    </button>
                </div>
            }
            <div className="overflow-x-auto">
                <table class="min-w-[500px] table-auto w-[90%] mt-[30px]">
                    <thead>
                        <tr className="flex border-b-[2px] justify-between">
                            <th className="text-left">Chapter Title</th>
                            {user.role === "member" &&
                                <th className="w-[11.42vw] text-center">Progress</th>
                            }
                            <th className="w-[16.5vw] text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody >
                    {trainingData.map((t)=>{
                        let width=t.progress+"%";
                        console.log(t.progress)
                        return(
                        <tr className="flex my-[20px] justify-between">
                            <td onClick={()=>{setsingleTrainingData(t);setVideoModal(true);}} className="cursor-pointer flex gap-[10px]">
                                <div className="w-[50px] h-[50px] rounded-full"><img src="./images/play.png"></img></div>
                                <div  className="flex flex-col">
                                    <h3>{t.title}</h3>
                                    <p className="text-[#a4a5a5]">{t.description}</p>
                                </div>
                            </td>
                            {user.role === "member" &&
                                <td className=" flex flex-col">
                                    <h2 className="text-blue-400 w-[11.42vw] text-center">{t.progress}%</h2>
                                    <div className="w-[11.42vw] h-[3px] bg-gray-200">
                                        <div style={{width}} className={`h-[100%] bg-blue-400`}></div>
                                    </div>
                                </td>
                            }
                            <td className="flex gap-[5px]">
                                <button onClick={()=>deleteTraining(t.id,t.video)} type="submit" className="bg-[#e96857] min-w-[60px] w-[8.25vw] h-[4.351vh] text-white font-bold rounded-full">Delete</button>
                            </td>
                        </tr>
                        )
                    })}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    </>
    )
}