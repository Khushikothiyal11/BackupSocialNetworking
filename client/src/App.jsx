import React, { useState } from "react";
//import { BrowserRouter, useLocation } from 'react-router-dom';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MemberList from "./components/MemberList";
import ProfileView from "./components/ProfileView";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MemberCard from "./pages/MemberCard";
import Groups from "./pages/Groups";
import Photos from "./pages/Photos";
import Register from "./pages/Register";
import LoginContext from "./context/context";
import SignIn from "./pages/Login";
import GroupPage from "./pages/GroupPages";
import PhotoGallery from "./components/PhotoGallery";
//import ChatPage from './components/ChatPage';

function App() {
  // const location = useLocation();
  // const hideNavbarRoutes = ['/signin', '/register'];
  // const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  const [user, setUser] = useState(null);
  const [luser, setLogin] = useState(null);
  return (
    <LoginContext.Provider value={{ luser, updateUser: setLogin }}>
      <Router>
        {luser === null ? "" : <Navbar user={user} setUser={setUser} />}

        {/* {!shouldHideNavbar && <Navbar />} */}

        <Routes>
          <Route path="/" element={<SignIn setUser={setUser} />} />
          <Route path="/home" element={<Home currentUser={user} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/member" element={<MemberCard />} />
          <Route path="/groups" element={<GroupPage />} />
          <Route path="/photos" element={<PhotoGallery />} />
          <Route path="/memberlist" element={<MemberList />} />
          <Route path="/profile/:id" element={<ProfileView />} />
          <Route path="/profile" element={<ProfileView />} />
        </Routes>
      </Router>
    </LoginContext.Provider>
  );
}

export default App;
