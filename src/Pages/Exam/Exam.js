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

    useEffect(()=>{
        axios.get(URL+"/exam").then((res)=>{
            setExamData(res.data.res);
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
    },[addExamModel,editExamModel])
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
        }).catch(err=>{
            console.log(err);
        })
    },[])

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
                        <button onClick={showAddExamModelHandler} class="h-[4.3518518518519vh] mt-[2.051vw] mb-[1.221vw] rounded-full py-1 w-[14.258vw] text-[clamp(14px,0.801vw,32.82px)] bg-[#81c2ff] text-white uppercase font-bold">
                            Add Exam
                        </button>
                        <button onClick={showAddQuestionModelHandler} class="h-[4.3518518518519vh] mt-[2.051vw] mb-[1.221vw] rounded-full py-1 w-[14.258vw] text-[clamp(14px,0.801vw,32.82px)] bg-[#81c2ff] text-white uppercase font-bold">
                            Add Question
                        </button>
                    </div>
                }
                
                <table class="table-auto w-[90%] mt-[30px]">
                    <thead>
                        <tr className="flex border-b-[2px] justify-between">
                            <th className="text-left">Chapter Title</th>
                            <th className="w-[11.42vw] text-center">Progress</th>
                           {user.role === "admin" && <th className="w-[16.5vw] text-center">Actions</th>}

                        </tr>
                    </thead>
                    <tbody>
                    {examData.map((e)=>{return(
                        <tr className="flex my-[20px] justify-between">
                            <td onClick={()=>examonClickhanlder(e)} className="cursor-pointer flex gap-[10px]">
                                <div className="w-[50px] h-[50px] rounded-full"><img src="/images/play.png"></img></div>
                                <div className="flex flex-col">
                                    <h3>{e.title}</h3>
                                    <p>{e.description}</p>
                                </div>
                            </td>
                            <td className="flex flex-col text-blue-400">
                            <h2 className="w-[11.42vw] text-center">Finished</h2>
                                <div className="w-[11.42vw] h-[3px] bg-gray-200">
                                    <div className="w-[33%] h-[100%] bg-blue-400"></div>
                                </div>
                            </td>
                            {user.role === "admin" && 
                                <td className="flex gap-[5px]">
                                    <button onClick={()=>{setSingleExam(e);showEditExamnModelHandler(true);}} type="submit" className="bg-[#81c2ff] w-[8.25vw] h-[4.351vh] text-white font-bold rounded-full">Edit</button>
                                    {/* <button type="submit" className="bg-[#e96857] w-[8.25vw] h-[4.351vh] text-white font-bold rounded-full">Delete</button> */}
                                </td>
                            }
                        </tr>
                        )})}
                       
                    </tbody>
                </table>
            </div>

            {user.role !== "admin" &&
            <div className="w-[91%] h-[100%] m-auto pb-[100px]">
                <table class="table-auto w-[90%] mt-[30px]">
                    <thead>
                        <tr className="flex border-b-[2px] justify-between">
                            <th className="text-left">Exam Title</th>
                            <th className=" text-center w-[11.49vw]">Your score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.map((r)=>{return(
                            <tr className="flex my-[20px] justify-between">
                                <td className="flex gap-[10px]">
                                    <div className="flex flex-col">
                                        <h3>{r.exam.title}</h3>
                                    </div>
                                </td>
                                <td className="flex gap-[0.4vw] w-[11.49vw] items-center text-[#a4a5a5]">
                                    <img className="w-[1.07vw]" src={r.result>79?"/images/tick-g.png":r.result<79?"/images/x-mark-b.png":r.attemptedQuestions!==r.totalquestion?"/images/x-mark-r.png":""}/>
                                    <h2 className=" text-center">{r.result}%</h2>
                                </td>
                            </tr>
                        )})}
                        

                        <tr className="flex my-[20px] justify-between">
                            <td className="flex gap-[10px]">
                                <div className="flex flex-col">
                                    <h3>Drinking Exam</h3>
                                </div>
                            </td>
                            <td className="flex gap-[0.4vw] w-[11.49vw] items-center text-[#a4a5a5]">
                                <img className="w-[1.07vw]" src="/images/x-mark-b.png"/>
                                <h2 className=" text-center">79%</h2>
                            </td>
                        </tr>

                        <tr className="flex my-[20px] justify-between">
                            <td className="flex gap-[10px]">
                                <div className="flex flex-col">
                                    <h3>Drinking Exam</h3>
                                </div>
                            </td>
                            <td className="flex gap-[0.4vw] w-[11.49vw] items-center text-[#a4a5a5]">
                                <img className="w-[1.07vw]" src="/images/x-mark-r.png"/>
                                <h2 className="ext-center">Not Finished</h2>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
            }
        </div>
        </>
    )
}