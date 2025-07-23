import React, { useState } from 'react';
import { addFriend } from '../api/api';
import { useNavigate } from 'react-router-dom';
import MessageBox from '../components/MessageBox';

const MemberCard = ({ member, showFollow }) => {
  const [isFriend, setIsFriend] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFriend = async () => {
    await addFriend(member._id);
    setIsFriend(true);
  };
  const handleSendMessage = () => {
    // Toggle the message box
    setShowMessage((prev) => !prev);
  
    // Optionally, you can scroll into view or log who you’re messaging
    console.log(`Opening chat with: ${member.username}`);
  };
  const loggedInUserId = localStorage.getItem('userId'); //'64ac1f2e31e48e123abc4567';
  return (
    <div className="card p-4 mb-4 shadow-sm d-flex align-items-center gap-4 flex-row" style={{ fontSize: '1.1rem' }}>
      
      {/* 🔹 Profile Picture */}
      {member.profilePic ? (
        <img
          src={member.profilePic}
          alt={`${member.username}'s profile`}
          style={{
            width: '80px',
            height: '80px',
            objectFit: 'cover',
            borderRadius: '50%',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '2px solid #ddd'

          }}
        />
      ) : (
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#ccc'
          }}
        />
      )}
  
      {/* 🔹 Member Info + Buttons */}
      <div className="flex-grow-1">
        <h4 className="mb-3" style={{ fontSize: '1.5rem' }}>{member.username}</h4>
  
        <div className="d-flex flex-wrap gap-3 mb-3">
          <button
            className="btn btn-success btn-lg"
            style={{ minWidth: '140px' }}
            onClick={handleFriend}
          >
            {isFriend ? 'Friend' : 'Add Friend'}
          </button>
  
          <button
            className="btn btn-outline-secondary btn-lg"
            style={{ minWidth: '140px' }}
            onClick={handleSendMessage}
          >
            {showMessage ? 'Close Chat' : 'Send Message'}
          </button>
  
          <button
            className="btn btn-primary btn-lg"
            style={{ minWidth: '140px' }}
            onClick={() => navigate(`/profile/${member._id}`)}
          >
            View Profile
          </button>
        </div>
  
        {showMessage && (
          <MessageBox senderId={loggedInUserId} receiverId={member._id} />
        )}
        {showFollow && (
  <button
    className={`btn ${isFollowing ? 'btn-danger' : 'btn-success'}`}
    onClick={() => setIsFollowing(prev => !prev)}
  >
    {isFollowing ? 'Unfollow' : 'Follow'}
  </button>
)}
      </div>
    </div>
  );
};

export default MemberCard;