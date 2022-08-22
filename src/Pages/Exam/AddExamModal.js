import axios from "axios";
import { useRef } from "react";
import { URL } from "../../App";
import moment from "moment-timezone";

export default function AddExamModal(props){
    const formRef=useRef();

    const hideModal=()=>{
        props.hideAddExamModelHandler()
    }
    
    const examFormHandler=(e)=>{
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
        axios.post(URL+"/exam",data).then((res)=>{
            console.log(res);
            props.hideAddExamModelHandler()
        }).catch((err)=>{
            console.log(err);
        })
    }

    return(
        <>
            <div className="w-[calc(100vw)] h-[100vh] absolute top-[calc(0%-121.44px)] left-[calc(0%-17.547584187408493vw)] bg-black opacity-30">
            </div>

            <div className="w-[calc(100vw)]  h-[100vh] absolute z-40 top-[calc(0%-121.44px)] left-[calc(0%-17.547584187408493vw)]">
                <div className="shadow-md h-[51.45vh] max-h-[70.95625942684767vh] max-w-[60vw] overflow-x-hidden  flex flex-col opacity-100 relative z-50 bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[30px]">
                    
                    <div>
                        <img onClick={hideModal} src="/images/xmark-solid.svg" alt="" className="absolute right-[5%] w-[20px] top-[5%] text-gray-300"/>
                        <div className="text-center bg-[#f4f5f5] min-h-[15%] py-[2.5%]">Add Exam</div>
                    </div>
                    <form ref={formRef} onSubmit={examFormHandler} className="flex-1 flex flex-col gap-[18px] items-center justify-center">
                        <div className="text-[1vw]">
                            <label className="inline-block w-[120px] font-bold ">Title:</label><input required name="title" placeholder="Type announcement title" type={"text"} className="inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                        </div>

                        <div className="text-[1vw]">
                            <label className="inline-block w-[120px] font-bold ">Description:</label><input required name="description" placeholder="Type announcement description" type={"text"} className="inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                        </div>

                        <div className="flex justify-center mt-[20px]">
                            <button type="submit" className="bg-[#81c2ff] w-[14.25vw] h-[4.351vh] text-white font-bold rounded-full">Apply now</button>
                        </div>
                    </form>
                </div>   
            </div>
        </>
    )
}