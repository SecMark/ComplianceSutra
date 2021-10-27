import React from "react";
import moment from "moment";
import "./style.css";

const WeekView = ({ sevenDays, weekData, goToDateDay, userDetails }) => {
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

  const moveToDay = (date) => {
    goToDateDay(date);
  };

  return (
    <div className="detail-main">
      <table className="table co-company-details-tbl table_legenda week-table">
        <thead>
          <tr>
            {sevenDays.map((day) => (
              <th key={day?.day}>{day?.day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {sevenDays &&
              sevenDays.map((data) => {
               
                const startDate = moment(data?.date).format("YYYY-MM-DD");
                const filterList = weekData.filter(
                  (details) => { 
                    return moment(details.deadline_date).format("YYYY-MM-DD") == startDate
                  });

                return (
                  <td>
                    {filterList.map((list) => (
                      <div
                        className="week-main"
                        onClick={() => {
                          if (userDetails && userDetails.UserType !== 6) {
                            moveToDay(list?.EndDate);
                          }
                        }}
                        style={{
                          pointerEvents: `${
                            userDetails && userDetails.UserType === 6
                              ? "none"
                              : "auto"
                          }`,
                        }}
                      >
                        <div className="week-detail">
                          <button className="license-code">
                            {list?.license}
                          </button>
                          <h2>{list?.task_name}</h2>
                          <button
                            className={`${
                              list?.status === "Approval Pending"
                                ? "approval-day"
                                : list?.Status == "Assigned" ||
                                  list?.Status == "Approved"
                                ? "assigned-day"
                                : "approval-day"
                            }`}
                          >
                            {" "}
                            {list?.status === "Approval Pending"
                              ? "Approval Pending"
                              : list?.status === "Completed By User"
                              ? "Approval Pending"
                              : list?.status}
                          </button>
                        </div>
                        <div className="CompanyName">
                          <span>{list?.customer_name}</span>
                        </div>
                        <div>
                          <p className="UserNameDp">
                            <span className="circle-dp">
                              {getNameInitials(list?.customer_name)}
                            </span>{" "}
                            <span className="user-name">
                              {list?.assign_to_name}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </td>
                );
              })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WeekView;
