import moment from "moment";
import React from "react";
import constant from "../../../CommonModules/sharedComponents/constants/constant";
import Task from "./Task";

const MonthView = ({ months, goToDateWeek, monthDate, monthData }) => {
  return (
    <>
      <div className="pm-calender-view__month">
        {constant.Weeks.map((day, index) => (
          <p
            className={`${
              index === 0
                ? "pm-calender-view__header-left"
                : index === 6 && "pm-calender-view__header-right"
            }  pm-calender-view__month-header pm-calender-view__display-text pm-data__text text-center mb-0`}
          >
            {day}
          </p>
        ))}
        {months.map((day, index) => {
          const todayDate = moment(new Date()).format("YYYY-MM-DD");
          const month = moment(day).format("MMMM");
          const currentMonth = moment(monthDate).format("MMMM");
          const currentDay = moment(day).format("D");
          const compareDate = moment(day).format("YYYY-MM-DD");
          return (
            <div
              className="pm-calender-view__date-box"
              style={{
                ...(month !== currentMonth && { opacity: "0.3" }),
              }}
            >
              <div
                className={`pm-calender-view__date  mb-2 ${
                  todayDate !== compareDate
                    ? "pm-data__container"
                    : "pm-data__active"
                }`}
              >
                <span className={todayDate !== compareDate && "pm-data__text"}>
                  {currentDay}
                </span>
              </div>
              <Task
                containerClass="mb-2"
                background={index % 2 === 0 && "light"}
              />
              {index % 3 === 0 && <Task containerClass="mb-2" />}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MonthView;
