import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import { withRouter } from "react-router-dom";
import SideBarInputControl from "../LeftSideBar";
import Cobg from "../../../../../../assets/Images/Onboarding/co-bg.png";
import CoPersonal from "./CoPersonal";
import sideBarlogo from "../../../../../../assets/Icons/sideBarlogo.png";
import CoCompany from "./CoCompany";
import togglemobile from "../../../../../../assets/Icons/togglemobile.png";
import CoNotification from "./CoNotification";
import CoAccount from "./CoAccount";
import CoSecurity from "./CoSecurity";
import MobileSettingSideBar from "../CoSetting/MobileSettingSideBar";
import CoChangePassword from "./CoChangePassword";
import CoTeamMember from "./CoTeamMember";
import { actions as adminMenuActions } from "../../MenuRedux/actions";
import SettingSideBar from "./SettingSideBar";
import MobileLeftSidebar from "../MobileLeftSidebar";
import { isMobile } from "react-device-detect";
const settingJson = [
  { type: 1, isEnable: true },
  { type: 2, isEnable: false },
  { type: 3, isEnable: true },
  { type: 4, isEnable: false },
  { type: 5, isEnable: true },
];
function CoSetting({ history }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [notificationSetting, setNotificationSetting] = useState(null);
  const [selectedTabKey, setSelectedTabKey] = useState(0);

  const [navigationHideShow, setNavigationHideShow] = useState(false);

  const [showHB, setShowHBMenu] = useState(false);
  const userID =
    state && state.auth && state.auth.loginInfo && state.auth.loginInfo.UserID;
  useEffect(() => {
    setNotificationSetting(settingJson);
  }, []);
  useEffect(() => {
    if (
      window.location.href.includes("settings") &&
      state.adminMenu.currentMenu !== "settings"
    ) {
      dispatch(adminMenuActions.setCurrentMenu("settings"));
    }
  }, []);
  useEffect(() => {
    if (userID === undefined) {
      history.push("/login");
    }
  }, []);
  const handleTabChange = (key) => {
    if (selectedTabKey != key) {
      setSelectedTabKey(key);
    }
  };
  const onHBMenu = () => {
    setNavigationHideShow(true);
    const drawerParent = document.getElementById("sideBarParent");
    const drawerChild = document.getElementById("sideBarChild");
    console.log(drawerParent, "drawerParent");
    if (drawerParent) {
      drawerParent.classList.add("overlay");
      drawerChild.style.left = "0%";
    }
  };

  const closeMobileSidebar = () => {
    const drawerParent = document.getElementById("sideBarParent");
    const drawerChild = document.getElementById("sideBarChild");
    if (drawerParent) {
      drawerParent.classList.remove("overlay");
      drawerChild.style.left = "-100%";
    }
    setShowHBMenu(false);
  };

  return (
    <div className="row co-setting">
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
      <div className="col-4 left-fixed ">
        <div className="side-bar-outer">
          <SideBarInputControl />
          <SettingSideBar
            activeTabKey={selectedTabKey}
            handleTabChange={(key) => handleTabChange(key)}
          />
        </div>
      </div>
      {!isMobile && (
        <div className="col-12 padding-left">
          <img className="right-bg d-none d-md-block" src={Cobg} alt="" />
          {state.adminMenu.activeTab === "personal" && (
            <CoPersonal activeTabKey={selectedTabKey} />
          )}
          {state.adminMenu.activeTab === "company" && (
            <CoCompany activeTabKey={selectedTabKey} />
          )}
          {state.adminMenu.activeTab === "account" && (
            <CoAccount activeTabKey={selectedTabKey} />
          )}
          {state.adminMenu.activeTab === "notifications" && (
            <CoNotification
              activeTabKey={selectedTabKey}
              settingData={notificationSetting}
            />
          )}
          {state.adminMenu.activeTab === "security" && (
            <CoSecurity activeTabKey={selectedTabKey} />
          )}
          {/*<CoChangePassword /> */}
          {/* <CoAccount />  */}
          {/* <CoSecurity />  */}
          {state.adminMenu.activeTab === "team-member" && (
            <CoTeamMember activeTabKey={selectedTabKey} />
          )}
        </div>
      )}
      {showHB === false && (
        <div className=" d-block d-md-none pad-ms pr-4">
          <div className="d-flex">
            <div
              className="w-25"
              style={{ cursor: "pointer" }}
              onClick={() => {
                onHBMenu();
              }}
            >
              <img src={togglemobile} alt="toggle mobile" />
            </div>
            <div className="w-75 pr-4">
              {" "}
              <img
                className="mobile-logo"
                src={sideBarlogo}
                alt="sideBarlogo"
              />{" "}
            </div>
          </div>
        </div>
      )}
      {isMobile && (
        <MobileSettingSideBar showHB={showHB} setShowHBMenu={setShowHBMenu} />
      )}
    </div>
  );
}

export default withRouter(CoSetting);
