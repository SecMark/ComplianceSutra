import React from "react";
import "./style.css";
import closeBlack from "../../../../../assets/Icons/closeBlack.png";
import fileIcon from "../../../../../assets/Icons/fileIcon.png";
import keyboardArrowRightBlack from "../../../../../assets/Icons/keyboardArrowRightBlack.png";
import downArrow from "../../../../../assets/Icons/downArrow.png";
import sidebarCheckIcon from "../../../../../assets/Icons/sidebarCheckIcon.png";
import sidebarDownArrow from "../../../../../assets/Icons/sidebarDownArrow.png";
import complteTaskIcon from "../../../../../assets/Icons/complteTaskIcon.png";
import inprogressicon from "../../../../../assets/Icons/inprogressicon.png";
import scheduledIcon from "../../../../../assets/Icons/scheduledIcon.png";
import topRightBg from "../../../../../assets/Images/teammember/top-right.png";
import completeTaskIcon from "../../../../../assets/Icons/emailVerify.png";

function RightSideGrid({
  showDescription,
  setShowDescription,
  setIsMarked,
  isMarked,
}) {
  return (
    <div
      className="team-member-task-details"
      style={{ marginLeft: !showDescription && "1vw" }}
    >
      <img className="topRightBg" src={topRightBg} alt="img" />
      <div className="top-counter-grid">
        <div className="left-grid track">
          <div className="take-action-small-title">This Month</div>
          <div className="take-action-title">Things are on track!</div>
        </div>
        <div className="task-progress-grid">
          <div className="top-counter-title text-left">
            <div className="box-image">
              <img
                className="mr-2"
                src={complteTaskIcon}
                alt="complte-Task-icon"
              />{" "}
            </div>
            <div className="title-count">
              <div className="count-task">Completed Tasks</div>
              <span className="text-count"> 0</span>
            </div>
          </div>
          <div className="top-counter-title text-left">
            <div className="box-image">
              <img
                className="mr-2"
                src={inprogressicon}
                alt="in-progress-icon"
              />{" "}
            </div>
            <div className="title-count">
              <div className="count-task">In-progress</div>
              <span className="text-count"> 2</span>
            </div>
          </div>
          <div className="top-counter-title text-left">
            <div className="box-image">
              <img className="mr-2" src={scheduledIcon} alt="scheduled-icon" />{" "}
            </div>
            <div className="title-count">
              <div className="count-task">Scheduled</div>
              <span className="text-count"> 0</span>
            </div>
          </div>
        </div>
      </div>
      <div className="all-companies-title">
        All Companies <img src={sidebarDownArrow} alt="sidebar Down Arrow" />
      </div>
      <div className="companies-sub-title">Tasks</div>
      <div className="task-details-file-grid">
        <div className="file-title">List</div>
        <div className="file-title-progress"></div>
      </div>
      <div className="Overdue-grid">
  
      </div>
      <div className="take-action">
        <div className="task-list-grid">
          <div className="">
            <div className="action-title">Take Action</div>
          </div>
          <div className="row">
            <div className="col-5">
              <div className="all-companies-sub-title">
                <img
                  src={isMarked ? completeTaskIcon : sidebarCheckIcon}
                  alt="sidebar Check Icon"
                  onClick={() => setIsMarked(!isMarked)}
                />
                <span className="all-companies-nse-label">MCX</span>{" "}
                <span onClick={() => setShowDescription(true)}>
                  Monthy Statement of Accounts
                </span>
              </div>
            </div>
            <div className="col-3" onClick={() => setShowDescription(true)}>
              <div className="circle-front-text">Test Company</div>
            </div>
            <div
              className="col-2"
              onClick={() => setShowDescription(true)}
              style={{ cursor: "pointer" }}
            >
              <span class="badge badge-primary">In-progress</span>
            </div>
            <div
              className="col-2"
              onClick={() => setShowDescription(true)}
              style={{ cursor: "pointer" }}
            >
              <div className="align-right">
                <div className="d-flex">
                  <div className="black-day">20 April</div>
                  <div className="right-arrow-week text-right-grid">
                    <img src={keyboardArrowRightBlack} alt="Right Arrow" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="task-list-grid">
          <div className="row">
            <div className="col-5">
              <div className="all-companies-sub-title">
                <img
                  src={sidebarCheckIcon}
                  alt="sidebar Check Icon"
                />
                <span className="all-companies-nse-label">MCX</span>{" "}
                <span onClick={() => setShowDescription(true)}>
                  Anuual Compliace Report
                </span>
              </div>
            </div>
            <div className="col-3" onClick={() => setShowDescription(true)}>
              <div className="circle-front-text">Test Company</div>
            </div>
            <div
              className="col-2"
              onClick={() => setShowDescription(true)}
              style={{ cursor: "pointer" }}
            >
              <span class="badge badge-primary">Inprogress</span>
            </div>
            <div
              className="col-2"
              onClick={() => setShowDescription(true)}
              style={{ cursor: "pointer" }}
            >
              <div className="align-right">
                <div className="d-flex">
                  <div className="black-day">20 April</div>
                  <div className="right-arrow-week text-right-grid">
                    <img src={keyboardArrowRightBlack} alt="Right Arrow" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="upcoming-grid">
        <div className="upcoming-btn">
          <div className="upcoming-title">
            Upcoming
            <span className="black-circle">
              <p className="black-circle-text">0</p>
            </span>
            <img src={downArrow} className="arrowDown" alt="Arrow down" />
          </div>
        </div>
      </div>
      <div className="complete-grid">
        <div className="upcoming-btn">
          <div className="complete-title">
            Completed
            <span className="green-circle">
              <p className="green-circle-text">0</p>
            </span>
            <img src={downArrow} className="arrowDown" alt="Arrow down" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightSideGrid;
