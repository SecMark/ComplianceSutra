import React, { useState } from "react";

import "./Notifications.css";
import Select from "react-select";
import NotificationList from "./NotificationList/NotificationList";
import Popup from "./NotificationPopup/Popup";

const ERNotifications = () => {
  const SelectedFilter = (e) => {
    console.log(e.value);
  };

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      width: 200,

      color: "black",
    }),
    menuList: (provided) => ({
      ...provided,
      backgroundColor: "white",
      color: "black",
    }),

    container: (provided) => ({
      ...provided,
      width: 200,
      margin: "-8px 8px",
    }),
    dropdownIndicator: () => ({
      color: "black",
      paddingRight: 4,
    }),

    singleValueLabel: () => ({
      backgroundColor: "white",
      padding: 2,
      margin: 2,
      borderRadius: 8,
    }),
    singleValue: () => ({
      border: "none",
      color: "black",
      fontSize: "85%",
      display: "flex",
    }),
    indicatorSeparator: () => ({
      backgroundColor: "#f7f4fe",
    }),
    control: () => ({
      backgroundColor: "#e4e4e4",
      display: "flex",
      borderRadius: 7,
    }),
  };
  return (
    <div>
      <div className="NotificationMain">
        <NotificationList customStyles={customStyles} />
      </div>
    </div>
  );
};
export default ERNotifications;
