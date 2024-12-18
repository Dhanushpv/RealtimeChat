

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
import LandingPage from './Components/LandingPage/LandingPage';

function App() {
  return (
    <div>
     

    <div className=''>
      <Router>
        <Routes>
          {/* Public Routes */}
          
          <Route path='/' element={<LandingPage />} />
          <Route path='/LoginPage' element={<LoginPage />} />
          <Route path='/SigninPage' element={<SigninPage />} />
          

          {/* Parent Route: Maincontainer */}
          <Route path='/Maincontainer' element={<Maincontainer />}>
            {/* Index Route for default content */}
            <Route index element={<WelcomPage />} />
            {/* Nested Routes */}
            <Route path='Availableusers' element={<Availableusers />} />
            <Route path='AvailableGroups' element={<AvailableGroups />} />
            <Route path='GroupCreate' element={<GroupCreate />} />
            <Route path='ChatArea' element={<ChatArea />} />
          </Route>
        </Routes>
      </Router>
    </div>
    </div>
  );
}

export default App;
