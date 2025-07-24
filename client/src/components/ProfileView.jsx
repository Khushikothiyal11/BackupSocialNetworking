import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfile } from "../api/api";

const ProfileView = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const userId = id || localStorage.getItem("setProfile");
    if (userId) {
      getProfile(userId).then((data) => setProfile(data));
    }
  }, [id]);

  return profile ? (
    <div className="container-fluid min-vh-100 p-4 bg-light">
      <div className="row justify-content-center">
        {/* Sidebar */}
        <div className="col-md-3 text-center mb-4">
          {profile.profilePhoto && (
            <img
              src={profile.profilePhoto}
              alt="Profile"
              className="rounded-circle shadow-sm mb-3"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
          )}
          <h4>{profile.fullName}</h4>
          <p className="text-muted">{profile.email}</p>
        </div>

        {/* Main Content */}
        <div className="col-md-7">
          <div className="card p-4 shadow-sm">
            <h5 className="mb-4">About Me</h5>

            {profile.bio && (
              <p>
                <strong>Bio:</strong> {profile.bio}
              </p>
            )}

            <p>
              <strong>Joined:</strong>{" "}
              {new Date(profile.createdAt).toLocaleDateString()}
            </p>

            {profile.posts?.length >= 0 && (
              <p>
                <strong>Posts:</strong> {profile.posts.length}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <span className="spinner-border text-primary"></span>
    </div>
  );
};

export default ProfileView;
