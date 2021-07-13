import React from "react";
import moment from "moment";
import "./style.css";
import { getIntialName } from "../../../CommonModules/helpers/GetIntialName.helper";
import constant from "../../../CommonModules/sharedComponents/constants/constant";

const MonthView = ({
  months,
  goToDateWeek,
  monthDate,
  monthData,
  getSelectTaskDetails,
}) => {
  const moveToWeek = (day) => {
    goToDateWeek(day);
  };

  const viewDetail = (TaskId) => {
    const task = { TaskId };
    getSelectTaskDetails(task);
  };

  return (
    <div className="calender">
      {constant.Weeks.map((day) => (
        <div className="day-name">{day}</div>
      ))}

      {months.map((day) => {
        const todayDate = moment(new Date()).format("YYYY-MM-DD");
        const month = moment(day).format("MMMM");
        const currentMonth = moment(monthDate).format("MMMM");
        const currentDay = moment(day).format("D");
        const compareDate = moment(day).format("YYYY-MM-DD");

        const list = monthData.filter(({ EndDate }) => EndDate === compareDate);

        return (
          <div
            className={month === currentMonth ? "day" : "day-disable"}
            onClick={() => moveToWeek(day)}
          >
            <p
              className={
                todayDate === compareDate ? "active-date" : "inactive-date"
              }
            >
              {currentDay}
            </p>
            {month === currentMonth && list && list[0]?.LicenseCode && (
              <>
                <div className="button-code">
                  {list[0]?.LicenseCode}
                  <div className="tooltip-container">
                    <h2 className="tooltip-title">{list[0]?.TaskName}</h2>
                    <div className="tooltip-company-detail">
                      <span className="tooltip-compant-name">
                        {list[0]?.EntityName}
                      </span>
                      <p>
                        <span className="circle-dp-tooltip">
                          {getIntialName(list[0]?.AssignedName)}
                        </span>{" "}
                        <span className="user-name-tooltip">
                          {list[0]?.AssignedName}
                        </span>
                      </p>
                    </div>

                    <button
                      className="tooltip-view-detail-button"
                      onClick={() => viewDetail(list[0]?.TaskId)}
                    >
                      View Detail
                    </button>
                  </div>
                </div>
              </>
            )}

            {month === currentMonth && list && list[1]?.LicenseCode && (
              <>
                <div className="button-code">
                  {list[1]?.LicenseCode}
                  <div className="tooltip-container">
                    <h2 className="tooltip-title">{list[1]?.TaskName}</h2>
                    <div className="tooltip-company-detail">
                      <span className="tooltip-compant-name">
                        {list[1]?.EntityName}
                      </span>
                      <p>
                        <span className="circle-dp-tooltip">
                          {getIntialName(list[1]?.AssignedName)}
                        </span>{" "}
                        <span className="user-name-tooltip">
                          {list[1]?.AssignedName}
                        </span>
                      </p>
                    </div>

                    <button
                      className="tooltip-view-detail-button"
                      onClick={() => viewDetail(list[1]?.TaskId)}
                    >
                      View Detail
                    </button>
                  </div>
                </div>
              </>
            )}

            {month === currentMonth && list && list.length > 2 && (
              <button className="view-more">
                View {parseInt(list.length - 2)} More{" "}
                {parseInt(list.length - 2) < 1 ? "Tasks" : "Task"}{" "}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MonthView;
