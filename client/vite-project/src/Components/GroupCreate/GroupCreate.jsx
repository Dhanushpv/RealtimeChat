import { IconButton } from "@mui/material"
import CreateIcon from '@mui/icons-material/Create';
import GroupChat from '../../Images/GroupChatLogo.png'
import '../GroupCreate/GroupCreate.css'

function GroupCreate() {
    return (<>

        {/* <div className="Group_create  " > */}
            <div className=" flex justify-center flex-col  items-center w-full ">
                <div className="flex justify-center"><img src={GroupChat} alt="" className="w-2/5" /></div>
                <div className="sour-gummy text-4xl pb-3">Create Group Chat</div>
                <div className="m-2 px-3 py-3  rounded-[15px] bg-white  flex justify-between shadow-lg w-1/2">
                    <input placeholder="Enter Group Name"  className="px-2 w-full border-0 outline-0 border-none border-white bg-transparent" />
                    <IconButton><CreateIcon /></IconButton>
                </div>

            </div>
        {/* </div> */}


    </>)
}
export default GroupCreate