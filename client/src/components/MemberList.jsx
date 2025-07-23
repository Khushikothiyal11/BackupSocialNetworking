import React, { useEffect, useState } from 'react';
import MemberCard from '../pages/MemberCard';
import { getMembers } from '../api/api';

const MemberList = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    getMembers()
      .then(data => {
        console.log('Fetched members:', data);
        setMembers(data);
      })
      .catch(err => {
        console.error('Frontend Axios error:', err.response?.data || err.message);
      });
  }, []);
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Members</h2>
      <div className="row">
        {members.length > 0 ? (
          members.map(member => (
            <div className="col-12" key={member._id}>
              <MemberCard member={member} />
            </div>
          ))
        ) : (
          <p>No members found or still loading...</p>
        )}
      </div>
    </div>
  );
};

export default MemberList;