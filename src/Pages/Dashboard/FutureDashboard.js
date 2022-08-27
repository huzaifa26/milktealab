export default function FutureDashboard(){
    return(
        <div className="w-[100%] flex flex-col my-auto">
            <div className="w-[91%] m-auto flex xsm:flex-col items-center mt-[20vh]">
                <div className="flex-1 flex flex-col items-center text-[#b6b6b6]">
                    <img className="w-[75px]" src="./images/join.png" alt=""></img>
                    <h2 className="text-[20px] font-bold text-center">Join as a member</h2>
                    <p>Done</p>
                </div>

                <div className="flex-1 flex justify-center">
                    <img src="./images/doubleArrow.png"></img>
                </div>

                <div className="flex-1 flex flex-col items-center text-[#b6b6b6]">
                    <img className="w-[75px]" src="./images/application.png" alt=""></img>
                    <h2 className="text-[22px] text-center font-bold">Fill application</h2>
                    <p>Done</p>
                </div>

                <div className="flex-1 flex justify-center">
                    <img src="./images/doubleArrow.png"></img>
                </div>

                <div className="flex-1 flex flex-col items-center ">
                    <img className="w-[75px]" src="./images/meeting.png" alt=""></img>
                    <h2 className="text-[#000000] font-bold text-[20px] text-center">Zoom Meet up</h2>
                    <p className="text-[#717171] text-center">Zoom Meet Up Now expect us to contact you via Email or Phone call to setup zoom meeting up with our specialist.</p>
                </div>
            </div>

            <button className="bg-[#e6ecff] min-w-[140px] text-[#393a3a] place-self-center w-[9.7vw] rounded-full h-[6vh] mt-[5vh]">Contact us</button>
        </div>
    )
}