// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Signin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSignin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/users/signin', {
//         email,
//         password,
//       });

//       // Optional: Save token or user data if needed
//       localStorage.setItem('token', res.data.token);

//       alert('Login successful!');
//       navigate('/home'); // 🚀 Navigate to home page
//     } catch (err) {
//       console.error(err);
//       alert('Login failed. Please check your credentials.');
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h3>Sign In</h3>
//       <form onSubmit={handleSignin}>
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
//         <button className="btn btn-primary" type="submit">
//           Sign In
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Signin;



import React, { useState , useContext} from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import LoginContext from '../context/context';

const SignIn = ({ setUser }) => {
  const [email, setEmail] = useState('pragati@gmail.com');
  const [password, setPassword] = useState('pragati08');
  const {user,updateUser} = useContext(LoginContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      setUser(res.data);
      console.log("User data:", res.data);
      updateUser({'userId':res.data.id});
      localStorage.setItem('userId', res.data.id);
      localStorage.setItem('name', res.data.fullName);
      localStorage.setItem('token', res.data.token);
      navigate('/home');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div
      className="container d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: '100vh', backgroundColor: '#eef1f8' }}
    >
      {/* Buzznet Title Up and Bigger */}
      <div style={{ marginBottom: '2rem' }}>
        <h1
          style={{
            fontWeight: '800',
            fontSize: '3.5rem',
            color: '#6c5ce7',
            letterSpacing: '1px',
          }}
        >
          Buzznet
        </h1>
      </div>
   
      {/* Card Section */}
      <div
        className="card p-4"
        style={{
          maxWidth: '400px',
          width: '100%',
          borderRadius: '12px',
          border: '1px solid #ced4da',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#ffffff',
        }}
      >
        <h3 className="text-center mb-4" style={{ fontWeight: '600', fontSize: '1.6rem', color: '#2d3436' }}>Login</h3>
        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            className="form-control mb-3"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button className="btn btn-primary w-100" type="submit">
            Sign In
          </button>
        </form>
        <div className="text-center mt-3" style={{ fontSize: '0.9rem' }}>
          Don't have an account?{' '}
          <a href="/register" className="text-decoration-none fw-semibold text-primary">
            Signup
          </a>
        </div>
      </div>
    </div>
  );
  }
  export default SignIn;