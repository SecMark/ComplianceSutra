import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import Cobg from "../../../../../../../assets/Images/Onboarding/co-bg.png";
import SettingSideBar from "../SettingSideBar/index"
import CoPersonal from '../CoPersonal/index';
import CoCompany from '../CoCompany/index';
import CoNotification from '../CoNotification/index';
import CoAccount from '../CoAccount/index';
import CoSecurity from '../CoSecurity/index';
import CoTeamMember from '../CoTeamMember/index';
import {actions as adminMenuActions} from "../../../MenuRedux/actions";

const settingJson = [
  { 'type': 1, 'isEnable': true },
  { 'type': 2, 'isEnable': false },
  { 'type': 3, 'isEnable': true },
  { 'type': 4, 'isEnable': false },
  { 'type': 5, 'isEnable': true }
]
function MobileSettingSideBar({ showHB, setShowHBMenu }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch()
  const [notificationSetting, setNotificationSetting] = useState(null)
  const [selectedTabKey, setSelectedTabKey] = useState(0);
  const[settingSideBarShowHide, setSettingSideBarShowHide] = useState(true);
    
  useEffect(() => {
    setNotificationSetting(settingJson);
  }, []);
  useEffect(() => {
    if (window.location.href.includes("settings") && state.adminMenu.currentMenu !== "settings") {
      dispatch(adminMenuActions.setCurrentMenu("settings"));
    }

  }, [])

  useEffect(() => {
    if (!settingSideBarShowHide) {
      setShowHBMenu(true)
    }
  }, [settingSideBarShowHide])

  const handleTabChange = (key) => {
          setSelectedTabKey(key)
      setSettingSideBarShowHide(false)
    
  }

  const handleClose = (value) => {
    setSettingSideBarShowHide(!settingSideBarShowHide);
    setShowHBMenu(false)
  }

  return (
    <>
      {settingSideBarShowHide && <SettingSideBar activeTabKey={selectedTabKey} handleTabChange={(key) => handleTabChange(key)} />}

      <div className="col-12 padding-left">
        <img className="right-bg d-none d-sm-block" src={Cobg} alt="" />
        {!settingSideBarShowHide && state.adminMenu.activeTab === "personal" && <CoPersonal handleClose={handleClose} />}
        {!settingSideBarShowHide && state.adminMenu.activeTab === "company" && <CoCompany handleClose={handleClose} />}
        {!settingSideBarShowHide && state.adminMenu.activeTab === "account" && <CoAccount handleClose={handleClose} />}
        {!settingSideBarShowHide && state.adminMenu.activeTab === "notifications" && <CoNotification settingData={notificationSetting}
          handleClose={handleClose} />}
        {!settingSideBarShowHide && state.adminMenu.activeTab === "security" && <CoSecurity handleClose={handleClose} />}
        {!settingSideBarShowHide && state.adminMenu.activeTab === "team-member" && <CoTeamMember handleClose={handleClose} />}
      </div>     
        </>
    )
}
export default (MobileSettingSideBar);
