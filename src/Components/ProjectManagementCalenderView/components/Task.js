import { Progress } from "antd";
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
      className={`flex-column pm-task justify-content-between ${containerClass}`}
      style={{
        backgroundColor: background === "light" ? "#D7EBFF" : "#E9E8FF",
      }}
    >
      <p className="d-none d-md-block pm-task__title mb-0">
        {title ? truncate(title, 22) : truncate("Hello Design", 22)}
      </p>
      <div className="d-flex align-items-center justify-content-between align-items-end">
        <div className="pm-task__deadlines">
          <p className="d-md-none pm-task__title mb-0">
            {title ? truncate(title, 22) : truncate("Hello Design", 22)}
          </p>
          <div className="d-flex d-md-block align-items-center">
            <p
              style={{
                color: background === "light" ? "#0E7BEA" : "#7A73FF",
              }}
            >
              <span className="pm-task__deadlines--key">start : </span>
              <br class="d-md-none" />
              <span className="pm-task__deadlines--values">
                {startDate
                  ? moment(startDate).format("DD/MM/YYYY")
                  : "25/08/2021"}
              </span>
            </p>
            <div className="d-block d-md-none vertical-line mx-2"></div>
            <p
              style={{
                color: background === "light" ? "#0E7BEA" : "#7A73FF",
              }}
            >
              <span className="pm-task__deadlines--key">end : </span>
              <br class="d-md-none" />
              <span className="pm-task__deadlines--values">
                {endDate ? moment(endDate).format("DD/MM/YYYY") : "25/08/2021"}
              </span>
            </p>
          </div>
        </div>
        <div
          className="d-none d-md-block pm-task__progress"
          style={{
            backgroundColor: background === "light" ? "#0E7BEA" : "#7A73FF",
          }}
        >
          <span className="pm-task__progress-value">
            {progress ? progress + "%" : "50%"}
          </span>
        </div>
        <div className="d-md-none pm-task__progress">
          <Progress
            trailColor="tranparent"
            type="circle"
            percent={30}
            width={55}
            strokeColor={background === "light" ? "#0E7BEA" : "#7A73FF"}
            strokeWidth={11}
          />
        </div>
      </div>
    </div>
  );
};

export default Task;
