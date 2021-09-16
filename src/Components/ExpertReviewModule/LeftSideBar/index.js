import React, { useState, useEffect } from "react";
import sideBarlogo from "../../../assets/Icons/sideBarlogo.png";
import history_active from "../../../assets/ERIcons/history_active.png";
import profileActive from "../../../assets/ERIcons/profileActive.png";
import { useHistory, useLocation, withRouter } from "react-router-dom";
import checkSmallBlack from "../../../assets/ERIcons/checkSmallBlack.png";
import notificationBlack from "../../../assets/ERIcons/notificationBlack.png";

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
          <img
            src={sideBarlogo}
            alt="sideBarlogo"
            style={{ marginRight: "5px" }}
          />
        </div>
        <div
          className={
            pathname === "/expert-review/dashboard" ||
            pathname === "/expert-review/"
              ? "dashboard-icon-active"
              : "dashboard-icon"
          }
        >
          <div className="image">
            <img
              title="Dashboard"
              src={checkSmallBlack}
              onClick={() => navigateTo("dashboard")}
            />
          </div>
        </div>

        <div
          className={
            pathname === "/expert-review/notifications"
              ? "ER-icone-active"
              : "ER-icone"
          }
        >
          <img
            title="Notification"
            src={notificationBlack}
            onClick={() => navigateTo("notifications")}
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
            src={history_active}
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
