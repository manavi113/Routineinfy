 







import React, { useState, useEffect } from 'react';
import './Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', age: '', gender: ''
  });
  const [image, setImage] = useState(null);   
  const navigate = useNavigate();

  // useEffect(() => {
  //   const savedAge = localStorage.getItem('age');
  //   const savedGender = localStorage.getItem('gender');

  //   if (savedAge) {
  //     setFormData((prevData) => ({ ...prevData, age: savedAge }));
  //   }
  //   if (savedGender) {
  //     setFormData((prevData) => ({ ...prevData, gender: savedGender }));
  //   }
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // if (name === 'age' || name === 'gender') {
    //   localStorage.setItem(name, value);
    // }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();   
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });
      if (image) {
        data.append("profilePic", image);   
      }

      const res = await axios.post('http://localhost:2000/api/auth/register', data);
      localStorage.setItem('userId', res.data.user._id);
      alert("Registered successfully!");
      navigate('/login');

    } catch (err) {
      alert(err.response?.data?.msg || "Error during registration");
    }
  };

  return (
    <div className='Register'>
       
      <div className="form">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <h2>Create an Account</h2>

          <input type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required /><br />

          <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required /><br />

          <input type="password" name="password" placeholder="Create a password" value={formData.password} onChange={handleChange} required /><br />

          <input type="number" name="age" placeholder="Enter your age" value={formData.age} onChange={handleChange} required /><br />

          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select><br />

       
          <input type="file" accept="image/*" onChange={handleImageChange} /><br />

          <button type="submit">Register</button>
        </form>
      </div>
      <h5>Already an Account?</h5>
      <button onClick={() => navigate('/login')} type="submit">Login</button>
    </div>
  );
};

export default Register;
