import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import delayCloseIcon from "../../../../../../../../assets/Icons/delayCloseIcon.png";
import keyboardArrowRightBlack from "../../../../../../../../assets/Icons/keyboardArrowRightBlack.png";
import { BACKEND_BASE_URL } from "../../../../../../../../apiServices/baseurl";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { actions as notificationActions } from "../../../notification/Redux/actions.js";

function RiskAndDelayTaskList({ history, click, setClick }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [riskArr, setRiskArr] = useState([]);
  const [delayArr, setDelayArr] = useState([]);
  const [riskOrDelayArr, setRiskOrDelayArr] = useState([]);

  const userID =
    state && state.auth && state.auth.loginInfo && state.auth.loginInfo.UserID;

  const userDetails = state && state.auth && state.auth.loginInfo;

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
    console.log("1");
    const payload = {
      entityid: "R",
      userID: userID,
      usertype: "3",
      entityList: "",
      licList: "",
      startDate: "",
      endDate: "",
    };
    axios
      .post(`${BACKEND_BASE_URL}/api/getTaskReport`, payload)
      .then((response) => {
        let riskData = response.data;
        let rowCount = [];
        riskData.map((item) => {
          let EntityName = item.EntityName;
          item.EntityDetails.forEach((task) => {
            task.Licdetails.forEach((task1) => {
              let data = task1;
              let newObjData = Object.assign(data, {
                licCode: task.liccode,
                EntityCode: EntityName,
              });
              rowCount.push(newObjData);
            });
          });
        });
        setRiskArr(rowCount);
      })
      .catch((error) => {
        console.log("error => ", error);
      });
  }, []);

  useEffect(() => {
    console.log("2");

    const payload = {
      entityid: "D",
      userID: userID,
      usertype: "3",
      entityList: "",
      licList: "",
      startDate: "",
      endDate: "",
    };
    if (userID !== undefined)
      axios
        .post(`${BACKEND_BASE_URL}/api/getTaskReport`, payload)
        .then((response) => {
          let riskData = response.data;
          let rowCount = [];
          riskData.map((item) => {
            let EntityName = item.EntityName;
            item.EntityDetails.forEach((task) => {
              task.Licdetails.forEach((task1) => {
                let data = task1;
                let newObjData = Object.assign(data, {
                  licCode: task.liccode,
                  EntityCode: EntityName,
                });
                rowCount.push(newObjData);
              });
            });
          });
          setDelayArr(rowCount);
        })
        .catch((error) => {
          console.log("error => ", error);
        });
  }, []);

  useEffect(() => {
    const riskAndDelayArr = [...riskArr, ...delayArr];
    setRiskOrDelayArr(riskAndDelayArr);
  }, [riskArr, delayArr]);

  return (
    <>
      <div className="task-grid-scroll customScrollSecond scroll-btm">
        <div className="mobile-dashboard-view">
          <div className="take-action">
            <div className="task-list-grid">
              <div className="upcoming-btn-pending">
                <div className="pink-circle-closing">
                  <div className="pink-label-close">Risk & Delays </div>
                  <img
                    style={{ cursor: "pointer" }}
                    onClick={() => setClick("")}
                    className="pink-label-close-icon"
                    src={delayCloseIcon}
                    alt=""
                  />
                </div>
              </div>
              {riskOrDelayArr &&
                riskOrDelayArr.length > 0 &&
                riskOrDelayArr.map((task) => {
                  return (
                    <>
                      <Link
                        to="/dashboard"
                        style={{ textDecoration: "none" }}
                        onClick={() => {
                          if (userDetails && userDetails.UserType !== 6) {
                            dispatch(
                              notificationActions.setTaskID(task.TaskId)
                            );
                          }
                        }}
                        style={{
                          pointerEvents: `${
                            userDetails && userDetails.UserType === 6
                              ? "none"
                              : "auto"
                          }`,
                        }}
                      >
                        <div className="row mb-16">
                          <div className="col-10 col-md-5 col-sm-5 col-xl-5">
                            <div className="all-companies-sub-title new-task-list">
                              <div className="pending-list-mobile">
                                <div className="graybox-left">
                                  <span className="all-companies-nse-label">
                                    {task.licCode && task.licCode}
                                  </span>
                                </div>
                                <span className="pink-label-title-right">
                                  <div className="overdue-title">
                                    {task.TaskName && task.TaskName}
                                  </div>
                                  <div className="black-week d-block d-sm-none">
                                    <div className="d-block d-sm-none">
                                      Today
                                    </div>
                                  </div>
                                  {task.Status !== "Assigned" && (
                                    <p
                                      className="pink-label-text"
                                      style={{
                                        color:
                                          task && task.Status
                                            ? task.Status ===
                                              "Completed By User"
                                              ? "#7fba7a"
                                              : task.Status === "Approved"
                                              ? "#7fba7a"
                                              : task.Status === "Assigned"
                                              ? "#f8c102"
                                              : task.Status === "Assign"
                                              ? "#f8c102"
                                              : task.Status ===
                                                "Request Rejected"
                                              ? "#ff5f31"
                                              : ""
                                            : "#fcf3cd",
                                      }}
                                    >
                                      {task.Status}
                                    </p>
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-2 col-md-2 col-sm-2 col-xl-2 d-none d-sm-block">
                            <div className="circle-front-text" value="717149">
                              {task.EntityCode}
                            </div>
                          </div>
                          <div className="col-2 col-md-3 col-sm-3 col-xl-3 d-none d-sm-block">
                            {task && task.AssignedTo && (
                              <div className="d-flex new-task-list">
                                <div className="circle-name d-none d-sm-block">
                                  <div className="circle-text">
                                    {getInitials(task && task.AssignedTo)}
                                  </div>
                                </div>
                                <div className="circle-front-text d-none d-sm-block mail">
                                  {task.AssignedTo}
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="col-2">
                            <div className="align-right task-list-new">
                              <div className="d-flex">
                                <div className="black-week d-none d-sm-block">
                                  {moment(task && task.EndDate).format(
                                    "DD MMM"
                                  )}
                                </div>
                                <div className="right-arrow-week text-right-grid">
                                  <img
                                    className="d-none d-sm-block"
                                    src={keyboardArrowRightBlack}
                                    alt="Right Arrow"
                                  />
                                  <img
                                    class="d-block d-sm-none"
                                    src={keyboardArrowRightBlack}
                                    alt="Right Arrow"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(RiskAndDelayTaskList);
