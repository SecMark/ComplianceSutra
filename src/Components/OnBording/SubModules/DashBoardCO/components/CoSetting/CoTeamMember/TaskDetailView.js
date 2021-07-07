import React, { useState } from "react";
import "./style.css";
import closeBlack from "../../../../../../assets/Icons/closeBlack.png";
import fileIcon from "../../../../../../assets/Icons/fileIcon.png";
import keyboardArrowRightBlack from "../../../../../../assets/Icons/keyboardArrowRightBlack.png";
import downArrow from "../../../../../../assets/Icons/downArrow.png";
import sidebarCheckIcon from "../../../../../../assets/Icons/sidebarCheckIcon.png";
import completeTaskIcon from "../../../../../../assets/Icons/emailVerify.png";
import { toast } from "react-toastify";
import moment from "moment";
import { useEffect } from "react";

function TaskDetailsView({
  isTaskListOpen,
  setIsTaskListOpen,
  isTaskApproved,
  setIsTaskApproved,
  taskList,
  companyName,
}) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [completedTaskList, setCompletedTaskList] = useState([]);
  const [completedDate, setCompletedDate] = useState("");

  const getInitials = (name) => {
    const nameArray = name.split(" ");
    if (nameArray.length > 1) {
      return `${nameArray[0].slice(0, 1)} ${nameArray[
        nameArray.length - 1
      ].slice(0, 1)}`;
    } else {
      return `${nameArray[0].slice(0, 1)}`;
    }
  };
  console.log(selectedTask);
  useEffect(() => {
    console.log(selectedTask);
  }, [selecte]);
  return (
    <>
      {isTaskListOpen && (
        <div className="task-details-veiw">
          <div className="task-details-header">
            <div className="closing-icon">
              <div className="task-details-title">
                {companyName && companyName}
              </div>
              <div
                className="task-close-icon"
                onClick={() => setIsTaskListOpen(false)}
              >
                <img src={closeBlack} alt="Arrow close" />
              </div>
            </div>
            <div className="task-details-sub-title">
              {selectedTask && selectedTask.taskName}{" "}
              <span className="nse-label">
                {selectedTask && selectedTask.licenseCode}
              </span>
            </div>
            <div className="border-header">
              <div
                className="approved-label"
                style={{ backgroundColor: isTaskApproved && "#d2fccd" }}
              >
                <div
                  className="approved-text"
                  style={{ color: isTaskApproved && "#7fba7a" }}
                >
                  {isTaskApproved ? "Approved" : "Approval PENDING"}
                </div>
              </div>
            </div>
            <div className="task-detail-data">
              <div className="row">
                <div className="col-3">
                  <div className="holding-list-normal-title">Assigned to</div>
                </div>
                <div className="col-9">
                  <div className="holding-list-bold-title">
                    <span className="cicrcle-name">
                      {getInitials(selectedTask && selectedTask.userName)}
                    </span>
                    {selectedTask && selectedTask.userName}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <div className="holding-list-normal-title">Due Date</div>
                </div>
                <div className="col-9">
                  <div className="holding-list-bold-title">
                    {moment(selectedTask.endDate)
                      .subtract(5, "days")
                      .format("DD MMM")}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <div className="holding-list-normal-title">Deadline</div>
                </div>
                <div className="col-9">
                  <div className="holding-list-bold-title">
                    {moment(selectedTask.endDate).format("DD MMM")}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <div className="holding-list-normal-title">Status</div>
                </div>
                <div className="col-9">
                  <div className="holding-list-bold-title">
                    {isTaskApproved ? "Approved" : "Approval PENDING"}
                  </div>
                </div>
              </div>
              {completedDate && isTaskApproved && (
                <div className="row">
                  <div className="col-3">
                    <div className="holding-list-normal-title">
                      Completed on
                    </div>
                  </div>
                  <div className="col-9">
                    <div className="holding-list-bold-title">
                      {moment(completedDate).format("DD MMM  h:mm a")}
                    </div>
                  </div>
                </div>
              )}
              <div className="row">
                <div className="col-3">
                  <div className="holding-list-normal-title">License</div>
                </div>
                <div className="col-9">
                  <div className="holding-list-bold-title">
                    {selectedTask && selectedTask.licenseCode}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <div className="holding-list-normal-title">Company</div>
                </div>
                <div className="col-9">
                  <div className="holding-list-bold-title">
                    {companyName && companyName}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="task-details-file-grid">
            <div className="file-title">Files</div>
            <div className="file-title-progress"></div>
          </div>
          <div className="file-grid-data">
            <div className="row">
              <div className="col-4">
                <div className="file-upload-title">
                  <img src={fileIcon} alt="file Icon" /> Holding Statement
                  pt1.pdf
                </div>
              </div>
              <div className="col-8">
                <div className="file-download-title">download</div>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <div className="file-upload-title">
                  <img src={fileIcon} alt="file Icon" /> Holding Statement
                  pt2.pdf
                </div>
              </div>
              <div className="col-8">
                <div className="file-download-title">download</div>
              </div>
            </div>
            {!isTaskApproved && (
              <div class="btn-toolbar text-center well">
                <div class="col-2 text-left pl-0">
                  <button className="btn save-details-bnt reject-task">
                    reject Task
                  </button>
                </div>
                <div class="col-2 text-left">
                  <button
                    onClick={() => {
                      setCompletedDate(new Date());
                      setIsTaskApproved(true);
                      toast.success("Task Approved");
                    }}
                    className="btn save-details-bnt approve-task"
                  >
                    approve task
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default TaskDetailsView;
