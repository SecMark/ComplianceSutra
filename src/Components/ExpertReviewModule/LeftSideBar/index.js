import React, { useState, useEffect } from "react";
import sideBarlogo from "../../../assets/Icons/sideBarlogo.png";
import checkActive from "../../../assets/ERIcons/check_circle_black.png";
import notificationActive from "../../../assets/ERIcons/notifications_black.png";
import historyActive from "../../../assets/ERIcons/history_black.png";
import { withRouter } from "react-router-dom";

import "./style.css";

const LeftSideBar = () => {
  return (
    <div className="side-bar">
      <div className="ER-left-bar">
        <div className="logo">
          <img src={sideBarlogo} alt="sideBarlogo" />
        </div>
        <div className="dashboard-icon-active">
          <img title="Dashboard" src={checkActive} />
        </div>
        <div className="ER-icon">
          <img title="Notification" src={notificationActive} />
        </div>
        <div className="ER-icon">
          <img title="Dashboard" src={historyActive} />
        </div>

        <div className="profile-icon">
          <img title="Dashboard" src={historyActive} />
        </div>
      </div>
    </div>
  );
};

export default withRouter(LeftSideBar);
