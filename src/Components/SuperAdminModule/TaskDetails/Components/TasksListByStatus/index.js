import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./style.css";
import redArrowUp from "../../../../../assets/Icons/redArrowTop.png";
import upArrow from "../../../../../assets/Icons/topArrowAccordian.png";
import data from "../../data";
import moment from "moment";
const TasksListByStatus = ({ search, setCurrentTask, currentTask }) => {
  const [countDetails, setCountDetails] = useState({});
  const [tasksList, setTasksList] = useState([]);
  const [expendedFlags, setExpendedFlags] = useState([0]);
  const [expendedViewAll, setExpendedViewAll] = useState([]);

  const handleExpandList = (flag, index) => {
    // Handling expand list
    let temporaryExpandedList = [...expendedFlags];
    let temporaryViewAllList = [...expendedViewAll];
    if (flag) {
      temporaryExpandedList.push(index);
    } else {
      temporaryExpandedList = temporaryExpandedList.filter(
        (item) => item !== index
      );
      temporaryViewAllList = temporaryViewAllList.filter(
        (item) => item !== index
      );
    }
    setExpendedFlags(temporaryExpandedList);
    setExpendedViewAll(temporaryViewAllList);
  };
  const handleExpandViewAll = (flag, index) => {
    let temporaryViewAllList = [...expendedViewAll];
    if (flag) {
      temporaryViewAllList.push(index);
    } else {
      temporaryViewAllList = temporaryViewAllList.filter(
        (item) => item !== index
      );
    }
    setExpendedViewAll(temporaryViewAllList);
  };
  useEffect(() => {
    let temporaryArray = [];
    let rowCounts = {};
    data.map((item) => {
      if (item?.Details.length >= 1) {
        temporaryArray.push({ ...item });
        rowCounts[item.Status.trim()] = item.Details.length;
      }
    });
    let sortedArray = temporaryArray.sort((a, b) => a.ORD - b.ORD);
    setCountDetails(rowCounts);
    setTasksList(sortedArray);
  }, [data]);
  return (
    <>
      {tasksList.length > 0 &&
        tasksList.map((item, index) => {
          const status = item.Status.trim();
          const tasks = item.Details;
          return (
            <div className="tasks__by-status--list mt-4">
              {/* List for Urgent Tasks */}
              {status === "overdue" && (
                <div
                  onClick={() => {
                    expendedFlags.includes(index)
                      ? handleExpandList(false, index)
                      : handleExpandList(true, index);
                  }}
                  className="by-status__item d-flex align-items-center by-status__item--overdue mb-4"
                >
                  {"Urgent"}
                  <span className="by-status__item-count mx-2 by-status__item-count--red">
                    {countDetails[status]}
                  </span>
                  <img
                    src={redArrowUp}
                    alt="red arrow"
                    className={`by-status__item--accordion-arrow-red ${
                      !expendedFlags.includes(index) && "accordion-arrow-down"
                    }`}
                  />
                </div>
              )}
              {/* List for Review Now */}
              {status === "Pending" && (
                <div
                  onClick={() => {
                    expendedFlags.includes(index)
                      ? handleExpandList(false, index)
                      : handleExpandList(true, index);
                  }}
                  className="by-status__item d-flex align-items-center mb-4"
                >
                  {"Review Now"}
                  <span className="by-status__item-count mx-2">
                    {countDetails[status]}
                  </span>
                  <img
                    src={upArrow}
                    alt="red arrow"
                    className={`by-status__item--accordion-arrow ${
                      !expendedFlags.includes(index) && "accordion-arrow-down"
                    }`}
                  />
                </div>
              )}
              {/* List for Upcomming */}
              {status === "Upcoming" && (
                <div
                  onClick={() => {
                    expendedFlags.includes(index)
                      ? handleExpandList(false, index)
                      : handleExpandList(true, index);
                  }}
                  className="by-status__item d-flex align-items-center mb-4"
                >
                  {"Upcoming"}
                  <span className="by-status__item-count mx-2">
                    {countDetails[status]}
                  </span>
                  <img
                    src={upArrow}
                    alt="red arrow"
                    className={`by-status__item--accordion-arrow ${
                      !expendedFlags.includes(index) && "accordion-arrow-down"
                    }`}
                  />
                </div>
              )}
              {/* List for Completed */}
              {status === "Completed" && (
                <>
                  <div
                    onClick={() => {
                      expendedFlags.includes(index)
                        ? handleExpandList(false, index)
                        : handleExpandList(true, index);
                    }}
                    className="by-status__item d-flex align-items-center mb-4 by-status__item--completed"
                  >
                    {"Completed"}
                    <span className="by-status__item-count mx-2 by-status__item-count--green">
                      {countDetails[status]}
                    </span>
                    <img
                      src={upArrow}
                      alt="red arrow"
                      className={`by-status__item--accordion-arrow ${
                        !expendedFlags.includes(index) && "accordion-arrow-down"
                      }`}
                    />
                  </div>
                </>
              )}
              {(status === "Upcoming"
                ? expendedFlags.includes(index)
                : status === "Completed"
                ? expendedFlags.includes(index)
                : status === "overdue"
                ? expendedFlags.includes(index)
                : status === "Pending"
                ? expendedFlags.includes(index)
                : !expendedFlags.includes(index)) && (
                <>
                  <div>
                    {tasks.slice(0, 3).map((item, index) => {
                      return (
                        <TaskLeftOverview
                          task={item}
                          setCurrentTask={setCurrentTask}
                          currentTask={currentTask}
                        />
                      );
                    })}
                  </div>
                  <div>
                    {!expendedViewAll.includes(index) &&
                      countDetails[status] > 3 && (
                        <div
                          className="view-all-tasks d-flex align-items-center mx-3 my-3"
                          onClick={() => handleExpandViewAll(true, index)}
                        >
                          <p className="view-all-tasks--title mb-0 mr-2">
                            view all ({countDetails[status] - 3} more)
                          </p>
                          <img
                            src={upArrow}
                            alt=""
                            className={`by-status__item--accordion-arrow ${
                              !expendedViewAll.includes(index) &&
                              "accordion-arrow-down"
                            }`}
                          />
                        </div>
                      )}
                    {expendedViewAll.includes(index) &&
                      countDetails[status] > 3 && (
                        <>
                          {tasks.slice(3, countDetails[status]).map((item) => {
                            return (
                              <TaskLeftOverview
                                task={item}
                                setCurrentTask={setCurrentTask}
                                currentTask={currentTask}
                              />
                            );
                          })}
                          <div
                            className="view-all-tasks d-flex align-items-center mx-3 my-3"
                            onClick={() => handleExpandViewAll(false, index)}
                          >
                            <p className="view-all-tasks--title mb-0 mr-2">
                              show less
                            </p>
                            <img
                              src={upArrow}
                              alt=""
                              className={`by-status__item--accordion-arrow`}
                            />
                          </div>
                        </>
                      )}
                  </div>
                </>
              )}
            </div>
          );
        })}
    </>
  );
};

const TaskLeftOverview = ({ task, setCurrentTask, currentTask }) => {
  return (
    <div
      className={`task-overview d-flex align-items-center justify-content-between ${
        currentTask.TaskId === task.TaskId && "task-overview--selected"
      }`}
      onClick={() => setCurrentTask(task)}
    >
      <div className="d-flex flex-column flex-1 align-items-start task-overview-left">
        <span className="task-overview__license">{task?.LicenseCode}</span>
        <div className="task-overview__main w-100">
          <p className="task-overview__title mb-1 mt-2">{task?.TaskName}</p>
          <span className="task-overview__date">
            {moment(task?.EndDate, "DD MMM YYYY").format("DD MMM")}
          </span>
        </div>
      </div>
      <img
        src={upArrow}
        alt="right arrow"
        className="task-overview__right-arrow"
      />
    </div>
  );
};
export { TaskLeftOverview };
export default TasksListByStatus;
