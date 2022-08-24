import { useRef } from "react";
import "./Login.css";
import axios from "axios";
import { URL } from "../../App";
import { Link, useNavigate } from "react-router-dom";

export default function Login(){
    const navigate=useNavigate();
    const formRef=useRef();

    const loginFormHandler=(e)=>{
        e.preventDefault();
        let data={
            email:formRef.current.email.value,
            password:formRef.current.password.value,
        }

        axios.post(URL+"/signin",data).then((res)=>{
            let user=res.data.res[0];
            delete user.pass
            localStorage.setItem('user',JSON.stringify(user));
            navigate("/dashboard");
            console.log(localStorage.getItem("user"))
        }).catch((err)=>{
            console.log(err);
        })
    }

    return (
    <div class='bg-white h-screen w-screen flex justify-center items-center'>
        <div class="px-6 py-3 rounded shadow-md w-[21.216vw]">
            <div class="flex flex-col items-center justify-center mt-[4.271vh] mb-4">
                <h2 class="text-[clamp(32px,1.978vw,81px)] font-bold">Login</h2>
            </div>
            <form ref={formRef} onSubmit={loginFormHandler}>
                {/* <!-- username --> */}
                <div class="flex flex-col my-2">
                    <label class="text-[clamp(14px,0.801vw,32.82px)] font-bold text-[#000000] ">Username</label>
                    <input name="email" class="text-[clamp(14px,0.586vw,24px)] border-b-[0.23148148148148vh] rounded px-3 py-1 mt-2 emailIcon" type="text" placeholder="Type your username"/>
                </div>
                <div class="flex flex-col mt-10">
                    <label class="text-[clamp(14px,0.801vw,32.82px)] font-bold text-[#000000]">Password</label>
                    <input name="password" class="text-[clamp(14px,0.586vw,24px)] border-b-[0.23148148148148vh] rounded px-3 py-1 mt-2 passwordIcon" type="password" placeholder="Type your password"/>
                </div>
                <div class="flex flex-col items-center justify-center my-3">
                    <div class="flex w-full items-center justify-between text-xs text-gray-500">
                        <label className="flex items-center justify-center text-[clamp(12px,0.659vw,27px)] text-[#000] font-semibold"><input type={"checkbox"}/> Remember me.</label>
                        <p className="text-[clamp(12px,0.659vw,27px)] text-[#000] font-semibold">Forgot password?</p>
                    </div>
                    <button class="h-[4.3518518518519vh] mt-[2.051vw] mb-[1.221vw] rounded-full py-1 w-[14.258vw] text-[clamp(14px,0.801vw,32.82px)] bg-[#81c2ff] text-white uppercase font-bold">
                        Submit
                    </button>
                    <Link to={"/application"}>
                    <button class="mb-[4.443vh] h-[4.3518518518519vh] my-1 rounded-full py-1 w-[14.258vw] text-[clamp(14px,0.801vw,32.82px)] bg-white border-2 border-[#e0e0e0] text-[#e0e0e0] font-bold uppercase">
                        Apply for free
                    </button>
                    </Link>
                    
                </div>
            </form>
        </div>
    </div>
    )
}