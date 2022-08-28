import axios from "axios";
import { useRef } from "react";
import { URL } from "../../App";
import moment from "moment-timezone";
import { toast } from "react-toastify";

export default function AccouncementModel(props){

    const hideModal=()=>{
        props.hideModalHandler()
    }
    const formRef=useRef();
    const announcementFormHandler=(e)=>{
        e.preventDefault();
        console.log(formRef.current.title.value)
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const currentTime = moment().tz(timezone).format();
        const datetime = currentTime.slice(0, 19).replace('T', ' ');
    
        let data={
            title:formRef.current.title.value,
            description:formRef.current.description.value,
            datetime:datetime
        }
        axios.post(URL+"/announcement",data).then((res)=>{
            console.log(res);
            toast("Accouncement Created Succesfully");
            props.hideModalHandler()
        }).catch((err)=>{
            console.log(err);
        })
    }

    return(
        <>
            <div className="w-[calc(100vw)] h-[100vh] fixed top-[calc(0%)] !z-[110] left-[calc(0%)] bg-black opacity-30">
            </div>

            <div className="w-[calc(100vw)]  h-[100vh] fixed !z-[120] top-[calc(0%)] left-[calc(0%)]">
                <div className="shadow-md h-[51.45vh] max-h-[70.95625942684767vh] xsm:min-w-[90%] sm:w-[80%] w-[60%] overflow-x-hidden  flex flex-col opacity-100 relative z-50 bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[30px]">
                    
                    <div>
                        <img onClick={hideModal} src="./images/xmark-solid.svg" alt="" className="absolute right-[5%] w-[20px] top-[5%] text-gray-300 cursor-pointer"/>
                        <div className="text-center bg-[#f4f5f5] min-h-[15%] py-[25px]"><h2>Add Announcement</h2></div>
                    </div>
                    <form ref={formRef} onSubmit={announcementFormHandler} className="flex-1 flex flex-col gap-[18px] items-center justify-center">
                        <div className="xsm:flex xsm:flex-col text-[clamp(14px,1vw,18px]">
                            <label className="inline-block w-[120px] font-bold ">Title:</label><input required name="title" placeholder="Type announcement title" type={"text"} className="min-w-[280px] inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                        </div>

                        <div className="xsm:flex xsm:flex-col text-[clamp(14px,1vw,18px]">
                            <label className="inline-block w-[120px] font-bold ">Description:</label><input required name="description" placeholder="Type announcement description" type={"text"} className="min-w-[280px] inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                        </div>

                        <div className="flex justify-center mt-[20px]">
                            <button type="submit" className="bg-[#81c2ff] min-w-[136px] w-[14.25vw] h-[4.351vh] text-white font-bold rounded-full">Apply now</button>
                        </div>
                    </form>
                </div>   
            </div>
        </>
    )
}