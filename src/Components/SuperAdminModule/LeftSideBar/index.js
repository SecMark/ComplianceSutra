import React, { useState, useEffect } from "react";
import sideBarlogo from "../../../assets/Icons/sideBarlogo.png";
import DashboardIcon from "../../../assets/Icons/DashboardIcon.png";
import ListIcon2 from "../../../assets/Icons/ListIcon2.png";
import ContactIcon from "../../../assets/Icons/ContactIcon.png";
import UserIcon from "../../../assets/Icons/UserIcon.png";
import BadgeIcon from "../../../assets/Icons/BadgeIcon.png";
import PaymentIcon from "../../../assets/Icons/PaymentIcon.png";
import SideBaruser from "../../../assets/Icons/sideBaruser.png";
import notificationActive from "../../../assets/ERIcons/notifications_black.png";
import { useHistory, useLocation, withRouter } from "react-router-dom";

import "./style.css";

const LeftSideBar = () => {
  const history = useHistory();
  const { pathname } = useLocation();

  const navigateTo = (screen) => {
    history.push(`/super-admin/${screen}`);
  };

  return (
    <div className="side-bar">
      <div className="left-bar">
        <div className="logo">
          <img
            src={sideBarlogo}
            alt="sideBarlogo"
            style={{ marginRight: "5px" }}
          />
        </div>
        <div className="first-icon-list">
          <div className="taskIcon">
            <img
              style={{ cursor: "pointer", width: "18px" }}
              title="Dashboard"
              src={DashboardIcon}
              alt="sidebar Active"
              onClick={() => navigateTo("dashboard")}
            />
          </div>
          <div className="taskIcon">
            <img
              style={{ cursor: "pointer", width: "18px" }}
              title="Tasks"
              src={ListIcon2}
              alt="sidebar Active"
            />
          </div>
          <div className="taskIcon">
            <img
              style={{ cursor: "pointer", width: "18px" }}
              title="Tasks"
              src={ContactIcon}
              alt="sidebar Active"
            />
          </div>
          <div className={"taskIcon"}>
            <img
              style={{ cursor: "pointer", width: "18px" }}
              title="Notification"
              alt="Notification"
              src={notificationActive}
              onClick={() => navigateTo("notifications")}
            />
          </div>
          <div className="devider-line devider-line-set"></div>
          <div className="second-icon-list">
            <div className="taskIcon">
              <img
                style={{ cursor: "pointer", width: "18px" }}
                title="Tasks"
                src={UserIcon}
                alt="sidebar Active"
              />
            </div>
            <div className="taskIcon">
              <img
                style={{ cursor: "pointer", width: "18px" }}
                title="License"
                src={BadgeIcon}
                alt="sidebar Active"
                onClick={() => navigateTo("license-management")}
              />
            </div>
            <div className="taskIcon">
              <img
                style={{ cursor: "pointer", width: "18px" }}
                title="License"
                src={PaymentIcon}
                alt="sidebar Active"
                onClick={() => navigateTo("payment-management")}
              />
            </div>

            <div className="taskIcon">
              <img
                style={{ cursor: "pointer", width: "18px" }}
                title="Dashboard"
                src={DashboardIcon}
                alt="sidebar Active"
              />
            </div>

            <div className="taskIcon mt-8">
              <img
                style={{ cursor: "pointer" }}
                title="Profile"
                src={SideBaruser}
                alt="sidbar User"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(LeftSideBar);
