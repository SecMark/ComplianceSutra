import React, { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./style.css";
import redArrowUp from "../../../../../assets/Icons/redArrowTop.png";
import upArrow from "../../../../../assets/Icons/topArrowAccordian.png";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { actions as taskReportActions } from "../../../../OnBording/SubModules/DashBoardCO/redux/actions";
import NoTaskFound from "../NoTasksFound";
const TasksListByStatus = () => {
  const [countDetails, setCountDetails] = useState({});
  const [tasksList, setTasksList] = useState([]);
  const [expendedFlags, setExpendedFlags] = useState([]);
  const [expendedViewAll, setExpendedViewAll] = useState([]);
  const [currentOpenedTask, setCurrentOpenedTask] = useState({});
  const state = useSelector((state) => state);
  const currentTask =
    state &&
    state.taskReport &&
    state.taskReport.taskReportById &&
    state.taskReport.taskReportById.taskReportById;
  const dispatch = useDispatch();
  const userDetails = state && state.auth && state.auth.loginInfo;
  const data =
    state &&
    state.taskReport &&
    state.taskReport.taskReport &&
    state.taskReport.taskReport.taskReport;

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
    // Sorting api response
    let temporaryArray = [];
    let rowCounts = {};
    if (data !== undefined && data.length !== 0) {
      data.forEach((item) => {
        if (item?.Details.length >= 1) {
          temporaryArray.push({ ...item });
          rowCounts[item.Status.trim()] = item.Details.length;
        }
      });
      let sortedArray = temporaryArray.sort((a, b) => a.ORD - b.ORD);
      setCountDetails(rowCounts);
      setTasksList(sortedArray);
    }
  }, [data]);
  useEffect(() => {
    // Setting current opened task
    if (currentTask !== undefined && Object.keys(currentTask).length !== 0) {
      setCurrentOpenedTask(currentTask);
    }
  }, [currentTask]);

  useEffect(() => {
    // Fetching Tasks of a user
    dispatch(
      taskReportActions.taskReportRequest({
        userID: userDetails.UserID,
        usertype: userDetails.UserType,
      })
    );
  }, []);

  // Dynamically Opening Category of task
  useEffect(() => {
    if (tasksList.length !== 0) {
      tasksList.forEach((item, expendedFlagIndex) => {
        item.Details.forEach((task, index) => {
          if (task.TaskId === currentOpenedTask.TaskId) {
            handleExpandList(true, expendedFlagIndex);
            if (index > 3) {
              handleExpandViewAll(true, expendedFlagIndex);
            }
          }
        });
      });
    }
  }, [tasksList]);
  return (
    <>
      {tasksList.length !== 0 &&
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
              {status === "Review Now" && (
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
                : status === "Review Now"
                ? expendedFlags.includes(index)
                : false) && (
                <>
                  <div>
                    {tasks.slice(0, 3).map((item, index) => {
                      return <TaskLeftOverview task={item} />;
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
                            return <TaskLeftOverview task={item} />;
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
      {tasksList.length === 0 && <NoTaskFound />}
    </>
  );
};

const TaskLeftOverview = ({ task }) => {
  const [currentOpenedTask, setCurrentOpenedTask] = useState({});
  const dispatch = useDispatch();
  const currentTask = useSelector(
    (state) => state?.taskReport?.taskReportById?.taskReportById
  );
  const handleTaskClick = useCallback(() => {
    if (currentOpenedTask.TaskId !== task.TaskId) {
      dispatch(
        taskReportActions.taskReportByIdRequest({
          taskID: task.TaskId,
        })
      );
    }
  }, [currentOpenedTask.TaskId, task.TaskId]);

  useEffect(() => {
    if (currentTask !== undefined && Object.keys(currentTask).length !== 0) {
      setCurrentOpenedTask(currentTask);
    }
  }, [currentTask]);
  return (
    <div
      className={`task-overview d-flex align-items-center justify-content-between ${
        currentOpenedTask &&
        currentOpenedTask.TaskId === task.TaskId &&
        "task-overview--selected"
      }`}
      onClick={handleTaskClick}
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
