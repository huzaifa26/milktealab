import { useState } from "react";
import PropgressModal from "./PropgressModal";

export default function Dashboard(props){

    const [showModal,setShowModal]=useState(false);
    const showModalHandler=()=>{
        setShowModal(true);
    }

    const hideModalHandler=()=>{
        setShowModal(false);
    }
    return(
        <>
        {showModal &&
            <PropgressModal hideModalHandler={hideModalHandler}></PropgressModal>
        }
        <div className="w-[100%] h-[100%]">
            
            <table class="table-auto w-[90%] ml-[30px] mt-[30px]">
                <thead>
                    <tr className="flex border-b-[2px]">
                        <th className="flex-1 text-left">Member Name</th>
                        <th className="flex-1  text-left">Store location</th>
                        <th className="flex-1  text-left">Roles</th>
                        <th className="flex-1  text-left">Progress</th>
                        <th className="flex-1  text-left">Message</th>
                        <th className="flex-1  text-left">Assigned Training Manager</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="flex my-[20px]">
                        <td className="flex-1">Sung Po Yu</td>
                        <td className="flex-1">1601 branham lane Suite 40 San J</td>
                        <td className="flex-1">
                            <select className="">
                                <option selected>Franchise</option>
                            </select>
                        </td>
                        <td className="flex-1"><button onClick={showModalHandler} className="bg-[#36c0f8] text-white h-[2.26vh] min-h-[30px] rounded-full w-[8vw]">Check Status</button></td>
                        <td className="flex-1"><button className="bg-[#36f87a] text-white h-[2.26vh] min-h-[30px] rounded-full w-[10vw]">Check Message</button></td>

                        <td className="flex-1">
                        <select className="">
                                <option selected>Michelle young</option>
                            </select>
                        </td>
                    </tr>

                    <tr className="flex my-[20px]">
                        <td className="flex-1">Sung Po Yu</td>
                        <td className="flex-1">1601 branham lane Suite 40 San J</td>
                        <td className="flex-1">
                            <select className="">
                                <option selected>Franchise</option>
                            </select>
                        </td>
                        <td className="flex-1"><button onClick={showModalHandler} className="bg-[#36c0f8] text-white h-[2.26vh] min-h-[30px] rounded-full w-[8vw]">Check Status</button></td>
                        <td className="flex-1"><button className="bg-[#36f87a] text-white h-[2.26vh] min-h-[30px] rounded-full w-[10vw]">Check Message</button></td>

                        <td className="flex-1">
                        <select className="">
                                <option selected>Michelle young</option>
                            </select>
                        </td>
                    </tr>



                </tbody>
                </table>
        </div>
        </>
    )
}