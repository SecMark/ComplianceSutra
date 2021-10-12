import moment from "moment";
import React from "react";
import "./style.css";
const Task = ({
  background,
  title,
  progress,
  startDate,
  endDate,
  containerClass,
}) => {
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n) + "..." : str;
  };
  return (
    <div
      className={`d-flex flex-column pm-task justify-content-between ${containerClass}`}
      style={{
        backgroundColor: background === "light" ? "#D7EBFF" : "#E9E8FF",
      }}
    >
      <p className="pm-task__title mb-0">
        {title ? truncate(title, 22) : truncate("Hello Design", 22)}
      </p>
      <div className="d-flex justify-content-between align-items-end">
        <div className="pm-task__deadlines">
          <p
            style={{
              color: background === "light" ? "#0E7BEA" : "#7A73FF",
            }}
          >
            <span className="pm-task__deadlines--key">start : </span>
            <span className="pm-task__deadlines--values">
              {startDate
                ? moment(startDate).format("DD/MM/YYYY")
                : "25/08/2021"}
            </span>
          </p>
          <p
            style={{
              color: background === "light" ? "#0E7BEA" : "#7A73FF",
            }}
          >
            <span className="pm-task__deadlines--key">end : </span>
            <span className="pm-task__deadlines--values">
              {endDate ? moment(endDate).format("DD/MM/YYYY") : "25/08/2021"}
            </span>
          </p>
        </div>
        <div
          className="pm-task__progress"
          style={{
            backgroundColor: background === "light" ? "#0E7BEA" : "#7A73FF",
          }}
        >
          <span className="pm-task__progress-value">
            {progress ? progress + "%" : "50%"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Task;
