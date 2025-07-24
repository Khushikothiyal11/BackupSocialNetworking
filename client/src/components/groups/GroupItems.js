import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const GroupItem = ({ group }) => {
  const [joined, setJoined] = useState(false);

  const handleJoinClick = () => {
    setJoined(!joined);
  };

  return (
    <div className="d-flex justify-content-center my-4">
      <div
        className="card border-0 shadow-lg rounded-4 px-4 py-3 bg-white"
        style={{ maxWidth: "600px", width: "100%" }}
      >
        <div className="d-flex align-items-center">
          <img
            src="/sm3.avif" // Replace with your icon
            alt="Group Icon"
            width="60"
            height="60"
            className="me-4 rounded-circle border"
          />
          <div className="flex-grow-1">
            <h5 className="mb-1 fw-semibold text-dark">{group.name}</h5>
            <p className="mb-3 text-secondary small">{group.description}</p>
            <button
              className={`btn btn-sm px-3 ${
                joined ? "btn-outline-success" : "btn-primary"
              }`}
              onClick={handleJoinClick}
            >
              {joined ? "Joined" : "Join Group"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupItem;
