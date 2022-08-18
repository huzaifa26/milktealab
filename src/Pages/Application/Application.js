export default function Application(props){
    return(
        <div className="w-[calc(100vw - 100%)] h-[100vh]">
            <img className="w-[13.354vw] absolute top-[8%] left-[5%]" src="/images/Logo.png" alt=""></img>
            <div>
                <h1 className="text-center text-[clamp(32px,2vw,82px)] font-bold my-[100px]">Application</h1>

                <div className="flex flex-col gap-[18px] mt-[18px]">
                    <div className="flex justify-center gap-[100px]">
                    <div className="flex flex-col gap-[18px]">
                        <div className="text-[1vw]">
                            <label className="inline-block w-[180px] font-bold ">Username:</label><input placeholder="Type your username" type={"text"} className="inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                        </div>

                        <div className="text-[1vw]">
                            <label className="inline-block w-[180px] font-bold ">Password:</label><input placeholder="Type your password" type={"password"} className="inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                        </div>

                        <div className="text-[1vw]">
                            <label className="inline-block w-[180px] font-bold ">Confirm Password:</label><input placeholder="Confirm your password" type={"password"} className="inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                        </div>

                        <div className="text-[1vw]">
                            <label className="inline-block w-[180px] font-bold ">Email:</label><input placeholder="Type your email" type={"email"} className="inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                        </div>

                        <div className="text-[1vw]">
                            <label className="inline-block w-[180px] font-bold ">Phone:</label><input placeholder="Type your phone" type={"phone"} className="inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                        </div>

                        <div className="text-[1vw]">
                            <label className="inline-block w-[180px] font-bold ">Mailing Address:</label><input placeholder="Type your Mainling address" type={"address"} className="inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                        </div>
                    </div>

                    <div className="flex flex-col gap-[18px]">
                        <div className="text-[1vw]">
                            <label className="inline-block w-[180px] font-bold ">Desired Franchise Location:</label><input placeholder="Type your preffered location address" type={"text"} className="inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                        </div>

                        <div className="text-[1vw]">
                            <label className="inline-block w-[180px] font-bold ">Your Budget:</label><input placeholder="Type your bughet" type={"number"} className="inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                        </div>

                        <div className="text-[1vw] flex">
                            <label className="inline-block w-[180px] font-bold ">Question For Us:</label><textarea placeholder="Any questions for us" type={"text"} className="inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></textarea>
                        </div>
                    </div>
                    </div>

                    <div className="flex justify-center mt-[100px]">
                        <button className="bg-[#81c2ff] w-[14.25vw] h-[4.351vh] text-white font-bold rounded-full">Apply now</button>
                    </div>
                </div>

            </div>

        </div>
    )
}