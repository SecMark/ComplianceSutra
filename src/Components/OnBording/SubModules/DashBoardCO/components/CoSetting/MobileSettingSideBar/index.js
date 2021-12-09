import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import Cobg from "../../../../../../../assets/Images/Onboarding/co-bg.png";
import togglemobile from "../../../../../../../assets/Icons/togglemobile.png";
import mobileTopArrow from "../../../../../../../assets/Icons/mobileTopArrow.png";
import sidebarAccountCircle from "../../../../../../../assets/Icons/sidebarAccountCircle.png";
import editpen from "../../../../../../../assets/Icons/editpen.png";
import upArrow from "../../../../../../../assets/Icons/topArrowAccordian.png";
import LogoutIcon from "../../../../../../../assets/Icons/LogoutIcon.png";
import taskIcon from "../../../../../../../assets/Icons/taskIcon.png";
import sidebarBell from "../../../../../../../assets/Icons/sidebarBell.png";
import sidebarSettingIcon from "../../../../../../../assets/Icons/sidebarSettingIcon.png";
import closeBlack from "../../../../../../../assets/Icons/closeBlack.png";
import SettingSideBar from "../SettingSideBar/index";
import CoPersonal from "../CoPersonal/index";
import CoCompany from "../CoCompany/index";
import CoNotification from "../CoNotification/index";
import CoAccount from "../CoAccount/index";
import CoSecurity from "../CoSecurity/index";
import CoTeamMember from "../CoTeamMember/index";
import { actions as adminMenuActions } from "../../../MenuRedux/actions";

const settingJson = [
  { type: 1, isEnable: true },
  { type: 2, isEnable: false },
  { type: 3, isEnable: true },
  { type: 4, isEnable: false },
  { type: 5, isEnable: true },
];
function MobileSettingSideBar({ showHB, setShowHBMenu }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [notificationSetting, setNotificationSetting] = useState(null);
  const [selectedTabKey, setSelectedTabKey] = useState(0);
  const [settingSideBarShowHide, setSettingSideBarShowHide] = useState(true);

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
    if (!settingSideBarShowHide) {
      setShowHBMenu(true);
    }
  }, [settingSideBarShowHide]);

  const handleTabChange = (key) => {
    // if (selectedTabKey != key) {
    //   setSelectedTabKey(key)
    //   setSettingSideBarShowHide(false)
    // }
    setSelectedTabKey(key);
    setSettingSideBarShowHide(false);
  };

  const handleClose = (value) => {
    setSettingSideBarShowHide(!settingSideBarShowHide);
    setShowHBMenu(false);
  };

  return (
    <>
      {settingSideBarShowHide && (
        <SettingSideBar
          activeTabKey={selectedTabKey}
          handleTabChange={(key) => handleTabChange(key)}
        />
      )}

      <div className="col-12 padding-left">
        <img className="right-bg d-none d-md-block" src={Cobg} alt="" />
        {!settingSideBarShowHide &&
          state.adminMenu.activeTab === "personal" && (
            <CoPersonal handleClose={handleClose} />
          )}
        {!settingSideBarShowHide && state.adminMenu.activeTab === "company" && (
          <CoCompany handleClose={handleClose} />
        )}
        {!settingSideBarShowHide && state.adminMenu.activeTab === "account" && (
          <CoAccount handleClose={handleClose} />
        )}
        {!settingSideBarShowHide &&
          state.adminMenu.activeTab === "notifications" && (
            <CoNotification
              settingData={notificationSetting}
              handleClose={handleClose}
            />
          )}
        {!settingSideBarShowHide &&
          state.adminMenu.activeTab === "security" && (
            <CoSecurity handleClose={handleClose} />
          )}
        {!settingSideBarShowHide &&
          state.adminMenu.activeTab === "team-member" && (
            <CoTeamMember handleClose={handleClose} />
          )}
      </div>
      {/* <div style={{backgroundColor:'skyblue',height:300,width:350}}>
            <div className="w-25" onClick={()=>{setNavigationHideShow(!navigationHideShow)}}><img src={togglemobile} alt="toggle mobile"/></div>
        </div> */}

      {/* { navigationHideShow && <div id="navigationBar mobile-navigation-drower"> 
        <div className="left-bar">
        <div className="logo">
        <img src={closeBlack} alt="sideBarlogo" />
      </div>
        <div className="first-icon-list-mobile">
          <div className="taskList-mobile">
              <img src={taskIcon} alt="sideBarlogo"/> Tasks
          </div>
          <div className="inactiveMobile">
              <img src={sidebarBell} alt="sideBarlogo"/> Notifications
          </div>
        </div>
        <div className="devider-line"></div>

                <div className="second-icon-list">
                <div className="inactiveMobile">
                    <img src={sidebarSettingIcon} alt="sideBarlogo"/> Settings
                </div>
                <div className="inactiveMobile">
                <img src={sidebarAccountCircle} alt="sidebar Account Circle"/> Profile <img className="drop-arrow-mobile" src={mobileTopArrow} alt="edit" />
                
                
                    <div className="edit-link">
                    <div className="edit-option-box">
                        <div style={{ cursor: "pointer" }} className="edit-label-option">
                        <img src={editpen} alt="edit" /> Edit Profile
                    </div>
                        <div style={{ cursor: "pointer" }} className="logout-label-option border-0">
                        <img src={LogoutIcon} alt="logout Icon" /> Logout
                    </div>
                    </div>
                    </div>
                </div>
            </div>
          </div>  
         </div>} */}
    </>
  );
}
export default MobileSettingSideBar;
