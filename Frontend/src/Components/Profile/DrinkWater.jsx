// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// // import './DrinkWater.css';

// const DrinkWater = () => {
//   const [glasses, setGlasses] = useState(0);
//   const [goal, setGoal] = useState(8);
//   const [reward, setReward] = useState(null);
//   const alertShownRef = useRef(false);
//   const notifiedRef = useRef(false);

//   const userId = localStorage.getItem("userId");
//   const today = new Date().toISOString().slice(0, 10);

//   const fetchWater = async () => {
//     const res = await axios.get(`http://localhost:2000/api/water/${userId}/${today}`);
//     const data = res.data;

//     setGlasses(data.glassesDrunk || 0);
//     setGoal(data.goal || 8);

//     if (data.glassesDrunk >= data.goal && !alertShownRef.current) {
//       const rewardGiven = "🏆 Hydration Goal Achieved!";
//       alert("🎉 You've reached your water goal!");
//       setReward(rewardGiven);

//       alertShownRef.current = true;
//     }

//     if (data.glassesDrunk < data.goal) {
//       setReward(null);
//       alertShownRef.current = false;
//     }
//   };

//   const handleAddGlass = async () => {
//     if (glasses >= goal) {
//       alert("Goal already reached!");
//       return;
//     }

//     await axios.post("http://localhost:2000/api/water/log", {
//       userId,
//       date: today,
//       glasses: 1,
//     });

//     fetchWater();
//   };

//   const askNotificationPermission = async () => {
//     if (Notification.permission !== "granted") {
//       await Notification.requestPermission();
//     }
//   };

 
//   useEffect(() => {
//     askNotificationPermission();

//     const interval = setInterval(() => {
//       if (!notifiedRef.current && glasses < goal && Notification.permission === "granted") {
//         new Notification("💧 Reminder", {
//           body: "Time to drink a glass of water!",
//         });
//         notifiedRef.current = true;
//       }
//     }, 2 * 60 * 60 * 1000);  

//     return () => clearInterval(interval);
//   }, [glasses, goal]);

//   useEffect(() => {
//     fetchWater();
//   }, []);

//   return (
//     <div className="water-box">
//       <h2>💧 Drink Water Tracker</h2>
//       <p>{glasses} / {goal} glasses</p>
//       <progress value={glasses} max={goal}></progress>
//       <br />
//       <button onClick={handleAddGlass}>+1 Glass (250ml)</button>

//       {reward && (
//         <div className="reward-message">
//           <h3>{reward}</h3>
//           <p>Stay hydrated and keep it up! 🚰</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DrinkWater;




import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import './DrinkWater.css'

const DrinkWater = () => {
  const [glasses, setGlasses] = useState(0);
  const [goal, setGoal] = useState(8);
  const [reward, setReward] = useState(null);
  const alertShownRef = useRef(false);
  const notifiedRef = useRef(false);

  const userId = localStorage.getItem("userId");
  const today = new Date().toISOString().slice(0, 10);

  const fetchWater = async () => {
    const res = await axios.get(`http://localhost:2000/api/water/${userId}/${today}`);
    const data = res.data;

    setGlasses(data.glassesDrunk || 0);
    setGoal(data.goal || 8);

    if (data.glassesDrunk >= data.goal && !alertShownRef.current) {
      const rewardGiven = "🏆 Hydration Goal Achieved!";
      alert("🎉 You've reached your water goal!");
      setReward(rewardGiven);
      alertShownRef.current = true;
    }

    if (data.glassesDrunk < data.goal) {
      setReward(null);
      alertShownRef.current = false;
    }
  };

  const handleAddGlass = async () => {
    if (glasses >= goal) {
      alert("🎉 Goal already reached!");
      return;
    }
    await axios.post("http://localhost:2000/api/water/log", {
      userId,
      date: today,
      glasses: 1,
    });
    fetchWater();
  };

  // 2‑hour reminder via Notification API
  const askNotificationPermission = async () => {
    if (Notification.permission !== "granted") {
      await Notification.requestPermission();
    }
  };

  useEffect(() => {
    askNotificationPermission();
    const interval = setInterval(() => {
      if (!notifiedRef.current && glasses < goal && Notification.permission === "granted") {
        new Notification("💧 Reminder", {
          body: "Time to drink a glass of water!",
        });
        notifiedRef.current = true;
      }
    }, 1  * 60 * 1000);
    return () => clearInterval(interval);
  }, [glasses, goal]);

  useEffect(() => {
    fetchWater();
  }, []);

  return (
    <div className="step-goal-box2">
      <div className="step-goal-box3">
        <h2>💧 Your Daily Water Tracker</h2>
        <p>
          {glasses} / {goal} glasses
        </p>
        <progress value={glasses} max={goal}></progress>
        <br />
        <button onClick={handleAddGlass}>+1 Glass</button>

        {reward && (
          <div className="reward-message">
            <h3>{reward}</h3>
            <p>Stay hydrated and keep it up! 🚰</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DrinkWater;
