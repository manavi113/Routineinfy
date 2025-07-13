import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './Task.css';
import Navbar from '../Home/Navbar/Navbar';

const Task = () => {
    const [task, setTask] = useState('');
    const [result, setResult] = useState('');
    const [products, setProducts] = useState([]);

    
const userAge = localStorage.getItem('age');
const userGender = localStorage.getItem('gender');

// console.log("Age:", userAge);
// console.log("Gender:", userGender);

const issueToKeywords = {
  sleep: ["sleep", "nap", "circadian", "rest", "bedtime"],
  hydration: ["hydrated", "water", "fluid", "thirst"],
  diet: ["diet", "nutrients", "nutrition", "balanced", "healthy food"],
  exercise: ["exercise", "physical", "workout", "fitness", "intensity"],
  mentalFatigue: ["fatigue", "mental", "burnout", "stress", "cognitive"],
  breaks: ["break", "pause", "relaxation"],
};




useEffect(() => {
  const userId = localStorage.getItem("userId");
  if (userId) {
    axios.get(`http://localhost:2000/api/auth/profile/${userId}`)
      .then((res) => {
        localStorage.setItem("age", res.data.age);
        localStorage.setItem("gender", res.data.gender);
        console.log("Saved age & gender from profile");
      })
      .catch((err) => console.error("Failed to fetch age/gender:", err));
  }
}, []);




const extractKeywordsFromAnalysis = (text) => {
  const lowered = text.toLowerCase();
  const matched = [];

  Object.keys(issueToKeywords).forEach(issue => {
    if (lowered.includes(issue)) {
      matched.push(...issueToKeywords[issue]);
    }
  });

  return [...new Set(matched)];  
};


 




    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!task) return;
  
      try {
        await axios.post('http://localhost:2000/taskapi/tasks', { task },
           {
    headers: {
      Authorization: localStorage.getItem('token'), // ✅ Send token
    }
  }
        );
        alert("Task added successfully!");
      //  userId: localStorage.getItem('userId')

        const geminiRes = await axios.post(
          'http://localhost:2000/api/gemini/get-review',
         {
  prompt: `You are a strict health assistant.
Use the details below to generate a health analysis.

User Information:
- Age: ${userAge}
- Gender: ${userGender}
User Routine:
${task}

Generate a health analysis in the specified format.
`
}
        );

        setResult(geminiRes.data?.reply  || "No response received.");
        const keywords = extractKeywordsFromAnalysis(geminiRes.data?.reply );
        if (keywords.length === 0) {
  console.warn("No keywords extracted from Gemini response.");
} else {
    const prodRes = await axios.post('http://localhost:2000/api/Prod/prod', { keywords });
    setProducts(prodRes.data);
}
       
      }  catch (error) {
        console.error("Error adding task:", error);
      }
    };
  return (
    <div className='task'>
  
       <Navbar/>
   <h2>Add Your Routine!</h2>
   <form onSubmit={handleSubmit}>
  <textarea
    placeholder="Enter your Routine..."
    value={task}
    onChange={(e) => setTask(e.target.value)}
    rows="5"
    cols="50"
  />
  <button type="submit">Save Task</button>
</form>

{result && (
        <div className="analysis">
          <h3>Health Analysis:</h3>
          {result && (
  <div className="analysis">
    
    {result.split('\n').map((line, index) => {
      if (line.toLowerCase().includes('health issue')) {
        return <h4 key={index}>🩺 {line}</h4>;
      } else if (line.toLowerCase().includes('reason')) {
        return <h4 key={index}>🔍 {line}</h4>;
      } else if (line.toLowerCase().includes('suggestion')) {
        return <h4 key={index}>💡 {line}</h4>;
      } else {
        return <p key={index}>{line}</p>;
      }
    })}
   {result && products.length > 0 && (
  <div className="container mt-4">
    <h3>🛍️ Recommended Products for You</h3>
    <div className="row">
      {products.map((prod) => (
        <div className="col-md-4 mb-4" key={prod._id}>
          <div className="card h-100 shadow-sm">
            <img
              src={prod.image}
              className="card-img-top"
              alt={prod.name}
              style={{ height: '200px', objectFit: 'contain' }}
            />
            <div className="card-body d-flex flex-column justify-content-between">
              <div>
                <h5 className="card-title">{prod.name}</h5>
                <p className="card-text">{prod.description}</p>
                <p className="text-success fw-bold">₹{prod.price}</p>
              </div>
              <a
                href={prod.link || '#'}
                className="btn btn-success mt-auto"
                target="_blank"
                rel="noopener noreferrer"
              >
                Buy Now
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

  </div>
)}
        </div>
      )}




    </div>
  )
}

export default Task





















// import React, { useState } from 'react';
// import axios from 'axios';
// import './Task.css';
// import Navbar from '../Home/Navbar/Navbar';

// const Task = () => {
//   const userAge = localStorage.getItem('userAge');
//   const userGender = localStorage.getItem('userGender');
//   const [formData, setFormData] = useState({
//     wakeUpTime: '',
//     morningRoutine: '',
//     firstThingAfterWaking: '',
//     drinkWaterAfterWaking: '',
//     dailyWaterIntake: '',
//     eatBreakfast: '',
//     breakfastFood: '',
//     breakfastDiet: '',
//     studyWorkHours: '',
//     takeBreaks: '',
//     breakFrequency: '',
//     afternoonActivity: '',
//     exerciseDuringDay: '',
//     exerciseType: '',
//     exerciseFrequency: '',
//     lunchFood: '',
//     lunchDiet: '',
//     dinnerTime: '',
//     sleepHours: '',
//     bedtimeRoutine: '',
//     age: userAge || '',   
//     gender: userGender || ''
//   });
//   const [result, setResult] = useState('');
//   const [loading, setLoading] = useState(false);


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value
//     }));
//   };
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.wakeUpTime) return; 
//     setLoading(true);
//     try {
//       await axios.post('http://localhost:2000/taskapi/tasks',  {formData} );
//       alert("Task added successfully!");

//       const geminiRes = await axios.post(
//         'http://localhost:2000/api/gemini/get-review',
//         { prompt: JSON.stringify(formData) },
        
//       );

//       setResult(geminiRes.data?.reply || "No response received.");
//     } catch (error) {
//       console.error("Error adding task:", error);
      
//     } finally {
//       setLoading(false); 
//     }
//   };

//   return (
//     <div className='task'>
       

//       <Navbar />
      
//         <div className="name">
//         <h1>Hello! Manavi</h1>
//       </div>

//       <div className="routine-form">
//         <h2>Tell about yourself and ur Routine!</h2>
//         <form onSubmit={handleSubmit}> 
//         <div>
//             <label>Age:</label>
//             <input 
//               type="number" 
//               name="age" 
//               value={formData.age} 
//               onChange={handleChange} 
//             />
//           </div>
//           <div>
//             <label>Gender:</label>
//             <select 
//               name="gender" 
//               value={formData.gender} 
//               onChange={handleChange}
//             >
//               <option value="">Select Gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>
//           </div>

//           <div>
//             <label>What time do you wake up?</label>
//             <input 
//               type="time" 
//               name="wakeUpTime" 
//               value={formData.wakeUpTime} 
//               onChange={handleChange} 
//             />
//           </div>
//           <div>
//             <label>Do you follow a morning routine? (Yes/No)</label>
//             <input 
//               type="text" 
//               name="morningRoutine" 
//               value={formData.morningRoutine} 
//               onChange={handleChange} 
//             />
//           </div>
//           <div>
//             <label>What’s the first thing you do after waking up?</label>
//             <input 
//               type="text" 
//               name="firstThingAfterWaking" 
//               value={formData.firstThingAfterWaking} 
//               onChange={handleChange} 
//             />
//           </div>
//           <div>
//             <label>Do you drink water immediately after waking up? (Yes/No)</label>
//             <input 
//               type="text" 
//               name="drinkWaterAfterWaking" 
//               value={formData.drinkWaterAfterWaking} 
//               onChange={handleChange} 
//             />
//           </div>
//           <div>
//             <label>How much water do you consume daily?</label>
//             <input 
//               type="text" 
//               name="dailyWaterIntake" 
//               value={formData.dailyWaterIntake} 
//               onChange={handleChange} 
//             />
//           </div>
          {/* <div>
            <label>Do you eat breakfast regularly? (Yes/No)</label>
            <input 
              type="text" 
              name="eatBreakfast" 
              value={formData.eatBreakfast} 
              onChange={handleChange} 
            />
          </div>
          <div>
            <label>What do you usually eat for breakfast?</label>
            <input 
              type="text" 
              name="breakfastFood" 
              value={formData.breakfastFood} 
              onChange={handleChange} 
            />
          </div>
           <div>
            <label>Do you follow a specific diet for breakfast? (Yes/No)</label>
            <input 
              type="text" 
              name="breakfastDiet" 
              value={formData.breakfastDiet} 
              onChange={handleChange} 
            />
          </div>
          <div>
            <label>How many hours do you work or study each day?</label>
            <input 
              type="number" 
              name="studyWorkHours" 
              value={formData.studyWorkHours} 
              onChange={handleChange} 
            />
          </div>
          <div>
            <label>Do you take breaks during work/study? (Yes/No)</label>
            <input 
              type="text" 
              name="takeBreaks" 
              value={formData.takeBreaks} 
              onChange={handleChange} 
            />
          </div>
          <div>
            <label>How often do you take a break during work/study?</label>
            <input 
              type="text" 
              name="breakFrequency" 
              value={formData.breakFrequency} 
              onChange={handleChange} 
            />
          </div> 
           <div>
            <label>What’s your primary activity during the afternoon?</label>
            <input 
              type="text" 
              name="afternoonActivity" 
              value={formData.afternoonActivity} 
              onChange={handleChange} 
            />
          </div>
          <div>
            <label>Do you exercise during the day? (Yes/No)</label>
            <input 
              type="text" 
              name="exerciseDuringDay" 
              value={formData.exerciseDuringDay} 
              onChange={handleChange} 
            />
          </div>
          <div>
            <label>What type of exercise do you prefer?</label>
            <input 
              type="text" 
              name="exerciseType" 
              value={formData.exerciseType} 
              onChange={handleChange} 
            />
          </div>
          <div>
            <label>How often do you exercise each week?</label>
            <input 
              type="number" 
              name="exerciseFrequency" 
              value={formData.exerciseFrequency} 
              onChange={handleChange} 
            />
          </div>
          <div>
            <label>What do you usually have for lunch?</label>
            <input 
              type="text" 
              name="lunchFood" 
              value={formData.lunchFood} 
              onChange={handleChange} 
            />
          </div>
          <div>
            <label>Do you follow a diet plan for lunch? (Yes/No)</label>
            <input 
              type="text" 
              name="lunchDiet" 
              value={formData.lunchDiet} 
              onChange={handleChange} 
            />
          </div>
          <div>
            <label>What time do you have dinner?</label>
            <input 
              type="time" 
              name="dinnerTime" 
              value={formData.dinnerTime} 
              onChange={handleChange} 
            />
          </div>
          <div>
            <label>How many hours do you sleep on average each night?</label>
            <input 
              type="number" 
              name="sleepHours" 
              value={formData.sleepHours} 
              onChange={handleChange} 
            />
          </div> */}
//           <div>
//             <label>Do you follow a bedtime routine? (Yes/No)</label>
//             <input 
//               type="text" 
//               name="bedtimeRoutine" 
//               value={formData.bedtimeRoutine} 
//               onChange={handleChange} 
//             /> 
//            </div> 

//           <button type="submit">Save Task</button>
//         </form>
//       </div>
//       {loading && <p className="loading-text">⏳ Please wait for the results...</p>}
//       {!loading && result && (
//         <div className="analysis">
//           <h3>🩺 Health Analysis</h3>
//           <div className="analysis-content">
//           {result.split('\n').map((line, index) => {
//   let cleaned = line.trim()
//     .replace(/\*+\s*/g, '')  
//     .replace(/🔍\s*Reason:\s*ing:/gi, '🔍 Reason:')
  
//   const keywordsToBold = ['eye strain', 'vision problems', 'neck pain', 'back pain', 'carpal tunnel syndrome', 'sleep disturbances', 'improvements', 'overall recommendation','Important Considerations'];

  
//   const highlightKeywords = (text) => {
//     let modifiedText = text;
//     keywordsToBold.forEach(word => {
//       const regex = new RegExp(`(${word})`, 'ig');
//       modifiedText = modifiedText.replace(regex, '<strong>$1</strong>');
//     });
//     return modifiedText;
//   };

 
//   const highlightedLine = highlightKeywords(cleaned);

//   if (cleaned.toLowerCase().includes('health issue')) {
//     return <h4 key={index} dangerouslySetInnerHTML={{ __html: `🩺 ${highlightedLine}` }} />;
//   } else if (cleaned.toLowerCase().includes('reason')) {
//     const cleanedText = cleaned.replace(/reason[:\-]?\s*/i, '');
//     return (
//       <p key={index} dangerouslySetInnerHTML={{ __html: `<strong>🔍 Reason:</strong> ${highlightKeywords(cleanedText)}` }} />
//     );
//   } else if (cleaned.toLowerCase().includes('suggestion')) {
//     return <h4 key={index} dangerouslySetInnerHTML={{ __html: `💡 ${highlightedLine}` }} />;
//   } else {
//     return <p key={index} dangerouslySetInnerHTML={{ __html: highlightKeywords(cleaned) }} />;
//   }
// })}

//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Task;
