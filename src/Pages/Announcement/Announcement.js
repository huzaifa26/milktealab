export default function Announcement(props){
    return(
    <div className="w-[100%] h-[100%] pt-[40px]">
            <div className="w-[91%] m-auto">

                <h1 className="text-[clamp(28px,1.08vw,44px)] font-bold text-[#393a3a]">Hello Kaman, <span className="text-[#55c9f8]">Good Evening</span></h1>

                <table class="table-auto w-[100%] mt-[30px]">
                    <thead>
                        <tr className="flex border-b-[2px] justify-between">
                            <th className="text-left">Title</th>
                            <th className="w-[16.42vw] text-center">Date</th>
                        </tr>
                    </thead>
                    <tbody >
                    

                    <tr className="flex my-[20px] justify-between">
                        <td className=" flex gap-[10px] items-center">
                            <div className="flex flex-col">
                                <h3>New Promotion</h3>
                                <p className="text-[#a4a5a5]">Milk Tea Lab Adventure</p>
                            </div>
                            <div className="w-[2.36vw] min-w-[50px] h-[1.9vh] min-h-[25px] text-center text-white bg-[#f7275f] rounded-full">New</div>

                        </td>
                        <td className=" flex flex-col">
                            <h2 className="text-[#a4a5a5] text-center">Published on July 8th, 2022</h2>
                        </td>
                    </tr>

                    <tr className="flex my-[20px] justify-between">
                        <td className=" flex gap-[10px] items-center">
                            <div className="flex flex-col">
                                <h3>New Recipe</h3>
                                <p className="text-[#a4a5a5]">Lemonade Tonics</p>
                            </div>
                            <div className="w-[2.36vw] min-w-[50px] h-[1.9vh] min-h-[25px] text-center text-white bg-[#f7275f] rounded-full">New</div>
                        </td>
                        <td className=" flex flex-col">
                            <h2 className="text-[#a4a5a5] text-center">Published on July 8th, 2022</h2>
                        </td>
                    </tr>

                    <tr className="flex my-[20px] justify-between">
                        <td className=" flex gap-[10px] items-center">
                            <div className="flex flex-col">
                                <h3>Maintainance</h3>
                                <p className="text-[#a4a5a5]">We are installing a new POS system</p>
                            </div>
                            {/* <div className="w-[2.36vw] min-w-[50px] h-[1.9vh] min-h-[25px] text-center text-white bg-[#f7275f] rounded-full">New</div> */}
                        </td>
                        <td className=" flex flex-col">
                            <h2 className="text-[#a4a5a5] text-center">Published on July 8th, 2022</h2>
                        </td>
                    </tr>



                    </tbody>
                </table>
            </div>
        </div>
    )
}