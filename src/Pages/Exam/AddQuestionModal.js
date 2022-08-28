import axios from "axios";
import { useEffect, useRef } from "react";
import { URL } from "../../App";
import moment from "moment-timezone";
import { toast } from "react-toastify";

export default function AddQuestionModal(props){
    const formRef=useRef();

    const hideModal=()=>{
        props.hideAddQuestionModelHandler()
    }
    
    const examFormHandler=(e)=>{
        e.preventDefault();

        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const currentTime = moment().tz(timezone).format();
        const datetime = currentTime.slice(0, 19).replace('T', ' ');
    
        let data={
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
        axios.post(URL+"/question",data).then((res)=>{
            console.log(res);
            toast("Question Added");
            props.hideAddQuestionModelHandler()
        }).catch((err)=>{
            console.log(err);
        })
    }


    return(
        <>
            <div className="w-[calc(100vw)] h-[100vh] fixed top-[calc(0%)] left-[calc(0%)] bg-black opacity-30">
            </div>

            <div className="w-[calc(100vw)]  h-[100vh] fixed top-[calc(0%)] left-[calc(0%)]">
                <div className="shadow-md h-[81.45vh] max-h-[70.95625942684767vh] xsm:min-w-[96%] sm:w-[80%] w-[60%] overflow-x-hidden  flex flex-col opacity-100 relative z-50 bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[30px]">
                    
                    <div>
                        <img onClick={hideModal} src="./images/xmark-solid.svg" alt="" className="absolute right-[5%] w-[20px] top-[5%] text-gray-300 cursor-pointer"/>
                        <div className="text-center bg-[#f4f5f5] min-h-[15%] py-[25px]">Add Exam</div>
                    </div>
                    <form ref={formRef} onSubmit={examFormHandler} className="m-auto flex-1 flex flex-col gap-[18px] items-center xsm:w-[100%] w-[60%] justify-center">
                        
                        <div className="xsm:flex xsm:flex-col text-[clamp(14px,1vw,18px]">
                            <label className="inline-block w-[120px] font-bold ">Select Exam:</label>
                            <select required name="examId" className="inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2 min-w-[280px]">
                                <option value={""}>Choose Exam</option>
                                
                                {props.examData.map((e)=>{
                                    return(
                                        <option value={e.id}>{e.title}</option>
                                    )
                                })
                                }
                            </select>
                        </div>
                        
                        <div className="flex xsm:flex-col text-[clamp(14px,1vw,18px]">
                            <label className="inline-block w-[120px] font-bold ">Question:</label><input required name="question" placeholder="Type Question" type={"text"} className="inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2 min-w-[280px]"></input>
                        </div>

                        <div className="flex xsm:flex-col text-[clamp(14px,1vw,18px]">
                            <label className="inline-block w-[120px] font-bold ">Option 1:</label><input required name="op1" placeholder="Type Option 1" type={"text"} className="inline-block w-[17vw] min-w-[280px] text-[#a4a5a5] border-b-[2px] indent-2"></input><div className="flex"><label className="w-[120px]">Correct Option</label><input value={1} required name="co" type="radio"></input></div>
                        </div>

                        <div className="flex xsm:flex-col text-[clamp(14px,1vw,18px]">
                            <label className="inline-block w-[120px] font-bold ">Option 2:</label><input required name="op2" placeholder="Type Option 2" type={"text"} className="inline-block w-[17vw] min-w-[280px] text-[#a4a5a5] border-b-[2px] indent-2"></input><div className="flex"><label className="w-[120px]">Correct Option</label><input value={2} required name="co" type="radio"></input></div>
                        </div>

                        <div className="flex xsm:flex-col text-[clamp(14px,1vw,18px]">
                            <label className="inline-block w-[120px] font-bold ">Option 3:</label><input required name="op3" placeholder="Type Option 3" type={"text"} className="inline-block w-[17vw] min-w-[280px] text-[#a4a5a5] border-b-[2px] indent-2"></input><div className="flex"><label className="w-[120px]">Correct Option</label><input value={3} required name="co" type="radio"></input></div>
                        </div>

                        <div className="flex xsm:flex-col text-[clamp(14px,1vw,18px]">
                            <label className="inline-block w-[120px] font-bold ">Option 4:</label><input required name="op4" placeholder="Type Option 4" type={"text"} className="inline-block w-[17vw] min-w-[280px] text-[#a4a5a5] border-b-[2px] indent-2"></input><div className="flex"><label className="w-[120px]">Correct Option</label><input value={4} required name="co" type="radio"></input></div>
                        </div>

                        <div className="flex justify-center mt-[20px] self-center xsm:mb-[30px]">
                            <button type="submit" className="bg-[#81c2ff] w-[14.25vw] h-[28.847130000000003px] min-w-[136px] text-white font-bold rounded-full">Apply now</button>
                        </div>
                        
                    </form>
                </div>   
            </div>
        </>
    )
}