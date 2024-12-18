


import React, { createContext, useState } from "react";
import '../MainContainer/MainContainer.css';
import Sidebar from '../SideBar/SideBar';
import { Outlet } from "react-router-dom";
import WelcomPage from '../WelcomPage/WelcomPage';


// Redux imports
import { Provider } from 'react-redux';
import { store } from "../Features/store";

// Context creation
export const myContext = createContext();

function Maincontainer() {
    const [refresh, setRefresh] = useState(true);

    return (
        <div className="HomePage bg-slate-300 h-screen w-full m-0 flex justify-center items-center">
        <Provider store={store}> {/* Wrap in Redux Provider */}
            <div className="main-container bg-slate-200 w-12/13 h-11/12 rounded-lg flex">
                <myContext.Provider value={{ refresh, setRefresh }}>
                    <Sidebar />
                    
                    
                    <Outlet />
                </myContext.Provider>
            </div>
        </Provider>
        </div>
    );
}

export default Maincontainer;
