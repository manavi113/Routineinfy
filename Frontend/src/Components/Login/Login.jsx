// import React, { useState } from 'react';
// import './Login.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './ForgetPass'

// const Login = () => {

//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({...formData, [e.target.name]: e.target.value});
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:2000/api/auth/login', formData);
//       onsole.log("Full Response:", res);
//           localStorage.setItem("userId", res.data.user._id);
//      localStorage.setItem('token', res.data.token);
     

// await axios.post('http://localhost:2000/api/user/log-login', {
//       userId: userId,
//       date: new Date().toISOString().slice(0, 10)
//     });

//     console.log("Login Response:", res);  


//       navigate('/home');  
//     } catch (err) {
//          alert(err?.response?.data?.msg || "Login error");
//     }
//     console.log("Response:", res);

//   };

//   return (
//     <div className='login'>
//      <div className="login-container">
//          <div className="formlogin" >
//         <form onSubmit={handleSubmit}>
//         <h2>LOGIN</h2>
//         <input type="email" name="email"  placeholder="Enter your email"  value={formData.email}  onChange={handleChange}  required/> <br />
//         <input type="password"  name="password"  placeholder="Enter password"  value={formData.password}  onChange={handleChange}  required/> <br />
//         <button type="submit">Submit</button>
//          <p 
//     className="forgot-link" 
//     onClick={() => navigate('/forget-pass')} 
//     style={{ color: 'blue', cursor: 'pointer', marginTop: '10px' }}
//   >
//     Forgot Password?
//   </p>
//         </form>
//     </div>
//      </div>

//     </div>
//   )
// }

// export default Login






import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ForgetPass';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const res = await axios.post('http://localhost:2000/api/auth/login', formData);
      const res = await axios.post('https://routineinfy-3.onrender.com/api/auth/login', formData);

      console.log("Full Response:", res);

      const userId = res?.data?.user?._id;
      const token = res?.data?.token;

      if (!userId || !token) {
        alert("Login failed: invalid response from server");
        return;
      }

      localStorage.setItem("userId", userId);
      localStorage.setItem("token", token);

      
      // await axios.post('http://localhost:2000/api/auth/log-login', {
      //   userId,
      //   date: new Date().toISOString().slice(0, 10)
      // });

await axios.post('https://routineinfy-3.onrender.com/api/auth/log-login', {
  userId,
  date: new Date().toISOString().slice(0, 10)
});

      navigate('/home');
    } catch (err) {
      console.log("Login error:", err);
      alert(err?.response?.data?.msg || "Login error");
    }
  };

  return (
    <div className='login'>
      <div className="login-container">
        <div className="formlogin">
          <form onSubmit={handleSubmit}>
            <h2>LOGIN</h2>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            /> <br />
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            /> <br />
            <button type="submit">Submit</button>
            <p
              className="forgot-link"
              onClick={() => navigate('/forget-pass')}
              style={{ color: 'blue', cursor: 'pointer', marginTop: '10px' }}
            >
              Forgot Password?
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
