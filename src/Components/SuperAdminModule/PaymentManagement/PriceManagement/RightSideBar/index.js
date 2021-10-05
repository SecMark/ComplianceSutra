import React, { useState } from "react";
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
            onClick={() => selectProfileOption("complianceModule")}
            className={option === "complianceModule" && "active"}
          >
            Compliance Module
          </li>
          <li
            onClick={() => selectProfileOption("auditModule")}
            className={option === "auditModule" && "active"}
          >
            Audit Module
          </li>
          <li
            onClick={() => selectProfileOption("processModule")}
            className={option === "processModule" && "active"}
          >
            Process Module
          </li>
          <li></li>
        </ul>
        <hr />
        <ul className="options-list">
          <li
            onClick={() => selectProfileOption("discount")}
            className={option === "discount" && "active"}
          >
            Discount & coupons
          </li>
          <li
            onClick={() => selectProfileOption("referrals")}
            className={option === "referrals" && "active"}
          >
            Referrals
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RightSideBar;
