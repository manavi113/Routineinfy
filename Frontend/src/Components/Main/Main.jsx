import React, { useState } from 'react';
import './Main.css'
import icon from '../../assets/Routineify-icon.jpg'
import Register from '../Register/Register';
import Login from '../Login/Login';


const Main = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };


const openLoginModal = () => {
    setShowLoginModal(true);
    setShowRegisterModal(false);
    setShowDropdown(false);
  };



const openRegisterModal = () => {
     setShowRegisterModal(true);
    setShowLoginModal(false); 
    setShowDropdown(false);
  };




  const closeModal = () => {
    setShowRegisterModal(false);
        setShowLoginModal(false);
  };





  return (
    <div>
        <div className="main">
          <div className="intro">
            <img src={icon} alt="Loading-error" />
            <h1>Routineinfy</h1>
            <h5>Glow up your day, the Routineify way!</h5>
          </div>
          <div className="icon"  onClick={toggleDropdown}>
            <i className="fa-solid fa-bars"></i>
          </div>
          {showDropdown && (
          <div className="dropdown">
            <button onClick={openRegisterModal}>Register</button>
             <button onClick={openLoginModal}>Login</button>
          </div>
        )}
        </div>
        {showRegisterModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <Register />
          </div>
        </div>
      )}
        {showLoginModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <Login />
          </div>
        </div>
      )}
    </div>
  )
}

export default Main