// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
  console.log("Navbar user:", user);
  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.removeItem("token"); // Clear JWT or session
    localStorage.removeItem("userId"); // Optional: remove user ID if stored
    navigate("/"); // Redirect to Signin page
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
        <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
  <img
    src="/img/cglogo.png"
    alt="Capgemini Logo"
    style={{ height: "40px", marginRight: "8px" }}
  />
  {/* <span style={{ fontWeight: "bold", fontSize: "1.25rem" }}></span> */}
</Link>
          <span className="navbar-text text-primary ml-2">
          <b style={{ fontSize: "2rem", fontWeight: "bold" }}>BUZZNET</b>  ~ Social Networking for Everyone
          </span>
          <button className="btn btn-danger btn-sm" onClick={handleSignout}>
   Sign Out
</button>
        </div>
      </nav>

      {/* Menu Bar */}
      <nav className="menu-bar bg-primary text-dark">
        <ul className="nav justify-content-center py-2">
          <li className="nav-item">
            <Link className="nav-link active text-light" to="/home">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/memberlist">Members</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/groups">Groups</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/photos">Photos</Link>
          </li>
          <li className="nav-item">
           <Link className="nav-link text-light" to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
