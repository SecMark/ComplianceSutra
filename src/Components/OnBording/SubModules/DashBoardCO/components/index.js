import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import SideBarInputControl from "../components/LeftSideBar";
import RighSider from "../components/RightSideGrid";
import Cobg from "../../../../../assets/Images/Onboarding/co-bg.png";
import sideBarlogo from "../../../../../assets/Icons/sideBarlogo.png";
import togglemobile from "../../../../../assets/Icons/togglemobile.png";
import { actions as taskReportActions } from "../redux/actions";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import ComplianceOfficerSetting from "../components/CoSetting";
import Notifications from "../components/notification";
import MobileSettingSideBar from "./CoSetting/MobileSettingSideBar";
import { actions as adminMenuActions } from "../MenuRedux/actions";
import NewRegulations from "../../../../NewRegulationModule/NewRegulations";
import HistoryList from "../../../../HistoryModule/HistoryList";
import HelpSection from "../../../../HelpSection/Help";
// import HistoryFilter from "../../../../HistoryModule/HistoryFilter";
function Dashboard({ history }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [isTaskListOpen, setIsTaskListOpen] = useState(false);
  const [isTaskApproved, setIsTaskApproved] = useState(false);

  const taskList =
    state &&
    state.taskReport &&
    state.taskReport.taskReport &&
    state.taskReport.taskReport.taskReport &&
    state.taskReport.taskReport.taskReport;

  const entityID =
    state &&
    state.complianceOfficer &&
    state.complianceOfficer.personalInfo &&
    state.complianceOfficer.personalInfo.data &&
    state.complianceOfficer.personalInfo.data[0][0] &&
    state.complianceOfficer.personalInfo.data[0][0] &&
    state.complianceOfficer.personalInfo.data[0][0].UserDetails &&
    state.complianceOfficer.personalInfo.data[0][0].UserDetails[0] &&
    state.complianceOfficer.personalInfo.data[0][0].UserDetails[0].EntityID;

  const userData =
    state &&
    state.complianceOfficer &&
    state.complianceOfficer.personalInfo &&
    state.complianceOfficer.personalInfo.data &&
    state.complianceOfficer.personalInfo.data[0][0] &&
    state.complianceOfficer.personalInfo.data[0][0] &&
    state.complianceOfficer.personalInfo.data[0][0].UserDetails &&
    state.complianceOfficer.personalInfo.data[0][0].UserDetails[0] &&
    state.complianceOfficer.personalInfo.data[0][0].UserDetails[0];

  const userID =
    state && state.auth && state.auth.loginInfo && state.auth.loginInfo.UserID;

  const userDetails = state && state.auth && state.auth.loginInfo;

  const companyName =
    state &&
    state.complianceOfficer &&
    state.complianceOfficer.personalInfo &&
    state.complianceOfficer.personalInfo.formDataPersonalData &&
    state.complianceOfficer.personalInfo.formDataPersonalData.entityName;
  useEffect(() => {
    if (userID === undefined) {
      history.push("/login");
    }
  }, []);

  useEffect(() => {
    if (state.adminMenu.currentMenu !== "taskList") setIsTaskListOpen(false);
  }, []);
  useEffect(() => {
    // if (entityID) {
    //   dispatch(
    //     taskReportActions.taskReportRequest({
    //       entityid: entityID ? entityID : "251",
    //     })
    //   );
    // } else {
    // toast.error("something went wrong !!!");
    // history.push("/")
    // }

    dispatch(
      taskReportActions.taskReportRequest({
        entityid: "",
        // userID: 20243,
        userID: userDetails.UserID,
        usertype: userDetails.UserType,
      })
    );
  }, [state.adminMenu.currentMenu]);

  useEffect(() => {
    if (
      window.location.href.includes("dashboard") &&
      state.adminMenu.currentMenu !== "taskList"
    ) {
      console.log(isTaskListOpen);
      if (isTaskListOpen) {
        setIsTaskListOpen(false);
      }
      dispatch(adminMenuActions.setCurrentMenu("taskList"));
    } else if (
      window.location.href.includes("compliance-history") &&
      window.location.hash === "#/compliance-history" &&
      state.adminMenu.currentMenu !== "history"
    ) {
      dispatch(adminMenuActions.setCurrentMenu("history"));
      return;
    } else if (
      window.location.href.includes("new-regulations") &&
      state.adminMenu.currentMenu !== "new-regulations"
    ) {
      dispatch(adminMenuActions.setCurrentMenu("new-regulations"));
    } else if (
      window.location.href.includes("help") &&
      state.adminMenu.currentMenu !== "help"
    ) {
      dispatch(adminMenuActions.setCurrentMenu("help"));
    } else if (
      window.location.href.includes("notifications") &&
      state.adminMenu.currentMenu !== "notfications"
    ) {
      dispatch(adminMenuActions.setCurrentMenu("notfications"));
    }
  }, []);

  return (
    <div className="row co-dashboard fix-top">
      <div className=" left-fixed ">
        <div className="on-boarding">
          {/* <SideBar /> */}
          <SideBarInputControl
            isTaskListOpen={isTaskListOpen}
            setIsTaskListOpen={setIsTaskListOpen}
          />
        </div>
      </div>
      <div className="col-12 ">
        <img className="right-bg" src={Cobg} alt="" />
        {state && state.adminMenu.currentMenu === "taskList" && (
          <RighSider
            isTaskListOpen={isTaskListOpen}
            setIsTaskListOpen={setIsTaskListOpen}
            isTaskApproved={isTaskApproved}
            setIsTaskApproved={setIsTaskApproved}
            taskList={taskList}
            companyName={companyName}
            user={userDetails}
          />
        )}

        {state && state.adminMenu.currentMenu === "notfications" && (
          <Notifications />
        )}
        {state && state.adminMenu.currentMenu === "settings" && (
          <>
            <div className="d-none d-sm-block">
              <ComplianceOfficerSetting />
            </div>
          </>
        )}
        {state && state.adminMenu.currentMenu === "history" && (
          // {History List}
          <HistoryList />
        )}
        {/* {state && state.adminMenu.currentMenu === "historyFilter" && (
          <HistoryFilter />
        )} */}
        {state && state.adminMenu.currentMenu === "new-regulations" && (
          <NewRegulations />
        )}
        {state && state.adminMenu.currentMenu === "help" && <HelpSection />}
      </div>
    </div>
  );
}

export default withRouter(Dashboard);
