import React from "react";
import "./style.css";

const ProfileOptions = ({ option, selectProfileOption }) => {
  return (
    <div className="ER-profile-options">
      <div>
        <h3 style={{ margin: "0" }}>Hi Ramesh,</h3>
        <span>rameshkumar@sechmark.in</span>
      </div>
      <div className="options-container">
        <ul className="options-list">
          <li
            onClick={() => selectProfileOption("edit")}
            className={option === "edit" && "active"}
          >
            Edit Profile Details
          </li>
          <li
            onClick={() => selectProfileOption("notification")}
            className={option === "notification" && "active"}
          >
            Manage Notifications
          </li>
          <li
            onClick={() => selectProfileOption("task")}
            className={option === "task" && "active"}
          >
            Task management
          </li>
          <li
            onClick={() => selectProfileOption("security")}
            className={option === "security" && "active"}
          >
            Manage Security
          </li>
          <li
            onClick={() => selectProfileOption("migration")}
            className={option === "migration" && "active"}
          >
            Migration Requests
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileOptions;
