import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SelfContainerSection from '../SelfContainerSection/SelfContainerSection';
import GetMessageSection from '../GetMessageSection/GetMessageSection';
import SendIcon from '@mui/icons-material/Send';
import '../ChatArea/ChatArea.css'
import { useSelector } from 'react-redux';
import '../SideBar/SideBar.css'

function ChatArea() {
    
        const lightTheme = useSelector((state) => state.themeKey.themeKey);

    

    return (
        <>

            <div className={"ch-MainContainer flex flex-col h-full "}>
                <div className={"ch-header m-2 px-2 py-2 rounded-[15px] bg-white flex justify-between "+ (lightTheme ? "" : "dark")}>
                    <div><IconButton ><AccountCircleIcon className={""+ (lightTheme ? "" : "dark")} /></IconButton> <span className={"  font-extrabold font-bold"+ (lightTheme ? "" : "dark")}>Name</span>
                    </div>
                    <div><IconButton ><DeleteIcon className={""+ (lightTheme ? "" : "dark")}/></IconButton></div>
                </div>

                <div className={`ch-chat m-2 px-3 py-3 rounded-[15px] bg-white h-11/12 flex-1 flex flex-col overflow-y-auto 
                    [&::-webkit-scrollbar]:w-0 
                    [&::-webkit-scrollbar-track]:bg-transparent
                    [&::-webkit-scrollbar-thumb]:bg-gray-300
                    dark:[&::-webkit-scrollbar-track]:bg-transparent
                    dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 
                    ${lightTheme ? '' : 'dark'}`}>


                <div className='flex justify-start  items-start p-2 '><GetMessageSection/></div>
                <div className='flex justify-end  items-end p-2'><SelfContainerSection/></div>
                </div>
                
                <div className={`ch-footer m-2 px-2 py-2 rounded-[15px] bg-white flex justify-between ${lightTheme ? '' : 'dark'}`}>
    <div className={`${lightTheme ? '' : 'dark'}`}>
        <input 
            placeholder=" Type Message Here" 
            className={`px-2 py-2 border-0 outline-0 border-none border-white bg-transparent w-full ${lightTheme ? '' : 'dark'}`} 
        />
    </div>
    <div>
        <IconButton>
            <SendIcon className={`${lightTheme ? '' : 'dark'}`} />
        </IconButton>
    </div>
</div>

            </div>

        </>
    )
} export default ChatArea