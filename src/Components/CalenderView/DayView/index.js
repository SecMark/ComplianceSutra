import React from "react";
import NoResultFound from "../../../CommonModules/sharedComponents/NoResultFound";
import "./style.css";

const DayView = ({ daysData }) => {
    
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

  return (
    <div className="detail-main">
      {daysData && daysData.length > 0 ? (
        daysData.map((day) => (
          <div className="detail-container">
            <div className="detail-content">
              <button className="license-code">{day?.LicenseCode}</button>
              <h2>{day?.TaskName}</h2>
              <button
                className={
                  day?.Status === "Assign" ? "assigned-day" : "approval-day"
                }
              >
                {day?.Status === "Assign" ? "Assigned" : "Approval Pending"}
              </button>
            </div>
            <div className="detail-name">
              <span>{day?.EntityName}</span>
            </div>
            <div className="detail-name">
              <p>
                <span className="circle-dp">
                  {getNameInitials(day?.AssignedName)}
                </span>{" "}
                <span className="user-name">{day?.AssignedName}</span>
              </p>
            </div>
          </div>
        ))
      ) : (
        <NoResultFound text="No detail found" />
      )}
    </div>
  );
};

export default DayView;
