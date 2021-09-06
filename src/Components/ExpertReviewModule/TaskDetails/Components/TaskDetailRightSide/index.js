import React, { useState, Suspense, lazy, useEffect, useCallback } from "react";
import "./style.css";
import migrateFileIcon from "../../../../../assets/Icons/migrate-file.svg";
import Loading from "../../../../../CommonModules/sharedComponents/Loader";
import TaskMigrationModal from "../TaskMigrationModal";
import RejectTaskModal from "../TaskActions/RejectTaskModal";
import TaskStatusBox from "../../../../../CommonModules/sharedComponents/TaskStatusBox";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { MdClose } from "react-icons/md";
import { actions as taskReportActions } from "../../../../OnBording/SubModules/DashBoardCO/redux/actions";
const AttachedFileSection = lazy(() => import("../TaskActions/AttachedFile"));
const CommentSection = lazy(() => import("../TaskActions/Comments"));
const ReferencesSection = lazy(() => import("../TaskActions/References"));
const TaskDetailRightSide = React.memo(({ closeTaskDetails }) => {
  const [taskActionsDisplay, setTaskActionsDisplay] = useState(1);
  const [isTaskMigrationOpen, setIsTaskMigrationOpen] = useState(false);
  const [headerHeight, setHeaderHight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);
  const [isRejectTaskOpen, setIsRejectTaskOpen] = useState(false);
  const [taskDetails, setTaskDetails] = useState({});
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const taskData = state?.taskReport?.taskReportById?.taskReportById;
  const userDetails = state && state.auth && state.auth.loginInfo;
  console.log(userDetails);
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
  }, [taskDetails]);
  useEffect(() => {
    if (taskData !== undefined && Object.keys(taskData).length !== 0) {
      setTaskDetails(taskData);
    }
  }, [taskData]);

  const handleApproveTask = (taskId) => {
    dispatch(
      taskReportActions.taskAssignByTaskID({
        taskID: taskId,
        isApproved: 1,
        userType: 1,
        email: "",
        invitee: "",
        loginID: userDetails.UserID,
        userDetails,
        LicenseCode: taskDetails.LicenseCode,
        EntityName: taskDetails.EntityName,
      })
    );
  };
  return (
    <>
      <TaskMigrationModal
        isOpen={isTaskMigrationOpen}
        setIsOpen={setIsTaskMigrationOpen}
        taskId={taskDetails.TaskId}
      />
      <RejectTaskModal
        isOpen={isRejectTaskOpen}
        setIsOpen={setIsRejectTaskOpen}
        taskId={taskDetails.TaskId}
        licenseCode={taskDetails.LicenseCode}
        entityName={taskDetails.EntityName}
      />
      <div className="task-data__container position-relative">
        <span className="task-data__close" onClick={closeTaskDetails}>
          <MdClose />
        </span>
        <div className="task-data__header">
          <div className="position-relative">
            <span className="task-data__header--license-title">
              {taskDetails.LicenseCode}
            </span>
            <div className="d-flex align-items-md-center mb-4 flex-column flex-md-row align-items-start">
              <p className="mb-0 task-data__header--title">
                {taskDetails.TaskName}
              </p>
              <span className="task-data__header--entity-name ml-0 ml-md-3 mt-2 mt-md-0">
                {taskDetails.EntityName}
              </span>
            </div>
            <div className="position-absolute d-flex task-data__header-status">
              <TaskStatusBox
                status={
                  taskDetails.AprStatus === "Not Started"
                    ? "pending"
                    : taskDetails.AprStatus === "Approved by Approver"
                    ? "approved"
                    : taskDetails.AprStatus === "Rejected by Approver"
                    ? "rejected"
                    : "pending"
                }
              >
                {taskDetails.AprStatus}
              </TaskStatusBox>
              <TaskStatusBox
                status={
                  taskDetails.ExStatus === "Not Started"
                    ? "pending"
                    : taskDetails.ExStatus === "Approved by Expert"
                    ? "approved"
                    : taskDetails.ExStatus === "Rejected by Expert"
                    ? "rejected"
                    : "pending"
                }
              >
                {taskDetails.ExStatus}
              </TaskStatusBox>
            </div>
          </div>
        </div>
        <div
          className="task-data__main"
          style={{
            height: `${
              window.innerHeight - headerHeight - footerHeight - 80
            }px`,
          }}
        >
          <div className="row my-4 task-data-fields">
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
                <p className="task-data__field-value">
                  {taskDetails.AssignedFromUserName}
                </p>
              </div>
            </div>
            <div className="w-100 d-flex">
              <div className="col-6 col-md-5">
                <p className="task-data__field-key">Due Date</p>
              </div>
              <div className="col-6">
                <p className="task-data__field-value">
                  {moment(taskDetails.EndDate).format("DD MMM, YYYY")}
                </p>
              </div>
            </div>
            <div className="w-100 d-flex">
              <div className="col-6 col-md-5">
                <p className="task-data__field-key">Status</p>
              </div>
              <div className="col-6">
                <p className="task-data__field-value">{taskDetails.Status}</p>
              </div>
            </div>
            <div className="w-100 d-flex">
              <div className="col-6 col-md-5">
                <p className="task-data__field-key">Approver's Review Status</p>
              </div>
              <div className="col-6 d-flex align-items-center">
                {/* <img src={insertFileIcon} alt="file icon" /> */}
                <p className="task-data__field-value">
                  {taskDetails.AprStatus}
                </p>
              </div>
            </div>
            {taskDetails && taskDetails.ApproverName !== "Assign" && (
              <div className="w-100 d-flex">
                <div className="col-6 col-md-5">
                  <p className="task-data__field-key">Contact Details</p>
                </div>
                <div className="col-6">
                  <p className="task-data__field-value">
                    {`${taskDetails.ApproverMobile} | ${taskDetails.ApproverName}`}
                  </p>
                </div>
              </div>
            )}
            <div className="col-12 my-2">
              <button
                className="task-data__migrate-file-button mx-0 d-flex align-items-end"
                onClick={() => setIsTaskMigrationOpen(true)}
              >
                <img src={migrateFileIcon} alt="icon" />
                migrate this task
              </button>
            </div>
          </div>
          <div className="task-data__actions">
            <div className="task-data__action-top mb-2 d-flex align-items-center">
              <div
                className={`task-data__action-top--item ${
                  taskActionsDisplay === 1 &&
                  "task-data__action-top--item-active"
                }`}
                onClick={useCallback(
                  () => setTaskActionsDisplay(1),
                  [taskActionsDisplay]
                )}
              >
                <span className="action-top__item-title">Attched Files</span>
                <div className="action-top__item-count">
                  <span>{taskDetails.NormalattachCount || 0}</span>
                </div>
              </div>
              <div
                className={`task-data__action-top--item mx-3 ${
                  taskActionsDisplay === 2 &&
                  "task-data__action-top--item-active"
                }`}
                onClick={useCallback(
                  () => setTaskActionsDisplay(2),
                  [taskActionsDisplay]
                )}
              >
                <span className="action-top__item-title">Comments</span>
                <div className="action-top__item-count">
                  <span>{taskDetails.NormalCommentCount || 0}</span>
                </div>
              </div>
              <div
                className={`task-data__action-top--item ${
                  taskActionsDisplay === 3 &&
                  "task-data__action-top--item-active"
                }`}
                onClick={useCallback(
                  () => setTaskActionsDisplay(3),
                  [taskActionsDisplay]
                )}
              >
                <span className="action-top__item-title">References</span>
                <div className="action-top__item-count">
                  <span>
                    {taskDetails.LinkCommentCount +
                      taskDetails.RefattachCount || 0}
                  </span>
                </div>
              </div>
            </div>
            {taskActionsDisplay === 1 && (
              <Suspense fallback={<Loading isInline isSmall />}>
                <AttachedFileSection taskId={taskDetails.TaskId} />
              </Suspense>
            )}
            {taskActionsDisplay === 2 && (
              <Suspense fallback={<Loading isInline isSmall />}>
                <CommentSection taskId={taskDetails.TaskId} />
              </Suspense>
            )}
            {taskActionsDisplay === 3 && (
              <Suspense fallback={<Loading isInline isSmall />}>
                <ReferencesSection taskId={taskDetails.TaskId} />
              </Suspense>
            )}
          </div>
        </div>
        {!(
          taskDetails.Status === "Approved" ||
          taskDetails.Status === "Request Rejected"
        ) && (
          <div className="task-action__cta-container mt-3">
            <button
              onClick={() => handleApproveTask(taskDetails.TaskId)}
              className="task-action__cta task-action__cta--green mr-3"
            >
              Approve Task
            </button>
            <button
              className="task-action__cta task-action__cta--red"
              onClick={() => setIsRejectTaskOpen(true)}
            >
              Reject Task
            </button>
          </div>
        )}
      </div>
    </>
  );
});

export default TaskDetailRightSide;
