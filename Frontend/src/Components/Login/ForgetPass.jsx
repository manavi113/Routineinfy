import React, { useState } from 'react';
import axios from 'axios';

const ForgetPass= () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await axios.post('http://localhost:2000/api/auth/forgot-password', { email });
      await axios.post('https://routineinfy-3.onrender.com/api/auth/forgot-password', { email });

      alert('Reset link sent to your email.');
    } catch (err) {
      alert(err.response?.data?.msg || 'Error sending reset email');
    }
  };

  return (
    <div className="forgot-password">
       
      <form onSubmit={handleSubmit} style={{marginTop:'3rem'}}>
        <input 
          type="email" 
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgetPass;
