import "./Login.css";


export default function Login(){
    return (
    // <!-- This is an example component -->
    <div class='bg-white h-screen w-screen flex justify-center items-center'>
        <div class="px-6 py-3 rounded shadow-md w-[21.216vw]">
            <div class="flex flex-col items-center justify-center mt-[4.271vh] mb-4">
                <h2 class="text-[clamp(32px,1.978vw,81px)] font-bold">Login</h2>
            </div>
            <form action="#" method="POST">
                {/* <!-- username --> */}
                <div class="flex flex-col my-2">
                    <label class="text-[clamp(14px,0.801vw,32.82px)] font-bold text-[#000000] ">Username</label>
                    {/* <div class="text-xs text-red-400 flex justify-between items-center">
                        <span>
                        <b>Error: </b>
                        wrong username or password!
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div> */}
                    <input class="text-[clamp(14px,0.586vw,24px)] border-b-[0.23148148148148vh] rounded px-3 py-1 mt-2 emailIcon" type="text" placeholder="Type your username"/>
                </div>
                <div class="flex flex-col mt-10">
                    <label class="text-[clamp(14px,0.801vw,32.82px)] font-bold text-[#000000]">Password</label>
                    <input class="text-[clamp(14px,0.586vw,24px)] border-b-[0.23148148148148vh] rounded px-3 py-1 mt-2 passwordIcon" type="password" placeholder="Type your password"/>
                </div>
                <div class="flex flex-col items-center justify-center my-3">
                    <div class="flex w-full items-center justify-between text-xs text-gray-500">
                        <label className="flex items-center justify-center text-[clamp(12px,0.659vw,27px)] text-[#000] font-semibold"><input type={"checkbox"}/> Remember me.</label>
                        <p className="text-[clamp(12px,0.659vw,27px)] text-[#000] font-semibold">Forgot password?</p>
                    </div>
                    <button class="h-[4.3518518518519vh] mt-[2.051vw] mb-[1.221vw] rounded-full py-1 w-[14.258vw] text-[clamp(14px,0.801vw,32.82px)] bg-[#81c2ff] text-white uppercase font-bold">
                        Submit
                    </button>
                    <button class="mb-[4.443vh] h-[4.3518518518519vh] my-1 rounded-full py-1 w-[14.258vw] text-[clamp(14px,0.801vw,32.82px)] bg-white border-2 border-[#e0e0e0] text-[#e0e0e0] font-bold uppercase">
                        Apply for free
                    </button>
                    
                </div>
            </form>
        </div>
    </div>
    )
}