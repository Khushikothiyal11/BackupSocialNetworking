import React from "react";
import GroupList from "../components/groups/GroupList";
import "bootstrap/dist/css/bootstrap.min.css";

const GroupPage = () => {
  return (
    <div className="container py-4">
      <div className="d-flex justify-content-center mb-4">
        <h2 className="fw-bold text-primary border-bottom pb-2">
          🌟 Our Awesome Groups
        </h2>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <GroupList />
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
