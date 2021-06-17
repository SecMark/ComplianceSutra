import React from "react";
import { toast } from "react-toastify";

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
import fileUploadIcon from "../../../../../assets/Icons/fileUploadIcon.png";

function FileUpload({ setShowDescription, setIsMarked, isMarked }) {
  return (
    <div className="file-upload-view">
      <div className="task-details-header">
        <div className="closing-icon">
          <div className="file-upload-title-top">Test Company</div>
          <div
            className="file-upload-close-icon"
            onClick={() => setShowDescription(false)}
          >
            <img src={closeBlack} alt="Arrow close" />
          </div>
        </div>
        <div className="file-upload-sub-title">
        Monthy Statement of Accounts <span className="nse-label">MCX</span>
        </div>
        <div className="file-upload-border-header">
          <div className="file-approved-label">
            <div className="file-approved-text">In-progress</div>
          </div>
        </div>
        <div className="today-detail-data">
          <div className="row">
            <div className="col-3">
              <div className="today-list-normal-title">Assigned By</div>
            </div>
            <div className="col-9">
              <div className="today-list-bold-title">
                <span className="cicrcle-name">NB</span>Nihar Bhusari
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <div className="today-list-normal-title">Due Date</div>
            </div>
            <div className="col-9">
              <div className="today-list-bold-title">20 Apr</div>
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <div className="today-list-normal-title">License</div>
            </div>
            <div className="col-9">
              <div className="today-list-bold-title">MCX</div>
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <div className="today-list-normal-title">Company</div>
            </div>
            <div className="col-9">
              <div className="today-list-bold-title">Test Company</div>
            </div>
          </div>
        </div>
      </div>
      <div className="file-upload-file-grid">
        <div className="file-upload-title-file">Files</div>
        <div className="file-upload-title-progress"></div>
      </div>
      <div className="file-grid-data">
        <div className="">
          <div className="file-upload-box">
            <div className="image-display">
              <img src={fileUploadIcon} alt="File Upload icon" />
              <div className="drag-drop-title text-center">
                Drag and drop your files here or
              </div>
              <div className="file-upload-blue">
                upload files
              </div>
            </div>
          </div>
        </div>
        {/* <div className="upload-complited mt-4">
                        <div className="report-text">Client Funding Report.pdf</div>
                        <div className="upload-date">11 Mar, 02:54pm</div>
                        <div className="file-upload-title-text">upload files</div>
                    </div> */}
      </div>
      <div class="bottom-logo-strip-dashboard-btn">
        <div class="col-3 text-left pl-0">
          <button
            className="btn mark-complete"
            onClick={() => {
              setIsMarked(true);
              toast.success("Marked Successfully");
            }}
          >
            {isMarked && (
              <div className="check-mark">Hi</div>
            )}
            {!isMarked ? "Mark Complete" : "Completed"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
