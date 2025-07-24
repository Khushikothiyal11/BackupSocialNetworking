import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const FriendList = () => {
  const [friends, setFriends] = useState([]);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Fetch all friends
  const fetchFriends = () => {
    axios
      .get("http://localhost:5000/api/friends")
      .then((res) => setFriends(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  // Add a new friend
  const handleAddFriend = () => {
    axios
      .post("http://localhost:5000/api/friends/add", {
        name,
        profileImage: imageUrl || undefined,
      })
      .then(() => {
        setName("");
        setImageUrl("");
        fetchFriends();
      })
      .catch((err) => console.error(err));
  };

  // Delete a friend
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/friends/${id}`)
      .then(() => fetchFriends())
      .catch((err) => console.error(err));
  };

  return (
    <div className="container mt-5">
      <h2>My Friends</h2>

      {/* Add Friend Form */}
      <div className="row mt-4 mb-5">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Friend's Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Profile Image URL (optional)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary w-100" onClick={handleAddFriend}>
            Add Friend
          </button>
        </div>
      </div>

      {/* Friend Cards */}
      <div className="row">
        {friends.map((friend) => (
          <div className="col-md-4" key={friend._id}>
            <div className="card mb-4 shadow-sm">
              <img
                src={friend.profileImage}
                alt={friend.name}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{friend.name}</h5>
                <p className="card-text text-muted">
                  Added on: {new Date(friend.createdAt).toLocaleDateString()}
                </p>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(friend._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendList;
