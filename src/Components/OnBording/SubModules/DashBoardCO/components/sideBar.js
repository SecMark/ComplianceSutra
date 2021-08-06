import React from "react";
import "./style.css";
import sideBarlogo from "../../../../../assets/Icons/sideBarlogo.png";
import SideBaruser from "../../../../../assets/Icons/sideBaruser.png";

import sidebarActive from "../../../../../assets/Icons/sidebar-active.png";
import sidebarBell from "../../../../../assets/Icons/sidebarBell.png";
import sidebarSettingIcon from "../../../../../assets/Icons/sidebarSettingIcon.png";
import sidebarAccountCircle from "../../../../../assets/Icons/sidebarAccountCircle.png";

function SideBarCo({
  isTaskListOpen,
  isTaskApproved,
  setIsTaskApproved,
  taskList,
}) {
  return (
    <div className="side-bar">
      <div className="left-bar">
        <div className="logo">
          <img src={sideBarlogo} alt="sideBarlogo" />
        </div>
        <div className="first-icon-list">
          <div className="taskIcon-active">
            <img src={sidebarActive} alt="taskIcon" />
          </div>
          <div className="taskIcon">
            <img src={sidebarBell} alt="sidebar Bell" />
          </div>
        </div>
        <div className="devider-line"></div>
        <div className="second-icon-list">
          <div className="taskIcon">
            <img src={sidebarSettingIcon} alt="taskIcon" />
          </div>
          <div className="taskIcon">
            <img src={sidebarAccountCircle} alt="sidebar Account Circle" />
          </div>
        </div>
        <div className="user">
          <img src={SideBaruser} alt="SideBaruser" />
        </div>
      </div>
    </div>
  );
}

export default SideBarCo;
