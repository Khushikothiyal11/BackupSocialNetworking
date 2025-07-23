import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getMembers = async () => {
  const res = await axios.get(`${API_URL}/members`);
  return res.data;
};

export const addFriend = async (id) => {
  await axios.post(`${API_URL}/add-friend`, { id });
};

export const createMessage = async (senderId, receiverId, message) => {
    return await axios.post(`${API_URL}/messages/${senderId}`, {
      receiverId,
      message
    });
  };
  export const getConversations = async (senderId, receiverId) => {
    return await axios.get(`${API_URL}/conversations/${senderId}/${receiverId}`);
  };
export const getProfile = async (id) => {
  const res = await axios.get(`${API_URL}/profile/${id}`);
  return res.data;
};