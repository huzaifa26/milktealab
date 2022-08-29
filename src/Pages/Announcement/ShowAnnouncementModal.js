import moment from "moment-timezone"

export default function ShowAnnouncementModal(props){

    const hideModal=()=>{
        props.hideAnnouncementModalHandler()
    }

    let time=props?.singleAnnouncements?.publishedTime.replace("T"," ")
    time=time.split(".")
    time=time[0]
    return(
        <>
            <div className="w-[calc(100vw)] h-[100vh] fixed top-[calc(0%)] !z-[110] left-[calc(0%)] bg-black opacity-30">
            </div>

            <div className="w-[calc(100vw)]  h-[100vh] fixed !z-[120] top-[calc(0%)] left-[calc(0%)]">
                <div className="shadow-md h-[51.45vh] max-h-[70.95625942684767vh] xsm:min-w-[90%] sm:w-[80%] w-[60%] overflow-x-hidden  flex flex-col opacity-100 relative z-50 bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[30px]">
                    <div>
                        <img onClick={hideModal} src="./images/xmark-solid.svg" alt="" className="absolute right-[5%] w-[20px] top-[5%] text-gray-300 cursor-pointer"/>
                        <div className="text-center bg-[#f4f5f5] min-h-[15%] py-[25px]"><h2>Announcement</h2></div>
                    </div>
                    <div className="flex-1 flex flex-col gap-[18px] items-center justify-center">
                        <div className="xsm:flex xsm:flex-col text-[clamp(14px,1vw,18px]">
                            <label className="inline-block w-[130px] font-bold ">Title:</label><h3 className="min-w-[280px] inline-block w-[17vw] text-[#a4a5a5] indent-2">{props?.singleAnnouncements?.title}</h3>
                        </div>

                        <div className="xsm:flex xsm:flex-col text-[clamp(14px,1vw,18px]">
                            <label className="inline-block w-[130px] font-bold ">Description:</label><h3 className="min-w-[280px] inline-block w-[17vw] text-[#a4a5a5] indent-2">{props?.singleAnnouncements?.description}</h3>
                        </div>

                        <div className="xsm:flex xsm:flex-col text-[clamp(14px,1vw,18px]">
                            <label className="inline-block w-[130px] font-bold ">Published Time:</label><h3 className="min-w-[280px] inline-block w-[17vw] text-[#a4a5a5] indent-2">{time}</h3>
                        </div>
                    </div>
                </div>   
            </div>
        </>
    )
}