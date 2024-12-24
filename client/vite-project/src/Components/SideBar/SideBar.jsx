import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import UserChatList from '../UserChatList/UserChatList';
import React, { useEffect, useState } from 'react';
import '../SideBar/SideBar.css'
import LightModeIcon from '@mui/icons-material/LightMode';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../Features/themeSlice';
import { useNavigate } from 'react-router-dom';



function SideBar(){
    let params = new URLSearchParams(window.location.search);
  let userId = params.get("id");
  let token_key = params.get("login");
  let token = localStorage.getItem(token_key);

     const navigate = useNavigate();
    const dispatch=useDispatch()
    const lightTheme = useSelector((state) => state.themeKey.themeKey);

 

    const PersonAddIcons = () => {
        navigate(`Availableusers?login=${token_key}&id=${userId}`); // Pass chatId in the URL
      };

      const GroupAddIcons = () => {
        navigate(`AvailableGroups?login=${token_key}&id=${userId}`); // Pass chatId in the URL
      };

      const AddCircleIcons = () => {
        navigate(`GroupCreate?login=${token_key}&id=${userId}`); // Pass chatId in the URL
      };
      const AccountCircleIcons = () => {
        navigate(`Profile?login=${token_key}&id=${userId}`); // Pass chatId in the URL
      };


    return(
        <>
        <div className={" sideBar flex flex-col h-full  bg-slate-200 w-2/5 rounded-l-lg"+ (lightTheme ? "" : "dark")}>
        <div className={"sb-Header flex justify-between m-2 px-2 py-2 rounded-[15px] bg-white shadow-lg " + (lightTheme ? "" : "dark")}>
            <div><IconButton ><AccountCircleIcon  onClick={AccountCircleIcons}  className={"" + (lightTheme ? "" : "dark")} /></IconButton></div>
            <div>
                <IconButton>  <PersonAddIcon  onClick={PersonAddIcons} className={"" + (lightTheme ? "" : "dark")} /></IconButton>
                <IconButton>  <GroupAddIcon onClick={GroupAddIcons} className={"" + (lightTheme ? "" : "dark")} /></IconButton>
                <IconButton><AddCircleIcon onClick={AddCircleIcons} className={"" + (lightTheme ? "" : "dark")} /></IconButton>


                <IconButton onClick={()=>{dispatch(toggleTheme())}}>
                    {lightTheme && <NightlightIcon className={"" + (lightTheme ? "" : "dark")} /> }
                    {!lightTheme && <LightModeIcon className={"" + (lightTheme ? "" : "dark")} /> }


                    
                </IconButton>

            </div>
            
        </div>

        <div className={"sb-search m-2 px-3 py-3 rounded-[15px] bg-white flex items-center shadow-lg "+ (lightTheme ? "" : "dark") }>
            <SearchIcon className={"" + (lightTheme ? "" : "dark")}/>
            <input placeholder="Search" className='search-Box px-2 border-0 outline-0 border-none border-white bg-transparent'/>
            

        </div>
        <div className={"sb-conversation m-2 px-3 py-3 shadow-lg  rounded-[15px] bg-white h-full overflow-y-auto   [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-transparentdark:[::-webkit-scrollbar-thumb]:bg-neutral-500 " + (lightTheme ? "" : "dark")}>
 
          
                 
                    

                    <div className='p-1'><UserChatList/></div>
                    
                
                 
             
         </div>
         </div>
        
        
      
        </>
    )

}
export default SideBar