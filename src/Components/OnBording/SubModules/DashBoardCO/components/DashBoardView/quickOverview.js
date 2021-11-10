import React, { useState, useEffect } from "react";
import "./style.css";
import percentageless60 from "../../../../../../assets/Icons/percentageless60.png";
import classNames from "classnames";
import axios from "axios";
import { Link } from "react-router-dom";
import btnicon from "../../../../../../assets/Icons/btn-icon.png";
import Collapsible from "react-collapsible";
import { BACKEND_BASE_URL } from "../../../../../../apiServices/baseurl";
import siderBarbtnArrow from "../../../../../../assets/Icons/siderBarbtnArrow.png";
import actionArrow from "../../../../../../assets/Icons/actionArrow.png";
import complteTaskIcon from "../../../../../../assets/Icons/complteTaskIcon.png";
import scheduledIcon from "../../../../../../assets/Icons/scheduledIcon.png";
import siderBarbtnArrowTop from "../../../../../../assets/Icons/siderBarbtnArrowTop.png";
import { useSelector } from "react-redux";
import { isMobile } from "react-device-detect";
import axiosInstance from "../../../../../../apiServices";
import {
  getDataByStatus,
  getAllTasks,
} from "../../../../../../CommonModules/helpers/tasks.helper";

let percentage;
function QuickOverView({ click, setClick, setListView, listView }) {
  const state = useSelector((state) => state);
  const [collapse, setCollapse] = useState([]);
  const [thingOnTrack, setThingOnTrack] = useState({});
  const [companyViewData, setCompanyViewData] = useState([]);
  //const [teamStats, setteamStatsData] = useState([]);
  const [section3, setSection3] = useState([]);
  const userDetails = state && state.auth && state.auth.loginInfo;
  const [showMoreLess, setShowMoreLess] = useState(false);
  const [showMoreLessTM, setShowMoreLessTM] = useState(false);
  const [dashboardStats, setDashboardStats] = useState([]);
  const [teamStats, setTeamStats] = useState([]);
  const [taskStatus, setTaskStatus] = useState({
    completeTask: "",
    schedulededTask: "",
    takeAction: "",
    pending: "",
  });
  const taskList =
    state &&
    state.taskReport &&
    state.taskReport.taskReport &&
    state.taskReport.taskReport.taskReport &&
    state.taskReport.taskReport.taskReport;

  useEffect(() => {
    if (taskList && taskList.length > 0) {
      const taskDetail = getDataByStatus(taskList);
      const completeTask = taskDetail.filter(
        (task) => task.status === "Completed"
      )[0];

      const schedulededTask = getAllTasks(taskList).filter(
        (task) => task.status !== "Approved"
      ).length;

      const takeAction = taskDetail.filter(
        (task) => task.status === "Take Action"
      )[0];

      const pending = getAllTasks(taskList).filter(
        (task) => task.status === "Approval Pending"
      ).length;

      setTaskStatus({
        ...taskStatus,
        completeTask: completeTask?.tasks?.length,
        schedulededTask,
        takeAction: takeAction?.tasks?.length,
        pending,
      });
    }
  }, [taskList]);
  useEffect(() => {
    let temp = [];
    if (dashboardStats && dashboardStats.length > 0) {
      dashboardStats.map((item, index) => {
        temp.push({ open: false });
      });
      setCollapse(temp);
      setSection3(dashboardStats[0]);
    }
  }, [dashboardStats]);

  useEffect(() => {
    fetchDashboardAnalytics();
  }, []);

  const fetchDashboardAnalytics = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${BACKEND_BASE_URL}compliance.api.dashboardAnalytics`
      );

      if (data.message.status) {
        const companyList = [];
        const teamList = [];

        const { compliant_data, team_performance_data } = data.message;

        compliant_data.map((companyDetail) => {
          let LicenseCodeList = [];
          companyDetail.license.map((licenseDetail) => {
            LicenseCodeList.push({
              name: licenseDetail.name,
              status: licenseDetail.status,
            });
          });
          companyList.push({
            companyName: companyDetail.company_name,
            licenseCodeList: LicenseCodeList,
            completed_task: companyDetail.completed_task,
            total_task: companyDetail.total_task,
          });
        });

        team_performance_data.map((teamDetail) => {
          teamList.push({
            user_name: teamDetail.user_name,
            week_status: teamDetail.week_status,
          });
        });

        setTeamStats(teamList);

        setDashboardStats(companyList);
      }
    } catch (error) {}
  };

  const openCloseCollapsible = (index) => {
    let list = [...collapse];
    if (collapse[index].open === false) {
      list &&
        list.map((item, key) => {
          if (key === index) {
            list[index].open = true;
          } else {
            list[key].open = false;
          }
        });
      setCollapse(list);
    } else {
      let list = [...collapse];
      list &&
        list.map((item, key) => {
          if (key === index) {
            list[index].open = false;
          } else {
            list[key].open = false;
          }
        });
      setCollapse(list);
    }
  };

  const monthlyBoxView = (item, index) => {
    return (
      <>
        <div class="compliant-option">
          <p className="compliant-title-left">{item.name}</p>
          <ul className="list-group list-group-horizontal">
            <li className={item && calculateColorCode(item.status.m1)}></li>
            <li className={item && calculateColorCode(item.status.m2)}></li>
            <li className={item && calculateColorCode(item.status.m3)}></li>
            <li className={item && calculateColorCode(item.status.m4)}></li>
            <li className={item && calculateColorCode(item.status.m5)}></li>
            <li className={item && calculateColorCode(item.status.m6)}></li>
            <li className={item && calculateColorCode(item.status.m7)}></li>
            <li className={item && calculateColorCode(item.status.m8)}></li>
            <li className={item && calculateColorCode(item.status.m9)}></li>
            <li className={item && calculateColorCode(item.status.m10)}></li>
            <li className={item && calculateColorCode(item.status.m11)}></li>
            <li className={item && calculateColorCode(item.status.m12)}></li>
          </ul>
        </div>
      </>
    );
  };
  const renderCollapsibleMonthView = (data, index) => {
    console.log("data", data);
    return (
      <div className="btn-data">
        {data &&
          data &&
          data.length > 0 &&
          data.map((item, index) => {
            return monthlyBoxView(item, index);
          })}
      </div>
    );
  };
  const _renderCompanyView = (data, index, length) => {
    percentage = (data.completed_task / data.total_task) * 100;
    if (length <= 2) {
      let btnClass = classNames({
        "btn sidebar-btn-two-new-active  btnLattwo": index % 2 !== 0,
        "btn sidebar-btn-one-two": index % 2 === 0,
        heightFull: collapse && collapse[index] && collapse[index].open,
        heightFixed:
          collapse && collapse[index] && collapse[index].open === false,
        "border-top-left-radius": index === length - 1,
      });
      return (
        <button className={btnClass}>
          <div className="d-flex">
            <div className="two-btn-img">
              <img
                style={
                  percentage && percentage > 60
                    ? { width: "auto", height: "auto" }
                    : {}
                }
                src={percentage && percentage > 60 ? btnicon : btnicon}
                alt="btn-icon"
              />{" "}
            </div>
            <div className="icon-right-text-arrow">
              <div className="small-text"> {data && data.companyName}</div>
              <div className="big-text">
                Compliant ({data && data.completed_task}/
                {data && data.total_task}){" "}
                <img
                  className="float-right"
                  onClick={() => openCloseCollapsible(index)}
                  src={
                    collapse && collapse[index] && collapse[index].open
                      ? siderBarbtnArrowTop
                      : siderBarbtnArrow
                  }
                  alt="btn Arrow top"
                />
              </div>
            </div>
          </div>
          <Collapsible
            transitionTime={400}
            transitionCloseTime={500}
            easing="linear"
            overflowWhenOpen="inherit"
            open={collapse && collapse[index] && collapse[index].open}
          >
            <div>{renderCollapsibleMonthView(data.licenseCodeList)}</div>
          </Collapsible>
        </button>
      );
    } else if (length > 2 && length <= 5) {
      let btnClass = classNames({
        "btn sidebar-btn-two-new-active ": index % 2 !== 0,
        "btn sidebar-btn-one-two ": index % 2 === 0,
        "fullwidth-5c": collapse && collapse[index] && collapse[index].open,
        "widthfixed-5c":
          collapse && collapse[index] && collapse[index].open === false,
        "border-radious-zr": index % 2 !== 0 && index !== length - 1,
        "border-top-left-radius": index === length - 1,
      });

      return (
        <button className={btnClass}>
          <div className="d-flex">
            <div className="two-btn-img">
              <img
                style={
                  percentage && percentage > 60
                    ? { width: "auto", height: "auto" }
                    : {}
                }
                src={percentage && percentage > 60 ? btnicon : percentageless60}
                alt="btn-icon"
              />{" "}
            </div>
            <div className="icon-right-text-new">
              <div className="small-text-new">{data && data.EntityName}</div>
              <div className="big-text-new">
                Compliant ({data && data.CompliedTask}/{data && data.TotalTask}){" "}
                <img
                  style={{ cursor: "pointer" }}
                  onClick={() => openCloseCollapsible(index)}
                  src={
                    collapse && collapse[index] && collapse[index].open
                      ? siderBarbtnArrowTop
                      : siderBarbtnArrow
                  }
                  alt="btn Arrow"
                />
              </div>
            </div>
          </div>
          <Collapsible
            transitionTime={400}
            transitionCloseTime={500}
            overflowWhenOpen="inherit"
            open={collapse && collapse[index] && collapse[index].open}
          >
            <div>
              {data &&
                data.MonthlyAnalytics &&
                data.MonthlyAnalytics.length > 0 &&
                renderCollapsibleMonthView(data.MonthlyAnalytics)}
            </div>
          </Collapsible>
        </button>
      );
    } else if (length > 5) {
      let btnClass = classNames({
        "btn sidebar-btn-two-new-active": index % 2 !== 0,
        "btn sidebar-btn-one-two ": index % 2 === 0,
        "fullwidth-5c": collapse && collapse[index] && collapse[index].open,
        "widthfixed-5c":
          collapse && collapse[index] && collapse[index].open === false,
        "border-radious-zr": index % 2 !== 0 && index !== length - 1,
        "border-top-left-radius": index === length - 1,
      });

      return (
        <>
          <button className={btnClass}>
            <div className="d-flex">
              <div className="icon-left-new">
                <img
                  style={
                    percentage && percentage > 60
                      ? { width: "auto", height: "auto" }
                      : {}
                  }
                  src={
                    percentage && percentage >= 0 ? btnicon : percentageless60
                  }
                  alt="btn-icon"
                />{" "}
              </div>
              <div className="icon-right-text-new">
                <div className="small-text-new">{data && data.EntityName}</div>
                <div className="big-text-new">
                  Compliant ({data && data.CompliedTask}/
                  {data && data.TotalTask}){" "}
                  <img
                    style={{ cursor: "pointer" }}
                    onClick={() => openCloseCollapsible(index)}
                    src={
                      collapse && collapse[index] && collapse[index].open
                        ? siderBarbtnArrowTop
                        : siderBarbtnArrow
                    }
                    alt="btn Arrow"
                  />
                </div>
              </div>
            </div>
            <Collapsible
              overflowWhenOpen="inherit"
              open={collapse && collapse[index] && collapse[index].open}
            >
              <div>{renderCollapsibleMonthView(dashboardStats)}</div>
            </Collapsible>
          </button>
        </>
      );
    }
  };
  const getInitials = (str) => {
    var initials = " ";
    if (str != "" && str) {
      var names = str.split(" "),
        initials = names[0].substring(0, 1).toUpperCase();
      if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
      } else if (names.length === 1) {
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

  const calculateColorCode = (item) => {
    const value = item.completed_percentage;
    console.log(value);
    let str = "";
    if (parseInt(value) === -1) {
      str = "gray-box";
    } else if (parseInt(value) === 100) {
      str = "green-box";
    } else if (parseInt(value) > 0 && parseInt(value) !== 100) {
      str = "red-box";
    } else {
      str = "gray-box";
    }
    return str;
  };
  const _renderteamStats = (item, index) => {
    return (
      <div class="compliant-option-new">
        {item && item.user_name && (
          <>
            <p className="compliant-title-left-new">
              <p className="two-digin-circle">
                {item && item.user_name && getInitials(item.user_name)}
              </p>
              {item && item.user_name && _getAssignedName(item.user_name)}
            </p>
            <ul className="list-group list-group-horizontal">
              <li
                className={
                  item &&
                  item.week_status.w1 &&
                  calculateColorCode(item.week_status.w1)
                }
              ></li>
              <li
                className={
                  item &&
                  item.week_status.w2 &&
                  calculateColorCode(item.week_status.w2)
                }
              ></li>
              <li
                className={
                  item &&
                  item.week_status.w3 &&
                  calculateColorCode(item.week_status.w3)
                }
              ></li>
              <li
                className={
                  item &&
                  item.week_status.w4 &&
                  calculateColorCode(item.week_status.w4)
                }
              ></li>
              <li
                className={
                  item &&
                  item.week_status.w5 &&
                  calculateColorCode(item.week_status.w5)
                }
              ></li>
            </ul>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="row">
      {
        <div className="col-12 col-md-3 col-xl-3 new-side-bar">
          <div className="scroll-inside-new">
            <div
              className={
                isMobile
                  ? "mobile108Height all-companies-task-grid-1"
                  : "all-companies-task-grid-1"
              }
            >
              <div className="right-side">
                <div className="user-title">
                  Hi{" "}
                  {userDetails &&
                    (userDetails.full_name || userDetails.UserName)}
                  ,
                </div>
                <div className="bold-title-sidebar">
                  Here is a quick
                  <br /> overview for you!
                </div>
                <>
                  <div className="d-block d-md-none">
                    <span
                      className="bold-title-sidebar mr-4"
                      style={{ width: "32%", color: "#2c2738" }}
                    >
                      <Link
                        style={{ color: "#2c2738", textDecoration: "none" }}
                        to="/dashboard-view"
                      >
                        Overview
                      </Link>
                    </span>
                    <span
                      className="bold-title-sidebar"
                      style={{ width: "32%", color: "#9999" }}
                      onClick={() => setListView("1")}
                    >
                      <span style={{ color: "#9999", textDecoration: "none" }}>
                        Tasks
                      </span>
                    </span>
                  </div>
                </>

                <div
                  className={
                    companyViewData &&
                    companyViewData.length > 0 &&
                    companyViewData.length === 2
                      ? "two-btn mainBoxShado"
                      : "two-btn"
                  }
                >
                  {dashboardStats &&
                    dashboardStats.length > 0 &&
                    dashboardStats.length <= 5 &&
                    dashboardStats.map((item, index) =>
                      _renderCompanyView(item, index, dashboardStats.length)
                    )}
                  {!showMoreLess &&
                    dashboardStats &&
                    dashboardStats.length > 0 &&
                    dashboardStats.length > 5 &&
                    dashboardStats
                      .slice(0, 5)
                      .map((item, index) =>
                        _renderCompanyView(item, index, dashboardStats.length)
                      )}
                  {showMoreLess &&
                    dashboardStats &&
                    dashboardStats.length > 0 &&
                    dashboardStats.length > 5 &&
                    dashboardStats.map((item, index) =>
                      _renderCompanyView(item, index, dashboardStats.length)
                    )}
                </div>

                {!showMoreLess && dashboardStats && dashboardStats.length > 5 && (
                  <div
                    onClick={() => setShowMoreLess(!showMoreLess)}
                    className="view-more-task"
                  >
                    view more
                  </div>
                )}
                {showMoreLess && dashboardStats && dashboardStats.length > 5 && (
                  <div
                    onClick={() => setShowMoreLess(!showMoreLess)}
                    className="view-more-task"
                  >
                    view less
                  </div>
                )}
                <div className="two-btn-new"></div>

                <div className="take-action-grid-new shadow bg-white rounded">
                  <div className="take-action-small-title-new">Immediately</div>
                  <div className="take-action-title">Take Action</div>
                  <div className="action-bottom-grid">
                    <div className="left-grid-action">
                      <span className="red-circle-new">
                        {taskStatus?.takeAction}
                      </span>
                      <div
                        className="take-action-left-new"
                        onClick={() => setClick("riskAndDelays")}
                      >
                        Risk & Delays
                        <img
                          className="btn-icon-new"
                          src={actionArrow}
                          alt="btn-icon"
                        />
                      </div>
                    </div>
                    <div className="right-grid-action">
                      <span className="blue-circle-new">
                        {taskStatus.pending}
                      </span>
                      <div
                        className="take-action-right-new"
                        onClick={() => setClick("pendingAction")}
                      >
                        Pending Action
                        <img
                          className="btn-icon-new"
                          src={actionArrow}
                          alt="btn-icon"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sidebar-month-grid-new shadow bg-white rounded">
                  <div className="take-action-small-title-new">This Month</div>
                  <div className="take-action-title">Things are on track!</div>
                  <div className="task-details-grid">
                    <div className="complte-task-title text-left">
                      <img
                        className="mr-2"
                        src={complteTaskIcon}
                        alt="complte-Task-icon"
                      />{" "}
                      Completed Tasks{" "}
                      <span className="text-right">
                        {" "}
                        {taskStatus.completeTask}
                      </span>
                    </div>
                    <div className="complte-task-title text-left">
                      <img
                        className="mr-2"
                        src={scheduledIcon}
                        alt="scheduled-icon"
                      />{" "}
                      Scheduled{" "}
                      <span className="text-right">
                        {taskStatus.schedulededTask}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="sidebar-overview-grid-new shadow bg-white rounded">
                  <div className="take-action-small-title-new">Overview</div>
                  <div className="take-action-title">Team Performance</div>
                  <div className="btn-data-new">
                    {teamStats &&
                      teamStats.length > 0 &&
                      teamStats.length <= 4 &&
                      teamStats.map((item, index) =>
                        _renderteamStats(item, index, teamStats.length)
                      )}
                    {!showMoreLessTM &&
                      teamStats &&
                      teamStats.length > 0 &&
                      teamStats.length > 4 &&
                      teamStats
                        .slice(0, 4)
                        .map((item, index) =>
                          _renderteamStats(item, index, teamStats.length)
                        )}
                    {showMoreLessTM &&
                      teamStats &&
                      teamStats.length > 0 &&
                      teamStats.length > 4 &&
                      teamStats.map((item, index) =>
                        _renderteamStats(item, index, teamStats.length)
                      )}

                    {!showMoreLessTM && teamStats && teamStats.length > 4 && (
                      <div
                        style={{ textAlign: "left" }}
                        onClick={() => setShowMoreLessTM(!showMoreLessTM)}
                        className="view-more-task"
                      >
                        view all members
                      </div>
                    )}
                    {showMoreLessTM && teamStats && teamStats.length > 4 && (
                      <div
                        style={{ textAlign: "left" }}
                        onClick={() => setShowMoreLessTM(!showMoreLessTM)}
                        className="view-more-task"
                      >
                        Show less
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default QuickOverView;
