 
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import './LoginChart.css'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const LoginChart = () => {
  const [loginData, setLoginData] = useState([]);

  useEffect(() => {
    const fetchLoginLogs = async () => {
      const userId = localStorage.getItem('userId');
      // const res = await axios.get(`http://localhost:2000/api/auth/login-logs/${userId}`);
      const res = await axios.get(`https://routineinfy-3.onrender.com/api/auth/login-logs/${userId}`);

    //   setLoginData(res.data.loginLogs);
     if (res.data && Array.isArray(res.data.loginLogs)) {
        setLoginData(res.data.loginLogs);
      } else {
        setLoginData([]); // fallback
      }

    };
    fetchLoginLogs();
  }, []);

  
 
const dateCounts = Array.isArray(loginData)
  ? loginData.reduce((acc, date) => {
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {})
  : {};


  const chartData = {
    labels: Object.keys(dateCounts),
    datasets: [
      {
        label: 'Logins per Day',
        data: Object.values(dateCounts),
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderRadius: 5,
      }
    ]
  };
  console.log("Login Data:", loginData);


  return (
    <div className='Bars'>
      <h3>Login Activity</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default LoginChart;
