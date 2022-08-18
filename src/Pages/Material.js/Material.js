export default function Material(props){
    return(
        <div className="w-[100%] h-[100%]">
                        <div className="w-[95%] m-auto">
                <table class="table-auto w-[90%] ml-[30px] mt-[30px]">
                    <thead>
                        <tr className="flex border-b-[2px] justify-between">
                            <th className="text-left">File Title</th>
                            <th className="w-[16.42vw] text-center">Date</th>
                        </tr>
                    </thead>
                    <tbody >
                    

                    <tr className="flex my-[20px] justify-between">
                        <td className=" flex gap-[10px]">
                            <div className="w-[50px] h-[50px] rounded-full"><img src="/images/download.png"></img></div>
                            <div className="flex flex-col">
                                <h3>Recipe</h3>
                                <p className="text-[#a4a5a5]">All of the drinks and food recipe</p>
                            </div>
                        </td>
                        <td className=" flex flex-col">
                            <h2 className="text-[#a4a5a5] text-center">Last updated on July 8th, 2022</h2>
                        </td>
                    </tr>

                    <tr className="flex my-[20px] justify-between">
                        <td className=" flex gap-[10px]">
                            <div className="w-[50px] h-[50px] rounded-full"><img src="/images/download.png"></img></div>
                            <div className="flex flex-col">
                                <h3>Posters</h3>
                                <p className="text-[#a4a5a5]">All of the promotion poster</p>
                            </div>
                        </td>
                        <td className=" flex flex-col">
                            <h2 className="text-[#a4a5a5] text-center">Last updated on July 8th, 2022</h2>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}