import moment from "moment";
import React, { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-dropdown-select";
import {
  addDaysInDate,
  getMondays,
  subtractDaysInDate,
} from "../../../CommonModules/helpers/Date.helper";
import constant from "../../../CommonModules/sharedComponents/constants/constant";
import NoResultFound from "../../../CommonModules/sharedComponents/NoResultFound";
import DayView from "../DayView";
import MonthView from "../MonthView";
import {
  clearState,
  getDayData,
  getMonthData,
  getWeekData,
} from "../redux/actions";
import WeekView from "../WeekView";
import "./style.css";
<<<<<<< Updated upstream
=======
import { BACKEND_BASE_URL } from "../../../apiServices/baseurl";
import axiosInstance from "../../../apiServices";
import { actions as taskReportActions } from "../../OnBording/SubModules/DashBoardCO/redux/actions";
import { getAllTasks } from "../../../CommonModules/helpers/tasks.helper";
>>>>>>> Stashed changes

const View = ({ getSelectTaskDetails, isRedirect }) => {
  const [activeDays, setActiveDays] = useState(constant.week);
  const [dayDate, setDayDate] = useState(new Date());
  const [monthDate, setMonthDate] = useState(new Date());

  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [sevenDays, setSevenDays] = useState([]);
  const [months, setMonths] = useState([]);

  const state = useSelector((state) => state); // state
  const dispatch = useDispatch(); // dispatch
  const userDetails = state && state.auth && state.auth.loginInfo;
  const { daysData, weekData, monthData } = state.CalenderReducer;
  const [isShowSmallCalender, setIsShowSmallCalender] = useState(false);
<<<<<<< Updated upstream
=======
  const [allTaskList, setAllTaskList] = useState([]);

  const taskList =
    state &&
    state.taskReport &&
    state.taskReport.taskReport &&
    state.taskReport.taskReport.taskReport &&
    state.taskReport.taskReport.taskReport;

  useEffect(() => {
    if (!(taskList && taskList.length > 0)) {
      dispatch(taskReportActions.taskReportRequest());
    }
  }, [taskList]);

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  useEffect(() => {
    fetchDayData();
    fetchWeekData();
  }, [state.auth.loginInfo?.UserID]);

  useEffect(() => {
    getDays();
=======

  useEffect(() => {
    fetchDayData();
    fetchWeekData();
    fetchMonthData();
>>>>>>> Stashed changes
    getMonths();
  }, []);
  useEffect(() => {
    dispatch(clearState());
    getDays();
    fetchWeekData();
  }, [weekStartDate]);

  useEffect(() => {
<<<<<<< Updated upstream
    dispatch(clearState());
=======
    // dispatch(clearState());
>>>>>>> Stashed changes
    fetchDayData();
  }, [dayDate]);

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
    fetchMonthData(endDate);
  };

  //Dispatch Day API
  const fetchDayData = () => {
<<<<<<< Updated upstream
    const dayPayload = {
      userID: state.auth.loginInfo?.UserID,
      EntityID: "M",
      StartDate: moment(dayDate).format("YYYY-MM-DD"),
      EndDate: moment(dayDate).format("YYYY-MM-DD"),
    };
    dispatch(getDayData(dayPayload));
  };

  //Dispatch Week API
  const fetchWeekData = () => {
    const dayPayload = {
      userID: state.auth.loginInfo?.UserID,
      EntityID: "M",
      StartDate: moment(weekStartDate).format("YYYY-MM-DD"),
      EndDate: moment(addDaysInDate(weekStartDate, 7)).format("YYYY-MM-DD"),
    };
    dispatch(getWeekData(dayPayload));
=======
    dispatch(
      getDayData({
        taskList: taskList && taskList.length > 0 ? taskList : [],
        StartDate: moment(dayDate).format("YYYY-MM-DD"),
      })
    );
  };

  //Dispatch Week API
  const fetchWeekData = async () => {
    dispatch(
      getWeekData({
        taskList: taskList && taskList.length > 0 ? taskList : [],
        StartDate: moment(weekStartDate).format("YYYY-MM-DD"),
        EndDate: moment(addDaysInDate(weekStartDate, 7)).format("YYYY-MM-DD"),
      })
    );
>>>>>>> Stashed changes
  };

  //Dispatch Month API
  const fetchMonthData = (endDate) => {
    var date = new Date();
    var startDate = new Date(date.getFullYear(), date.getMonth(), 1);

    const dayPayload = {
      taskList: taskList && taskList.length > 0 ? taskList : [],
      StartDate: moment(startDate).format("YYYY-MM-DD"),
      EndDate: moment(moment(endDate).format()).format("YYYY-MM-DD"),
    };
    dispatch(getMonthData(dayPayload));
  };

  //Move to Week view when click on month view date.
  const goToDateWeek = (date) => {
    setWeekStartDate("");
    const newDate = moment(date).format();
    setDays(constant.week, constant.increment);
    setActiveDays(constant.week);
    setWeekStartDate(newDate);
    fetchWeekData();
  };

  //Move to day view when click on week view date.
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
              {`${moment(weekStartDate).format("ddd D")}-${moment(
                addDaysInDate(weekStartDate, 7)
              ).format("ddd D MMM,YYYY")}`}
            </span>
          )}

          {activeDays === constant.month && (
            <span
              className="current-date"
              onClick={() => setIsShowSmallCalender(!isShowSmallCalender)}
              style={{ cursor: "pointer" }}
            >
              {`${moment(monthDate).format("MMMM")}`}
            </span>
          )}

          <AiOutlineRight
            style={{ marginLeft: "10px" }}
            onClick={() => setDays(activeDays, constant.increment)}
          />
        </div>
        <div className="d-none d-md-block">
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
        <div className="d-block d-md-none">
          <Select
            options={viewBy}
            onChange={(value) => {
              const selectedValue = value[0].value;
              setActiveDays(selectedValue);
            }}
            className="view-by-select d-flex d-md-none"
            searchable={false}
            labelField={"name"}
            valueField={"value"}
            values={viewBy.filter((item) => item.value === activeDays)}
          />
        </div>
      </div>
      {activeDays === constant.day && (
        <DayView
          daysData={daysData}
          userDetails={userDetails}
          isRedirect={isRedirect}
        />
      )}

      {activeDays === constant.week && (
        <WeekView
          sevenDays={sevenDays}
          weekData={weekData}
          goToDateDay={goToDateDay}
          userDetails={userDetails}
        />
      )}

      {activeDays === constant.month && (
        <MonthView
          months={months}
          monthDate={monthDate}
          monthData={monthData}
          goToDateWeek={goToDateWeek}
          getSelectTaskDetails={getSelectTaskDetails}
          isSmallCalenderOpen={isShowSmallCalender}
          userDetails={userDetails}
        />
      )}
    </>
  );
};

export default View;
