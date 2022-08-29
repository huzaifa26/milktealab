import axios from "axios";
import { useEffect, useState } from "react";
import { URL } from "../../App";
import AddExamModal from "./AddExamModal";
import EditExamModsl from "./EditExamModsl";
import AddQuestionModel from "./AddQuestionModal";
import { useNavigate } from "react-router-dom";

export default function Exam(props){
    const navigate=useNavigate();
    const [addExamModel,setAddExamModel]=useState(false);
    const [editExamModel,setEditExamModel]=useState(false);
    const [addQuestionModel,setAddQuestionModel]=useState(false);
    const [editQuestionModel,setEditQuestionModel]=useState(false);
    const [singleExam,setSingleExam]=useState(false);
    const [examData,setExamData]=useState([])

    const showAddExamModelHandler=()=>{
        setAddExamModel(true)
    }
    const hideAddExamModelHandler=()=>{
        setAddExamModel(false)
    }

    const showEditExamnModelHandler=()=>{
        setEditExamModel(true)
    }

    const hideEditExamModelHandler=()=>{
        setEditExamModel(false)
    }

    const showAddQuestionModelHandler=()=>{
        setAddQuestionModel(true)
    }
    const hideAddQuestionModelHandler=()=>{
        setAddQuestionModel(false)
    }

    const showEditQuestionModelHandler=()=>{
        setEditQuestionModel(true)
    }

    const hideEditQuestionModelHandler=()=>{
        setEditQuestionModel(false)
    }
    
    let user=localStorage.getItem(("user"));
    user=JSON.parse(user);

    const examonClickhanlder=(e)=>{
        if(user.role === "admin"){
            navigate("/admin-question",{state:e})
            return;
        }
        navigate("/attempt-exam",{state:e})
    }

    const [result,setResult]=useState([]);

    useEffect(()=>{
        axios.get(URL+"/result/"+user.id).then((res)=>{
            setResult(res.data.res);
            console.log(res.data.res)
        }).catch(err=>{
            console.log(err);
        })
    },[])

    useEffect(()=>{
        axios.get(URL+"/exam/"+user.id).then((res)=>{
            setExamData(res.data.res);
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
    },[addExamModel,editExamModel])

    return(
        <>
        {addExamModel &&
            <AddExamModal hideAddExamModelHandler={hideAddExamModelHandler}></AddExamModal>
        }
        {editExamModel &&
            <EditExamModsl singleExam={singleExam} hideAddQuestionModelHandler={hideEditExamModelHandler}></EditExamModsl>
        }

        {addQuestionModel &&
            <AddQuestionModel examData={examData} hideAddQuestionModelHandler={hideAddQuestionModelHandler}></AddQuestionModel>
        }
        {/* {editQuestionModel &&
            <EditExamModsl singleExam={singleExam} hideAddQuestionModelHandler={hideEditExamModelHandler}></EditExamModsl>
        } */}
        <div className="w-[100%] h-[100%]">
            <div className="w-[91%] h-[100%] m-auto">

                {user.role === "admin" && 
                    <div className="flex gap-[10px]">
                        <button onClick={showAddExamModelHandler} class="min-w-[140px] h-[28.852777777778098px] mt-[2.051vw] mb-[1.221vw] rounded-full py-1 w-[14.258vw] text-[clamp(14px,0.801vw,32.82px)] bg-[#81c2ff] text-white uppercase font-bold">
                            Add Exam
                        </button>
                        <button onClick={showAddQuestionModelHandler} class="min-w-[140px] h-[28.852777777778098px] mt-[2.051vw] mb-[1.221vw] rounded-full py-1 w-[14.258vw] text-[clamp(14px,0.801vw,32.82px)] bg-[#81c2ff] text-white uppercase font-bold">
                            Add Question
                        </button>
                    </div>
                }
                <div className="overflow-x-auto">
                
                <table class="min-w-[500px] table-auto w-[90%] mt-[30px]">
                    <thead>
                        <tr className="flex border-b-[2px] justify-between">
                            <th className="flex-1 text-left">Chapter Title</th>
                            {user.role === "member" &&
                                <th className="flex-1 w-[11.42vw] text-center min-w-[155.9972px]">Progress</th>
                            }
                           {user.role === "admin" && <th className="flex-1 w-[16.5vw] text-center">Actions</th>}

                        </tr>
                    </thead>
                    <tbody>
                    {examData && examData.map((e)=>{
                        let width=0+"%"
                        let examStatus="Not Finished";

                        if(e.totalquestion === e.attemptedQuestions && e.totalquestion !== 0){
                            examStatus="Finished";
                            width= (e.attemptedQuestions / e.totalquestion)*100;
                            width=width+"%";
                        }
                        return(
                        <tr className="flex my-[20px] justify-between">
                            <td onClick={()=>examonClickhanlder(e)} className="flex-1 cursor-pointer flex gap-[10px]">
                                <div className="w-[50px] h-[50px] rounded-full"><img src="./images/play.png"></img></div>
                                <div className="flex flex-col">
                                    <h3>{e.title}</h3>
                                    <p className="text-[#a4a5a5] text-[14px]">{e.description}</p>
                                </div>
                            </td>
                            {user.role === "member" &&
                                <td className="flex-1  flex flex-col items-center text-blue-400">
                                    <h2 className="w-[11.42vw] text-center">{examStatus}</h2>
                                    <div className="w-[11.42vw] min-w-[155.9972px] h-[3px] bg-gray-200">
                                        <div style={{width}} className="h-[100%] bg-blue-400"></div>
                                    </div>
                                </td>
                            }
                            {user.role === "admin" && 
                                <td className="flex-1 flex gap-[5px] justify-center">
                                    <button onClick={()=>{setSingleExam(e);showEditExamnModelHandler(true);}} type="submit" className="bg-[#81c2ff] w-[8.25vw] h-[4.351vh] min-w-[60px] text-white font-bold rounded-full">Edit</button>
                                    {/* <button type="submit" className="bg-[#e96857] w-[8.25vw] h-[4.351vh] text-white font-bold rounded-full">Delete</button> */}
                                </td>
                            }
                        </tr>
                        )})}
                       
                    </tbody>
                </table>
                </div>
            </div>

            {user.role !== "admin" &&
            <div className="w-[91%] h-[100%] m-auto xsm:pb-[0px] pb-[100px] overflow-x-auto">
                <table class="table-auto w-[90%] mt-[30px] min-w-[500px]">
                    <thead>
                        <tr className="flex border-b-[2px] justify-between">
                            <th className="text-left">Exam Title</th>
                            <th className=" text-center w-[11.49vw]">Your score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {examData && examData.map((e)=>{

                            return(
                            <tr className="flex  my-[20px] justify-between">
                                <td className="flex gap-[10px]">
                                    <div className="flex flex-col">
                                        <h3>{e.title}</h3>
                                    </div>
                                </td>
                                {(e.attemptedQuestions === e.totalquestion) && (e.totalquestion!==0)?
                                <td className="flex gap-[0.4vw] w-[11.49vw] items-center text-[#a4a5a5]">
                                    <img className="w-[10.094100000000001px]" src={e.result>79?"./images/tick-g.png":"./images/x-mark-b.png"}/>
                                    <h2 className=" text-center">{e.result}%</h2>
                                </td>
                                :<td className="flex gap-[0.4vw] w-[11.49vw] items-center text-[#a4a5a5]">
                                    <img className="w-[10.094100000000001px]" src={"./images/x-mark-r.png"}/>
                                    <h2 className=" text-center">{"Not Finished"}</h2>
                                </td>}
                            </tr>
                        )})}
                    </tbody>
                </table>
            </div>
            }
        </div>
        </>
    )
}