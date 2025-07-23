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



import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      setUser(res.data.user);
      localStorage.setItem('userId', res.data.id);
      localStorage.setItem('token', res.data.token);
      navigate('/home');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="container mt-5">
      <h3>Sign In</h3>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="form-control mb-2" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="btn btn-primary" type="submit">Sign In</button>
      </form>
      <br />
      <span>Don't have an account ?<a href='/Register'>Register</a></span>
    </div>
  );
};

export default SignIn;
