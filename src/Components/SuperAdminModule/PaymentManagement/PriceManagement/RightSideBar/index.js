import React from "react";
import "./style.css";
import { useDispatch } from "react-redux";

const RightSideBar = ({ option, selectProfileOption }) => {
  const dispatch = useDispatch();

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
            Compliance Module
          </li>
          <li
            onClick={() => selectProfileOption("notification")}
            className={option === "notification" && "active"}
          >
            Audit Module
          </li>
          <li
            onClick={() => selectProfileOption("task")}
            className={option === "task" && "active"}
          >
            Process Module
          </li>
          <li></li>
        </ul>
        <hr />
        <ul className="options-list">
          <li
            onClick={() => selectProfileOption("security")}
            className={option === "security" && "active"}
          >
            Discount & coupons
          </li>
          <li
            onClick={() => selectProfileOption("migration")}
            className={option === "migration" && "active"}
          >
            Referrals
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RightSideBar;
