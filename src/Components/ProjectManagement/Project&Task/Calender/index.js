import moment from "moment";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import {
  addDaysInDate,
  getMondays,
  subtractDaysInDate,
} from "../../../../CommonModules/helpers/Date.helper";
import constant from "../../../../CommonModules/sharedComponents/constants/constant";
import DateButtons from "./components/DateButtons";
import DateFilters from "./components/DateFilters";
import DayView from "./components/DayView";
import MonthView from "./components/MonthView";
import WeekView from "./components/WeekView";
import "./style.css";
const ProjectManagementCalender = forwardRef(
  (
    {
      activeDays,
      setActiveDays,
      dayDate,
      setDayDate,
      monthDate,
      setMonthDate,
      weekStartDate,
      setWeekStartDate,
    },
    ref
  ) => {
    const [showCalenderInDayView, setShowCalenderInDayView] = useState(false);

    const [sevenDays, setSevenDays] = useState([]);
    const [months, setMonths] = useState([]);
    useImperativeHandle(ref, () => ({
      activeDays,
      dayDate,
      monthDate,
      months,
      getDays,
      setDays,
      getMondays,
      setActiveDays,
      weekStartDate,
      addDaysInDate,
    }));
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
      <>
        <div className="w-100 d-flex justify-content-center d-md-none">
          <DateButtons
            setDays={setDays}
            activeDays={activeDays}
            monthDate={monthDate}
            weekStartDate={weekStartDate}
            addDaysInDate={addDaysInDate}
            dayDate={dayDate}
          />
        </div>
        {activeDays === constant.day && (
          <DayView
            months={months}
            monthDate={monthDate}
            isShowCalender={showCalenderInDayView}
            dayDate={dayDate}
          />
        )}
        {activeDays === constant.week && <WeekView sevenDays={sevenDays} />}
        {activeDays === constant.month && (
          <MonthView months={months} monthDate={monthDate} />
        )}
      </>
    );
  }
);

export default ProjectManagementCalender;
