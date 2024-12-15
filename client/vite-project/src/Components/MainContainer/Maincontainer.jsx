import React from "react"
import '../MainContainer/MainContainer.css'
import SideBar from '../SideBar/SideBar';
// import WorkArea from "../WorkArea/WorkArea";
import ChatArea from "../ChatArea/ChatArea";
import WelcomPage from "../WelcomPage/WelcomPage";
import GroupCreate from "../GroupCreate/GroupCreate";
import LoginPage from "../LoginPage/LoginPage";
import SigninPage from "../SigninPage/SigninPage";
import AvailableUsers from "../AvailableUsers/AvailableUsers";
import AvailableGroups from "../AvailableUsers/AvailableUsers";
import { Provider } from 'react-redux';
import { store } from "../Features/store";

function Maincontainer() {

    return (
        <>
            <div className="main-container  bg-slate-200    w-12/13 h-11/12 rounded-lg flex  ">

            <Provider store={store}> <SideBar/> <ChatArea/></Provider> 
            <div className=" w-full h-full bg-slate-200 rounded-r-lg "> </div>
            {/* <Provider><WelcomPage/></Provider> */}
            {/* <GroupCreate/> */}
            {/* <LoginPage/> */}
            {/* <SigninPage/> */}
            {/* <AvailableUsers/> */}
            {/* <AvailableGroups/> */}

         

            </div>
        </>
    )

} export default Maincontainer