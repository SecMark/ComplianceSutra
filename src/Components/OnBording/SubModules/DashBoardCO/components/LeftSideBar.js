import React, { useState } from "react";
import MobileLeftSidebar from "../components/MobileLeftSidebar/index";
import "./style.css";
// import SideBarBg from "../../../../assets/Images/Onboarding/side-bar-bg.png";
import sideBarlogo from "../../../../../assets/Icons/sideBarlogo.png";
import SideBaruser from "../../../../../assets/Icons/sideBaruser.png";
import dashboardBlackActive from "../../../../../assets/Icons/dashboard_black.png";
import dashboardGreyActive from "../../../../../assets/Icons/dashboard_grey.png";
import taskIcon from "../../../../../assets/Icons/taskIcon.png";
import btnicon from "../../../../../assets/Icons/btn-icon.png";
import siderBarbtnArrow from "../../../../../assets/Icons/siderBarbtnArrow.png";
import actionArrow from "../../../../../assets/Icons/actionArrow.png";
import complteTaskIcon from "../../../../../assets/Icons/complteTaskIcon.png";
import inprogressicon from "../../../../../assets/Icons/inprogressicon.png";
import scheduledIcon from "../../../../../assets/Icons/scheduledIcon.png";
import siderBarbtnArrowTop from "../../../../../assets/Icons/siderBarbtnArrowTop.png";
import sidebarDownArrow from "../../../../../assets/Icons/sidebarDownArrow.png";
import keyboardArrowRightBlack from "../../../../../assets/Icons/keyboardArrowRightBlack.png";
import sidebarCheckIcon from "../../../../../assets/Icons/sidebarCheckIcon.png";
import completeTaskIcon from "../../../../../assets/Icons/emailVerify.png";
import downArrow from "../../../../../assets/Icons/downArrow.png";
import sidebarActive from "../../../../../assets/Icons/sidebar-active.png";
import sidebarRightActive from "../../../../../assets/Icons/task_alt_black_24dp (1).png";
import sidebarBell from "../../../../../assets/Icons/sidebarBell.png";
import sidebarBellActive from "../../../../../assets/Icons/bellSelected.png";
import settingActive from "../../../../../assets/Icons/activeSetting.png";
import userActive from "../../../../../assets/Icons/dropdownUser.png";

import sidebarSettingIcon from "../../../../../assets/Icons/sidebarSettingIcon.png";
import sidbarUserNav from "../../../../../assets/Icons/sidbarUserNav.png";
import editpen from "../../../../../assets/Icons/editpen.png";
import LogoutIcon from "../../../../../assets/Icons/LogoutIcon.png";
import sidebarAccountCircle from "../../../../../assets/Icons/sidebarAccountCircle.png";
import moment from "moment";
import { useOuterClick } from "../components/RightSideGrid/outerClick";
import { useSelector, useDispatch } from "react-redux";
import { actions as loginActions } from "../../../../Authectication/redux/actions";
import { withRouter } from "react-router-dom";
import { actions as adminMenuActions } from "../MenuRedux/actions";
import { isMobile } from "react-device-detect";
function LeftSideBar({ history, isTaskListOpen, setIsTaskListOpen }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [openProfile, setOpenProfile] = useState(false);
  const openProfileRef = useOuterClick((e) => {
    if (openProfile === true) {
      setOpenProfile(false);
    }
  });

  const closeMobileSidebar = () => {
    const drawerParent = document.getElementById("sideBarParent");
    const drawerChild = document.getElementById("sideBarChild");
    if (drawerParent) {
      drawerParent.classList.remove("overlay");
      drawerChild.style.left = "-100%";
    }
  };

  const onLogoutClick = () => {
    dispatch(adminMenuActions.setCurrentMenu("taskList"));
    dispatch(loginActions.createLogoutAction());
    history.push("/login");
  };

  const onMenuClick = (currentActiveMenu) => {
    dispatch(adminMenuActions.setCurrentMenu(currentActiveMenu));
    if (currentActiveMenu === "taskList") {
      history.push("/dashboard");
      if (isTaskListOpen) {
        setIsTaskListOpen(false);
      }
    } else if (currentActiveMenu === "notfications") {
      history.push("/notifications");
    } else if (currentActiveMenu === "settings") {
      history.push("/settings");
    } else if (currentActiveMenu === "complianceHistory") {
      history.push("/compliance-history");
    }
  };

  const onEditProfileClick = () => {
    dispatch(adminMenuActions.setCurrentMenu("settings"));
    dispatch(adminMenuActions.setActiveTabInSetting("personal"));
    setOpenProfile(false);
    history.push("/settings");
  };

  return (
    <div className="side-bar">
      <div className="left-bar">
        <div className="logo">
          <img src={sideBarlogo} alt="sideBarlogo" />
        </div>
        <div className="first-icon-list">
          <div
            className={
              !openProfile &&
              state &&
              state.adminMenu.currentMenu === "complianceHistory"
                ? "taskIcon-active"
                : "taskIcon"
            }
          >
            <img
              style={{ cursor: "pointer" }}
              title="Tasks"
              onClick={() => onMenuClick("complianceHistory")}
              src={
                !openProfile &&
                state &&
                state.adminMenu.currentMenu === "complianceHistory"
                  ? dashboardBlackActive
                  : dashboardGreyActive
              }
              alt="sidebar Active"
            />
          </div>
          <div
            className={
              !openProfile &&
              state &&
              state.adminMenu.currentMenu === "taskList"
                ? "taskIcon-active"
                : "taskIcon"
            }
          >
            <img
              style={{ cursor: "pointer" }}
              title="Tasks"
              onClick={() => onMenuClick("taskList")}
              src={
                !openProfile &&
                state &&
                state.adminMenu.currentMenu === "taskList"
                  ? sidebarActive
                  : sidebarRightActive
              }
              alt="sidebar Active"
            />
          </div>
          <div
            className={
              !openProfile &&
              state &&
              state.adminMenu.currentMenu === "notfications"
                ? "taskIcon-active"
                : "taskIcon"
            }
          >
            <img
              style={{ cursor: "pointer" }}
              title="Notfications"
              onClick={() => onMenuClick("notfications")}
              src={
                !openProfile &&
                state &&
                state.adminMenu.currentMenu === "notfications"
                  ? sidebarBellActive
                  : sidebarBell
              }
              alt="sidebar Bell"
            />
          </div>
        </div>
        <div className="devider-line"></div>
        <div className="second-icon-list">
          <div
            className={
              !openProfile &&
              state &&
              state.adminMenu.currentMenu === "settings"
                ? "taskIcon-active"
                : "taskIcon"
            }
          >
            <img
              style={{ cursor: "pointer" }}
              title="Settings"
              onClick={() => onMenuClick("settings")}
              src={
                !openProfile &&
                state &&
                state.adminMenu.currentMenu === "settings"
                  ? settingActive
                  : sidebarSettingIcon
              }
              alt="sidebar Setting Icon"
            />
          </div>
          <div className={openProfile ? "taskIcon-active" : "taskIcon"}>
            <img
              style={{ cursor: "pointer" }}
              title="Profile"
              onClick={() => setOpenProfile(true)}
              src={openProfile ? userActive : SideBaruser}
              alt="sidbar User"
            />
            {openProfile && (
              <div ref={openProfileRef} className="edit-link">
                <div className="edit-option-box">
                  <div
                    onClick={() => onEditProfileClick()}
                    style={{ cursor: "pointer" }}
                    className="edit-label-option"
                  >
                    <img src={editpen} alt="edit" /> Edit Profile
                  </div>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => onLogoutClick()}
                    className="logout-label-option border-0"
                  >
                    <img src={LogoutIcon} alt="logout Icon" /> Logout
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* <div className="taskIcon">
            <img src={taskIcon} alt="taskIcon" />
          </div> */}
        </div>
        {/* <div className="user">
          <img src={SideBaruser} alt="SideBaruser" />
        </div> */}
      </div>
    </div>
  );
}

export default withRouter(LeftSideBar);
