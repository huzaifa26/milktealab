import axios from "axios";
import { useEffect, useState } from "react";
import { URL } from "../../App";
import AddMaterialModal from "./AddMaterialModal";
import EditMaterialModal from "./EditMaterialModal";

export default function Material(props){

    let user;
    user=localStorage.getItem("user");
    user=JSON.parse(user);

    const [materialArr,setMaterialArr]=useState([])
    const [singleMaterials,setSingleMaterials]=useState([]);

    const [showModal,setShowModal]=useState(false);
    const showMaterialModal=()=>{
        setShowModal(true)
    }
    const hideModalHandler=()=>{
        setShowModal(false);
    }

    const [showEditModal,setShowEditModal]=useState(false);
    const showEditMaterialModal=()=>{
        setShowEditModal(true)
    }
    const hideEditModalHandler=()=>{
        setShowEditModal(false);
    }

    useEffect(()=>{
        axios.get(URL+"/material").then((res)=>{
            setMaterialArr(res.data.res);
        }).catch((err)=>{
            console.log(err)
        })
    },[hideModalHandler,hideEditModalHandler]);

    const deleteMaterial=(id)=>{
        console.log(id)
        axios.delete(URL+"/material/"+id).then((res)=>{
            console.log(res.data.res);
        }).catch((err)=>{
            console.log(err);
        })
    }
    
    return(
        <>
        {showModal && 
            <AddMaterialModal hideModalHandler={hideModalHandler}></AddMaterialModal>
        }
        {showEditModal && 
            <EditMaterialModal singleMaterials={singleMaterials} hideEditModalHandler={hideEditModalHandler}></EditMaterialModal>
        }
        <div className="w-[100%] h-[100%]">
            <div className="w-[91%] m-auto">
                {user.role === "admin" && 
                    <div>
                        <button onClick={showMaterialModal} class="h-[4.3518518518519vh] mt-[2.051vw] mb-[1.221vw] rounded-full py-1 w-[14.258vw] text-[clamp(14px,0.801vw,32.82px)] bg-[#81c2ff] text-white uppercase font-bold">
                            Add Material
                        </button>
                    </div>
                }
                <table class="table-auto w-[90%] mt-[30px]">
                    <thead>
                        <tr className="flex border-b-[2px] justify-between">
                            <th className="text-left">File Title</th>
                            <th className="w-[16.42vw] text-center">Date</th>
                            <th className="w-[16.5vw] text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody >
                    
                    {materialArr && materialArr.map((m)=>{
                        const datetime = m?.createdTime.slice(0, 19).replace('T', ' ');
                        return(
                        <tr className="flex my-[20px] justify-between">
                            <td className=" flex gap-[10px]">
                                <div className="w-[50px] h-[50px] rounded-full"><img src="/images/download.png"></img></div>
                                <div className="flex flex-col">
                                    <a className="font-bold" href={m.file}>
                                        <h3 className="font-bold">{m.title}</h3>
                                    </a>
                                    <p className="text-[#a4a5a5]">{m.description}</p>
                                </div>
                            </td>
                            <td className=" flex flex-col">
                                <h2 className="text-[#a4a5a5] text-center">Last updated on {datetime}</h2>
                            </td>
                            <td className="flex gap-[5px]">
                                <button onClick={()=>{setSingleMaterials(m);showEditMaterialModal();}} type="submit" className="bg-[#81c2ff] w-[8.25vw] h-[4.351vh] text-white font-bold rounded-full">Edit</button>
                                <button onClick={()=>deleteMaterial(m.id)} type="submit" className="bg-[#e96857] w-[8.25vw] h-[4.351vh] text-white font-bold rounded-full">Delete</button>
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