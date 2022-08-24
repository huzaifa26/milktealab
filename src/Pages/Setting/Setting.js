export default function Setting(){

    let user=localStorage.getItem("user");
    user=JSON.parse(user)

    return(
        <div className="w-[80%] mt-[50px] m-auto">
            <div className="flex gap-[50px]">
                <div className="w-[8.78vw]">
                    <img src="./images/propfilepic.png"alt=""></img>
                    <img className="w-[1.31vw] relative left-[calc(8.78vw-1.31vw)] top-[-1.31vw]" src="./images/edit profile picture.png"alt=""></img>
                </div>
                <div className="flex flex-col gap-[18px] mt-[18px]">
                    <div className="text-[1vw] flex items-center gap-[5px]">
                        <label className="inline-block w-[180px] font-bold ">Name:</label> <img className="w-[1.31vw]" src="./images/edit profile picture.png"alt=""></img> <h3 className="inline-block text-[#a4a5a5]">{user.userName}</h3>
                    </div>

                    <div className="text-[1vw] flex items-center gap-[5px]">
                        <label className="inline-block w-[180px] font-bold ">Business Address:</label><img className="w-[1.31vw]" src="./images/edit profile picture.png"alt=""></img><h3 className="inline-block text-[#a4a5a5]">{user.desiredLocation}</h3>
                    </div>

                    <div className="text-[1vw] flex items-center gap-[5px]">
                        <label className="inline-block w-[180px] font-bold ">Mailing Address:</label><img className="w-[1.31vw]" src="./images/edit profile picture.png"alt=""></img><h3 className="inline-block text-[#a4a5a5]">{user.mailingAddress}</h3>
                    </div>

                    <div className="text-[1vw] flex items-center gap-[5px]">
                        <label className="inline-block w-[180px] font-bold ">Email:</label><img className="w-[1.31vw]" src="./images/edit profile picture.png"alt=""></img><h3 className="inline-block text-[#a4a5a5]">{user.email}</h3>
                    </div>

                    <div className="text-[1vw] flex items-center gap-[5px]">
                        <label className="inline-block w-[180px] font-bold ">Phone Number:</label><img className="w-[1.31vw]" src="./images/edit profile picture.png"alt=""></img><h3 className="inline-block text-[#a4a5a5]">{user.phone}</h3>
                    </div>

                    <div className="text-[1vw] flex gap-[20px]">
                    <label className="inline-block w-[180px] font-bold ">Old password:</label><input autoComplete="off" type={"password"} className="inline-block text-[#a4a5a5] bg-[#f4f5f5] rounded-full indent-2"></input>
                    </div>

                    <div className="text-[1vw] flex gap-[20px]">
                        <label className="inline-block w-[180px] font-bold ">New password:</label><input autoComplete="off" type={"password"} className="inline-block text-[#a4a5a5] bg-[#f4f5f5] rounded-full indent-2"></input>
                    </div>
                    <div className="flex justify-center">
                        <button className="bg-[#e6ecff] w-[8.1vw] rounded-full">Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}