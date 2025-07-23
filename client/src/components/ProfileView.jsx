import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProfile } from '../api/api';

const ProfileView = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfile(id).then(data => setProfile(data));
  }, [id]);

  return profile ? (
    <div className="container mt-4 d-flex" style={{ gap: '2rem' }}>
      
      {/* Left: Profile Sidebar */}
      <div style={{ width: '250px', textAlign: 'center' }}>
      {profile.profilePic && (
  <img
    src={profile.profilePic}
    alt="Profile"
    style={{
      width: '120px',
      height: '120px',
      objectFit: 'cover',
      borderRadius: '50%',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      border: '2px solid #ddd',
      marginBottom: '20px'
    }}
  />
)}

        <h4>{profile.username}</h4>
        <p>{profile.email}</p>
      </div>
  
      {/* Right: Detailed Info */}
      <div>
        <h5>About</h5>
        <p><strong>Bio:</strong> {profile.bio}</p>
        <p><strong>Age:</strong> {profile.age}</p>
        <p><strong>Joined:</strong> {new Date(profile.joinedAt).toLocaleDateString()}</p>
        <p><strong>Friends:</strong> {profile.friends?.length || 0}</p>
        <p><strong>Messages:</strong> {profile.messages?.length || 0}</p>
      </div>
  
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default ProfileView;