import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getMembers = async () => {
  const res = await axios.get(`${API_URL}/members`);
  return res.data;
};

export const getAllRegisteredUsers = async () => {
  const res = await axios.get(
    `${API_URL}/getallusers/${localStorage.getItem("userId")}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res.data;
};

export const addFriend = async (senderid, receiverid, name, status) => {
  const res = await axios.post(`${API_URL}/friends/add`, {
    senderid,
    receiverid,
    name,
    status,
  });
  return res.data;
};

export const createMessage = async (senderId, receiverId, message) => {
  return await axios.post(`${API_URL}/messages/${senderId}`, {
    receiverId,
    message,
  });
};
export const getConversations = async (senderId, receiverId) => {
  return await axios.get(`${API_URL}/conversations/${senderId}/${receiverId}`);
};
export const getProfile = async (id) => {
  const res = await axios.get(`${API_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};
