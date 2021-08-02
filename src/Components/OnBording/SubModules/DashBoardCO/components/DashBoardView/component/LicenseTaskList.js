import React, { useState, useEffect } from "react";
import moment from "moment";
import "../style.css";
import viewAllArow from "../../../../../../../assets/Icons/viewAllArow.png";
import viewAllArowTop from "../../../../../../../assets/Icons/viewAllArowTop.png";
import keyboardArrowRightBlack from "../../../../../../../assets/Icons/keyboardArrowRightBlack.png";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../../../../../../apiServices/baseurl";
import assignIconCircle from "../../../../../../../assets/Icons/assignIconCircle.png";
import downArrow from "../../../../../../../assets/Icons/downArrow.png";
import upArrow from "../../../../../../../assets/Icons/topArrowAccordian.png";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setNotificationTaskId } from "../../notification/Redux/Action";

export default function LicenseTaskList(props) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [assignRowCount, setAssignRowCount] = useState([]);
  const [companyTaskData, setCompanyTaskData] = useState([]);
  const [today, setToday] = useState(new Date());
  const [showUserToolTip, setShowUserToolTip] = useState("");
  const [expandedFlags, setExpandedFlags] = useState([]);
  const userDetails = state && state.auth && state.auth.loginInfo;

  useEffect(() => {
    const payload = {
      entityid: "1",
      userID: props.user.UserID,
      usertype: props.user.UserType,
    };
    axios
      .post(`${BACKEND_BASE_URL}/api/getTaskReport`, payload)
      .then((response) => {
        let rowCount = [];
        response.data.map((item) => {
          rowCount[item.Status.trim()] = 3;
        });
        setAssignRowCount(rowCount);
        let fileData = response.data;
        setCompanyTaskData(fileData);
      })
      .catch((error) => {
        console.log("error => ", error);
      });
  }, []);

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

  const getSelectTaskDetails = (e) => {};
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
      <Link
        to="/dashboard"
        style={{ textDecoration: "none" }}
        onClick={() => {
          if (userDetails && userDetails.UserType !== 6) {
            dispatch(setNotificationTaskId(task.TaskId));
          }
        }}
        style={{
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
                onClick={(e) => getSelectTaskDetails(task)}
                style={{ cursor: "pointer", display: "flex" }}
              >
                <span className="pink-label-title-right">
                  <div className="overdue-title">{task.TaskName}</div>
                  <div
                    className={
                      Status === "overdue"
                        ? "red-week d-block d-sm-none"
                        : "black-week d-block d-sm-none"
                    }
                    style={{ cursor: "pointer" }}
                    onClick={(e) => getSelectTaskDetails(task)}
                  >
                    <div className="d-block d-sm-none">
                      {getDayDate(task.EndDate, 2)}
                    </div>
                  </div>
                  {task.Status !== "Assigned" && (
                    <p
                      className="pink-label-text"
                      style={{
                        backgroundColor:
                          task && task.Status
                            ? task.Status === "Assign"
                              ? "#fcf3cd"
                              : task.Status === "Completed By User"
                              ? moment(task.EndDate).isBefore(today)
                                ? "#cdfcd8"
                                : "#ffefea"
                              : task.Status === "Approved"
                              ? "#cdfcd8"
                              : task.Status === "Assigned"
                              ? "#ffefea"
                              : task.Status === "Request Rejected"
                              ? "#ffefea"
                              : "#d2fccd"
                            : "#d2fccd",
                        color:
                          task && task.Status
                            ? task.Status === "Completed By User"
                              ? moment(task.EndDate).isBefore(today)
                                ? "#7fba7a"
                                : "#ff5f31"
                              : task.Status === "Approved"
                              ? "#7fba7a"
                              : task.Status === "Assigned"
                              ? "#f8c102"
                              : task.Status === "Assign"
                              ? "#f8c102"
                              : task.Status === "Request Rejected"
                              ? "#ff5f31"
                              : ""
                            : "#fcf3cd",
                      }}
                    >
                      {task.Status && task.Status === "Completed By User"
                        ? moment(task.EndDate).isBefore(today)
                          ? "NOT REVIEWED"
                          : "Approval Pending"
                        : task.Status === "Assign"
                        ? "Assign Task"
                        : task.Status === "Assigned"
                        ? "Task Assigned"
                        : task.Status === "Approved"
                        ? "Task Approved"
                        : task.Status === "Request Rejected"
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
              onClick={(e) => getSelectTaskDetails(task)}
            >
              {task.EntityName}
            </div>
          </div>
          <div
            className="col-2 col-md-2 col-sm-2 col-xl-2 d-none d-sm-block"
            style={{ cursor: "pointer" }}
            onClick={(e) => getSelectTaskDetails(task)}
          >
            {task.AssignedTo != 0 ? (
              <div className="d-flex">
                {props.user.UserType === 4 ? (
                  task.ApproverName === "Assign" ? null : (
                    <div className="circle-name d-none d-sm-block">
                      <div className="circle-text">
                        {props.user.UserType === 4 &&
                          getInitials(task.ApproverName)}
                      </div>
                    </div>
                  )
                ) : (
                  <div className="circle-name d-none d-sm-block">
                    <div className="circle-text">
                      {getInitials(task.AssignedName)}
                    </div>
                  </div>
                )}
                {props.user.UserType === 4 ? (
                  <div className="circle-front-text d-none d-sm-block">
                    {task.ApproverName === "Assign"
                      ? "No Approver"
                      : task.ApproverName}
                  </div>
                ) : (
                  <div className="circle-front-text d-none d-sm-block">
                    {_getAssignedName(task.AssignedName)}
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
                    Status === "overdue"
                      ? "red-week d-none d-sm-block"
                      : "black-week d-none d-sm-block"
                  }
                  style={{ cursor: "pointer" }}
                  onClick={(e) => getSelectTaskDetails(task)}
                >
                  {getDayDate(task.EndDate, 1)}
                </div>
                <div
                  className="right-arrow-week-company text-right-grid"
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
                  {task.AssignedTo !== 0 && (
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
                          {_getAssignedName(task.AssignedName)}
                        </span>
                      </div>
                    </div>
                  )}
                  {task.AssignedTo === 0 && (
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
    );
  };
  const renderSidebarTaskList = (task, Status, listType) => {
    return (
      <Link
        style={{ textDecoration: "none" }}
        onClick={() => {
          dispatch(setNotificationTaskId(task.TaskId));
        }}
      >
        <div
          className={
            props.getTaskById && task.TaskId == props.getTaskById.TaskId
              ? " row active-action-card-sidebar "
              : "row action-card-sidebar"
          }
          onClick={(e) => getSelectTaskDetails(task)}
          style={{ cursor: "pointer" }}
        >
          <div className="col-10 pl-0">
            <div className="all-companies-sub-title">
              <div
                className="pink-label-title-right"
                onClick={(e) => getSelectTaskDetails(task)}
              >
                <div className="overdue-title-sidebar-title pl-1">
                  {task.TaskName}
                </div>
                <div
                  className="red-week  date-font pl-1"
                  style={{ cursor: "pointer" }}
                >
                  {getDayDate(task.EndDate, 2)}
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
          {companyTaskData &&
          props.sideBarTaskList === false &&
          companyTaskData.length > 0
            ? companyTaskData.map((item, index) => {
                return (
                  <>
                    {item.Status && item.Status !== "Norec" && (
                      <div className="take-action customHeight">
                        <div className="task-list-grid">
                          {item.Status && (
                            <div
                              className="upcoming-btn"
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
                                {item.Status}
                                <span className="black-circle">
                                  <p className="black-circle-text">
                                    {item.Details.length}
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
                                item.Details.slice(
                                  0,
                                  assignRowCount[item.Status.trim()]
                                ).map((task) => {
                                  return (
                                    <>
                                      {task.LicenseCode !== "Norec" &&
                                        renderTaskList(
                                          task,
                                          item.Status.trim(),
                                          1
                                        )}
                                    </>
                                  );
                                })}
                              <div>
                                {!expandedFlags.includes(index) &&
                                  item.Details.length > 3 && (
                                    <>
                                      {assignRowCount[item.Status.trim()] >
                                        3 && (
                                        <div
                                          onClick={() =>
                                            AssignShowLessMore(item.Status, 3)
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
                                      {assignRowCount[item.Status.trim()] ===
                                        3 && (
                                        <div
                                          onClick={() =>
                                            AssignShowLessMore(
                                              item.Status,
                                              item.Details.length
                                            )
                                          }
                                          className="viewAll"
                                        >
                                          View All ({item.Details.length - 3}{" "}
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
                          {item.Status}
                        </div>
                      </div>
                      {item.Status.trim() != "overdue" &&
                        (item.Status.trim() === "Pending"
                          ? true
                          : !expandedFlags.includes(index)) && (
                          <>
                            {item.Details.slice(
                              0,
                              assignRowCount[item.Status.trim()]
                            ).map((task) => {
                              return (
                                <>
                                  {renderSidebarTaskList(
                                    task,
                                    item.Status.trim(),
                                    1
                                  )}
                                </>
                              );
                            })}
                            <div>
                              {item.Details.length > 3 && (
                                <>
                                  {assignRowCount[item.Status.trim()] > 3 && (
                                    <div
                                      onClick={() =>
                                        AssignShowLessMore(item.Status, 3)
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
                                  {assignRowCount[item.Status.trim()] === 3 && (
                                    <div
                                      onClick={() =>
                                        AssignShowLessMore(
                                          item.Status,
                                          item.Details.length
                                        )
                                      }
                                      className="viewAll"
                                    >
                                      View All ({item.Details.length - 3} )
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
