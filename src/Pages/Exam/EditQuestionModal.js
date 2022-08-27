import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { URL } from "../../App";
import moment from "moment-timezone";

export default function EditQuestionModal(props){
    const formRef=useRef();

    const hideModal=()=>{
        props.hideEditQuestionModalHandler()
    }
    
    const examFormHandler=(e)=>{
        e.preventDefault();
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const currentTime = moment().tz(timezone).format();
        const datetime = currentTime.slice(0, 19).replace('T', ' ');
    
        let data={
            id:props.singleQuestion[1].id,
            examId:formRef.current.examId.value,
            question:formRef.current.question.value,
            op1:formRef.current.op1.value,
            op2:formRef.current.op2.value,
            op3:formRef.current.op3.value,
            op4:formRef.current.op4.value,
            correctOp:formRef.current.co.value === "1"? formRef.current.op1.value :formRef.current.co.value === "2"?formRef.current.op2.value:formRef.current.co.value === "3"?formRef.current.op3.value:formRef.current.co.value === "4"?formRef.current.op4.value:0,
            createdTime:datetime
        }

        console.log(data);
        axios.put(URL+"/question",data).then((res)=>{
            console.log(res);
            props.hideEditQuestionModalHandler()
        }).catch((err)=>{
            console.log(err);
        })
    }

    const [examData,setExamData]=useState([])

    useEffect(()=>{
        axios.get(URL+"/exam").then((res)=>{
            setExamData(res.data.res);
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    return(
        <>
            <div className=" w-[calc(100vw)] h-[100vh] fixed top-[calc(0%)] left-[calc(0%)] bg-black opacity-30">
            </div>

            <div className="w-[calc(100vw)]  h-[100vh] fixed z-40 top-[calc(0%)] left-[calc(0%)]">
                <div className="shadow-md h-[81.45vh] max-h-[70.95625942684767vh] xsm:w-[96%] sm-[80%] w-[60%] overflow-x-hidden  flex flex-col opacity-100 relative z-50 bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[30px]">
                    
                    <div>
                        <img onClick={hideModal} src="./images/xmark-solid.svg" alt="" className="absolute right-[5%] w-[20px] top-[5%] text-gray-300 cursor-pointer"/>
                        <div className="text-center bg-[#f4f5f5] min-h-[15%] py-[25px]"><h2>Edit Question</h2></div>
                    </div>
                    <form ref={formRef} onSubmit={examFormHandler} className="flex-1 items-center flex flex-col xsm:gap-[40px] gap-[18px] xsm:w-[100%] w-[60%] m-auto justify-center">
                        
                        <div className="flex xsm:flex-col text-[clamp(14px,1vw,18px]">
                            <label className="inline-block w-[120px] font-bold ">Select Exam:</label>
                            <select name="examId" className="inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2 min-w-[280px]">
                            <option value={props?.singleQuestion[1]?.id} disabled selected>{props.singleQuestion && props?.singleQuestion[1]?.title}</option>
                            {examData?.map((e)=>{
                                return(
                                    <option value={e.id}>{e.title}</option>
                                )
                            })
                            }
                        </select>
                        </div>
                        
                        <div className="flex xsm:flex-col text-[clamp(14px,1vw,18px]">
                            <label className="inline-block w-[120px] font-bold ">Question:</label><input defaultValue={props.singleQuestion[0].question} required name="question" placeholder="Type Question" type={"text"} className="c inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                        </div>

                        <div className="flex xsm:flex-col text-[clamp(14px,1vw,18px]">
                            <label className="inline-block w-[120px] font-bold ">Option 1:</label><input defaultValue={props.singleQuestion[0].op1} required name="op1" placeholder="Type Option 1" type={"text"} className="min-w-[280px] inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                            {props.singleQuestion[0].correctOp === props.singleQuestion[0].op1?<div className="flex"><label className="w-[120px]">Correct Option</label><input value={"1"} defaultChecked name={"co"} type="radio"></input></div>:<div className="flex"><label className="w-[120px]">Correct Option</label><input value={"1"} name={"co"} type="radio"></input></div>}
                        </div>

                        <div className="flex xsm:flex-col text-[clamp(14px,1vw,18px]">
                            <label className="inline-block w-[120px] font-bold ">Option 2:</label><input defaultValue={props.singleQuestion[0].op2} required name="op2" placeholder="Type Option 2" type={"text"} className="min-w-[280px] inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                            {props.singleQuestion[0].correctOp === props.singleQuestion[0].op2?<div className="flex"><label className="w-[120px]">Correct Option</label><input defaultChecked value={"2"} name={"co"} type="radio"></input></div>:<div className="flex"><label className="w-[120px]">Correct Option</label><input value={"2"} name={"co"} type="radio"></input></div>}
                            
                        </div>

                        <div className="flex xsm:flex-col text-[clamp(14px,1vw,18px]">
                            <label className="inline-block w-[120px] font-bold ">Option 3:</label><input defaultValue={props.singleQuestion[0].op3} required name="op3" placeholder="Type Option 3" type={"text"} className="min-w-[280px] inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                            {props.singleQuestion[0].correctOp === props.singleQuestion[0].op3?<div className="flex"><label className="w-[120px]">Correct Option</label><input value={"3"} defaultChecked name={"co"} type="radio"></input></div>:<div className="flex"><label className="w-[120px]">Correct Option</label><input value={"3"} name={"co"} type="radio"></input></div>}
                            
                        </div>

                        <div className="flex xsm:flex-col text-[clamp(14px,1vw,18px]">
                            <label className="inline-block w-[120px] font-bold ">Option 4:</label><input defaultValue={props.singleQuestion[0].op4} required name="op4" placeholder="Type Option 4" type={"text"} className="min-w-[280px] inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                            {props.singleQuestion[0].correctOp === props.singleQuestion[0].op4?<div className="flex"><label className="w-[120px]">Correct Option</label><input value={"4"} defaultChecked name={"co"} type="radio"></input></div>:<div className="flex"><label className="w-[120px]">Correct Option</label><input value={"4"} name={"co"} type="radio"></input></div>}
                            
                        </div>

                        <div className="flex justify-center mt-[20px] self-center mb-[50px]">
                            <button type="submit" className="bg-[#81c2ff] min-w-[136px] w-[14.25vw] h-[4.351vh] text-white font-bold rounded-full">Apply now</button>
                        </div>
                        
                    </form>
                </div>   
            </div>
        </>
    )
}