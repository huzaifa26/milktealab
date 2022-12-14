import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { URL } from "../../App";
import ShowVideoModal from "./ShowVideoModal";
import AddTrainingModal from "./AddTrainingModal";
import { toast } from "react-toastify";
import { ColorRing } from 'react-loader-spinner'


export default function Training(props){
    const [showSpinner,setShowSpinner]=useState(true);

    let user;
    user=localStorage.getItem("user");
    user=JSON.parse(user);

    const [trainingData,setTrainingData]=useState([]);
    const [singletrainingData,setsingleTrainingData]=useState([]);
    const [showVideoModal,setVideoModal]=useState(false);
    
    const hideVideoModalHandler=useCallback((progress)=>{
        console.log(progress)
        console.log(trainingData);
        let newArr=[...trainingData];
        newArr.forEach((n)=>{
            if(n.id === progress.vId){
                if(progress.progress>n.progress){
                    n.progress=Math.round(progress.progress);
                }
            }
        });
        setTrainingData(newArr)
        setVideoModal(false);
    },[showVideoModal])

    const [showModal,setShowModal]=useState(false);
    const showTrainingModal=()=>{
        setShowModal(true);
    }
    const hideModalHandler=useCallback(()=>{
        setShowModal(false);
    },[])


    const [isDeleted,setIsDeleted]=useState(false);
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
            toast("Video deleted");
            setIsDeleted(!isDeleted)
        }).catch((err)=>{
            console.log(err);
        })
    },[isDeleted])

    useEffect(()=>{
        axios.get(URL+"/training/"+user?.id).then((res)=>{
            setTrainingData(res.data.res);
            setShowSpinner(false);
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

        {showSpinner === false ?
        <div className="w-[100%] h-[100%]">
            <div className="w-[91%] m-auto">
            {user.role === "admin" && 
                <div>
                    <button onClick={showTrainingModal} class="min-w-[136px] h-[4.3518518518519vh] min-h-[29px] mt-[2.051vw] mb-[1.221vw] rounded-full py-1 w-[14.258vw] text-[clamp(14px,0.801vw,32.82px)] bg-[#81c2ff] text-white uppercase font-bold">
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
                            {user.role === "admin" && 
                                <th className="w-[16.5vw] text-center">Actions</th>
                            }
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
                                    <p className="text-[#a4a5a5] text-[14px]">{t.description}</p>
                                </div>
                            </td>
                            {user.role === "franchisee" &&
                                <td className=" flex flex-col">
                                    <h2 className="text-blue-400 w-[11.42vw] text-center">{t.progress}%</h2>
                                    <div className="w-[11.42vw] h-[3px] bg-gray-200">
                                        <div style={{width}} className={`h-[100%] bg-blue-400`}></div>
                                    </div>
                                </td>
                            }
                            {user.role === "admin" && 
                                <td className="flex gap-[5px] w-[16.5vw] justify-center">
                                    <button onClick={()=>deleteTraining(t.id,t.video)} type="submit" className="bg-[#e96857] min-w-[60px] w-[8.25vw] h-[4.351vh] min-h-[29px] text-white font-bold rounded-full">Delete</button>
                                </td>
                            }
                        </tr>
                        )
                    })}
                    </tbody>
                </table>
                </div>
            </div>
        </div>:
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