import moment from "moment";
import React, { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import constant from "../../../CommonModules/sharedComponents/constants/constant";
import "./style.css";

function View(props) {
  const [activeDays, setActiveDays] = useState(constant.day);
  const [dayDate, setDayDate] = useState(new Date());
  const [monthDate, setMonthDate] = useState(new Date());

  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [sevenDays, setSevenDays] = useState([]);
  const [months, setMonths] = useState([{ day: "", date: "" }]);

  useEffect(() => {
    getDays();
    getMonths();
  }, []);

  const getMonths = (increment) => {
    const date = monthDate;
    let firstDayOfCurrentDate,
      lastDayOfCurrentDate,
      firstDayOfFormattedCurrentDate,
      lastDayOfFormatCurrentDate;
    let daysAndDates = [];

    if (increment === constant.increment) {
      const newDate = new Date(date.setMonth(date.getMonth() + 1));
      firstDayOfCurrentDate = moment(
        new Date(newDate.getFullYear(), newDate.getMonth(), 1)
      ).format("D");

      lastDayOfCurrentDate = moment(
        new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0)
      ).format("D");

      setMonthDate(newDate);
    } else if (increment === constant.decrement) {
      const newDate = new Date(date.setMonth(date.getMonth() - 1));

      firstDayOfCurrentDate = moment(
        new Date(newDate.getFullYear(), newDate.getMonth(), 1)
      ).format("D");

      lastDayOfCurrentDate = moment(
        new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0)
      ).format("D");
      setMonthDate(newDate);
    } else {
      const newDate = new Date();
      firstDayOfCurrentDate = moment(
        new Date(newDate.getFullYear(), newDate.getMonth(), 1)
      ).format("D");

      firstDayOfFormattedCurrentDate = new Date(
        newDate.getFullYear(),
        newDate.getMonth(),
        1
      );
      lastDayOfFormatCurrentDate = new Date(
        newDate.getFullYear(),
        newDate.getMonth() + 1,
        0
      );

      lastDayOfCurrentDate = moment(
        new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0)
      ).format("D");
      setMonthDate(newDate);

      console.log(firstDayOfFormattedCurrentDate, lastDayOfFormatCurrentDate);
      console.log(firstDayOfCurrentDate, lastDayOfCurrentDate);
    }
    let month = moment(firstDayOfFormattedCurrentDate).format("MM");
    let year = moment(firstDayOfFormattedCurrentDate).format("YYYY");

    for (let index = 1; index <= lastDayOfCurrentDate; index++) {
      daysAndDates.push({
        date: moment("" + index + " " + month + " " + year, "D MM YYYY").format(
          "D"
        ),
        day: moment("" + index + " " + month + " " + year, "D MM YYYY").format(
          "ddd"
        ),
      });
    }
    console.log(daysAndDates);

    setMonths(daysAndDates);
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

  const getDays = () => {
    const days = [];
    setSevenDays([]);
    for (let index = 0; index < 7; index++) {
      const day = moment(weekStartDate).add(index, "days").format("ddd D");
      days.push(day);
    }
    setSevenDays(days);
  };

  useEffect(() => {
    getDays();
  }, [weekStartDate]);

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
    }
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
              {`${moment(dayDate).format("MMMM")}`}
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
          <div className="detail-container">
            <div className="detail-content">
              <button className="license-code">BSE</button>
              <h2>Enhanced supervision reporting</h2>
              <button className="approval">Approval Pending</button>
            </div>
            <div className="detail-name">
              <span>B&K Securities</span>
            </div>
            <div className="detail-name">
              <p>
                <span className="circle-dp">
                  {getNameInitials("Priya Jain")}
                </span>{" "}
                <span className="user-name">Priya Jain</span>
              </p>
            </div>
          </div>
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
                <td>
                  {" "}
                  <div className="week-main">
                    <div className="week-detail">
                      <button className="license-code">BSE</button>
                      <h2>Enhanced supervision reporting</h2>
                      <button className="approval">Approval Pending</button>
                    </div>
                    <div>
                      <span>B&K Securities</span>
                    </div>
                    <div>
                      <p>
                        <span className="circle-dp">
                          {getNameInitials("Priya Jain")}
                        </span>{" "}
                        <span className="user-name">Priya Jain</span>
                      </p>
                    </div>
                  </div>
                  <div className="week-main">
                    <div className="week-detail">
                      <button className="license-code">BSE</button>
                      <h2>Enhanced supervision reporting</h2>
                      <button className="approval">Approval Pending</button>
                    </div>
                    <div>
                      <span>B&K Securities</span>
                    </div>
                    <div>
                      <p>
                        <span className="circle-dp">
                          {getNameInitials("Priya Jain")}
                        </span>{" "}
                        <span className="user-name">Priya Jain</span>
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="week-main">
                    <div className="week-detail">
                      <button className="license-code">BSE</button>
                      <h2>Enhanced supervision reporting</h2>
                      <button className="approval">Approval Pending</button>
                    </div>
                    <div>
                      <span>B&K Securities</span>
                    </div>
                    <div>
                      <p>
                        <span className="circle-dp">
                          {getNameInitials("Priya Jain")}
                        </span>{" "}
                        <span className="user-name">Priya Jain</span>
                      </p>
                    </div>
                  </div>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <div className="week-main">
                    <div className="week-detail">
                      <button className="license-code">BSE</button>
                      <h2>Enhanced supervision reporting</h2>
                      <button className="approval">Approval Pending</button>
                    </div>
                    <div>
                      <span>B&K Securities</span>
                    </div>
                    <div>
                      <p>
                        <span className="circle-dp">
                          {getNameInitials("Priya Jain")}
                        </span>{" "}
                        <span className="user-name">Priya Jain</span>
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {activeDays === constant.month && (
        <div className="detail-main">
          <table className="table co-company-details-tbl table_legenda week-table">
            <thead>
              <tr>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thrusday</th>
                <th>Friday</th>
                <th>Saturday</th>
                <th>Sunday</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default View;
