import axios from "axios";
import { useEffect, useState } from "react";
import { URL } from "../../App";

export default function PropgressModal(props){
    const hideModal=()=>{
        props.hideModalHandler()
    }


    const [result,setResult]=useState([]);

    useEffect(()=>{
        let userId=props?.userId;
        axios.get(URL+"/result/"+userId).then((res)=>{
            console.log(res.data.res)
            setResult(res.data.res);
        }).catch(err=>{
            console.log(err);
        })
    },[])

    const [examData,setExamData]=useState([])

    useEffect(()=>{
        let userId=props?.userId;
        axios.get(URL+"/exam/"+userId).then((res)=>{
            setExamData(res.data.res);
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    const [trainingData,setTrainingData]=useState([]);

    useEffect(()=>{
        let userId=props?.userId;

        axios.get(URL+"/training/"+userId).then((res)=>{
            console.log(res.data.res)
            setTrainingData(res.data.res);
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    return(
        <>
        <div className="w-[calc(100vw)] h-[100vh] fixed top-[calc(0%)] left-[calc(0%)] bg-black opacity-30">
        </div>
        <div className="w-[calc(100vw)] h-[100vh] fixed z-40 top-[calc(0%)] left-[calc(0%)]">
            
            <div className="w-[61vw] shadow-md h-[51.45vh] min-h-[82.95625942684767vh] min-w-[91.50805270863836vw] overflow-x-hidden  flex flex-col opacity-100 relative z-50 bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[30px]">
                <img onClick={hideModal} src="./images/xmark-solid.svg" alt="" className="absolute right-[5%] w-[20px] top-[5%] text-gray-300 cursor-pointer"/>
                <div className="text-center bg-[#f4f5f5] min-h-[15%] pt-[25px]"><h2>Progress</h2></div>
                <div className="flex xsm:flex-col sm:flex-col w-[100%]">
                        <div className="flex-1">
                            <table class="table-auto w-[90%] xsm:m-auto ml-[30px] mt-[30px]">
                                <thead>
                                    <tr className="flex justify-between border-b-[2px]">
                                        <th className="text-left">Chapter Title</th>
                                        <th className=" text-left">Progress</th>
                                    </tr>
                                </thead>
                                <tbody >
                                {trainingData.length> 0 ?trainingData.map((t)=>{
                                    let width=t.progress+"%";
                                    return(
                                    <tr className="flex my-[20px] justify-between">
                                        <td className="cursor-pointer flex gap-[10px]">
                                            <div className="w-[50px] h-[50px] rounded-full"><img src="./images/play.png"></img></div>
                                            <div  className="flex flex-col">
                                                <h3>{t.title}</h3>
                                                <p className="text-[#a4a5a5] text-[14px]">{t.description}</p>
                                            </div>
                                        </td>
                                        <td className=" flex flex-col">
                                            <h2 className="text-blue-400 w-[11.42vw] text-center">{t.progress}%</h2>
                                            <div className="w-[11.42vw] min-w-[100px] h-[3px] bg-gray-200">
                                                <div style={{width}} className={`h-[100%] bg-blue-400`}></div>
                                            </div>
                                        </td>
                                    </tr>
                                    )
                                }):trainingData.length===0?<h2>No Videos.</h2>:<h2>Loading Videos</h2>}
                                </tbody>
                            </table>
                        </div>


                    <div className="flex-1  flex flex-col">
                        <div>

                        <table class="table-auto w-[90%] xsm:m-auto ml-[30px] mt-[30px]">
                            <thead>
                                <tr className="flex justify-between border-b-[2px]">
                                    <th className=" text-left">Exam Title</th>
                                    <th className=" text-left">Progress</th>
                                </tr>
                            </thead>
                            <tbody>
                            {examData && examData.map((e)=>{
                                let width= (e.attemptedQuestions / e.totalquestion)*100
                                width=width+"%"
                                return(
                                <tr className="flex my-[20px] justify-between">
                                    <td className="cursor-pointer flex gap-[10px]">
                                        <div className="w-[50px] h-[50px] rounded-full"><img src="./images/play.png"></img></div>
                                        <div className="flex flex-col">
                                            <h3>{e.title}</h3>
                                            <p className="text-[#a4a5a5] text-[14px]">{e.description}</p>
                                        </div>
                                    </td>
                                    <td className="flex flex-col text-blue-400">
                                    <h2 className="w-[11.42vw] text-center min-w-[100px]">{e.totalquestion === e.attemptedQuestions?"Finished":"Not Finised"}</h2>
                                        <div className="w-[11.42vw] min-w-[100px] h-[3px] bg-gray-200">
                                            <div style={{width}} className="h-[100%] bg-blue-400"></div>
                                        </div>
                                    </td>
                                </tr>
                                )})}
                            </tbody>
                </table>
                </div>

                <div className="pb-[100px]">
                    <table class="table-auto w-[90%] ml-[30px] mt-[30px]">
                        <thead>
                            <tr className="flex border-b-[2px] justify-between">
                                <th className="text-left">Exam Title</th>
                                <th className=" text-center w-[11.49vw] min-w-[100px]">Your score</th>
                            </tr>
                        </thead>
                        <tbody>
                        {examData && examData.map((e)=>{return(
                            <tr className="flex my-[20px] justify-between">
                                <td className="flex gap-[10px]">
                                    <div className="flex flex-col">
                                        <h3>{e.title}</h3>
                                    </div>
                                </td>
                                {e.attemptedQuestions === e.totalquestion?
                                <td className="flex gap-[0.4vw] w-[11.49vw] min-w-[100px] items-center text-[#a4a5a5]">
                                    <img className="w-[15px]" src={e.result>79?"./images/tick-g.png":"./images/x-mark-b.png"}/>
                                    <h2 className=" text-center">{e.result}%</h2>
                                </td>
                                :<td className="flex gap-[0.4vw] w-[11.49vw] min-w-[100px] items-center text-[#a4a5a5]">
                                    <img className="w-[15px]" src={"./images/x-mark-r.png"}/>
                                    <h2 className="text-center">Not Finised</h2>
                                </td>}
                            </tr>
                        )})}
                        </tbody>
                    </table>
                </div>

                    </div>
                </div>
            </div>
        </div>
        </>
    )
}