

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Maincontainer from './Components/MainContainer/Maincontainer';
import LoginPage from './Components/LoginPage/LoginPage';
import SigninPage from './Components/SigninPage/SigninPage';
import Availableusers from './Components/AvailableUsers/AvailableUsers';
import AvailableGroups from './Components/AvailableGroups/AvailableGroups';
import ChatArea from './Components/ChatArea/ChatArea';
import GroupCreate from './Components/GroupCreate/GroupCreate';
import WelcomPage from './Components/WelcomPage/WelcomPage';

function App() {
  return (
    <div className='HomePage bg-slate-300 h-screen w-full m-0 flex justify-center items-center'>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<LoginPage />} />
          <Route path='/SigninPage' element={<SigninPage />} />
          

          {/* Parent Route: Maincontainer */}
          <Route path='/Maincontainer' element={<Maincontainer />}>
            {/* Index Route for default content */}
            <Route index element={<WelcomPage />} />
            {/* Nested Routes */}
            <Route path='Availableusers' element={<Availableusers />} />
            <Route path='AvailableGroups' element={<AvailableGroups />} />
            <Route path='GroupCreate' element={<GroupCreate />} />
            <Route path='ChatArea/:chatId' element={<ChatArea />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
