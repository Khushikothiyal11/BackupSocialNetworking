// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setconfirmPassword] = useState("");
//   const [fullName, setfullName] = useState("");
//   const [profilePhoto, setProfilePhoto] = useState(null);
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         "http://localhost:5000/api/users/register",
//         {
//           fullName,
//           email,
//           password,

//           confirmPassword,
//           profilePhoto,
//         },
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       alert("Registration successful! Please sign in.");
//       navigate("/");
//     } catch (err) {
//       console.error(err);
//       alert("Registration failed. Please try again.");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h3>Register</h3>
//       <form onSubmit={handleRegister}>
//         <input
//           className="form-control mb-2"
//           type="text"
//           placeholder="Full Name"
//           value={fullName}
//           onChange={(e) => setfullName(e.target.value)}
//           required
//         />
//         <input
//           className="form-control mb-2"
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           className="form-control mb-2"
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <input
//           className="form-control mb-2"
//           type="password"
//           placeholder="confirmPassword"
//           value={confirmPassword}
//           onChange={(e) => setconfirmPassword(e.target.value)}
//           required
//         />
//         <input
//           className="form-control mb-2"
//           type="file"
//           accept="image/*"
//           onChange={(e) => e.target.files[0]}
//         />

//         <button className="btn btn-success" type="submit">
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    if (profilePhoto) formData.append("profilePhoto", profilePhoto);

    try {
      await axios.post("http://localhost:5000/api/users/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Registration successful! Please sign in.");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(" Registration failed. Please try again.");
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0f7fa, #fce4ec)",
      }}
    >
      <div
        className="card p-4 shadow-lg rounded"
        style={{ width: "100%", maxWidth: "500px", backgroundColor: "#ffffff" }}
      >
        <h2 className="mb-4 text-center text-primary fw-bold">
          Join the Community 🚀
        </h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label text-secondary">Full Name</label>
            <input
              className="form-control border-info"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-secondary">Email</label>
            <input
              className="form-control border-info"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-secondary">Password</label>
            <input
              className="form-control border-info"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-secondary">
              Confirm Password
            </label>
            <input
              className="form-control border-info"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-secondary">Profile Photo</label>
            <input
              className="form-control border-info"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <button className="btn btn-gradient w-100 fw-bold" type="submit">
            Create Account
          </button>
        </form>
      </div>

      {/* Custom button gradient style */}
      <style>
        {`
          .btn-gradient {
            background-image: linear-gradient(to right, #4fc3f7, #81d4fa);
            color: white;
            border: none;
          }
          .btn-gradient:hover {
            background-image: linear-gradient(to right, #29b6f6, #4dd0e1);
          }
        `}
      </style>
    </div>
  );
};

export default Register;
