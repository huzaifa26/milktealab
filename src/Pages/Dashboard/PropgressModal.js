export default function PropgressModal(props){
    const hideModal=()=>{
        props.hideModalHandler()
    }
    return(
        <>
        <div className="w-[calc(100vw)] h-[100vh] absolute top-[calc(0%-90px)] left-[calc(0%-17.547584187408493vw)] bg-black opacity-30">
        </div>
        <div className="w-[calc(100vw)] h-[100vh] absolute z-40 top-[calc(0%-90px)] left-[calc(0%-17.547584187408493vw)]">
            
            <div className="w-[61vw] shadow-md h-[51.45vh] min-h-[82.95625942684767vh] min-w-[91.50805270863836vw] overflow-x-hidden  flex flex-col opacity-100 relative z-50 bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[30px]">
                <img onClick={hideModal} src="/images/xmark-solid.svg" alt="" className="absolute right-[5%] w-[20px] top-[5%] text-gray-300"/>
                <div className="text-center bg-[#f4f5f5] min-h-[15%] pt-[2.5%]">Progress</div>
                <div className="flex w-[100%]">
                    <div className="flex-1">
                        <table class="table-auto w-[90%] ml-[30px] mt-[30px]">
                            <thead>
                                <tr className="flex border-b-[2px] justify-between">
                                    <th className="flex-1 text-left">Chapter Title</th>
                                    <th className="flex-1  text-left">Progress</th>
                                </tr>
                            </thead>
                            <tbody >
                            <tr className="flex my-[20px] justify-between">
                                <td className="flex-1 flex gap-[10px]">
                                    <div className="w-[50px] h-[50px] bg-slate-400 rounded-full"></div>
                                    <div className="flex flex-col">
                                        <h3>Chapter 1</h3>
                                        <p>Introduction to Milk Tea Lab</p>
                                    </div>
                                </td>
                                <td className="flex-1 flex flex-col">
                                    <h2 className="text-blue-400 w-[100px] text-center">33%</h2>
                                    <div className="w-[100px] h-[3px] bg-gray-200">
                                        <div className="w-[33%] h-[100%] bg-blue-400"></div>
                                    </div>
                                </td>
                            </tr>

                            <tr className="flex my-[20px] justify-between">
                                    <td className="flex-1 flex gap-[10px]">
                                        <div className="w-[50px] h-[50px] bg-slate-400 rounded-full"></div>
                                        <div className="flex flex-col">
                                            <h3>Chapter 1</h3>
                                            <p>Introduction to Milk Tea Lab</p>
                                        </div>
                                    </td>
                                    <td className="flex-1 flex flex-col">
                                        <h2 className="text-blue-400 w-[100px] text-center">33%</h2>
                                        <div className="w-[100px] h-[3px] bg-gray-200">
                                            <div className="w-[33%] h-[100%] bg-blue-400"></div>
                                        </div>
                                    </td>
                                </tr>

                                <tr className="flex my-[20px] justify-between">
                                    <td className="flex-1 flex gap-[10px]">
                                        <div className="w-[50px] h-[50px] bg-slate-400 rounded-full"></div>
                                        <div className="flex flex-col">
                                            <h3>Chapter 1</h3>
                                            <p>Introduction to Milk Tea Lab</p>
                                        </div>
                                    </td>
                                    <td className="flex-1 flex flex-col">
                                        <h2 className="text-blue-400 w-[100px] text-center">33%</h2>
                                        <div className="w-[100px] h-[3px] bg-gray-200">
                                            <div className="w-[33%] h-[100%] bg-blue-400"></div>
                                        </div>
                                    </td>
                                </tr>

                                <tr className="flex my-[20px] justify-between">
                                    <td className="flex-1 flex gap-[10px]">
                                        <div className="w-[50px] h-[50px] bg-slate-400 rounded-full"></div>
                                        <div className="flex flex-col">
                                            <h3>Chapter 1</h3>
                                            <p>Introduction to Milk Tea Lab</p>
                                        </div>
                                    </td>
                                    <td className="flex-1 flex flex-col">
                                        <h2 className="text-blue-400 w-[100px] text-center">33%</h2>
                                        <div className="w-[100px] h-[3px] bg-gray-200">
                                            <div className="w-[33%] h-[100%] bg-blue-400"></div>
                                        </div>
                                    </td>
                                </tr>

                                <tr className="flex my-[20px] justify-between">
                                    <td className="flex-1 flex gap-[10px]">
                                        <div className="w-[50px] h-[50px] bg-slate-400 rounded-full"></div>
                                        <div className="flex flex-col">
                                            <h3>Chapter 1</h3>
                                            <p>Introduction to Milk Tea Lab</p>
                                        </div>
                                    </td>
                                    <td className="flex-1 flex flex-col">
                                        <h2 className="text-blue-400 w-[100px] text-center">33%</h2>
                                        <div className="w-[100px] h-[3px] bg-gray-200">
                                            <div className="w-[33%] h-[100%] bg-blue-400"></div>
                                        </div>
                                    </td>
                                </tr>

                                <tr className="flex my-[20px] justify-between">
                                    <td className="flex-1 flex gap-[10px]">
                                        <div className="w-[50px] h-[50px] bg-slate-400 rounded-full"></div>
                                        <div className="flex flex-col">
                                            <h3>Chapter 1</h3>
                                            <p>Introduction to Milk Tea Lab</p>
                                        </div>
                                    </td>
                                    <td className="flex-1 flex flex-col">
                                        <h2 className="text-blue-400 w-[100px] text-center">33%</h2>
                                        <div className="w-[100px] h-[3px] bg-gray-200">
                                            <div className="w-[33%] h-[100%] bg-blue-400"></div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    <div className="flex-1 flex flex-col">
                        <div>

                        <table class="table-auto w-[90%] ml-[30px] mt-[30px]">
                            <thead>
                                <tr className="flex border-b-[2px]">
                                    <th className="flex-1 text-left">Exam Title</th>
                                    <th className="flex-1  text-left">Progress</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="flex my-[20px] justify-between">
                                    <td className="flex-1 flex gap-[10px]">
                                        <div className="w-[50px] h-[50px] bg-slate-400 rounded-full"></div>
                                        <div className="flex flex-col">
                                            <h3>Drinking Exam</h3>
                                            <p>Basic Knowledge of our drinks.</p>
                                        </div>
                                    </td>
                                    <td className="flex-1 flex flex-col text-blue-400">
                                    <h2 className="w-[100px] text-center">Finished</h2>

                                        <div className="w-[100px] h-[3px] bg-gray-200">
                                            <div className="w-[33%] h-[100%] bg-blue-400"></div>
                                        </div>
                                    </td>
                                </tr>

                                <tr className="flex my-[20px] justify-between">
                                    <td className="flex-1 flex gap-[10px]">
                                        <div className="w-[50px] h-[50px] bg-slate-400 rounded-full"></div>
                                        <div className="flex flex-col">
                                            <h3>Drinking Exam</h3>
                                            <p>Basic Knowledge of our drinks.</p>
                                        </div>
                                    </td>
                                    <td className="flex-1 flex flex-col text-blue-400">
                                    <h2 className="w-[100px] text-center">Finished</h2>

                                        <div className="w-[100px] h-[3px] bg-gray-200">
                                            <div className="w-[33%] h-[100%] bg-blue-400"></div>
                                        </div>
                                    </td>
                                </tr>

                                <tr className="flex my-[20px] justify-between">
                                    <td className="flex-1 flex gap-[10px]">
                                        <div className="w-[50px] h-[50px] bg-slate-400 rounded-full"></div>
                                        <div className="flex flex-col">
                                            <h3>Drinking Exam</h3>
                                            <p>Basic Knowledge of our drinks.</p>
                                        </div>
                                    </td>
                                    <td className="flex-1 flex flex-col text-blue-400">
                                    <h2 className="w-[100px] text-center">Finished</h2>

                                        <div className="w-[100px] h-[3px] bg-gray-200">
                                            <div className="w-[33%] h-[100%] bg-blue-400"></div>
                                        </div>
                                    </td>
                                </tr>

                                <tr className="flex my-[20px] justify-between">
                                    <td className="flex-1 flex gap-[10px]">
                                        <div className="w-[50px] h-[50px] bg-slate-400 rounded-full"></div>
                                        <div className="flex flex-col">
                                            <h3>Drinking Exam</h3>
                                            <p>Basic Knowledge of our drinks.</p>
                                        </div>
                                    </td>
                                    <td className="flex-1 flex flex-col text-blue-400">
                                    <h2 className="w-[100px] text-center">Finished</h2>
                                        <div className="w-[100px] h-[3px] bg-gray-200">
                                            <div className="w-[33%] h-[100%] bg-blue-400"></div>
                                        </div>
                                    </td>
                                </tr>

                                <tr className="flex my-[20px] justify-between">
                                    <td className="flex-1 flex gap-[10px]">
                                        <div className="w-[50px] h-[50px] bg-slate-400 rounded-full"></div>
                                        <div className="flex flex-col">
                                            <h3>Drinking Exam</h3>
                                            <p>Basic Knowledge of our drinks.</p>
                                        </div>
                                    </td>
                                    <td className="flex-1 flex flex-col text-blue-400">
                                    <h2 className="w-[100px] text-center">Finished</h2>
                                        <div className="w-[100px] h-[3px] bg-gray-200">
                                            <div className="w-[33%] h-[100%] bg-blue-400"></div>
                                        </div>
                                    </td>
                                </tr>

                                <tr className="flex my-[20px] justify-between">
                                    <td className="flex-1 flex gap-[10px]">
                                        <div className="w-[50px] h-[50px] bg-slate-400 rounded-full"></div>
                                        <div className="flex flex-col">
                                            <h3>Drinking Exam</h3>
                                            <p>Basic Knowledge of our drinks.</p>
                                        </div>
                                    </td>
                                    <td className="flex-1 flex flex-col text-blue-400">
                                        <h2 className="w-[100px] text-center">Finished</h2>
                                        <div className="w-[100px] h-[3px] bg-gray-200">
                                            <div className="w-[33%] h-[100%] bg-blue-400"></div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        </div>



                        <div className="pb-[100px]">
                            <table class="table-auto w-[90%] ml-[30px] mt-[30px]">
                                <thead>
                                    <tr className="flex border-b-[2px] justify-between">
                                        <th className="text-left">Exam Title</th>
                                        <th className=" text-center w-[11.49vw]">Your score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="flex my-[20px] justify-between">
                                        <td className="flex gap-[10px]">
                                            <div className="flex flex-col">
                                                <h3>Drinking Exam</h3>
                                            </div>
                                        </td>
                                        <td className="flex gap-[0.4vw] w-[11.49vw] items-center text-[#a4a5a5]">
                                            <img className="w-[1.07vw]" src="/images/tick-g.png"/>
                                            <h2 className=" text-center">98%</h2>
                                        </td>
                                    </tr>

                                    <tr className="flex my-[20px] justify-between">
                                        <td className="flex gap-[10px]">
                                            <div className="flex flex-col">
                                                <h3>Drinking Exam</h3>
                                            </div>
                                        </td>
                                        <td className="flex gap-[0.4vw] w-[11.49vw] items-center text-[#a4a5a5]">
                                            <img className="w-[1.07vw]" src="/images/x-mark-b.png"/>
                                            <h2 className=" text-center">79%</h2>
                                        </td>
                                    </tr>

                                    <tr className="flex my-[20px] justify-between">
                                        <td className="flex gap-[10px]">
                                            <div className="flex flex-col">
                                                <h3>Drinking Exam</h3>
                                            </div>
                                        </td>
                                        <td className="flex gap-[0.4vw] w-[11.49vw] items-center text-[#a4a5a5]">
                                            <img className="w-[1.07vw]" src="/images/x-mark-r.png"/>
                                            <h2 className="ext-center">Not Finished</h2>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>



                    </div>
                </div>
            </div>
        </div>
        </>
    )
}