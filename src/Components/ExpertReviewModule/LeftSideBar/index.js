import React, { useState, useEffect } from "react";
import sideBarlogo from "../../../assets/Icons/sideBarlogo.png";
import checkSmall from "../../../assets/ERIcons/checkSmall.png";
import notificationActive from "../../../assets/ERIcons/notifications_black.png";
import historyActive from "../../../assets/ERIcons/history_black.png";
import profileActive from "../../../assets/ERIcons/profileActive.png"
import { useHistory, useLocation, withRouter } from "react-router-dom";

import "./style.css";

const LeftSideBar = () => {
  const history = useHistory();
  const { pathname } = useLocation();

  const navigateTo = (screen) => {
    history.push(`/expert-review/${screen}`);
  };

  return (
    <div className="side-bar">
      <div className="ER-left-bar">
        <div className="logo">
          <img src={sideBarlogo} alt="sideBarlogo" />
        </div>
        <div
          className={
            pathname === "/expert-review/dashboard"
              ? "dashboard-icon-active"
              : "dashboard-icon"
          }
        >
          <img
            title="Dashboard"
            src={checkSmall}
            onClick={() => navigateTo("dashboard")}
          />
        </div>
        <div
          className={
            pathname === "/expert-review/notifications"
              ? "ER-icone-active"
              : "ER-icone"
          }
        >
          <img title="Notification"
           src={notificationActive}
           onClick={()=> navigateTo("notifications")}
           />
        </div>
        <div
          className={
            pathname === "/expert-review/task-history"
              ? "ER-icon-active"
              : "ER-icon"
          }
        >
          <img
            title="Task History"
            src={historyActive}
            onClick={() => navigateTo("task-history")}
          />
        </div>

        <div
          className={
            pathname === "/expert-review/profile"
              ? "profile-icon-active"
              : "profile-icon"
          }
        >
          <img
            title="Profile"
            src={profileActive}
            onClick={() => navigateTo("profile")}
          />
        </div>
      </div>
    </div>
  );
};

export default withRouter(LeftSideBar);
