import axios from "axios";
import { useEffect, useRef } from "react";
import { URL } from "../../App";
import moment from "moment-timezone";

export default function AddQuestionModal(props){
    const formRef=useRef();

    const hideModal=()=>{
        props.hideAddQuestionModelHandler()
    }
    
    const examFormHandler=(e)=>{
        e.preventDefault();

        console.log(formRef.current.title.value)
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
            datetime:datetime
        }
        console.log(data);
        // axios.post(URL+"/exam",data).then((res)=>{
        //     console.log(res);
        //     props.hideAddQuestionModelHandler()
        // }).catch((err)=>{
        //     console.log(err);
        // })
    }


    return(
        <>
            <div className="w-[calc(100vw)] h-[100vh] absolute top-[calc(0%-121.44px)] left-[calc(0%-17.547584187408493vw)] bg-black opacity-30">
            </div>

            <div className="w-[calc(100vw)]  h-[100vh] absolute z-40 top-[calc(0%-121.44px)] left-[calc(0%-17.547584187408493vw)]">
                <div className="shadow-md h-[81.45vh] max-h-[70.95625942684767vh] max-w-[60vw] overflow-x-hidden  flex flex-col opacity-100 relative z-50 bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[30px]">
                    
                    <div>
                        <img onClick={hideModal} src="/images/xmark-solid.svg" alt="" className="absolute right-[5%] w-[20px] top-[5%] text-gray-300"/>
                        <div className="text-center bg-[#f4f5f5] min-h-[15%] py-[2.5%]">Add Exam</div>
                    </div>
                    <form ref={formRef} onSubmit={examFormHandler} className="flex-1 flex flex-col gap-[18px] items-start w-[60%] m-auto justify-center">
                        
                        <div className="text-[1vw]">
                            <label className="inline-block w-[120px] font-bold ">Select Exam:</label>
                            <select name="examId" className="inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2">
                            <option disabled selected>Choose Exam</option>
                            
                            {props.examData.map((e)=>{
                                return(
                                    <option value={e.id}>{e.title}</option>
                                )
                            })
                            }
                        </select>
                        </div>
                        
                        <div className="text-[1vw]">
                            <label className="inline-block w-[120px] font-bold ">Question:</label><input required name="question" placeholder="Type Question" type={"text"} className="inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                        </div>

                        <div className="text-[1vw]">
                            <label className="inline-block w-[120px] font-bold ">Option 1:</label><input required name="op1" placeholder="Type Option 1" type={"text"} className="inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input><lebel>Correct Option</lebel><input value={1} name="co" type="radio"></input>
                        </div>

                        <div className="text-[1vw]">
                            <label className="inline-block w-[120px] font-bold ">Option 2:</label><input required name="op2" placeholder="Type Option 2" type={"text"} className="inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input><lebel>Correct Option</lebel><input value={2} name="co" type="radio"></input>
                        </div>

                        <div className="text-[1vw]">
                            <label className="inline-block w-[120px] font-bold ">Option 3:</label><input required name="op3" placeholder="Type Option 3" type={"text"} className="inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input><lebel>Correct Option</lebel><input value={3} name="co" type="radio"></input>
                        </div>

                        <div className="text-[1vw]">
                            <label className="inline-block w-[120px] font-bold ">Option 4:</label><input required name="op4" placeholder="Type Option 4" type={"text"} className="inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input><lebel>Correct Option</lebel><input value={4} name="co" type="radio"></input>
                        </div>

                        <div className="flex justify-center mt-[20px] self-center">
                            <button type="submit" className="bg-[#81c2ff] w-[14.25vw] h-[4.351vh] text-white font-bold rounded-full">Apply now</button>
                        </div>
                    </form>
                </div>   
            </div>
        </>
    )
}