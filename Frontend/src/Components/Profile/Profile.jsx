import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Home/Navbar/Navbar";
import "./Profile.css"; 
import StepsGoal from "./StepsGoal";
import LoginChart from "../Login/LoginChart";
import DrinkWater from "./DrinkWater";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    profilePic: null,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        age: user.age,
        gender: user.gender,
        profilePic: null,
      });
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const id = localStorage.getItem("userId");
    const data = new FormData();

    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("age", formData.age);
    data.append("gender", formData.gender);
    if (formData.profilePic) data.append("profilePic", formData.profilePic);

    try {
      const res = await axios.put(
        `http://localhost:2000/api/auth/profile/${id}`,
        data
      );
      setUser(res.data.user);
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) {
      axios
        .get(`http://localhost:2000/taskapi/user/${id}`)
        .then((res) => setTasks(res.data))
        .catch((err) => console.error(err));

      axios
        .get(`http://localhost:2000/api/auth/profile/${id}`)
        .then((res) => setUser(res.data))
        .catch((err) => console.error("Profile fetch error:", err));
    }
  }, []);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile-container1">
      <Navbar />
      <h2>My Profile</h2>

      <div className="button-group-custom mt-4 mb-4">
        <div className="profile-buttons">
           <button
          onClick={() => setShowProfileModal(true)}
          className="btn btn-primary mb-3"
        >
          {showProfileModal ? "Hide Profile" : "View Your Profile"}
        </button>

        <button onClick={() => setShowModal(true)} className="btn btn-success">
          View Logged Tasks
        </button>
        </div>



        <div className="chart-container-custom">
    <LoginChart />
  </div>
      </div>

      {showProfileModal && (
        <div className="modal-overlay">
          <div className="mini-modal">
            <button
              className="close-btn"
              onClick={() => setShowProfileModal(false)}
            >
              ×
            </button>
            <h4>Your Profile</h4>

            <div className="profile-container3">
              {user.profilePic && (
                <div className="profile-image">
                  <img
                    src={`http://localhost:2000/uploads/${user.profilePic}`}
                    alt="Profile"
                  />
                </div>
              )}
              <div className="profile-info">
                <p>
                  <strong>Name:</strong> {user.name}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Age:</strong> {user.age}
                </p>
                <p>
                  <strong>Gender:</strong> {user.gender}
                </p>
              </div>
            </div>

            {editMode ? (
              <form
                onSubmit={handleUpdate}
                encType="multipart/form-data"
                className="edit-form"
              >
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                />
                <select
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <input
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, profilePic: e.target.files[0] })
                  }
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditMode(false)}>
                  Cancel
                </button>
              </form>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="btn btn-secondary mt-2"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="mini-modal">
            <button className="close-btn" onClick={() => setShowModal(false)}>
              ×
            </button>
            <h4>Your Logged Routines</h4>
            <div className="task-list-scroll">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="task-box"
                  onClick={() =>
                    setExpandedTaskId(
                      expandedTaskId === task._id ? null : task._id
                    )
                  }
                >
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(task.createdAt).toLocaleDateString()}
                  </p>
                  {expandedTaskId === task._id && (
                    <p>
                      <strong>Routine:</strong> {task.task}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="goals">
         <div className="steps-goal">
        <StepsGoal/>
      </div>
        <div className="water-goals">
          <DrinkWater/>
        </div>
      </div>
    </div>
  );
};

export default Profile;
