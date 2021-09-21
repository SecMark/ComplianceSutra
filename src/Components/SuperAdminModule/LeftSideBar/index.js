import React, { useState, useEffect } from "react";
import sideBarlogo from "../../../assets/Icons/sideBarlogo.png";
import DashboardIcon from "../../../assets/Icons/DashboardIcon.png";
import DashboardActiveIcon from "../../../assets/Icons/dashBoardActiveIcon.png";
import Notification from "../../../assets/ERIcons/notifications_black.png";
import NotificationActive from "../../../assets/ERIcons/notificationBlack.png";
import ListIcon2 from "../../../assets/Icons/ListIcon2.png";
import ContactIcon from "../../../assets/Icons/ContactIcon.png";
import UserIcon from "../../../assets/Icons/UserIcon.png";
import BadgeIcon from "../../../assets/Icons/BadgeIcon.png";
import PaymentIcon from "../../../assets/Icons/PaymentIcon.png";
import SideBaruser from "../../../assets/Icons/sideBaruser.png";
import { useHistory, useLocation, withRouter } from "react-router-dom";

import "./style.css";

const LeftSideBar = () => {
  const history = useHistory();
  const { pathname } = useLocation();

  console.log(pathname?.substring(pathname?.lastIndexOf("/") + 1));

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
              src={
                pathname.substring(pathname.lastIndexOf("/") + 1) ===
                "dashboard"
                  ? DashboardActiveIcon
                  : DashboardIcon
              }
              alt="Dashboard"
              onClick={() => navigateTo("dashboard")}
            />
          </div>
          <div className="taskIcon">
            <img
              style={{ cursor: "pointer", width: "18px" }}
              title="Tasks"
              src={ListIcon2}
              alt="taskIcon"
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
              src={
                pathname.substring(pathname.lastIndexOf("/") + 1) ===
                "notifications"
                  ? NotificationActive
                  : Notification
              }
              alt="Notification"
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
                onClick={() => navigateTo("user-management")}
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
                src={
                  pathname.substring(pathname.lastIndexOf("/") + 1) ===
                  "payment-management"
                    ? PaymentIcon
                    : PaymentIcon
                }
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
