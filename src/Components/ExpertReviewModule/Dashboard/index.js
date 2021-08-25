import React, { useEffect, useState } from "react";
import complteTaskIcon from "../../../assets/Icons/complteTaskIcon.png";
import scheduledIcon from "../../../assets/Icons/scheduledIcon.png";
import viewall from "../../../assets/ERIcons/viewall.png";
import deadline from "../../../assets/ERIcons/deadline.png";
import downArrow from "../../../assets/Icons/downArrow.png";
import { AiFillInfoCircle, AiFillCheckCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { actions as taskReportActions } from "../../OnBording/SubModules/DashBoardCO/redux/actions";

import "./style.css";
import { getIntialName } from "../../../CommonModules/helpers/GetIntialName.helper";
import LicenseTaskList from "../../OnBording/SubModules/DashBoardCO/components/DashBoardView/component/LicenseTaskList";
import CompanyTaskList from "../../OnBording/SubModules/DashBoardCO/components/DashBoardView/component/companyList";
import AssignedView from "../../OnBording/SubModules/DashBoardCO/components/DashBoardView/component/AssignedView";
import moment from "moment";

const Dashboard = () => {
  const [sortBy, setSortBy] = useState("Task Status");
  const [viewAllBy, setViewAllBy] = useState("ovedue");

  const [upcomingList, setUpcomingList] = useState({
    list: [],
    slicedList: [],
  });

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

  useEffect(() => {
    dispatch(
      taskReportActions.taskReportRequest({
        userID: userDetails.UserID,
        usertype: userDetails.UserType,
      })
    );
  }, []);

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

  return (
    <div className="ER-main">
      <div className="ER-task-statics row">
        <h3>Tasks</h3>
        <div className="active-task"></div>
        <div className="task-statics row">
          <div className="static-card">
            <img src={complteTaskIcon} alt="complte-Task-icon" />
            <span>Completed</span>
            <span>00</span>
          </div>
          <div className="static-card">
            <img src={scheduledIcon} alt="complte-Task-icon" />
            <span>Scheduled</span>
            <span>00</span>
          </div>
          <div className="static-card">
            <img src={complteTaskIcon} alt="complte-Task-icon" />
            <span>Rejected</span>
            <span>02</span>
          </div>
        </div>
        <div className="ER-search-input">
          <input
            className="form-control ER-search"
            placeholder="search by task,company and license"
          />{" "}
        </div>
      </div>

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
              sortBy == "Task" ? "sort-filter-active" : "sort-filter-inactive"
            }
            onClick={() => setSortBy("Task")}
          >
            Task
          </span>
        </ul>
      </div>
      {sortBy === "Task Status" && (
        <div className="ER-task-container">
          <div className="ER-take-action">
            <div className="task-list-grid">
              <div className="upcoming-btn">
                <div className="overdue-title">
                  {"Overdue"}
                  <span className="overdue-circle">
                    <p className="overdue-circle-text">
                      {overdueList && overdueList?.list?.length}
                    </p>
                  </span>
                  <img src={downArrow} className="arrowDown" alt="Arrow down" />
                </div>
              </div>
              <img src={deadline} />
              {overdueList &&
                overdueList?.slicedList?.map((filterdList) => (
                  <>
                    <div className="row">
                      <div className="col-2">
                        <button className="code">
                          {filterdList.LicenseCode}
                        </button>
                      </div>
                      <div className="col-6 mb-4">
                        <div className="overdue-company">
                          <AiFillInfoCircle
                            style={{ color: "red", marginRight: "10px" }}
                          />
                          <p className="company-name">
                            {filterdList.TaskName}{" "}
                          </p>
                        </div>
                        <button className="ER-status-button">
                          {filterdList.AprStatus}
                        </button>
                      </div>
                      <div className="ER-detail-name align-left-always col-2">
                        <p>
                          <span className="circle-dp">
                            {getIntialName(filterdList.ApproverName)}
                          </span>{" "}
                          <span className="user-name">
                            {filterdList.ApproverName}
                          </span>
                        </p>
                      </div>

                      <div className="col-2">
                        <span className="overdue-date ">
                          {" "}
                          {moment(filterdList.EndDate).format("DD MMM")}
                        </span>
                        <span className="ml-2" style={{ paddingLeft: "60px" }}>
                          >
                        </span>
                      </div>
                    </div>
                    <img src={deadline} />
                  </>
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
                        onClick={() => viewAll("overdue", "overdue-less")}
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
            </div>
          </div>

          <div className="ER-take-action">
            <div className="task-list-grid">
              <div className="upcoming-btn">
                <div className="upcoming-title">
                  {"Review Now"}
                  <span className="black-circle">
                    <p className="black-circle-text">
                      {reviewList?.list?.length}
                    </p>
                  </span>
                  <img src={downArrow} className="arrowDown" alt="Arrow down" />
                </div>
              </div>
              {reviewList?.slicedList?.length > 0 &&
                reviewList?.slicedList?.map((filterdList) => (
                  <>
                    <div className="row">
                      <div className="col-2">
                        <button className="code">
                          {filterdList.LicenseCode}
                        </button>
                      </div>
                      <div className="col-6 mb-4">
                        <div className="upcoming-company">
                          <p className="company-name">
                            {filterdList.TaskName}{" "}
                          </p>
                        </div>
                        <button className="ER-status-button">
                          {filterdList.AprStatus}
                        </button>
                      </div>
                      <div className="ER-detail-name align-left-always col-2">
                        <p>
                          <span className="circle-dp">
                            {getIntialName(filterdList.ApproverName)}
                          </span>{" "}
                          <span className="user-name">
                            {filterdList.ApproverName}
                          </span>
                        </p>
                      </div>

                      <div className="col-2">
                        <span className="upcoming-date ">
                          {" "}
                          {moment(filterdList.EndDate).format("DD MMM")}
                        </span>
                        <span className="ml-2" style={{ paddingLeft: "60px" }}>
                          >
                        </span>
                      </div>
                    </div>
                  </>
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
                        onClick={() => viewAll("Review Now", "Review-less")}
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
            </div>
          </div>

          <div className="ER-take-action">
            <div className="task-list-grid">
              <div className="upcoming-btn">
                <div className="upcoming-title">
                  {"Upcoming"}
                  <span className="black-circle">
                    <p className="black-circle-text">
                      {" "}
                      {upcomingList?.list?.length}
                    </p>
                  </span>
                  <img src={downArrow} className="arrowDown" alt="Arrow down" />
                </div>
              </div>
              {upcomingList?.slicedList?.length > 0 &&
                upcomingList?.slicedList?.map((filterdList) => (
                  <>
                    <div className="row">
                      <div className="col-2">
                        <button className="code">
                          {filterdList.LicenseCode}
                        </button>
                      </div>
                      <div className="col-6 mb-4">
                        <div className="upcoming-company">
                          <p className="company-name">
                            {filterdList.TaskName}{" "}
                          </p>
                        </div>
                        <button className="ER-status-button">
                          {filterdList.AprStatus}
                        </button>
                      </div>
                      <div className="ER-detail-name align-left-always col-2">
                        <p>
                          <span className="circle-dp">
                            {getIntialName(filterdList.ApproverName)}
                          </span>{" "}
                          <span className="user-name">
                            {filterdList.ApproverName}
                          </span>
                        </p>
                      </div>

                      <div className="col-2">
                        <span className="upcoming-date ">
                          {" "}
                          {moment(filterdList.EndDate).format("DD MMM")}
                        </span>
                        <span className="ml-2" style={{ paddingLeft: "60px" }}>
                          >
                        </span>
                      </div>
                    </div>
                  </>
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
                        onClick={() => viewAll("Upcoming", "Upcoming-less")}
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
            </div>
          </div>

          <div className="ER-take-action">
            <div className="task-list-grid">
              <div className="upcoming-btn">
                <div className="completed-title">
                  {"Completed"}
                  <span className="completed-circle">
                    <p className="completed-circle-text">
                      {completedList?.list?.length}
                    </p>
                  </span>
                  <img src={downArrow} className="arrowDown" alt="Arrow down" />
                </div>
              </div>
              {completedList?.slicedList?.map((filterdList) => (
                <>
                  <div className="row">
                    <div className="col-2">
                      <button className="code">
                        {filterdList.LicenseCode}
                      </button>
                    </div>
                    <div className="col-6 mb-4">
                      <div className="overdue-company">
                        <AiFillInfoCircle
                          style={{ color: "green", marginRight: "10px" }}
                        />
                        <p className="company-name">{filterdList.TaskName} </p>
                      </div>
                      <button className="ER-status-button">
                        {filterdList.AprStatus}
                      </button>
                    </div>
                    <div className="ER-detail-name align-left-always col-2">
                      <p>
                        <span className="circle-dp">
                          {getIntialName(filterdList.ApproverName)}
                        </span>{" "}
                        <span className="user-name">
                          {filterdList.ApproverName}
                        </span>
                      </p>
                    </div>

                    <div className="col-2">
                      <span className="upcoming-date ">
                        {" "}
                        {moment(filterdList.EndDate).format("DD MMM")}
                      </span>
                      <span className="ml-2" style={{ paddingLeft: "60px" }}>
                        >
                      </span>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
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
                    onClick={() => viewAll("Completed", "Completed-less")}
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
    </div>
  );
};

export default Dashboard;
