import React, { useState } from "react";
import "./Notifications.css";
import Select from "react-select";
import NotificationList from "./NotificationList/NotificationList";
import Popup from "./Notificationpopup/Popup";

const ERNotifications = () => {
  const [read, setRead] = useState(false);

  const ReadAll = () => {
    setRead(true);
  };
  const SelectedFilter = (e) => {
    console.log(e.value);
  };
  const options = [
    { value: "All", label: "All Notifications" },
    { value: "Submitted", label: " New Submitted Tasks" },
    { value: "Rejected", label: "Rejected tasks" },
    { value: "Approved", label: "Approved tasks" },
    { value: "Migration", label: "Migration Requests" },
  ];
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
        <div className="NotificationHeader">
          <h4 className="mt-1">Notifications</h4>
          <div className="NotificationFilter">
            <span className="mt-1">Filter by:</span>
            <span className="mt-2">
              <Select
                options={options}
                styles={customStyles}
                defaultValue={options[0]}
                value={options.value}
                onChange={SelectedFilter}
              />
            </span>
          </div>
          <Popup />
        </div>
        <NotificationList title="Today" />
        <NotificationList title="Yesterday" />
      </div>
    </div>
  );
};
export default ERNotifications;
