import React from "react";
import "./style.css";
// import SideBarBg from "../../../../assets/Images/Onboarding/side-bar-bg.png";
import sideBarlogo from "../../../../../assets/Icons/sideBarlogo.png";
import SideBaruser from "../../../../../assets/Icons/sideBaruser.png";
import taskIcon from "../../../../../assets/Icons/taskIcon.png";
import btnicon from "../../../../../assets/Icons/btn-icon.png";
import siderBarbtnArrow from "../../../../../assets/Icons/siderBarbtnArrow.png";
import actionArrow from "../../../../../assets/Icons/actionArrow.png";
import complteTaskIcon from "../../../../../assets/Icons/complteTaskIcon.png";
import inprogressicon from "../../../../../assets/Icons/inprogressicon.png";
import scheduledIcon from "../../../../../assets/Icons/scheduledIcon.png";
import siderBarbtnArrowTop from "../../../../../assets/Icons/siderBarbtnArrowTop.png";
import sidebarDownArrow from "../../../../../assets/Icons/sidebarDownArrow.png";
import keyboardArrowRightBlack from "../../../../../assets/Icons/keyboardArrowRightBlack.png";
import sidebarCheckIcon from "../../../../../assets/Icons/sidebarCheckIcon.png";
import completeTaskIcon from "../../../../../assets/Icons/emailVerify.png";
import downArrow from "../../../../../assets/Icons/downArrow.png";
import sidebarActive from "../../../../../assets/Icons/sidebar-active.png";
import sidebarBell from "../../../../../assets/Icons/sidebarBell.png";
import sidebarSettingIcon from "../../../../../assets/Icons/sidebarSettingIcon.png";
import sidebarAccountCircle from "../../../../../assets/Icons/sidebarAccountCircle.png";


import moment from 'moment';

function SideBarCo({
  isTaskListOpen,
  isTaskApproved,
  setIsTaskApproved,
  taskList,
}) {
  return (
    <div className="side-bar">
      <div className="left-bar">
        <div className="logo">
          <img src={sideBarlogo} alt="sideBarlogo" />
        </div>
        <div className="first-icon-list">
          <div className="taskIcon-active">
            <img src={sidebarActive} alt="taskIcon" />
          </div>
          <div className="taskIcon">
            <img src={sidebarBell} alt="sidebar Bell" />
          </div>
          {/* <div className="taskIcon">
            <img src={taskIcon} alt="taskIcon" />
          </div>
          <div className="taskIcon">
            <img src={taskIcon} alt="taskIcon" />
          </div> */}
        </div>
        <div className="devider-line"></div>
        <div className="second-icon-list">
          <div className="taskIcon">
            <img src={sidebarSettingIcon} alt="taskIcon" />
          </div>
          <div className="taskIcon">
            <img src={sidebarAccountCircle} alt="sidebar Account Circle" />
          </div>
          
        </div>
        <div className="user">
          <img src={SideBaruser} alt="SideBaruser" />
        </div>
      </div>
      {/* {isTaskListOpen && ( */}
        {/* <div className="right-side">
          <div className="user-title">
            All Companies{" "}
            <img src={sidebarDownArrow} alt="sidebar Down Arrow" />
          </div>
          <div className="bold-title-task">Tasks</div>

          <div className="row">
            <div className="col-12">
              <div className="sidebar-file-title-grid">
                <div className="file-title">List</div>
                <div className="file-title-progress"></div>
              </div>
            </div> */}
            {/* <div className="sidebar-sub-category-grid">
              <div className="col-12">
                <div className="sider-category-title">Overdue</div>
              </div>
              <div className="side-bar-list-grid">
                <div className="col-11">
                  <div className="sidebar-sub-title">
                    <img src={sidebarCheckIcon} alt="sidebar Check Icon" />
                    <span className="sidebar-nse-label">NSE</span>
                    <div className="d-block">
                      <div className="sidebar-subtitle">
                        Uploading of Holding Statement{" "}
                      </div>
                      <div className="sidebar-red-week">Yesterday</div>
                    </div>
                  </div>
                </div>
                <div className="col-1">
                  <div className="align-right">
                    <div className="row">
                      <div className="sidebar-arrow-week sidebar-text-right-grid">
                        <img src={keyboardArrowRightBlack} alt="Right Arrow" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="side-bar-list-grid">
                <div className="col-11">
                  <div className="sidebar-sub-title">
                    <img src={sidebarCheckIcon} alt="sidebar Check Icon" />
                    <span className="sidebar-nse-label">NSE</span>
                    <div className="d-block">
                      <div className="sidebar-subtitle">
                        Day wise reporting of bank balances{" "}
                      </div>
                      <div className="sidebar-red-week">Yesterday</div>
                    </div>
                  </div>
                </div>
                <div className="col-1">
                  <div className="align-right">
                    <div className="row">
                      <div className="sidebar-arrow-week sidebar-text-right-grid">
                        <img src={keyboardArrowRightBlack} alt="Right Arrow" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="side-bar-list-grid">
                <div className="col-11">
                  <div className="sidebar-sub-title">
                    <img src={sidebarCheckIcon} alt="sidebar Check Icon" />
                    <span className="sidebar-nse-label">NSE</span>
                    <div className="d-block">
                      <div className="sidebar-subtitle">
                        Day wise reporting of client level cash & cash...{" "}
                      </div>
                      <div className="sidebar-red-week">Yesterday</div>
                    </div>
                  </div>
                </div>
                <div className="col-1">
                  <div className="align-right">
                    <div className="row">
                      <div className="sidebar-arrow-week sidebar-text-right-grid">
                        <img src={keyboardArrowRightBlack} alt="Right Arrow" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div className="sidebar-sub-category-grid">
              <div className="col-12">
                <div className="sider-category-title-black">Take Action</div>
              </div>
              {taskList &&
                taskList.map((task) => (
                  <div className="side-bar-list-grid sidebar-active-category take-active">
                    <div className="col-11">
                      <div className="sidebar-sub-title">
                        <img
                          src={
                            isTaskApproved ? completeTaskIcon : sidebarCheckIcon
                          }
                          alt="sidebar Check Icon"
                          id={1}
                          onClick={() => setIsTaskApproved(!isTaskApproved)}
                        />
                        <span className="sidebar-nse-label">
                          {task.licenseCode}
                        </span>
                        <div className="d-block">
                          <div className="sidebar-subtitle">
                            {task.taskName}{" "}
                          </div>
                          <div className="sidebar-red-week">
                            {moment(task.endDate).subtract(5,'days').format('DD MMM')}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-1">
                      <div className="align-right">
                        <div className="row">
                          <div className="sidebar-arrow-week sidebar-text-right-grid">
                            <img
                              src={keyboardArrowRightBlack}
                              alt="Right Arrow"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))} */}
              {/* <div className="side-bar-list-grid">
                <div className="col-11">
                  <div className="sidebar-sub-title">
                    <img
                      src={isTaskApproved ? completeTaskIcon : sidebarCheckIcon}
                      alt="sidebar Check Icon"
                      onClick={() => setIsTaskApproved(!isTaskApproved)}
                    />
                    <span className="sidebar-nse-label">NSE</span>
                    <div className="d-block">
                      <div className="sidebar-subtitle">
                        Day wise reporting of bank balances{" "}
                      </div>
                      <div className="sidebar-red-week">Yesterday</div>
                    </div>
                  </div>
                </div>
                <div className="col-1">
                  <div className="align-right">
                    <div className="row">
                      <div className="sidebar-arrow-week sidebar-text-right-grid">
                        <img src={keyboardArrowRightBlack} alt="Right Arrow" />
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* <div className="side-bar-list-grid">
                <div className="col-11">
                  <div className="sidebar-sub-title">
                    <img src={sidebarCheckIcon} alt="sidebar Check Icon" />
                    <span className="sidebar-nse-label">NSE</span>
                    <div className="d-block">
                      <div className="sidebar-subtitle">
                        Day wise reporting of client level cash & cash...{" "}
                      </div>
                      <div className="sidebar-red-week">Yesterday</div>
                    </div>
                  </div>
                </div>
                <div className="col-1">
                  <div className="align-right">
                    <div className="row">
                      <div className="sidebar-arrow-week sidebar-text-right-grid">
                        <img src={keyboardArrowRightBlack} alt="Right Arrow" />
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* <div className="sidebar-last-status-grid">
                <div className="upcoming-grid">
                  <div className="col-12">
                    <div className="upcoming-btn">
                      <div className="upcoming-title">
                        Upcoming
                        <span className="black-circle">
                          <p className="black-circle-text">0</p>
                        </span>
                        <img
                          src={downArrow}
                          className="arrowDown"
                          alt="Arrow down"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="complete-grid">
                  <div className="col-12">
                    <div className="upcoming-btn">
                      <div className="complete-title">
                        Completed
                        <span className="green-circle">
                          <p className="green-circle-text">0</p>
                        </span>
                        <img
                          src={downArrow}
                          className="arrowDown"
                          alt="Arrow grren down"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      {/* // )} */}

      {/* {!isTaskListOpen && (
        <div className="right-side">
          <div className="user-title">Hi Naresh Jain,</div>
          <div className="bold-title-sidebar">
            Here is a quick overview for you!
          </div>
          <div className="two-btn">
            <div className="btn sidebar-btn-one">
              <div className="d-flex">
                <div className="icon-left">
                  <img src={btnicon} alt="btn-icon" />{" "}
                </div>
                <div className="icon-right-text">
                  <div className="small-text"> B&K Securities</div>
                  <div className="big-text">
                    Compliant (8/10){" "}
                    <img src={siderBarbtnArrowTop} alt="btn Arrow top" />
                  </div>
                </div>
              </div>
              <div className="btn-data">
                <div class="compliant-option">
                  <p className="compliant-title-left">NSDL</p>
                  <ul className="list-group list-group-horizontal">
                    <li className="green-box"></li>
                    <li className="green-box"></li>
                    <li className="green-box"></li>
                    <li className="green-box"></li>
                    <li className="green-box"></li>
                    <li className="gray-box"></li>
                    <li className="gray-box"></li>
                    <li className="gray-box"></li>
                    <li className="gray-box"></li>
                    <li className="gray-box"></li>
                    <li className="gray-box"></li>
                    <li className="gray-box"></li>
                  </ul>
                </div>
                <div class="compliant-option">
                  <p className="compliant-title-left">CDSL</p>
                  <ul className="list-group list-group-horizontal">
                    <li className="green-box"></li>
                    <li className="green-box"></li>
                    <li className="green-box"></li>
                    <li className="green-box"></li>
                    <li className="green-box"></li>
                    <li className="green-box"></li>
                    <li className="green-box"></li>
                    <li className="gray-box"></li>
                    <li className="gray-box"></li>
                    <li className="gray-box"></li>
                    <li className="gray-box"></li>
                    <li className="gray-box"></li>
                  </ul>
                </div>
                <div class="compliant-option">
                  <p className="compliant-title-left">NSE</p>
                  <ul className="list-group list-group-horizontal">
                    <li className="green-box"></li>
                    <li className="green-box"></li>
                    <li className="green-box"></li>
                    <li className="green-box"></li>
                    <li className="red-box"></li>
                    <li className="gray-box"></li>
                    <li className="gray-box"></li>
                    <li className="gray-box"></li>
                    <li className="gray-box"></li>
                    <li className="gray-box"></li>
                    <li className="gray-box"></li>
                    <li className="gray-box"></li>
                  </ul>
                </div>
                <div class="compliant-option">
                  <p className="compliant-title-left">BSE</p>
                  <ul className="list-group list-group-horizontal">
                    <li className="green-box"></li>
                    <li className="green-box"></li>
                    <li className="green-box"></li>
                    <li className="green-box"></li>
                    <li className="green-box"></li>
                    <li className="green-box"></li>
                    <li className="green-box"></li>
                    <li className="green-box"></li>
                    <li className="green-box"></li>
                    <li className="gray-box"></li>
                    <li className="gray-box"></li>
                    <li className="gray-box"></li>
                  </ul>
                </div>
                <div class="compliant-option">
                  <p className="compliant-title-left">NSE</p>
                  <ul className="list-group list-group-horizontal">
                    <li className="green-box"></li>
                    <li className="green-box"></li>
                    <li className="green-box"></li>
                    <li className="green-box"></li>
                    <li className="red-box"></li>
                    <li className="gray-box"></li>
                    <li className="gray-box"></li>
                    <li className="gray-box"></li>
                    <li className="gray-box"></li>
                    <li className="gray-box"></li>
                    <li className="gray-box"></li>
                    <li className="gray-box"></li>
                  </ul>
                </div>
                <div class="compliant-option">
                  <p className="compliant-title-left">BSE</p>
                  <ul className="list-group list-group-horizontal">
                    <li className="green-box"></li>
                    <li className="green-box"></li>
                    <li className="green-box"></li>
                    <li className="green-box"></li>
                    <li className="green-box"></li>
                    <li className="green-box"></li>
                    <li className="green-box"></li>
                    <li className="green-box"></li>
                    <li className="green-box"></li>
                    <li className="gray-box"></li>
                    <li className="gray-box"></li>
                    <li className="gray-box"></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="btn sidebar-btn-one second-btn">
              <div className="d-flex">
                <div className="icon-left">
                  <img src={btnicon} alt="btn-icon" />{" "}
                </div>
                <div className="icon-right-text">
                  <div className="small-text"> B&K Trading</div>
                  <div className="big-text">
                    Compliant (4/10){" "}
                    <img src={siderBarbtnArrow} alt="btn Arrow" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="take-action-grid shadow bg-white rounded">
            <div className="take-action-small-title">Immediately</div>
            <div className="take-action-title">Take Action</div>
            <div className="action-bottom-grid">
              <div className="left-grid-action">
                <span className="red-circle">4</span>
                <div className="take-action-left">
                  Risk & Delays
                  <img className="btn-icon" src={actionArrow} alt="btn-icon" />
                </div>
              </div>
              <div className="right-grid-action">
                <span className="blue-circle">4</span>
                <div className="take-action-right">
                  Pending Action
                  <img className="btn-icon" src={actionArrow} alt="btn-icon" />
                </div>
              </div>
            </div>
          </div>
          <div className="sidebar-month-grid shadow bg-white rounded">
            <div className="take-action-small-title">This Month</div>
            <div className="take-action-title">Things are on track!</div>
            <div className="task-details-grid">
              <div className="complte-task-title text-left">
                <img
                  className="mr-2"
                  src={complteTaskIcon}
                  alt="complte-Task-icon"
                />{" "}
                Completed Tasks <span className="text-right"> 24</span>
              </div>
              <div className="complte-task-title text-left">
                <img
                  className="mr-2"
                  src={inprogressicon}
                  alt="in-progress-icon"
                />{" "}
                In-progress <span className="text-right"> 16</span>
              </div>
              <div className="complte-task-title text-left">
                <img
                  className="mr-2"
                  src={scheduledIcon}
                  alt="scheduled-icon"
                />{" "}
                Scheduled <span className="text-right"> 14</span>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default SideBarCo;
