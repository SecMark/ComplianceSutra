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
  isSmallCalenderOpen,
  userDetails,
}) => {
  const moveToWeek = (day) => {
    goToDateWeek(day);
  };

  const viewDetail = (TaskId) => {
    const task = { TaskId };
    getSelectTaskDetails(task);
  };
  return (
    <>
      <div className="calender-container">
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

            const list = monthData.filter(
              ({ EndDate }) => EndDate === compareDate
            );

            return (
              <div
                className={month === currentMonth ? "day" : "day-disable"}
                onClick={() => {
                  if (userDetails && userDetails.UserType !== 6) {
                    moveToWeek(day);
                  }
                }}
                style={{
                  pointerEvents: `${
                    userDetails && userDetails.UserType === 6 ? "none" : "auto"
                  }`,
                }}
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
                          onClick={() => {
                            if (userDetails && userDetails.UserType !== 6) {
                              viewDetail(list[0]?.TaskId);
                            }
                          }}
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
                          onClick={() => {
                            if (userDetails.UserType !== 6) {
                              viewDetail(list[1]?.TaskId);
                            }
                          }}
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
      </div>
      <div className="calender-mobile d-block d-md-none">
        {isSmallCalenderOpen && (
          <div className="small-calender-mobile">
            {constant.Weeks.map((day) => (
              <div className="small-calender-day-name">{day[0]}</div>
            ))}
            {months.map((day) => {
              const todayDate = moment(new Date()).format("YYYY-MM-DD");
              const month = moment(day).format("MMMM");
              const currentMonth = moment(monthDate).format("MMMM");
              const currentDay = moment(day).format("D");
              const compareDate = moment(day).format("YYYY-MM-DD");
              return (
                <div
                  className={`${
                    month === currentMonth
                      ? "small-calender-day"
                      : "small-calender-day-disable"
                  } d-flex align-items-center justify-content-center`}
                  onClick={() => {
                    if (userDetails && userDetails.UserType !== 6) {
                      moveToWeek(day);
                    }
                  }}
                >
                  <p
                    className={
                      todayDate === compareDate
                        ? "small-calender-active-date"
                        : "small-calender-inactive-date"
                    }
                  >
                    {currentDay}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {months
          .filter((day) => {
            return (
              moment(day).format("MMMM") === moment(monthDate).format("MMMM")
            );
          })
          .map((day) => {
            const todayDate = moment(new Date()).format("YYYY-MM-DD");
            const compareDate = moment(day).format("YYYY-MM-DD");
            const currentDayName = moment(day).format("ddd");
            const currentDay = moment(day).format("DD");
            const list = monthData.filter(
              ({ EndDate }) => EndDate === compareDate
            );
            return (
              <div
                className="calender-mobile-item d-flex align-items-center"
                style={{
                  pointerEvents: `${
                    userDetails && userDetails.UserType === 6 ? "none" : "auto"
                  }`,
                }}
              >
                <div className="left d-flex flex-column justify-content-center align-items-center">
                  <div
                    className={`${
                      todayDate === compareDate && "current-day"
                    } d-flex justify-content-center align-items-center`}
                  >
                    <h5
                      className="m-0"
                      style={{
                        color: todayDate === compareDate && "#fff",
                        fontWeight: !(todayDate === compareDate) && "600",
                      }}
                    >
                      {currentDay}
                    </h5>
                  </div>
                  <p className="my-0">{currentDayName}</p>
                </div>
                <div className="right">
                  {list && list[0]?.LicenseCode && (
                    <>
                      <div
                        className="right-item d-flex align-items-center"
                        onClick={() => {
                          if (userDetails && userDetails.UserType !== 6) {
                            viewDetail(list[0]?.TaskId);
                          }
                        }}
                      >
                        <div className="button-code m-0">
                          {list[0]?.LicenseCode}
                        </div>
                        <h6 className="right-item-task-name mb-0">
                          {list[0]?.TaskName}
                        </h6>
                      </div>
                    </>
                  )}

                  {list && list[0]?.LicenseCode && (
                    <>
                      <div
                        className="right-item d-flex align-items-center"
                        onClick={() => {
                          if (userDetails && userDetails.UserType !== 6) {
                            viewDetail(list[0]?.TaskId);
                          }
                        }}
                      >
                        <div className="button-code m-0">
                          {list[0]?.LicenseCode}
                        </div>
                        <h6 className="right-item-task-name mb-0">
                          {list[0]?.TaskName}
                        </h6>
                      </div>
                    </>
                  )}

                  {list && list.length > 2 && (
                    <button
                      className="view-more"
                      onClick={() => {
                        if (userDetails && userDetails.UserType !== 6) {
                          moveToWeek(day);
                        }
                      }}
                    >
                      View {parseInt(list.length - 2)} More{" "}
                      {parseInt(list.length - 2) < 1 ? "Tasks" : "Task"}{" "}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default MonthView;
