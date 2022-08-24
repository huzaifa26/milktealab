import moment from "moment-timezone";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function ExamSingleQuestion(props){
    const formRef=useRef();
    const [singleQuestion,setSingleQuestion]=useState();
    useEffect(()=>{
        setSingleQuestion(props.singleQuestion);
    },[props.singleQuestion])

    const nextExamhandler=async(event)=>{
        event.preventDefault();

        if(formRef.current.co.value === ""){
            toast.info("please select on of given options");
            return
        }
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const currentTime = moment().tz(timezone).format();
        const datetime = currentTime.slice(0, 19).replace('T', ' ');

        let user=localStorage.getItem("user");
        user=JSON.parse(user);
        let data={
            uId:user?.id,
            examId:props?.e?.id,
            qId:singleQuestion?.id,
            userChoice:formRef.current.co.value === "1"? singleQuestion.op1 :formRef.current.co.value === "2"?singleQuestion.op2:formRef.current.co.value === "3"?singleQuestion.op3:formRef.current.co.value === "4"?singleQuestion.op4:0,
            createdTime:datetime
        }
        formRef.current.co[0].checked=false;
        formRef.current.co[1].checked=false;
        formRef.current.co[2].checked=false;
        formRef.current.co[3].checked=false;
        props.getData(data);
    }
    return(
        <form ref={formRef} onSubmit={nextExamhandler} className="flex-1 flex flex-col gap-[18px] items-start w-[60%] m-auto justify-center ">
                        <h2>Question {props?.counter}</h2>
                        <div className="text-[1vw]">
                            <label className="inline-block w-[120px] font-bold ">Question:</label><input value={singleQuestion?.question} name="question" placeholder="Type Question" type={"text"} className="inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                        </div>

                        <div className="text-[1vw]">
                            <label className="inline-block w-[120px] font-bold ">Option 1:</label><input value={singleQuestion?.op1} name="op1" placeholder="Type Option 1" type={"text"} className="inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                            <><label>Correct Option</label><input  value={"1"}  name={"co"} type="radio"></input></>
                        </div>

                        <div className="text-[1vw]">
                            <label className="inline-block w-[120px] font-bold ">Option 2:</label><input value={singleQuestion?.op2} name="op2" placeholder="Type Option 2" type={"text"} className="inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                            <><label>Correct Option</label><input  value={"2"}  name={"co"} type="radio"></input></>
                        </div>

                        <div className="text-[1vw]">
                            <label className="inline-block w-[120px] font-bold ">Option 3:</label><input value={singleQuestion?.op3} name="op3" placeholder="Type Option 3" type={"text"} className="inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                            <><label>Correct Option</label><input  value={"3"}  name={"co"} type="radio"></input></>
                        </div>

                        <div className="text-[1vw]">
                            <label className="inline-block w-[120px] font-bold ">Option 4:</label><input value={singleQuestion?.op4} required name="op4" placeholder="Type Option 4" type={"text"} className="inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                            <><label>Correct Option</label><input  value={"4"}  name={"co"} type="radio"></input></>
                        </div>

                        <div className="flex justify-center mt-[20px] self-center">
                            <button type="submit" className="bg-[#81c2ff] w-[14.25vw] h-[4.351vh] text-white font-bold rounded-full">Next</button>
                        </div>
                        
                    </form>
    )
}