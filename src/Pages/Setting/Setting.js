import { async } from "@firebase/util";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { URL } from "../../App";
import { storage } from "../../Components/Firebase";
import PropgressModal from "../Dashboard/PropgressModal";

export default function Setting(props){

    const navigate=useNavigate()
    let user = localStorage.getItem('user'); 
    user=JSON.parse(user);

    // const [file,setFile]=useState(null);

    const formRef=useRef()

    let file={image:null}
    const formSubmitHandler=useCallback( async(e)=>{
        e.preventDefault();
        let data={...user};
        data.userName=formRef.current.userName.value
        data.desiredLocation=formRef.current.desiredLocation.value;
        data.mailingAddress=formRef.current.mailingAddress.value;
        data.email=formRef.current.email.value;
        data.phone=formRef.current.phone.value;
        data.oldpass=null;
        data.newpass=null;
        data.image=user.image;

        if(formRef.current.oldpass.value !== "" && formRef.current.newpass.value !== ""){
            data.oldpass=formRef.current.oldpass.value;
            data.newpass=formRef.current.newpass.value;
        }

        toast.loading("Updating User Information")
        if(file.image !== null){
            console.log("----------------------1----------------------------")
            try{
                const storageRef = ref(storage, `/profilepicture/${file.image[0].name}`);
                const uploadTask = await uploadBytes(storageRef, file.image[0]);
            
                getDownloadURL(ref(storage, `/profilepicture/${file.image[0].name}`)).then((url) => {
                    data.image=url;
                    axios.put(URL+"/user/"+user.id,data).then((res)=>{
                        if(res.data.res==="password doesnot match"){
                            toast.dismiss();
                            toast("Old password is incorrect");
                            return
                        }
                        axios.get(URL+"/user/"+user.id).then((res)=>{
                            localStorage.setItem('user',JSON.stringify(res.data.res[0]));
                            toast.dismiss();
                            toast("User updated");
                            props.changeStateHandler() 
                            navigate("#")
                        }).catch(err=>{
                            console.log(err);
                        })
                    }).catch((err)=>{
                        toast.dismiss();
                        toast("User Updated Failed");
                        console.log(err)
                    })
                })
            }catch(err){
                console.log(err);
            }
        }else if(file.image === null) {
            console.log("----------------------2----------------------------")
            axios.put(URL+"/user/"+data.id,data).then((res)=>{
                if(res.data.res==="password doesnot match"){
                    toast("Old password is incorrect");
                    return
                }
                console.log(res.data.res);
                axios.get(URL+"/user/"+user.id).then((res)=>{
                    localStorage.setItem('user',JSON.stringify(res.data.res[0]));
                    toast("User updated");
                    props.changeStateHandler() 
                    navigate("#")
                })
            }).catch((err)=>{
                console.log(err)
            })
        }
    },[file])

    const [enableName,setEnableName]=useState(true)
    const [enableBA,setEnableBA]=useState(true)
    const [enableMA,setEnableMA]=useState(true)
    const [enableEmail,setEnableEmail]=useState(true)
    const [enablePN,setEnablePN]=useState(true)
    const enableInput=(type)=>{
        if(type === "name"){
            setEnableName(!enableName)
            return
        }

        if(type === "Business Address"){
            setEnableBA(!enableBA)
            return
        }

        if(type === "Mailing Address"){
            setEnableMA(!enableMA)
            return
        }

        if(type === "Email"){
            setEnableEmail(!enableEmail)
            return
        }

        if(type === "Phone Number"){
            setEnablePN(!enablePN)
            return
        }
    }

    return(
        <div className="w-[80%] mt-[50px] m-auto">
            <div className="flex xsm:flex-col sm:flex-col xsm:gap-[15px] sm:gap-[15px] gap-[50px]">
                <div className="min-w-[120px]">
                    <img src={user?.image || "./images/propfilepic.png"} className="rounded-full w-[120px] h-[120px] object-cover" alt=""></img>
                    <label for="profilePic" className="cursor-pointer">
                        <img className="w-[18px] relative left-[calc(119.9348px-18px)] top-[-18px]" src={"./images/edit profile picture.png"}alt=""></img>
                        <input  accept="image/*" onChange={(e)=>{let arr=[...e.target.files];file.image=arr;console.log(file);e.target.value=""}} name="profile" type={"file"} className="hidden" id="profilePic"/>
                    </label>
                </div>
                <form ref={formRef} className="flex flex-col gap-[18px] mt-[18px]">
                    <div className="text-[clamp(14px,1vw,18px] xsm:flex-col xsm:items-start flex items-center gap-[5px]">
                        <label className="inline-block w-[180px] font-bold ">Name:</label> 
                        <div className="flex items-center gap-[5px]">
                            <img onClick={()=>enableInput("name")} className="w-[18px] cursor-pointer" src="./images/edit profile picture.png"alt=""></img>
                            <input disabled={enableName} style={enableName === false ? {background:"#F4F5F5"}:{}} className="inline-block text-[#a4a5a5] bg-transparent rounded-[10px] indent-[10px]" name={"userName"} defaultValue={user?.userName}></input>
                        </div>
                    </div>

                    <div className="text-[clamp(14px,1vw,18px] xsm:flex-col xsm:items-start flex items-center gap-[5px]">
                        <label className="inline-block w-[180px] font-bold ">Business Address:</label>
                        <div className="flex items-center gap-[5px]">
                            <img onClick={()=>enableInput("Business Address")} className="w-[18px] cursor-pointer" src="./images/edit profile picture.png"alt=""></img>
                            <input disabled={enableBA} style={enableBA === false ? {background:"#F4F5F5"}:{}} className="inline-block text-[#a4a5a5] bg-transparent rounded-[10px] indent-[10px]" name="desiredLocation" defaultValue={user?.desiredLocation}></input>
                        </div>
                    </div>

                    <div className="text-[clamp(14px,1vw,18px] xsm:flex-col xsm:items-start flex items-center gap-[5px]">
                        <label className="inline-block w-[180px] font-bold ">Mailing Address:</label>
                        <div className="flex items-center gap-[5px]">
                            <img onClick={()=>enableInput("Mailing Address")} className="w-[18px] cursor-pointer" src="./images/edit profile picture.png"alt=""></img>
                            <textarea disabled={enableMA} style={enableMA === false ? {background:"#F4F5F5"}:{}} className="inline-block text-[#a4a5a5] bg-transparent w-[300px] rounded-[10px] pl-[10px]" name="mailingAddress"  defaultValue={user?.mailingAddress}></textarea>
                        </div>
                    </div>

                    <div className="text-[clamp(14px,1vw,18px] xsm:flex-col xsm:items-start flex items-center gap-[5px]">
                        <label className="inline-block w-[180px] font-bold ">Email:</label>
                        <div className="flex items-center gap-[5px]">
                            <img onClick={()=>enableInput("Email")} className="w-[18px] cursor-pointer" src="./images/edit profile picture.png"alt=""></img>
                            <input disabled={enableEmail} style={enableEmail === false ? {background:"#F4F5F5"}:{}} className="inline-block text-[#a4a5a5] bg-transparent rounded-[10px] indent-[10px]" name="email" defaultValue={user?.email}></input>
                        </div>
                    </div>

                    <div className="text-[clamp(14px,1vw,18px] xsm:flex-col xsm:items-start flex items-center gap-[5px]">
                        <label className="inline-block w-[180px] font-bold ">Phone Number:</label>
                        <div className="flex items-center gap-[5px]">
                            <img onClick={()=>enableInput("Phone Number")} className="w-[18px] cursor-pointer" src="./images/edit profile picture.png"alt=""></img>
                            <input disabled={enablePN} style={enablePN === false ? {background:"#F4F5F5"}:{}} className="inline-block text-[#a4a5a5] bg-transparent rounded-[10px] indent-[10px]" name="phone"  defaultValue={user?.phone}></input>
                        </div>
                    </div>

                    <div className="text-[clamp(14px,1vw,18px] xsm:flex-col flex gap-[20px]">
                    <label className="inline-block w-[180px] font-bold ">Old password:</label><input name="oldpass" autoComplete="off" type={"password"} className="inline-block text-[#a4a5a5] bg-[#f4f5f5] rounded-full indent-2"></input>
                    </div>

                    <div className="text-[clamp(14px,1vw,18px] xsm:flex-col flex gap-[20px]">
                        <label className="inline-block w-[180px] font-bold ">New password:</label><input name="newpass" autoComplete="off" type={"password"} className="inline-block text-[#a4a5a5] bg-[#f4f5f5] rounded-full indent-2"></input>
                    </div>
                    <div className="flex justify-center">
                        <button onClick={formSubmitHandler} className="bg-[#e6ecff] min-w-[60px] min-h-[30px] w-[8.1vw] rounded-full">Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}