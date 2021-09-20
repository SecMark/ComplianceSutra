import React from "react";

import "./Notifications.css";

import NotificationList from "./NotificationList/NotificationList";

const ERNotifications = () => {
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
    option: () => ({
      color: "black",
      padding: "10px",
      borderBottom: "1px solid #e4e4e4",
      "&:hover": {
        backgroundColor: "#f7f4fe",
      },
    }),
    singleValueLabel: () => ({
      backgroundColor: "white",
      padding: 2,
      margin: 2,
      borderRadius: 8,
      color: "black",
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
      backgroundColor: "#e4e4e45c",
      display: "flex",
      borderRadius: 7,
      color: "black",
      fontWeight: "500",
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
