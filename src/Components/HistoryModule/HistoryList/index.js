import React, { useEffect, useRef, useState } from "react";
import LeftSideBar from "../../../CommonModules/SideBar/LeftSideBar";
import MobileLeftSidebar from "../../OnBording/SubModules/DashBoardCO/components/MobileLeftSidebar";
import closeIcon from "../../../assets/Icons/closeIcon.png";
import HistoryFilterForm from "../HistoryFilterForm.js";
import filter from "../../../assets/Icons/Filters.png";
import download from "../../../assets/Icons/download.png";
import sideBarlogo from "../../../assets/Icons/sideBarlogo.png";
import togglemobile from "../../../assets/Icons/togglemobile.png";
import threeDots from "../../../assets/Icons/threeDots.PNG";
import Cobg from "../../../assets/Images/Onboarding/co-bg.png";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { isMobile } from "react-device-detect";
// import constant from "../../../CommonModules/sharedComponents/constants/constant";
import moment from "moment";
import { clearState, getHistoryList, setSuccess } from "../redux/actions";
import { withRouter } from "react-router";
import { BACKEND_BASE_URL } from "../../../apiServices/baseurl";

const HistoryList = (props) => {
  // state for mobile design
  const [isShowMobileOptionsId, setIsShowMobileOptionsId] = useState(null); // For showing options on single row
  const [isShowMobileRowData, setIsShowMobileRowData] = useState(false); // For showing Row Data
  const [mobileRowData, setMobileRowData] = useState({}); // Single Row data
  const sideBarParent = useRef(null);
  const sideBarChild = useRef(null);
  const [showHB, setShowHBMenu] = useState(false); // For showing Hamburger Menu
  const [isShowMobileFilter, setIsShowMobileFilter] = useState(false);
  // state for desktop design
  const [isShowFilter, setIsShowFilter] = useState(false); // Show filter popup
  const [navigationHideShow, setNavigationHideShow] = useState(false);
  const state = useSelector((state) => state); // state
  const dispatch = useDispatch(); // dispatch

  const onHBMenu = () => {
    setNavigationHideShow(true);
    const drawerParent = sideBarParent;
    const drawerChild = sideBarChild;
    if (drawerParent) {
      drawerParent.current.classList.add("overlay");
      drawerChild.current.style.left = "0%";
    }
  };

  const closeMobileSidebar = () => {
    const drawerParent = document.getElementById("sideBarParent");
    const drawerChild = document.getElementById("sideBarChild");
    if (drawerParent) {
      drawerParent.classList.remove("overlay");
      drawerChild.style.left = "-100%";
    }
    setShowHBMenu(false);
  };

  useEffect(() => {
    setIsShowMobileFilter(false);
    setIsShowFilter(false);
    dispatch(setSuccess(false));
  }, [state.HistoryReducer.isSuccess]);

  const getNameInitials = (name) => {
    if (name != undefined) {
      let initials = "";
      initials = name
        .split(" ")
        .map((n) => n[0])
        .join("");
      return initials.toUpperCase();
    }
  };

  return (
    <>
      <img className="right-bg" src={Cobg} alt="" />
      <div className="history-side-bar">
        {isMobile ? (
          <div id="sideBarParent" className="" ref={sideBarParent}>
            <div
              id="sideBarChild"
              className="leftSideBarFixed"
              ref={sideBarChild}
            >
              <MobileLeftSidebar
                className="d-block d-lg-none"
                close={() => closeMobileSidebar()}
              />
            </div>
          </div>
        ) : (
          <LeftSideBar />
        )}
        {isMobile ? (
          <div className="history-container-mobile">
            {/* Filter pop-up for mobile */}
            <div
              className={`filter-popup-mobile ${
                isShowMobileFilter && "d-block"
              } d-lg-none`}
            >
              <div className="filter-popup-mobile--container">
                <img
                  src={closeIcon}
                  alt="close-icon"
                  className="close--filter-popup-mobile"
                  onClick={() => setIsShowMobileFilter(!isShowMobileFilter)}
                />
                <div className="filter-popup-mobile--wrapper">
                  <h2 style={{ marginBottom: "3rem" }}>Fiters</h2>
                  <div className="filter-wrapper-mobile">
                    <HistoryFilterForm />
                  </div>
                </div>
              </div>
            </div>
            {/* View More Data pop up */}
            {isShowMobileRowData && isShowMobileOptionsId && (
              <div className="view-more-data--popup">
                <div className="view-more-data--container">
                  <h3 style={{ width: "80%" }}>{mobileRowData.TaskName}</h3>
                  <img
                    className="close--data-popup"
                    src={closeIcon}
                    alt="close-icon"
                    onClick={() => {
                      setIsShowMobileOptionsId(null); // Resetting Mobile Options Id
                      setMobileRowData({}); // Resetting Row Data
                      setIsShowMobileRowData(!isShowMobileRowData); // Toggling isShowMobileRowData
                    }}
                  />
                  <div className="data-field">
                    <span className="task-detail">COMPANY</span>
                    <p>{mobileRowData?.EntityName}</p>
                  </div>
                  <div className="data-field">
                    <span className="task-detail">ASSIGNED TO</span>
                    <p className="d-flex align-items-center">
                      <span className="circle-dp">
                        {getNameInitials(mobileRowData?.AprovalAssignedTo)}
                      </span>{" "}
                      <span>{mobileRowData?.AprovalAssignedTo}</span>
                    </p>
                  </div>
                  <div className="data-field">
                    <span className="task-detail">APPROVER</span>
                    <p className="d-flex align-items-center">
                      <span className="circle-dp">
                        {getNameInitials(mobileRowData?.AssignedTo)}
                      </span>{" "}
                      <span>{mobileRowData?.AssignedTo}</span>
                    </p>
                  </div>
                  <div className="data-field">
                    <span className="task-detail">DUE DATE</span>
                    <p>
                      {moment(mobileRowData.EndDate).format("DD MMMM YYYY")}
                    </p>
                  </div>
                  <div className="data-field">
                    <button className="download-btn-mobile mt-4">
                      <img src={download} style={{ marginRight: "1rem" }} />
                      DOWNLOAD FILES
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* View more data ends here */}
            <div className="d-block mobile-head">
              {showHB === false && (
                // <div className=" d-block d-sm-none pad-ms">
                <div className="d-flex justify-content-between d-lg-none">
                  <div
                    className=""
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      onHBMenu();
                    }}
                  >
                    <img src={togglemobile} alt="toggle mobile" />
                  </div>
                  <div className="pr-4">
                    {" "}
                    <img
                      className="mobile-logo"
                      src={sideBarlogo}
                      alt="sideBarlogo"
                    />{" "}
                  </div>
                </div>
              )}
              <div className=" table-header-mobile d-flex justify-content-between align-items-center mt-3">
                <h3 className="mb-0">Compliance History</h3>
                <img
                  src={filter}
                  alt="filter"
                  onClick={() => setIsShowMobileFilter(!isShowMobileFilter)}
                />
              </div>
              {state.HistoryReducer.historyList.length !== 0 ? (
                <table className="table co-company-details-tbl table_legenda mt-3">
                  <thead>
                    <tr>
                      <th>Complete on</th>
                      <th>status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.HistoryReducer.historyList.map((list) => (
                      <tr>
                        <td className="task-name td-mobile">
                          {list.TaskName}
                          <br />
                          <span className="task-detail">
                            {moment(list.Completed).format("DD MMMM YYYY")}
                          </span>
                        </td>
                        <td className="d-flex justify-content-between td-mobile">
                          <button
                            className={
                              list.Status === "Pending"
                                ? list.Status === "Delayed"
                                  ? "delayed"
                                  : "on-time"
                                : "pending"
                            }
                          >
                            {list.Status}
                          </button>
                          <div className="data-options">
                            <img
                              src={threeDots}
                              alt="options"
                              onClick={() => {
                                if (isShowMobileOptionsId === list.TaskId) {
                                  setIsShowMobileOptionsId(null);
                                  setMobileRowData({});
                                  return;
                                }
                                setIsShowMobileOptionsId(list.TaskId);
                                setMobileRowData(list);
                              }}
                            />
                            {isShowMobileOptionsId === list?.TaskId && (
                              <div className="more-options">
                                {/* View More Logic Here */}
                                <span
                                  onClick={() => {
                                    setIsShowMobileRowData(
                                      !isShowMobileRowData
                                    );
                                  }}
                                >
                                  View More
                                </span>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="no-data">
                  <p>Compliance History not found! Please set filters.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <div
              className={`filter-popup ${isShowFilter && "popup-open"}`}
              style={{
                boxShadow: isShowFilter
                  ? "1px 1px 9999px 9999px rgba(0,0,0,0.7)"
                  : "none",
              }}
            >
              <div className="container" style={{ width: "300px" }}>
                <div className="popup-header d-flex align-items-center my-5">
                  <img
                    src={closeIcon}
                    alt="close-icon"
                    onClick={() => {
                      dispatch(clearState());
                      setIsShowFilter(!isShowFilter);
                    }}
                    style={{
                      marginRight: "2rem",
                      cursor: "pointer",
                    }}
                  />
                  <h3 style={{ marginBottom: "0px" }}>Filters</h3>
                </div>
                <div className="filter-wrapper-desktop">
                  <HistoryFilterForm />
                </div>
              </div>
            </div>
            <div className="history-container">
              <div className="row">
                <div className="history-header">
                  <h2 className="main-title">
                    Compliance History{" "}
                    <img src={filter} className="history-filter" />
                  </h2>
                  <button
                    className="filter-toggle"
                    onClick={() => setIsShowFilter(!isShowFilter)}
                  >
                    Filter
                  </button>
                </div>
                <div className="scroll-personal-grid d-md-block d-sm-block table-responsive mt-4">
                  {state.HistoryReducer.historyList.length !== 0 ? (
                    <table className="table co-company-details-tbl table_legenda">
                      <thead>
                        <tr>
                          <th clscope="col">Complete on</th>
                          <th scope="col">Task Name</th>
                          <th scope="col">Company</th>
                          <th>Assigned To</th>
                          <th>Approver</th>
                          <th>Due Date</th>
                          <th>status</th>
                          <th style={{ textAlign: "center" }}>Download</th>
                        </tr>
                      </thead>
                      <tbody>
                        {state.HistoryReducer.historyList.map((list) => (
                          <tr>
                            <td className="task-detail">
                              {moment(list.Completed).format("DD MMMM YYYY")}
                            </td>
                            <td className="task-name">{list.TaskName}</td>
                            <td className="task-detail">{list.EntityName}</td>
                            <td>
                              {" "}
                              <div className="holding-list-bold-title-background">
                                <span className="circle-dp">
                                  {getNameInitials(list.AprovalAssignedTo)}
                                </span>{" "}
                                <div className="nameCirle">
                                  {list.AprovalAssignedTo}{" "}
                                </div>
                              </div>
                            </td>
                            <td>
                              {" "}
                              <div className="holding-list-bold-title-background">
                                <span className="circle-dp">
                                  {getNameInitials(list.AssignedTo)}
                                </span>{" "}
                                <div className="nameCirle">
                                  {" "}
                                  {list.AssignedTo}{" "}
                                </div>
                              </div>
                            </td>
                            <td className="task-detail">
                              {moment(list.EndDate).format("DD MMMM YYYY")}
                            </td>
                            <td>
                              <button
                                className={
                                  list.Status === "PENDING"
                                    ? "pending"
                                    : list.Status === "ON TIME"
                                    ? "on-time"
                                    : "delayed"
                                }
                              >
                                {list.Status}
                              </button>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <a
                                href={`${BACKEND_BASE_URL}//viewfiles.ashx?id=${list?.TaskId}&flag=downloadtaskfiles&file=${list?.c_file}`}
                              >
                                {" "}
                                <img src={download} />{" "}
                              </a>
                            </td>
                          </tr>
                        ))}

                        {/* --------|||| Table for testing ||||--------- */}
                        {/* <tr>
                        <td className="task-detail">12 08 2001</td>
                        <td className="task-name">
                          Enhanced supervision reporting
                        </td>
                        <td className="task-detail">Google, Inc</td>
                        <td>
                          {" "}
                          <div className="holding-list-bold-title-background">
                            <span className="circle-dp">JM</span>{" "}
                            <div className="nameCirle">Jatin Mehta</div>
                          </div>
                        </td>
                        <td>
                          {" "}
                          <div className="holding-list-bold-title-background">
                            <span className="circle-dp">AK</span>{" "}
                            <div className="nameCirle"> Ashu Kumar</div>
                          </div>
                        </td>
                        <td className="task-detail">12 08 2001</td>
                        <td>
                          <button className="on-time">On-Time</button>
                        </td>
                        <td align="left">
                          <img src={download} />
                        </td>
                      </tr> */}
                        {/* -------- Table for testing --------- */}
                      </tbody>
                    </table>
                  ) : (
                    <div className="no-data">
                      <p>Compliance History not found! Select filter.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}{" "}
      </div>
    </>
  );
};

export default withRouter(HistoryList);
