import React, { useState } from "react";
import "./style.css";

import sideBarlogo from "../../../assets/Icons/sideBarlogo.png";
import SideBaruser from "../../../assets/Icons/sideBaruser.png";

import sidebarActive from "../../../assets/Icons/sidebar-active.png";
import sidebarRightActive from "../../../assets/Icons/task_alt_black_24dp (1).png";
import dashboardBlackActive from "../../../assets/Icons/dashboard_black.png";
import dashboardGreyActive from "../../../assets/Icons/dashboard_grey.png";
import updateActive from "../../../assets/Icons/update_active.png";

import historyListActive from "../../../assets/Icons/history_active.png";
import historyListInActive from "../../../assets/Icons/history_unactive.png";

import sidebarBell from "../../../assets/Icons/sidebarBell.png";
import sidebarBellActive from "../../../assets/Icons/bellSelected.png";
import settingActive from "../../../assets/Icons/activeSetting.png";
import userActive from "../../../assets/Icons/dropdownUser.png";

import sidebarSettingIcon from "../../../assets/Icons/sidebarSettingIcon.png";
import editpen from "../../../assets/Icons/editpen.png";
import LogoutIcon from "../../../assets/Icons/LogoutIcon.png";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { actions as adminMenuActions } from "../Redux/actions";
import { useOuterClick } from "../../../Components/OnBording/SubModules/AssignTask/utils";
import { actions as loginActions } from "../../../Components/Authectication/redux/actions";

function LeftSideBar({ history, isTaskListOpen, setIsTaskListOpen }) {
  const state = useSelector((state) => state);

  const dispatch = useDispatch();

  const [openProfile, setOpenProfile] = useState(false);

  const openProfileRef = useOuterClick((e) => {
    if (openProfile === true) {
      setOpenProfile(false);
    }
  });

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
    } else if (currentActiveMenu === "complianceHistoryList") {
      history.push("/compliance-history-list");
    } else if (currentActiveMenu === "newRegulations") {
      history.push("/new-regulations");
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
              title="ComplianceHistory"
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

          <div
            className={
              !openProfile &&
              state &&
              state.adminMenu.currentMenu === "complianceHistoryList"
                ? "taskIcon-active"
                : "taskIcon"
            }
          >
            <img
              style={{ cursor: "pointer" }}
              title="complianceHistoryList"
              onClick={() => onMenuClick("complianceHistoryList")}
              src={
                !openProfile &&
                state &&
                state.adminMenu.currentMenu === "complianceHistoryList"
                  ? historyListActive
                  : historyListInActive
              }
              alt="sidebar Bell"
            />
          </div>

          <div
            className={
              !openProfile &&
              state &&
              state.adminMenu.currentMenu === "newRegulations"
                ? "taskIcon-active"
                : "taskIcon"
            }
          >
            <img
              style={{ cursor: "pointer" }}
              title="complianceHistoryList"
              onClick={() => onMenuClick("newRegulations")}
              src={
                !openProfile &&
                state &&
                state.adminMenu.currentMenu === "newRegulations"
                  ? updateActive
                  : updateActive
              }
              alt="sidebar Bell"
            />
          </div>
        </div>
        <div className="devider-line">Help</div>
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
