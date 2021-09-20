import React, { useState } from "react";
import "./style.css";
import ReactFlagsSelect from "react-flags-select";

const LeftSideBar = ({ option, selectProfileOption }) => {
  const [selected, setSelected] = useState("IN");

  return (
    <div className="container">
      <h4 style={{ margin: "0" }}>Price Managment</h4>
      <div className="mt-4">
        <ReactFlagsSelect
          selected={selected}
          searchable={true}
          animate={true}
          searchPlaceholder="Search countries"
          onSelect={(code) => setSelected(code)}
        />
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
          <div className="divider" />
          <li
            onClick={() => selectProfileOption("security")}
            className={option === "security" && "active"}
          >
            Discounts & Coupons
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

export default LeftSideBar;
