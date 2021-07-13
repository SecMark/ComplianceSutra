import React from "react";
import moment from "moment";
import "./style.css";

const WeekView = ({ sevenDays, weekData, goToDateDay }) => {
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
                  (details) => details.EndDate == startDate
                );

                return (
                  <td>
                    {filterList.map((list) => (
                      <div
                        className="week-main"
                        onClick={() => moveToDay(list?.EndDate)}
                      >
                        <div className="week-detail">
                          <button className="license-code">
                            {list?.LicenseCode}
                          </button>
                          <h2>{list?.TaskName}</h2>
                          <button className="approval">Approval Pending</button>
                        </div>
                        <div className="CompanyName">
                          <span>{list?.EntityName}</span>
                        </div>
                        <div>
                          <p className="UserNameDp">
                            <span className="circle-dp">
                              {getNameInitials(list?.AssignedName)}
                            </span>{" "}
                            <span className="user-name">
                              {list?.AssignedName}
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
