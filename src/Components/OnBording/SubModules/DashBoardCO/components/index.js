import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import SideBarInputControl from "../components/LeftSideBar";
import RighSider from "../components/RightSideGrid";
import HistoryFilter from "../../../../../Components/HistoryModule/HistoryFilter/index";
import HistoryList from "../../../../../Components/HistoryModule/HistoryList/index";
import NewRegulations from "../../../../../Components/NewRegulationModule/NewRegulations/index";
import HelpSection from "../../../../../Components/HelpSection/Help";
import Cobg from "../../../../../assets/Images/Onboarding/co-bg.png";
import { actions as taskReportActions } from "../redux/actions";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import ComplianceOfficerSetting from "../components/CoSetting";
import Notifications from "../components/notification";
import MobileSettingSideBar from "./CoSetting/MobileSettingSideBar";
import { actions as adminMenuActions } from "../MenuRedux/actions";
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
      window.location.href.includes("compliance-history-list") &&
      window.location.hash === "#/compliance-history-list" &&
      state.adminMenu.currentMenu !== "complianceHistoryList"
    ) {
      dispatch(adminMenuActions.setCurrentMenu("complianceHistoryList"));
      return;
    } else if (
      window.location.href.includes("compliance-history") &&
      window.location.hash === "#/compliance-history" &&
      state.adminMenu.currentMenu !== "historyFilter"
    ) {
      dispatch(adminMenuActions.setCurrentMenu("historyFilter"));
      return;
    } else if (
      window.location.href.includes("new-regulations") &&
      state.adminMenu.currentMenu !== "newRegulations"
    ) {
      dispatch(adminMenuActions.setCurrentMenu("newRegulations"));
    } else if (
      window.location.href.includes("help") &&
      state.adminMenu.currentMenu !== "Help"
    ) {
      dispatch(adminMenuActions.setCurrentMenu("Help"));
    } else if (
      window.location.href.includes("notifications") &&
      state.adminMenu.currentMenu !== "notfications"
    ) {
      dispatch(adminMenuActions.setCurrentMenu("notfications"));
    }
  }, []);

  return (
    <div className="row co-dashboard">
      <div className=" left-fixed ">
        <div className="on-boarding">
          <SideBarInputControl
            isTaskListOpen={isTaskListOpen}
            setIsTaskListOpen={setIsTaskListOpen}
          />
        </div>
      </div>
      {/* <div className="task-wrapper"> */}
      <div>
      <img className="right-bg" src={Cobg} alt="" />
        <div className="col-12 ">
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
              {/* <div className="d-block d-sm-none">
            </div> */}
            </>
          )}
          {state && state.adminMenu.currentMenu === "complianceHistoryList" && (
            // {History List}
            <HistoryList />
          )}
          {state && state.adminMenu.currentMenu === "historyFilter" && (
            // {History Filter}
            <HistoryFilter />
          )}
          {state && state.adminMenu.currentMenu === "newRegulations" && (
            <NewRegulations />
          )}
          {state && state.adminMenu.currentMenu === "Help" && <HelpSection />}
        </div>
      </div>
    </div>
  );
}

export default withRouter(Dashboard);
