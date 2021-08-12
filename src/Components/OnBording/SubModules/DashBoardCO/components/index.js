import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import SideBarInputControl from "../components/LeftSideBar";
import RighSider from "../components/RightSideGrid";
import Cobg from "../../../../../assets/Images/Onboarding/co-bg.png";
import { actions as taskReportActions } from "../redux/actions";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import ComplianceOfficerSetting from "../components/CoSetting";
import Notifications from "../components/notification";
import { actions as adminMenuActions } from "../MenuRedux/actions";
import NewRegulations from "../../../../NewRegulationModule/NewRegulations";
import HistoryList from "../../../../HistoryModule/HistoryList";
import HelpSection from "../../../../HelpSection/Help";
import SingleNotification from "../../../../../CustomNotification/SingleNotification";
import api from "../../../../../../src/apiServices";
import MultipleNotification from "../../../../../CustomNotification/MultipleNotification";
// import HistoryFilter from "../../../../HistoryModule/HistoryFilter";

function Dashboard({ history }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const toastId = React.useRef(null);

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
    setIsTaskListOpen(false);
  }, []);

  useEffect(() => {
    if (userID === undefined) {
      history.push("/login");
    }
  }, []);

  useEffect(() => {
    if (state.adminMenu.currentMenu !== "taskList") setIsTaskListOpen(false);
  }, []);

  useEffect(() => {
    dispatch(
      taskReportActions.taskReportRequest({
        entityid: "",
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
    try {
      let notificationArr = [];
      const payload = {
        userID: userID,
      };
      api
        .post("/api/Notifications", payload)
        .then(function (response) {
          console.log(response);
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
                  />
                );
              } else {
                toast.success(
                  <MultipleNotification
                    id={toastId.current}
                    toast={toast}
                    notificationCount={notificationArr.length}
                  />
                );
              }
            } else {
            }
          } else {
          }
        })
        .catch(function (error) {
          if (error) {
            console.log(error);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

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
