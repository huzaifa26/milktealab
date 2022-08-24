import { useState } from "react";
import PropgressModal from "./PropgressModal";
import axios from "axios";
import { useCallback, useEffect } from "react";
import { URL } from "../../App";

export default function ManagerDashboard(props){

    let user;
    user=localStorage.getItem("user");
    user=JSON.parse(user);

    const [users,setUsers]=useState([]);
    const [managers,setManagers]=useState([]);

    const [showModal,setShowModal]=useState(false);
    const showModalHandler=()=>{
        setShowModal(true);
    }

    const hideModalHandler=()=>{
        setShowModal(false);
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
        }).catch(err=>{
            console.log(err);
        })
    },[])

    const assignManager=useCallback((e,id)=>{
        console.log(e.target.value);
        console.log(id)
        let data={
            mId:e.target.value,
            uId:user.id
        }

        axios.post(URL+"/assign-manager",data).then(res=>{
            console.log(res.data.res);
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
    },[userRoleHandler])


    useEffect(()=>{
        axios.get(URL+"/getManager").then(res=>{
            setManagers(res.data.res);
        }).catch(err=>{
            console.log(err);
        })
    },[assignManager])

    return(
        <>
        {showModal &&
            <PropgressModal hideModalHandler={hideModalHandler}></PropgressModal>
        }
        <div className="w-[100%] h-[100%]">
            <div className="w-[91%] m-auto">

            <table class="table-auto w-[100%] mt-[30px]">
                <thead>
                    <tr className="flex border-b-[2px]">
                        <th className="flex-1 text-left">Member Name</th>
                        <th className="flex-1  text-left">Store location</th>
                        <th className="flex-1  text-left">Roles</th>
                        <th className="flex-1  text-left">Progress</th>
                        <th className="flex-1  text-left">Message</th>
                    </tr>
                </thead>
                <tbody>
                {users.map((u)=>{
                        if(u.id === user.id) return;
                        return(
                        <tr className="flex my-[20px]">
                            <td className="flex-1">{u.userName}</td>
                            <td className="flex-1">{u.desiredLocation}</td>
                            <td className="flex-1">
                                <select onChange={(e)=>userRoleHandler(e,u.id)} className="">
                                    <option value={"admin"} selected={u.role === "admin"?true:false}>Admin</option>
                                    <option value={"manager"} selected={u.role === "manager"?true:false}>Training Manager</option>
                                    <option value={"franchisee"} selected={u.role === "franchisee"?true:false}>Franchisee</option>
                                    <option value={"member"} selected={u.role === "member"?true:false}>Member</option>
                                </select>
                            </td>
                            <td className="flex-1"><button onClick={showModalHandler} className="bg-[#36c0f8] text-white h-[2.26vh] min-h-[30px] rounded-full w-[8vw]">Check Status</button></td>
                            <td className="flex-1"><button className="bg-[#36f87a] text-white h-[2.26vh] min-h-[30px] rounded-full w-[10vw]">Check Message</button></td>
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