import React, { useState, useEffect } from "react";
import moment from "moment";
import "../style.css";
import viewAllArow from "../../../../../../../assets/Icons/viewAllArow.png";
import viewAllArowTop from "../../../../../../../assets/Icons/viewAllArowTop.png";
// import "../BoardView/style.css"
import keyboardArrowRightBlack from "../../../../../../../assets/Icons/keyboardArrowRightBlack.png";
import axios, { post } from "axios";
import { withRouter } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../../../../../../apiServices/baseurl";
import downArrow from "../../../../../../../assets/Icons/downArrow.png";
import upArrow from "../../../../../../../assets/Icons/topArrowAccordian.png";
import { Link } from "react-router-dom";
import { actions as notificationActions } from "../../notification/Redux/actions.js";
import { useSelector, useDispatch, connect } from "react-redux";
import { setNotificationTaskId } from "../../notification/Redux/Action";

export default function AssignedView(props) {
  console.log(props);
  const [rowCount, setRowCount] = useState([]);
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
    const payload = {
      entityid: "3",
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
        setLicensetaskData(fileData);
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
          <div className="col-10 col-md-7 col-sm-7 col-xl-7">
            <div className="all-companies-sub-title">
              <div
                onClick={(e) => getSelectTaskDetails(task)}
                style={{ cursor: "pointer", display: "flex" }}
              >
                <div class="graybox-left">
                  <span class="all-companies-nse-label">
                    {task.LicenseCode}
                  </span>
                </div>
                <span className="pink-label-title-right">
                  <div className="overdue-title">{task.TaskName}</div>
                  <div
                    // className="black-week d-block d-sm-none"
                    className="black-week "
                    style={{ cursor: "pointer" }}
                    onClick={(e) => getSelectTaskDetails(task)}
                  >
                    <div className="d-block d-sm-none">
                      {getDayDate(task.EndDate, 2)}
                    </div>
                    {task.Status !== "Assigned" && (
                      <span
                        className="pink-label-text"
                        style={{
                          backgroundColor:
                            task && task.Status
                              ? task.Status === "Assign"
                                ? "#fcf3cd"
                                : // task.Status === "Completed By User"  ? "#cdfcd8 " :
                                task.Status === "Completed By User"
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
                                : // task.Status === "Completed By User" ? "#7fba7a" :
                                task.Status === "Approved"
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
                            ? "Not reviewed"
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
              {task.EntityName}
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
                  {getDayDate(task.EndDate, 1)}
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
                  {task.AssignedTo !== 0 && (
                    <img
                      className="d-block d-sm-none"
                      src={keyboardArrowRightBlack}
                      alt="Right Arrow"
                    />
                  )}
                  {
                    // task.AssignedTo > 0 &&
                    //   task.AssignedTo === 0 && (
                    //     <div className="only-mobile-assign-add d-block d-sm-none">
                    //       <div
                    //         className="assign-user-icon"
                    //         onMouseOver={() =>
                    //           setShowUserToolTip(`Tooltip${task.TaskId}`)
                    //         }
                    //         onMouseOut={() => setShowUserToolTip("")}
                    //       >
                    //         <img
                    //           src={assignIconCircle}
                    //           className="d-block d-sm-none"
                    //           alt="Assign Circle"
                    //         />
                    //       </div>
                    //     </div>
                    //   )
                  }
                </div>
              </div>
            </div>
          </div>
          {/* {Status === "overdue" && (
              <div className="redWidth-bottom">
                <div className="redLine">
                  {" "}
                  <img src={RedLine} alt="" />
                </div>
              </div>
            )} */}
        </div>
      </Link>
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
            props.getTaskById && task.TaskId == props.getTaskById.TaskId
              ? " row active-action-card-sidebar "
              : "row action-card-sidebar"
          }
          onClick={(e) => getSelectTaskDetails(task)}
          style={{ cursor: "pointer" }}
        >
          <div className="col-10 pl-0">
            <div className="all-companies-sub-title">
              <div className="graybox-left">
                <span className="all-companies-nse-label">
                  {task.LicenseCode}
                </span>{" "}
              </div>
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
  // console.log("licensetaskData => ",licensetaskData);

  return (
    <div>
      <div className="task-list-grid">
        <div className="">
          {
            licensetaskData &&
            props.sideBarTaskList === false &&
            licensetaskData.length > 0
              ? licensetaskData.map((item, index) => {
                  return (
                    <>
                      {/* { item.Status !== "Assign" && */}
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
                                      {renderTaskList(
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
                                          MORE )
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
                      {/* // } */}
                    </>
                  );
                })
              : ""
            // <div>Data Not Available</div>
          }
        </div>
        {licensetaskData &&
          props.sideBarTaskList === true &&
          licensetaskData.length > 0 &&
          licensetaskData.map((item, index) => {
            return (
              <>
                {item.Status !== "Assign" && (
                  <div className="all-companies-task-grid-2 inside-padding-sidebar">
                    <div className="">
                      <div className="task-list-grid">
                        <div
                          className="upcoming-btn mb-3"
                          style={{ cursor: "pointer", padding: "0px 7px 0px" }}
                        >
                          {item.Status}{" "}
                        </div>
                        {item.Status.trim() === "overdue" &&
                          item.Details.slice(
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
                )}
              </>
            );
          })}
      </div>
    </div>
  );
}
