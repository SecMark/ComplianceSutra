import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import NoResultFound from "../../../CommonModules/sharedComponents/NoResultFound";
import { setNotificationTaskId } from "../../OnBording/SubModules/DashBoardCO/components/notification/Redux/Action";
import "./style.css";

const DayView = ({ daysData, userDetails }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const getNameInitials = (name) => {
    if (name != undefined) {
      let initials = "";
      initials = name
        .split(" ")
        .map((n) => n[0])
        .join("");
      return initials.toUpperCase();
    }
  };

  const openTaskDetail = (TaskId) => {
    dispatch(setNotificationTaskId(TaskId));
    history.push("/dashboard");
  };

  return (
    <div className="detail-main">
      {daysData && daysData.length > 0 ? (
        daysData.map((day) => (
          <div
            className="detail-container align-items-start align-items-md-center flex-column flex-md-row"
            onClick={() => {
              if (userDetails && userDetails.UserType !== 6) {
                openTaskDetail(day?.TaskId);
              }
            }}
            style={{
              pointerEvents: `${
                userDetails && userDetails.UserType === 6 ? "none" : "auto"
              }`,
            }}
          >
            <div className="detail-content flex-column flex-md-row align-items-start align-items-md-center">
              <button className="license-code">{day?.LicenseCode}</button>
              <h2 className="my-2 my-md-0">{day?.TaskName}</h2>
              <div className="status-container d-none d-md-block">
                <Link
                  to="/dashboard"
                  className={`${
                    day?.Status === "Approval Pending"
                      ? "approval-day"
                      : day?.Status == "Assigned" || day?.Status == "Approved"
                      ? "assigned-day"
                      : "approval-day"
                  }`}
                  onClick={() => {
                    dispatch(setNotificationTaskId(day?.TaskId));
                  }}
                >
                  {day?.Status === "Approval Pending"
                    ? "Approval Pending"
                    : day?.Status === "Completed By User"
                    ? "Approval Pending"
                    : day?.Status}
                </Link>
              </div>
              <button
                className={`${
                  day?.Status === "Assign" ? "assigned-day" : "approval-day"
                } d-block d-md-none`}
              >
                {day?.Status === "Assign" ? "Assigned" : "Approval Pending"}
              </button>
            </div>
            <div className="d-flex justify-content-between detail-footer">
              <div className="detail-name">
                <span>{day?.EntityName}</span>
              </div>
              <div className="detail-name align-left-always">
                <p>
                  <span className="circle-dp">
                    {getNameInitials(day?.AssignedName)}
                  </span>{" "}
                  <span className="user-name">{day?.AssignedName}</span>
                </p>
              </div>
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
