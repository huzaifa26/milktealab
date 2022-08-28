import PreviousMap from "postcss/lib/previous-map";
import { Children, useState } from "react";
import { useNavigate, NavLink,useLocation,Link } from "react-router-dom";
import { useRef } from "react";

export default function Layout(props){
    let user;
    user=localStorage.getItem("user");
    user=JSON.parse(user);

    const navigate=useNavigate();
    const location=useLocation()
    const imgRef=useRef();
    const sideBarRef=useRef();
    const dropdownRef=useRef();
    const [isrotated,setIsRotated]=useState(false);

    const arrowOnClickHandler=()=>{
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

    if(location.pathname === "/download-material"){
        heading="Download Materials";
        subheading="All of the materials you need will be available to download";
    }

    if(location.pathname === "/exam"){
        heading="Frachise Training Exam";
        subheading="You must pass all exam before opening, and must score 80% or above";
    }

    if(location.pathname === "/admin-question"){
        heading="Exam Questions";
        subheading="";
    }

    if(location.pathname === "/attempt-exam"){
        heading="Exam";
        subheading="";
    }

    if(location.pathname === "/message-board"){
        heading="Message Board";
        subheading="Message your training Manager";
    }

    if(location.pathname === "/futuredashboard"){
        heading="Future Frachisee Dashboard";
        subheading="Your status of becoming Milk Tea Lab Fracchisee";
    }
    
    if(location.pathname === "/managerdashboard"){
        heading="Dashboard";
        subheading="Manage your Franchisee";
    }
    const logoutHandler=()=>{
        localStorage.removeItem("user");
        navigate("/");
    }

    const [isNavOpen,setIsNavOpen]=useState(false);
    const hamburgerHandler=()=>{
        if (isNavOpen === false){
            sideBarRef.current.style.display="flex";
            setIsNavOpen(true);
            return
        }
        sideBarRef.current.style.display="none";
        setIsNavOpen(false);
    }

    return(
        <div class="flex h-screen">
            <div class="flex-1 flex overflow-y-scroll">
                        {/* Side */}
                    <nav ref={sideBarRef} class="xsm:hidden sm:hidden xsm:relative sm:relative xsm:z-[100] sm:z-[100] md:flex lg:flex xl:flex 2xl:flex w-[21.34vw] xsm:min-w-[250px] sm:min-w-[250px] h-full bg-[#ededee] sticky top-0">
                        <div class="flex flex-col w-full mx-auto overflow-y-auto overflow-x-hidden">
                            <div class="flex w-[100%] justify-center items-center mt-[10px] mb-[10px]">
                                <img className="w-[13.354vw] min-w-[180px]" src="./images/Logo.png" alt=""></img>
                            </div>
                            <div class="w-full h-full flex text-gray-900">
                                <ul className="w-[100%]">
                                    <NavLink onClick={isNavOpen && hamburgerHandler} className="flex items-center gap-[8px] -[100%] h-[60px] pl-[30px]" to={"/announcement"}>
                                        <li className="flex items-center gap-[8px] w-[100%] h-[60px]">
                                            <img className="w-[20.6266px] " src="./images/megaphone.png"></img>
                                            <h2>Announcement</h2>
                                        </li>
                                    </NavLink>

                                    <NavLink onClick={isNavOpen && hamburgerHandler} className="flex items-center gap-[8px] -[100%] h-[60px] pl-[30px]" to={"/"}>
                                        <li className="flex items-center gap-[8px] -[100%] h-[60px]">
                                            <img className="w-[20.6266px] " src="./images/inventory.png"></img>
                                            <h2>Inventory Order</h2>
                                        </li>
                                    </NavLink>

                                    <NavLink onClick={isNavOpen && hamburgerHandler} className="flex items-center gap-[8px] -[100%] h-[60px] pl-[30px]" to={"/download-material"}>
                                        <li className="flex items-center gap-[8px] -[100%] h-[60px]">
                                            <img className="w-[20.6266px] " src="./images/material.png"></img>
                                            <h2>Download Materials</h2>
                                        </li>
                                    </NavLink>

                                    <NavLink onClick={isNavOpen && hamburgerHandler} className="flex items-center gap-[8px] -[100%] h-[60px] pl-[30px]" to={"/training"}>
                                        <li className="flex items-center gap-[8px] -[100%] h-[60px]">
                                            <img className="w-[20.6266px] " src="./images/training.png"></img>
                                            <h2>Training Videos</h2>
                                        </li>
                                    </NavLink>

                                    <NavLink onClick={isNavOpen && hamburgerHandler} className="flex items-center gap-[8px] -[100%] h-[60px] pl-[30px]" to={"/exam"}>
                                        <li className="flex items-center gap-[8px] -[100%] h-[60px]">
                                            <img className="w-[20.6266px] " src="./images/exam.png"></img>
                                            <h2>Franchise Training Exam</h2>
                                        </li>
                                    </NavLink>

                                    {user?.role === "admin"?
                                        <NavLink onClick={isNavOpen && hamburgerHandler} className="flex items-center gap-[8px] -[100%] h-[60px] pl-[30px]" to={"/dashboard"}>
                                            <li className="flex items-center gap-[8px] -[100%] h-[60px]">
                                                <img className="w-[20.6266px] " src="./images/dashboard.png"></img>
                                                <h2>Dashboard</h2>
                                            </li>
                                        </NavLink>
                                    :
                                    user?.role === "member"?
                                        <NavLink onClick={isNavOpen && hamburgerHandler} className="flex items-center gap-[8px] -[100%] h-[60px] pl-[30px]" to={"/message-board"}>
                                            <li className="flex items-center gap-[8px] -[100%] h-[60px]">
                                                <img className="w-[20.6266px] " src="./images/dashboard.png"></img>
                                                <h2>Message Board</h2>
                                            </li>
                                        </NavLink>
                                    :
                                    user?.role === "manager"?
                                        <NavLink onClick={isNavOpen && hamburgerHandler} className="flex items-center gap-[8px] -[100%] h-[60px] pl-[30px]" to={"/futuredashboard"}>
                                            <li className="flex items-center gap-[8px] -[100%] h-[60px]">
                                                <img className="w-[20.6266px] " src="./images/dashboard.png"></img>
                                                <h2>Future Dashboard</h2>
                                            </li>
                                        </NavLink>
                                    :
                                    user?.role === "franchisee"?
                                        <NavLink onClick={isNavOpen && hamburgerHandler} className="flex items-center gap-[8px] -[100%] h-[60px] pl-[30px]" to={"/managerdashboard"}>
                                            <li className="flex items-center gap-[8px] -[100%] h-[60px]">
                                                <img className="w-[20.6266px] " src="./images/dashboard.png"></img>
                                                <h2>Manager Dashboard</h2>
                                            </li>
                                        </NavLink>
                                    :null}

                                    <NavLink onClick={isNavOpen && hamburgerHandler} className="xsm:flex sm:flex md:hidden lg:hidden xl:hidden 2xl:hidden items-center gap-[8px] -[100%] h-[60px] pl-[30px]" to={"/setting"}>
                                        <li className="flex items-center gap-[8px] -[100%] h-[60px]">
                                            <img className="w-[20.6266px] " src="./images/exam.png"></img>
                                            <h2>Setting</h2>
                                        </li>
                                    </NavLink>

                                    <NavLink onClick={isNavOpen && hamburgerHandler} onClick={logoutHandler} className="xsm:flex sm:flex md:hidden lg:hidden xl:hidden 2xl:hidden items-center gap-[8px] -[100%] h-[60px] pl-[30px]" to={"/"}>
                                        <li className="flex items-center gap-[8px] -[100%] h-[60px]">
                                            <img className="w-[20.6266px] " src="./images/exam.png"></img>
                                            <h2>Logout</h2>
                                        </li>
                                    </NavLink>
                                </ul>
                            </div>
                            <div className="my-[50px] px-[30px]">
                                <h2 className="text-center border-b-[2px] pb-[4px] mb-[15px] border-black">Third Party Login</h2>
                                <div className="flex flex-col items-center gap-[3vh]">
                                    <img className="w-[4.83vw] min-w-[65.9778px]" src="./images/Doordash.png" alt=""/>
                                    <img className="w-[5.17vw] min-w-[70.6222px]" src="./images/Grubhub.png" alt=""/>
                                    <img className="w-[4.56vw] min-w-[70.68448959999999px]" src="./images/Ubereats.png" alt=""/>
                                    <img className="w-[5.95vw] min-w-[81.277px]" src="./images/Square.png" alt=""/>
                                    <img className="w-[6.34vw] min-w-[81.277px]" src="./images/Homebase.png" alt=""/>
                                    <img className="w-[7.47vw] min-w-[102.0402px]" src="./images/Quickbook.png" alt=""/>
                                </div>
                            </div>
                        </div>
                    </nav>

                    <div className="xsm:absolute sm:absolute z-0 w-[100%] min-h-[100vh]">
                        <header class="flex justify-between items-center py-[1.1861vh] w-[91%] m-auto">
                            <div class="flex justify-between items-center flex-1">
                                <div className="flex justify-between w-[100%] items-center ">
                                    <div>
                                        <h2 className="xsm:text-[clamp(24px,1.58vw,64px)] text-[clamp(32px,1.58vw,64px)] font-bold">{heading}</h2>
                                    <h2 className="text-[#a4a5a5] w-[28.27vw] min-w-[250px] text-[clamp(12px,0.78vw,32px)]">{subheading}</h2>
                                    </div>

                                    <div onClick={hamburgerHandler} className="xsm:flex sm:flex xsm:flex-col sm:flex-col hidden  gap-[4px]">
                                        <div className="w-[30px] h-[2px] rounded-[20px] bg-black"></div>
                                        <div className="w-[30px] h-[2px] rounded-[20px] bg-black"></div>
                                        <div className="w-[30px] h-[2px] rounded-[20px] bg-black"></div>
                                    </div>

                                    <div className="xsm:hidden sm:hidden flex  items-center gap-[50px]">
                                        <input className="bg-[#e2e2e2] h-[5.19vh] w-[13.59vw] text-[clamp(14px,0.58vw,24px)] rounded-full indent-[10px]" type="text" placeholder="Search Member's name"></input>
                                        <div className="flex flex-col justify-center items-center">
                                            <div className="flex gap-[10px] items-center">
                                                <div className="rounded-full"><img src={user?.image || "./images/user-mock.png"} className="rounded-full w-[30px] h-[30px] object-cover" alt=""></img></div>
                                                <div className="flex flex-col">
                                                    <h2>{user.userName}</h2>
                                                    <p className="text-[14px] text-[#A4A5AD]">{user.role}</p>
                                                </div>
                                                <div className="rotate-180">
                                                    <img className="cursor-pointer" ref={imgRef} onClick={arrowOnClickHandler} src="./images/arrow.png" alt=""></img>
                                                </div>
                                            </div>
                                            <div ref={dropdownRef} className="bg-white hidden divide-y-2 absolute z-[100] top-[10%] shadow-md w-[10vw]">
                                                <Link to={"/setting"}><div className="cursor-pointer w-[100%] text-center py-[4px]"><p>Setting</p></div></Link>
                                                <div onClick={logoutHandler} className="cursor-pointer w-[100%] text-center py-[4px]"><p>Logout</p></div>
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