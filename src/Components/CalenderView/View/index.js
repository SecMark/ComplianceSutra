import moment from "moment";
import React, { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import constant from "../../../CommonModules/sharedComponents/constants/constant";
import NoResultFound from "../../../CommonModules/sharedComponents/NoResultFound";
import { clearState, getDayData, getWeekData } from "../redux/actions";
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

  const { daysData, weekData } = state.CalenderReducer;

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

  useEffect(() => {
    if (weekData && weekData[0]?.Details) {
      setWeekDataList([]);
      const weeksDataArray = [];
      let counter = 0;
      const startDateDay = parseInt(moment(weekStartDate).format("D"));

      const endDate = parseInt(
        moment(weekStartDate).add(7, "days").format("D")
      );

      for (let index = startDateDay; index < endDate; index++) {
        const startDate = moment(weekStartDate)
          .add(counter, "days")
          .format("YYYY-MM-DD");
          console.log(startDate);

        const data = weekData[0]?.Details.filter(
          (details) => details.EndDate == startDate
        );
        weeksDataArray.push({ values: data });
        counter++;
      }
      setWeekDataList(weeksDataArray);
    }
  }, [weekStartDate]);

  const getDays = () => {
    const days = [];
    setSevenDays([]);
    for (let index = 0; index < 7; index++) {
      const day = moment(weekStartDate).add(index, "days").format("ddd D");
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

    setMonthDate(newDate);
    setMonths(listOfDate);
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
    console.log(date);
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
      {activeDays === constant.day && (
        <div className="detail-main">
          {daysData && daysData[0]?.Details ? (
            daysData[0]?.Details.map((day) => (
              <div className="detail-container">
                <div className="detail-content">
                  <button className="license-code">{day?.LicenseCode}</button>
                  <h2>{day?.TaskName}</h2>
                  <button className="approval-day">Approval Pending</button>
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
      )}

      {activeDays === constant.week && (
        <div className="detail-main">
          <table className="table co-company-details-tbl table_legenda week-table">
            <thead>
              <tr>
                {sevenDays.map((day) => (
                  <th key={day}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {weekDataList &&
                  weekDataList.map((data) => (
                    <td>
                      {data
                        ? data.values.map((list) => (
                            <div
                              className="week-main"
                              onClick={() => goToDateDay(list?.EndDate)}
                            >
                              <div className="week-detail">
                                <button className="license-code">
                                  {list?.LicenseCode}
                                </button>
                                <h2>{list?.TaskName}</h2>
                                <button className="approval">
                                  Approval Pending
                                </button>
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
                          ))
                        : ""}
                    </td>
                  ))}
              </tr>
            </tbody>
          </table>
        </div>
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

            return (
              <div
                className={month === currentMonth ? "day" : "day-disable"}
                onClick={() => goToDateWeek(day)}
              >
                {currentDay}
                {currentDay == 7 && (
                  <>
                    <button className="button-code">NSE</button>
                    <button className="button-code">NSE</button>
                  </>
                )}
                {currentDay == 17 && (
                  <>
                    <button className="button-code">NSE</button>
                    <button className="button-code">NSE</button>
                  </>
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
