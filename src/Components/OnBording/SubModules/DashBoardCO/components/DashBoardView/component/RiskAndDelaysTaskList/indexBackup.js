import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions as taskReportActions } from "../../../../redux/actions";
import { withRouter } from "react-router-dom";
function RiskAndDelayTaskList({ history }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

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
    dispatch(
      taskReportActions.taskReportRequest({
        userID: userDetails.UserID,
        usertype: userDetails.UserType,
      })
    );
  }, [state.adminMenu.currentMenu]);

  return (
    <>
      <div className="d-flex mobile-height-dasboardView">
        <div className="companies-sub-title w-25 d-none d-sm-block"></div>
      </div>
    </>
  );
}

export default withRouter(RiskAndDelayTaskList);
