// import React, { useEffect } from 'react'
// import './Navbar.css';
// import { Link, useLocation } from 'react-router-dom';


// const Navbar = () => {
//   const location = useLocation();  

//   useEffect(() => {
     
//     const navLinks = document.querySelectorAll("nav a");

//     const handleClick = (e) => {
      
//       navLinks.forEach(link => link.classList.remove("active"));
      
//       e.target.classList.add("active");
//     };

     
//     navLinks.forEach(link => {
//       link.addEventListener("click", handleClick);
//     });

     
//     return () => {
//       navLinks.forEach(link => {
//         link.removeEventListener("click", handleClick);
//       });
//     };
//   }, []); 
//   return (
     
//     <div>
//           <nav>
//       <Link to="/home" className={location.pathname === "/home" ? 'active' : ''}>HOME</Link>
//       <Link to="/task" className={location.pathname === "/task" ? 'active' : ''}>Health Analysis</Link>
       
//       <Link to="/profile" className={location.pathname === "/profile" ? 'active' : ''}>My-Profile</Link>
//     </nav>
//     </div>
//   )
// }

// export default Navbar


import React, { useEffect,useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios';


const Navbar = () => {
  const location = useLocation();
   
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const id = localStorage.getItem("userId");
      if (id) {
        try {
          // const res = await axios.get(`http://localhost:2000/api/auth/profile/${id}`);
          const res = await axios.get(`https://routineinfy-3.onrender.com/api/auth/profile/${id}`);

          setUser(res.data);
        } catch (err) {
          console.error("Failed to fetch user", err);
        }
      }
    };
    fetchUser();
  }, []);
  const handleLogout = () => {
  localStorage.removeItem("userId");  
 

  window.location.href = "/login"; 
};

  useEffect(() => {
    const navLinks = document.querySelectorAll(".nav-link");

    const handleClick = (e) => {
      navLinks.forEach(link => link.classList.remove("active"));
      e.target.classList.add("active");
    };

    navLinks.forEach(link => {
      link.addEventListener("click", handleClick);
    });

    return () => {
      navLinks.forEach(link => {
        link.removeEventListener("click", handleClick);
      });
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-3">
      <div className="container-fluid">
       
        {user && (
            <div className="d-flex align-items-center">
              {user.profilePic && (
                <img
                  // src={`http://localhost:2000/uploads/${user.profilePic}`}
                  src={`https://routineinfy-3.onrender.com/uploads/${user.profilePic}`}

                  alt="Profile"
                  style={{ width: '35px', height: '35px', borderRadius: '50%', objectFit: 'cover', marginRight: '8px' }}
                />
              )}
              <span className="text-white">{user.name}</span>
              <button onClick={handleLogout}>Logout</button>

            </div>
            
          )}
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
  <li className="nav-item me-4"> {/* ← yeh hai gap */}
    <Link to="/home" className={`nav-link ${location.pathname === "/home" ? 'active' : ''}`}>HOME</Link>
  </li>
  <li className="nav-item me-4"> {/* ← aur yeh bhi gap */}
    <Link to="/task" className={`nav-link ${location.pathname === "/task" ? 'active' : ''}`}>Health Analysis</Link>
  </li>
  <li className="nav-item"> {/* last item - no extra margin */}
    <Link to="/profile" className={`nav-link ${location.pathname === "/profile" ? 'active' : ''}`}>My-Profile</Link>
  </li>
</ul>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
