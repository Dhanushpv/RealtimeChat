import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Maincontainer from './Components/MainContainer/Maincontainer';




function App() {


  return (
    <>
      <div className='HomePage bg-slate-300 h-screen w-ful m-0 flex justify-center items-center'>

      <Router>
        <Routes><Route path={'/'} exact element={<Maincontainer />} /></Routes>
        <Routes><Route path={'/Maincontainer'} exact element={<Maincontainer />} /></Routes>
        


      </Router>
      </div>
    </>


  )
}

export default App
