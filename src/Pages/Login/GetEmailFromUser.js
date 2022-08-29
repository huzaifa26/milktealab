import axios from "axios";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import emailjs from '@emailjs/browser';
import { URL } from "../../App";

const MailService = async (data) => {
    return new Promise((resolve)=>{
        data.link = 'http://localhost:3000/change-password/' + data.id;
        emailjs
          .send('service_cgjx1fg', 'template_ojllmfn', data, 'PCrkZDdTgRVPTxMHf')
          .then(
            (result) => {
              console.log();
              toast('Email sent', {
                position: toast.POSITION.TOP_RIGHT,
              });
              resolve(result.text);
            },
            (error) => {
              console.log(error.text);
              toast("Email cannot be sent");
            }
          );
    })
  };
  

export default function GetEmailFromUser(props){

    const navigate=useNavigate()
    const formRef=useRef();
    const getEmail=(e)=>{
        e.preventDefault();

        let data={
            email:formRef.current.email.value
        }

        axios.get(URL+"/getUser/"+data.email).then((res)=>{
            console.log(res.data.res[0]);
            MailService(res.data.res[0]).then((res)=>{
                console.log(res);
                navigate("/")
            })
        }).catch((err)=>{
            console.log(err);
            toast("User not found")
        })
    }

    return(
        <div className="w-[calc(100vw - 100%)] h-[100vh]">
            <img className="w-[13.354vw] min-w-[150px] absolute top-[6%] left-[5%]" src="./images/Logo.png" alt=""></img>
            <form ref={formRef} onSubmit={getEmail} className="flex flex-col h-full justify-center items-center gap-[18px] xsm:mt-[0px]">
                <div className="xsm:flex xsm:flex-col text-[clamp(14px,1vw,18px]">
                    <label className="inline-block w-[120px] font-bold ">Email:</label><input required name="email" placeholder="Type email to proceed" type={"email"} className="min-w-[280px] inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="bg-[#81c2ff] min-w-[150px] min-h-[30px] w-[14.25vw] h-[4.351vh] text-white font-bold rounded-full">Apply now</button>
                </div>
            </form>
        </div>
    )
}