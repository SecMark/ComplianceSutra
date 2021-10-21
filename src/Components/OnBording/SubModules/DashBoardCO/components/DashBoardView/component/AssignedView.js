import React, { useState, useEffect } from "react";
import moment from "moment";
import "../style.css";
import viewAllArow from "../../../../../../../assets/Icons/viewAllArow.png";
import viewAllArowTop from "../../../../../../../assets/Icons/viewAllArowTop.png";
import keyboardArrowRightBlack from "../../../../../../../assets/Icons/keyboardArrowRightBlack.png";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../../../../../../apiServices/baseurl";
import downArrow from "../../../../../../../assets/Icons/downArrow.png";
import upArrow from "../../../../../../../assets/Icons/topArrowAccordian.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setNotificationTaskId } from "../../notification/Redux/Action";
import { actions as taskReportActions } from "../../../redux/actions";
import { getDataByTeam } from "../../../../../../../CommonModules/helpers/tasks.helper";
import axiosInstance from "../../../../../../../apiServices";

export default function AssignedView(props) {
  const [assignRowCount, setAssignRowCount] = useState([]);
  const [licensetaskData, setLicensetaskData] = useState([]);
  const [today, setToday] = useState(new Date());
  const [expandedFlags, setExpandedFlags] = useState([]);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const userDetails = state && state.auth && state.auth.loginInfo;

  useEffect(() => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const mm = monthNames[today.getMonth()];
    var yyyy = today.getFullYear();
    today = dd + " " + mm + " " + yyyy;
    setToday(today);
  }, []);

  useEffect(() => {
    axiosInstance
      .get(`${BACKEND_BASE_URL}compliance.api.GetTaskList`)
      .then((response) => {
        const { status, status_response, task_details } = response.data.message;
        if (status && status_response) {
          const taskByStatus = getDataByTeam(task_details);
          setLicensetaskData(taskByStatus);
        }
      })
      .catch((error) => {
        console.log("error => ", error);
      });
  }, []);

  const getSelectTaskDetails = (e) => {};

  const handleExpandList = (flag, index) => {
    let tempExtend = [...expandedFlags];
    if (flag === "show") {
      tempExtend.push(index);
    } else {
      tempExtend = tempExtend.filter((item) => item !== index);
    }
    setExpandedFlags(tempExtend);
  };
  console.log("expandedFlags => ", expandedFlags);

  const AssignShowLessMore = (status, count) => {
    let tempRowCnt = { ...assignRowCount };
    tempRowCnt[status.trim()] = count;
    setAssignRowCount(tempRowCnt);
  };

  const getDayDate = (date, flag) => {
    var today = new Date();
    var dateObj = new Date(date);
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    if (dateObj.toLocaleDateString() === today.toLocaleDateString()) {
      return "Today";
    } else if (
      dateObj.toLocaleDateString() === yesterday.toLocaleDateString()
    ) {
      return "Yesterday";
    } else {
      return flag === 1
        ? moment(date).format("DD MMM YYYY")
        : moment(date).format("DD MMM");
    }
  };
  const renderTaskList = (task, Status, listType) => {
    return (
      <>
        {!props.isExpertReviewer && (
          <Link
            to="/dashboard"
            onClick={() => {
              if (userDetails && userDetails.UserType !== 6) {
                dispatch(setNotificationTaskId(task.TaskId));
              }
            }}
            style={{
              textDecoration: "none",
              pointerEvents: `${
                userDetails && userDetails.UserType === 6 ? "none" : "auto"
              }`,
            }}
          >
            <div
              className="row"
              style={{ marginBottom: "15px", position: "relative" }}
            >
              <div className="col-10 col-md-7 col-sm-7 col-xl-7">
                <div className="all-companies-sub-title">
                  <div
                    onClick={(e) => getSelectTaskDetails(task)}
                    style={{ cursor: "pointer", display: "flex" }}
                  >
                    <div class="graybox-left">
                      <span class="all-companies-nse-label">
                        {task.license}
                      </span>
                    </div>
                    <span className="pink-label-title-right">
                      <div className="overdue-title">{task.subject}</div>
                      <div
                        className="black-week "
                        style={{ cursor: "pointer" }}
                        onClick={(e) => getSelectTaskDetails(task)}
                      >
                        <div className="d-block d-sm-none">
                          {getDayDate(task.due_date, 2)}
                        </div>
                        {task.status !== "Assigned" && (
                          <span
                            className="pink-label-text"
                            style={{
                              backgroundColor:
                                task && task.status
                                  ? task.status === "Open"
                                    ? "#fcf3cd"
                                    : task.status === "Completed By User"
                                    ? moment(task.due_date).isBefore(today)
                                      ? "#cdfcd8"
                                      : "#ffefea"
                                    : task.status === "Approved"
                                    ? "#cdfcd8"
                                    : task.status === "Assigned"
                                    ? "#ffefea"
                                    : task.status === "Request Rejected"
                                    ? "#ffefea"
                                    : "#d2fccd"
                                  : "#d2fccd",
                              color:
                                task && task.status
                                  ? task.status === "Completed By User"
                                    ? moment(task.due_date).isBefore(today)
                                      ? "#7fba7a"
                                      : "#ff5f31"
                                    : task.status === "Approved"
                                    ? "#7fba7a"
                                    : task.status === "Assigned"
                                    ? "#f8c102"
                                    : task.status === "Open"
                                    ? "#f8c102"
                                    : task.status === "Request Rejected"
                                    ? "#ff5f31"
                                    : ""
                                  : "#fcf3cd",
                            }}
                          >
                            {task.status && task.status === "Completed By User"
                              ? moment(task.due_date).isBefore(today)
                                ? "Not reviewed"
                                : "Approval Pending"
                              : task.status === "Open"
                              ? "Assign Task"
                              : task.status === "Assigned"
                              ? "Task Assigned"
                              : task.status === "Approved"
                              ? "Task Approved"
                              : task.status === "Request Rejected"
                              ? "Task Rejected"
                              : ""}
                          </span>
                        )}
                      </div>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-2 col-md-2 col-sm-2 col-xl-2 d-none d-sm-block">
                <div
                  className="circle-front-text"
                  style={{ width: "fit-content", cursor: "pointer" }}
                  value={task.TaskId}
                  onClick={(e) => getSelectTaskDetails(task)}
                >
                  {task.customer_name}
                </div>
              </div>
              <div className="col-2 col-md-3 col-sm-3 col-xl-3">
                <div className="align-right">
                  <div className="d-flex">
                    <div
                      className="black-week d-none d-sm-block"
                      style={{ cursor: "pointer" }}
                      onClick={(e) => getSelectTaskDetails(task)}
                    >
                      {getDayDate(task.due_date, 1)}
                    </div>
                    <div
                      className="right-arrow-week text-right-grid"
                      style={{ cursor: "pointer" }}
                      onClick={(e) => getSelectTaskDetails(task)}
                    >
                      {
                        <img
                          className="d-none d-sm-block"
                          src={keyboardArrowRightBlack}
                          alt="Right Arrow"
                        />
                      }
                      {task.assign_to !== null && (
                        <img
                          className="d-block d-sm-none"
                          src={keyboardArrowRightBlack}
                          alt="Right Arrow"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}
        {props.isExpertReviewer && (
          <div
            onClick={() => {
              if (userDetails && userDetails.UserType !== 6) {
                props.setIsTaskDetailsShow(true);
                dispatch(
                  taskReportActions.taskReportByIdRequest({
                    taskID: task.TaskId,
                  })
                );
              }
            }}
            style={{
              textDecoration: "none",
              pointerEvents: `${
                userDetails && userDetails.UserType === 6 ? "none" : "auto"
              }`,
            }}
          >
            <div
              className="row"
              style={{ marginBottom: "15px", position: "relative" }}
            >
              <div className="col-10 col-md-7 col-sm-7 col-xl-7">
                <div className="all-companies-sub-title">
                  <div
                    onClick={(e) => getSelectTaskDetails(task)}
                    style={{ cursor: "pointer", display: "flex" }}
                  >
                    <div class="graybox-left">
                      <span class="all-companies-nse-label">
                        {task.license}
                      </span>
                    </div>
                    <span className="pink-label-title-right">
                      <div className="overdue-title">{task.subject}</div>
                      <div
                        className="black-week "
                        style={{ cursor: "pointer" }}
                        onClick={(e) => getSelectTaskDetails(task)}
                      >
                        <div className="d-block d-sm-none">
                          {getDayDate(task.due_date, 2)}
                        </div>
                        {task.status !== "Assigned" && (
                          <span
                            className="pink-label-text"
                            style={{
                              backgroundColor:
                                task && task.status
                                  ? task.status === "Assign"
                                    ? "#fcf3cd"
                                    : task.status === "Completed By User"
                                    ? moment(task.due_date).isBefore(today)
                                      ? "#cdfcd8"
                                      : "#ffefea"
                                    : task.status === "Approved"
                                    ? "#cdfcd8"
                                    : task.status === "Assigned"
                                    ? "#ffefea"
                                    : task.status === "Request Rejected"
                                    ? "#ffefea"
                                    : "#d2fccd"
                                  : "#d2fccd",
                              color:
                                task && task.status
                                  ? task.status === "Completed By User"
                                    ? moment(task.due_date).isBefore(today)
                                      ? "#7fba7a"
                                      : "#ff5f31"
                                    : task.status === "Approved"
                                    ? "#7fba7a"
                                    : task.status === "Assigned"
                                    ? "#f8c102"
                                    : task.status === "Assign"
                                    ? "#f8c102"
                                    : task.status === "Request Rejected"
                                    ? "#ff5f31"
                                    : ""
                                  : "#fcf3cd",
                            }}
                          >
                            {task.status && task.status === "Completed By User"
                              ? moment(task.due_date).isBefore(today)
                                ? "Not reviewed"
                                : "Approval Pending"
                              : task.status === "Assign"
                              ? "Assign Task"
                              : task.status === "Assigned"
                              ? "Task Assigned"
                              : task.status === "Approved"
                              ? "Task Approved"
                              : task.status === "Request Rejected"
                              ? "Task Rejected"
                              : ""}
                          </span>
                        )}
                      </div>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-2 col-md-2 col-sm-2 col-xl-2 d-none d-sm-block">
                <div
                  className="circle-front-text"
                  style={{ width: "fit-content", cursor: "pointer" }}
                  value={task.TaskId}
                  onClick={(e) => getSelectTaskDetails(task)}
                >
                  {task.customer_name}
                </div>
              </div>
              <div className="col-2 col-md-3 col-sm-3 col-xl-3">
                <div className="align-right">
                  <div className="d-flex">
                    <div
                      className="black-week d-none d-sm-block"
                      style={{ cursor: "pointer" }}
                      onClick={(e) => getSelectTaskDetails(task)}
                    >
                      {getDayDate(task.due_date, 1)}
                    </div>
                    <div
                      className="right-arrow-week text-right-grid"
                      style={{ cursor: "pointer" }}
                      onClick={(e) => getSelectTaskDetails(task)}
                    >
                      {
                        <img
                          className="d-none d-sm-block"
                          src={keyboardArrowRightBlack}
                          alt="Right Arrow"
                        />
                      }
                      {task.assign_to !== 0 && (
                        <img
                          className="d-block d-sm-none"
                          src={keyboardArrowRightBlack}
                          alt="Right Arrow"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  const renderSidebarTaskList = (task, Status, listType) => {
    return (
      <Link
        to="/dashboard"
        style={{ textDecoration: "none" }}
        onClick={() => {
          dispatch(setNotificationTaskId(task.TaskId));
        }}
      >
        <div
          className={
            props.getTaskById && task.TaskId === props.getTaskById.TaskId
              ? " row active-action-card-sidebar "
              : "row action-card-sidebar"
          }
          onClick={(e) => getSelectTaskDetails(task)}
          style={{ cursor: "pointer" }}
        >
          <div className="col-10 pl-0">
            <div className="all-companies-sub-title">
              <div className="graybox-left">
                <span className="all-companies-nse-label">{task.license}</span>{" "}
              </div>
              <div
                className="pink-label-title-right"
                onClick={(e) => getSelectTaskDetails(task)}
              >
                <div className="overdue-title-sidebar-title pl-1">
                  {task.subject}
                </div>
                <div
                  className="red-week  date-font pl-1"
                  style={{ cursor: "pointer" }}
                >
                  {getDayDate(task.due_date, 2)}
                </div>
              </div>
            </div>
          </div>
          <div className="col-2">
            <div className="align-right">
              <div className="d-flex">
                <div
                  className="right-arrow-week text-right-grid"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => getSelectTaskDetails(task)}
                >
                  <img
                    className=""
                    src={keyboardArrowRightBlack}
                    alt="Right Arrow"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div>
      <div className="task-list-grid">
        <div className="">
          {licensetaskData &&
          props.sideBarTaskList === false &&
          licensetaskData.length > 0
            ? licensetaskData.map((item, index) => {
                return (
                  <>
                    <div className="take-action customHeight">
                      <div className="task-list-grid">
                        {item.status && (
                          <div
                            className="upcoming-btn my-3"
                            onClick={() => {
                              expandedFlags.includes(index)
                                ? handleExpandList("hide", index)
                                : handleExpandList("show", index);
                            }}
                          >
                            <div
                              style={{ cursor: "pointer" }}
                              className="upcoming-title"
                            >
                              {item.status}
                              <span className="black-circle">
                                <p className="black-circle-text">
                                  {item.tasks.length}
                                </p>
                              </span>
                              {expandedFlags.includes(index) ? (
                                <img
                                  src={upArrow}
                                  className="arrowDown"
                                  alt="Arrow Up"
                                  style={{ cursor: "pointer" }}
                                />
                              ) : (
                                <img
                                  src={downArrow}
                                  className="arrowDown"
                                  style={{ cursor: "pointer" }}
                                  alt="Arrow down"
                                />
                              )}
                            </div>
                          </div>
                        )}

                        {
                          <>
                            {!expandedFlags.includes(index) &&
                              item.tasks
                                .slice(0, assignRowCount[item.status.trim()])
                                .map((task) => {
                                  return (
                                    <>
                                      {renderTaskList(
                                        task,
                                        item.status.trim(),
                                        1
                                      )}
                                    </>
                                  );
                                })}
                            <div>
                              {!expandedFlags.includes(index) &&
                                item.tasks.length > 3 && (
                                  <>
                                    {assignRowCount[item.status.trim()] > 3 && (
                                      <div
                                        onClick={() =>
                                          AssignShowLessMore(item.status, 3)
                                        }
                                        className="viewAll showLess"
                                      >
                                        Show Less{" "}
                                        <img
                                          src={viewAllArowTop}
                                          alt="Show Less"
                                        />
                                      </div>
                                    )}
                                    {assignRowCount[item.status.trim()] ===
                                      3 && (
                                      <div
                                        onClick={() =>
                                          AssignShowLessMore(
                                            item.status,
                                            item.tasks.length
                                          )
                                        }
                                        className="viewAll"
                                      >
                                        View All ({item.tasks.length - 3} MORE )
                                        <img
                                          src={viewAllArow}
                                          alt="view All Arow"
                                        />
                                      </div>
                                    )}
                                  </>
                                )}
                            </div>
                          </>
                        }
                      </div>
                    </div>
                  </>
                );
              })
            : ""}
        </div>
        {licensetaskData &&
          props.sideBarTaskList === true &&
          licensetaskData.length > 0 &&
          licensetaskData.map((item, index) => {
            return (
              <>
                {item.status !== "Assign" && (
                  <div className="all-companies-task-grid-2 inside-padding-sidebar">
                    <div className="">
                      <div className="task-list-grid">
                        <div
                          className="upcoming-btn mb-3"
                          style={{ cursor: "pointer", padding: "0px 7px 0px" }}
                        >
                          {item.status}{" "}
                        </div>
                        {item.status.trim() === "overdue" &&
                          item.tasks
                            .slice(0, assignRowCount[item.status.trim()])
                            .map((task) => {
                              return (
                                <>
                                  {renderSidebarTaskList(
                                    task,
                                    item.status.trim(),
                                    1
                                  )}
                                </>
                              );
                            })}
                        {item.status.trim() != "overdue" &&
                          (item.status.trim() === "Pending"
                            ? true
                            : !expandedFlags.includes(index)) && (
                            <>
                              {item.tasks
                                .slice(0, assignRowCount[item.status.trim()])
                                .map((task) => {
                                  return (
                                    <>
                                      {renderSidebarTaskList(
                                        task,
                                        item.status.trim(),
                                        1
                                      )}
                                    </>
                                  );
                                })}
                              <div>
                                {item.tasks.length > 3 && (
                                  <>
                                    {assignRowCount[item.status.trim()] > 3 && (
                                      <div
                                        onClick={() =>
                                          AssignShowLessMore(item.status, 3)
                                        }
                                        className="viewAll showLess"
                                      >
                                        Show Less{" "}
                                        <img
                                          src={viewAllArowTop}
                                          alt="Show Less"
                                        />
                                      </div>
                                    )}
                                    {assignRowCount[item.status.trim()] ===
                                      3 && (
                                      <div
                                        onClick={() =>
                                          AssignShowLessMore(
                                            item.status,
                                            item.tasks.length
                                          )
                                        }
                                        className="viewAll"
                                      >
                                        View All ({item.tasks.length - 3} )
                                        <img
                                          src={viewAllArow}
                                          alt="view All Arow"
                                        />
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                            </>
                          )}
                      </div>
                    </div>
                  </div>
                )}
              </>
            );
          })}
      </div>
    </div>
  );
}
