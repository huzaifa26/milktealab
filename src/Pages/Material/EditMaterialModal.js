import axios from "axios";
import { useRef, useState } from "react";
import {storage} from "../../Components/Firebase";
import { URL } from "../../App";
import moment from "moment-timezone";
import {ref,uploadBytes,getDownloadURL} from "firebase/storage"

export default function EditMaterialModal(props){

    const hideModal=()=>{
        props.hideEditModalHandler()
    }

    const formRef=useRef();
    const [file,setFile]=useState();
    const [fileURL,setFileURL]=useState(props.singleMaterials.file);
    
    const announcementFormHandler=async(e)=>{
        e.preventDefault();

        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const currentTime = moment().tz(timezone).format();
        const datetime = currentTime.slice(0, 19).replace('T', ' ');
    
        let data={
            id:props.singleMaterials.id,
            title:formRef.current.title.value,
            description:formRef.current.description.value,
            datetime:datetime
        }
        console.log(file);

        if (file !== undefined){
            try{
                const storageRef = ref(storage, `/Materials/${file[0].name}`);
                const uploadTask = await uploadBytes(storageRef, file[0]);
            
                getDownloadURL(ref(storage, `/Materials/${file[0].name}`)).then((url) => {
                    setFileURL(url);
                    data.file=url;
                    axios.put(URL+"/material",data).then((res)=>{
                        console.log(res);
                    }).catch((err)=>{
                        console.log(err);
                    })
                })
            }catch(err){
                console.log(err);
            }
        }else if(file === undefined){
            data.file=fileURL;
            console.log(data);
            axios.put(URL+"/material",data).then((res)=>{
                console.log(res);
            }).catch((err)=>{
                console.log(err);
            })
        }
        
    }

    return(
        <>
            <div className="w-[calc(100vw)] h-[100vh] absolute top-[calc(0%-90px)] left-[calc(0%-17.547584187408493vw)] bg-black opacity-30">
            </div>

            <div className="w-[calc(100vw)]  h-[100vh] absolute z-40 top-[calc(0%-90px)] left-[calc(0%-17.547584187408493vw)]">
                <div className="shadow-md h-[51.45vh] max-h-[70.95625942684767vh] max-w-[60vw] overflow-x-hidden  flex flex-col opacity-100 relative z-50 bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[30px]">
                    
                    <div>
                        <img onClick={hideModal} src="/images/xmark-solid.svg" alt="" className="absolute right-[5%] w-[20px] top-[5%] text-gray-300"/>
                        <div className="text-center bg-[#f4f5f5] min-h-[15%] py-[2.5%]">Edit Announcement</div>
                    </div>
                    <form ref={formRef} onSubmit={announcementFormHandler} className="flex-1 flex flex-col gap-[18px] items-center justify-center">
                        <div className="text-[1vw]">
                            <label htmlFor="file1" className="inline-block w-[120px] font-bold cursor-pointer ">Upload File</label><input onChange={(e)=>{setFile(e.target.files)}} id="file1" name="file" placeholder="Type announcement title" type={"file"} className="hidden w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                        </div>

                        <div className="text-[1vw]">
                            <label className="inline-block w-[120px] font-bold ">Title:</label><input defaultValue={props.singleMaterials.title} required name="title" placeholder="Type announcement title" type={"text"} className="inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                        </div>

                        <div className="text-[1vw]">
                            <label className="inline-block w-[120px] font-bold ">Description:</label><input defaultValue={props.singleMaterials.description} required name="description" placeholder="Type announcement description" type={"text"} className="inline-block w-[17vw] text-[#a4a5a5] border-b-[2px] indent-2"></input>
                        </div>

                        <div className="flex justify-center mt-[20px]">
                            <button type="submit" className="bg-[#81c2ff] w-[14.25vw] h-[4.351vh] text-white font-bold rounded-full">Apply now</button>
                        </div>
                    </form>
                </div>   
            </div>
        </>
    )
}