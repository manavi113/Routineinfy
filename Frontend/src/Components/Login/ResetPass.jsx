import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPass= () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:2000/api/auth/reset-password/${token}`, {
        password: newPassword,
      });
      alert('Password updated. Please login.');
    } catch (err) {
      alert(err.response?.data?.msg || 'Error resetting password');
    }
  };

  return (
    <div className="reset-password">
      <h2>Reset Your Password</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPass;
