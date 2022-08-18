import PreviousMap from "postcss/lib/previous-map";
import { Children, useState } from "react";
import { Routes, Route, Outlet, NavLink,useLocation,Link } from "react-router-dom";
import { useRef } from "react";

export default function Layout(props){
    const location=useLocation()
    const imgRef=useRef();
    const dropdownRef=useRef();
    const [isrotated,setIsRotated]=useState(false);

    const arrowOnClickHandler=()=>{
        console.log(11)
        imgRef.current.classList.toggle("rotate");
        dropdownRef.current.classList.toggle("showdropdown");
        
    }

    let heading='';
    let subheading='';

    if(location.pathname === "/dashboard"){
        heading="Dashboard";
        subheading="Manage your Franchise"
    }

    if(location.pathname === "/setting"){
        heading="Setting";
        subheading="Edit your personal and business information"
    }

    if(location.pathname === "/training"){
        heading="Training Videos";
        subheading="Training videos that will help get started on understanding how to run a Franchise Milk Tea Lab"
    }

    if(location.pathname === "/announcement"){
        heading="Announcement";
        subheading="Please read every single announcement"
    }

    return(
        <div class="flex h-screen">
            <div class="flex-1 flex overflow-y-scroll">
                
                    <nav class="flex w-[21.34vw] h-full bg-[#ededee] sticky top-0">
                        <div class="flex flex-col w-full mx-auto">
                            {/* Side */}
                            <div class="flex w-[100%] justify-center items-center mt-[1.45vw] mb-[2.2vw]">
                                <img className="w-[13.354vw]" src="/images/Logo.png" alt=""></img>
                            </div>
                            <div class="w-full h-full flex text-gray-900">
                                <ul className="w-[100%]">
                                    <NavLink className="flex items-center gap-[8px] -[100%] h-[60px] pl-[30px]" to={"/announcement"}>
                                        <li className="flex items-center gap-[8px] w-[100%] h-[60px]">
                                            <img className="w-[1.51vw] h-[2.96vh]" src="/images/megaphone.png"></img>
                                            <h2>Announcement</h2>
                                        </li>
                                    </NavLink>

                                    <NavLink className="flex items-center gap-[8px] -[100%] h-[60px] pl-[30px]" to={"/#"}>
                                        <li className="flex items-center gap-[8px] -[100%] h-[60px]">
                                            <img className="w-[1.51vw] h-[2.96vh]" src="/images/megaphone.png"></img>
                                            <h2>Inventory Order</h2>
                                        </li>
                                    </NavLink>

                                    <NavLink className="flex items-center gap-[8px] -[100%] h-[60px] pl-[30px]" to={"/download-material"}>
                                        <li className="flex items-center gap-[8px] -[100%] h-[60px]">
                                            <img className="w-[1.51vw] h-[2.96vh]" src="/images/megaphone.png"></img>
                                            <h2>Download Materials</h2>
                                        </li>
                                    </NavLink>

                                    <NavLink className="flex items-center gap-[8px] -[100%] h-[60px] pl-[30px]" to={"/training"}>
                                        <li className="flex items-center gap-[8px] -[100%] h-[60px]">
                                            <img className="w-[1.51vw] h-[2.96vh]" src="/images/megaphone.png"></img>
                                            <h2>Training Videos</h2>
                                        </li>
                                    </NavLink>

                                    <NavLink className="flex items-center gap-[8px] -[100%] h-[60px] pl-[30px]" to={"/exam"}>
                                        <li className="flex items-center gap-[8px] -[100%] h-[60px]">
                                            <img className="w-[1.51vw] h-[2.96vh]" src="/images/megaphone.png"></img>
                                            <h2>Franchise Training Exam</h2>
                                        </li>
                                    </NavLink>

                                    <NavLink className="flex items-center gap-[8px] -[100%] h-[60px] pl-[30px]  " to="/dashboard">
                                        <li className="flex items-center gap-[8px] -[100%] h-[60px]">
                                            <img className="w-[1.51vw] h-[2.96vh]" src="/images/megaphone.png"></img>
                                            <h2>Dashboard</h2>
                                        </li>
                                    </NavLink>
                                </ul>
                            </div>
                        </div>
                    </nav>

                    <div className="flex flex-col w-[100%] min-h-[100vh]">
                        <header class="flex justify-between items-center py-[1.1861vh]">
                            <div class="flex justify-between items-center flex-1 mr-[20px]">
                                <div className="flex justify-between w-[100%] items-center ">
                                    <div>
                                    <h2 className="text-[clamp(32px,1.58vw,64px)] font-bold">{heading}</h2>
                                    <h2 className="text-[#a4a5a5] w-[28.27vw] text-[clamp(14px,0.78vw,32px)]">{subheading}</h2>
                                    </div>
                                    <div className="flex items-center gap-[50px]">
                                        <input className="bg-[#e2e2e2] h-[5.19vh] w-[13.59vw] text-[clamp(14px,0.58vw,24px)] rounded-full indent-[10px]" type="text" placeholder="Search Member's name"></input>
                                        <div className="flex flex-col justify-center items-center">
                                            <div className="flex gap-[10px] items-center">
                                                <div className="w-[1.87vw] rounded-full"><img src="/images/user-mock.png" alt=""></img></div>
                                                <div className="flex flex-col">
                                                    <h2>Kaman loi</h2>
                                                    <p>Admin</p>
                                                </div>
                                                <div className="rotate-180">
                                                    <img className="cursor-pointer" ref={imgRef} onClick={arrowOnClickHandler} src="/images/arrow.png" alt=""></img>
                                                </div>
                                            </div>
                                            <div ref={dropdownRef} className="bg-white hidden divide-y-2 absolute z-[100] top-[10%] shadow-md w-[10vw]">
                                                <Link to={"/setting"}><div className="cursor-pointer w-[100%] text-center py-[4px]">Setting</div></Link>
                                                <div className="cursor-pointer w-[100%] text-center py-[4px]">Logout</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                        <main class="relative z-10 flex flex-col w-full bg-white mb-14">
                            {/* <Outlet></Outlet> */}
                            {props.children}
                        </main>
                    </div>
                </div>
        </div>
    )
}