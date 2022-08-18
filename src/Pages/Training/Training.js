export default function Training(props){
    return(
        <div className="w-[100%] h-[100%]">
            <div className="w-[95%] m-auto">
                <table class="table-auto w-[90%] ml-[30px] mt-[30px]">
                    <thead>
                        <tr className="flex border-b-[2px] justify-between">
                            <th className="text-left">Chapter Title</th>
                            <th className="w-[11.42vw] text-center">Progress</th>
                        </tr>
                    </thead>
                    <tbody >
                    <tr className="flex my-[20px] justify-between">
                        <td className=" flex gap-[10px]">
                            <div className="w-[50px] h-[50px] rounded-full"><img src="/images/play.png"></img></div>
                            <div className="flex flex-col">
                                <h3>Chapter 1. Introduction</h3>
                                <p>Introducing to Milk Tea Lab</p>
                            </div>
                        </td>
                        <td className=" flex flex-col">
                            <h2 className="text-blue-400 w-[11.42vw] text-center">33%</h2>
                            <div className="w-[11.42vw] h-[3px] bg-gray-200">
                                <div className="w-[33%] h-[100%] bg-blue-400"></div>
                            </div>
                        </td>
                    </tr>

                    <tr className="flex my-[20px] justify-between">
                            <td className=" flex gap-[10px]">
                                <div className="w-[50px] h-[50px] rounded-full"><img src="/images/play.png"></img></div>
                                <div className="flex flex-col">
                                    <h3>Chapter 2. Quality Explanation</h3>
                                    <p>Explaining how we keep our drinks and food quality</p>
                                </div>
                            </td>
                            <td className=" flex flex-col">
                                <h2 className="text-blue-400 w-[11.42vw] text-center">33%</h2>
                                <div className="w-[11.42vw] h-[3px] bg-gray-200">
                                    <div className="w-[33%] h-[100%] bg-blue-400"></div>
                                </div>
                            </td>
                        </tr>

                        <tr className="flex my-[20px] justify-between">
                            <td className=" flex gap-[10px]">
                                <div className="w-[50px] h-[50px] rounded-full"><img src="/images/play.png"></img></div>
                                <div className="flex flex-col">
                                    <h3>Chapter 3. Customer Service</h3>
                                    <p>understand the basic of how to treat customers</p>
                                </div>
                            </td>
                            <td className=" flex flex-col">
                                <h2 className="text-blue-400 w-[11.42vw] text-center">33%</h2>
                                <div className="w-[11.42vw] h-[3px] bg-gray-200">
                                    <div className="w-[33%] h-[100%] bg-blue-400"></div>
                                </div>
                            </td>
                        </tr>

                        <tr className="flex my-[20px] justify-between">
                            <td className=" flex gap-[10px]">
                            <div className="w-[50px] h-[50px] rounded-full"><img src="/images/play.png"></img></div>
                                <div className="flex flex-col">
                                    <h3>Chapter 4. Emergency</h3>
                                    <p>Provide a few examples of how to react to emergencey events</p>
                                </div>
                            </td>
                            <td className=" flex flex-col">
                                <h2 className="text-blue-400 w-[11.42vw] text-center">33%</h2>
                                <div className="w-[11.42vw] h-[3px] bg-gray-200">
                                    <div className="w-[33%] h-[100%] bg-blue-400"></div>
                                </div>
                            </td>
                        </tr>

                        <tr className="flex my-[20px] justify-between">
                            <td className=" flex gap-[10px]">
                                <div className="w-[50px] h-[50px] rounded-full"><img src="/images/play.png"></img></div>
                                <div className="flex flex-col">
                                    <h3>Chapter 5. Cleaning</h3>
                                    <p>Show th e concept of cleaning th store</p>
                                </div>
                            </td>
                            <td className=" flex flex-col">
                                <h2 className="text-blue-400 w-[11.42vw] text-center">33%</h2>
                                <div className="w-[11.42vw] h-[3px] bg-gray-200">
                                    <div className="w-[33%] h-[100%] bg-blue-400"></div>
                                </div>
                            </td>
                        </tr>

                        <tr className="flex my-[20px] justify-between">
                            <td className=" flex gap-[10px]">
                            <div className="w-[50px] h-[50px] rounded-full"><img src="/images/play.png"></img></div>
                                <div className="flex flex-col">
                                    <h3>Chapter 6. Management Education</h3>
                                    <p>Basic information on management</p>
                                </div>
                            </td>
                            <td className=" flex flex-col">
                                <h2 className="text-blue-400 w-[11.42vw] text-center">33%</h2>
                                <div className="w-[11.42vw] h-[3px] bg-gray-200">
                                    <div className="w-[33%] h-[100%] bg-blue-400"></div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}