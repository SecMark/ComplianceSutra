import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import SideBarInputControl from "../components/LeftSideBar";
import RighSider from "../components/RightSideGrid";
import Cobg from "../../../../../assets/Images/Onboarding/co-bg.png";
import { actions as taskReportActions } from "../redux/actions";
import { withRouter } from "react-router-dom";
import ComplianceOfficerSetting from "../components/CoSetting";
import Notifications from "../components/notification";
import { actions as adminMenuActions } from "../MenuRedux/actions";
import NewRegulations from "../../../../NewRegulationModule/NewRegulations";
import HistoryList from "../../../../HistoryModule/HistoryList";
import HelpSection from "../../../../HelpSection/Help";
// import SingleNotification from "../../../../../CustomNotification/SingleNotification";
// import api from "../../../../../../src/apiServices";
// import MultipleNotification from "../../../../../CustomNotification/MultipleNotification";
import ProjectManagement from "../../../../ProjectManagement";
import ProjectTrash from "../../../../ProjectManagement/Trash";
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

  const userEmail =
    state &&
    state?.auth &&
    state?.auth?.loginInfo &&
    (state?.auth?.loginInfo?.email || state?.auth?.loginInfo?.EmailID);

  const userDetails = state && state.auth && state.auth.loginInfo;

  const companyName =
    state &&
    state.complianceOfficer &&
    state.complianceOfficer.personalInfo &&
    state.complianceOfficer.personalInfo.formDataPersonalData &&
    state.complianceOfficer.personalInfo.formDataPersonalData.entityName;

  useEffect(() => {
    setIsTaskListOpen(false);
  }, []);

  useEffect(() => {
    dispatch(taskReportActions.taskReportRequest());
  }, []);

  useEffect(() => {
    if (!userEmail || !userDetails?.mobileVerified) {
      history.replace("/login");
    }
  }, []);

  useEffect(() => {
    if (state.adminMenu.currentMenu !== "taskList") setIsTaskListOpen(false);
  }, []);

  // useEffect(() => {
  //   if (
  //     userEmail &&
  //     userDetails?.status_response === "Authentication success"
  //   ) {
  //     dispatch(taskReportActions.taskReportRequest());

  // const refreshInterval = setInterval(() => {
  //   dispatch(taskReportActions.taskReportRequest());
  // }, 30000);
  // return () => clearInterval(refreshInterval);
  // } else {
  //history.push("/login");
  // }
  // }, []);
  useEffect(() => {
    if (
      window.location.href.includes("dashboard") &&
      state.adminMenu.currentMenu !== "taskList"
    ) {
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
      window.location.href.includes("new-regulation-quiz") &&
      state.adminMenu.currentMenu !== "new-regulation-quiz"
    ) {
      dispatch(adminMenuActions.setCurrentMenu("new-regulation-quiz"));
      return;
    } else if (
      window.location.href.includes("new-regulations") &&
      state.adminMenu.currentMenu !== "new-regulations"
    ) {
      dispatch(adminMenuActions.setCurrentMenu("new-regulations"));
      return;
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
    } else if (
      window.location.href.includes("project-management") &&
      state.adminMenu.currentMenu !== "project-management"
    ) {
      dispatch(adminMenuActions.setCurrentMenu("project-management"));
    } else if (
      window.location.href.includes("project-trash") &&
      state?.adminMenu.currentMenu !== "project-trash"
    ) {
      dispatch(adminMenuActions.setCurrentMenu("project-trash"));
    }
  }, [window.location.href]);

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
        {/* {state && state.adminMenu.currentMenu === "new-regulation-quiz" && (
          <NewRegulationsQuiz />
        )} */}
        {state && state.adminMenu.currentMenu === "help" && <HelpSection />}
        {state && state.adminMenu.currentMenu === "project-management" && (
          <ProjectManagement />
        )}
        {state && state.adminMenu.currentMenu === "project-trash" && (
          <ProjectTrash />
        )}
      </div>
    </div>
  );
}

export default withRouter(Dashboard);
