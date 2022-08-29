import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { URL } from "../../App";
import MessageModal from "./MessageModal";
import PropgressModal from "./PropgressModal";

export default function Dashboard(props){
    
    let user;
    user=localStorage.getItem("user");
    user=JSON.parse(user);

    const [users,setUsers]=useState([]);
    const [managers,setManagers]=useState([]);
    const [userId,setUserId]=useState(null);

    const [showModal,setShowModal]=useState(false);
    const showModalHandler=()=>{
        setShowModal(true);
    }

    const hideModalHandler=()=>{
        setShowModal(false);
    }

    const [showMessageModal,setShowshowMessageModal]=useState(false);
    const showshowMessageModalHandler=()=>{
        setShowshowMessageModal(true);
    }

    const hideshowMessageModalHandler=()=>{
        setShowshowMessageModal(false);
    }

    const userRoleHandler=useCallback((e,id)=>{
        console.log(e.target.value);
        console.log(id)
        let data={
            role:e.target.value,
            id:id
        }

        axios.post(URL+"/user-role",data).then(res=>{
            console.log(res.data.res);
            toast("User Status Changed");
        }).catch(err=>{
            console.log(err);
        })
    },[])

    const assignManager=useCallback((e,id)=>{
        console.log(e.target.value);
        console.log(id)
        let data={
            mId:e.target.value,
            uId:id
        }

        axios.post(URL+"/assign-manager",data).then(res=>{
            console.log(res.data.res);
            toast("Manager Assigned");
        }).catch(err=>{
            console.log(err);
        })
    },[])

    useEffect(()=>{
        axios.get(URL+"/user").then(res=>{
            setUsers(res.data.res);
        }).catch(err=>{
            console.log(err);
        })
    },[userRoleHandler,assignManager])

    useEffect(()=>{
        axios.get(URL+"/getManager").then(res=>{
            setManagers(res.data.res);
        }).catch(err=>{
            console.log(err);
        })
    },[assignManager])

    if(user.role !== "admin"){
        return <Navigate to={"/"}/>
    }

    return(
        <>
        {showModal &&
            <PropgressModal userId={userId} hideModalHandler={hideModalHandler}></PropgressModal>
        }

        {showMessageModal &&
            <MessageModal userId={userId} hideshowMessageModalHandler={hideshowMessageModalHandler}></MessageModal>
        }
        <div className="w-[100%] h-[100%]">
        <div className="w-[91%] m-auto overflow-x-auto">
            <table class=" table-auto w-[100%] mt-[30px]">
                <thead>
                    <tr className="flex border-b-[2px]">
                        <th className="flex-1 text-left xsm:min-w-[136px] sm:min-w-[136px]">Member Name</th>
                        <th className="flex-1  text-left xsm:min-w-[136px] sm:min-w-[136px]">Store location</th>
                        <th className="flex-1  text-left min-w-[160px]">Roles</th>
                        <th className="flex-1  text-left min-w-[95px]">Progress</th>
                        <th className="flex-1  text-left min-w-[110px]">Message</th>
                        <th className="flex-1  text-left">Assigned Training Manager</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u)=>{
                        if(u.id === user.id) return;
                        return(
                        <tr className="flex my-[20px]">
                            <td className="flex-1 xsm:min-w-[136px] sm:min-w-[136px]">{u.userName}</td>
                            <td className="flex-1 xsm:min-w-[136px] sm:min-w-[136px]">{u.desiredLocation}</td>
                            <td className="flex-1">
                                <select onChange={(e)=>userRoleHandler(e,u.id)}>
                                    <option value={"admin"} selected={u.role === "admin"?true:false}>Admin</option>
                                    <option value={"manager"} selected={u.role === "manager"?true:false}>Training Manager</option>
                                    <option value={"franchisee"} selected={u.role === "franchisee"?true:false}>Franchisee</option>
                                    <option value={"member"} selected={u.role === "member"?true:false}>Member</option>
                                </select>
                            </td>
                            <td className="flex-1"><button onClick={()=>{showModalHandler();setUserId(u.id)}} className="bg-[#36c0f8] text-white h-[2.26vh] min-h-[30px] min-w-[95px] rounded-full w-[8vw] text-[14px]">Check Status</button></td>
                            <td className="flex-1"><button onClick={()=>{showshowMessageModalHandler();setUserId(u.id)}} className="bg-[#36f87a] text-white h-[2.26vh] min-h-[30px] rounded-full min-w-[110px] w-[10vw] text-[14px]">Check Message</button></td>

                            <td className="flex-1">
                                <select onChange={(e)=>assignManager(e,u.id)} className="">
                                    <option selected disabled>Select Manager</option>
                                    {managers.map((m)=>{
                                        console.log(m);
                                        console.log(u);
                                        return(
                                            <option value={m.id} selected={+u.assignedManager===+m.id}>{m.userName}</option>
                                        )
                                    })}
                                </select>
                                
                            </td>
                        </tr>
                        )
                    })}
                    

                </tbody>
                </table>
            </div>
        </div>
        </>
    )
}