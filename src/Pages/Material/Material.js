import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { URL } from "../../App";
import AddMaterialModal from "./AddMaterialModal";
import EditMaterialModal from "./EditMaterialModal";
import { saveAs } from 'file-saver';
import { ColorRing } from 'react-loader-spinner';
import moment from "moment-timezone";

export default function Material(props){
    const [showSpinner,setShowSpinner]=useState(true);

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
            setShowSpinner(false)
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

    {showSpinner === false ?
        <div className="w-[100%] h-[100%] ">
            <div className="w-[91%] m-auto">
                {user.role === "admin" && 
                    <div>
                        <button onClick={showMaterialModal} class="h-[4.3518518518519vh] min-h-[29px] min-w-[166px] mt-[2.051vw] mb-[1.221vw] rounded-full py-1 w-[14.258vw] text-[clamp(14px,0.801vw,32.82px)] bg-[#81c2ff] text-white uppercase font-bold">
                            Add Material
                        </button>
                    </div>
                }
                <div className="overflow-x-auto">
                <table class="table-auto w-[100%] mt-[30px] min-w-[500px] ">
                    <thead>
                        <tr className="min-w-[500px] flex border-b-[2px] justify-between">
                            <th className="text-start w-[14.641288433382138vw] min-w-[190px]">File Title</th>
                            <th className="w-[20.42vw] min-w-[190px] text-center">Date</th>
                            {user.role === "admin" && 
                                <th className="w-[16.5vw] text-center">Actions</th>
                            }
                        </tr>
                    </thead>
                    <tbody >
                    
                    {materialArr.length > 0 ? materialArr.map((m)=>{
                        let datetime;
                        let timezone=Intl.DateTimeFormat().resolvedOptions().timeZone
                        datetime=moment(m.createdTime).tz(timezone);
                        datetime=datetime._d.toString();
                        datetime = datetime.slice(0, 24)
                        return(
                        <tr className="min-w-[500px] flex my-[20px] justify-between">
                            <td className="">
                                <div onClick={()=>downloadFile(m.file,m.title)} className="flex gap-[10px] font-bold cursor-pointer">
                                    <div className="w-[50px] h-[50px] rounded-full"><img src="./images/download.png"></img></div>
                                    <div className="flex flex-col">
                                            <h3 className="font-bold w-[14.641288433382138vw] min-w-[100px]">{m.title}</h3>
                                            <p className="text-[#a4a5a5] text-[14px] min-w-[120px] w-[14.641288433382138vw]">{m.description}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="flex flex-col">
                                <h2 className="text-[#a4a5a5] text-center xsm:w-[190px]">Last updated on {datetime}</h2>
                            </td>
                            {user.role === "admin" && 
                                <td className="flex xsm:flex-col gap-[5px]">
                                    <button onClick={()=>{setSingleMaterials(m);showEditMaterialModal();}} type="submit" className="xsm:min-w-[60px] bg-[#81c2ff] w-[8.25vw] h-[4.351vh] min-h-[29px] text-white font-bold rounded-full">Edit</button>
                                    <button onClick={()=>deleteMaterial(m.id)} type="submit" className="bg-[#e96857] xsm:min-w-[60px] w-[8.25vw] h-[4.351vh] min-h-[29px]    text-white font-bold rounded-full">Delete</button>
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
        :
        <div className="flex justify-center items-center h-full mt-[10px]">
            <ColorRing 
                visible={true} 
                height="80" 
                width="80" 
                ariaLabel="blocks-loading" 
                wrapperStyle={{}} 
                wrapperClass="blocks-wrapper" 
                colors={['#a4a5a5', '#a4a5a5', '#a4a5a5', '#a4a5a5', '#a4a5a5']} 
                />
        </div>    
    }
        </>
    )
}