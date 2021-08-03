import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SideBarInputControl from "../../../../components/LeftSideBar";
import TaskListView from "./RightSideView";
import Cobg from "../../../../../../../../assets/Images/Onboarding/co-bg.png";
import { actions as taskReportActions } from "../../../../redux/actions";
import { withRouter } from 'react-router-dom';
import QuickOverViewSection from "../../quickOverview";
function DashBoardView({ history }) {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    const [isTaskListOpen, setIsTaskListOpen] = useState(false);

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

    const userID = state && state.auth && state.auth.loginInfo && state.auth.loginInfo.UserID

    const userDetails =
        state &&
        state.auth &&
        state.auth.loginInfo;

    const companyName =
        state &&
        state.complianceOfficer &&
        state.complianceOfficer.personalInfo &&
        state.complianceOfficer.personalInfo.formDataPersonalData &&
        state.complianceOfficer.personalInfo.formDataPersonalData.entityName;
        
    useEffect(() => {
        if (userID === undefined) {
            history.push("/login")
        }
    }, [])
    useEffect(() => {
        dispatch(
            taskReportActions.taskReportRequest(
                {
                    userID: userDetails.UserID,
                    usertype: userDetails.UserType
                }
            ),
        )
    }, [state.adminMenu.currentMenu]);

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
            <div>
                <QuickOverViewSection />
            </div>
            <div className="col-12 right-side-bar-new">
                <img className="right-bg" src={Cobg} alt="" />
                {state && state.adminMenu.currentMenu === "dashboard" && (
                    <TaskListView

                    />)}
            </div>
        </div>
    );
}

export default withRouter(DashBoardView);
