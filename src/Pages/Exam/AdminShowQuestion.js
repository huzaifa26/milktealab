import axios from "axios";
import { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import { URL } from "../../App";

export default function AdminShowQuestion(props){
    const [questions,setQuestion]=useState();
    const location=useLocation();
    const e=location.state;

    useEffect(()=>{
        axios.get(URL+"/question/"+e.id).then((res)=>{
            setQuestion(res.data.res);
        }).catch((err)=>{
            console.log(err);
        })
    },[])


    return(
    <div className="w-[100%] h-[100%] pt-[20px]">
        <div className="w-[91%] m-auto">

        {questions && questions.map((q)=>{
            console.log(q.correctOp)
            return(
            <div className="flex-1 flex flex-col gap-[18px] items-start justify-center mt-[30px]">
                <div className="text-[1vw]">
                    <label className="inline-block w-[120px] font-bold ">Exam:</label>
                    <input required name="question" placeholder="Type Question" value={e.title} type={"text"} className="inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                </div>
                
                <div className="text-[1vw]">
                    <label className="inline-block w-[120px] font-bold ">Question:</label><input value={q.question} required name="question" placeholder="Type Question" type={"text"} className="inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                </div>

                <div className="text-[1vw]">
                    <label className="inline-block w-[120px] font-bold ">Option 1:</label><input value={q.op1} required name="op1" placeholder="Type Option 1" type={"text"} className="inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>{q.correctOp === q.op1?<><label>Correct Option</label><input checked name="co" type="radio"></input></>:<><label>Correct Option</label><input name="co" type="radio"></input></>}
                </div>

                <div className="text-[1vw]">
                    <label className="inline-block w-[120px] font-bold ">Option 2:</label><input value={q.op2} required name="op2" placeholder="Type Option 2" type={"text"} className="inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>{q.correctOp === q.op2?<><label>Correct Option</label><input checked name="co" type="radio"></input></>:<><label>Correct Option</label><input name="co" type="radio"></input></>}
                </div>

                <div className="text-[1vw]">
                    <label className="inline-block w-[120px] font-bold ">Option 3:</label><input value={q.op3} required name="op3" placeholder="Type Option 3" type={"text"} className="inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>{q.correctOp === q.op3?<><label>Correct Option</label><input checked name="co" type="radio"></input></>:<><label>Correct Option</label><input name="co" type="radio"></input></>}
                </div>

                <div className="text-[1vw]">
                    <label className="inline-block w-[120px] font-bold ">Option 4:</label><input value={q.op4} required name="op4" placeholder="Type Option 4" type={"text"} className="inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>{q.correctOp === q.op4?<><label>Correct Option</label><input checked name="co" type="radio"></input></>:<><label>Correct Option</label><input name="co" type="radio"></input></>}
                </div>
            </div>
            )
        })

        }
        

        </div>
    </div>
    )
}