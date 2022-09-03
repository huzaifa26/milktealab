import axios from "axios";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";
import { URL } from "../../App";

export default function ChangePassword(props){
    const navigete=useNavigate();

    const params=useParams();
    const formRef=useRef();
    const changePassword=(e)=>{
        e.preventDefault();

        let data={
            id:params.id,
            pass:formRef.current.pass.value
        }

        axios.put(URL+"/changePassword",data).then((res)=>{
            console.log(res.data.res);
            toast("Password Changed");
            navigete("/");
        }).catch(err=>{
            toast("Error changing password");
        })
    }

    return(
        <div className="w-[calc(100vw - 100%)] h-[100vh]">
            <img className="w-[13.354vw] min-w-[150px] absolute top-[6%] left-[5%]" src="./images/Logo.png" alt=""></img>
            <form ref={formRef} onSubmit={changePassword} className="flex flex-col h-full justify-center items-center gap-[18px] xsm:mt-[0px]">
                <div className="xsm:flex xsm:flex-col text-[clamp(14px,1vw,18px]">
                    <label className="inline-block w-[120px] font-bold ">New password:</label><input required name="pass" placeholder="Type new password" type={"password"} className="min-w-[280px] inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="bg-[#81c2ff]  min-w-[150px] min-h-[30px] w-[14.25vw] h-[4.351vh] text-white font-bold rounded-full">Apply now</button>
                </div>
            </form>
        </div>
    )
}