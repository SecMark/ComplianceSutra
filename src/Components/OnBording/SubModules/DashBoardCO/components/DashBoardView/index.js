import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../BoardView/style.css";
import SideBarInputControl from "../../components/LeftSideBar";
import TaskListView from "./TaskListView";
import Cobg from "../../../../../../assets/Images/Onboarding/co-bg.png";
import sideBarlogo from "../../../../../../assets/Icons/sideBarlogo.png";
import togglemobile from "../../../../../../assets/Icons/togglemobile.png";
import { actions as taskReportActions } from "../../redux/actions";
import { isMobile } from "react-device-detect";
import { withRouter } from "react-router-dom";
import QuickOverViewSection from "./quickOverview";
import { actions as adminMenuActions } from "../../MenuRedux/actions";
import { actions as notificationActions } from ".././notification/Redux/actions.js";
import TaskListViewMobile from "./TaskListViewMobile";
function DashBoardView({ history }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [isTaskListOpen, setIsTaskListOpen] = useState(false);
  const [isTaskApproved, setIsTaskApproved] = useState(false);
  const [click, setClick] = useState("");
  const [listView, setListView] = useState("0");

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

  const taskIdFromNR =
    state && state.NotificationRedu && state.NotificationRedu.taskID;
  useEffect(() => {
    if (taskIdFromNR !== null) {
      dispatch(notificationActions.setTaskID(null));
    }
  }, []);
  useEffect(() => {
    if (userID === undefined) {
      history.push("/login");
    }
  }, []);
  useEffect(() => {
    dispatch(
      taskReportActions.taskReportRequest({
        userID: userDetails.UserID,
        usertype: userDetails.UserType,
      })
    );
  }, [state.adminMenu.currentMenu]);

  useEffect(() => {
    if (userDetails.UserType === 3) {
      if (window.location.href.includes("dashboard-view")) {
        dispatch(adminMenuActions.setCurrentMenu("dashboard"));
      }
    }
    if (userDetails.UserType === 4) {
      if (window.location.href.includes("dashboard")) {
        dispatch(adminMenuActions.setCurrentMenu("taskList"));
      }
      if (window.location.href.includes("dashboard-view")) {
        dispatch(adminMenuActions.setCurrentMenu("dashboard"));
      }
    }
  }, []);

  const onHBMenu = () => {
    const drawerParent = document.getElementById("sideBarParent");
    const drawerChild = document.getElementById("sideBarChild");
    if (drawerParent) {
      drawerParent.classList.add("overlay");
      drawerChild.style.left = "0%";
    }
  };

  return (
    <div>
      <div className="row dashboard-view-mobile-top">
        <div className="mobile-head d-block d-md-none">
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
            <div className="w-75">
              {" "}
              <img
                className="mobile-logo"
                src={sideBarlogo}
                alt="sideBarlogo"
              />{" "}
            </div>
          </div>
        </div>
      </div>
      <div
        className="row co-dashboard remove-scroll-b"
        style={{ height: "auto" }}
      >
        {!isMobile && (
          <div className="left-fixed d-none d-md-block">
            <div className="on-boarding">
              <SideBarInputControl
                isTaskListOpen={isTaskListOpen}
                setIsTaskListOpen={setIsTaskListOpen}
              />
            </div>
          </div>
        )}
        <div>
          {isMobile ? (
            listView === "0" &&
            click === "" && (
              <QuickOverViewSection
                click={click}
                setClick={setClick}
                setListView={setListView}
                listView={listView}
              />
            )
          ) : (
            <QuickOverViewSection
              click={click}
              setClick={setClick}
              setListView={setListView}
              listView={listView}
            />
          )}
        </div>
        <div className="col-12 right-side-bar-new">
          <img className="right-bg" src={Cobg} alt="" />
          {state && state.adminMenu.currentMenu === "dashboard" && !isMobile ? (
            <TaskListView
              isTaskListOpen={isTaskListOpen}
              setIsTaskListOpen={setIsTaskListOpen}
              isTaskApproved={isTaskApproved}
              setIsTaskApproved={setIsTaskApproved}
              taskList={taskList}
              companyName={companyName}
              user={userDetails}
              click={click}
              setClick={setClick}
              listView={listView}
              setListView={setListView}
            />
          ) : (
            <TaskListViewMobile
              isTaskListOpen={isTaskListOpen}
              setIsTaskListOpen={setIsTaskListOpen}
              isTaskApproved={isTaskApproved}
              setIsTaskApproved={setIsTaskApproved}
              taskList={taskList}
              companyName={companyName}
              user={userDetails}
              click={click}
              setClick={setClick}
              listView={listView}
              setListView={setListView}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default withRouter(DashBoardView);
