import moment from "moment";
import React, { useEffect, useState } from "react";
import "./style.css";
const listOfStatus = [
  {
    status: "Not Assigned",
    backgroundColor: "#fcf3cd",
    color: "#f8c102",
    listText: "Assign Task",
    taskDetailsText: "Not Assigned",
  },
  {
    status: "Assigned",
    backgroundColor: "#ffefea",
    color: "#f8c102",
    listText: "Task Assigned",
    taskDetailsText: "Task Assigned",
  },
  {
    status: "Approved",
    backgroundColor: "#cdfcd8",
    color: "#7fba7a",
    listText: "Task Approved",
    taskDetailsText: "Task Approved",
  },
  {
    status: "Approval Pending",
    backgroundColor: "#ffefea",
    color: "#ff5f31",
    listText: "Approval Pending",
    taskDetailsText: "Approval Pending",
    listTextBeforeToday: "Not reviewed",
  },
  {
    status: "Rejected",
    backgroundColor: "#ffefea",
    color: "#ff5f31",
    listText: "Task Rejected",
    taskDetailsText: "Task Rejected",
  },
  {
    status: "Expired",
    backgroundColor: "#ffefea",
    color: "#ff5f31",
    listText: "Expired",
    taskDetailsText: "Task Expired",
  },
  {
    status: "Default",
    backgroundColor: "#d2fccd",
    color: "#fcf3cd",
    listText: "",
    taskDetailsText: "",
  },
];
const TaskStatusBox = ({
  status,
  deadline_date,
  isExpertReviwerStatus,
  isTaskDetails,
}) => {
  const [currentStatus, setCurrentStatus] = useState(
    listOfStatus.find((item) => item.status === "Default")
  );
  useEffect(() => {
    if (status) {
      const _status = listOfStatus.find((item) => item.status === status);
      if (_status) setCurrentStatus(_status);
    }
  }, [status]);
  return (
    <>
      <div
        className="task-status__container d-none d-md-block"
        style={{
          backgroundColor: currentStatus?.backgroundColor || "#d2fccd",
        }}
      >
        <p
          className={`task-status__text--${
            isTaskDetails ? "task-details" : "task-list"
          }`}
          style={{
            color: currentStatus?.color || "#fcf3cd",
          }}
        >
          {/* {children} */}
          {isTaskDetails
            ? currentStatus?.taskDetailsText
              ? currentStatus?.taskDetailsText
              : ""
            : currentStatus?.listText
            ? currentStatus?.listText
            : ""}
        </p>
      </div>
      {status && status !== "Assigned" && (
        <div
          className="task-status__container d-block d-md-none"
          style={{
            backgroundColor: currentStatus?.backgroundColor || "#d2fccd",
          }}
        >
          <p
            className={`task-status__text--${
              isTaskDetails ? "task-details" : "task-list"
            }`}
            style={{
              color: currentStatus?.color || "#fcf3cd",
            }}
          >
            {/* {children} */}
            {isTaskDetails
              ? currentStatus?.taskDetailsText
                ? currentStatus?.taskDetailsText
                : ""
              : currentStatus?.listText
              ? currentStatus?.listText
              : ""}
          </p>
        </div>
      )}
    </>
  );
};

export default TaskStatusBox;
