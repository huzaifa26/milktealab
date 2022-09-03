import axios from "axios";
import { useState,useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { URL } from "../../App";
import EditQuestionModal from "./EditQuestionModal";

export default function AdminShowQuestion(props){
    const [questions,setQuestion]=useState();
    const location=useLocation();
    const e=location.state;
    const [singleQuestion,setSingleQuestion]=useState();
    const [showEditQuestionModal,setEditQuestionModel]=useState(false);
    const [deleteQuestion,setDeleteQuestion]=useState(false);

    const deleteQuestionHandler=(id)=>{
        axios.delete(URL+"/question/"+id).then((res)=>{
            console.log(res);
            toast("Question Deleted");
            setDeleteQuestion(!deleteQuestion);
        }).catch((err)=>{
            console.log(err);
        })
    }

    const showEditQuestionModalHandler=()=>{
        setEditQuestionModel(true);
    }

    const hideEditQuestionModalHandler=()=>{
        setEditQuestionModel(false);
    }

    useEffect(()=>{
        axios.get(URL+"/question/"+e.id).then((res)=>{
            console.log(res.data.res);
            setQuestion(res.data.res);
        }).catch((err)=>{
            console.log(err);
        })
    },[showEditQuestionModal,deleteQuestion])



    return(
    <>
    {showEditQuestionModal &&
        <EditQuestionModal singleQuestion={singleQuestion} hideEditQuestionModalHandler={hideEditQuestionModalHandler}></EditQuestionModal>
    }

    <div className="w-[100%] h-[100%] pt-[20px]">
        <div className="flex flex-col gap-[30px] w-[91%] m-auto">

        {questions?.length > 0 ? questions.map((q,index)=>{
            console.log(q.correctOp)
            return(
            <div className="flex !mt-[30px] !pb-[30px] gap-[8px]">
                <p>{index+1}.</p>
                <div className="flex-1 flex flex-col gap-[18px] items-start justify-center ">
                    <div className="flex xsm:flex-col text-[clamp(14px,1vw,18px]">
                        <label className="inline-block w-[120px] font-bold ">Exam:</label>
                        <input required name="question" placeholder="Type Question" value={e.title} type={"text"} className="min-w-[280px] inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                    </div>
                    
                    <div className="flex xsm:flex-col text-[clamp(14px,1vw,18px]">
                        <label className="inline-block w-[120px] font-bold ">Question:</label><input value={q.question} required name="question" placeholder="Type Question" type={"text"} className="min-w-[280px] inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                    </div>

                    <div className="flex xsm:flex-col text-[clamp(14px,1vw,18px]">
                        <label className="inline-block w-[120px] font-bold ">Option 1:</label><input value={q.op1} required name="op1" placeholder="Type Option 1" type={"text"} className="min-w-[280px] inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>{q.correctOp === q.op1?<div className="flex"><label>Correct Option</label><input checked name={"co"+q.id} type="radio"></input></div>:<div className="flex"><label>Correct Option</label><input name={"co"+q.id} type="radio"></input></div>}
                    </div>

                    <div className="flex xsm:flex-col text-[clamp(14px,1vw,18px]">
                        <label className="inline-block w-[120px] font-bold ">Option 2:</label><input value={q.op2} required name="op2" placeholder="Type Option 2" type={"text"} className="min-w-[280px] inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>{q.correctOp === q.op2?<div className="flex"><label>Correct Option</label><input checked name={"co"+q.id} type="radio"></input></div>:<div className="flex"><label>Correct Option</label><input name={"co"+q.id} type="radio"></input></div>}
                    </div>

                    <div className="flex xsm:flex-col text-[clamp(14px,1vw,18px]">
                        <label className="inline-block w-[120px] font-bold ">Option 3:</label><input value={q.op3} required name="op3" placeholder="Type Option 3" type={"text"} className="min-w-[280px] inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>{q.correctOp === q.op3?<div className="flex"><label>Correct Option</label><input checked name={"co"+q.id} type="radio"></input></div>:<div className="flex"><label>Correct Option</label><input name={"co"+q.id} type="radio"></input></div>}
                    </div>

                    <div className="flex xsm:flex-col text-[clamp(14px,1vw,18px]">
                        <label className="inline-block w-[120px] font-bold ">Option 4:</label><input value={q.op4} required name="op4" placeholder="Type Option 4" type={"text"} className="min-w-[280px] inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>{q.correctOp === q.op4?<div className="flex"><label>Correct Option</label><input checked name={"co"+q.id} type="radio"></input></div>:<div className="flex"><label>Correct Option</label><input name={"co"+q.id} type="radio"></input></div>}
                    </div>

                    <div className="flex gap-[5px]">
                        <button onClick={()=>{setSingleQuestion([q,e]);showEditQuestionModalHandler()}} type="submit" className="bg-[#81c2ff] min-w-[60px] w-[8.25vw] h-[4.351vh] min-h-[29px] text-white font-bold rounded-full">Edit</button>
                        <button onClick={()=>{deleteQuestionHandler(q.id)}} type="submit" className="bg-[#e96857] w-[8.25vw] h-[4.351vh] min-h-[29px] min-w-[60px] text-white font-bold rounded-full">Delete</button>
                    </div>
                </div>
            </div>
            )
        }):<h2>No Question Available, Please add Question.</h2>
        }
        </div>
    </div>
    </>
    )
}