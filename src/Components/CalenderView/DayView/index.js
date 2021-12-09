import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import NoResultFound from "../../../CommonModules/sharedComponents/NoResultFound";
import { setNotificationTaskId } from "../../OnBording/SubModules/DashBoardCO/components/notification/Redux/Action";
import { actions as taskReportActions } from "../../OnBording/SubModules/DashBoardCO/redux/actions";
import "./style.css";

const DayView = ({ daysData, userDetails, isRedirect }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const getNameInitials = (name) => {
    if (name !== undefined) {
      let initials = "";
      initials = name
        .split(" ")
        .map((n) => n[0])
        .join("");
      return initials.toUpperCase();
    }
  };
  const getSelectTaskDetails = (task) => {
    dispatch(
      taskReportActions.taskReportByIdRequestSuccess({
        taskReportById: task,
      })
    );

    if (isRedirect) history.push("/dashboard");
  };

  return (
    <div className="detail-main">
      {daysData && daysData.length > 0 ? (
        daysData.map((day) => (
          <div
            className="detail-container align-items-start align-items-md-center flex-column flex-md-row"
            onClick={() => {
              if (userDetails && userDetails.UserType !== 6) {
                getSelectTaskDetails(day);
              }
            }}
            style={{
              pointerEvents: `${
                userDetails && userDetails.UserType === 6 ? "none" : "auto"
              }`,
            }}
          >
            <div className="detail-content flex-column flex-md-row align-items-start align-items-md-center">
              <button className="license-code">{day?.license}</button>
              <h2 className="my-2 my-md-0">{day?.subject}</h2>
              <div className="status-container d-none d-md-block">
                <Link
                  to="/dashboard"
                  className={`${
                    day?.status === "Approval Pending"
                      ? "approval-day"
                      : day?.status === "Assigned" || day?.status === "Approved"
                      ? "assigned-day"
                      : "approval-day"
                  }`}
                  onClick={() => {
                    dispatch(setNotificationTaskId(day?.TaskId));
                  }}
                >
                  {day?.status === "Approval Pending"
                    ? "Approval Pending"
                    : day?.status === "Completed By User"
                    ? "Approval Pending"
                    : day?.status}
                </Link>
              </div>
              <button
                className={`${
                  day?.status === "Assign" ? "assigned-day" : "approval-day"
                } d-block d-md-none`}
              >
                {day?.status === "Assign" ? "Assigned" : "Approval Pending"}
              </button>
            </div>
            <div className="d-flex justify-content-between detail-footer">
              <div className="detail-name">
                <span>{day?.customer_name}</span>
              </div>
              {day?.assign_to_name && (
                <div className="detail-name align-left-always">
                  <p>
                    <span className="circle-dp">
                      {day?.assign_to_name &&
                        getNameInitials(day?.assign_to_name)}
                    </span>{" "}
                    <span className="user-name">{day?.assign_to_name}</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <NoResultFound text="No tasks for today" />
      )}
    </div>
  );
};

export default DayView;
