import moment from "moment";
import React, { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import constant from "../../../CommonModules/sharedComponents/constants/constant";
import NoResultFound from "../../../CommonModules/sharedComponents/NoResultFound";
import DayView from "../DayView";
import {
  clearState,
  getDayData,
  getMonthData,
  getWeekData,
} from "../redux/actions";
import WeekView from "../WeekView";
import "./style.css";

const View = () => {
  const [activeDays, setActiveDays] = useState(constant.day);
  const [dayDate, setDayDate] = useState(new Date());
  const [monthDate, setMonthDate] = useState(new Date());

  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [sevenDays, setSevenDays] = useState([]);
  const [months, setMonths] = useState([]);
  const [weekDataList, setWeekDataList] = useState([]);

  const state = useSelector((state) => state); // state
  const dispatch = useDispatch(); // dispatch

  const { daysData, weekData, monthData } = state.CalenderReducer;

  useEffect(() => {
    getDays();
    getMonths();
  }, []);

  useEffect(() => {
    getDays();
    dispatch(clearState());
    fetchWeekData();
  }, [weekStartDate]);

  useEffect(() => {
    dispatch(clearState());
    fetchDayData();
  }, [dayDate]);

  useEffect(() => {
    fetchDayData();
    fetchWeekData();
  }, [state.auth.loginInfo?.UserID]);

  const getDays = () => {
    const days = [];
    setSevenDays([]);
    for (let index = 0; index < 7; index++) {
      const day = {
        day: moment(weekStartDate).add(index, "days").format("ddd D"),
        date: moment(weekStartDate).add(index, "days").format(),
      };
      days.push(day);
    }
    setSevenDays(days);
  };

  const setDays = (activeDay, incrementType) => {
    if (activeDay === constant.week) {
      if (incrementType === constant.increment) {
        const date = moment(weekStartDate).add(7, "days").format();
        setWeekStartDate(date);
      } else {
        const date = moment(weekStartDate).subtract(7, "days").format();
        setWeekStartDate(date);
      }
    } else if (activeDay === constant.day) {
      if (incrementType === constant.increment) {
        const date = moment(dayDate).add(1, "days");
        setDayDate(date);
      } else {
        const date = moment(dayDate).subtract(1, "days");
        setDayDate(date);
      }
    } else {
      getMonths(incrementType);
    }
  };

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
    const getFirstMondayOfMonth = getMondays(newDate);

    firstDayOfCurrentMonth = parseInt(
      moment(getFirstMondayOfMonth[0]).format("D")
    );

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
        const date = moment(getFirstMondayOfMonth[0]).format();
        const newDate = moment(date).subtract(counter, "days").format();
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
      const date = moment(getFirstMondayOfMonth[0]).format();
      const newDate = moment(date).add(counter, "days").format();
      listOfDate.push(newDate);
      counter++;
    }

    let endDate = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0);
    setMonthDate(newDate);
    setMonths(listOfDate);
    fetchMonthData(endDate);
  };

  const getMondays = (date) => {
    let d = new Date(date),
      month = d.getMonth(),
      mondays = [];
    d.setDate(1);
    // Get the first Monday in the month
    while (d.getDay() !== 1) {
      d.setDate(d.getDate() + 1);
    }
    // Get all the other Mondays in the month
    while (d.getMonth() === month) {
      mondays.push(new Date(d.getTime()));
      d.setDate(d.getDate() + 7);
    }
    return mondays;
  };

  const fetchDayData = () => {
    const dayPayload = {
      userID: state.auth.loginInfo?.UserID,
      EntityID: "M",
      StartDate: moment(dayDate).format("YYYY-MM-DD"),
      EndDate: moment(dayDate).format("YYYY-MM-DD"),
    };
    dispatch(getDayData(dayPayload));
  };

  const fetchWeekData = () => {
    const dayPayload = {
      userID: state.auth.loginInfo?.UserID,
      EntityID: "M",
      StartDate: moment(weekStartDate).format("YYYY-MM-DD"),
      EndDate: moment(moment(weekStartDate).add(7, "days").format()).format(
        "YYYY-MM-DD"
      ),
    };
    dispatch(getWeekData(dayPayload));
  };

  const fetchMonthData = (endDate) => {
    var date = new Date();
    var startDate = new Date(date.getFullYear(), date.getMonth(), 1);

    const dayPayload = {
      userID: state.auth.loginInfo?.UserID,
      EntityID: "M",
      StartDate: moment(startDate).format("YYYY-MM-DD"),
      EndDate: moment(moment(endDate).format()).format("YYYY-MM-DD"),
    };
    dispatch(getMonthData(dayPayload));
  };

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

  const goToDateWeek = (date) => {
    setWeekStartDate("");
    const newDate = moment(date).format();
    setDays(constant.week, constant.increment);
    setActiveDays(constant.week);
    setWeekStartDate(newDate);
    fetchWeekData();
  };

  const goToDateDay = (date) => {
    setDayDate("");
    const newDate = moment(date).format();
    setDays(constant.day, constant.increment);
    setActiveDays(constant.day);
    setDayDate(newDate);
    fetchDayData();
  };

  return (
    <>
      <div className="date-container">
        <div>
          <AiOutlineLeft
            style={{ marginRight: "10px" }}
            onClick={() => setDays(activeDays, constant.decrement)}
          />
          {activeDays === constant.day && (
            <span className="current-date">
              {moment(dayDate).format("MMMM D,  ddd")}
            </span>
          )}

          {activeDays === constant.week && (
            <span className="current-date">
              {`${moment(weekStartDate).format("ddd D")}-${moment(weekStartDate)
                .add(7, "days")
                .format("ddd D,YYYY")}`}
            </span>
          )}

          {activeDays === constant.month && (
            <span className="current-date">
              {`${moment(monthDate).format("MMMM")}`}
            </span>
          )}

          <AiOutlineRight
            style={{ marginLeft: "10px" }}
            onClick={() => setDays(activeDays, constant.increment)}
          />
        </div>
        <div>
          <button
            className={
              activeDays === constant.day ? "active-day" : "inactive-day"
            }
            onClick={() => setActiveDays(constant.day)}
          >
            Day
          </button>
          <button
            className={
              activeDays === constant.week ? "active-day" : "inactive-day"
            }
            onClick={() => setActiveDays(constant.week)}
          >
            Week
          </button>
          <button
            className={
              activeDays === constant.month ? "active-day" : "inactive-day"
            }
            onClick={() => setActiveDays(constant.month)}
          >
            Month
          </button>
        </div>
      </div>
      {activeDays === constant.day && <DayView daysData={daysData} />}

      {activeDays === constant.week && (
        <WeekView
          sevenDays={sevenDays}
          weekData={weekData}
          goToDateDay={goToDateDay}
        />
      )}

      {activeDays === constant.month && (
        <div className="calender">
          <div className="day-name">Monday</div>
          <div className="day-name">Tuesday</div>
          <div className="day-name">Wednesday</div>
          <div className="day-name">Thrusday</div>
          <div className="day-name">Friday</div>
          <div className="day-name">Saturday</div>
          <div className="day-name">Sunday</div>

          {months.map((day, index) => {
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
                onClick={() => goToDateWeek(day)}
              >
                {currentDay}
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
                              {getNameInitials(list[0]?.AssignedName)}
                            </span>{" "}
                            <span className="user-name-tooltip">
                              {list[0]?.AssignedName}
                            </span>
                          </p>
                        </div>
                        <button className="tooltip-view-detail-button">
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
                              {getNameInitials(list[1]?.AssignedName)}
                            </span>{" "}
                            <span className="user-name-tooltip">
                              {list[1]?.AssignedName}
                            </span>
                          </p>
                        </div>
                        <button className="tooltip-view-detail-button">
                          View Detail
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {month === currentMonth && list && list.length > 2 && (
                  <button className="view-more">
                    View {list.length} More Tasks{" "}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default View;
