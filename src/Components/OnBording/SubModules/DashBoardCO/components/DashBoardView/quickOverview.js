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

let percentage;
function QuickOverView({ click, setClick, setListView, listView }) {
  const state = useSelector((state) => state);
  const [collapse, setCollapse] = useState([]);
  const [thingOnTrack, setThingOnTrack] = useState({});
  const [companyViewData, setCompanyViewData] = useState([]);
  const [teamPerformance, setTeamPerformanceData] = useState([]);
  const [section3, setSection3] = useState([]);
  const userDetails = state && state.auth && state.auth.loginInfo;
  const [showMoreLess, setShowMoreLess] = useState(false);
  const [showMoreLessTM, setShowMoreLessTM] = useState(false);

  useEffect(() => {
    if (
      userDetails &&
      userDetails.UserID !== undefined &&
      (userDetails.UserType === 3 ||
        userDetails.UserType === 5 ||
        userDetails.UserType === 6)
    ) {
      fetchQuickOverViewSectionData("type1");
      fetchTeamPerformanceData();
    }
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        if (userDetails && userDetails.UserID !== undefined) {
          fetchQuickOverViewSectionData("type2");
        }
      } catch (err) {}
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let temp = [];
    if (companyViewData && companyViewData.length > 0) {
      companyViewData.map((item, index) => {
        temp.push({ open: false });
      });
      setCollapse(temp);
      setSection3(companyViewData[0]);
    }
  }, [companyViewData]);

  const fetchQuickOverViewSectionData = (type) => {
    const payload = {
      entityid: "0",
      userID: userDetails.UserID,
      usertype: userDetails.UserType,
    };
    axios
      .post(`${BACKEND_BASE_URL}/api/DashBoardAnalytics`, payload)
      .then((response) => {
        if (response && response.data && response.data.length > 0) {
          if (type === "type1") {
            setCompanyViewData(response.data);
            let temp = response.data[0];
            setThingOnTrack(temp);
          } else if (type === "type2") {
            let temp = response.data[0];
            setThingOnTrack(temp);
          }
        }
      })
      .catch((error) => {});
  };
  const fetchTeamPerformanceData = () => {
    const payload = {
      entityid: "5",
      userID: userDetails.UserID,
      usertype: userDetails.UserType,
    };
    axios
      .post(`${BACKEND_BASE_URL}/api/DashBoardAnalytics`, payload)
      .then((response) => {
        if (response && response.data && response.data.length > 0) {
          setTeamPerformanceData(response.data);
        }
      })
      .catch((error) => {});
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
          <p className="compliant-title-left">{item && item.LicenseCode}</p>
          <ul className="list-group list-group-horizontal">
            <li className={item && item.m1 && calculateColorCode(item.m1)}></li>
            <li className={item && item.m2 && calculateColorCode(item.m2)}></li>
            <li className={item && item.m3 && calculateColorCode(item.m3)}></li>
            <li className={item && item.m4 && calculateColorCode(item.m4)}></li>
            <li className={item && item.m5 && calculateColorCode(item.m5)}></li>
            <li className={item && item.m6 && calculateColorCode(item.m6)}></li>
            <li className={item && item.m7 && calculateColorCode(item.m7)}></li>
            <li className={item && item.m8 && calculateColorCode(item.m8)}></li>
            <li className={item && item.m9 && calculateColorCode(item.m9)}></li>
            <li
              className={item && item.m10 && calculateColorCode(item.m10)}
            ></li>
            <li
              className={item && item.m11 && calculateColorCode(item.m11)}
            ></li>
            <li
              className={item && item.m12 && calculateColorCode(item.m12)}
            ></li>
          </ul>
        </div>
      </>
    );
  };
  const renderCollapsibleMonthView = (data, index) => {
    return (
      <div className="btn-data">
        {data &&
          data &&
          data.length > 0 &&
          data.map((item, index) => monthlyBoxView(item, index))}
      </div>
    );
  };
  const _renderCompanyView = (data, index, length) => {
    percentage = (data.CompliedTask / data.TotalTask) * 100;
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
              <div className="small-text"> {data && data.EntityName}</div>
              <div className="big-text">
                Compliant ({data && data.CompliedTask}/{data && data.TotalTask}){" "}
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
            <div>
              {data &&
                data.MonthlyAnalytics &&
                data.MonthlyAnalytics.length > 0 &&
                renderCollapsibleMonthView(data.MonthlyAnalytics)}
            </div>
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
              <div>
                {data &&
                  data.MonthlyAnalytics &&
                  data.MonthlyAnalytics.length > 0 &&
                  renderCollapsibleMonthView(data.MonthlyAnalytics)}
              </div>
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

  const calculateColorCode = (value) => {
    let str = "";
    if (parseInt(value) === -1) {
      str = "gray-box";
    } else if (parseInt(value) === 0) {
      str = "green-box";
    } else if (parseInt(value) >= 1) {
      str = "red-box";
    }
    return str;
  };
  const _renderTeamPerformance = (item, index) => {
    return (
      <div class="compliant-option-new">
        {item && item.AssignedTo && item.AssignedTo !== "Norec" && (
          <>
            <p className="compliant-title-left-new">
              <p className="two-digin-circle">
                {item && item.AssignedTo && getInitials(item.AssignedTo)}
              </p>
              {item && item.AssignedTo && _getAssignedName(item.AssignedTo)}
            </p>
            <ul className="list-group list-group-horizontal">
              <li
                className={item && item.W1 && calculateColorCode(item.W1)}
              ></li>
              <li
                className={item && item.W2 && calculateColorCode(item.W2)}
              ></li>
              <li
                className={item && item.W3 && calculateColorCode(item.W3)}
              ></li>
              <li
                className={item && item.W4 && calculateColorCode(item.W4)}
              ></li>
              <li
                className={item && item.W5 && calculateColorCode(item.W5)}
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
                  Hi {userDetails && userDetails.UserName},
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
                {userDetails &&
                  userDetails.UserID !== undefined &&
                  (userDetails.UserType === 3 ||
                    userDetails.UserType === 6) && (
                    <div
                      className={
                        companyViewData &&
                        companyViewData.length > 0 &&
                        companyViewData.length === 2
                          ? "two-btn mainBoxShado"
                          : "two-btn"
                      }
                    >
                      {companyViewData &&
                        companyViewData.length > 0 &&
                        companyViewData.length <= 5 &&
                        companyViewData.map((item, index) =>
                          _renderCompanyView(
                            item,
                            index,
                            companyViewData.length
                          )
                        )}
                      {!showMoreLess &&
                        companyViewData &&
                        companyViewData.length > 0 &&
                        companyViewData.length > 5 &&
                        companyViewData
                          .slice(0, 5)
                          .map((item, index) =>
                            _renderCompanyView(
                              item,
                              index,
                              companyViewData.length
                            )
                          )}
                      {showMoreLess &&
                        companyViewData &&
                        companyViewData.length > 0 &&
                        companyViewData.length > 5 &&
                        companyViewData.map((item, index) =>
                          _renderCompanyView(
                            item,
                            index,
                            companyViewData.length
                          )
                        )}
                    </div>
                  )}
                {!showMoreLess &&
                  companyViewData &&
                  companyViewData.length > 5 && (
                    <div
                      onClick={() => setShowMoreLess(!showMoreLess)}
                      className="view-more-task"
                    >
                      view more
                    </div>
                  )}
                {showMoreLess && companyViewData && companyViewData.length > 5 && (
                  <div
                    onClick={() => setShowMoreLess(!showMoreLess)}
                    className="view-more-task"
                  >
                    view less
                  </div>
                )}
                <div className="two-btn-new"></div>
                {thingOnTrack &&
                  Object.entries(thingOnTrack).length !== 0 &&
                  thingOnTrack.RiskTask !== 0 &&
                  thingOnTrack.PendingTask !== 0 && (
                    <div className="take-action-grid-new shadow bg-white rounded">
                      <div className="take-action-small-title-new">
                        Immediately
                      </div>
                      <div className="take-action-title">Take Action</div>
                      <div className="action-bottom-grid">
                        <div className="left-grid-action">
                          <span className="red-circle-new">
                            {thingOnTrack && thingOnTrack.RiskTask}
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
                            {thingOnTrack && thingOnTrack.PendingTask}
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
                  )}
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
                        {thingOnTrack && thingOnTrack.CompletedTask}
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
                        {" "}
                        {thingOnTrack && thingOnTrack.SchedulededTask}
                      </span>
                    </div>
                  </div>
                </div>
                {userDetails &&
                  userDetails.UserType !== undefined &&
                  (userDetails.UserType === 3 ||
                    userDetails.UserType === 6) && (
                    <div className="sidebar-overview-grid-new shadow bg-white rounded">
                      <div className="take-action-small-title-new">
                        Overview
                      </div>
                      <div className="take-action-title">Team Performance</div>
                      <div className="btn-data-new">
                        {teamPerformance &&
                          teamPerformance.length > 0 &&
                          teamPerformance.length <= 4 &&
                          teamPerformance.map((item, index) =>
                            _renderTeamPerformance(
                              item,
                              index,
                              teamPerformance.length
                            )
                          )}
                        {!showMoreLessTM &&
                          teamPerformance &&
                          teamPerformance.length > 0 &&
                          teamPerformance.length > 4 &&
                          teamPerformance
                            .slice(0, 4)
                            .map((item, index) =>
                              _renderTeamPerformance(
                                item,
                                index,
                                teamPerformance.length
                              )
                            )}
                        {showMoreLessTM &&
                          teamPerformance &&
                          teamPerformance.length > 0 &&
                          teamPerformance.length > 4 &&
                          teamPerformance.map((item, index) =>
                            _renderTeamPerformance(
                              item,
                              index,
                              teamPerformance.length
                            )
                          )}

                        {!showMoreLessTM &&
                          teamPerformance &&
                          teamPerformance.length > 4 && (
                            <div
                              style={{ textAlign: "left" }}
                              onClick={() => setShowMoreLessTM(!showMoreLessTM)}
                              className="view-more-task"
                            >
                              view all members
                            </div>
                          )}
                        {showMoreLessTM &&
                          teamPerformance &&
                          teamPerformance.length > 4 && (
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
                  )}
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default QuickOverView;
