import { async } from "@firebase/util";
import axios from "axios";
import moment from "moment-timezone";
import { useState,useEffect, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { URL } from "../../App";
import ExamSingleQuestion from "./ExamSingleQuestion";
import { useNavigate } from "react-router-dom";

export default function AttemptExam(props){
    const navigate=useNavigate();
    const location=useLocation();
    const e=location.state;
    const [questions,setQuestions]=useState();
    const [singleQuestion,setSingleQuestion]=useState();

    let user;
    user=localStorage.getItem("user");
    user=JSON.parse(user);

    useEffect(()=>{
        console.log(user.id);
        axios.get(URL+"/question/"+e?.id).then((res)=>{
            setQuestions(res.data.res);
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    const [quizStarted,setQuizStarted]=useState(false);
    const [quizFinished,setQuizFinished]=useState(false);
    const [counter,setCounter]=useState(0);
    const startExamhandler=()=>{
        let newArr=[...questions]
        setSingleQuestion(newArr.shift())
        setQuestions([...newArr]);
        setQuizStarted(true);
    }

    useEffect(()=>{
        axios.delete(URL+"/deleteQuestionResult/"+e?.id+'/'+user.id).then((res)=>{
            console.log(res.data.res);
        }).catch(err=>{
            console.log(err);
        })
    },[quizStarted])

    const getData=(data)=>{
        return new Promise((resolve)=>{
            axios.post(URL+"/attemptedQuestion",data).then((res)=>{
                    let newArr=[...questions]
                    setSingleQuestion(newArr.shift())
                    setQuestions([...newArr]);
                    
                    if(questions.length>0){
                        setCounter(counter=>counter+1);
                    }
                    
                    if(questions.length===0){
                        axios.post(URL+"/result",data).then((res)=>{
                            toast("Exam Submitted")
                            navigate("/exam")
                            // setQuizFinished(true);
                            
                        }).catch(err=>{
                            console.log(err);
                        })
                    }
                        resolve("true")
            }).catch((err)=>{
                console.log(err);
            })
        })
    }

    return(
        <>
            <div className="w-[100%] h-[100%] pt-[20px]">
                <div className="w-[91%] m-auto pt-[30p]">
                    {quizStarted === false && 
                    <>
                        <h2 >Exam Name: {e?.title}</h2>
                        <h3>Total Questions: {questions?.length} Questions</h3>
                        <button onClick={startExamhandler} class="min-w-[136px] h-[4.3518518518519vh] min-h-[29px] mt-[2.051vw] mb-[1.221vw] rounded-full py-1 w-[14.258vw] text-[clamp(14px,0.801vw,32.82px)] bg-[#81c2ff] text-white uppercase font-bold">
                            Start Exam
                        </button>
                    </>
                    }

                    {(quizStarted === true && quizFinished === false) && 
                        <ExamSingleQuestion e={e} getData={getData} counter={counter} singleQuestion={singleQuestion}/>
                    }

                    {quizFinished === true &&
                        <h2>Exam Finished, Please wait for result.</h2>
                    }
                </div>
            </div>
        </>
    )
}