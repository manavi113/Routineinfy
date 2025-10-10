import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import axios from "axios";
 
// import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import Home from './Components/Home/Home'
import Main from './Components/Main/Main';
import Task from './Components/Task/Task'
import Profile from './Components/Profile/Profile';
import ForgetPass from './Components/Login/ForgetPass'; 
import ResetPass from './Components/Login/ResetPass';
import Protectedroute from './Components/Login/Protectedroute'; 
// import Navbar from './Components/Home/Navbar/Navbar';
function App() {
// const [glasses, setGlasses] = useState(0);
const [glasses, setGlasses] = useState(() => {
    // ✅ Reload hone par localStorage se value le lo
    const saved = localStorage.getItem("glasses");
    return saved ? JSON.parse(saved) : 0;
  });
  const [goal, setGoal] = useState(8);

  const userId = localStorage.getItem("userId");
  const today = new Date().toISOString().slice(0, 10);

//   // Fetch water data globally
//  useEffect(() => {
//   const userId = localStorage.getItem("userId"); // get userId inside effect
//   if (!userId) return; // agar login nahi hai, effect exit
useEffect(() => {
  const askNotificationPermission = async () => {
    if (Notification.permission !== "granted") {
      await Notification.requestPermission();
    }
  };

  const fetchWater = async () => {
    try {
      const res = await axios.get(`https://routineinfy-3.onrender.com/api/water/${userId}/${today}`);
      const data = res.data;
      setGlasses(data.glassesDrunk || 0);
      setGoal(data.goal || 8);
       localStorage.setItem("glasses", JSON.stringify(data.glassesDrunk || 0));
    } catch (err) {
      console.log(err);
    }
  };

  askNotificationPermission();
  fetchWater();

//   const interval = setInterval(() => {
//     if (glasses < goal && Notification.permission === "granted") {
//       new Notification("💧 Reminder", {
//         body: "Time to drink a glass of water!",
//       });
//     }
//   }, 5 * 1000);

//   return () => clearInterval(interval);
// }, [glasses, goal]); 



// useEffect(() => {
  const interval = setInterval(async () => {
    const userId = localStorage.getItem("userId"); 
    if (!userId) return;  

    if (Notification.permission !== "granted") return;

    try {
      const today = new Date().toISOString().slice(0, 10);
      const res = await axios.get(`https://routineinfy-3.onrender.com/api/water/${userId}/${today}`);
      const { glassesDrunk = 0, goal: userGoal = 8 } = res.data;

      setGlasses(glassesDrunk);
      setGoal(userGoal);

      if (glassesDrunk < userGoal) {
        new Notification("💧 Reminder", { body: "Time to drink a glass of water!" });
      }
    } catch (err) {
      console.log(err);
    }
  },  2 * 60 * 60 * 1000);

  return () => clearInterval(interval);
}, [userId, today]); 



 


  return (
 
    <Routes>
   <Route path="/" element={<Main/>} />
    <Route path="/home" element={<Home />} />
     <Route path="/task" element={<Task />} />
     <Route path="/profile" element={<Profile />} />
     <Route path="/login" element={<Login />} />
     <Route path="/forget-pass" element={<ForgetPass/>} />
     <Route path="/reset-password/:token" element={<ResetPass />} />

     {/* <Route path="/" element={<Main/>} />
  <Route path="/login" element={<Login />} />
  <Route path="/forget-pass" element={<ForgetPass/>} />
  <Route path="/reset-password/:token" element={<ResetPass />} /> */}

  {/* Protected Routes */}
  <Route 
    path="/home" 
    element={
      <Protectedroute>
        <Home />
      </Protectedroute>
    } 
  />
  <Route 
    path="/task" 
    element={
      <Protectedroute>
        <Task />
      </Protectedroute>
    } 
  />
  <Route 
    path="/profile" 
    element={
      <Protectedroute>
        <Profile />
      </Protectedroute>
    } 
  />
    </Routes>
    
   
  )
}


export default App
 // {/* <Route path="/" element={<Register />} />          */}
  //     <Route path="/register" element={<Register />} />
  //     <Route path="/login" element={<Login />} />
  //     <Route path="/home" element={<Home />} />
  //     <Route path="/task" element={<Task />} />