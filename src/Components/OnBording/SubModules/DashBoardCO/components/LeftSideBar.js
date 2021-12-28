import React, { useState, useEffect } from "react";
import "./style.css";
// import SideBarBg from "../../../../assets/Images/Onboarding/side-bar-bg.png";
import dashBoardActiveIcon from "../../../../../assets/Icons/dashBoardActiveIcon.png";
import sideBarlogo from "../../../../../assets/Icons/sideBarlogo.png";

import SideBaruser from "../../../../../assets/Icons/sideBaruser.png";
import HelpBlackActive from "../../../../../assets/Icons/HelpBlackActive.png";
import HelpGreyActive from "../../../../../assets/Icons/HelpGreyActive.png";

import sidebarActive from "../../../../../assets/Icons/sidebar-active.png";
import sidebarRightActive from "../../../../../assets/Icons/task_alt_black_24dp (1).png";
import sidebarBell from "../../../../../assets/Icons/sidebarBell.png";
import sidebarBellActive from "../../../../../assets/Icons/bellSelected.png";
import settingActive from "../../../../../assets/Icons/activeSetting.png";
import userActive from "../../../../../assets/Icons/dropdownUser.png";
import dashboardView from "../../../../../assets/Icons/dashboardFirstIcon.png";
import sidebarSettingIcon from "../../../../../assets/Icons/sidebarSettingIcon.png";

import editpen from "../../../../../assets/Icons/editpen.png";
import LogoutIcon from "../../../../../assets/Icons/LogoutIcon.png";
import VectorIcon from "../../../../../assets/Icons/Vector.png";
import projectManagementInactiveIcon from "../../../../../assets/Icons/projectManagementInactiveIcon.svg";

import { useOuterClick } from "../components/RightSideGrid/outerClick";
import { useSelector, useDispatch } from "react-redux";
import { actions as loginActions } from "../../../../Authectication/redux/actions";
import { withRouter } from "react-router-dom";
import { actions as adminMenuActions } from "../MenuRedux/actions";
import { actions as notficationActions } from "./notification/Redux/actions";

import historyListActive from "../../../../../assets/Icons/history_active.png";
import historyListInActive from "../../../../../assets/Icons/history_unactive.png";

import Audit1 from "../../../../../assets/Icons/audit1.png";
import Audit2 from  "../../../../../assets/Icons/audit2.png";
import updateActive from "../../../../../assets/Icons/update_active.png";
import SingleNotification from "../../../../../CustomNotification/SingleNotification";
import api from "../../../../../apiServices";
import MultipleNotification from "../../../../../CustomNotification/MultipleNotification";
import { toast } from "react-toastify";
import axiosInstance from "../../../../../apiServices";
import { BACKEND_BASE_URL } from "../../../../../apiServices/baseurl";
import trashIcon from "../../../../../assets/Icons/trashIcon.svg";
import trashIconActive from "../../../../../assets/Icons/trashIconActive.svg";
import {AiOutlineAudit} from "react-icons/ai";
function LeftSideBar({ history, isTaskListOpen, setIsTaskListOpen }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const toastId = React.useRef(null);
  const userDetails = state && state.auth && state.auth.loginInfo;

  const [openProfile, setOpenProfile] = useState(false);
  const userID =
    state && state.auth && state.auth.loginInfo && state.auth.loginInfo.UserID;

  useEffect(() => {
    const interval = setInterval(() => {
      try {
        if (userID) {
          notificationAPICall();
        }
      } catch (err) {}
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const notificationAPICall = () => {
    let notificationArr = [];
    const payload = {
      userID: userID,
    };
    api
      .post("/api/Notifications", payload)
      .then(function (response) {
        var date1 = new Date(); //current time
        if (response && response.data && response.data.length > 0) {
          let notification = response && response.data;
          var notificationDateTime;
          var date2;
          var timeDiff;
          notification &&
            notification.length > 0 &&
            notification.map((item, index) => {
              notificationDateTime = item.date;
              date2 = new Date(notificationDateTime);
              timeDiff = Math.abs(date2.getTime() - date1.getTime()); // in miliseconds
              if (timeDiff < 60000) {
                notificationArr.push(item);
              }
            });
          if (notificationArr && notificationArr.length > 0) {
            if (notificationArr.length === 1) {
              toast.success(
                <SingleNotification
                  id={toastId.current}
                  toast={toast}
                  notification={notificationArr[0]}
                />,
                {
                  toastId: "single-notification",
                }
              );
            } else {
              toast.success(
                <MultipleNotification
                  id={toastId.current}
                  toast={toast}
                  notificationCount={notificationArr.length}
                />,
                {
                  toastId: "multiple-notification",
                }
              );
            }
          } else {
          }
        } else {
        }
      })
      .catch(function (error) {
        if (error) {
        }
      });
  };

  const openProfileRef = useOuterClick((e) => {
    if (openProfile === true) {
      setOpenProfile(false);
    }
  });

  const onLogoutClick = () => {
    if (userDetails.UserType === 3) {
      dispatch(adminMenuActions.setCurrentMenu("dashboard"));
    } else {
      dispatch(adminMenuActions.setCurrentMenu("taskList"));
    }
    dispatch(adminMenuActions.setActiveTabInSetting("personal"));
    dispatch(loginActions.createLogoutAction());
    dispatch(adminMenuActions.setCurrentBoardViewTaskId(null));
    dispatch(adminMenuActions.setCurrentCalendarViewTaskId(null));
    dispatch(notficationActions.setTaskID(null));

    const deviceToken = localStorage.getItem("deviceToken");
    axiosInstance.post(`${BACKEND_BASE_URL}compliance.api.removeFCMToken`, {
      token: deviceToken,
    });
    history.push("/login");
  };

  const onMenuClick = (currentActiveMenu) => {
    dispatch(adminMenuActions.setCurrentMenu(currentActiveMenu));
    if (currentActiveMenu === "taskList") {
      dispatch(notficationActions.setTaskID(null));
      localStorage.removeItem("expandedFlagss");
      localStorage.removeItem("allRowCount");
      history.push("/dashboard");
      if (isTaskListOpen) {
        setIsTaskListOpen(false);
      }
    } else if (currentActiveMenu === "notfications") {
      history.push("/notifications");
    } else if (currentActiveMenu === "settings") {
      history.push("/settings");
    } else if (currentActiveMenu === "dashboard") {
      history.push("/dashboard-view");
    } else if (currentActiveMenu === "history") {
      history.push("/compliance-history");
    } else if (currentActiveMenu === "new-regulations") {
      history.push("/new-regulations");
    } else if (currentActiveMenu === "help") {
      history.push("/help");
    } else if (currentActiveMenu === "project-management") {
      history.push("/project-management");
    } else if (currentActiveMenu === "project-trash") {
      history.push("/project-trash");
    } else if (currentActiveMenu === "audit") {
      history.push("/audit");
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
          {(userDetails.UserType === 3 ||
            userDetails.UserType === 5 ||
            userDetails.UserType === 6) && (
            <div
              className={
                !openProfile &&
                state &&
                state.adminMenu.currentMenu === "dashboard"
                  ? "taskIcon-active"
                  : "taskIcon"
              }
            >
              <img
                style={{ cursor: "pointer", width: "18px" }}
                title="Dashboard"
                onClick={() => onMenuClick("dashboard")}
                src={
                  !openProfile &&
                  state &&
                  state.adminMenu.currentMenu === "dashboard"
                    ? dashBoardActiveIcon
                    : dashboardView
                }
                alt="sidebar Active"
              />
            </div>
          )}

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
          {/* <div className={!openProfile && state && state.adminMenu.currentMenu === "notfications" ? "taskIcon-active" : "taskIcon"}> */}

          <div
            className={
              !openProfile && state && state.adminMenu.currentMenu === "history"
                ? "taskIcon-active"
                : "taskIcon"
            }
          >
            <img
              style={{ cursor: "pointer" }}
              title="Compliance History"
              onClick={() => onMenuClick("history")}
              src={
                !openProfile &&
                state &&
                state.adminMenu.currentMenu === "history"
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
              state.adminMenu.currentMenu === "project-management"
                ? "taskIcon-active"
                : "taskIcon"
            }
          >
            <img
              style={{ cursor: "pointer", width: "18px" }}
              title="Project Task"
              onClick={() => onMenuClick("project-management")}
              src={
                !openProfile &&
                state &&
                state.adminMenu.currentMenu === "project-management"
                  ? VectorIcon
                  : projectManagementInactiveIcon
              }
              alt="sidebar Bell"
            />
          </div>

          <div
            className={
              !openProfile &&
              state &&
              state.adminMenu.currentMenu === "new-regulations"
                ? "taskIcon-active"
                : "taskIcon"
            }
          >
            <img
              style={{ cursor: "pointer" }}
              title="New Regulations"
              onClick={() => onMenuClick("new-regulations")}
              src={
                !openProfile &&
                state &&
                state.adminMenu.currentMenu === "new-regulations"
                  ? updateActive
                  : updateActive
              }
              alt="sidebar Bell"
            />
          </div>

          <div
            className={
              !openProfile &&
              state &&
              state.adminMenu.currentMenu === "create-template"
                ? "taskIcon-active"
                : "taskIcon"
            }
          >
            <img
              style={{ cursor: "pointer" }}
              title="Create Template"
              onClick={() => onMenuClick("audit")}
              src={
                !openProfile && state && state.adminMenu.currentMenu === "audit"
                  ? Audit1
                  : Audit2
              }
              alt="sidebar Bell"
            />
          </div>
          <div
            className={
              !openProfile &&
              state &&
              state.adminMenu.currentMenu === "project-trash"
                ? "taskIcon-active"
                : "taskIcon"
            }
          >
            <img
              style={{ cursor: "pointer", width: "18px" }}
              title="Project Trash"
              onClick={() => onMenuClick("project-trash")}
              src={
                !openProfile &&
                state &&
                state.adminMenu.currentMenu === "project-trash"
                  ? trashIconActive
                  : trashIcon
              }
              alt="sidebar Bell"
            />
          </div>
        </div>
        <div className="devider-line devider-line-set"></div>
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
          <div
            className={
              !openProfile && state && state.adminMenu.currentMenu === "help"
                ? "taskIcon-active"
                : "taskIcon"
            }
          >
            <img
              onClick={() => onMenuClick("help")}
              style={{ cursor: "pointer" }}
              src={
                !openProfile && state && state.adminMenu.currentMenu === "help"
                  ? HelpBlackActive
                  : HelpGreyActive
              }
              alt="taskIcon"
            />
          </div>

          <div
            className={
              openProfile
                ? "taskIcon-active mmm taskIcon mt-8"
                : "taskIcon mt-8"
            }
          >
            <img
              style={{ cursor: "pointer" }}
              title="Profile"
              onClick={() => setOpenProfile(!openProfile)}
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
        </div>
      </div>
    </div>
  );
}

export default withRouter(LeftSideBar);
