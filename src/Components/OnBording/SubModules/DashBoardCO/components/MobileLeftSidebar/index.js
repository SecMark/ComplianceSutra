import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import closeBlack from "../../../../../../assets/Icons/closeBlack.png";
import settingActive from "../../../../../../assets/Icons/activeSetting.png";
import settingInactive from "../../../../../../assets/Icons/sidebarSettingIcon.png";
import mobileTopArrow from "../../../../../../assets/Icons/mobileTopArrow.png";
import editpen from "../../../../../../assets/Icons/editpen.png";
import LogoutIcon from "../../../../../../assets/Icons/LogoutIcon.png";
import { useOuterClick } from "../RightSideGrid/outerClick";
import { actions as setCurrentMenuActions } from "../../MenuRedux/actions";
import { useSelector, useDispatch } from "react-redux";
import { actions as loginActions } from "../../../../../Authectication/redux/actions";
import taskActive from "../../../../../../assets/Icons/sidebar-active.png";
import taskInactive from "../../../../../../assets/Icons/task_alt_black_24dp (1).png";
import bellInactive from "../../../../../../assets/Icons/sidebarBell.png";
import bellActive from "../../../../../../assets/Icons/bellSelected.png";
import userActive from "../../../../../../assets/Icons/dropdownUser.png";
import userInactive from "../../../../../../assets/Icons/sideBaruser.png";
import dashboardBlackActive from "../../../../../../assets/Icons/dashboard_black.png";
import dashboardGreyActive from "../../../../../../assets/Icons/dashboard_grey.png";
import historyActive from "../../../../../../assets/Icons/history_active.png";
import historyInactive from "../../../../../../assets/Icons/history_unactive.png";

import "./style.css";

function MobileLeftSidebar({ history, close }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [openProfile, setOpenProfile] = useState(false);
  const openProfileRef = useOuterClick((e) => {
    if (openProfile) {
      setOpenProfile(false);
    }
  });

  const onLogoutClick = () => {
    close();
    dispatch(loginActions.createLogoutAction());
    history.push("/login");
  };

  const onMenuClick = (currentActiveMenu) => {
    close();
    dispatch(setCurrentMenuActions.setCurrentMenu(currentActiveMenu));
    if (currentActiveMenu === "taskList") {
      history.push("/dashboard");
    } else if (currentActiveMenu === "notfications") {
      history.push("/notifications");
    } else if (currentActiveMenu === "settings") {
      history.push("/settings");
    } else if (currentActiveMenu === "complianceHistory") {
      history.push("/compliance-history");
    } else if (currentActiveMenu === "complianceHistoryList") {
      history.push("/compliance-history-list");
    }
  };

  const handleClose = () => {
    history.push("/settings");
  };

  const onEditProfileClick = () => {
    close();
    history.push("/company-personal", handleClose());
    dispatch(setCurrentMenuActions.setActiveTabInSetting("personal"));
    dispatch(setCurrentMenuActions.setCurrentMenu("settings"));
  };

  return (
    <div id="navigationBar mobile-navigation-drower">
      <div className="left-bar">
        <div className="logo">
          <img
            src={closeBlack}
            alt="sideBarlogo"
            style={{ cursor: "pointer" }}
            onClick={() => close()}
          />
        </div>
        <div className="first-icon-list-mobile">
          <div
            onClick={() => onMenuClick("taskList")}
            style={{ cursor: "pointer" }}
            className={
              !openProfile &&
              state &&
              state.adminMenu.currentMenu === "taskList"
                ? "taskList-mobile"
                : "inactiveMobile"
            }
          >
            <img
              src={
                !openProfile &&
                state &&
                state.adminMenu.currentMenu === "taskList"
                  ? taskActive
                  : taskInactive
              }
              alt="sideBarlogo"
            />{" "}
            Tasks
          </div>
          <div
            onClick={() => onMenuClick("notfications")}
            style={{ cursor: "pointer" }}
            className={
              !openProfile &&
              state &&
              state.adminMenu.currentMenu === "notfications"
                ? "taskList-mobile"
                : "inactiveMobile"
            }
          >
            <img
              src={
                !openProfile &&
                state &&
                state.adminMenu.currentMenu === "notfications"
                  ? bellActive
                  : bellInactive
              }
              alt="sideBarlogo"
            />{" "}
            Notifications
          </div>
          {/* Compliance History Filter */}
          <div
            onClick={() => onMenuClick("complianceHistory")}
            style={{ cursor: "pointer" }}
            className={
              !openProfile &&
              state &&
              state.adminMenu.currentMenu === "complianceHistory"
                ? "taskList-mobile"
                : "inactiveMobile"
            }
          >
            <img
              src={
                !openProfile &&
                state &&
                state.adminMenu.currentMenu === "complianceHistory"
                  ? dashboardBlackActive
                  : dashboardGreyActive
              }
              alt="sideBarlogo"
            />{" "}
            History
          </div>
          {/* Compliance History List */}
          <div
            onClick={() => onMenuClick("complianceHistoryList")}
            style={{ cursor: "pointer" }}
            className={
              !openProfile &&
              state &&
              state.adminMenu.currentMenu === "complianceHistoryList"
                ? "taskList-mobile"
                : "inactiveMobile"
            }
          >
            <img
              src={
                !openProfile &&
                state &&
                state.adminMenu.currentMenu === "complianceHistoryList"
                  ? historyActive
                  : historyInactive
              }
              alt="sideBarlogo"
            />{" "}
            History List
          </div>
        </div>
        <div className="devider-line"></div>
        <div className="second-icon-list">
          <div
            onClick={() => onMenuClick("settings")}
            style={{ cursor: "pointer" }}
            className={
              !openProfile &&
              state &&
              state.adminMenu.currentMenu === "settings"
                ? "taskList-mobile"
                : "inactiveMobile"
            }
          >
            <img
              src={
                !openProfile &&
                state &&
                state.adminMenu.currentMenu === "settings"
                  ? settingActive
                  : settingInactive
              }
              alt="sideBarlogo"
            />{" "}
            Settings
          </div>
          <div
            onClick={() => setOpenProfile(true)}
            style={{ cursor: "pointer" }}
            className={openProfile ? "taskList-mobile" : "inactiveMobile"}
          >
            <img
              src={openProfile ? userActive : userInactive}
              alt="sidebar Account Circle"
            />{" "}
            Profile
            <img
              className={openProfile ? "top-arrow-mobile" : "down-arrow-mobile"}
              src={mobileTopArrow}
              alt="edit"
            />
            {openProfile && (
              <div className="edit-link">
                <div ref={openProfileRef} className="edit-option-box">
                  <div
                    style={{ cursor: "pointer" }}
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

export default withRouter(MobileLeftSidebar);
