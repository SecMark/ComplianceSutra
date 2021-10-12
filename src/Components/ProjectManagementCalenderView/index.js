import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdKeyboardArrowLeft } from "react-icons/md";
import {
  addDaysInDate,
  getMondays,
  subtractDaysInDate,
} from "../../CommonModules/helpers/Date.helper";
import constant from "../../CommonModules/sharedComponents/constants/constant";
import DateFilters from "./components/DateFilters";
import Task from "./components/Task";
import "./style.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import DayView from "./components/DayView";
import WeekView from "./components/WeekView";
import MonthView from "./components/MonthView";
const ProjectManagementCalender = () => {
  const [taskDisplay, setTaskDisplay] = useState("calender");
  const [activeDays, setActiveDays] = useState(constant.month);
  const [dayDate, setDayDate] = useState(new Date());
  const [monthDate, setMonthDate] = useState(new Date());
  const [headerHeight, setHeaderHight] = useState(0);
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [sevenDays, setSevenDays] = useState([]);
  const [months, setMonths] = useState([]);

  //   const state = useSelector((state) => state); // state
  //   const dispatch = useDispatch(); // dispatch
  //   const userDetails = state && state.auth && state.auth.loginInfo;
  //   const { daysData, weekData, monthData } = state.CalenderReducer;
  const [isShowSmallCalender, setIsShowSmallCalender] = useState(false);
  const viewBy = [
    {
      id: 1,
      value: constant.day,
      name: "By Day",
    },
    {
      id: 2,
      value: constant.week,
      name: "By Week",
    },
    {
      id: 3,
      value: constant.month,
      name: "By Month",
    },
  ];

  useEffect(() => {
    const headerRef = document
      .querySelector(".pm-calender-view__header")
      .getClientRects()[0].height;
    setHeaderHight(Math.trunc(headerRef));
  }, [activeDays]);
  //Get Days from start date to end date.
  const getDays = () => {
    const days = [];
    setSevenDays([]);
    for (let index = 0; index < 7; index++) {
      const day = {
        day: moment(addDaysInDate(weekStartDate, index)).format("ddd D"),
        date: moment(addDaysInDate(weekStartDate, index)).format(),
      };
      days.push(day);
    }
    setSevenDays(days);
  };

  //Set Days based on day(day,week and month) type based on type(increment/decrement).
  const setDays = (activeDay, incrementType) => {
    if (activeDay === constant.week) {
      if (incrementType === constant.increment) {
        const date = addDaysInDate(weekStartDate, 7);
        setWeekStartDate(date);
      } else {
        const date = subtractDaysInDate(weekStartDate, 7);
        setWeekStartDate(date);
      }
    } else if (activeDay === constant.day) {
      if (incrementType === constant.increment) {
        const date = addDaysInDate(dayDate, 1);
        setDayDate(date);
      } else {
        const date = subtractDaysInDate(dayDate, 1);
        setDayDate(date);
      }
    } else {
      getMonths(incrementType);
    }
  };
  //Get Full Month
  const getMonths = (increment) => {
    const date = monthDate;
    let firstDayOfCurrentMonth, lastDayOfCurrentMonth, newDate;
    let listOfDate = [];

    if (increment === constant.increment) {
      newDate = new Date(date.setMonth(date.getMonth() + 1));
    } else if (increment === constant.decrement) {
      newDate = new Date(date.setMonth(date.getMonth() - 1));
    } else {
      newDate = new Date();
    }
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

    let endDate = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0);
    setMonthDate(newDate);
    setMonths(listOfDate);
  };

  useEffect(() => {
    getDays();
    getMonths();
  }, [weekStartDate]);

  return (
    <div className="pm-calender-view">
      <div className="pm-calender-view__container px-4">
        <div className="pm-calender-view__header pt-4 w-100 d-flex align-items-center justify-content-between flex-column">
          <div className="w-100 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <MdKeyboardArrowLeft className="pm-calender-view__header-navigation" />
              <p className="ml-2 mr-3 mb-0 pm-calender-view__header-title">
                Calender
              </p>
              <div className="pm-data__container pm-date__container d-flex align-items-center justify-content-between">
                <AiOutlineLeft
                  className="pm-data__active pm-calender-view__header-navigation--arrow"
                  style={{ marginRight: "12px" }}
                  onClick={() => setDays(activeDays, constant.decrement)}
                />
                {activeDays === constant.day && (
                  <span className="pm__date-filter-text">
                    {moment(dayDate).format("MMMM D,  ddd")}
                  </span>
                )}

                {activeDays === constant.week && (
                  <span className="pm__date-filter-text">
                    {`${moment(weekStartDate).format("ddd D")}-${moment(
                      addDaysInDate(weekStartDate, 7)
                    ).format("ddd D,YYYY")}`}
                  </span>
                )}

                {activeDays === constant.month && (
                  <span
                    className="pm__date-filter-text"
                    // onClick={() => setIsShowSmallCalender(!isShowSmallCalender)}
                    style={{ cursor: "pointer" }}
                  >
                    {`${moment(monthDate).format("MMMM")}`}
                  </span>
                )}

                <AiOutlineRight
                  className="pm-data__active pm-calender-view__header-navigation--arrow"
                  style={{ marginLeft: "12px" }}
                  onClick={() => setDays(activeDays, constant.increment)}
                />
              </div>
            </div>
            <DateFilters
              filters={[constant.day, constant.week, constant.month]}
              currentFilter={activeDays}
              setDateFilter={setActiveDays}
            />
          </div>
          <div className="d-flex w-100 mt-3 align-items-start">
            {["project", "task", "calender"].map((display) => (
              <p
                onClick={() => setTaskDisplay(display)}
                className={`mb-0 pm-calender-view__display-text mr-4 px-1 text-center ${
                  taskDisplay === display &&
                  "pm-data__text pm-calender-view__container--active"
                }`}
              >
                {display}
              </p>
            ))}
          </div>
        </div>
        <div
          className="pm-calender-view__main mt-3"
          style={{
            height: `calc(90vh - ${headerHeight + 16}px)`,
          }}
        >
          {activeDays === constant.day && <DayView />}
          {activeDays === constant.week && <WeekView sevenDays={sevenDays} />}
          {activeDays === constant.month && (
            <MonthView months={months} monthDate={monthDate} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectManagementCalender;
