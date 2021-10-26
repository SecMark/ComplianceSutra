import React, { useState, useEffect } from "react";
import moment from "moment";
import "../style.css";
import viewAllArow from "../../../../../../../assets/Icons/viewAllArow.png";
import viewAllArowTop from "../../../../../../../assets/Icons/viewAllArowTop.png";
import keyboardArrowRightBlack from "../../../../../../../assets/Icons/keyboardArrowRightBlack.png";
import assignIconCircle from "../../../../../../../assets/Icons/assignIconCircle.png";
import downArrow from "../../../../../../../assets/Icons/downArrow.png";
import upArrow from "../../../../../../../assets/Icons/topArrowAccordian.png";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { actions as taskReportActions } from "../../../redux/actions";
import { getDataByLicenses } from "../../../../../../../CommonModules/helpers/tasks.helper";
export default function LicenseTaskList(props) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [assignRowCount, setAssignRowCount] = useState([]);
  const [companyTaskData, setCompanyTaskData] = useState([]);
  const [today, setToday] = useState(new Date());
  const [showUserToolTip, setShowUserToolTip] = useState("");
  const [expandedFlags, setExpandedFlags] = useState([]);
  const userDetails = state && state.auth && state.auth.loginInfo;
  const taskList =
    state &&
    state.taskReport &&
    state.taskReport.taskReport &&
    state.taskReport.taskReport.taskReport &&
    state.taskReport.taskReport.taskReport;
  useEffect(() => {
    if (taskList && taskList.length !== 0) {
      const taskByCompany = getDataByLicenses(taskList);
      let tempRowCount = {};
      [...taskByCompany].forEach((item) => {
        if (item.tasks && item.tasks.length > 0) {
          tempRowCount[item.status.trim()] = 3;
        }
      });
      setCompanyTaskData(taskByCompany);
      setAssignRowCount(tempRowCount);
    } else {
      dispatch(taskReportActions.taskReportRequest());
    }
  }, [taskList]);

  const setCurrentOpenedTask = (task) => {
    dispatch(
      taskReportActions.taskReportByIdRequestSuccess({
        taskReportById: task,
      })
    );
  };
  const getInitials = (str) => {
    var initials = " ";
    if (str != "" && str) {
      var names = str.split(" "),
        initials = names[0].substring(0, 1).toUpperCase();
      if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
      } else if (names.length == 1) {
        initials = names[0].substring(0, 2).toUpperCase();
      }
    }
    return initials;
  };

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

  const handleExpandList = (flag, index) => {
    let tempExtend = [...expandedFlags];
    if (flag === "show") {
      tempExtend.push(index);
    } else {
      tempExtend = tempExtend.filter((item) => item !== index);
    }
    setExpandedFlags(tempExtend);
  };

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
    if (dateObj.toLocaleDateString() == today.toLocaleDateString()) {
      return "Today";
    } else if (dateObj.toLocaleDateString() == yesterday.toLocaleDateString()) {
      return "Yesterday";
    } else {
      return flag === 1
        ? moment(date).format("DD MMM YYYY")
        : moment(date).format("DD MMM");
    }
  };

  const _getAssignedName = (name) => {
    let str = "";
    if (name.length < 11) {
      str = name;
    } else {
      str = `${name.slice(0, 9)}...`;
    }
    return str;
  };

  const renderTaskList = (task, Status, listType) => {
    return (
      <>
        {!props.isExpertReviewer && (
          <Link
            to="/dashboard"
            onClick={() => {
              setCurrentOpenedTask(task);
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
              <div className="col-10 col-md-6 col-sm-6 col-xl-6">
                <div className="all-companies-sub-title">
                  <div
                    onClick={() => {
                      setCurrentOpenedTask(task);
                    }}
                    style={{ cursor: "pointer", display: "flex" }}
                  >
                    <span className="pink-label-title-right">
                      <div className="overdue-title">{task.subject}</div>
                      <div
                        className={
                          Status === "Overdue"
                            ? "red-week d-block d-sm-none"
                            : "black-week d-block d-sm-none"
                        }
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setCurrentOpenedTask(task);
                        }}
                      >
                        <div className="d-block d-sm-none">
                          {getDayDate(task.due_date, 2)}
                        </div>
                      </div>
                      {task.status !== "Assigned" && (
                        <p
                          className="pink-label-text"
                          style={{
                            backgroundColor:
                              task && task.status
                                ? task.status === "Not Assigned"
                                  ? "#fcf3cd"
                                  : task.status === "Approval Pending"
                                  ? moment(task.due_date).isBefore(today)
                                    ? "#cdfcd8"
                                    : "#ffefea"
                                  : task.status === "Approved"
                                  ? "#cdfcd8"
                                  : task.status === "Assigned"
                                  ? "#ffefea"
                                  : task.status === "Rejected"
                                  ? "#ffefea"
                                  : "#d2fccd"
                                : "#d2fccd",
                            color:
                              task && task.status
                                ? task.status === "Approval Pending"
                                  ? moment(task.due_date).isBefore(today)
                                    ? "#7fba7a"
                                    : "#ff5f31"
                                  : task.status === "Approved"
                                  ? "#7fba7a"
                                  : task.status === "Assigned"
                                  ? "#f8c102"
                                  : task.status === "Not Assigned"
                                  ? "#f8c102"
                                  : task.status === "Rejected"
                                  ? "#ff5f31"
                                  : ""
                                : "#fcf3cd",
                          }}
                        >
                          {task.status && task.status === "Approval Pending"
                            ? "Approval Pending"
                            : task.status === "Not Assigned"
                            ? "Assign Task"
                            : task.status === "Assigned"
                            ? "Task Assigned"
                            : task.status === "Approved"
                            ? "Task Approved"
                            : task.status === "Rejected"
                            ? "Task Rejected"
                            : ""}
                        </p>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-2 col-md-2 col-sm-2 col-xl-2 d-none d-sm-block">
                <div
                  className="circle-front-text"
                  style={{ width: "fit-content", cursor: "pointer" }}
                  value={task.TaskId}
                  onClick={() => {
                    setCurrentOpenedTask(task);
                  }}
                >
                  {task.customer_name}
                </div>
              </div>
              <div
                className="col-2 col-md-2 col-sm-2 col-xl-2 d-none d-sm-block"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setCurrentOpenedTask(task);
                }}
              >
                {task.assign_to !== null ? (
                  <div className="d-flex">
                    {props.user.UserType === 4 ? (
                      task.approver_name === null ? null : (
                        <div className="circle-name d-none d-sm-block">
                          <div className="circle-text">
                            {props.user.UserType === 4 &&
                              getInitials(task.approver_name)}
                          </div>
                        </div>
                      )
                    ) : (
                      <div className="circle-name d-none d-sm-block">
                        <div className="circle-text">
                          {getInitials(task.assign_to_name)}
                        </div>
                      </div>
                    )}
                    {props.user.UserType === 4 ? (
                      <div className="circle-front-text d-none d-sm-block">
                        {task.approver_name === null
                          ? "No Approver"
                          : task.approver_name}
                      </div>
                    ) : (
                      <div className="circle-front-text d-none d-sm-block">
                        {_getAssignedName(task.assign_to_name)}
                      </div>
                    )}
                  </div>
                ) : userDetails.UserType === 3 ? (
                  <div>
                    <div
                      className="circle-front-text NoStatus"
                      style={{ color: "#6c5dd3" }}
                    >
                      {" "}
                      <img src={assignIconCircle} alt="" /> ASSIGN
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="col-2">
                <div className="align-right">
                  <div className="d-flex">
                    <div
                      className={
                        Status === "Overdue"
                          ? "red-week d-none d-sm-block"
                          : "black-week d-none d-sm-block"
                      }
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setCurrentOpenedTask(task);
                      }}
                    >
                      {getDayDate(task.due_date, 1)}
                    </div>
                    <div
                      className="right-arrow-week-company text-right-grid"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setCurrentOpenedTask(task);
                      }}
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
                      {showUserToolTip === `Tooltip${task.TaskId}` && (
                        <div className="toolTip-input">
                          <div className="tooltiptext1 mobDisplaynone">
                            <span className="font-normal-text1">
                              {_getAssignedName(task.assign_to_name)}
                            </span>
                          </div>
                        </div>
                      )}
                      {task.assign_to === null && (
                        <div className="only-mobile-assign-add d-block d-sm-none">
                          <div
                            className="assign-user-icon"
                            onMouseOver={() =>
                              setShowUserToolTip(`Tooltip${task.TaskId}`)
                            }
                            onMouseOut={() => setShowUserToolTip("")}
                          >
                            <img
                              src={assignIconCircle}
                              className="d-block d-sm-none"
                              alt="Assign Circle"
                            />
                          </div>
                        </div>
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
              setCurrentOpenedTask(task);
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
              <div className="col-10 col-md-6 col-sm-6 col-xl-6">
                <div className="all-companies-sub-title">
                  <div
                    onClick={() => {
                      setCurrentOpenedTask(task);
                    }}
                    style={{ cursor: "pointer", display: "flex" }}
                  >
                    <span className="pink-label-title-right">
                      <div className="overdue-title">{task.TaskName}</div>
                      <div
                        className={
                          Status === "Overdue"
                            ? "red-week d-block d-sm-none"
                            : "black-week d-block d-sm-none"
                        }
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setCurrentOpenedTask(task);
                        }}
                      >
                        <div className="d-block d-sm-none">
                          {getDayDate(task.due_date, 2)}
                        </div>
                      </div>
                      {task.status !== "Assigned" && (
                        <p
                          className="pink-label-text"
                          style={{
                            backgroundColor:
                              task && task.status
                                ? task.status === "Not Assigned"
                                  ? "#fcf3cd"
                                  : task.status === "Approval Pending"
                                  ? moment(task.due_date).isBefore(today)
                                    ? "#cdfcd8"
                                    : "#ffefea"
                                  : task.status === "Approved"
                                  ? "#cdfcd8"
                                  : task.status === "Assigned"
                                  ? "#ffefea"
                                  : task.status === "Rejected"
                                  ? "#ffefea"
                                  : "#d2fccd"
                                : "#d2fccd",
                            color:
                              task && task.status
                                ? task.status === "Approval Pending"
                                  ? moment(task.due_date).isBefore(today)
                                    ? "#7fba7a"
                                    : "#ff5f31"
                                  : task.status === "Approved"
                                  ? "#7fba7a"
                                  : task.status === "Assigned"
                                  ? "#f8c102"
                                  : task.status === "Not Assigned"
                                  ? "#f8c102"
                                  : task.status === "Rejected"
                                  ? "#ff5f31"
                                  : ""
                                : "#fcf3cd",
                          }}
                        >
                          {task.status && task.status === "Approval Pending"
                            ? moment(task.due_date).isBefore(today)
                              ? "NOT REVIEWED"
                              : "Approval Pending"
                            : task.status === "Not Assigned"
                            ? "Assign Task"
                            : task.status === "Assigned"
                            ? "Task Assigned"
                            : task.status === "Approved"
                            ? "Task Approved"
                            : task.status === "Rejected"
                            ? "Task Rejected"
                            : ""}
                        </p>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-2 col-md-2 col-sm-2 col-xl-2 d-none d-sm-block">
                <div
                  className="circle-front-text"
                  style={{ width: "fit-content", cursor: "pointer" }}
                  value={task.TaskId}
                  onClick={() => {
                    setCurrentOpenedTask(task);
                  }}
                >
                  {task.customer_name}
                </div>
              </div>
              <div
                className="col-2 col-md-2 col-sm-2 col-xl-2 d-none d-sm-block"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setCurrentOpenedTask(task);
                }}
              >
                {task.assign_to !== null ? (
                  <div className="d-flex">
                    {props.user.UserType === 4 ? (
                      task.approver_name === null ? null : (
                        <div className="circle-name d-none d-sm-block">
                          <div className="circle-text">
                            {props.user.UserType === 4 &&
                              getInitials(task.approver_name)}
                          </div>
                        </div>
                      )
                    ) : (
                      <div className="circle-name d-none d-sm-block">
                        <div className="circle-text">
                          {getInitials(task.assign_to_name)}
                        </div>
                      </div>
                    )}
                    {props.user.UserType === 4 ? (
                      <div className="circle-front-text d-none d-sm-block">
                        {task.approver_name === null
                          ? "No Approver"
                          : task.approver_name}
                      </div>
                    ) : (
                      <div className="circle-front-text d-none d-sm-block">
                        {_getAssignedName(task.assign_to_name)}
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div
                      className="circle-front-text NoStatus"
                      style={{ color: "#6c5dd3" }}
                    >
                      {" "}
                      <img src={assignIconCircle} alt="" /> ASSIGN
                    </div>
                  </div>
                )}
              </div>
              <div className="col-2">
                <div className="align-right">
                  <div className="d-flex">
                    <div
                      className={
                        Status === "Overdue"
                          ? "red-week d-none d-sm-block"
                          : "black-week d-none d-sm-block"
                      }
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setCurrentOpenedTask(task);
                      }}
                    >
                      {getDayDate(task.due_date, 1)}
                    </div>
                    <div
                      className="right-arrow-week-company text-right-grid"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setCurrentOpenedTask(task);
                      }}
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
                      {showUserToolTip === `Tooltip${task.TaskId}` && (
                        <div className="toolTip-input">
                          <div className="tooltiptext1 mobDisplaynone">
                            <span className="font-normal-text1">
                              {_getAssignedName(task.assign_to_name)}
                            </span>
                          </div>
                        </div>
                      )}
                      {task.assign_to === null && (
                        <div className="only-mobile-assign-add d-block d-sm-none">
                          <div
                            className="assign-user-icon"
                            onMouseOver={() =>
                              setShowUserToolTip(`Tooltip${task.TaskId}`)
                            }
                            onMouseOut={() => setShowUserToolTip("")}
                          >
                            <img
                              src={assignIconCircle}
                              className="d-block d-sm-none"
                              alt="Assign Circle"
                            />
                          </div>
                        </div>
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
        style={{ textDecoration: "none" }}
        onClick={() => {
          setCurrentOpenedTask(task);
        }}
      >
        <div
          className={
            props.currentOpenedTask &&
            task.task_name === props.currentOpenedTask.task_name
              ? " row active-action-card-sidebar "
              : "row action-card-sidebar"
          }
          onClick={(e) => setCurrentOpenedTask(task)}
          style={{ cursor: "pointer" }}
        >
          <div className="col-10 pl-0">
            <div className="all-companies-sub-title">
              <div
                className="pink-label-title-right"
                onClick={(e) => setCurrentOpenedTask(task)}
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
                  onClick={(e) => setCurrentOpenedTask(task)}
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
          {companyTaskData &&
          props.sideBarTaskList === false &&
          companyTaskData.length > 0
            ? companyTaskData.map((item, index) => {
                return (
                  <>
                    {item.status && item.status !== "Norec" && (
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
                                {!expandedFlags.includes(index) ? (
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
                                        {task.license !== "Norec" &&
                                          renderTaskList(
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
                                      {assignRowCount[item.status.trim()] >
                                        3 && (
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
                                          View All ({item.tasks.length - 3}{" "}
                                          MORE)
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
                    )}
                  </>
                );
              })
            : ""}
        </div>
        <>
          {companyTaskData &&
            props.sideBarTaskList === true &&
            companyTaskData.length > 0 &&
            companyTaskData.map((item, index) => {
              return (
                <div className="all-companies-task-grid-2 inside-padding-sidebar">
                  <div className="">
                    <div className="task-list-grid">
                      <div className="upcoming-btn mb-1">
                        <div
                          style={{ cursor: "pointer", padding: "0px 7px 0px" }}
                          className="upcoming-title"
                        >
                          {item.status}
                        </div>
                      </div>
                      {item.status.trim() != "Overdue" &&
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
                                  {assignRowCount[item.status.trim()] === 3 && (
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
              );
            })}
        </>
      </div>
    </div>
  );
}
