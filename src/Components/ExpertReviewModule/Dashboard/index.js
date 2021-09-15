import React, { useCallback, useEffect, useState } from "react";
import complteTaskIcon from "../../../assets/Icons/complteTaskIcon.png";
import scheduledIcon from "../../../assets/Icons/scheduledIcon.png";
import viewall from "../../../assets/ERIcons/viewall.png";
import deadline from "../../../assets/ERIcons/deadline.png";
import downArrow from "../../../assets/Icons/downArrow.png";
import RedLine from "../../../assets/Icons/RedLine.png";
import keyboardArrowRightBlack from "../../../assets/Icons/keyboardArrowRightBlack.png";
import assignIconCircle from "../../../assets/Icons/assignIconCircle.png";
import { AiFillInfoCircle, AiFillCheckCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { actions as taskReportActions } from "../../OnBording/SubModules/DashBoardCO/redux/actions";

import "./style.css";
import { getIntialName } from "../../../CommonModules/helpers/GetIntialName.helper";
import LicenseTaskList from "../../OnBording/SubModules/DashBoardCO/components/DashBoardView/component/LicenseTaskList";
import CompanyTaskList from "../../OnBording/SubModules/DashBoardCO/components/DashBoardView/component/companyList";
import AssignedView from "../../OnBording/SubModules/DashBoardCO/components/DashBoardView/component/AssignedView";
import moment from "moment";
import { Link } from "react-router-dom";
import { setNotificationTaskId } from "../../OnBording/SubModules/DashBoardCO/components/notification/Redux/Action";
import TaskDetailView from "../TaskDetails";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../../apiServices/baseurl";

const Dashboard = () => {
  const [sortBy, setSortBy] = useState("Task Status");
  const [viewAllBy, setViewAllBy] = useState("ovedue");
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showUserToolTip, setShowUserToolTip] = useState("");
  const [isTaskDetailsShow, setIsTaskDetailsShow] = useState(false);
  const [showFiles, setShowFiles] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [showHtoDoIt, setShowHtoDoIt] = useState(false);
  const [today, setToday] = useState(new Date());
  const [currentTaskData, setCurrentTaskData] = useState([]);
  const [thingOnTrack, setThingOnTrack] = useState({});
  const [expandedFlags, setExpandedFlags] = useState([1]);

  const handleExpandFlag = (flag, type) => {
    if (flag && !expandedFlags.includes(type)) {
      setExpandedFlags([...expandedFlags, type]);
    } else if (!flag && expandedFlags.includes(type)) {
      const _expandedFlags = expandedFlags.filter(
        (element) => element !== type
      );
      setExpandedFlags(_expandedFlags);
    }
  };
  const handleTaskDetailsClose = () => {
    if (isTaskDetailsShow) {
      setIsTaskDetailsShow(false);
    }
  };
  const [upcomingList, setUpcomingList] = useState({
    list: [],
    slicedList: [],
  });

  const [rowCount, setRowCount] = useState([]);

  const [overdueList, setOverdueList] = useState({
    list: [],
    slicedList: [],
  });

  const [completedList, setCompletedList] = useState({
    list: [],
    slicedList: [],
  });

  const [reviewList, setReviewList] = useState({
    list: [],
    slicedList: [],
  });

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const taskList = state?.taskReport.taskReport?.taskReport;

    //Filter upcoming list and sliced them into three if lenght is greater than 3
    const upcomingList = taskList?.filter(
      (list) => list.Status === "Upcoming"
    )[0].Details;
    const sliceUpcomingList =
      upcomingList?.length > 3 ? upcomingList.slice(0, 3) : upcomingList;

    setUpcomingList({ list: upcomingList, slicedList: sliceUpcomingList });

    //Filter overdue list and sliced them into three if lenght is greater than 3
    const overdueDetailList = taskList?.filter(
      (list) => list.Status === "overdue"
    )[0].Details;
    const sliceOverdueList =
      overdueDetailList?.length > 3
        ? overdueDetailList.slice(0, 3)
        : overdueDetailList;

    setOverdueList({ list: overdueDetailList, slicedList: sliceOverdueList });

    //Filter commplted list and sliced them into three if lenght is greater than 3
    const completedList = taskList?.filter(
      (list) => list.Status === "Completed"
    )[0].Details;
    const sliceCompletedList =
      completedList?.length > 3 ? completedList.slice(0, 3) : completedList;

    setCompletedList({ list: completedList, slicedList: sliceCompletedList });

    //Filter review list and sliced them into three if lenght is greater than 3
    const reviewList = taskList?.filter(
      (list) => list.Status === "Review Now"
    )[0].Details;
    const sliceReviewList =
      reviewList?.length > 3 ? reviewList.slice(0, 3) : reviewList;

    setReviewList({ list: reviewList, slicedList: sliceReviewList });
  }, [state?.taskReport.taskReport?.taskReport]);

  const userDetails = state && state.auth && state.auth.loginInfo;

  const viewAll = (type, symbol) => {
    const taskList = state?.taskReport.taskReport?.taskReport;
    const lists = taskList?.filter((list) => list.Status === type)[0].Details;
    type === "Upcoming" && setUpcomingList({ list: lists, slicedList: lists });
    type === "overdue" && setOverdueList({ list: lists, slicedList: lists });
    type === "Review Now" && setReviewList({ list: lists, slicedList: lists });
    type === "Completed" &&
      setCompletedList({ list: lists, slicedList: lists });
    setViewAllBy(symbol);
  };

  const showLess = (type) => {
    const taskList = state?.taskReport.taskReport?.taskReport;
    const lists = taskList?.filter((list) => list.Status === type)[0].Details;
    const sliceList = lists?.length > 3 ? lists.slice(0, 3) : lists;

    type === "Upcoming" &&
      setUpcomingList({ list: lists, slicedList: sliceList });
    type === "overdue" &&
      setOverdueList({ list: lists, slicedList: sliceList });
    type === "Review Now" &&
      setReviewList({ list: lists, slicedList: sliceList });
    type === "Completed" &&
      setCompletedList({ list: lists, slicedList: sliceList });
    setViewAllBy(type);
  };

  const searchTask = (searchText) => {
    const taskList = state?.taskReport.taskReport?.taskReport;
    setSearchValue(searchText);
    let tempArr = [];
    if (searchText === "") {
      setSortBy("Task Status");
    }
    if (searchText !== "") {
      taskList &&
        taskList.forEach((obj1) => {
          obj1.Details.forEach((obj2) => {
            if (obj2.TaskName !== "Norec") {
              if (
                obj2.TaskName.toLowerCase().includes(
                  searchText.toLowerCase()
                ) ||
                obj2.EntityName.toLowerCase().includes(
                  searchText.toLowerCase()
                ) ||
                obj2.LicenseCode.toLowerCase().includes(
                  searchText.toLowerCase()
                ) ||
                obj2.AssignedName.toLowerCase().includes(
                  searchText.toLowerCase()
                )
              ) {
                let task = { Status: obj1.Status, data: obj2 };
                tempArr.push(task);
              }
            }
          });
        });
      setSearchResult(tempArr);
      setSortBy("Search");
    }
  };

  const getSelectTaskDetails = (e) => {
    setShowFiles(true);
    setShowComments(false);
    setCurrentTaskData(e);
    let taskID = null;
    let task_id = null;

    if (task_id !== null && e === undefined) {
      taskID = task_id;
    } else {
      taskID = e.TaskId;
    }
    dispatch(
      taskReportActions.taskReportByIdRequest({
        taskID: taskID,
      })
    );
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

  const _getAssignedName = (name) => {
    let str = "";
    if (name.length < 11) {
      str = name;
    } else {
      str = `${name.slice(0, 9)}...`;
    }
    return str;
  };

  const fetchQuickOverViewSectionData = () => {
    const payload = {
      entityid: "0",
      userID: userDetails.UserID,
      usertype: userDetails.UserType,
    };
    axios
      .post(`${BACKEND_BASE_URL}/api/DashBoardAnalytics`, payload)
      .then((response) => {
        console.log(response);
        if (response && response.data && response.data.length > 0) {
          let temp = response.data[0];
          setThingOnTrack(temp);
        }
      })
      .catch((error) => {});
  };

  const renderTaskList = (task, Status, listType) => {
    return (
      <div
        // to="/dashboard"
        style={{ textDecoration: "none" }}
        onClick={() => {
          if (userDetails && userDetails.UserType !== 6) {
            // dispatch(setNotificationTaskId(task.TaskId));
            setIsTaskDetailsShow(true);
            dispatch(
              taskReportActions.taskReportByIdRequest({
                taskID: task.TaskId,
              })
            );
            localStorage.setItem(
              "expandedFlagss",
              expandedFlags,
              "allRowCount-copy",
              rowCount
            );
            localStorage.setItem("allRowCount", JSON.stringify(rowCount));
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
          {listType === 1 && Status === "overdue" && (
            <div className="redWidth">
              <div className="redLine">
                {" "}
                <img src={RedLine} alt="" />
              </div>
            </div>
          )}
          <div className="col-10 col-md-5 col-sm-5 col-xl-5">
            <div className="all-companies-sub-title new-task-list">
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
                      className="pink-label-text d-none d-sm-block"
                      style={{
                        backgroundColor:
                          task && task.Status
                            ? task.Status === "Assign"
                              ? "#fcf3cd"
                              : task.Status === "Completed By User"
                              ? moment(task.ActualTaskEndDate).isBefore(today)
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
                              ? moment(task.ActualTaskEndDate).isBefore(today)
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
                        ? moment(task.ActualTaskEndDate).isBefore(today)
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
            className="col-2 col-md-3 col-sm-3 col-xl-3 d-none d-sm-block"
            style={{ cursor: "pointer" }}
            onClick={(e) => getSelectTaskDetails(task)}
          >
            {task.AssignedTo != 0 ? (
              <div className="d-flex new-task-list">
                {userDetails.UserType === 4 ? (
                  task.ApproverName === "Assign" ? null : (
                    <div className="circle-name d-none d-sm-block">
                      <div className="circle-text">
                        {userDetails.UserType === 4 &&
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

                {userDetails.UserType === 4 ? (
                  <div className="circle-front-text d-none d-sm-block">
                    {task.ApproverName === "Assign"
                      ? "No Approver"
                      : task.ApproverName}
                  </div>
                ) : (
                  <div className="circle-front-text d-none d-sm-block mail">
                    {_getAssignedName(task.AssignedName)}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="circle-front-text NoStatus">
                  {" "}
                  <img src={assignIconCircle} alt="" /> ASSIGN
                </div>
              </div>
            )}
          </div>
          <div className="col-2">
            <div className="align-right task-list-new">
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
                  className="right-arrow-week text-right-grid"
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
                          {task.AssignedName}
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
          {Status === "overdue" && searchValue === "" && (
            <div className="redWidth-bottom">
              <div className="redLine">
                {" "}
                <img src={RedLine} alt="" />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  useEffect(() => {
    dispatch(
      taskReportActions.taskReportRequest({
        userID: userDetails.UserID,
        usertype: userDetails.UserType,
      })
    );
    fetchQuickOverViewSectionData();
  }, []);
  return (
    <>
      {isTaskDetailsShow && (
        <TaskDetailView closeTaskDetails={handleTaskDetailsClose} />
      )}
      {!isTaskDetailsShow && (
        <div className="ER-main">
          <div className="ER-task-statics row">
            <h3>Tasks</h3>
            <div className="active-task"></div>
            <div className="task-statics row">
              <div className="static-card">
                <img src={complteTaskIcon} alt="complte-Task-icon" />
                <span>Completed</span>
                <span>
                  {thingOnTrack && thingOnTrack.CompletedTask !== "Norec"
                    ? thingOnTrack.CompletedTask
                    : "00"}
                </span>
              </div>
              <div className="static-card">
                <img src={scheduledIcon} alt="complte-Task-icon" />
                <span>Scheduled</span>
                <span>
                  {" "}
                  {thingOnTrack && thingOnTrack.SchedulededTask !== "Norec"
                    ? thingOnTrack.SchedulededTask
                    : "00"}
                </span>
              </div>
              <div className="static-card">
                <img src={complteTaskIcon} alt="complte-Task-icon" />
                <span>Rejected</span>
                <span>
                  {" "}
                  {thingOnTrack && thingOnTrack.RiskTask !== "Norec"
                    ? thingOnTrack.RiskTask
                    : "00"}
                </span>
              </div>
            </div>
            <div className="ER-search-input">
              <input
                className="form-control ER-search"
                placeholder="Search by task, company and license"
                value={searchValue}
                onChange={(e) => searchTask(e.target.value)}
              />{" "}
            </div>
          </div>

          {sortBy !== "Search" && (
            <div>
              <ul className="sort-by-filter">
                <span className="sort-by">View by</span>
                <span
                  className={
                    sortBy == "Task Status"
                      ? "sort-filter-active"
                      : "sort-filter-inactive"
                  }
                  onClick={() => setSortBy("Task Status")}
                >
                  Task Status
                </span>
                <span
                  className={
                    sortBy == "Company Name"
                      ? "sort-filter-active"
                      : "sort-filter-inactive"
                  }
                  onClick={() => setSortBy("Company Name")}
                >
                  Company Name
                </span>
                <span
                  className={
                    sortBy == "Licenses"
                      ? "sort-filter-active"
                      : "sort-filter-inactive"
                  }
                  onClick={() => setSortBy("Licenses")}
                >
                  Licenses
                </span>
                <span
                  className={
                    sortBy == "Task"
                      ? "sort-filter-active"
                      : "sort-filter-inactive"
                  }
                  onClick={() => setSortBy("Task")}
                >
                  Task
                </span>
              </ul>
            </div>
          )}

          {sortBy === "Task Status" && (
            <div className="ER-task-container">
              <div className="ER-take-action">
                <div className="task-list-grid">
                  <div className="upcoming-btn">
                    <div
                      className="overdue-title"
                      onClick={() => {
                        if (expandedFlags && !expandedFlags.includes(1)) {
                          handleExpandFlag(true, 1);
                        } else {
                          handleExpandFlag(false, 1);
                        }
                      }}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      {"Overdue"}
                      <span className="overdue-circle">
                        <p className="overdue-circle-text">
                          {overdueList && overdueList?.list?.length}
                        </p>
                      </span>
                      <img
                        src={downArrow}
                        className="arrowDown task__down-arrow"
                        alt="Arrow down"
                        style={{
                          ...(expandedFlags.includes(1) && {
                            transform: "rotate(180deg)",
                          }),
                        }}
                      />
                    </div>
                  </div>
                  {expandedFlags.includes(1) && (
                    <>
                      <img src={deadline} />
                      {overdueList &&
                        overdueList?.slicedList?.map((filterdList) => (
                          <TaskListItem
                            filterdList={filterdList}
                            category="overdue"
                            setShowTaskDetails={setIsTaskDetailsShow}
                          />
                        ))}

                      {overdueList?.list?.length > 3 && (
                        <div className="ER-view-all-conatiner">
                          {viewAllBy === "overdue-less" ? (
                            <>
                              <div
                                style={{ cursor: "pointer" }}
                                onClick={() => showLess("overdue")}
                              >
                                <span>Show less</span>
                                <img src={viewall} />{" "}
                              </div>
                            </>
                          ) : (
                            <>
                              {" "}
                              <div
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  viewAll("overdue", "overdue-less")
                                }
                              >
                                <span>
                                  View All ({upcomingList?.list?.length - 3}{" "}
                                  More)
                                </span>
                                <img src={viewall} />
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="ER-take-action">
                <div className="task-list-grid">
                  <div className="upcoming-btn">
                    <div
                      className="upcoming-title"
                      onClick={() => {
                        if (expandedFlags && !expandedFlags.includes(2)) {
                          handleExpandFlag(true, 2);
                        } else {
                          handleExpandFlag(false, 2);
                        }
                      }}
                    >
                      {"Review Now"}
                      <span className="black-circle">
                        <p className="black-circle-text">
                          {reviewList?.list?.length}
                        </p>
                      </span>
                      <img
                        src={downArrow}
                        className="arrowDown task__down-arrow"
                        alt="Arrow down"
                        style={{
                          ...(expandedFlags.includes(2) && {
                            transform: "rotate(180deg)",
                          }),
                        }}
                      />
                    </div>
                  </div>
                  {expandedFlags.includes(2) && (
                    <>
                      {reviewList?.slicedList?.length > 0 &&
                        reviewList?.slicedList?.map((filterdList) => (
                          <TaskListItem
                            filterdList={filterdList}
                            setShowTaskDetails={setIsTaskDetailsShow}
                          />
                        ))}
                      {reviewList?.list?.length > 3 && (
                        <div className="ER-view-all-conatiner">
                          {viewAllBy === "Review-less" ? (
                            <>
                              <div
                                style={{ cursor: "pointer" }}
                                onClick={() => showLess("Review Now")}
                              >
                                <span>Show less</span>
                                <img src={viewall} />{" "}
                              </div>
                            </>
                          ) : (
                            <>
                              {" "}
                              <div
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  viewAll("Review Now", "Review-less")
                                }
                              >
                                <span>
                                  View All ({reviewList?.list?.length - 3} More)
                                </span>
                                <img src={viewall} />
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="ER-take-action">
                <div className="task-list-grid">
                  <div className="upcoming-btn">
                    <div
                      className="upcoming-title"
                      onClick={() => {
                        if (expandedFlags && !expandedFlags.includes(3)) {
                          handleExpandFlag(true, 3);
                        } else {
                          handleExpandFlag(false, 3);
                        }
                      }}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      {"Upcoming"}
                      <span className="black-circle">
                        <p className="black-circle-text">
                          {" "}
                          {upcomingList?.list?.length}
                        </p>
                      </span>
                      <img
                        src={downArrow}
                        className="arrowDown task__down-arrow"
                        alt="Arrow down"
                        style={{
                          ...(expandedFlags.includes(3) && {
                            transform: "rotate(180deg)",
                          }),
                        }}
                      />
                    </div>
                  </div>
                  {expandedFlags.includes(3) && (
                    <>
                      {upcomingList?.slicedList?.length > 0 &&
                        upcomingList?.slicedList?.map((filterdList) => (
                          <TaskListItem
                            filterdList={filterdList}
                            setShowTaskDetails={setIsTaskDetailsShow}
                          />
                        ))}
                      {upcomingList?.list?.length > 3 && (
                        <div className="ER-view-all-conatiner">
                          {viewAllBy === "Upcoming-less" ? (
                            <>
                              <div
                                style={{ cursor: "pointer" }}
                                onClick={() => showLess("Upcoming")}
                              >
                                <span>Show less</span>
                                <img src={viewall} />{" "}
                              </div>
                            </>
                          ) : (
                            <>
                              {" "}
                              <div
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  viewAll("Upcoming", "Upcoming-less")
                                }
                              >
                                <span>
                                  View All ({upcomingList?.list?.length - 3}{" "}
                                  More)
                                </span>
                                <img src={viewall} />
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="ER-take-action">
                <div className="task-list-grid">
                  <div className="upcoming-btn">
                    <div
                      className="completed-title"
                      onClick={() => {
                        if (expandedFlags && !expandedFlags.includes(4)) {
                          handleExpandFlag(true, 4);
                        } else {
                          handleExpandFlag(false, 4);
                        }
                      }}
                    >
                      {"Completed"}
                      <span className="completed-circle">
                        <p className="completed-circle-text">
                          {completedList?.list?.length}
                        </p>
                      </span>
                      <img
                        src={downArrow}
                        className="arrowDown task__down-arrow"
                        alt="Arrow down"
                        style={{
                          ...(expandedFlags.includes(4) && {
                            transform: "rotate(180deg)",
                          }),
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {expandedFlags.includes(4) && (
                <>
                  {completedList?.slicedList?.map((filterdList) => (
                    <TaskListItem
                      filterdList={filterdList}
                      category="completed"
                      setShowTaskDetails={setIsTaskDetailsShow}
                    />
                  ))}
                  {completedList?.list?.length > 3 && (
                    <div className="ER-view-all-conatiner">
                      {viewAllBy === "Completed-less" ? (
                        <>
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={() => showLess("Completed")}
                          >
                            <span>Show less</span>
                            <img src={viewall} />{" "}
                          </div>
                        </>
                      ) : (
                        <>
                          {" "}
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              viewAll("Completed", "Completed-less")
                            }
                          >
                            <span>
                              View All ({upcomingList?.list?.length - 3} More)
                            </span>
                            <img src={viewall} />
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {sortBy === "Licenses" && (
            <div className="ER-task-container">
              <LicenseTaskList user={userDetails} sideBarTaskList={false} />
            </div>
          )}

          {sortBy === "Company Name" && (
            <div className="ER-task-container">
              <CompanyTaskList user={userDetails} sideBarTaskList={false} />
            </div>
          )}

          {sortBy === "Task" && (
            <div className="ER-task-container">
              <AssignedView user={userDetails} sideBarTaskList={false} />
            </div>
          )}
          {sortBy === "Search" && (
            <div
              className="task-details-file-grid task-details-file-grid-dashboard custimDesignTask"
              style={{ position: "relative" }}
            >
              <div className="file-title">Search Results: </div>
              {searchResult !== "" && (
                <div
                  className="take-action"
                  style={{
                    marginBottom: "0px",
                    paddingBottom: "0px",
                    paddingTop: "20px",
                    height: "70vh",
                  }}
                >
                  {searchResult.length > 0 &&
                    searchResult.map((task) => {
                      return <>{renderTaskList(task.data, task.Status, 2)}</>;
                    })}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

const TaskListItem = ({ filterdList, category, setShowTaskDetails }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div
        className="row"
        style={{
          cursor: "pointer",
        }}
        onClick={() => {
          if (filterdList.taskID !== 0) {
            setShowTaskDetails(true);
            dispatch(
              taskReportActions.taskReportByIdRequest({
                taskID: filterdList.TaskId,
              })
            );
          }
        }}
      >
        <div className="col-2">
          <button className="code">{filterdList.LicenseCode}</button>
        </div>
        <div className="col-6 mb-2">
          <div className="overdue-company">
            {category && (
              <AiFillInfoCircle
                style={{
                  color: `${
                    category === "completed"
                      ? "green"
                      : category === "overdue"
                      ? "red"
                      : "black"
                  }`,
                  marginRight: "10px",
                }}
              />
            )}
            <p className="company-name">{filterdList.TaskName} </p>
          </div>
          <button className="ER-status-button">{filterdList.AprStatus}</button>
        </div>
        <div className="ER-detail-name align-left-always col-2">
          <p>
            <span className="circle-dp">
              {getIntialName(filterdList.ApproverName)}
            </span>{" "}
            <span className="user-name">{filterdList.ApproverName}</span>
          </p>
        </div>

        <div className="col-2">
          <span className="upcoming-date ">
            {" "}
            {moment(filterdList.EndDate).format("DD MMM")}
          </span>
          <span className="ml-2" style={{ paddingLeft: "60px" }}>
            &gt;
          </span>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
