import React, { useEffect, useState } from "react";
import Task from "./Task";
import constant from "../../../CommonModules/sharedComponents/constants/constant";
import moment from "moment";
import {
  addDaysInDate,
  getMondays,
  subtractDaysInDate,
} from "../../../CommonModules/helpers/Date.helper";
const DayView = ({ monthDate, isShowCalender, dayDate }) => {
  const [listOfDays, setListOfDays] = useState([]);
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());

  const getListOfDaysInMonth = () => {
    let firstDayOfCurrentMonth, lastDayOfCurrentMonth;
    let listOfDate = [];
    let newDate = currentMonthDate;

    const listOfMondays = getMondays(newDate);

    firstDayOfCurrentMonth = parseInt(moment(listOfMondays[0]).format("D"));
    lastDayOfCurrentMonth = moment(
      new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0)
    ).format("D");

    if (firstDayOfCurrentMonth <= 7 && firstDayOfCurrentMonth !== 1) {
      let counter = 1;
      for (
        let index = firstDayOfCurrentMonth;
        index < firstDayOfCurrentMonth + 7;
        index++
      ) {
        const date = moment(listOfMondays[0]).format();
        const newDate = subtractDaysInDate(date, counter);
        listOfDate.push(newDate);
        counter++;
      }
      listOfDate.reverse();
    }

    let counter = 0;

    for (
      let index = firstDayOfCurrentMonth;
      index <= lastDayOfCurrentMonth;
      index++
    ) {
      const date = moment(listOfMondays[0]).format();
      const newDate = addDaysInDate(date, counter);
      listOfDate.push(newDate);
      counter++;
    }
    setListOfDays(listOfDate);
  };

  useEffect(() => {
    getListOfDaysInMonth();
  }, []);
  return (
    <>
      {isShowCalender && (
        <div className="pm-calender-view__month">
          {constant.Weeks.map((day, index) => (
            <>
              <p
                className={`${
                  index === 0
                    ? "pm-calender-view__month-header-left"
                    : index === 6 && "pm-calender-view__month-header-right"
                } d-block d-md-none pm-calender-view__month-header pm-calender-view__display-text pm-data__text text-center mb-0`}
              >
                {day[0]}
              </p>
            </>
          ))}
          {listOfDays.map((day, index) => {
            const todayDate = moment(new Date()).format("YYYY-MM-DD");
            const month = moment(day).format("MMMM");
            const currentMonth = moment(monthDate).format("MMMM");
            const currentDay = moment(day).format("D");
            const compareDate = moment(day).format("YYYY-MM-DD");
            return (
              <>
                <div
                  className="d-md-none pm-calender-view__date-box"
                  style={{
                    ...(month === currentMonth && { opacity: "0.3" }),
                  }}
                >
                  <div
                    className={`pm-calender-view__date mb-md-2 mb-0 ${
                      todayDate !== compareDate
                        ? "pm-data__container"
                        : "pm-data__active"
                    }`}
                  >
                    <span
                      className={todayDate !== compareDate && "pm-data__text"}
                    >
                      {currentDay}
                    </span>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      )}
      <div className="pm-calender-view__day">
        <Task background="light" />
        <Task />
        <Task background="light" />
        <Task />
        <Task background="light" />
        <Task />
        <Task background="light" />
        <Task />
        <Task background="light" />
        <Task />
        <Task background="light" />
        <Task />
      </div>
    </>
  );
};

export default DayView;
