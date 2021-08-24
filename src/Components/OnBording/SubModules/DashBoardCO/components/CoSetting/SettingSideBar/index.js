import React, { useState } from "react";
import "./style.css";
import logout from "../../../../../../../assets/Icons/logout-icon.PNG";
import { useSelector, useDispatch } from "react-redux";
import { actions as loginActions } from "../../../../../../Authectication/redux/actions";
import { withRouter } from "react-router-dom";
import { actions as adminMenuActions } from "../../../MenuRedux/actions";
import { actions as notficationActions } from "../../notification/Redux/actions";

import MobileLeftSidebar from "../../MobileLeftSidebar";
import { isMobile } from "react-device-detect";

function SettingSideBar({ activeTabKey, handleTabChange, history }) {
  const [activeLinkIndex, setActiveLinkIndex] = useState(0);
  const [navigationHideShow, setNavigationHideShow] = useState(false);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const userDetails = state && state.auth && state.auth.loginInfo;

  const onLogoutClick = () => {
    dispatch(loginActions.createLogoutAction());
    dispatch(adminMenuActions.setCurrentBoardViewTaskId(null));
    dispatch(notficationActions.setTaskID(null));
    dispatch(adminMenuActions.setCurrentCalendarViewTaskId(null));
    history.push("/login");
  };
  const closeMobileSidebar = () => {
    setNavigationHideShow(false);
    const drawerParent = document.getElementById("sideBarParent");
    const drawerChild = document.getElementById("sideBarChild");
  };
  const openHBMenu = () => {
    const drawerParent = document.getElementById("sideBarParent");
    const drawerChild = document.getElementById("sideBarChild");
    console.log(drawerParent, "drawerParent");
    if (drawerParent) {
      drawerParent.classList.add("overlay");
      drawerChild.style.left = "0%";
    }
  };

  const tabChange = (index) => {
    handleTabChange(index);
    history.push("/settings");
    if (index === 0) {
      dispatch(adminMenuActions.setActiveTabInSetting("personal"));
    } else if (index === 1) {
      dispatch(adminMenuActions.setActiveTabInSetting("company"));
    } else if (index === 2) {
      dispatch(adminMenuActions.setActiveTabInSetting("account"));
    } else if (index === 3) {
      dispatch(adminMenuActions.setActiveTabInSetting("notifications"));
    } else if (index === 4) {
      dispatch(adminMenuActions.setActiveTabInSetting("security"));
    } else if (index === 5) {
      dispatch(adminMenuActions.setActiveTabInSetting("team-member"));
    } else {
    }
  };
  return (
    <div className="setting-side-bar">
      {isMobile && (
        <div id="sideBarParent" className="">
          <div id="sideBarChild" className="leftSideBarFixed">
            <MobileLeftSidebar
              className="d-block d-sm-none"
              close={() => closeMobileSidebar()}
            />
          </div>
        </div>
      )}

      <div className="get-main-settingCo">
        <p className="setting-title">Settings</p>
        <div className="menu-items">
          {(userDetails && userDetails.UserType == 4) ||
          userDetails.UserType == 5 ? (
            <ul>
              <li
                onClick={() => tabChange(0)}
                className={
                  state.adminMenu.activeTab === "personal"
                    ? "active-class un-active-class"
                    : ""
                }
              >
                {" "}
                <span>Personal </span>
              </li>
              <li
                onClick={() => tabChange(3)}
                className={
                  state.adminMenu.activeTab === "notifications"
                    ? "active-class un-active-class"
                    : ""
                }
              >
                <span>Notification </span>
              </li>
              <li
                onClick={() => tabChange(4)}
                className={
                  state.adminMenu.activeTab === "security"
                    ? "active-class un-active-class"
                    : ""
                }
              >
                <span>Security </span>
              </li>
            </ul>
          ) : (
            <ul>
              <li
                onClick={() => tabChange(0)}
                className={
                  state.adminMenu.activeTab === "personal"
                    ? "active-class un-active-class"
                    : ""
                }
              >
                {" "}
                <span>Personal </span>
              </li>
              <li
                onClick={() => tabChange(1)}
                className={
                  state.adminMenu.activeTab === "company"
                    ? "active-class un-active-class"
                    : ""
                }
              >
                <span>Company </span>
              </li>
              <li
                onClick={() => tabChange(2)}
                className={
                  state.adminMenu.activeTab === "account"
                    ? "active-class un-active-class"
                    : ""
                }
              >
                <span>Account </span>
              </li>
              <li
                onClick={() => tabChange(3)}
                className={
                  state.adminMenu.activeTab === "notifications"
                    ? "active-class un-active-class"
                    : ""
                }
              >
                <span>Notification </span>
              </li>
              <li
                onClick={() => tabChange(4)}
                className={
                  state.adminMenu.activeTab === "security"
                    ? "active-class un-active-class"
                    : ""
                }
              >
                <span>Security </span>
              </li>
              <li
                onClick={() => tabChange(5)}
                className={
                  state.adminMenu.activeTab === "team-member"
                    ? "active-class un-active-class"
                    : ""
                }
              >
                <span>Team Members </span>
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="bottom-logo-strip-settingCo">
        <p
          style={{ cursor: "pointer" }}
          onClick={() => onLogoutClick()}
          className="log-out"
        >
          <img src={logout} alt="" />
          Logout
        </p>
      </div>
    </div>
  );
}

export default withRouter(SettingSideBar);
