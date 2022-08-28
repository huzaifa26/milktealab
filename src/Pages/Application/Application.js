import { useRef,useState } from "react";
import { toast } from "react-toastify";
import {URL} from "../../App";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Application(props){
    const navigate=useNavigate();

    const formRef=useRef();

    const applicationFormhandler=(e)=>{
        e.preventDefault();
        if(formRef.current.password.value !== formRef.current.confirmPassword.value){
            toast.warn("Password doesnot match");
            return
        }
        let data={
        userName:formRef.current.userName.value,
        email:formRef.current.email.value,
        password:formRef.current.password.value,
        phone:formRef.current.phone.value,
        mailingAddress:formRef.current.mailingAddress.value,
        desiredLocation:formRef.current.desiredLocation.value,
        budget:formRef.current.budget.value,
        question:formRef.current.question.value,
        }

        axios.post(URL+'/signup', data).then(function (response) {
            console.log(response)
            if(response.status === 200){
                toast("Application Submitted Succesfully");
                navigate("/");
            }
          })
          .catch(function (error) {
            console.log(error)
            if(error.response.data.err.code === "ER_DUP_ENTRY"){
                toast.error("Account already exists with this email");
            }
          });
    }

    return(
        <div className="w-[calc(100vw - 100%)] h-[100vh]">
            <img className="w-[13.354vw] min-w-[150px] absolute top-[-6%] left-[5%]" src="./images/Logo.png" alt=""></img>
            <div>
                <h1 className="text-center text-[clamp(32px,2vw,82px)] font-bold mt-[100px] xsm:mb-[50px] mb-[100px] ">Application</h1>

                <form ref={formRef} onSubmit={applicationFormhandler} className="flex flex-col gap-[18px] xsm:mt-[0px] mt-[18px]">
                    <div className="flex xsm:flex-col xsm:items-center justify-center xsm:gap-[18px] gap-[100px]">
                        
                        <div className="flex flex-col gap-[18px]">
                            <div className="text-[clamp(12px,1vw,22px)]">
                                <label className="inline-block w-[13.2vw] min-w-[80px] font-bold ">Email:</label><input required name="email" placeholder="Type your email" type={"email"} className="inline-block w-[17vw] min-w-[180px] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                            </div>

                            <div className="text-[clamp(12px,1vw,22px)]">
                                <label className="inline-block w-[13.2vw] min-w-[80px] font-bold ">Password:</label><input required name="password" placeholder="Type your password" type={"password"} className="inline-block w-[17vw] min-w-[180px] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                            </div>

                            <div className="text-[clamp(12px,1vw,22px)]">
                                <label className="inline-block w-[13.2vw] min-w-[80px] font-bold ">Confirm Password:</label><input required name="confirmPassword" placeholder="Confirm your password" type={"password"} className="inline-block w-[17vw] min-w-[180px] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                            </div>

                            <div className="text-[clamp(12px,1vw,22px)]">
                                <label className="inline-block w-[13.2vw] min-w-[80px] font-bold ">Username:</label><input required name="userName" autoComplete="off" placeholder="Type your username" type={"text"} className="inline-block w-[17vw] min-w-[180px] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                            </div>

                            <div className="text-[clamp(12px,1vw,22px)]">
                                <label className="inline-block w-[13.2vw] min-w-[80px] font-bold ">Phone:</label><input required name="phone" placeholder="Type your phone" type={"phone"} className="inline-block w-[17vw] min-w-[180px] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                            </div>

                            <div className="text-[clamp(12px,1vw,22px)]">
                                <label className="inline-block w-[13.2vw] min-w-[80px] font-bold ">Mailing Address:</label><input required name="mailingAddress" placeholder="Type your Mainling address" type={"address"} className="inline-block w-[17vw] min-w-[180px] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                            </div>
                        </div>

                        <div className="flex flex-col gap-[18px]">
                            <div className="text-[clamp(12px,1vw,22px)]">
                                <label className="inline-block w-[13.2vw] min-w-[80px] font-bold ">Desired Franchise Location:</label><input required name="desiredLocation" placeholder="Type your preffered location address" type={"text"} className="inline-block w-[17vw] min-w-[180px] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                            </div>

                            <div className="text-[clamp(12px,1vw,22px)]">
                                <label className="inline-block w-[13.2vw] min-w-[80px] font-bold ">Your Budget:</label><input required name="budget" placeholder="Type your bughet" type={"number"} className="inline-block w-[17vw] min-w-[180px] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                            </div>

                            <div className="text-[clamp(12px,1vw,22px)] flex">
                                <label className="inline-block w-[13.2vw] min-w-[80px] font-bold ">Question For Us:</label><textarea name="question" rows={4} placeholder="Any questions for us" type={"text"} className="inline-block w-[17vw] min-w-[180px] text-[#a4a5a5] border-b-[2px] indent-2"></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center xsm:mt-[30px] mt-[100px]">
                        <button type="submit" className="bg-[#81c2ff] min-w-[150px] min-h-[30px] w-[14.25vw] h-[4.351vh] text-white font-bold rounded-full">Apply now</button>
                    </div>
                </form>

            </div>

        </div>
    )
}