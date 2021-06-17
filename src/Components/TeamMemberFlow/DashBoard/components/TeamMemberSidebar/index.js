import React from "react";
import "./style.css";
// import SideBarBg from "../../../../assets/Images/Onboarding/team-side-bar-bg.png";
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
import downArrow from "../../../../../assets/Icons/downArrow.png";
import completeTaskIcon from "../../../../../assets/Icons/emailVerify.png";

function TeamSidebar({ isMarked, showDescription, setIsMarked }) {
  return (
    <div className="side-bar">
      <div className="left-bar">
        <div className="logo">
          <img src={sideBarlogo} alt="sideBarlogo" />
        </div>
        <div className="taskIcon">
          <img src={taskIcon} alt="taskIcon" />
        </div>

        <div className="user">
          <img src={SideBaruser} alt="SideBaruser" />
        </div>
      </div>
      {showDescription && (
        <div className="team-right-side">
          <div className="team-member-sidebar-top-grid">
            <div className="text-count-sidebar rounded">
              <div className="take-action-sidebar-title">This Month</div>
              <div className="take-action-track-title">
                Things are on track!
              </div>
              <div className="task-progress-grid">
                <div className="sidebar-top-counter-title text-left">
                  <div className="sidebar-box-image">
                    <img
                      className="mr-1"
                      src={complteTaskIcon}
                      alt="complte-Task-icon"
                    />{" "}
                  </div>
                  <div className="title-count">
                    <div className="sidebar-count-task">Completed</div>
                    <span className="sidebar-text-count"> 0</span>
                  </div>
                </div>
                <div className="sidebar-top-counter-title text-left">
                  <div className="sidebar-box-image">
                    <img
                      className="mr-1"
                      src={inprogressicon}
                      alt="in-progress-icon"
                    />{" "}
                  </div>
                  <div className="title-count">
                    <div className="sidebar-count-task">In-progress</div>
                    <span className="sidebar-text-count"> 2</span>
                  </div>
                </div>
                <div className="sidebar-top-counter-title text-left">
                  <div className="sidebar-box-image">
                    <img
                      className="mr-1"
                      src={scheduledIcon}
                      alt="scheduled-icon"
                    />{" "}
                  </div>
                  <div className="title-count">
                    <div className="sidebar-count-task">Scheduled</div>
                    <span className="sidebar-text-count"> 0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
            </div>
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
            <div className="sidebar-sub-category-grid">
              <div className="col-12">
                <div className="sider-category-title-black">Take Action</div>
              </div>
              <div className="side-bar-list-grid sidebar-active-category take-active">
                <div className="col-11">
                  <div className="sidebar-sub-title">
                    <img
                      src={isMarked ? completeTaskIcon : sidebarCheckIcon}
                      onClick={() => setIsMarked(!isMarked)}
                      alt="sidebar Check Icon"
                    />
                    <span className="sidebar-nse-label">MCX</span>
                    <div className="d-block">
                      <div className="sidebar-subtitle">
                      Monthy Statement of Accounts{" "}
                      </div>
                      <div className="sidebar-red-week">20 April</div>
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
                    <span className="sidebar-nse-label">MCX</span>
                    <div className="d-block">
                      <div className="sidebar-subtitle">
                      Anuual Compliace Report {" "}
                      </div>
                      <div className="sidebar-red-week">20 April</div>
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
              <div className="sidebar-last-status-grid">
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
        </div>
      )}
    </div>
  );
}

export default TeamSidebar;
