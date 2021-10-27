import React from "react";
import moment, { weekdays } from "moment";
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
                const filterList = weekData.filter((details) => {
                  return (
                    moment(details.due_date).format("YYYY-MM-DD") === startDate
                  );
                });

                return (
                  <td>
                    {filterList.map((list) => (
                      <div
                        className="week-main"
                        onClick={() => {
                          if (userDetails && userDetails.UserType !== 6) {
                            moveToDay(list?.due_date);
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
                            {list?.LicenseCode}
                          </button>
                          <h2>{list?.TaskName}</h2>
                          <button
                            className={`${
                              list?.Status === "Approval Pending"
                                ? "approval-day"
                                : list?.status === "Assigned" ||
                                  list?.status === "Approved"
                                ? "assigned-day"
                                : "approval-day"
                            }`}
                          >
                            {" "}
                            {list?.Status === "Approval Pending"
                              ? "Approval Pending"
                              : list?.status === "Approval Pending"
                              ? "Approval Pending"
                              : list?.Status}
                          </button>
                        </div>
                        <div className="CompanyName">
                          <span>{list?.EntityName}</span>
                        </div>
                        {list?.assign_to_name && (
                          <div>
                            <p className="UserNameDp">
                              <span className="circle-dp">
                                {list?.assign_to_name &&
                                  getNameInitials(list?.assign_to_name)}
                              </span>{" "}
                              <span className="user-name">
                                {list?.assign_to_name}
                              </span>
                            </p>
                          </div>
                        )}
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
