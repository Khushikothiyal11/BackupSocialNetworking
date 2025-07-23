import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [fullName, setfullName] = useState('');
  const navigate = useNavigate();
 
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/register', {
        fullName,
        email,
        password,
        confirmPassword,
      });
      alert('Registration successful! Please sign in.');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Registration failed. Please try again.');
    }
  };
 
  return (
    <div className="container mt-5">
      <h3>Register</h3>
      <form onSubmit={handleRegister}>
        <input
          className="form-control mb-2"
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setfullName(e.target.value)}
          required
        />
        <input
          className="form-control mb-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="form-control mb-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
         <input
          className="form-control mb-2"
          type="password"
          placeholder="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setconfirmPassword(e.target.value)}
          required
        />
        <button className="btn btn-success" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};
 
export default Register;