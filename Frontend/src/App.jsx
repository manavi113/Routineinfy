import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { BrowserRouter,Routes, Route } from 'react-router-dom';
// import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import Home from './Components/Home/Home'
import Main from './Components/Main/Main';
import Task from './Components/Task/Task'
import Profile from './Components/Profile/Profile';
import ForgetPass from './Components/Login/ForgetPass'; 
import ResetPass from './Components/Login/ResetPass'; 
// import Navbar from './Components/Home/Navbar/Navbar';
function App() {
  return (
 
    <Routes>
   <Route path="/" element={<Main/>} />
    <Route path="/home" element={<Home />} />
     <Route path="/task" element={<Task />} />
     <Route path="/profile" element={<Profile />} />
     <Route path="/login" element={<Login />} />
     <Route path="/forget-pass" element={<ForgetPass/>} />
     <Route path="/reset-password/:token" element={<ResetPass />} />
    </Routes>
    
   
  )
}


export default App
 // {/* <Route path="/" element={<Register />} />          */}
  //     <Route path="/register" element={<Register />} />
  //     <Route path="/login" element={<Login />} />
  //     <Route path="/home" element={<Home />} />
  //     <Route path="/task" element={<Task />} />