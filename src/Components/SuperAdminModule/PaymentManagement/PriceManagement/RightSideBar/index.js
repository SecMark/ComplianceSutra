import React from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import { createHashHistory } from "history";

const RightSideBar = ({ option, selectProfileOption }) => {
  const dispatch = useDispatch();
  const history = createHashHistory();

  return (
    <div className="PriceManagement-profile-options">
      <div>
        <h3 style={{ margin: "0" }}>Price Managment</h3>
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

export default RightSideBar;
