import React, { useState } from 'react';
//import { BrowserRouter, useLocation } from 'react-router-dom';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MemberList from './components/MemberList';
import ProfileView from './components/ProfileView';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MemberCard from './pages/MemberCard';
import Groups from './pages/Groups';
import Photos from './pages/Photos';
import Register from './pages/Register';

import SignIn from './pages/Login';
//import ChatPage from './components/ChatPage'; 

function App() {
  // const location = useLocation();
  // const hideNavbarRoutes = ['/signin', '/register'];
  // const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);


   const [user, setUser] = useState(null);
  return (
   
    <Router>
       <Navbar user={user} setUser={setUser} />
       {/* {!shouldHideNavbar && <Navbar />} */}

      <Routes>
                
                <Route path="/" element={<SignIn setUser={setUser} />} />
                <Route path="/home" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/member" element={<MemberCard />} />
                <Route path="/groups" element={<Groups />} />
                <Route path="/photos" element={<Photos />} />
        <Route path="/memberlist" element={<MemberList />} />
        <Route path="/profile/:id" element={<ProfileView />} />
        
      </Routes>
    </Router>
    
  );
}

export default App;


