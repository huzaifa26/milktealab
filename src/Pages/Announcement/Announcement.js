import axios from "axios";
import { useEffect, useState } from "react"
import { URL } from "../../App";
import AccouncementModel from "./AnnouncementModal";
import AccouncementEditModal from "./AnnouncementEditModal";

export default function Announcement(props){
    const [announcements,setAnnouncements]=useState([]);
    const [singleAnnouncements,setSingleAnnouncements]=useState([]);

    const [showModal,setShowModal]=useState(false);
    const showAnnouncementModal=()=>{
        setShowModal(true)
    }
    const hideModalHandler=()=>{
        setShowModal(false);
    }



    const [showEditModal,setShowEditModal]=useState(false);
    const showEditAnnouncementModal=()=>{
        setShowEditModal(true)
    }
    const hideEditModalHandler=()=>{
        setShowEditModal(false);
    }

    useEffect(()=>{
        axios.get(URL+"/announcement").then((res)=>{
            console.log(res.data.res);
            setAnnouncements(res.data.res)
        }).catch((err)=>{
            console.log(err);
        })
    },[hideModalHandler,hideEditModalHandler])

    const deleteAccouncement=(id)=>{
        axios.delete(URL+"/announcement/"+id).then((res)=>{
            console.log(res.data.res);
        }).catch((err)=>{
            console.log(err);
        })
    }

    return(
    <>
    {showModal &&
        <AccouncementModel hideModalHandler={hideModalHandler}></AccouncementModel>
    }

    {showEditModal &&
        <AccouncementEditModal singleAnnouncements={singleAnnouncements} hideEditModalHandler={hideEditModalHandler}></AccouncementEditModal>
    }
    <div className="w-[100%] h-[100%] pt-[20px]">
        <div className="w-[91%] m-auto">
        <div>
            <button onClick={showAnnouncementModal} class="h-[4.3518518518519vh] mt-[2.051vw] mb-[1.221vw] rounded-full py-1 w-[14.258vw] text-[clamp(14px,0.801vw,32.82px)] bg-[#81c2ff] text-white uppercase font-bold">
                Add Announcement
            </button>
        </div>

            <h1 className="text-[clamp(28px,1.08vw,44px)] font-bold text-[#393a3a]">Hello Kaman, <span className="text-[#55c9f8]">Good Evening</span></h1>

            <table class="table-auto w-[100%] mt-[30px]">
                <thead>
                    <tr className="flex border-b-[2px] justify-between">
                        <th className="text-left">Title</th>
                        <th className="w-[16.42vw] text-center">Date</th>
                        <th className="w-[16.5vw] text-center">Actions</th>
                    </tr>
                </thead>
                <tbody >
                
                {announcements.map((a)=>{
                    const datetime = a.publishedTime.slice(0, 19).replace('T', ' ');

                    return(
                        <tr key={a.id} className="flex my-[20px] justify-between">
                            <td className=" flex gap-[10px] items-center">
                                <div className="flex flex-col">
                                    <h3>{a.title}</h3>
                                    <p className="text-[#a4a5a5]">{a.description}</p>
                                </div>
                                <div className="w-[2.36vw] min-w-[50px] h-[1.9vh] min-h-[25px] text-center text-white bg-[#f7275f] rounded-full">New</div>

                            </td>
                            <td className=" flex flex-col">
                                <h2 className="text-[#a4a5a5] text-center">Published on {datetime}</h2>
                            </td>
                            <td className="flex gap-[5px]">
                                <button onClick={()=>{setSingleAnnouncements(a);showEditAnnouncementModal(true);}} type="submit" className="bg-[#81c2ff] w-[8.25vw] h-[4.351vh] text-white font-bold rounded-full">Edit</button>
                                <button onClick={()=>deleteAccouncement(a.id)} type="submit" className="bg-[#e96857] w-[8.25vw] h-[4.351vh] text-white font-bold rounded-full">Delete</button>
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