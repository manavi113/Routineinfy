// import React, { useEffect, useState, useRef } from "react";

// import axios from "axios";
// import './StepsGoal.css'
 

// const StepsGoal = () => {
//   const [steps, setSteps] = useState(0);
//   const [goal, setGoal] = useState(10000);
//   const [goalReached, setGoalReached] = useState(false);
//   const alertShownRef = useRef(false); // 👈 this prevents double alert

//   const userId = localStorage.getItem("userId");
//   const today = new Date().toISOString().slice(0, 10);

//   const fetchSteps = async () => {
//     const res = await axios.get(`http://localhost:2000/api/steps/${userId}/${today}`);
//     const stepsFetched = res.data.stepsTaken || 0;
//     const goalFetched = res.data.goal || 10000;

//     setSteps(stepsFetched);
//     setGoal(goalFetched);

//     if (stepsFetched >= goalFetched) {
//       setGoalReached(true);

//       if (!alertShownRef.current) {
//         alert("🎉 Congratulations! You've already completed your step goal today!");
//         alertShownRef.current = true; // 🔒 lock it
//       }
//     } else {
//       setGoalReached(false);
//       alertShownRef.current = false; // reset if under goal
//     }
//   };

//   useEffect(() => {
//     fetchSteps();
//   }, []);

//   const handleAddSteps = async (amount) => {
//     if (steps >= goal) {
//       alert("🎉 Goal already reached!");
//       return;
//     }

//     const newTotal = steps + amount > goal ? goal - steps : amount;
//     await axios.post("http://localhost:2000/api/steps/log", {
//       userId,
//       date: today,
//       steps: newTotal,
//     });
//     fetchSteps(); // refresh
//   };

//   return (
//     <div className="step-goal-box1">
//       <div className="step-goal-box">
//         <h2>🏃‍♀️ Your Daily Step Tracker</h2>
//         <p>
//           {steps} / {goal} steps
//         </p>
//         <progress value={steps} max={goal}></progress>
//         <br />
//         <button onClick={() => handleAddSteps(1000)}>+1000 Steps</button>
//         <button onClick={() => handleAddSteps(500)}>+500 Steps</button>
//         <button onClick={() => handleAddSteps(100)}>+100 Steps</button>
//       </div>
//     </div>
//   );
// };


// export default StepsGoal;








// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import './StepsGoal.css';

// const StepsGoal = () => {
//   const [steps, setSteps] = useState(0);
//   const [goal, setGoal] = useState(10000);
//   const [goalReached, setGoalReached] = useState(false);
//   const [reward, setReward] = useState(null); // 🏆 reward state
//   const alertShownRef = useRef(false);

//   const userId = localStorage.getItem("userId");
//   const today = new Date().toISOString().slice(0, 10);

//   const fetchSteps = async () => {
//     const res = await axios.get(`http://localhost:2000/api/steps/${userId}/${today}`);
//     const stepsFetched = res.data.stepsTaken || 0;
//     const goalFetched = res.data.goal || 10000;

//     setSteps(stepsFetched);
//     setGoal(goalFetched);

//     // if (stepsFetched >= goalFetched) {
//     //   setGoalReached(true);

//     //   if (!alertShownRef.current) {
//         const rewardGiven = "🏅 You earned a badge!";
//         alert("🎉 Congratulations! You've completed your step goal today!");
//         setReward(rewardGiven);

//         // Optional: Send reward info to backend
//         // await axios.post("http://localhost:2000/api/rewards", {
//         //   userId,
//         //   date: today,
//         //   reward: rewardGiven,
//         // });

//   //       alertShownRef.current = true;
//   //     }
//   //   } else {
//   //     setGoalReached(false);
//   //     setReward(null);
//   //     alertShownRef.current = false;
//   //   }
//   };

//   useEffect(() => {
//     fetchSteps();
//   }, []);

//   const handleAddSteps = async (amount) => {
//     if (steps >= goal) {
//       alert("🎉 Goal already reached!");
//       return;
//     }

//     const newTotal = steps + amount > goal ? goal - steps : amount;
//     await axios.post("http://localhost:2000/api/steps/log", {
//       userId,
//       date: today,
//       steps: newTotal,
//     });
//     fetchSteps();
//   };

//   return (
//     <div className="step-goal-box1">
//       <div className="step-goal-box">
//         <h2>🏃‍♀️ Your Daily Step Tracker</h2>
//         <p>{steps} / {goal} steps</p>
//         <progress value={steps} max={goal}></progress>
//         <br />
//         <button onClick={() => handleAddSteps(1000)}>+1000 Steps</button>
//         <button onClick={() => handleAddSteps(500)}>+500 Steps</button>
//         <button onClick={() => handleAddSteps(100)}>+100 Steps</button>

//         {reward && (
//           <div className="reward-message">
//             <h3>{reward}</h3>
//             <p>Keep going for more rewards!</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StepsGoal;






import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import './StepsGoal.css';

const StepsGoal = () => {
  const [steps, setSteps] = useState(0);
  const [goal, setGoal] = useState(10000);
  const [goalReached, setGoalReached] = useState(false);
  const [reward, setReward] = useState(null); 
  const alertShownRef = useRef(false);  

  const userId = localStorage.getItem("userId");
  const today = new Date().toISOString().slice(0, 10);

  const fetchSteps = async () => {
    try {
      // const res = await axios.get(`http://localhost:2000/api/steps/${userId}/${today}`);
      const res = await axios.get(`https://routineinfy-3.onrender.com/api/steps/${userId}/${today}`);

      const stepsFetched = res.data.stepsTaken || 0;
      const goalFetched = res.data.goal || 10000;

      setSteps(stepsFetched);
      setGoal(goalFetched);

      
      if (stepsFetched >= goalFetched) {
        setGoalReached(true);
        setReward("🏅 You earned a badge!");
      } else {
        setGoalReached(false);
        setReward(null);
        alertShownRef.current = false; 
      }
    } catch (error) {
      console.error("Error fetching steps:", error);
    }
  };

  useEffect(() => {
    fetchSteps();
  }, []);

  const handleAddSteps = async (amount) => {
    if (steps >= goal) {
      alert("🎉 Goal already reached!");
      return;
    }

    const newTotal = steps + amount > goal ? goal - steps : amount;
    const updatedSteps = steps + newTotal;

    // await axios.post("http://localhost:2000/api/steps/log", {
    //   userId,
    //   date: today,
    //   steps: newTotal,
    // });
     await axios.post("https://routineinfy-3.onrender.com/api/steps/lo", {
      userId,
      date: today,
      steps: newTotal,
    });

    
    if (updatedSteps >= goal && !alertShownRef.current) {
      alert("🎉 Congratulations! You've completed your step goal today!");
      alertShownRef.current = true;
    }

    fetchSteps();  
  };

  return (
    <div className="step-goal-box1">
      <div className="step-goal-box">
        <h2>🏃‍♀️ Your Daily Step Tracker</h2>
        <p>{steps} / {goal} steps</p>
        <progress value={steps} max={goal}></progress>
        <br />
        <button onClick={() => handleAddSteps(1000)}>+1000 Steps</button>
        <button onClick={() => handleAddSteps(500)}>+500 Steps</button>
        <button onClick={() => handleAddSteps(100)}>+100 Steps</button>

        {reward && (
          <div className="reward-message">
            <h3>{reward}</h3>
            <p>Keep going for more rewards!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepsGoal;
