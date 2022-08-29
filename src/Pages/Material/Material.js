import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { URL } from "../../App";
import AddMaterialModal from "./AddMaterialModal";
import EditMaterialModal from "./EditMaterialModal";
import { saveAs } from 'file-saver';


export default function Material(props){

    const downloadFile=(url,name)=>{
        console.log(url,name)
        saveAs(url);
    }

    let user;
    user=localStorage.getItem("user");
    user=JSON.parse(user);

    const [materialArr,setMaterialArr]=useState([])
    const [singleMaterials,setSingleMaterials]=useState([]);

    const [showModal,setShowModal]=useState(false);
    const showMaterialModal=()=>{
        setShowModal(true)
    }
    const hideModalHandler=useCallback(()=>{
        setShowModal(false);
    },[])

    const [showEditModal,setShowEditModal]=useState(false);
    const showEditMaterialModal=()=>{
        setShowEditModal(true)
    }
    const hideEditModalHandler=useCallback(()=>{
        setShowEditModal(false);
    },[])



    const [isDeleted,setIsDeleted]=useState(false);

    const deleteMaterial=useCallback((id)=>{
        console.log(id)
        axios.delete(URL+"/material/"+id).then((res)=>{
            setIsDeleted(!isDeleted)
            toast("File deleted")
            console.log(res.data.res);
        }).catch((err)=>{
            console.log(err);
        })
    },[isDeleted])

    useEffect(()=>{
        axios.get(URL+"/material").then((res)=>{
            setMaterialArr(res.data.res);
        }).catch((err)=>{
            console.log(err)
        })
    },[showModal,showEditModal,deleteMaterial]);

    return(
        <>
        {showModal && 
            <AddMaterialModal hideModalHandler={hideModalHandler}></AddMaterialModal>
        }
        {showEditModal && 
            <EditMaterialModal singleMaterials={singleMaterials} hideEditModalHandler={hideEditModalHandler}></EditMaterialModal>
        }
        <div className="w-[100%] h-[100%] ">
            <div className="w-[91%] m-auto">
                {user.role === "admin" && 
                    <div>
                        <button onClick={showMaterialModal} class="h-[4.3518518518519vh] min-w-[166px] mt-[2.051vw] mb-[1.221vw] rounded-full py-1 w-[14.258vw] text-[clamp(14px,0.801vw,32.82px)] bg-[#81c2ff] text-white uppercase font-bold">
                            Add Material
                        </button>
                    </div>
                }
                <div className="overflow-x-auto">
                <table class="table-auto w-[90%] mt-[30px] min-w-[500px] ">
                    <thead>
                        <tr className="min-w-[500px] flex border-b-[2px] justify-between">
                            <th className="text-left">File Title</th>
                            <th className="w-[16.42vw] text-center">Date</th>
                            {user.role === "admin" && 
                                <th className="w-[16.5vw] text-center">Actions</th>
                            }
                        </tr>
                    </thead>
                    <tbody >
                    
                    {materialArr.length > 0 ? materialArr.map((m)=>{
                        const datetime = m?.createdTime.slice(0, 19).replace('T', ' ');
                        return(
                        <tr className="min-w-[500px] flex my-[20px] justify-between">
                            <td className="">
                                <div onClick={()=>downloadFile(m.file,m.title)} className="flex gap-[10px] font-bold cursor-pointer">
                                    <div className="w-[50px] h-[50px] rounded-full"><img src="./images/download.png"></img></div>
                                    <div className="flex flex-col">
                                            <h3 className="font-bold">{m.title}</h3>
                                        <p className="text-[#a4a5a5] text-[14px]">{m.description}</p>
                                    </div>
                                </div>
                            </td>
                            <td className=" flex flex-col">
                                <h2 className="text-[#a4a5a5] text-center xsm:w-[190px]">Last updated on {datetime}</h2>
                            </td>
                            {user.role === "admin" && 
                                <td className="flex xsm:flex-col gap-[5px]">
                                    <button onClick={()=>{setSingleMaterials(m);showEditMaterialModal();}} type="submit" className="xsm:min-w-[60px] bg-[#81c2ff] w-[8.25vw] h-[4.351vh] text-white font-bold rounded-full">Edit</button>
                                    <button onClick={()=>deleteMaterial(m.id)} type="submit" className="bg-[#e96857] xsm:min-w-[60px] w-[8.25vw] h-[4.351vh] text-white font-bold rounded-full">Delete</button>
                                </td>
                            }
                        </tr>
                        )
                    }):<h2>No Files found.</h2>}
                    
                    </tbody>
                </table>
                </div>
            </div>
        </div>
        </>
    )
}