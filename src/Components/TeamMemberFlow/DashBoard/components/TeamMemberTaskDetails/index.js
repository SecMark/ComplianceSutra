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
        {/* <div className="task-list-grid">
          <div className="">
            <div className="red-title">Overdue</div>
          </div>
          <div className="row">
            <div className="col-5">
              <div className="all-companies-sub-title">
                <img src={sidebarCheckIcon} alt="sidebar Check Icon" />
                <span className="all-companies-nse-label">NSE</span> Uploading
                of Holding Statement
              </div>
            </div>
            <div className="col-3">
              <div className="circle-front-text">B&K Trading</div>
            </div>
            <div className="col-2"></div>
            <div className="col-2">
              <div className="align-right">
                <div className="d-flex">
                  <div className="red-week">6 Mar</div>
                  <div className="right-arrow-week text-right-grid">
                    <img src={keyboardArrowRightBlack} alt="Right Arrow" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
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
                  // onClick={() => setIsMarked(!isMarked)}
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
        {/* <div className="task-list-grid">
          <div className="row" onClick={() => setShowDescription(true)}>
            <div className="col-5">
              <div className="all-companies-sub-title">
                <img src={sidebarCheckIcon} alt="sidebar Check Icon" />
                <span className="all-companies-nse-label">NSE</span> Concurrent
                Audit Report
              </div>
            </div>
            <div className="col-3">
              <div className="circle-front-text">B&K Securities</div>
            </div>
            <div className="col-2">
              <span class="badge badge-primary">Possible Delay</span>
            </div>
            <div className="col-2">
              <div className="align-right">
                <div className="d-flex">
                  <div className="black-day">08 Mar</div>
                  <div className="right-arrow-week text-right-grid">
                    <img src={keyboardArrowRightBlack} alt="Right Arrow" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* <div className="task-list-grid">
          <div className="row">
            <div className="col-5">
              <div className="all-companies-sub-title">
                <img src={sidebarCheckIcon} alt="sidebar Check Icon" />
                <span className="all-companies-nse-label">NSE</span> Client
                Funding Report
              </div>
            </div>
            <div className="col-3">
              <div className="circle-front-text">B&K Trading</div>
            </div>
            <div className="col-2">
              <span class="badge badge-blue">Possible Delay</span>
            </div>
            <div className="col-2">
              <div className="align-right">
                <div className="d-flex">
                  <div className="black-day">28 Mar</div>
                  <div className="right-arrow-week text-right-grid">
                    <img src={keyboardArrowRightBlack} alt="Right Arrow" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* <div className="task-list-grid">
          <div className="row">
            <div className="col-5">
              <div className="all-companies-sub-title">
                <img src={sidebarCheckIcon} alt="sidebar Check Icon" />
                <span className="all-companies-nse-label">NSE</span> Investor
                Grievance Report
              </div>
            </div>
            <div className="col-3">
              <div className="circle-front-text">B&K Securities</div>
            </div>
            <div className="col-2">
              <span class="badge badge-blue">Possible Delay</span>
            </div>
            <div className="col-2">
              <div className="align-right">
                <div className="d-flex">
                  <div className="black-day">31 Mar</div>
                  <div className="right-arrow-week text-right-grid">
                    <img src={keyboardArrowRightBlack} alt="Right Arrow" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
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
    // <div className="task-details-veiw">
    //     <div className="task-details-header">
    //        <div className="closing-icon">
    //             <div className="task-details-title">B&K Securities</div>
    //             <div className="task-close-icon"><img src={closeBlack} alt="Arrow close" /></div>
    //         </div>
    //         <div className="task-details-sub-title">Uploading of Holding Statement <span className="nse-label">NSE</span></div>
    //         <div className="border-header">
    //             <div className="approved-label">
    //                 <div className="approved-text">Approval PENDING</div>
    //             </div>
    //         </div>
    //         <div className="task-detail-data">
    //             <div className="row">
    //                 <div className="col-3">
    //                     <div className="holding-list-normal-title">Assigned to</div>
    //                 </div>
    //                 <div className="col-9">
    //                     <div className="holding-list-bold-title"><span className="cicrcle-name">PJ</span>Priyal Jain</div>
    //                 </div>
    //             </div>
    //             <div className="row">
    //                 <div className="col-3">
    //                     <div className="holding-list-normal-title">Due Date</div>
    //                 </div>
    //                 <div className="col-9">
    //                     <div className="holding-list-bold-title">11 Mar</div>
    //                 </div>
    //             </div>
    //             <div className="row">
    //                 <div className="col-3">
    //                     <div className="holding-list-normal-title">Deadline</div>
    //                 </div>
    //                 <div className="col-9">
    //                     <div className="holding-list-bold-title">13 Mar</div>
    //                 </div>
    //             </div>
    //             <div className="row">
    //                 <div className="col-3">
    //                     <div className="holding-list-normal-title">Status</div>
    //                 </div>
    //                 <div className="col-9">
    //                     <div className="holding-list-bold-title">Approval Pending</div>
    //                 </div>
    //             </div>
    //             <div className="row">
    //                 <div className="col-3">
    //                     <div className="holding-list-normal-title">Completed on</div>
    //                 </div>
    //                 <div className="col-9">
    //                     <div className="holding-list-bold-title">08 Mar, 03:56 pm</div>
    //                 </div>
    //             </div>
    //             <div className="row">
    //                 <div className="col-3">
    //                     <div className="holding-list-normal-title">License</div>
    //                 </div>
    //                 <div className="col-9">
    //                     <div className="holding-list-bold-title">NSE</div>
    //                 </div>
    //             </div>
    //             <div className="row">
    //                 <div className="col-3">
    //                     <div className="holding-list-normal-title">Company</div>
    //                 </div>
    //                 <div className="col-9">
    //                     <div className="holding-list-bold-title">B&K Securities</div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    //     <div className="task-details-file-grid">
    //         <div className="file-title">Files</div>
    //         <div className="file-title-progress"></div>

    //     </div>
    //     <div className="file-grid-data">
    //             <div className="row">
    //                 <div className="col-4">
    //                     <div className="file-upload-title"><img src={fileIcon} alt="file Icon" /> Holding Statement pt1.pdf</div>
    //                 </div>
    //                 <div className="col-8">
    //                     <div className="file-download-title">download</div>
    //                 </div>
    //             </div>
    //             <div className="row">
    //                 <div className="col-4">
    //                     <div className="file-upload-title"><img src={fileIcon} alt="file Icon" /> Holding Statement pt1.pdf</div>
    //                 </div>
    //                 <div className="col-8">
    //                     <div className="file-download-title">download</div>
    //                 </div>
    //             </div>
    //             <div class="btn-toolbar text-center well">
    //                 <div class="col-3 text-left pl-0">
    //                     <button className="btn save-details reject-task">reject Task</button>
    //                 </div>
    //                 <div class="col-3 text-left">
    //                     <button className="btn save-details approve-task">approve task</button>
    //                 </div>
    //             </div>
    //         </div>
    // </div>
  );
}

export default RightSideGrid;
