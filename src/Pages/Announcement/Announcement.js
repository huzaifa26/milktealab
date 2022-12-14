import axios from "axios";
import { useCallback, useEffect, useState } from "react"
import { URL } from "../../App";
import AccouncementModel from "./AnnouncementModal";
import AccouncementEditModal from "./AnnouncementEditModal";
import moment from "moment-timezone";
import ShowAnnouncementModal from "./ShowAnnouncementModal";
import { toast } from "react-toastify";
import { ColorRing } from 'react-loader-spinner';


export default function Announcement(props){
    const [showSpinner,setShowSpinner]=useState(true);

    let user;
    user=localStorage.getItem("user");
    user=JSON.parse(user);


    const [announcements,setAnnouncements]=useState([]);
    const [singleAnnouncements,setSingleAnnouncements]=useState([]);
    const [showModal,setShowModal]=useState(false);
    const [showEditModal,setShowEditModal]=useState(false);
    const [AnnouncementModal,setAnnouncementModal]=useState(false);
    const [isDeleted,setIsDeleted]=useState(false);



    const showAnnouncementModal=()=>{
        setShowModal(true)
    }
    const hideModalHandler=useCallback(()=>{
        setShowModal(false);
    },[])

    const showEditAnnouncementModal=()=>{
        setShowEditModal(true)
    }
    const hideEditModalHandler=useCallback(()=>{
        setShowEditModal(false);
    },[])


    const hideAnnouncementModalHandler=useCallback(()=>{
        setAnnouncementModal(false);
    },[])

    const deleteAccouncement=useCallback((id)=>{
        axios.delete(URL+"/announcement/"+id).then((res)=>{
            console.log(res.data.res);
            setIsDeleted(!isDeleted);
            toast("Announcement deleted.")
        }).catch((err)=>{
            console.log(err);
        })
    },[isDeleted])

    var currentHour = moment().format("HH");
    let msg=''
    if (currentHour < 12){
        msg ="Good Morning";
    } else if (currentHour  >= 12){
        msg ="Good Afternoon";
    } 

    const announcementClickHandler=useCallback((id)=>{
        setAnnouncementModal(true)
        let data={
            uid:user.id,
            aid:id
        }
        axios.post(URL+"/markAnnouncement",data).then(res=>{
            console.log(res.data.res);
        }).catch((err)=>{
            console.log(err);
        })
    },[AnnouncementModal])

    useEffect(()=>{
        axios.get(URL+"/announcement/"+user?.id).then((res)=>{
            console.log(res.data.res);
            setAnnouncements(res.data.res)
            setShowSpinner(false)
        }).catch((err)=>{
            console.log(err);
        })
    },[showModal,showEditModal,announcementClickHandler,deleteAccouncement])

    return(
    <>
    {showModal &&
        <AccouncementModel hideModalHandler={hideModalHandler}></AccouncementModel>
    }

    {showEditModal &&
        <AccouncementEditModal singleAnnouncements={singleAnnouncements} hideEditModalHandler={hideEditModalHandler}></AccouncementEditModal>
    }

    {AnnouncementModal &&
        <ShowAnnouncementModal singleAnnouncements={singleAnnouncements} hideAnnouncementModalHandler={hideAnnouncementModalHandler}></ShowAnnouncementModal>
    }

    {showSpinner === false?
    <div className="w-[100%] h-[100%] pt-[20px]">
        <div className="w-[91%] m-auto">
            {user!==null && user?.role === "admin" && 
            <div>
                <button onClick={showAnnouncementModal} class="min-w-[166px] h-[4.351vw] min-h-[29px] mt-[2.051vw] mb-[1.221vw] rounded-full py-1 w-[14.258vw] text-[clamp(14px,0.801vw,32.82px)] bg-[#81c2ff] text-white uppercase font-bold">
                    Add Announcement
                </button>
            </div>
            }

            <h1 className="text-[clamp(28px,1.08vw,44px)] font-bold text-[#393a3a]">Hello {user?.userName}, <span className="text-[#55c9f8]">{msg}</span></h1>

            <div className="overflow-x-auto">
                <table class="table-auto w-[100%] mt-[30px]">
                    <thead>
                        <tr className="min-w-[500px] flex border-b-[2px] justify-between">
                            <th className="text-start w-[14.641288433382138vw] min-w-[190px]">Title</th>
                            <th className="w-[20.42vw] text-center">Date</th>
                            {user?.role === "admin" &&
                                <th className="w-[16.5vw] text-center">Actions</th>
                            }
                        </tr>
                    </thead>
                    <tbody >
                    
                    {announcements?.map((a)=>{
                        let datetime;
                        let timezone=Intl.DateTimeFormat().resolvedOptions().timeZone
                        datetime=moment(a.publishedTime).tz(timezone);
                        datetime=datetime._d.toString();
                        datetime = datetime.slice(0, 24)
                        console.log(datetime);


                        return(
                            <tr key={a.id} className="min-w-[500px] flex my-[20px] justify-between">
                                <td title="Open to marks as read" onClick={()=>{setSingleAnnouncements(a);announcementClickHandler(a.id);}} className="flex gap-[10px] items-center cursor-pointer min-w-[14.641288433382138vw]">
                                    <div className="flex flex-col">
                                        <h3 className={"max-w-[14.641288433382138vw] "}>{a.title}</h3>
                                        <p className="text-[#a4a5a5] text-[14px] min-w-[120px] max-w-[14.641288433382138vw]">{a.description}</p>
                                    </div>
                                    {a.isOpened === false &&
                                        <div className="w-[2.36vw] min-w-[50px] h-[1.9vh] min-h-[25px] text-center text-white bg-[#f7275f] rounded-full">New</div>
                                    }
                                </td>
                                <td className=" flex flex-col">
                                    <h2 className="text-[#a4a5a5] xsm:w-[190px] text-center">Published on {datetime}</h2>
                                </td>
                                {user?.role === "admin" &&
                                    <td className="flex xsm:flex-col gap-[5px]">
                                        <button onClick={()=>{setSingleAnnouncements(a);showEditAnnouncementModal(true);}} type="submit" className="bg-[#81c2ff] w-[8.25vw] h-[4.351vh] min-h-[29px] text-white min-w-[65px] font-bold rounded-full">Edit</button>
                                        <button onClick={()=>deleteAccouncement(a.id)} type="submit" className="bg-[#e96857] min-w-[65px] w-[8.25vw] h-[4.351vh] min-h-[29px] text-white font-bold rounded-full">Delete</button>
                                    </td>
                                }
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
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