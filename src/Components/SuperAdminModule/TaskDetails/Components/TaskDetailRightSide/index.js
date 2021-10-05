import React, { useState, Suspense, lazy } from "react";
import "./style.css";
import { useEffect } from "react";
import migrateFileIcon from "../../../../../assets/Icons/migrate-file.svg";
import insertFileIcon from "../../../../../assets/Icons/insert-file.svg";
import Loading from "../../../../../CommonModules/sharedComponents/Loader";
const AttachedFileSection = lazy(() => import("../TaskActions/AttachedFile"));
const CommentSection = lazy(() => import("../TaskActions/Comments"));
const ReferencesSection = lazy(() => import("../TaskActions/References"));
const TaskDetailRightSide = ({ taskData }) => {
  const [taskActionsDisplay, setTaskActionsDisplay] = useState(1);
  const [headerHeight, setHeaderHight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);
  useEffect(() => {
    const headerRef = document
      .querySelector(".task-data__header")
      .getClientRects()[0].height;
    const footerRef =
      (document.querySelector(".task-action__cta-container") &&
        document
          .querySelector(".task-action__cta-container")
          .getClientRects()[0].height) ||
      0;
    setHeaderHight(Math.trunc(headerRef));
    setFooterHeight(Math.trunc(footerRef));
  }, [taskData]);
  return (
    <div className="task-data__container position-relative">
      <div className="task-data__header">
        <div className="position-relative">
          <span className="task-data__header--license-title">
            {taskData.LicenseCode}
          </span>
          <div className="d-flex align-items-md-center mb-4 flex-column flex-md-row align-items-start">
            <p className="mb-0 task-data__header--title">{taskData.TaskName}</p>
            <span className="task-data__header--entity-name ml-0 ml-md-3 mt-2 mt-md-0">
              {taskData.EntityName}
            </span>
          </div>
          <p className="task-data__header--status-text">
            {/* {taskData.Status === "Assign" && "Assign Task"} */}
            Assign Task
          </p>
        </div>
      </div>
      <div
        className="task-data__main"
        style={{
          height: `${window.innerHeight - headerHeight - footerHeight - 80}px`,
        }}
      >
        <div className="row my-4 task-data-fields">
          <div className="w-100 d-flex">
            <div className="col-6 col-md-5">
              <p className="task-data__field-key">Task Received On</p>
            </div>
            <div className="col-6">
              <p className="task-data__field-value">08 May, 03:56pm</p>
            </div>
          </div>
          <div className="w-100 d-flex">
            <div className="col-6 col-md-5">
              <p className="task-data__field-key">Submission Status</p>
            </div>
            <div className="col-6">
              <p className="task-data__field-value">
                Delayed submission by client (3 days)
              </p>
            </div>
          </div>
          <div className="w-100 d-flex">
            <div className="col-6 col-md-5">
              <p className="task-data__field-key">Task Submitted By</p>
            </div>
            <div className="col-6">
              <p className="task-data__field-value">Ashu Kumar</p>
            </div>
          </div>
          <div className="w-100 d-flex">
            <div className="col-6 col-md-5">
              <p className="task-data__field-key">Compliance Officer</p>
            </div>
            <div className="col-6">
              <p className="task-data__field-value">Manoj Bajpay</p>
            </div>
          </div>
          <div className="w-100 d-flex">
            <div className="col-6 col-md-5">
              <p className="task-data__field-key">Due Date</p>
            </div>
            <div className="col-6">
              <p className="task-data__field-value">30 May, 2021</p>
            </div>
          </div>
          <div className="w-100 d-flex">
            <div className="col-6 col-md-5">
              <p className="task-data__field-key">Status</p>
            </div>
            <div className="col-6">
              <p className="task-data__field-value">Review Pending</p>
            </div>
          </div>
          <div className="w-100 d-flex">
            <div className="col-6 col-md-5">
              <p className="task-data__field-key">Approver's Reviews Status</p>
            </div>
            <div className="col-6 d-flex align-items-center">
              <img src={insertFileIcon} alt="file icon" />
              <p className="task-data__field-value">
                Task Approved on Mar 08, 2021
              </p>
            </div>
          </div>
          <div className="w-100 d-flex">
            <div className="col-6 col-md-5">
              <p className="task-data__field-key">Contact Details</p>
            </div>
            <div className="col-6">
              <p className="task-data__field-value">
                +919971226214 | Ashu Kumar
              </p>
            </div>
          </div>
          <div className="col-12 my-2">
            <button className="task-data__migrate-file-button mx-0 d-flex align-items-end">
              <img src={migrateFileIcon} alt="icon" />
              migrate this task
            </button>
          </div>
        </div>
        <div className="task-data__actions">
          <div className="task-data__action-top mb-2 d-flex align-items-center">
            <div
              className={`task-data__action-top--item ${
                taskActionsDisplay === 1 && "task-data__action-top--item-active"
              }`}
              onClick={() => setTaskActionsDisplay(1)}
            >
              <span className="action-top__item-title">Attched Files</span>
              <div className="action-top__item-count">
                <span>2</span>
              </div>
            </div>
            <div
              className={`task-data__action-top--item mx-3 ${
                taskActionsDisplay === 2 && "task-data__action-top--item-active"
              }`}
              onClick={() => setTaskActionsDisplay(2)}
            >
              <span className="action-top__item-title">Comments</span>
              <div className="action-top__item-count">
                <span>1</span>
              </div>
            </div>
            <div
              className={`task-data__action-top--item ${
                taskActionsDisplay === 3 && "task-data__action-top--item-active"
              }`}
              onClick={() => setTaskActionsDisplay(3)}
            >
              <span className="action-top__item-title">References</span>
              <div className="action-top__item-count">
                <span>3</span>
              </div>
            </div>
          </div>
          {taskActionsDisplay === 1 && (
            <Suspense fallback={<Loading isInline isSmall />}>
              <AttachedFileSection />
            </Suspense>
          )}
          {taskActionsDisplay === 2 && (
            <Suspense fallback={<Loading isInline isSmall />}>
              <CommentSection />
            </Suspense>
          )}
          {taskActionsDisplay === 3 && (
            <Suspense fallback={<Loading isInline isSmall />}>
              <ReferencesSection />
            </Suspense>
          )}
        </div>
      </div>
      <div className="task-action__cta-container mt-3">
        <button className="task-action__cta task-action__cta--green mr-3">
          Approve Task
        </button>
        <button className="task-action__cta task-action__cta--red">
          Reject Task
        </button>
      </div>
    </div>
  );
};

export default TaskDetailRightSide;
