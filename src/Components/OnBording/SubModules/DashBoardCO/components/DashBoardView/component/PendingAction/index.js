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
import { actions as taskReportActions } from "../../../../redux/actions";
import {
  getAllTasks,
  getDataByStatus,
} from "../../../../../../../../CommonModules/helpers/tasks.helper";
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
  const taskList =
    state &&
    state.taskReport &&
    state.taskReport.taskReport &&
    state.taskReport.taskReport.taskReport &&
    state.taskReport.taskReport.taskReport;
  const getSelectTaskDetails = (task) => {
    dispatch(
      taskReportActions.taskReportByIdRequestSuccess({
        taskReportById: task,
      })
    );
  };
  useEffect(() => {
    if (taskList && taskList.length > 0) {
      const pending =
        getAllTasks(taskList)?.filter(
          (task) => task.status === "Approval Pending"
        ) || [];
      setPendingArr([...pending]);
    }
  }, []);

  return (
    <>
      <div className="task-grid-scroll customScrollSecond scroll-btm">
        <div className="mobile-dashboard-view">
          <div className="take-action" style={{ height: "90vh" }}>
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
                        onClick={() => {
                          getSelectTaskDetails(task);
                        }}
                        style={{
                          pointerEvents: `${
                            userDetails && userDetails.UserType === 6
                              ? "none"
                              : "auto"
                          }`,
                          textDecoration: "none",
                        }}
                      >
                        <div className="row mb-16">
                          <div className="col-10 col-md-5 col-sm-5 col-xl-5">
                            <div className="all-companies-sub-title new-task-list">
                              <div className="pending-list-mobile">
                                <div className="graybox-left">
                                  <span className="all-companies-nse-label">
                                    {task?.license_display}
                                  </span>
                                </div>
                                <span className="pink-label-title-right">
                                  <div className="overdue-title">
                                    {task?.subject}
                                  </div>
                                  <div className="black-week d-block d-sm-none">
                                    <div className="d-block d-sm-none">
                                      Today
                                    </div>
                                  </div>
                                  {task?.status !== "Assigned" && (
                                    <p
                                      className="pink-label-text"
                                      style={{
                                        color:
                                          task && task?.status
                                            ? task?.status ===
                                              "Approval Pending"
                                              ? "#7fba7a"
                                              : task?.status === "Approved"
                                              ? "#7fba7a"
                                              : task?.status === "Assigned"
                                              ? "#f8c102"
                                              : task?.status === "Not Assigned"
                                              ? "#f8c102"
                                              : task?.status === "Rejected"
                                              ? "#ff5f31"
                                              : ""
                                            : "#fcf3cd",
                                      }}
                                    >
                                      {task?.status}
                                    </p>
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-2 col-md-2 col-sm-2 col-xl-2 d-none d-sm-block">
                            <div className="circle-front-text" value="717149">
                              {task.customer_name}
                            </div>
                          </div>
                          <div className="col-2 col-md-3 col-sm-3 col-xl-3 d-none d-sm-block">
                            {task && task.assign_to && (
                              <div className="d-flex new-task-list">
                                <div className="circle-name d-none d-sm-block">
                                  <div className="circle-text">
                                    {getInitials(task && task.assign_to)}
                                  </div>
                                </div>
                                <div className="circle-front-text d-none d-sm-block mail">
                                  {task.assign_to}
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="col-2">
                            <div className="align-right task-list-new">
                              <div className="d-flex">
                                <div className="black-week d-none d-sm-block">
                                  {moment(task && task.deadline_date).format(
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
