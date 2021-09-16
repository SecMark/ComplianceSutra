import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import assignIconCircle from "../../../../../../../../assets/Icons/assignIconCircle.png";
import delayCloseIcon from "../../../../../../../../assets/Icons/delayCloseIcon.png";
import keyboardArrowRightBlack from "../../../../../../../../assets/Icons/keyboardArrowRightBlack.png";
import { BACKEND_BASE_URL } from "../../../../../../../../apiServices/baseurl";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { actions as notificationActions } from "../../../notification/Redux/actions.js";

function PendingActionTaskList({ history, click, setClick }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [pendingArr, setPendingArr] = useState([]);

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
      }
    }
    return initials;
  };

  useEffect(() => {
    const payload = {
      entityid: "P",
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
          setPendingArr(rowCount);
        })
        .catch((error) => {
          console.log("error => ", error);
        });
  }, []);

  return (
    <>
      <div className="task-grid-scroll customScrollSecond scroll-btm">
        <div className="mobile-dashboard-view">
          <div className="take-action">
            <div className="task-list-grid">
              <div className="upcoming-btn-pending">
                <div className="pink-circle-closing">
                  <div className="pink-label-close">Pending Actions </div>
                  <img
                    style={{ cursor: "pointer" }}
                    onClick={() => setClick("")}
                    className="pink-label-close-icon"
                    src={delayCloseIcon}
                    alt=""
                  />
                </div>
              </div>
              {pendingArr &&
                pendingArr.length > 0 &&
                pendingArr.map((task) => {
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
                                  <p className="pink-label-text">
                                    {task.Status}
                                  </p>
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
                            {task &&
                            task.AssignedTo &&
                            task.AssignedTo !== "Assign" ? (
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

export default withRouter(PendingActionTaskList);
