import axios from "axios";
import { useRef } from "react";
import { URL } from "../../App";
import moment from "moment-timezone";
import { toHaveFormValues } from "@testing-library/jest-dom/dist/matchers";
import { toast } from "react-toastify";

export default function EditExamModsl(props){

    const hideModal=()=>{
        props.hideAddQuestionModelHandler()
    }

    const formRef=useRef();
    const announcementFormHandler=(e)=>{
        e.preventDefault();
        console.log(formRef.current.title.value)
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const currentTime = moment().tz(timezone).format();
        const datetime = currentTime.slice(0, 19).replace('T', ' ');
    
        let data={
            id:props.singleExam.id,
            title:formRef.current.title.value,
            description:formRef.current.description.value,
            datetime:datetime
        }
        console.log(data);
        axios.put(URL+"/exam",data).then((res)=>{
            console.log(res);
            toast("Exam Edited");
            props.hideAddQuestionModelHandler();
        }).catch((err)=>{
            console.log(err);
        })
    }

    return(
        <>
            <div className="w-[calc(100vw)] h-[100vh] fixed top-[calc(0%)] left-[calc(0%)] bg-black opacity-30">
            </div>

            <div className="w-[calc(100vw)]  h-[100vh] fixed top-[calc(0%)] left-[calc(0%)]">
                <div className="shadow-md h-[51.45vh] max-h-[70.95625942684767vh]  xsm:min-w-[90%] sm:w-[80%] w-[60%] overflow-x-hidden  flex flex-col opacity-100 relative z-50 bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[30px]">
                    
                    <div>
                        <img onClick={hideModal} src="./images/xmark-solid.svg" alt="" className="absolute right-[5%] w-[20px] top-[5%] text-gray-300 cursor-pointer"/>
                        <div className="text-center bg-[#f4f5f5] min-h-[15%] py-[25px]">Edit Announcement</div>
                    </div>
                    <form ref={formRef} onSubmit={announcementFormHandler} className="flex-1 flex flex-col gap-[18px] items-center justify-center">
                        <div className="xsm:flex xsm:flex-col text-[clamp(14px,1vw,18px]">
                            <label className="inline-block w-[120px] font-bold ">Title:</label><input defaultValue={props?.singleExam?.title} required name="title" placeholder="Type announcement title" type={"text"} className="inline-block w-[17vw] min-w-[280px] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                        </div>

                        <div className="xsm:flex xsm:flex-col text-[clamp(14px,1vw,18px]">
                            <label className="inline-block w-[120px] font-bold ">Description:</label><input defaultValue={props?.singleExam?.description} required name="description" placeholder="Type announcement description" type={"text"} className="inline-block min-w-[280px] w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                        </div>

                        <div className="flex justify-center mt-[20px]">
                            <button type="submit" className="bg-[#81c2ff] min-w-[136px] w-[14.25vw] h-[4.351vw] min-h-[29px] text-white font-bold rounded-full">Update</button>
                        </div>
                    </form>
                </div>   
            </div>
        </>
    )
}

