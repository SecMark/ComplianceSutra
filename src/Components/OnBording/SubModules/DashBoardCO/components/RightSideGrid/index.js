import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import { Modal } from "react-responsive-modal";
import closeBlack from "../../../../../../assets/Icons/closeBlack.png";
import fileIcon from "../../../../../../assets/Icons/fileIcon.png";
import sideBarlogo from "../../../../../../assets/Icons/sideBarlogo.png";
import togglemobile from "../../../../../../assets/Icons/togglemobile.png";
import closeIcon1 from "../../../../../../assets/Icons/closeIcon1.png";
import keyboardArrowRightBlack from "../../../../../../assets/Icons/keyboardArrowRightBlack.png";
import downArrow from "../../../../../../assets/Icons/downArrow.png";
import inputRightArrow from "../../../../../../assets/Icons/inputRightArrow.png";
import redArrowTop from "../../../../../../assets/Icons/redArrowTop.png";
import complteTaskIcon from "../../../../../../assets/Icons/complteTaskIcon.png";
import scheduledIcon from "../../../../../../assets/Icons/scheduledIcon.png";
import dropdownBottomArrow from "../../../../../../assets/Icons/dropdownBottomArrow.png";
import dropdownCheckIcon from "../../../../../../assets/Icons/dropdownCheckIcon.png";
import upArrow from "../../../../../../assets/Icons/topArrowAccordian.png";
import RedLine from "../../../../../../assets/Icons/RedLine.png";
import { isMobile } from "react-device-detect";
import assignIconCircle from "../../../../../../assets/Icons/assignIconCircle.png";
import plusIcon from "../../../../../../assets/Icons/plusIcon3.png";
import redCircle from "../../../../../../assets/Icons/redCircle.png";
import viewAllArow from "../../../../../../assets/Icons/viewAllArow.png";
import viewAllArowTop from "../../../../../../assets/Icons/viewAllArowTop.png";
import closeIconGray from "../../../../../../assets/Icons/closeIconGray.png";
import searchIcon from "../../../../../../assets/Icons/searchIcon.png";
import fileUploadIcon from "../../../../../../assets/Icons/fileUploadIcon.png";
import { toast } from "react-toastify";
import moment from "moment";
import Dropzone from "react-dropzone";
import { useOuterClick } from "./outerClick.js";
import { useDropdownOuterClick } from "./dropdownOuterClick.js";
import TaskDetailsView from "./TaskDetailView";
import { BACKEND_BASE_URL } from "../../../../../../apiServices/baseurl";
import { useSelector, useDispatch } from "react-redux";
import { actions as taskReportActions } from "../../redux/actions";
import MobileLeftSidebar from "../MobileLeftSidebar";
import axios, { post } from "axios";
import { withRouter } from "react-router-dom";
import deleteBlack from "../../../../../../assets/Icons/deleteBlack.png";
import CompanyTaskList from "../DashBoardView/component/companyList";
import LicenseTaskList from "../DashBoardView/component/LicenseTaskList.js";
import AssigneList from "../DashBoardView/component/AssignedView.js";
import BoardView from "../BoardView/index";
import { actions as notificationActions } from "../notification/Redux/actions.js";
import { actions as adminMenuActions } from "../../MenuRedux/actions";
import View from "../../../../../CalenderView/View";

import TextareaAutosize from "react-textarea-autosize";
import ReAssignTasksModal from "../../../../../ReAssignTasks";
import {
  getDataByStatus,
  getAllTasks,
} from "../../../../../../CommonModules/helpers/tasks.helper";
import axiosInstance from "../../../../../../apiServices";
function RightSideGrid({
  isTaskListOpen,
  setIsTaskListOpen,
  isTaskApproved,
  setIsTaskApproved,
  companyName,
  user,
  history,
  NotificationRedu,
}) {
  let dropDownArr = [
    {
      viewBy: "By Status",
      name: "status",
    },
    {
      viewBy: "By Company",
      name: "company",
    },
    {
      viewBy: "By License",
      name: "license",
    },
    {
      viewBy: "Team",
      name: "team-member",
    },
  ];
  const searchInput = useRef(null);
  const [currentOpenedTask, setCurrentOpenedTask] = useState({});
  const [openBoardDrD, setOpenBoardDrp] = useState(false);
  const [currentBoardViewBy, setCurrentBoardViewBy] = useState("status");
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [completedDate, setCompletedDate] = useState("");

  const [showFiles, setShowFiles] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [showHtoDoIt, setShowHtoDoIt] = useState(false);
  const [referenceShow, setShowReference] = useState(false);

  const [approverDropDown, setApproverDropDown] = useState("");
  const [inputComment, setInputComment] = useState("");
  const [rejectTaskInput, setRejectTaskInputComment] = useState("");
  const [uploadFile, setUploadFile] = useState();
  const [visibleRejectTaskModal, setVisibleRejectTaskModal] = useState(false);

  const [referenceSectionData, setReferenceSectionData] = useState([]);
  const [recentRegulationData, setRecentRegulationData] = useState([]);

  const [allUser, setAllUser] = useState([]);
  const [allUserBackup, setAllUserBackup] = useState([]);

  const [selectedUser, setSelectedUser] = useState("");

  const [allTaskList, setAllTaskList] = useState([]);
  const [currentDropDown, setCurrentDropDown] = useState("");
  const [fileList, setFileList] = useState([]);
  const [searchBoxShow, setsearchBoxShow] = useState(false);

  const [searchBoxShowMobile, setsearchBoxShowMobile] = useState(false);
  const [navigationHideShow, setNavigationHideShow] = useState(false);
  const [taskData, setTaskData] = useState([]);
  const [listTaskData, setListTaskData] = useState("");
  const [taskDataBackup, setTaskDataBackup] = useState([]);
  const [expandedFlags, setExpandedFlags] = useState([0, 1, 2]);
  const [rowCount, setRowCount] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [showUserToolTip, setShowUserToolTip] = useState("");
  const [today, setToday] = useState(new Date());
  const [emailAvaliableCheck, setEmailAvaliableCheck] = useState(false);
  const [taskListDisplay, setTaskListDisplay] = useState("1");
  const [displayTask, setDisplayTask] = useState("1");
  const [validEmail, setValidEmail] = useState(true);
  const [mobileViewBy, setMobileViewBy] = useState(false);
  const [completedTask, setCompletedTask] = useState("0");
  const [scheduledTask, setScheduledTask] = useState("0");
  const [noRecords, setNoRecords] = useState(false);
  const [
    isShowReAssignModalForTeamMember,
    setIsShowReAssignModalForTeamMember,
  ] = useState(false);
  const [isShowReAssignModalForApprover, setIsShowReAssignModalForApprover] =
    useState(false);
  const taskModalOpenStatus =
    state &&
    state.adminMenu &&
    state.adminMenu &&
    state.adminMenu.openModalFlag;

  const currentFilterViewByRedux =
    state && state.adminMenu && state.adminMenu.currentFilterViewBy;

  const taskFilesById =
    state &&
    state.taskReport &&
    state.taskReport.taskFilesById &&
    state.taskReport.taskFilesById.taskFiles;

  const getTaskById =
    state &&
    state.taskReport &&
    state.taskReport.taskReportById &&
    state.taskReport.taskReportById.taskReportById;
  const taskList =
    state &&
    state.taskReport &&
    state.taskReport.taskReport &&
    state.taskReport.taskReport.taskReport &&
    state.taskReport.taskReport.taskReport;

  const taskReferences = state && state.taskReport && state.taskReferences;
  const setCurrentTask = (task) => {
    dispatch(
      taskReportActions.taskReportByIdRequestSuccess({
        taskReportById: task,
      })
    );
  };
  useEffect(() => {
    if (taskList && taskList.length !== 0) {
      const allTasks = getAllTasks(taskList);
      setAllTaskList(allTasks);
    }
  }, [taskList]);
  useEffect(() => {
    if (taskReferences) {
      setReferenceSectionData(taskReferences);
    }
  }, [taskReferences]);
  useEffect(() => {
    if (getTaskById && Object.keys(getTaskById).length !== 0) {
      setCurrentOpenedTask(getTaskById);
      setIsTaskListOpen(true);
      setDisplayTask("1");
      setTaskListDisplay("1");
    }
  }, [getTaskById]);
  useEffect(() => {
    if (user && user.UserID !== undefined && userDetails.UserType === 4) {
      fetchMothTaskOnTrack();
    }
  }, []);
  useEffect(() => {
    if (taskModalOpenStatus === "board") {
      setDisplayTask("2");
      setTaskListDisplay("0");
      setIsTaskModalOpen(true);
    }
  }, [taskModalOpenStatus]);

  useEffect(() => {
    let task_id =
      state && state.NotificationRedu && state.NotificationRedu.taskID;
    if (task_id) {
      getSelectTaskDetails();
    }
  }, [state.NotificationRedu?.taskID]);

  useEffect(() => {
    // current property is refered to input element
    searchInput.current && searchInput.current.focus();
  }, [searchBoxShow]);

  useEffect(() => {
    // current property is refered to input element
    searchInput.current && searchInput.current.focus();
  }, [searchBoxShowMobile]);

  useEffect(() => {
    let task_id =
      state && state.adminMenu && state.adminMenu.taskIDByCalendarView;

    if (task_id !== null) {
      setDisplayTask("3");
      setTaskListDisplay("0");
      getSelectTaskDetails();
    }
  }, [state.adminMenu.taskIDByCalendarView]);

  useEffect(() => {
    let task = state && state.adminMenu && state.adminMenu.taskID;
    if (
      task !== null &&
      task &&
      Object.keys(task).length !== 0 &&
      taskModalOpenStatus !== ""
    ) {
      setCurrentOpenedTask(task);
    }
  }, [state.adminMenu.taskID]);

  useEffect(() => {
    if (currentFilterViewByRedux === "") {
      setCurrentBoardViewBy(currentFilterViewByRedux);
    }
  }, [currentFilterViewByRedux]);

  // Fetch Tasks List and Sort Data by Status
  useEffect(() => {
    if (taskList && taskList.length > 0) {
      const tempRowCount = {};
      const taskByStatus = getDataByStatus(taskList);
      [...taskByStatus].forEach((item) => {
        if (item.tasks.length > 0) {
          tempRowCount[item.status.trim()] = 3;
        }
      });
      setRowCount(tempRowCount);
      setListTaskData(taskByStatus);
    }
  }, [taskList]);

  useEffect(() => {
    setAllUser([]);
    const ApproverUsers =
      state &&
      state.taskReport &&
      state.taskReport.getUserByRole &&
      state.taskReport.getUserByRole.getUserByRole;

    if (ApproverUsers !== undefined) {
      let temp = [];
      ApproverUsers &&
        ApproverUsers.length > 0 &&
        ApproverUsers.forEach((obj1) => {
          obj1 &&
            obj1.GEN_Users &&
            obj1.GEN_Users.forEach((obj2) => {
              temp.push(obj2);
            });
        });
      setAllUser(temp);
      setAllUserBackup(temp);
    }
  }, [state.taskReport.getUserByRole]);

  useEffect(() => {
    setNoRecords(false);
    if (
      state.taskReport.getUserByRole.getUserByRole !== undefined &&
      state.taskReport.getUserByRole.getUserByRole.length > 0
    ) {
      setNoRecords(false);
    }
    if (
      state.taskReport.getUserByRole.getUserByRole &&
      Object.keys(state.taskReport.getUserByRole.getUserByRole).length === 0 &&
      state.taskReport.getUserByRole.getUserByRole.constructor === Object
    ) {
      setNoRecords(true);
    }
  }, [state.taskReport.getUserByRole.getUserByRole]);

  const innerRefDropWeb = useDropdownOuterClick((e) => {
    if (openBoardDrD === true && !e.target.id.includes("drpBoard")) {
      setOpenBoardDrp(false);
    }
  });

  useEffect(() => {
    dispatch(
      taskReportActions.getTaskFilesById({
        doctype: "Task",
        docname: currentOpenedTask.task_name,
        is_references: 0,
      })
    );
  }, [currentOpenedTask]);

  useEffect(() => {
    if (taskFilesById && taskFilesById.length !== 0) {
      setFileList(taskFilesById);
    } else {
      setFileList([]);
    }
  }, [taskFilesById]);

  useEffect(() => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const mm = monthNames[today.getMonth()];
    var yyyy = today.getFullYear();
    today = dd + " " + mm + " " + yyyy;
    setToday(today);
  }, [currentOpenedTask]);

  const innerSearch = useOuterClick((e) => {
    if (searchBoxShow && searchData.length === 0) {
      setsearchBoxShow(false);
      setSearchValue("");
    }
  });
  const _defineDropDownOptions = (viewType) => {
    let str = "";
    if (viewType === "status") {
      str = "By Status";
    } else if (viewType === "license") {
      str = "By License";
    } else if (viewType === "team-member") {
      str = "Team";
    } else if (viewType === "company") {
      str = "By Company";
    } else {
      str = "By Status";
    }
    return str;
  };

  const innerSearchMobile = useOuterClick((e) => {
    if (searchBoxShowMobile && searchData.length !== 0) {
      setsearchBoxShowMobile(false);
      setSearchValue("");
    }
  });

  const innerRef = useOuterClick((e) => {
    if (
      (currentDropDown !== "open" && !e.target.id.includes("assignBtn")) ||
      (currentDropDown === "open" && e.target.id === "")
    ) {
      setCurrentDropDown("");
      setSelectedUser("");
    }
  });
  const innerRefDrop = useDropdownOuterClick((e) => {
    if (mobileViewBy) {
      setMobileViewBy(false);
    }
  });

  const approverDropDownRef = useOuterClick((e) => {
    if (approverDropDown === "openapproverdropdown") {
      setApproverDropDown("");
      setSelectedUser("");
    }
  });

  const userDetails = state && state.auth && state.auth.loginInfo;

  const getCommentsbyId =
    state &&
    state.taskReport &&
    state.taskReport.getTaskCommentByRole &&
    state.taskReport.getTaskCommentByRole.getTaskCommentByRole;

  const getInitials = (str) => {
    var initials = " ";
    if (str !== "" && str) {
      var names = str.split(" "),
        initials = names[0].substring(0, 1).toUpperCase();
      if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
      } else if (names.length === 1) {
        initials = names[0].substring(0, 2).toUpperCase();
      }
    }
    return initials;
  };
  const closeTaskModalOpen = () => {
    dispatch(adminMenuActions.setCurrentBoardViewTaskId(null));
    dispatch(adminMenuActions.setCurrentCalendarViewTaskId(null));
    dispatch(adminMenuActions.setIsModalOpen(""));
    setIsTaskModalOpen(false);
    if (taskModalOpenStatus === "board") {
      setDisplayTask("2");
      setTaskListDisplay("0");
    }
  };

  const TaskViewModal = () => {
    return (
      <Modal
        blockScroll={false}
        classNames={{
          overlayAnimationIn: "",
          overlayAnimationOut: "",
          modalAnimationIn: "",
          modalAnimationOut: "",
          modal: "calendarCustomModal",
        }}
        open={true}
        center={true}
        showCloseIcon={false}
        modalId="calendarModal"
        onClose={() => closeTaskModalOpen(false)}
        styles={{ width: "500px", height: "100%" }}
        onOverlayClick={() => closeTaskModalOpen(false)}
      >
        <div>
          <ReAssignTasksModal
            openModal={isShowReAssignModalForTeamMember}
            setShowModal={setIsShowReAssignModalForTeamMember}
            userId={currentOpenedTask && currentOpenedTask.assign_to}
            taskId={currentOpenedTask && currentOpenedTask.TaskId}
            isSingleTask
          />
          <ReAssignTasksModal
            openModal={isShowReAssignModalForApprover}
            setShowModal={setIsShowReAssignModalForApprover}
            userId={currentOpenedTask && currentOpenedTask.AprovalAssignedToID}
            taskId={currentOpenedTask && currentOpenedTask.TaskId}
            isSingleTask
          />
          <div className="col-12">
            <div className="">
              <div
                className="task-details-veiw scroll-remove-file"
                style={{
                  animation: "none",
                }}
              >
                <div className="task-details-header">
                  <div className="closing-icon">
                    <div className="task-details-title">
                      {currentOpenedTask && currentOpenedTask.customer_name}
                    </div>
                    <div
                      className="task-close-icon"
                      onClick={() => {
                        setIsTaskListOpen(false);
                        // setExpandedFlags([]);
                        setShowFiles(true);
                        setShowComments(false);
                        setShowHtoDoIt(false);
                        setShowReference(false);
                        setIsTaskModalOpen(false);
                        dispatch(
                          adminMenuActions.setCurrentBoardViewTaskId(null)
                        );
                        dispatch(
                          adminMenuActions.setCurrentCalendarViewTaskId(null)
                        );
                        dispatch(adminMenuActions.setIsModalOpen(""));
                      }}
                    >
                      <img src={closeBlack} alt="Arrow close" />
                    </div>
                  </div>
                  <div className="task-details-sub-title">
                    {currentOpenedTask && currentOpenedTask.subject}{" "}
                    <span className="nse-label d-none d-md-block">
                      {currentOpenedTask && currentOpenedTask.license}
                    </span>
                  </div>

                  <div className="d-flex d-block d-md-none">
                    <span className="nse-label ml-0">
                      {currentOpenedTask && currentOpenedTask.license}
                    </span>
                    <div
                      className="pink-label-mobile ml-0"
                      style={{
                        backgroundColor:
                          currentOpenedTask && currentOpenedTask.status
                            ? currentOpenedTask.status === "Not Assigned"
                              ? "#fcf3cd"
                              : currentOpenedTask.status === "Approval Pending"
                              ? moment(
                                  currentOpenedTask &&
                                    currentOpenedTask.deadline_date
                                ).isBefore(today)
                                ? "#cdfcd8"
                                : "#ffefea"
                              : currentOpenedTask.status === "Approved"
                              ? "#cdfcd8"
                              : currentOpenedTask.status === "Assigned"
                              ? "#ffefea"
                              : currentOpenedTask.status === "Rejected"
                              ? "#ffefea"
                              : "#d2fccd"
                            : "#d2fccd",
                      }}
                    >
                      <div
                        className="approved-text"
                        style={{
                          color:
                            currentOpenedTask && currentOpenedTask.status
                              ? currentOpenedTask.status === "Approval Pending"
                                ? moment(
                                    currentOpenedTask &&
                                      currentOpenedTask.deadline_date
                                  ).isBefore(today)
                                  ? "#7fba7a"
                                  : "#ff5f31"
                                : currentOpenedTask.status === "Approved"
                                ? "#7fba7a"
                                : currentOpenedTask.status === "Assigned"
                                ? "#f8c102"
                                : currentOpenedTask.status === "Not Assigned"
                                ? "#f8c102"
                                : currentOpenedTask.status === "Rejected"
                                ? "#ff5f31"
                                : ""
                              : "#fcf3cd",
                        }}
                      >
                        {currentOpenedTask && currentOpenedTask.status && (
                          <div style={{ textTransform: "uppercase" }}>
                            {currentOpenedTask.status === "Approval Pending"
                              ? moment(
                                  currentOpenedTask &&
                                    currentOpenedTask.deadline_date
                                ).isBefore(today)
                                ? "Not reviewed"
                                : "Approval Pending"
                              : currentOpenedTask.status === "Not Assigned"
                              ? "Assign Task"
                              : currentOpenedTask.status === "Assigned"
                              ? "Task Assigned"
                              : currentOpenedTask.status === "Approved"
                              ? "Task Approved"
                              : currentOpenedTask.status === "Rejected"
                              ? "Task Rejected"
                              : null}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="border-header d-none d-md-block">
                    {currentOpenedTask && currentOpenedTask.status !== "" && (
                      <div
                        className="approved-label"
                        style={{
                          backgroundColor:
                            currentOpenedTask && currentOpenedTask.status
                              ? currentOpenedTask.status === "Not Assigned"
                                ? "#fcf3cd"
                                : currentOpenedTask.status ===
                                  "Approval Pending"
                                ? moment(
                                    currentOpenedTask &&
                                      currentOpenedTask.deadline_date
                                  ).isBefore(today)
                                  ? "#cdfcd8"
                                  : "#ffefea"
                                : currentOpenedTask.status === "Approved"
                                ? "#cdfcd8"
                                : currentOpenedTask.status === "Assigned"
                                ? "#ffefea"
                                : currentOpenedTask.status === "Rejected"
                                ? "#ffefea"
                                : "#d2fccd"
                              : "#d2fccd",
                        }}
                      >
                        <div
                          className="approved-text"
                          style={{
                            color:
                              currentOpenedTask && currentOpenedTask.status
                                ? currentOpenedTask.status ===
                                  "Approval Pending"
                                  ? moment(
                                      currentOpenedTask &&
                                        currentOpenedTask.due_date
                                    ).isBefore(today)
                                    ? "#7fba7a"
                                    : "#ff5f31"
                                  : currentOpenedTask.status === "Approved"
                                  ? "#7fba7a"
                                  : currentOpenedTask.status === "Assigned"
                                  ? "#f8c102"
                                  : currentOpenedTask.status === "Not Assigned"
                                  ? "#f8c102"
                                  : currentOpenedTask.status === "Rejected"
                                  ? "#ff5f31"
                                  : ""
                                : "#fcf3cd",
                          }}
                        >
                          {currentOpenedTask && currentOpenedTask.status && (
                            <div style={{ textTransform: "uppercase" }}>
                              {currentOpenedTask.status === "Approval Pending"
                                ? moment(
                                    currentOpenedTask &&
                                      currentOpenedTask.deadline_date
                                  ).isBefore(today)
                                  ? "Not reviewed"
                                  : "Approval Pending"
                                : currentOpenedTask.status === "Not Assigned"
                                ? "Assign Task"
                                : currentOpenedTask.status === "Assigned"
                                ? "Task Assigned"
                                : currentOpenedTask.status === "Approved"
                                ? "Task Approved"
                                : currentOpenedTask.status === "Rejected"
                                ? "Task Rejected"
                                : null}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {currentOpenedTask && currentOpenedTask.ExReview === 1 && (
                      <div className="d-flex align-items-center labels-container">
                        {/* Approver Status */}
                        {currentOpenedTask && currentOpenedTask.AprStatus && (
                          <div
                            className="er-approved-label mr-3"
                            style={{
                              backgroundColor:
                                currentOpenedTask && currentOpenedTask.AprStatus
                                  ? currentOpenedTask.AprStatus ===
                                    "Not Assigned"
                                    ? "#ffefea"
                                    : currentOpenedTask.AprStatus ===
                                      "Approved by Approver"
                                    ? "#cdfcd8"
                                    : currentOpenedTask.AprStatus ===
                                      "Rejected by Approver"
                                    ? "#ffefea"
                                    : "#d2fccd"
                                  : "#d2fccd",
                            }}
                          >
                            <div
                              className="approved-text"
                              style={{
                                color:
                                  currentOpenedTask &&
                                  currentOpenedTask.AprStatus
                                    ? currentOpenedTask.AprStatus ===
                                      "Not Assigned"
                                      ? "#f8c102"
                                      : currentOpenedTask.AprStatus ===
                                        "Approved by Approver"
                                      ? "#7fba7a"
                                      : currentOpenedTask.AprStatus ===
                                        "Reject by Approver"
                                      ? "#ff5f31"
                                      : "#fcf3cd"
                                    : "#fcf3cd",
                              }}
                            >
                              {currentOpenedTask &&
                                currentOpenedTask.AprStatus && (
                                  <div style={{ textTransform: "uppercase" }}>
                                    {currentOpenedTask &&
                                    currentOpenedTask.AprStatus
                                      ? currentOpenedTask.AprStatus ===
                                        "Not Assigned"
                                        ? `${
                                            userDetails.UserType === 5
                                              ? "Not Started"
                                              : "Approver Not Started Task"
                                          }`
                                        : currentOpenedTask.AprStatus ===
                                          "Approved by Approver"
                                        ? `${
                                            userDetails.UserType === 5
                                              ? "Task Approved"
                                              : "Approved By Approver"
                                          }`
                                        : currentOpenedTask.AprStatus ===
                                          "Rejected by Approver"
                                        ? `${
                                            userDetails.UserType === 5
                                              ? "Task Rejected"
                                              : "Rejected By Approver"
                                          }`
                                        : null
                                      : null}
                                  </div>
                                )}
                            </div>
                          </div>
                        )}
                        {/* Expert Reviewer Status */}
                        {currentOpenedTask && currentOpenedTask.ExStatus && (
                          <div
                            className="er-approved-label"
                            style={{
                              backgroundColor:
                                currentOpenedTask && currentOpenedTask.ExStatus
                                  ? currentOpenedTask.ExStatus === "Not Started"
                                    ? "#ffefea"
                                    : currentOpenedTask.ExStatus ===
                                      "Approved by Expert"
                                    ? "#cdfcd8"
                                    : currentOpenedTask.ExStatus ===
                                      "Rejected by Expert"
                                    ? "#ffefea"
                                    : "#d2fccd"
                                  : "#d2fccd",
                            }}
                          >
                            <div
                              className="approved-text"
                              style={{
                                color:
                                  currentOpenedTask &&
                                  currentOpenedTask.ExStatus
                                    ? currentOpenedTask.ExStatus ===
                                      "Not Started"
                                      ? "#f8c102"
                                      : currentOpenedTask.ExStatus ===
                                        "Approved by Expert"
                                      ? "#7fba7a"
                                      : currentOpenedTask.ExStatus ===
                                        "Rejected by Expert"
                                      ? "#ff5f31"
                                      : "#fcf3cd"
                                    : "#fcf3cd",
                              }}
                            >
                              {currentOpenedTask &&
                                currentOpenedTask.ExStatus && (
                                  <div style={{ textTransform: "uppercase" }}>
                                    {currentOpenedTask &&
                                    currentOpenedTask.ExStatus
                                      ? currentOpenedTask.ExStatus ===
                                        "Not Started"
                                        ? "Expert Not Started Task"
                                        : currentOpenedTask.ExStatus ===
                                          "Approved by Expert"
                                        ? "Approved By Expert"
                                        : currentOpenedTask.ExStatus ===
                                          "Rejected by Expert"
                                        ? "Rejected By Expert"
                                        : null
                                      : null}
                                  </div>
                                )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="task-detail-data">
                    {currentOpenedTask &&
                      currentOpenedTask.RegulatoryUpdates === 1 && (
                        <div className="row">
                          <div className="col-12">
                            <div className="regulation-changes">
                              <div className="float-left">
                                <img
                                  src={redCircle}
                                  alt="account Circle Purple"
                                />
                                <div className="recent-title-circle">
                                  Recent Regulation Changes
                                </div>
                              </div>
                              <div className="float-right">
                                <div
                                  style={{ cursor: "pointer" }}
                                  onClick={() => onRCViewDetailClick()}
                                  className="red-circle-detail"
                                >
                                  View details
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    {userDetails.UserType !== 4 && (
                      <div className="row">
                        <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                          <div className="holding-list-normal-title">
                            Assigned to
                          </div>
                        </div>
                        <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                          {currentOpenedTask &&
                          currentOpenedTask.assign_to !== null ? (
                            <div
                              className="holding-list-bold-title"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                setIsShowReAssignModalForTeamMember(true)
                              }
                            >
                              {currentOpenedTask &&
                                currentOpenedTask.assign_to_name !== null && (
                                  <span className="cicrcle-name">
                                    {getInitials(
                                      currentOpenedTask &&
                                        currentOpenedTask.assign_to_name
                                    )}
                                  </span>
                                )}
                              {currentOpenedTask.assign_to_name ||
                                "Not Assigned"}
                            </div>
                          ) : (
                            <div className="holding-list-bold-title AssinTo">
                              <div className="col-9 pl-0">
                                <div
                                  className="dashboard-assign"
                                  id="assignBtn"
                                  style={{
                                    cursor: "pointer",
                                    width: "fit-content",
                                  }}
                                  onClick={(e) => AssignDisplay(e)}
                                >
                                  <img
                                    src={assignIconCircle}
                                    alt="account Circle Purple"
                                  />{" "}
                                  Assign
                                </div>
                                {currentDropDown === "open" && (
                                  <div
                                    ref={innerRef}
                                    className="bottom-tool-tip"
                                    style={{ display: "block" }}
                                  >
                                    <div
                                      className="shadow-tooltip"
                                      style={{
                                        minHeight: "113px",
                                        maxHeight: "auto",
                                        height: "auto",
                                      }}
                                    >
                                      <div className="">
                                        <div className="tool-tip-head">
                                          <div className="add-Email border-bottom">
                                            <div class="form-group">
                                              <input
                                                type="text"
                                                class="form-control"
                                                placeholder="Enter name or email"
                                                value={selectedUser}
                                                onKeyPress={(e) =>
                                                  handleAssignKeyDown(e)
                                                }
                                                onChange={(e) =>
                                                  handleAppSearch(
                                                    e.target.value
                                                  )
                                                }
                                              />
                                              {!validEmail && (
                                                <div
                                                  className=""
                                                  style={{
                                                    color: "#ef5d5d",
                                                    paddingLeft: "7px",
                                                    position: "absolute",
                                                  }}
                                                >
                                                  Please Enter valid Email
                                                </div>
                                              )}
                                              {emailAvaliableCheck &&
                                                selectedUser !== "" && (
                                                  <div
                                                    className=""
                                                    style={{
                                                      color: "#ef5d5d",
                                                      paddingLeft: "7px",
                                                      position: "absolute",
                                                    }}
                                                  >
                                                    Email already exists
                                                  </div>
                                                )}
                                            </div>
                                            <span className="or-devider">
                                              or{" "}
                                            </span>
                                            <button
                                              class="btn save-details assign-me"
                                              value="4"
                                              onClick={(e) => AssignTaskToMe(e)}
                                            >
                                              Assign to me
                                            </button>
                                          </div>
                                        </div>
                                        <div
                                          className="email-list-box"
                                          style={{
                                            paddingBottom: "15px",
                                            maxHeight: "115px",
                                            height: "auto",
                                          }}
                                        >
                                          {allUser && allUser.length > 0 ? (
                                            allUser.map((user, index) => (
                                              <div
                                                className="email-list-row"
                                                key={index}
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                  onAssignTaskClick(user)
                                                }
                                              >
                                                <span class="name-circle">
                                                  {getInitials(
                                                    user.UserName
                                                      ? user.UserName
                                                      : user.EmailID
                                                      ? user.EmailID
                                                      : null
                                                  )}
                                                </span>
                                                <span className="name-of-emailer">
                                                  {user.UserName
                                                    ? user.UserName
                                                    : ""}
                                                </span>
                                                <span className="last-email-box">
                                                  {user.EmailID}
                                                </span>
                                              </div>
                                            ))
                                          ) : (
                                            <span
                                              className="last-email-box email-list-row"
                                              style={{
                                                textAlign: "center",
                                                opacity: "inherit",
                                              }}
                                              onClick={() =>
                                                handleOnClickAssignBtn()
                                              }
                                            >
                                              {/* No records Available */}
                                              {selectedUser !== "" && (
                                                <div className="dropbox-add-line">
                                                  <img
                                                    src={plusIcon}
                                                    alt="account Circle Purple"
                                                  />
                                                  {selectedUser !== "" &&
                                                    `Invite '${selectedUser}' via email`}
                                                </div>
                                              )}

                                              {noRecords === true &&
                                                selectedUser === "" &&
                                                "No records Available"}
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {userDetails.UserType !== 3 &&
                      currentOpenedTask?.assigned_by && (
                        <div className="row">
                          <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                            <div className="holding-list-normal-title">
                              Assigned by
                            </div>
                          </div>
                          <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                            <div className="holding-list-bold-title">
                              {currentOpenedTask &&
                              currentOpenedTask?.assigned_by_name ===
                                null ? null : (
                                <span className="cicrcle-name">
                                  {getInitials(
                                    currentOpenedTask &&
                                      currentOpenedTask?.assigned_by_name
                                  )}
                                </span>
                              )}
                              {currentOpenedTask &&
                                currentOpenedTask?.assigned_by_name}
                            </div>
                          </div>
                        </div>
                      )}
                    {userDetails.UserType !== 5 && (
                      <div className="row">
                        <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                          <div className="holding-list-normal-title">
                            Approver
                          </div>
                        </div>
                        <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                          {currentOpenedTask &&
                          currentOpenedTask.approver_name !== null ? (
                            <div
                              className="holding-list-bold-title"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                setIsShowReAssignModalForApprover(true)
                              }
                            >
                              {currentOpenedTask &&
                              currentOpenedTask.approver_name === "" ? null : (
                                <span className="cicrcle-name">
                                  {getInitials(
                                    currentOpenedTask &&
                                      currentOpenedTask.approver_name
                                  )}
                                </span>
                              )}
                              {currentOpenedTask &&
                                currentOpenedTask.approver_name}
                            </div>
                          ) : (
                            <div className="holding-list-bold-title">
                              <div className="col-9 pl-0">
                                {user && user.UserType === 4 ? (
                                  <div className="holding-list-bold-title">
                                    Not Assigned
                                  </div>
                                ) : (
                                  <div
                                    className="dashboard-assign"
                                    style={{
                                      cursor: "pointer",
                                      width: "fit-content",
                                    }}
                                    onClick={(e) => ApprovDisplay(e)}
                                  >
                                    <img
                                      src={assignIconCircle}
                                      alt="account Circle Purple"
                                    />{" "}
                                    Assign
                                  </div>
                                )}
                                {approverDropDown ===
                                  "openapproverdropdown" && (
                                  <div
                                    ref={approverDropDownRef}
                                    className="bottom-tool-tip"
                                    style={{ display: "block" }}
                                  >
                                    <div
                                      className="shadow-tooltip"
                                      style={{
                                        minHeight: "113px",
                                        maxHeight: "auto",
                                        height: "auto",
                                      }}
                                    >
                                      <div className="">
                                        <div className="tool-tip-head">
                                          <div className="add-Email border-bottom">
                                            <div class="form-group">
                                              <input
                                                type="text"
                                                class="form-control"
                                                placeholder="Enter name or email"
                                                value={selectedUser}
                                                onKeyPress={(e) =>
                                                  handleKeyDown(e)
                                                }
                                                onChange={(e) =>
                                                  handleAppSearch(
                                                    e.target.value
                                                  )
                                                }
                                              />
                                              {emailAvaliableCheck &&
                                                selectedUser !== "" && (
                                                  <div
                                                    className=""
                                                    style={{
                                                      color: "#ef5d5d",
                                                      paddingLeft: "7px",
                                                      position: "absolute",
                                                    }}
                                                  >
                                                    Email already exists
                                                  </div>
                                                )}
                                              {!validEmail && (
                                                <div
                                                  className=""
                                                  style={{
                                                    color: "#ef5d5d",
                                                    paddingLeft: "7px",
                                                    position: "absolute",
                                                  }}
                                                >
                                                  Please Enter valid Email
                                                </div>
                                              )}
                                            </div>
                                            <span className="or-devider">
                                              {" "}
                                              or
                                            </span>
                                            <button
                                              class="btn save-details assign-me"
                                              value="5"
                                              onClick={(e) => approvTaskToMe(e)}
                                            >
                                              Assign to me
                                            </button>
                                          </div>
                                        </div>
                                        <div
                                          className="email-list-box"
                                          style={{
                                            paddingBottom: "15px",
                                            maxHeight: "115px",
                                            height: "auto",
                                          }}
                                        >
                                          {allUser && allUser.length > 0 ? (
                                            allUser.map((user, index) => (
                                              <div
                                                className="email-list-row"
                                                key={index}
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                  handleChooseApprove(user)
                                                }
                                              >
                                                <span class="name-circle">
                                                  {getInitials(
                                                    user.UserName
                                                      ? user.UserName
                                                      : user.EmailID
                                                      ? user.EmailID
                                                      : null
                                                  )}
                                                </span>
                                                <span className="name-of-emailer">
                                                  {user.UserName
                                                    ? user.UserName
                                                    : ""}
                                                </span>
                                                <span className="last-email-box">
                                                  {user.EmailID}
                                                </span>
                                              </div>
                                            ))
                                          ) : (
                                            <span
                                              className="last-email-box email-list-row"
                                              style={{
                                                textAlign: "center",
                                                opacity: "inherit",
                                              }}
                                              onClick={() =>
                                                handleOnClickApproverBtn()
                                              }
                                            >
                                              {/* No records Available */}
                                              {selectedUser !== "" && (
                                                <div className="dropbox-add-line">
                                                  <img
                                                    src={plusIcon}
                                                    alt="account Circle Purple"
                                                  />
                                                  {selectedUser !== "" &&
                                                    `Invite '${selectedUser}' via email`}
                                                </div>
                                              )}

                                              {noRecords === true &&
                                                selectedUser === "" &&
                                                "No records Available"}
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    <div className="row">
                      <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                        <div className="holding-list-normal-title">
                          Due Date
                        </div>
                      </div>
                      <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                        <div className="holding-list-bold-title">
                          {moment(
                            currentOpenedTask && currentOpenedTask.due_date
                          ).format("DD MMM")}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                        <div className="holding-list-normal-title">
                          Deadline
                        </div>
                      </div>
                      <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                        <div className="holding-list-bold-title">
                          {moment(
                            currentOpenedTask && currentOpenedTask.deadline_date
                          ).format("DD MMM")}
                        </div>
                      </div>
                    </div>
                    {currentOpenedTask &&
                      currentOpenedTask.date_of_approval &&
                      currentOpenedTask.status === "Approved" &&
                      userDetails.UserType !== 4 && (
                        <div className="row">
                          <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                            <div className="holding-list-normal-title">
                              Approval Pending on
                            </div>
                          </div>
                          <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                            <div className="holding-list-bold-title">
                              {moment(currentOpenedTask.DateOfApproval).format(
                                "DD MMM  h:mm a"
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    {userDetails.UserType !== 4 && (
                      <div className="row">
                        {currentOpenedTask &&
                        currentOpenedTask.status !== "Assigned" ? (
                          <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                            <div className="holding-list-normal-title">
                              Status
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        {currentOpenedTask &&
                        currentOpenedTask.status !== "Assigned" ? (
                          <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                            <div className="holding-list-bold-title">
                              {currentOpenedTask && currentOpenedTask.status
                                ? currentOpenedTask.status ===
                                  "Approval Pending"
                                  ? moment(
                                      currentOpenedTask &&
                                        currentOpenedTask.deadline_date
                                    ).isBefore(today)
                                    ? "Not reviewed"
                                    : "Approval Pending"
                                  : currentOpenedTask.status === "Not Assigned"
                                  ? currentOpenedTask.status
                                  : currentOpenedTask.status === "Assigned"
                                  ? "Task Assigned"
                                  : currentOpenedTask.status === "Approved"
                                  ? "Task Approved"
                                  : currentOpenedTask.status === "Rejected"
                                  ? "Task Rejected"
                                  : null
                                : ""}
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    )}
                    {/* {userDetails.UserType !== 4 &&
                      currentOpenedTask &&
                      currentOpenedTask.ExReview === 1 && (
                        <div className="row">
                          <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                            <div className="holding-list-normal-title">
                              Expert Review Status
                            </div>
                          </div>
                          <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                            <div className="holding-list-bold-title">
                              {currentOpenedTask.ExStatus}
                            </div>
                          </div>
                        </div>
                      )} */}

                    {/* {completedDate &&
                      isTaskApproved &&
                      userDetails.UserType !== 4 && (
                        <div className="row">
                          <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                            <div className="holding-list-normal-title">
                              Approval Pending on
                            </div>
                          </div>
                          <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                            <div className="holding-list-bold-title">
                              {moment(completedDate).format("DD MMM  h:mm a")}
                            </div>
                          </div>
                        </div>
                      )} */}
                    {userDetails.UserType !== 4 &&
                      currentOpenedTask &&
                      currentOpenedTask.ExReview === 1 &&
                      currentOpenedTask.ReviewerEmailID !== "" &&
                      currentOpenedTask.ReviewerName !== "" &&
                      currentOpenedTask.ReviewerMobile && (
                        <div className="row">
                          <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                            <div className="holding-list-normal-title">
                              Contact Details
                            </div>
                          </div>
                          <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                            <div className="holding-list-bold-title">
                              {`${currentOpenedTask.ReviewerMobile} | ${currentOpenedTask.ReviewerEmailID}`}
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                </div>
                <div>
                  <div className="task-details-file-grid1">
                    <div className="d-flex">
                      <div className="tab-list-space">
                        {showFiles ? (
                          <div
                            className="file-title pointer"
                            onClick={() => {
                              setShowFiles(true);
                              setShowComments(false);
                              setShowHtoDoIt(false);
                              setShowReference(false);
                            }}
                          >
                            Files
                          </div>
                        ) : (
                          <div
                            className="file-title unActiveText-color pointer"
                            onClick={() => {
                              setShowFiles(true);
                              setShowComments(false);
                              setShowHtoDoIt(false);
                              setShowReference(false);
                            }}
                          >
                            Files
                          </div>
                        )}
                        {showFiles && (
                          <div className="file-title-progress col-5"></div>
                        )}
                      </div>
                      <div className="tab-list-space">
                        {showComments ? (
                          <div
                            className="file-title  pointer"
                            style={{ color: "#2c2738" }}
                            onClick={() => getComments()}
                          >
                            Comments
                          </div>
                        ) : (
                          <div
                            className="file-title unActiveText-color"
                            onClick={() => getComments()}
                          >
                            Comments
                          </div>
                        )}
                        {showComments && (
                          <div className="file-title-progress comments-progress-width"></div>
                        )}
                      </div>
                      <div className="tab-list-space">
                        {referenceShow ? (
                          <div
                            className="file-title  pointer"
                            style={{ color: "#2c2738" }}
                            onClick={() => {
                              _fetchReferenceSectionData("2");
                              setShowFiles(false);
                              setShowComments(false);
                              setShowReference(true);
                            }}
                          >
                            References
                          </div>
                        ) : (
                          <div
                            className="file-title unActiveText-color"
                            onClick={() => {
                              _fetchReferenceSectionData("2");
                              setShowFiles(false);
                              setShowComments(false);
                              setShowReference(true);
                            }}
                          >
                            References
                          </div>
                        )}
                        {referenceShow && (
                          <div className="file-title-progress comments-progress-width"></div>
                        )}
                      </div>
                    </div>
                  </div>
                  {referenceShow && (
                    <div className="11">
                      {referenceSectionData &&
                      referenceSectionData.length > 0 ? (
                        <div className="auto-scroll">
                          {referenceSectionData &&
                          referenceSectionData[0] &&
                          referenceSectionData[0].Linktype === "F" ? (
                            <div className="d-flex ">
                              <div className="pr-5 w-38">
                                <div className="file-upload-title file-img-width">
                                  <img
                                    src={fileIcon}
                                    alt="file Icon"
                                    className="file-icon-box"
                                    value="aaaa"
                                  />{" "}
                                  {referenceSectionData &&
                                    referenceSectionData[0] &&
                                    referenceSectionData[0].Filename}
                                </div>
                              </div>
                              <div className="pr-5 w-62">
                                <a
                                  target="_blank"
                                  href={`${
                                    referenceSectionData[0] &&
                                    referenceSectionData[0].Fileloc /
                                      referenceSectionData[0] &&
                                    referenceSectionData[0].Filename
                                  }`}
                                  style={{ textDecoration: "none" }}
                                  className="file-download-title pointer d-flex"
                                >
                                  download
                                  <span className="d-none d-md-block">
                                    &nbsp;file
                                  </span>
                                </a>
                              </div>
                            </div>
                          ) : (
                            <div className="d-flex">
                              <div className="pr-5 w-38">
                                <div
                                  className="file-upload-title file-img-width"
                                  style={{ color: "#6c5dd3" }}
                                >
                                  <img
                                    src={fileIcon}
                                    alt="file Icon"
                                    className="file-icon-box"
                                    value="aaaa"
                                  />{" "}
                                  {referenceSectionData &&
                                    referenceSectionData[0] &&
                                    referenceSectionData[0].Fileloc /
                                      referenceSectionData[0] &&
                                    referenceSectionData[0].Fileloc}
                                </div>
                              </div>
                              <div className="pr-5 w-62">
                                <a
                                  href={`${
                                    referenceSectionData &&
                                    referenceSectionData[0] &&
                                    referenceSectionData[0].Fileloc /
                                      referenceSectionData[0] &&
                                    referenceSectionData[0].Filename
                                  }`}
                                  target="_blank"
                                  style={{ textDecoration: "none" }}
                                  className="file-download-title pointer d-flex"
                                >
                                  view
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="no-files">No Files To View here</div>
                      )}
                    </div>
                  )}
                  {showFiles && (
                    <div className="file-grid-data">
                      {(user && user.UserType && user.UserType === 4) ||
                      (user && user.UserType && userDetails.UserType === 3) ||
                      (user && user.UserType && userDetails.UserType === 5) ? (
                        <>
                          {/* check here */}
                          {currentOpenedTask &&
                          currentOpenedTask.status &&
                          currentOpenedTask.status !== "Approved" &&
                          currentOpenedTask.status !== "Not Assigned" ? (
                            (user &&
                              user.UserType &&
                              user.UserType &&
                              userDetails.UserType === 4) ||
                            (user &&
                              user.UserType &&
                              userDetails.UserType === 3) ||
                            (user &&
                              user.UserType &&
                              userDetails.UserType === 5) ? (
                              <>
                                {" "}
                                <div className="row">
                                  <div className="col-12 col-sm-4 col-md-4 col-xl-4">
                                    <div className="file-upload-title file-img-width">
                                      <div className="">
                                        <div className="file-upload-box">
                                          <div className="image-display">
                                            <Dropzone
                                              multiple={true}
                                              maxSize={26214400}
                                              accept=".png,.jpg,
                                        application/pdf,application/rtf,application/msword,image/bmp,
                                        application/vnd.ms-excel,image/tiff,image/tif,image/jpeg,
                                        application/ms-excel,
                                        .tiff,.pdf,.doc,.docx,
                                        .XLS,.xlsx,.CSV,.zip,.rar,.txt"
                                              onDrop={(acceptedFiles) =>
                                                handleSelectUploadFile(
                                                  acceptedFiles
                                                )
                                              }
                                            >
                                              {({
                                                getRootProps,
                                                getInputProps,
                                              }) => (
                                                <div
                                                  {...getRootProps({
                                                    className: "dropzone",
                                                  })}
                                                >
                                                  <div>
                                                    <input
                                                      {...getInputProps()}
                                                    />
                                                  </div>
                                                  <img
                                                    src={fileUploadIcon}
                                                    className="cloudImg"
                                                    alt="File Upload icon"
                                                  />
                                                  <div className="drag-drop-title text-center">
                                                    Drag and drop your files
                                                    here
                                                  </div>
                                                  <div className="text-center">
                                                    Upload files
                                                  </div>
                                                </div>
                                              )}
                                            </Dropzone>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : null
                          ) : null}

                          <div className="no-files">
                            {fileList && fileList.length > 0
                              ? fileList.map((files, index) => (
                                  <div className="d-flex">
                                    <div className="pr-3">
                                      <div className="file-upload-title file-img-width">
                                        <img
                                          src={fileIcon}
                                          alt="file Icon"
                                          className="file-icon-box"
                                          value={files.file_name}
                                        />{" "}
                                        {files.file_name}
                                      </div>
                                    </div>
                                    <div className="pr-3">
                                      {currentOpenedTask &&
                                        currentOpenedTask.task_name !==
                                          undefined && (
                                          <a
                                            href={`data:application/${files.file_name
                                              .split(".")
                                              .pop()};base64,${
                                              files.encoded_string
                                            }`}
                                            style={{ textDecoration: "none" }}
                                            className="file-download-title pointer d-flex"
                                            download={files.file_name}
                                          >
                                            download{" "}
                                            <span className="d-none d-md-block">
                                              &nbsp;file
                                            </span>
                                          </a>
                                        )}
                                    </div>
                                    <div className="pr-3">
                                      <div
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                          deleteUploadedFile(files.file_id)
                                        }
                                        className="file-download-title pointer d-flex"
                                      >
                                        <img
                                          className="delete-icon"
                                          src={deleteBlack}
                                          alt="delete Icon"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                ))
                              : "No Files To View here"}
                          </div>
                        </>
                      ) : fileList && fileList.length > 0 ? (
                        fileList.map((file, index) => (
                          <div className="no-files">
                            {file && file.Files && file.Files.length > 0
                              ? file.Files.map((files, index) => (
                                  <div className="row" key={files.file_id}>
                                    <div className="col-8 col-sm-4 col-md-4 col-xl-4">
                                      <div className="file-upload-title file-img-width">
                                        <img
                                          src={fileIcon}
                                          alt="file Icon"
                                          value={files.file_name}
                                        />{" "}
                                        {files.file_name}
                                      </div>
                                    </div>
                                    <div className="col-4 col-sm-8 col-md-8 col-xl-8">
                                      {currentOpenedTask &&
                                        currentOpenedTask.task_name !==
                                          undefined && (
                                          <a
                                            href={`data:application/${files.file_name
                                              .split(".")
                                              .pop()};base64,${
                                              files.encoded_string
                                            }`}
                                            style={{ textDecoration: "none" }}
                                            className="file-download-title pointer d-flex"
                                            download={files.file_name}
                                          >
                                            download{" "}
                                            <span className="d-none d-md-block">
                                              &nbsp;file
                                            </span>
                                          </a>
                                        )}
                                    </div>
                                  </div>
                                ))
                              : "No Files To View here"}
                          </div>
                        ))
                      ) : (
                        <div className="no-files">No Filess To View here</div>
                      )}

                      {/* Task Actions (Approval, Rejection, Mark Complete) */}
                      {currentOpenedTask &&
                        (currentOpenedTask.status === "Assigned" ||
                          currentOpenedTask.status === "Rejected") &&
                        (userDetails.UserType === 3 ||
                          userDetails.UserType === 5) &&
                        user.EmailID !== "" && (
                          <button
                            style={{ marginTop: 10, width: 150 }}
                            onClick={() => teamMemberMarkComplete()}
                            className="btn save-details-bnt approve-task"
                            value="3"
                          >
                            Mark Complete
                          </button>
                        )}
                      {currentOpenedTask &&
                        currentOpenedTask.status === "Approval Pending" &&
                        (user.UserType === 3 || user.UserType === 5) &&
                        user.EmailID !== "" && (
                          <div class="btn-toolbar text-center well">
                            <div class="col-6 col-sm-2 col-md-2 col-xl-2 text-left pl-0">
                              <button
                                onClick={(e) =>
                                  handleAppTask(currentOpenedTask)
                                }
                                className="btn save-details-bnt approve-task"
                              >
                                approve task
                              </button>
                            </div>
                            <div class="col-6 col-sm-2 col-md-2 col-xl-2 text-left pl-45">
                              <button
                                className="btn save-details-bnt reject-task"
                                value="3"
                                onClick={() => setVisibleRejectTaskModal(true)}
                              >
                                reject Task
                              </button>
                            </div>
                          </div>
                        )}
                    </div>
                  )}
                  {showComments && (
                    <div className="file-grid-data blank-space-height">
                      {getCommentsbyId && getCommentsbyId.length > 0 ? (
                        getCommentsbyId.map((comment, index) => (
                          <div>
                            <div className="comment-box">
                              <div className="name-box">
                                {getInitials(
                                  comment && comment.user_name
                                    ? comment.user_name
                                    : "No Username"
                                )}
                              </div>
                              <div className="rigt-box-comment">
                                <div className="d-flex">
                                  <div className="right-box-text">
                                    {comment && comment.user_name
                                      ? comment.user_name
                                      : "No Username"}
                                  </div>
                                  <div className="days-ago">
                                    {moment(comment.commented_on).format(
                                      "DD MMM"
                                    )}
                                  </div>
                                </div>
                                <div className="comment-desc">
                                  {comment.content}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="no-comments">No Comments</div>
                      )}

                      <div className="comment-box">
                        <div className="name-box">
                          {getInitials(user && user.full_name)}
                        </div>
                        <div className="rigt-box-comment">
                          <div className="input-comment-box input-comment-boxLeft">
                            <TextareaAutosize
                              minRows={1.3}
                              style={{ overflow: "hidden" }}
                              type="text"
                              className="form-control textAreaHeight"
                              value={inputComment}
                              placeholder="Add a comment"
                              onChange={(e) => handleChange(e)}
                              required
                            />
                            <div className="inputIcon">
                              <img
                                src={inputRightArrow}
                                alt=""
                                style={{ cursor: "pointer" }}
                                onClick={() => submitComment()}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {showHtoDoIt && (
                    <div className="file-grid-data blank-space-height">
                      <h1>We Don't Know</h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  };
  // Submit Reject Task Modal
  const submitModal = () => {
    dispatch(
      taskReportActions.changeTaskStatusRequest({
        task_name: currentOpenedTask.task_name,
        status: "Rejected",
      })
    );
    dispatch(
      taskReportActions.postTaskCommentByTaskID({
        task_name: currentOpenedTask.task_name,
        content: rejectTaskInput,
      })
    );
    setRejectTaskInputComment("");
    setVisibleRejectTaskModal(false);
  };

  const teamMemberMarkComplete = () => {
    dispatch(
      taskReportActions.changeTaskStatusRequest({
        task_name: currentOpenedTask.task_name,
        status: "Approval Pending",
      })
    );
  };

  const handleChangeRejectTaskComment = (e) => {
    e.preventDefault();
    setRejectTaskInputComment(e.target.value);
  };

  const renderRejectTaskModal = () => {
    return (
      <Modal
        onOverlayClick={() => setVisibleRejectTaskModal(false)}
        open={visibleRejectTaskModal}
        center={true}
        showCloseIcon={true}
        modalId="modal2"
        onClose={() => setVisibleRejectTaskModal(false)}
        styles={{ width: "373", height: "265" }}
      >
        <div className="model-design-reject">
          <div className="reject-model-title">
            Select a reason for rejecting the task
          </div>
          <div className="white-bottom">
            <div class="form-group">
              <label htmlFor="comment">Comment:</label>
              <textarea
                className="form-control"
                placeholder="Enter the reason for rejecting this task."
                value={rejectTaskInput}
                onChange={(e) => handleChangeRejectTaskComment(e)}
                rows="5"
                id="comment"
                name="rejectTaskComment"
              ></textarea>
              <div className="text-count-area">0/200</div>
            </div>
            <div className="btn-group float-right">
              <button
                type="submit"
                onClick={() => setVisibleRejectTaskModal(false)}
                className="btn cancel-btn-reject mr-2"
              >
                Cancel
              </button>
              <button
                disabled={rejectTaskInput === ""}
                type="submit"
                onClick={() => submitModal()}
                className="btn reject-submit-btn"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  const handleScroll = (e) => {
    if (isTaskListOpen) {
      if (document.getElementById("test"))
        document.getElementById("test").classList.add("scroll-inside");
    }
  };

  window.addEventListener("scroll", handleScroll, true);

  window.onbeforeunload = function (e) {
    let task_id = state && state.adminMenu && state.adminMenu.taskID;
    let task_id_cal =
      state && state.adminMenu && state.adminMenu.taskIDByCalendarView;
    if (task_id_cal !== null) {
      dispatch(adminMenuActions.setCurrentCalendarViewTaskId(null));
      setIsTaskModalOpen(false);
    }
    if (task_id !== null && taskModalOpenStatus !== "") {
      dispatch(adminMenuActions.setCurrentBoardViewTaskId(null));
      dispatch(adminMenuActions.setIsModalOpen(""));
      setIsTaskModalOpen(false);
    }
  };

  const _fetchReferenceSectionData = () => {
    dispatch(
      taskReportActions.taskReferensesByNameRequest({
        task_name: currentOpenedTask.task_name,
      })
    );
  };
  const getSelectTaskDetails = (task) => {
    dispatch(
      taskReportActions.taskReportByIdRequestSuccess({
        taskReportById: task,
      })
    );
  };

  const getApproveUsers = () => {
    // dispatch(
    //   taskReportActions.userByRoleRequest({
    //     coUserId: user.UserID,
    //     ecoUserId: "",
    //     coUserType: 5,
    //   })
    // );
  };

  const getUserDetail = (e) => {
    // dispatch(
    //   taskReportActions.userByRoleRequest({
    //     coUserId: user.UserID,
    //     ecoUserId: "",
    //     coUserType: 4,
    //   })
    // );
  };

  const handleChange = (e) => {
    setInputComment(e.target.value);
  };

  const submitComment = () => {
    dispatch(
      taskReportActions.postTaskCommentByTaskID({
        task_name: currentOpenedTask.task_name,
        content: inputComment,
      })
    );
    setInputComment("");
  };

  const getComments = () => {
    setShowFiles(false);
    setShowComments(true);
    setShowReference(false);
    setShowHtoDoIt(false);

    dispatch(
      taskReportActions.taskCommentsByTaskIdRequest({
        task_name: currentOpenedTask.task_name,
      })
    );
  };

  useEffect(() => {
    if (currentOpenedTask && Object.keys(currentOpenedTask).length !== 0) {
      dispatch(
        taskReportActions.taskCommentsByTaskIdRequest({
          task_name: currentOpenedTask.task_name,
        })
      );
    }
  }, [currentOpenedTask]);

  const deleteUploadedFile = async (file_id) => {
    if (file_id && file_id !== "") {
      try {
        const { data, status } = await axiosInstance.post(
          "compliance.api.DeleteFile",
          { file_id }
        );
        if (status === 200 && data.message && data.message.status) {
          toast.success("File deleted successfully!");
          // Get task files
          dispatch(
            taskReportActions.getTaskFilesById({
              doctype: "Task",
              docname: currentOpenedTask.task_name,
              is_references: 0,
            })
          );
        } else {
          toast.error(
            "Something went wrong. Please try again after some time."
          );
        }
      } catch (err) {
        toast.error("Something went wrong. Please try again after some time.");
      }
    }
  };

  const getUpload = (file) => {
    let url = "";
    if (currentOpenedTask && currentOpenedTask.task_name) {
      url = `${BACKEND_BASE_URL}compliance.api.UploadFile`;
    } else {
      url = `${BACKEND_BASE_URL}compliance.api.UploadFile`;
    }
    var formData = [];
    formData = new FormData();
    formData.append("doctype", "Task");
    formData.append("docname", currentOpenedTask.task_name);
    formData.append("is_private", 1);
    for (var i = 0; i < file.length; i++) {
      formData.append("file_details", file[i]);
    }
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return axiosInstance.post(url, formData, config);
  };

  const handleSelectUploadFile = (file) => {
    const _fileList = (fileList && fileList.length > 0 && fileList) || [];
    var isPresent = false;
    let fileArray = [];
    file.forEach((file) => {
      isPresent = _fileList.some(function (el) {
        return el.file_name === file.name;
      });
      if (!isPresent) {
        fileArray.push(file);
      } else {
        toast.error(
          `File ${file.name} is already uploaded. Please rename it and upload`
        );
        return "";
      }
    });
    if (fileArray && fileArray.length !== 0) {
      getUpload(fileArray).then((response) => {
        const { data, status } = response;
        if (status === 200 && data.message && data.message.status === true) {
          toast.success("File Uploaded Successfully");
          if (currentOpenedTask && currentOpenedTask.task_name !== "") {
            dispatch(
              taskReportActions.getTaskFilesById({
                doctype: "Task",
                docname: currentOpenedTask.task_name,
                is_references: 0,
              })
            );
          }
        }
      });
    }
  };

  const ApprovDisplay = (e) => {
    setApproverDropDown("openapproverdropdown");
    if (approverDropDown === "") {
      getApproveUsers();
      setEmailAvaliableCheck(false);
      setSelectedUser("");
    }
  };

  const AssignDisplay = () => {
    if (currentDropDown === "open") {
      setCurrentDropDown("");
    } else {
      setCurrentDropDown("open");
      getUserDetail();
    }
  };

  const handleAppSearch = (searchText) => {
    setValidEmail(true);
    setEmailAvaliableCheck(false);
    setSelectedUser(searchText);
    let temp = [];
    if (searchText === "") {
      setAllUser(allUserBackup);
    } else {
      allUserBackup &&
        allUserBackup.length > 0 &&
        allUserBackup.filter((item, index) => {
          if (
            item.EmailID.toLowerCase().includes(searchText.toLowerCase()) ||
            (item.UserName &&
              item.UserName.toLowerCase().includes(searchText.toLowerCase()))
          ) {
            temp.push(item);
          }
        });
      setAllUser(temp);
    }
  };

  const handleAppTask = (currentOpenedTask) => {
    dispatch(
      taskReportActions.changeTaskStatusRequest({
        // taskID: taskId,
        // isApproved: 1, //Approve Task
        // userType: 1,
        // email: "",
        // invitee: "",
        // loginID: userDetails.UserID,
        // userDetails: userDetails,
        task_name: currentOpenedTask.task_name,
        status: "Approved",
      })
    );
  };

  const handleChooseApprove = (data) => {
    let approvEmail = data.EmailID;
    let id = currentOpenedTask.TaskId;
    dispatch(
      taskReportActions.taskAssignByTaskID({
        taskID: id,
        email: approvEmail,
        userType: 5,
        invitee: user.EmailID,
        isApproved: 0,
        loginID: userDetails.UserID,
      })
    );
  };

  const onAssignTaskClick = (data) => {
    let assignEmail = data.EmailID;
    let id = currentOpenedTask.TaskId;
    dispatch(
      taskReportActions.taskAssignByTaskID({
        taskID: id,
        email: assignEmail,
        userType: 4,
        invitee: user.EmailID,
        isApproved: 0,
        userDetails: userDetails,
        loginID: userDetails.UserID,
      })
    );
  };

  const handleCheckEmailAvailability = (event) => {
    axios
      .post(`${BACKEND_BASE_URL}compliance.api.avabilityCheck`, {
        // loginID: selectedUser,
        // loginty: "AdminEmail",
        email: selectedUser,
      })
      .then((response) => {
        if (
          response &&
          response.data &&
          response.data.message.status === true
        ) {
          setEmailAvaliableCheck(true);
        } else {
          setEmailAvaliableCheck(false);
          handleApproveTask(event);
        }
      })
      .catch((err) => {
        console.log("error =>  ", err);
      });
  };

  const handleCheckAssignToEmailAvailability = (event) => {
    axios
      .post(`${BACKEND_BASE_URL}compliance.api.avabilityCheck`, {
        // loginID: selectedUser,
        // loginty: "AdminEmail",
        email: selectedUser,
      })
      .then((response) => {
        if (
          response &&
          response.data &&
          response.data.message.status === true
        ) {
          setEmailAvaliableCheck(true);
        } else {
          setEmailAvaliableCheck(false);
          handleAssignToTask(event);
        }
      })
      .catch((err) => {
        console.log("error =>  ", err);
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          event.target.value
        )
      ) {
        handleCheckEmailAvailability(event);
      } else {
        setValidEmail(false);
      }
    }
  };

  const handleOnClickApproverBtn = () => {
    if (
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        selectedUser
      )
    ) {
      setValidEmail(true);
      handleCheckEmailAvailability(selectedUser);
    } else {
      setValidEmail(false);
    }
  };

  const handleAssignKeyDown = (e) => {
    if (e.key === "Enter") {
      if (
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          e.target.value
        )
      ) {
        handleCheckAssignToEmailAvailability(e);
      } else {
        setValidEmail(false);
      }
    }
  };
  const handleOnClickAssignBtn = () => {
    if (
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        selectedUser
      )
    ) {
      setValidEmail(true);
      handleCheckAssignToEmailAvailability(selectedUser);
    } else {
      setValidEmail(false);
    }
  };
  const handleAssignToTask = (e) => {
    dispatch(
      taskReportActions.taskAssignByTaskID({
        task_details: [
          {
            name: currentOpenedTask.task_name,
            assign_to: selectedUser,
            assigned_by: user.EmailID,
          },
        ],
      })
    );
    setSelectedUser("");
  };

  const handleApproveTask = (e) => {
    let id = currentOpenedTask.TaskId;
    dispatch(
      taskReportActions.taskAssignByTaskID({
        task_details: [
          {
            name: currentOpenedTask.task_name,
            approver: selectedUser,
            assigned_by: user.EmailID,
          },
        ],
      })
    );
    setSelectedUser("");
  };
  const AssignTaskToMe = (e) => {
    dispatch(taskReportActions.setLoader(true));
    dispatch(
      taskReportActions.taskAssignByTaskID({
        task_details: [
          {
            name: currentOpenedTask.task_name,
            assign_to: user.EmailID,
            assigned_by: user.EmailID,
          },
        ],
      })
    );
    setSelectedUser("");
  };

  const _getAssignedName = (name) => {
    let str = "";
    if (name.length < 11) {
      str = name;
    } else {
      str = `${name.slice(0, 9)}...`;
    }
    return str;
  };

  const approvTaskToMe = (e) => {
    let id = currentOpenedTask.TaskId;
    dispatch(
      taskReportActions.taskAssignByTaskID({
        task_details: [
          {
            name: currentOpenedTask.task_name,
            approver: user.EmailID,
            assigned_by: user.EmailID,
          },
        ],
      })
    );
  };

  const clearSearch = () => {
    if (isMobile) {
      setsearchBoxShowMobile(false);
    } else {
      setsearchBoxShow(false);
    }
    setSearchValue("");
  };

  const _handleApproveTaskOnCheckBoxClick = (taskId) => {
    // dispatch(
    //   taskReportActions.taskAssignByTaskID({
    //     taskID: taskId,
    //     isApproved: 1, //Approve Task
    //     userType: 1,
    //     email: "",
    //     invitee: "",
    //     loginID: userDetails.UserID,
    //   })
    // );
    // setTimeout(() => {
    //   dispatch(
    //     taskReportActions.taskReportRequest({
    //       entityid: "",
    //       userID: userDetails.UserID,
    //       usertype: userDetails.UserType,
    //     })
    //   );
    // }, 1000);
  };

  const closeMobileSidebar = () => {
    const drawerParent = document.getElementById("sideBarParent");
    const drawerChild = document.getElementById("sideBarChild");
    if (drawerParent) {
      drawerParent.classList.remove("overlay");
      drawerChild.style.left = "-100%";
    }
  };

  const showLessMore = (status, count) => {
    let tempRowCnt = { ...rowCount };
    tempRowCnt[status.trim()] = count;
    setRowCount(tempRowCnt);
  };

  const handleExpandList = (flag, index) => {
    let tempExtend = [...expandedFlags];
    if (flag === "show") {
      tempExtend.push(index);
    } else {
      tempExtend = tempExtend.filter((item) => item !== index);
    }
    setExpandedFlags(tempExtend);
  };

  const getDayDate = (date, flag) => {
    var today = new Date();
    var dateObj = new Date(date);
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    if (dateObj.toLocaleDateString() === today.toLocaleDateString()) {
      return "Today";
    } else if (
      dateObj.toLocaleDateString() === yesterday.toLocaleDateString()
    ) {
      return "Yesterday";
    } else {
      return flag === 1
        ? moment(date).format("DD MMM YYYY")
        : moment(date).format("DD MMM");
    }
  };

  const handleSearch = (searchText) => {
    setSearchValue(searchText);
    let tempArr = [];
    if (searchText !== "") {
      let searchQuery = searchText.toLowerCase();
      listTaskData &&
        listTaskData.length !== 0 &&
        listTaskData.forEach((tasksByStatus) => {
          tasksByStatus.tasks.forEach((task) => {
            if (task.subject !== "" && task.subject !== "Norec") {
              if (
                task?.subject?.toLowerCase().includes(searchQuery) ||
                task?.customer_name?.toLowerCase().includes(searchQuery) ||
                task?.license?.toLowerCase().includes(searchQuery) ||
                task?.assign_to_name?.toLowerCase().includes(searchQuery)
              ) {
                let searchResults = {
                  status: tasksByStatus.status,
                  data: task,
                };
                tempArr.push(searchResults);
              }
            }
          });
        });
      setSearchData(tempArr);
    }
  };

  const renderTaskList = (task, Status, listType) => {
    return (
      <div
        className="row"
        style={{
          marginBottom: "15px",
          position: "relative",
          pointerEvents: `${
            userDetails && userDetails.UserType === 6 ? "none" : "auto"
          }`,
        }}
        onClick={(e) => {
          getSelectTaskDetails(task);
          // setIsTaskListOpen(true);
        }}
      >
        {listType === 1 && Status === "Overdue" && (
          <div className="redWidth">
            <div className="redLine">
              {" "}
              <img src={RedLine} alt="" />
            </div>
          </div>
        )}
        <div
          className="col-10 col-md-6 col-sm-6 col-xl-6"
          onClick={(e) => getSelectTaskDetails(task)}
        >
          <div
            className="all-companies-sub-title"
            onClick={(e) => getSelectTaskDetails(task)}
          >
            <div
              onClick={(e) => getSelectTaskDetails(task)}
              style={{ cursor: "pointer", display: "flex" }}
            >
              <div class="graybox-left">
                <span class="all-companies-nse-label">{task.license}</span>
              </div>
              <span className="pink-label-title-right">
                <div
                  className="overdue-title"
                  onClick={(e) => getSelectTaskDetails(task)}
                >
                  {task.subject}
                </div>
                <div
                  className={
                    Status === "Overdue"
                      ? "red-week d-block d-md-none"
                      : "black-week d-block d-md-none"
                  }
                  style={{ cursor: "pointer" }}
                  onClick={(e) => getSelectTaskDetails(task)}
                >
                  <div className="d-block d-md-none">
                    {getDayDate(task.due_date, 2)}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {task && task.status && task.status !== "Assigned" && (
                      <span
                        className="pink-label-text "
                        style={{
                          backgroundColor:
                            task && task.status
                              ? task.status === "Not Assigned"
                                ? "#fcf3cd"
                                : task.status === "Approval Pending"
                                ? moment(task.deadline_date).isBefore(today)
                                  ? "#cdfcd8"
                                  : "#ffefea"
                                : task.status === "Approved"
                                ? "#cdfcd8"
                                : task.status === "Not Assigned"
                                ? "#ffefea"
                                : task.status === "Rejected"
                                ? "#ffefea"
                                : "#d2fccd"
                              : "#d2fccd",
                          color:
                            task && task.status
                              ? task.status === "Approval Pending"
                                ? moment(task.deadline_date).isBefore(today)
                                  ? "#7fba7a"
                                  : "#ff5f31"
                                : task.status === "Approved"
                                ? "#7fba7a"
                                : task.status === "Assigned"
                                ? "#f8c102"
                                : task.status === "Not Assigned"
                                ? "#f8c102"
                                : task.status === "Rejected"
                                ? "#ff5f31"
                                : ""
                              : "#fcf3cd",
                        }}
                      >
                        {task.status && task.status === "Approval Pending"
                          ? moment(task.deadline_date).isBefore(today)
                            ? "Not reviewed"
                            : "Approval Pending"
                          : task.status === "Not Assigned"
                          ? "Assign Task"
                          : task.status === "Assigned"
                          ? "Task Assigned"
                          : task.status === "Approved"
                          ? "Task Approved"
                          : task.status === "Rejected"
                          ? "Task Rejected"
                          : ""}
                      </span>
                    )}
                  </div>
                </div>

                {task.status && (
                  <p
                    className="pink-label-text d-none d-md-block"
                    style={{
                      backgroundColor:
                        task && task.status
                          ? task.status === "Not Assigned"
                            ? "#fcf3cd"
                            : task.status === "Approval Pending"
                            ? moment(task.deadline_date).isBefore(today)
                              ? "#cdfcd8"
                              : "#ffefea"
                            : task.status === "Approved"
                            ? "#cdfcd8"
                            : task.status === "Assigned"
                            ? "#ffefea"
                            : task.status === "Rejected"
                            ? "#ffefea"
                            : "#d2fccd"
                          : "#d2fccd",
                      color:
                        task && task.status
                          ? task.status === "Approval Pending"
                            ? moment(task.deadline_date).isBefore(today)
                              ? "#7fba7a"
                              : "#ff5f31"
                            : task.status === "Approved"
                            ? "#7fba7a"
                            : task.status === "Assigned"
                            ? "#f8c102"
                            : task.status === "Not Assigned"
                            ? "#f8c102"
                            : task.status === "Rejected"
                            ? "#ff5f31"
                            : ""
                          : "#fcf3cd",
                    }}
                  >
                    {task.status && task.status === "Approval Pending"
                      ? moment(task.deadline_date).isBefore(today)
                        ? "Not reviewed"
                        : "Approval Pending"
                      : task.status === "Not Assigned"
                      ? "Assign Task"
                      : task.status === "Assigned"
                      ? "Task Assigned"
                      : task.status === "Approved"
                      ? "Task Approved"
                      : task.status === "Rejected"
                      ? "Task Rejected"
                      : ""}
                  </p>
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="col-2 col-md-2 col-sm-2 col-xl-2 d-none d-md-block">
          <div
            className="circle-front-text"
            style={{ width: "fit-content", cursor: "pointer" }}
            value={task.TaskId}
            onClick={(e) => getSelectTaskDetails(task)}
          >
            {task.customer_name}
          </div>
        </div>
        <div
          className="col-2 col-md-2 col-sm-2 col-xl-2 d-none d-md-block"
          style={{ cursor: "pointer" }}
          onClick={(e) => getSelectTaskDetails(task)}
        >
          {task.assign_to !== null ? (
            <div className="d-flex">
              {userDetails.UserType === 4 ? (
                task.approver_name === null ? null : (
                  <div className="circle-name d-none d-md-block">
                    <div className="circle-text">
                      {userDetails.UserType === 4 &&
                        getInitials(task.approver_name)}
                    </div>
                  </div>
                )
              ) : (
                <div className="circle-name d-none d-md-block">
                  <div className="circle-text">
                    {getInitials(task?.assign_to_name)}
                  </div>
                </div>
              )}
              {userDetails.UserType === 4 ? (
                <div className="circle-front-text d-none d-md-block">
                  {task.approver_name === null
                    ? "No Approver"
                    : task.approver_name}
                </div>
              ) : (
                <div className="circle-front-text d-none d-md-block">
                  {task.assign_to_name && _getAssignedName(task.assign_to_name)}
                </div>
              )}
            </div>
          ) : userDetails.UserType === 3 ? (
            <div>
              <div
                className="circle-front-text NoStatus"
                style={{ color: "#6c5dd3" }}
              >
                {" "}
                <img src={assignIconCircle} alt="" /> ASSIGN
              </div>
            </div>
          ) : null}
        </div>
        <div className="col-2">
          <div className="align-right">
            <div className="d-flex">
              <div
                className={
                  Status === "overdue"
                    ? "red-week d-none d-md-block"
                    : "black-week d-none d-md-block"
                }
                style={{ cursor: "pointer" }}
                onClick={(e) => getSelectTaskDetails(task)}
              >
                {getDayDate(task.due_date, 1)}
              </div>
              <div
                className="right-arrow-week text-right-grid"
                style={{ cursor: "pointer" }}
                onClick={(e) => getSelectTaskDetails(task)}
              >
                {
                  <img
                    className="d-none d-md-block"
                    src={keyboardArrowRightBlack}
                    alt="Right Arrow"
                  />
                }
                {task.assign_to !== 0 && (
                  <img
                    className="d-block d-md-none"
                    src={keyboardArrowRightBlack}
                    alt="Right Arrow"
                  />
                )}
                {showUserToolTip === `Tooltip${task.TaskId}` && (
                  <div className="toolTip-input">
                    <div className="tooltiptext1 mobDisplaynone">
                      <span className="font-normal-text1">
                        {_getAssignedName(task.assign_to_name)}
                      </span>
                    </div>
                  </div>
                )}
                {task.assign_to === 0 && (
                  <div className="only-mobile-assign-add d-block d-md-none">
                    <div
                      className="assign-user-icon"
                      onMouseOver={() =>
                        setShowUserToolTip(`Tooltip${task.TaskId}`)
                      }
                      onMouseOut={() => setShowUserToolTip("")}
                    >
                      <img
                        src={assignIconCircle}
                        className="d-block d-md-none"
                        alt="Assign Circle"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {Status === "overdue" && searchValue === "" && (
          <div className="redWidth-bottom">
            <div className="redLine">
              {" "}
              <img src={RedLine} alt="" />
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderSidebarTaskList = (task, Status, listType) => {
    return (
      <div
        className={
          currentOpenedTask && task.task_name === currentOpenedTask.task_name
            ? " row active-action-card-sidebar "
            : "row action-card-sidebar"
        }
        onClick={(e) => setCurrentTask(task)}
        style={{ cursor: "pointer" }}
      >
        <div className="col-10">
          <div className="all-companies-sub-title">
            <div className="graybox-left">
              <span className="all-companies-nse-label">{task.license}</span>{" "}
            </div>
            <div
              className="pink-label-title-right"
              onClick={(e) => setCurrentTask(task)}
            >
              <div className="overdue-title-sidebar-title pl-1">
                {task.subject}
              </div>
              <div
                className="red-week  date-font pl-1"
                style={{ cursor: "pointer" }}
              >
                {getDayDate(task.due_date, 2)}
              </div>
            </div>
          </div>
        </div>
        <div className="col-2">
          <div className="align-right">
            <div className="d-flex">
              <div
                className="right-arrow-week text-right-grid"
                style={{ cursor: "pointer" }}
                onClick={(e) => setCurrentTask(task)}
              >
                <img
                  className=""
                  src={keyboardArrowRightBlack}
                  alt="Right Arrow"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const onHBMenu = () => {
    const drawerParent = document.getElementById("sideBarParent");
    const drawerChild = document.getElementById("sideBarChild");
    if (drawerParent) {
      drawerParent.classList.add("overlay");
      drawerChild.style.left = "0%";
    }
  };

  const onMenuClick = (currentActiveMenu) => {
    dispatch(adminMenuActions.setCurrentMenu(currentActiveMenu));
    if (currentActiveMenu === "taskList") {
      history.push("/dashboard");
      if (isTaskListOpen) {
        setIsTaskListOpen(false);
      }
    } else if (currentActiveMenu === "notfications") {
      history.push("/notifications");
    } else if (currentActiveMenu === "settings") {
      history.push("/settings");
    } else if (currentActiveMenu === "dashboard") {
      history.push("/dashboard-view");
    }
  };

  const fetchMothTaskOnTrack = () => {
    // const payload = {
    //   entityid: "0",
    //   userID: userDetails.UserID,
    //   usertype: userDetails.UserType,
    // };
    // axios
    //   .post(`${BACKEND_BASE_URL}/api/DashBoardAnalytics`, payload)
    //   .then((response) => {
    //     if (response && response.data && response.data.length > 0) {
    //       let completedtask = response.data[0].CompletedTask;
    //       setCompletedTask(completedtask);
    //       let scheduledTask = response.data[0].SchedulededTask;
    //       setScheduledTask(scheduledTask);
    //     }
    //   })
    //   .catch((error) => {});
  };
  function handleFocus() {
    if (isMobile) {
      setsearchBoxShowMobile(true);
    } else {
      setsearchBoxShow(true);
    }
    searchInput.current && searchInput.current.focus();
  }
  const onRCViewDetailClick = () => {
    _fetchReferenceSectionData("1");

    if (!isMobile) {
      const drawerParent = document.getElementById("drawerParent");
      const drawerChild = document.getElementById("drawerChild");
      if (drawerParent) {
        drawerParent.classList.add("overlay");
        drawerChild.style.right = "0px";
      }
    } else {
      const drawerParent = document.getElementById("drawerParentMobile");
      const drawerChild = document.getElementById("drawerChildMobile");
      if (drawerParent) {
        drawerParent.classList.add("overlayAccount");
        drawerChild.style.bottom = "0%";
      }
    }
  };

  const onRCViewDetailClose = () => {
    if (!isMobile) {
      const drawerParent = document.getElementById("drawerParent");
      const drawerChild = document.getElementById("drawerChild");
      if (drawerParent) {
        drawerParent.classList.remove("overlay");
        drawerChild.style.transition = "1.5s linear;";
        drawerChild.style.right = "-100%";
      }
    } else {
      const drawerParent = document.getElementById("drawerParentMobile");
      const drawerChild = document.getElementById("drawerChildMobile");
      if (drawerParent) {
        drawerParent.classList.remove("overlayAccount");
        drawerChild.style.transition = "1.5s linear;";
        drawerChild.style.bottom = "-100%";
      }
    }
  };

  const _renderLableRecentRegulation = (strArr) => {
    if (strArr !== "") {
      var arr = strArr.split(",");
      for (var i = 0; i < arr.length; i++) {
        return <p class="yellow-label-text">{arr[i]}</p>;
      }
    }
    return "";
  };

  return (
    <>
      {visibleRejectTaskModal && renderRejectTaskModal()}
      {isTaskModalOpen && TaskViewModal()}
      {!isMobile && (
        <div id="drawerParent" className="">
          <div id="drawerChild" className="sideBarFixed right-fix-width">
            <div className="right-drower">
              <div className="row">
                <img
                  onClick={() => onRCViewDetailClose()}
                  className="closeArrow"
                  src={closeIcon1}
                  alt="Right Arrow"
                />
              </div>
              {recentRegulationData && recentRegulationData.length > 0 && (
                <div className="scroll-div-auto">
                  {recentRegulationData &&
                    recentRegulationData[0] &&
                    recentRegulationData[0].Regbodies && (
                      <div className="col-12 pl-0 d-flex pt-4 pb-2">
                        {_renderLableRecentRegulation(
                          recentRegulationData &&
                            recentRegulationData[0] &&
                            recentRegulationData[0].Regbodies
                        )}
                      </div>
                    )}
                  <div className="col-12 pl-0 pb-3">
                    <div className="big-title-drower">
                      {recentRegulationData &&
                        recentRegulationData[0] &&
                        recentRegulationData[0].Title}
                    </div>
                  </div>
                  <div className="col-12 pl-0 pb-3">
                    {referenceSectionData &&
                      recentRegulationData[0] &&
                      recentRegulationData[0].Gist && (
                        <div
                          className="small-text"
                          dangerouslySetInnerHTML={{
                            __html:
                              recentRegulationData &&
                              recentRegulationData[0] &&
                              recentRegulationData[0].Gist,
                          }}
                        ></div>
                      )}
                  </div>
                  {recentRegulationData &&
                    recentRegulationData[0] &&
                    recentRegulationData[0].Fileloc && (
                      <div className="col-12 pl-0">
                        <div className="small-text">
                          For more information click on the below link:
                        </div>
                        <a
                          target="_blank"
                          href={`${
                            recentRegulationData &&
                            recentRegulationData[0] &&
                            recentRegulationData[0].Fileloc /
                              recentRegulationData &&
                            recentRegulationData[0] &&
                            recentRegulationData[0].Filename
                          }`}
                          className="link-right-drower"
                        >
                          {recentRegulationData &&
                            recentRegulationData[0] &&
                            recentRegulationData[0].Fileloc /
                              recentRegulationData &&
                            recentRegulationData[0] &&
                            recentRegulationData[0].Filename}
                        </a>
                      </div>
                    )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {isMobile && (
        <div id="drawerParentMobile" className="right-side-open">
          <div id="drawerChildMobile" className="sideBarFixedAccount">
            <div className="scroll-div-auto">
              <div className="right-drower">
                <div className="row">
                  <div className="closing-arrow">
                    <img
                      onClick={() => onRCViewDetailClose()}
                      className=""
                      src={closeIcon1}
                      alt="Right Arrow"
                    />
                  </div>
                </div>
                {recentRegulationData && recentRegulationData.length > 0 && (
                  <div>
                    {recentRegulationData &&
                      recentRegulationData[0] &&
                      recentRegulationData[0].Regbodies && (
                        <div className="col-12 pl-0 d-flex pt-4 pb-2">
                          {_renderLableRecentRegulation(
                            recentRegulationData &&
                              recentRegulationData[0] &&
                              recentRegulationData[0].Regbodies
                          )}
                        </div>
                      )}
                    <div className="col-12 pl-0 pb-3">
                      <div className="big-title-drower">
                        {recentRegulationData &&
                          recentRegulationData[0] &&
                          recentRegulationData[0].Title}
                      </div>
                    </div>
                    <div className="col-12 pl-0 pb-3">
                      {recentRegulationData &&
                        recentRegulationData[0] &&
                        recentRegulationData[0].Gist && (
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                recentRegulationData &&
                                recentRegulationData[0] &&
                                recentRegulationData[0].Gist,
                            }}
                            className="small-text"
                          ></div>
                        )}
                    </div>
                    {recentRegulationData &&
                      recentRegulationData[0] &&
                      recentRegulationData[0].Fileloc && (
                        <div className="col-12 pl-0">
                          <div className="small-text">
                            For more information click on the below link:
                          </div>
                          <a
                            target="_blank"
                            href={`${
                              recentRegulationData &&
                              recentRegulationData[0] &&
                              recentRegulationData[0].Fileloc /
                                recentRegulationData[0] &&
                              recentRegulationData[0].Filename
                            }`}
                            className="link-right-drower"
                          >
                            {" "}
                            {recentRegulationData &&
                              recentRegulationData[0] &&
                              recentRegulationData[0].Fileloc /
                                recentRegulationData[0] &&
                              recentRegulationData[0].Filename}
                          </a>
                        </div>
                      )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {!isTaskListOpen && (
        <div className="all-companies-task-grid mobile-dashboard-view">
          {isMobile && (
            <div id="sideBarParent" className="">
              <div id="sideBarChild" className="leftSideBarFixed">
                <MobileLeftSidebar
                  className="d-block d-md-none"
                  close={() => closeMobileSidebar()}
                />
              </div>
            </div>
          )}

          <div className="mobile-head d-block d-md-none">
            <div className="d-flex">
              <div
                className="w-25"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  onHBMenu();
                }}
              >
                <img src={togglemobile} alt="toggle mobile" />
              </div>
              <div className="w-75">
                {" "}
                <img
                  className="mobile-logo"
                  src={sideBarlogo}
                  alt="sideBarlogo"
                />{" "}
              </div>
            </div>
          </div>
          {user.UserType === 4 && (
            <div className="companies-sub-title-remove-top w-100">
              <div className="right-side-top-new-strip row">
                <div className="col-12 col-sm-2 col-md-2 col-xl-2 mb-3">
                  <div className="this-Month">This Month</div>
                  <div className="bol-title">Things are on track!</div>
                </div>
                <div className="col-12 col-sm-9 col-md-9 col-xl-9 d-flex">
                  <div className="col-5 col-sm-3 col-md-3 col-xl-3">
                    <div className="row">
                      <div className="float-left">
                        <img
                          className="mr-1"
                          src={complteTaskIcon}
                          alt="complte-Task-icon"
                        />
                      </div>
                      <div className="float-left">
                        <div className="this-Month d-none d-md-block">
                          Approval Pending
                        </div>
                        <div className="count-total">
                          {completedTask !== "Norec" ? completedTask : "0"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-5 col-sm-3 col-md-3 col-xl-3">
                    <div className="row">
                      <div className="float-left">
                        <img
                          className="mr-1"
                          src={scheduledIcon}
                          alt="complte-Task-icon"
                        />
                      </div>
                      <div className="float-left">
                        <div className="this-Month d-none d-md-block">
                          Scheduled
                        </div>
                        <div className="count-total">
                          {scheduledTask !== "Norec" ? scheduledTask : "0"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="d-flex mobile-height-dasboardView">
            <div className="companies-sub-title w-25 d-none d-md-block">
              Taskss
            </div>
            {!searchBoxShowMobile && (
              <div className="w-75 d-flex pl-0">
                <div className="companies-sub-title d-block d-md-none">
                  Taskss
                </div>
              </div>
            )}

            <div className="w-75 d-none d-md-block">
              {!searchBoxShow && (
                <div className="only-search-icon" onClick={() => handleFocus()}>
                  <img src={searchIcon} alt="sidebar Check Icon" />
                </div>
              )}
              {searchBoxShow && (
                <div className="searchBox d-none d-md-block" ref={innerSearch}>
                  <div className="input-group form-group">
                    <img
                      className="IconGray"
                      src={searchIcon}
                      alt="search Icon"
                    />
                    <input
                      className="form-control mozilla-py"
                      type="text"
                      ref={searchInput}
                      autofocus
                      placeholder="Search for teams,licenses, Companies etc"
                      onChange={(e) => handleSearch(e.target.value)}
                      value={searchValue}
                    />
                    <span className="input-group-append">
                      <button
                        className="btn border-start-0 border-top-0 border-bottom-0 border-0 ms-n5"
                        type="button"
                      >
                        <img
                          src={closeIconGray}
                          alt="close Icon"
                          onClick={() => clearSearch()}
                        />
                      </button>
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div
              className={
                searchBoxShowMobile
                  ? "col-12 d-block d-md-none"
                  : "w-25 d-block d-md-none mobile"
              }
            >
              {!searchBoxShowMobile && (
                <div className="only-search-icon" onClick={() => handleFocus()}>
                  <img src={searchIcon} alt="sidebar Check Icon" />
                </div>
              )}
              {searchBoxShowMobile && (
                <div className="searchBox" ref={innerSearchMobile}>
                  <div className="input-group form-group">
                    <img
                      className="IconGray"
                      src={searchIcon}
                      alt="search Icon"
                    />
                    <input
                      ref={searchInput}
                      autofocus
                      className="form-control"
                      type="text"
                      placeholder=""
                      onChange={(e) => handleSearch(e.target.value)}
                      value={searchValue}
                    />
                    <span className="input-group-append">
                      <button
                        className="btn border-start-0 border-top-0 border-bottom-0 border-0 ms-n5"
                        type="button"
                      >
                        <img
                          src={closeIconGray}
                          onClick={() => clearSearch()}
                          alt="close Icon"
                        />
                      </button>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="task-details-file-grid task-details-file-grid-dashboard custimDesignTask">
            {searchValue !== "" && (
              <div className="file-title">Search Results: </div>
            )}
            {searchValue === "" && (
              <span>
                <span
                  className={
                    displayTask === "1"
                      ? "file-title-active"
                      : "file-title-inactive"
                  }
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    setDisplayTask("1");
                    setTaskListDisplay("1");
                  }}
                >
                  List
                </span>
                {displayTask === "1" && (
                  <div className="file-title-progress"></div>
                )}
                <span
                  className={
                    displayTask === "3"
                      ? "file-title-active"
                      : "file-title-inactive"
                  }
                  style={{ marginLeft: "40px", cursor: "pointer" }}
                  onClick={(e) => {
                    setDisplayTask("3");
                    setTaskListDisplay("0");
                  }}
                >
                  Calendar
                </span>
                {displayTask === "3" && (
                  <div
                    className="file-title-progress"
                    style={{ left: "67px", width: "85px" }}
                  ></div>
                )}
                <span
                  className={
                    displayTask === "2"
                      ? "file-title-active"
                      : "file-title-inactive"
                  }
                  style={{ marginLeft: "40px", cursor: "pointer" }}
                  onClick={(e) => {
                    setDisplayTask("2");
                    setTaskListDisplay("0");
                    setCurrentBoardViewBy("status");
                  }}
                >
                  Board
                </span>
                {displayTask === "2" && (
                  <div
                    className="file-title-progress"
                    style={{ left: "190px", width: "65px" }}
                  ></div>
                )}
              </span>
            )}
            {((searchBoxShow === false && displayTask === "1" && !isMobile) ||
              (searchBoxShow === false &&
                displayTask === "2" &&
                !isMobile)) && (
              <span className="take-action d-none d-md-block view-by__status-box">
                <ul className="pull-right" style={{ float: "right" }}>
                  <span
                    style={{ fontSize: "10px", backgroundColor: "transparent" }}
                  >
                    View by
                  </span>
                  <span
                    className={
                      displayTask === "1"
                        ? taskListDisplay === "1" && "active"
                        : currentBoardViewBy === "status" && "active"
                    }
                    style={{
                      fontSize: "10px",
                      marginLeft: "10px",
                      paddingLeft: "6px",
                      paddingRight: "6px",
                      cursor: "pointer",
                    }}
                    onClick={(e) => {
                      if (displayTask === "1") {
                        setTaskListDisplay("1");
                        setDisplayTask("1");
                      }
                      if (displayTask === "2") {
                        setCurrentBoardViewBy("status");
                      }
                    }}
                  >
                    Status
                  </span>
                  <span
                    className={
                      displayTask === "1"
                        ? taskListDisplay === "2" && "active"
                        : currentBoardViewBy === "company" && "active"
                    }
                    style={{
                      fontSize: "11px",
                      marginLeft: "10px",
                      paddingLeft: "6px",
                      paddingRight: "6px",
                      cursor: "pointer",
                    }}
                    onClick={(e) => {
                      if (displayTask === "1") {
                        setTaskListDisplay("2");
                        setDisplayTask("1");
                      }
                      if (displayTask === "2") {
                        setCurrentBoardViewBy("company");
                      }
                    }}
                  >
                    Company
                  </span>
                  <span
                    className={
                      displayTask === "1"
                        ? taskListDisplay === "3" && "active"
                        : currentBoardViewBy === "license" && "active"
                    }
                    style={{
                      fontSize: "11px",
                      marginLeft: "10px",
                      paddingLeft: "6px",
                      paddingRight: "6px",
                      cursor: "pointer",
                    }}
                    onClick={(e) => {
                      if (displayTask === "1") {
                        setTaskListDisplay("3");
                        setDisplayTask("1");
                      }
                      if (displayTask === "2") {
                        setCurrentBoardViewBy("license");
                      }
                    }}
                  >
                    License
                  </span>
                  {(user ? user.UserType !== 4 : "") && (
                    <span
                      className={
                        displayTask === "1"
                          ? taskListDisplay === "4" && "active"
                          : currentBoardViewBy === "team-member" && "active"
                      }
                      style={{
                        fontSize: "11px",
                        marginLeft: "10px",
                        paddingLeft: "6px",
                        paddingRight: "6px",
                        cursor: "pointer",
                      }}
                      onClick={(e) => {
                        if (displayTask === "1") {
                          setTaskListDisplay("4");
                          setDisplayTask("1");
                        }
                        if (displayTask === "2") {
                          setCurrentBoardViewBy("team-member");
                        }
                      }}
                    >
                      Team
                    </span>
                  )}
                </ul>
              </span>
            )}
          </div>
          {searchValue === "" && isMobile && displayTask === "1" && (
            <>
              <div
                className="dropdown-mobile pp"
                onClick={(e) => {
                  if (mobileViewBy) {
                    setMobileViewBy(false);
                  } else {
                    setMobileViewBy(true);
                  }
                }}
              >
                {taskListDisplay === "1"
                  ? "By Status"
                  : taskListDisplay === "2"
                  ? "Company"
                  : taskListDisplay === "3"
                  ? "License"
                  : taskListDisplay === "4"
                  ? "Team"
                  : "View By"}
                <img
                  className="drop-down-bottom-arrow"
                  src={dropdownBottomArrow}
                  alt="dropdownBottomArrow"
                />
              </div>
              {mobileViewBy && (
                <div ref={innerRefDrop} className="dropdown-open">
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      setTaskListDisplay("1");
                      setDisplayTask("1");
                      setMobileViewBy(false);
                    }}
                    className=""
                  >
                    <div className="icon-text-inline">
                      <span
                        className={
                          taskListDisplay === "1"
                            ? "float-left dropdown-active-link"
                            : "float-left change-role"
                        }
                      >
                        By Status
                      </span>
                      <span className="float-right change-role">
                        {taskListDisplay === "1" && (
                          <img
                            className="dropdownCheck"
                            src={dropdownCheckIcon}
                            alt="dropdownCheckIcon"
                          />
                        )}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      setTaskListDisplay("3");
                      setDisplayTask("1");
                      setMobileViewBy(false);
                    }}
                    className=""
                  >
                    <div className="icon-text-inline">
                      <span
                        className={
                          taskListDisplay === "3"
                            ? "float-left dropdown-active-link"
                            : "float-left change-role"
                        }
                      >
                        By License
                      </span>
                      <span className="float-right change-role">
                        {taskListDisplay === "3" && (
                          <img
                            className="dropdownCheck"
                            src={dropdownCheckIcon}
                            alt="dropdownCheckIcon"
                          />
                        )}
                      </span>
                    </div>
                  </div>

                  <div
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      setTaskListDisplay("2");
                      setDisplayTask("1");
                      setMobileViewBy(false);
                    }}
                    className=""
                  >
                    <div className="icon-text-inline">
                      <span
                        className={
                          taskListDisplay === "2"
                            ? "float-left dropdown-active-link"
                            : "float-left change-role"
                        }
                      >
                        By Company
                      </span>
                      <span className="float-right change-role">
                        {taskListDisplay === "2" && (
                          <img
                            className="dropdownCheck"
                            src={dropdownCheckIcon}
                            alt="dropdownCheckIcon"
                          />
                        )}
                      </span>
                    </div>
                  </div>
                  <div
                    className=""
                    onClick={(e) => {
                      setTaskListDisplay("4");
                      setDisplayTask("1");
                      setMobileViewBy(false);
                    }}
                  >
                    {user.UserType !== 4 && (
                      <div className="icon-text-inline">
                        <span
                          className={
                            taskListDisplay === "4"
                              ? "float-left dropdown-active-link"
                              : "float-left change-role"
                          }
                        >
                          By Team
                        </span>
                        <span className="float-right change-role">
                          {taskListDisplay === "4" && (
                            <img
                              className="dropdownCheck"
                              src={dropdownCheckIcon}
                              alt="dropdownCheckIcon"
                            />
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {false && displayTask === "2" && searchValue === "" && (
            <div className="take-action">
              <div className="task-list-grid">
                {isMobile && (
                  <div>
                    <div
                      id="drpBoard"
                      style={{ cursor: "pointer" }}
                      className="dropdown-mobile-margin margin-left-zero"
                      onClick={(e) => {
                        setOpenBoardDrp(true);
                      }}
                    >
                      {_defineDropDownOptions(currentBoardViewBy)}
                      <img
                        className="drop-down-bottom-arrow"
                        src={dropdownBottomArrow}
                        alt="dropdownBottomArrow"
                      />
                    </div>
                    {openBoardDrD && isMobile && (
                      <div
                        ref={innerRefDropWeb}
                        style={{ margin: 0 }}
                        className="dropdown-open"
                      >
                        <div className="">
                          {dropDownArr &&
                            dropDownArr.length > 0 &&
                            dropDownArr.map((item, index) => (
                              <div
                                style={{ cursor: "pointer" }}
                                className="icon-text-inline"
                              >
                                <span
                                  onClick={() => {
                                    setCurrentBoardViewBy(item.name);
                                    setOpenBoardDrp(false);
                                  }}
                                  className="float-left dropdown-active-link"
                                >
                                  {item.viewBy}
                                </span>
                                <span
                                  style={{ marginBottom: 0 }}
                                  className="float-right change-role"
                                >
                                  {currentBoardViewBy === item.name && (
                                    <img
                                      className="dropdownCheck"
                                      src={dropdownCheckIcon}
                                      alt="dropdownCheckIcon"
                                    />
                                  )}
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          <div
            className={
              !isMobile && displayTask === "2"
                ? "overflow-hidden task-grid-scroll"
                : userDetails.UserType === 4
                ? "task-grid-scroll mobile-dashboard-view Tm-task-grid-scroll"
                : "task-grid-scroll"
            }
            style={
              userDetails.UserType === 4
                ? isMobile
                  ? { maxHeight: "calc(100vh - 370px)", width: "100%" }
                  : { maxHeight: "calc(100vh - 295px)", width: "100%" }
                : { maxHeight: "calc(100vh - 210px)", width: "100%" }
            }
            onScroll={() => {
              if (mobileViewBy === true) {
                setMobileViewBy(false);
              }
            }}
          >
            {searchValue !== "" && (
              <div
                className="take-action"
                style={{
                  marginBottom: "0px",
                  paddingBottom: "0px",
                  paddingTop: "20px",
                }}
              >
                {searchData.length > 0 &&
                  searchData.map((task) => {
                    return <>{renderTaskList(task.data, task.status, 2)}</>;
                  })}
              </div>
            )}
            {searchValue === "" &&
              taskListDisplay === "1" &&
              listTaskData &&
              listTaskData.length > 0 &&
              listTaskData.map((item, index) => {
                if (expandedFlags.includes(index)) {
                  console.log(item.status);
                }
                return (
                  <>
                    <div className="take-action">
                      <div className="task-list-grid">
                        {item.status.trim() === "Overdue" && (
                          <div
                            className="action-title upcoming-btn mt-3"
                            style={{
                              color: "#f22727",
                              fontWeight: "500",
                              display: "flex",
                              cursor: "pointer",
                              width: "fit-content",
                            }}
                            onClick={() => {
                              expandedFlags.includes(index)
                                ? handleExpandList("hide", index)
                                : handleExpandList("show", index);
                            }}
                          >
                            {"Overdue"}{" "}
                            <p className="red-circle-overide">
                              {item.tasks.length}
                            </p>
                            {expandedFlags.includes(index) ? (
                              <img
                                src={redArrowTop}
                                className="redArrowTop arrowDown"
                                alt="Arrow Up"
                                style={{
                                  width: "18px",
                                  height: "18px",
                                  marginTop: "2px",
                                  marginLeft: "9px",
                                }}
                              />
                            ) : (
                              <img
                                src={redArrowTop}
                                className="redArrowTop arrowDown"
                                alt="Arrow Up"
                                style={{
                                  width: "18px",
                                  height: "18px",
                                  marginTop: "2px",
                                  marginLeft: "9px",
                                  transform: "rotate(180deg)",
                                }}
                              />
                            )}
                          </div>
                        )}
                        {item.status.trim() === "Take Action" && (
                          <div
                            className="upcoming-btn"
                            style={{ cursor: "pointer", width: "fit-content" }}
                            onClick={() => {
                              expandedFlags.includes(index)
                                ? handleExpandList("hide", index)
                                : handleExpandList("show", index);
                            }}
                          >
                            <div
                              style={{ cursor: "pointer" }}
                              className="upcoming-title"
                            >
                              {"Take Action"}
                              <span className="black-circle">
                                <p className="black-circle-text">
                                  {item.tasks.length}
                                </p>
                              </span>
                              {!expandedFlags.includes(index) ? (
                                <img
                                  src={upArrow}
                                  className="arrowDown"
                                  alt="Arrow Up"
                                />
                              ) : (
                                <img
                                  src={downArrow}
                                  className="arrowDown"
                                  alt="Arrow down"
                                />
                              )}
                            </div>
                          </div>
                        )}
                        {(item.status.trim() === "Upcoming" ||
                          item.status.trim() === "Completed") && (
                          <div
                            className="upcoming-btn"
                            style={{ cursor: "pointer", width: "fit-content" }}
                            onClick={() => {
                              expandedFlags.includes(index)
                                ? handleExpandList("hide", index)
                                : handleExpandList("show", index);
                            }}
                          >
                            <div
                              style={{ cursor: "pointer" }}
                              className={
                                item.status.trim() === "Upcoming"
                                  ? "upcoming-title"
                                  : "complete-title"
                              }
                            >
                              {item.status.trim() === "Upcoming"
                                ? "Upcoming"
                                : "Completed"}
                              <span
                                className={
                                  item.status.trim() === "Upcoming"
                                    ? "black-circle"
                                    : "green-circle"
                                }
                              >
                                <p className="black-circle-text">
                                  {item.tasks.length}
                                </p>
                              </span>
                              {expandedFlags.includes(index) ? (
                                <img
                                  src={upArrow}
                                  className="arrowDown"
                                  alt="Arrow Up"
                                />
                              ) : (
                                <img
                                  src={downArrow}
                                  className="arrowDown"
                                  alt="Arrow down"
                                />
                              )}
                            </div>
                          </div>
                        )}
                        {(item.status.trim() === "Upcoming"
                          ? expandedFlags.includes(index)
                          : item.status.trim() === "Completed"
                          ? expandedFlags.includes(index)
                          : item.status.trim() === "Overdue"
                          ? expandedFlags.includes(index)
                          : item.status.trim() === "Take Action"
                          ? !expandedFlags.includes(index)
                          : expandedFlags.includes(index)) && (
                          <>
                            {item.tasks
                              .slice(0, rowCount[item.status.trim()])
                              .map((task) => {
                                return (
                                  <>
                                    {renderTaskList(
                                      task,
                                      item.status.trim(),
                                      1
                                    )}
                                  </>
                                );
                              })}
                            <div>
                              {item.tasks.length > 3 && (
                                <>
                                  {rowCount[item.status.trim()] > 3 && (
                                    <div
                                      onClick={() =>
                                        showLessMore(item.status, 3)
                                      }
                                      className="viewAll showLess"
                                    >
                                      Show Less{" "}
                                      <img
                                        src={viewAllArowTop}
                                        alt="Show Less"
                                      />
                                    </div>
                                  )}
                                  {rowCount[item.status.trim()] === 3 && (
                                    <div
                                      onClick={() =>
                                        showLessMore(
                                          item.status,
                                          item.tasks.length
                                        )
                                      }
                                      className="viewAll"
                                      style={{ width: "fit-content" }}
                                    >
                                      View All ({item.tasks.length - 3} MORE)
                                      <img
                                        src={viewAllArow}
                                        alt="view All Arow"
                                      />
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                );
              })}

            {searchValue === "" && taskListDisplay === "2" && (
              <CompanyTaskList
                user={user}
                sideBarTaskList={false}
                currentOpenedTask={currentOpenedTask}
              />
            )}
            {searchValue === "" && taskListDisplay === "3" && (
              <LicenseTaskList
                user={user}
                sideBarTaskList={false}
                currentOpenedTask={currentOpenedTask}
              />
            )}
            {searchValue === "" && taskListDisplay === "4" && (
              <AssigneList
                user={user}
                sideBarTaskList={false}
                currentOpenedTask={currentOpenedTask}
              />
            )}

            {displayTask === "2" && searchValue === "" && (
              <div className="take-action">
                <div className="task-list-grid">
                  {isMobile && (
                    <div>
                      <div
                        id="drpBoard"
                        style={{ cursor: "pointer" }}
                        className="dropdown-mobile-margin margin-left-zero"
                        onClick={(e) => {
                          setOpenBoardDrp(true);
                        }}
                      >
                        {_defineDropDownOptions(currentBoardViewBy)}
                        <img
                          className="drop-down-bottom-arrow"
                          src={dropdownBottomArrow}
                          alt="dropdownBottomArrow"
                        />
                      </div>
                      {openBoardDrD && isMobile && (
                        <div
                          ref={innerRefDropWeb}
                          style={{ margin: 0 }}
                          className="dropdown-open"
                        >
                          <div className="">
                            {dropDownArr &&
                              dropDownArr.length > 0 &&
                              dropDownArr.map((item, index) => (
                                <div
                                  style={{ cursor: "pointer" }}
                                  className="icon-text-inline"
                                >
                                  <span
                                    onClick={() => {
                                      setCurrentBoardViewBy(item.name);
                                      setOpenBoardDrp(false);
                                    }}
                                    className="float-left dropdown-active-link"
                                  >
                                    {item.viewBy}
                                  </span>
                                  <span
                                    style={{ marginBottom: 0 }}
                                    className="float-right change-role"
                                  >
                                    {currentBoardViewBy === item.name && (
                                      <img
                                        className="dropdownCheck"
                                        src={dropdownCheckIcon}
                                        alt="dropdownCheckIcon"
                                      />
                                    )}
                                  </span>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  <BoardView
                    setCurrentBoardViewBy={setCurrentBoardViewBy}
                    currentBoardViewBy={currentBoardViewBy}
                  />
                </div>
              </div>
            )}
          </div>
          {displayTask === "3" && searchValue === "" && (
            <View getSelectTaskDetails={getSelectTaskDetails} />
          )}
        </div>
      )}

      {isTaskListOpen && (
        <div className="row ">
          <div className="col-3 new-side-bar d-none d-md-block">
            <div
              id="test"
              className={
                userDetails.UserType === 3 || userDetails.UserType === 5
                  ? "sidebar-new-class "
                  : "sidebar-new-class-team "
              }
            >
              <div className="all-companies-task-grid-2 inside-padding-sidebar">
                <div className="all-companies-title-sidebar w-100 d-none d-md-block">
                  {user.UserType === 4 && (
                    <div className="right-side-top-new-strip">
                      <div className="w-100 mb-3">
                        <div className="this-Month">This Month</div>
                        <div className="bol-title">Things are on track!</div>
                      </div>
                      <div className="w-100">
                        <div className="row">
                          <div className="col-6">
                            <div className="d-flex">
                              <div className="float-left">
                                <img
                                  className="mr-1"
                                  src={complteTaskIcon}
                                  alt="complte-Task-icon"
                                />
                              </div>
                              <div className="float-left">
                                <div className="this-Month ">
                                  Approval Pending
                                </div>
                                <div className="count-total">
                                  {completedTask !== "Norec"
                                    ? completedTask
                                    : "0"}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="d-flex">
                              <div className="float-left">
                                <img
                                  className="mr-1"
                                  src={scheduledIcon}
                                  alt="complte-Task-icon"
                                />
                              </div>
                              <div className="float-left">
                                <div className="this-Month ">Scheduled</div>
                                <div className="count-total">
                                  {scheduledTask !== "Norec"
                                    ? scheduledTask
                                    : "0"}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {!searchBoxShow && (
                  <div
                    className="only-search-icon"
                    onClick={() => handleFocus()}
                  >
                    <img src={searchIcon} alt="sidebar Check Icon" />
                  </div>
                )}
                {searchBoxShow && (
                  <div
                    className="task-details-file-grid-sidebar ss border-0"
                    ref={innerSearch}
                    style={{ marginTop: "12px" }}
                  >
                    <img
                      className="IconGray"
                      src={searchIcon}
                      alt="search Icon"
                      style={{
                        position: "absolute",
                        marginTop: "10px",
                        paddingLeft: "10px",
                      }}
                    />
                    <input
                      className="form-control"
                      ref={searchInput}
                      autofocus
                      type="text"
                      placeholder="Search for teams,licenses, Companies etc"
                      onChange={(e) => handleSearch(e.target.value)}
                      value={searchValue}
                      style={{ paddingLeft: "40px" }}
                    />

                    <span
                      className="input-group-append"
                      style={{ marginTop: "-40px", float: "right" }}
                    >
                      <button
                        className="btn border-start-0 border-top-0 border-bottom-0 border-0 ms-n5"
                        type="button"
                      >
                        <img
                          src={closeIconGray}
                          alt="close Icon"
                          onClick={() => clearSearch()}
                        />
                      </button>
                    </span>
                  </div>
                )}
                {!searchBoxShow && (
                  <>
                    <div className="all-companies-title-sidebar"></div>
                    <div className="companies-sub-title-sidebar">Tasks</div>
                  </>
                )}
                <div className="task-details-file-grid-sidebar">
                  <div className="row">
                    <div className="col">
                      {searchValue !== "" && (
                        <div className="file-title">Search Results: </div>
                      )}
                      {searchValue === "" && (
                        <span>
                          <span
                            className="file-title"
                            style={{ cursor: "pointer" }}
                            onClick={(e) => {
                              setDisplayTask("1");
                              setTaskListDisplay("1");
                            }}
                          >
                            List
                          </span>
                          {displayTask === "1" && (
                            <div className="file-title-progress"></div>
                          )}
                          <span
                            className="file-title"
                            style={{ marginLeft: "24px", cursor: "pointer" }}
                            onClick={(e) => {
                              setDisplayTask("3");
                              setTaskListDisplay("0");
                              setIsTaskListOpen(false);
                            }}
                          >
                            Calendar
                          </span>
                          {displayTask === "3" && (
                            <div
                              className="file-title-progress"
                              style={{ left: "164px", width: "85px" }}
                            ></div>
                          )}
                          <span
                            className="file-title"
                            style={{ marginLeft: "24px", cursor: "pointer" }}
                            onClick={(e) => {
                              setDisplayTask("2");
                              setTaskListDisplay("0");
                              setIsTaskListOpen(false);
                              setCurrentBoardViewBy("status");
                            }}
                          >
                            Board
                          </span>
                          {displayTask === "2" && (
                            <div
                              className="file-title-progress"
                              style={{ left: "67px", width: "65px" }}
                            ></div>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {searchBoxShow === false && displayTask === "1" && (
                  <div className="view-by-tab">
                    <span className="take-action">
                      <ul className="" style={{ paddingLeft: "0px" }}>
                        <span
                          className="inactivebuttonListView pl-0"
                          style={{ backgroundColor: "transparent" }}
                        >
                          View by
                        </span>
                        <span
                          className={
                            taskListDisplay === "1"
                              ? "activebuttonListView"
                              : "inactivebuttonListView"
                          }
                          style={{
                            fontSize: "9px",
                            marginLeft: "5px",
                            paddingLeft: "5px",
                            paddingRight: "5px",
                            cursor: "pointer",
                          }}
                          onClick={(e) => {
                            setTaskListDisplay("1");
                            setDisplayTask("1");
                          }}
                        >
                          Status
                        </span>
                        <span
                          className={
                            taskListDisplay === "3"
                              ? "activebuttonListView"
                              : "inactivebuttonListView"
                          }
                          style={{
                            fontSize: "9px",
                            marginLeft: "5px",
                            paddingLeft: "5px",
                            paddingRight: "5px",
                            cursor: "pointer",
                          }}
                          onClick={(e) => {
                            setTaskListDisplay("3");
                            setDisplayTask("1");
                          }}
                        >
                          License
                        </span>
                        <span
                          className={
                            taskListDisplay === "2"
                              ? "activebuttonListView"
                              : "inactivebuttonListView"
                          }
                          style={{
                            fontSize: "9px",
                            marginLeft: "5px",
                            paddingLeft: "5px",
                            paddingRight: "5px",
                            cursor: "pointer",
                          }}
                          onClick={(e) => {
                            setTaskListDisplay("2");
                            setDisplayTask("1");
                          }}
                        >
                          Company
                        </span>
                        {userDetails && userDetails.UserType !== 4 && (
                          <span
                            className={
                              taskListDisplay === "4"
                                ? "activebuttonListView"
                                : "inactivebuttonListView"
                            }
                            style={{
                              fontSize: "9px",
                              marginLeft: "5px",
                              paddingLeft: "5px",
                              paddingRight: "5px",
                              cursor: "pointer",
                            }}
                            onClick={(e) => {
                              setTaskListDisplay("4");
                              setDisplayTask("1");
                            }}
                          >
                            Team
                          </span>
                        )}
                      </ul>
                    </span>
                  </div>
                )}

                <div className="take-action">
                  {searchValue !== "" && (
                    <div
                      className="take-action"
                      style={{
                        marginBottom: "0px",
                        paddingBottom: "0px",
                        paddingTop: "20px",
                      }}
                    >
                      {searchData.length > 0 &&
                        searchData.map((task) => {
                          return (
                            <>
                              {renderSidebarTaskList(task.data, task.status, 2)}
                            </>
                          );
                        })}
                    </div>
                  )}
                  {searchValue === "" &&
                    taskListDisplay === "1" &&
                    listTaskData &&
                    listTaskData.length > 0 &&
                    listTaskData.map((item, index) => {
                      return (
                        <>
                          <div className="task-list-grid">
                            {item.status.trim() === "Overdue" && (
                              <div
                                onClick={() => {
                                  expandedFlags.includes(index)
                                    ? handleExpandList("hide", index)
                                    : handleExpandList("show", index);
                                }}
                                className="overdue-title-sidebar upcoming-btn sidebar-upcoming pt-0"
                                style={{
                                  color: "#f22727",
                                  fontWeight: "500",
                                  cursor: "pointer",
                                }}
                              >
                                {"Overdue"}
                                <span className=" red-circle-overide">
                                  <p className="black-circle-text">
                                    {item.tasks.length}
                                  </p>
                                </span>
                                {expandedFlags.includes(index) ? (
                                  <img
                                    src={redArrowTop}
                                    className="redArrowTop arrowDown"
                                    alt="Arrow Up"
                                    style={{
                                      width: "18px",
                                      height: "18px",
                                      marginTop: "2px",
                                      marginLeft: "9px",
                                    }}
                                  />
                                ) : (
                                  <img
                                    src={redArrowTop}
                                    className="redArrowTop arrowDown"
                                    alt="Arrow Up"
                                    style={{
                                      width: "18px",
                                      height: "18px",
                                      marginTop: "2px",
                                      marginLeft: "9px",
                                      transform: "rotate(180deg)",
                                    }}
                                  />
                                )}
                              </div>
                            )}
                            {item.status.trim() === "Take Action" && (
                              <div
                                className="upcoming-btn sidebar-upcoming"
                                onClick={() => {
                                  expandedFlags.includes(index)
                                    ? handleExpandList("hide", index)
                                    : handleExpandList("show", index);
                                }}
                              >
                                <div
                                  style={{ cursor: "pointer" }}
                                  className="upcoming-title"
                                >
                                  {"Take Action"}
                                  <span className="black-circle">
                                    <p className="black-circle-text">
                                      {item.tasks.length}
                                    </p>
                                  </span>
                                  {expandedFlags.includes(index) ? (
                                    <img
                                      src={upArrow}
                                      className="arrowDown"
                                      alt="Arrow Up"
                                    />
                                  ) : (
                                    <img
                                      src={downArrow}
                                      className="arrowDown"
                                      alt="Arrow down"
                                    />
                                  )}
                                </div>
                              </div>
                            )}
                            {(item.status.trim() === "Upcoming" ||
                              item.status.trim() === "Completed") && (
                              <div
                                className={
                                  item.status.trim() === "Upcoming"
                                    ? "upcoming-btn sidebar-upcoming"
                                    : "upcoming-btn sidebar-completed"
                                }
                                onClick={() => {
                                  expandedFlags.includes(index)
                                    ? handleExpandList("hide", index)
                                    : handleExpandList("show", index);
                                }}
                              >
                                <div
                                  style={{ cursor: "pointer" }}
                                  className={
                                    item.status.trim() === "Upcoming"
                                      ? "upcoming-title"
                                      : "complete-title"
                                  }
                                >
                                  {item.status.trim() === "Upcoming"
                                    ? "Upcoming"
                                    : "Completed"}
                                  <span
                                    className={
                                      item.status.trim() === "Upcoming"
                                        ? "black-circle"
                                        : "green-circle"
                                    }
                                  >
                                    <p className="black-circle-text">
                                      {item.tasks.length}
                                    </p>
                                  </span>
                                  {expandedFlags.includes(index) ? (
                                    <img
                                      src={upArrow}
                                      className="arrowDown"
                                      alt="Arrow Up"
                                    />
                                  ) : (
                                    <img
                                      src={downArrow}
                                      className="arrowDown"
                                      alt="Arrow down"
                                    />
                                  )}
                                </div>
                              </div>
                            )}
                            {(item.status.trim() === "Upcoming"
                              ? expandedFlags.includes(index)
                              : item.status.trim() === "Approval Pending"
                              ? expandedFlags.includes(index)
                              : item.status.trim() === "overdue"
                              ? !expandedFlags.includes(index)
                              : item.status.trim() === "Pending"
                              ? !expandedFlags.includes(index)
                              : expandedFlags.includes(index)) && (
                              <>
                                {item.tasks
                                  .slice(0, rowCount[item.status.trim()])
                                  .map((task) => {
                                    return (
                                      <>
                                        {renderSidebarTaskList(
                                          task,
                                          item.status.trim(),
                                          1
                                        )}
                                      </>
                                    );
                                  })}
                                <div>
                                  {item.tasks.length > 3 && (
                                    <>
                                      <div className="sidebar-btn">
                                        {rowCount[item.status.trim()] > 3 && (
                                          <div
                                            onClick={() =>
                                              showLessMore(item.status, 3)
                                            }
                                            className="viewAll showLess"
                                          >
                                            Show Less{" "}
                                            <img
                                              src={viewAllArowTop}
                                              alt="Show Less"
                                            />
                                          </div>
                                        )}
                                        {rowCount[item.status.trim()] === 3 && (
                                          <div
                                            onClick={() =>
                                              showLessMore(
                                                item.status,
                                                item.tasks.length
                                              )
                                            }
                                            className="viewAll"
                                          >
                                            View All ({item.tasks.length - 3} )
                                            <img
                                              src={viewAllArow}
                                              alt="view All Arrow"
                                            />
                                          </div>
                                        )}
                                      </div>
                                    </>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        </>
                      );
                    })}
                  {searchValue === "" && taskListDisplay === "2" && (
                    <>
                      <CompanyTaskList
                        user={user}
                        sideBarTaskList={true}
                        currentOpenedTask={currentOpenedTask}
                        setCurrentTask={setCurrentTask}
                      />
                    </>
                  )}
                  {searchValue === "" && taskListDisplay === "3" && (
                    <LicenseTaskList
                      user={user}
                      sideBarTaskList={true}
                      currentOpenedTask={currentOpenedTask}
                      setCurrentTask={setCurrentTask}
                    />
                  )}
                  {searchValue === "" && taskListDisplay === "4" && (
                    <AssigneList
                      user={user}
                      sideBarTaskList={true}
                      currentOpenedTask={currentOpenedTask}
                      setCurrentTask={setCurrentTask}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isTaskListOpen && Object.keys(currentOpenedTask).length !== 0 && (
        <div className="row ">
          <ReAssignTasksModal
            openModal={isShowReAssignModalForTeamMember}
            setShowModal={setIsShowReAssignModalForTeamMember}
            userId={currentOpenedTask && currentOpenedTask.assign_to}
            taskId={currentOpenedTask && currentOpenedTask.TaskId}
            isSingleTask
          />
          <ReAssignTasksModal
            openModal={isShowReAssignModalForApprover}
            setShowModal={setIsShowReAssignModalForApprover}
            userId={currentOpenedTask && currentOpenedTask.AprovalAssignedToID}
            taskId={currentOpenedTask && currentOpenedTask.TaskId}
            isSingleTask
          />
          <div className="col-12 right-side-bar">
            <div className="">
              <div className="task-details-veiw scroll-remove-file">
                <div className="task-details-header">
                  <div className="closing-icon">
                    <div className="task-details-title">
                      {currentOpenedTask && currentOpenedTask.customer_name}
                    </div>
                    <div
                      className="task-close-icon"
                      onClick={() => {
                        setIsTaskListOpen(false);
                        setShowFiles(true);
                        setShowComments(false);
                        setShowHtoDoIt(false);
                        setShowReference(false);
                        // setExpandedFlags([]);
                        setCurrentTask({});
                        dispatch(notificationActions.setTaskID(null));
                      }}
                    >
                      <img src={closeBlack} alt="Arrow close" />
                    </div>
                  </div>
                  <div className="task-details-sub-title">
                    {currentOpenedTask && currentOpenedTask.subject}{" "}
                    <span className="nse-label d-none d-md-block">
                      {currentOpenedTask && currentOpenedTask.license}
                    </span>
                  </div>

                  <div className="d-flex d-block d-md-none">
                    <span className="nse-label ml-0">
                      {currentOpenedTask && currentOpenedTask.license}
                    </span>
                    <div
                      className="pink-label-mobile ml-0"
                      style={{
                        backgroundColor:
                          currentOpenedTask && currentOpenedTask.status
                            ? currentOpenedTask.status === "Not Assigned"
                              ? "#fcf3cd"
                              : currentOpenedTask.status === "Approval Pending"
                              ? moment(
                                  currentOpenedTask &&
                                    currentOpenedTask.deadline_date
                                ).isBefore(today)
                                ? "#cdfcd8"
                                : "#ffefea"
                              : currentOpenedTask.status === "Approved"
                              ? "#cdfcd8"
                              : currentOpenedTask.status === "Assigned"
                              ? "#ffefea"
                              : currentOpenedTask.status === "Rejected"
                              ? "#ffefea"
                              : "#d2fccd"
                            : "#d2fccd",
                      }}
                    >
                      <div
                        className="approved-text"
                        style={{
                          color:
                            currentOpenedTask && currentOpenedTask.status
                              ? currentOpenedTask.status === "Approval Pending"
                                ? moment(
                                    currentOpenedTask &&
                                      currentOpenedTask.deadline_date
                                  ).isBefore(today)
                                  ? "#7fba7a"
                                  : "#ff5f31"
                                : currentOpenedTask.status === "Approved"
                                ? "#7fba7a"
                                : currentOpenedTask.status === "Assigned"
                                ? "#f8c102"
                                : currentOpenedTask.status === "Not Assigned"
                                ? "#f8c102"
                                : currentOpenedTask.status === "Rejected"
                                ? "#ff5f31"
                                : ""
                              : "#fcf3cd",
                        }}
                      >
                        {currentOpenedTask && currentOpenedTask.status && (
                          <div style={{ textTransform: "uppercase" }}>
                            {currentOpenedTask.status === "Approval Pending"
                              ? moment(
                                  currentOpenedTask &&
                                    currentOpenedTask.deadline_date
                                ).isBefore(today)
                                ? "Not reviewed"
                                : "Approval Pending"
                              : currentOpenedTask.status === "Not Assigned"
                              ? "Assign Task"
                              : currentOpenedTask.status === "Assigned"
                              ? "Task Assigned"
                              : currentOpenedTask.status === "Approved"
                              ? "Task Approved"
                              : currentOpenedTask.status === "Rejected"
                              ? "Task Rejected"
                              : null}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="border-header d-none d-md-block">
                    {currentOpenedTask && currentOpenedTask.status !== "" && (
                      <div
                        className="approved-label"
                        style={{
                          backgroundColor:
                            currentOpenedTask && currentOpenedTask.status
                              ? currentOpenedTask.status === "Not Assigned"
                                ? "#fcf3cd"
                                : currentOpenedTask.status ===
                                  "Approval Pending"
                                ? moment(
                                    currentOpenedTask &&
                                      currentOpenedTask.deadline_date
                                  ).isBefore(today)
                                  ? "#cdfcd8"
                                  : "#ffefea"
                                : currentOpenedTask.status === "Approved"
                                ? "#cdfcd8"
                                : currentOpenedTask.status === "Assigned"
                                ? "#ffefea"
                                : currentOpenedTask.status === "Rejected"
                                ? "#ffefea"
                                : "#d2fccd"
                              : "#d2fccd",
                        }}
                      >
                        <div
                          className="approved-text"
                          style={{
                            color:
                              currentOpenedTask && currentOpenedTask.status
                                ? currentOpenedTask.status ===
                                  "Approval Pending"
                                  ? moment(
                                      currentOpenedTask &&
                                        currentOpenedTask.due_date
                                    ).isBefore(today)
                                    ? "#7fba7a"
                                    : "#ff5f31"
                                  : currentOpenedTask.status === "Approved"
                                  ? "#7fba7a"
                                  : currentOpenedTask.status === "Assigned"
                                  ? "#f8c102"
                                  : currentOpenedTask.status === "Not Assigned"
                                  ? "#f8c102"
                                  : currentOpenedTask.status === "Rejected"
                                  ? "#ff5f31"
                                  : ""
                                : "#fcf3cd",
                          }}
                        >
                          {currentOpenedTask && currentOpenedTask.status && (
                            <div style={{ textTransform: "uppercase" }}>
                              {currentOpenedTask.status === "Approval Pending"
                                ? moment(
                                    currentOpenedTask &&
                                      currentOpenedTask.deadline_date
                                  ).isBefore(today)
                                  ? "Not reviewed"
                                  : "Approval Pending"
                                : currentOpenedTask.status === "Not Assigned"
                                ? "Assign Task"
                                : currentOpenedTask.status === "Assigned"
                                ? "Task Assigned"
                                : currentOpenedTask.status === "Approved"
                                ? "Task Approved"
                                : currentOpenedTask.status === "Rejected"
                                ? "Task Rejected"
                                : null}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {currentOpenedTask && currentOpenedTask.ExReview === 1 && (
                      <div className="d-flex align-items-center labels-container">
                        {/* Approver Status */}
                        {currentOpenedTask && currentOpenedTask.AprStatus && (
                          <div
                            className="er-approved-label mr-3"
                            style={{
                              backgroundColor:
                                currentOpenedTask && currentOpenedTask.AprStatus
                                  ? currentOpenedTask.AprStatus ===
                                    "Not Assigned"
                                    ? "#ffefea"
                                    : currentOpenedTask.AprStatus ===
                                      "Approved by Approver"
                                    ? "#cdfcd8"
                                    : currentOpenedTask.AprStatus ===
                                      "Rejected by Approver"
                                    ? "#ffefea"
                                    : "#d2fccd"
                                  : "#d2fccd",
                            }}
                          >
                            <div
                              className="approved-text"
                              style={{
                                color:
                                  currentOpenedTask &&
                                  currentOpenedTask.AprStatus
                                    ? currentOpenedTask.AprStatus ===
                                      "Not Assigned"
                                      ? "#f8c102"
                                      : currentOpenedTask.AprStatus ===
                                        "Approved by Approver"
                                      ? "#7fba7a"
                                      : currentOpenedTask.AprStatus ===
                                        "Reject by Approver"
                                      ? "#ff5f31"
                                      : "#fcf3cd"
                                    : "#fcf3cd",
                              }}
                            >
                              {currentOpenedTask &&
                                currentOpenedTask.AprStatus && (
                                  <div style={{ textTransform: "uppercase" }}>
                                    {currentOpenedTask &&
                                    currentOpenedTask.AprStatus
                                      ? currentOpenedTask.AprStatus ===
                                        "Not Assigned"
                                        ? `${
                                            userDetails.UserType === 5
                                              ? "Not Started"
                                              : "Approver Not Started Task"
                                          }`
                                        : currentOpenedTask.AprStatus ===
                                          "Approved by Approver"
                                        ? `${
                                            userDetails.UserType === 5
                                              ? "Task Approved"
                                              : "Approved By Approver"
                                          }`
                                        : currentOpenedTask.AprStatus ===
                                          "Rejected by Approver"
                                        ? `${
                                            userDetails.UserType === 5
                                              ? "Task Rejected"
                                              : "Rejected By Approver"
                                          }`
                                        : null
                                      : null}
                                  </div>
                                )}
                            </div>
                          </div>
                        )}
                        {/* Expert Reviewer Status */}
                        {currentOpenedTask && currentOpenedTask.ExStatus && (
                          <div
                            className="er-approved-label"
                            style={{
                              backgroundColor:
                                currentOpenedTask && currentOpenedTask.ExStatus
                                  ? currentOpenedTask.ExStatus === "Not Started"
                                    ? "#ffefea"
                                    : currentOpenedTask.ExStatus ===
                                      "Approved by Expert"
                                    ? "#cdfcd8"
                                    : currentOpenedTask.ExStatus ===
                                      "Rejected by Expert"
                                    ? "#ffefea"
                                    : "#d2fccd"
                                  : "#d2fccd",
                            }}
                          >
                            <div
                              className="approved-text"
                              style={{
                                color:
                                  currentOpenedTask &&
                                  currentOpenedTask.ExStatus
                                    ? currentOpenedTask.ExStatus ===
                                      "Not Started"
                                      ? "#f8c102"
                                      : currentOpenedTask.ExStatus ===
                                        "Approved by Expert"
                                      ? "#7fba7a"
                                      : currentOpenedTask.ExStatus ===
                                        "Rejected by Expert"
                                      ? "#ff5f31"
                                      : "#fcf3cd"
                                    : "#fcf3cd",
                              }}
                            >
                              {currentOpenedTask &&
                                currentOpenedTask.ExStatus && (
                                  <div style={{ textTransform: "uppercase" }}>
                                    {currentOpenedTask &&
                                    currentOpenedTask.ExStatus
                                      ? currentOpenedTask.ExStatus ===
                                        "Not Started"
                                        ? "Expert Not Started Task"
                                        : currentOpenedTask.ExStatus ===
                                          "Approved by Expert"
                                        ? "Approved By Expert"
                                        : currentOpenedTask.ExStatus ===
                                          "Rejected by Expert"
                                        ? "Rejected By Expert"
                                        : null
                                      : null}
                                  </div>
                                )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="task-detail-data">
                    {currentOpenedTask &&
                      currentOpenedTask.RegulatoryUpdates === 1 && (
                        <div className="row">
                          <div className="col-12">
                            <div className="regulation-changes">
                              <div className="float-left">
                                <img
                                  src={redCircle}
                                  alt="account Circle Purple"
                                />
                                <div className="recent-title-circle">
                                  Recent Regulation Changes
                                </div>
                              </div>
                              <div className="float-right">
                                <div
                                  style={{ cursor: "pointer" }}
                                  onClick={() => onRCViewDetailClick()}
                                  className="red-circle-detail"
                                >
                                  View details
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    {userDetails.UserType !== 4 && (
                      <div className="row">
                        <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                          <div className="holding-list-normal-title">
                            Assigned to
                          </div>
                        </div>
                        <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                          {currentOpenedTask &&
                          currentOpenedTask.assign_to !== null ? (
                            <div
                              className="holding-list-bold-title"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                setIsShowReAssignModalForTeamMember(true)
                              }
                            >
                              {currentOpenedTask &&
                                currentOpenedTask.assign_to_name !== null && (
                                  <span className="cicrcle-name">
                                    {getInitials(
                                      currentOpenedTask &&
                                        currentOpenedTask.assign_to_name
                                    )}
                                  </span>
                                )}
                              {currentOpenedTask.assign_to_name ||
                                "Not Assigned"}
                            </div>
                          ) : (
                            <div className="holding-list-bold-title AssinTo">
                              <div className="col-9 pl-0">
                                <div
                                  className="dashboard-assign"
                                  id="assignBtn"
                                  style={{
                                    cursor: "pointer",
                                    width: "fit-content",
                                  }}
                                  onClick={(e) => AssignDisplay(e)}
                                >
                                  <img
                                    src={assignIconCircle}
                                    alt="account Circle Purple"
                                  />{" "}
                                  Assign
                                </div>
                                {currentDropDown === "open" && (
                                  <div
                                    ref={innerRef}
                                    className="bottom-tool-tip"
                                    style={{ display: "block" }}
                                  >
                                    <div
                                      className="shadow-tooltip"
                                      style={{
                                        minHeight: "113px",
                                        maxHeight: "auto",
                                        height: "auto",
                                      }}
                                    >
                                      <div className="">
                                        <div className="tool-tip-head">
                                          <div className="add-Email border-bottom">
                                            <div class="form-group">
                                              <input
                                                type="text"
                                                class="form-control"
                                                placeholder="Enter name or email"
                                                value={selectedUser}
                                                onKeyPress={(e) =>
                                                  handleAssignKeyDown(e)
                                                }
                                                onChange={(e) =>
                                                  handleAppSearch(
                                                    e.target.value
                                                  )
                                                }
                                              />
                                              {!validEmail && (
                                                <div
                                                  className=""
                                                  style={{
                                                    color: "#ef5d5d",
                                                    paddingLeft: "7px",
                                                    position: "absolute",
                                                  }}
                                                >
                                                  Please Enter valid Email
                                                </div>
                                              )}
                                              {emailAvaliableCheck &&
                                                selectedUser !== "" && (
                                                  <div
                                                    className=""
                                                    style={{
                                                      color: "#ef5d5d",
                                                      paddingLeft: "7px",
                                                      position: "absolute",
                                                    }}
                                                  >
                                                    Email already exists
                                                  </div>
                                                )}
                                            </div>
                                            <span className="or-devider">
                                              or{" "}
                                            </span>
                                            <button
                                              class="btn save-details assign-me"
                                              value="4"
                                              onClick={(e) => AssignTaskToMe(e)}
                                            >
                                              Assign to me
                                            </button>
                                          </div>
                                        </div>
                                        <div
                                          className="email-list-box"
                                          style={{
                                            paddingBottom: "15px",
                                            maxHeight: "115px",
                                            height: "auto",
                                          }}
                                        >
                                          {allUser && allUser.length > 0 ? (
                                            allUser.map((user, index) => (
                                              <div
                                                className="email-list-row"
                                                key={index}
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                  onAssignTaskClick(user)
                                                }
                                              >
                                                <span class="name-circle">
                                                  {getInitials(
                                                    user.UserName
                                                      ? user.UserName
                                                      : user.EmailID
                                                      ? user.EmailID
                                                      : null
                                                  )}
                                                </span>
                                                <span className="name-of-emailer">
                                                  {user.UserName
                                                    ? user.UserName
                                                    : ""}
                                                </span>
                                                <span className="last-email-box">
                                                  {user.EmailID}
                                                </span>
                                              </div>
                                            ))
                                          ) : (
                                            <span
                                              className="last-email-box email-list-row"
                                              style={{
                                                textAlign: "center",
                                                opacity: "inherit",
                                              }}
                                              onClick={() =>
                                                handleOnClickAssignBtn()
                                              }
                                            >
                                              {/* No records Available */}
                                              {selectedUser !== "" && (
                                                <div className="dropbox-add-line">
                                                  <img
                                                    src={plusIcon}
                                                    alt="account Circle Purple"
                                                  />
                                                  {selectedUser !== "" &&
                                                    `Invite '${selectedUser}' via email`}
                                                </div>
                                              )}

                                              {noRecords === true &&
                                                selectedUser === "" &&
                                                "No records Available"}
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {userDetails.UserType !== 3 &&
                      currentOpenedTask?.assigned_by && (
                        <div className="row">
                          <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                            <div className="holding-list-normal-title">
                              Assigned by
                            </div>
                          </div>
                          <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                            <div className="holding-list-bold-title">
                              {currentOpenedTask &&
                              currentOpenedTask?.assigned_by_name ===
                                null ? null : (
                                <span className="cicrcle-name">
                                  {getInitials(
                                    currentOpenedTask &&
                                      currentOpenedTask?.assigned_by_name
                                  )}
                                </span>
                              )}
                              {currentOpenedTask &&
                                currentOpenedTask?.assigned_by_name}
                            </div>
                          </div>
                        </div>
                      )}
                    {userDetails.UserType !== 5 && (
                      <div className="row">
                        <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                          <div className="holding-list-normal-title">
                            Approver
                          </div>
                        </div>
                        <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                          {currentOpenedTask &&
                          currentOpenedTask.approver_name !== null ? (
                            <div
                              className="holding-list-bold-title"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                setIsShowReAssignModalForApprover(true)
                              }
                            >
                              {currentOpenedTask &&
                              currentOpenedTask.approver_name === "" ? null : (
                                <span className="cicrcle-name">
                                  {getInitials(
                                    currentOpenedTask &&
                                      currentOpenedTask.approver_name
                                  )}
                                </span>
                              )}
                              {currentOpenedTask &&
                                currentOpenedTask.approver_name}
                            </div>
                          ) : (
                            <div className="holding-list-bold-title">
                              <div className="col-9 pl-0">
                                {user && user.UserType === 4 ? (
                                  <div className="holding-list-bold-title">
                                    Not Assigned
                                  </div>
                                ) : (
                                  <div
                                    className="dashboard-assign"
                                    style={{
                                      cursor: "pointer",
                                      width: "fit-content",
                                    }}
                                    onClick={(e) => ApprovDisplay(e)}
                                  >
                                    <img
                                      src={assignIconCircle}
                                      alt="account Circle Purple"
                                    />{" "}
                                    Assign
                                  </div>
                                )}
                                {approverDropDown ===
                                  "openapproverdropdown" && (
                                  <div
                                    ref={approverDropDownRef}
                                    className="bottom-tool-tip"
                                    style={{ display: "block" }}
                                  >
                                    <div
                                      className="shadow-tooltip"
                                      style={{
                                        minHeight: "113px",
                                        maxHeight: "auto",
                                        height: "auto",
                                      }}
                                    >
                                      <div className="">
                                        <div className="tool-tip-head">
                                          <div className="add-Email border-bottom">
                                            <div class="form-group">
                                              <input
                                                type="text"
                                                class="form-control"
                                                placeholder="Enter name or email"
                                                value={selectedUser}
                                                onKeyPress={(e) =>
                                                  handleKeyDown(e)
                                                }
                                                onChange={(e) =>
                                                  handleAppSearch(
                                                    e.target.value
                                                  )
                                                }
                                              />
                                              {emailAvaliableCheck &&
                                                selectedUser !== "" && (
                                                  <div
                                                    className=""
                                                    style={{
                                                      color: "#ef5d5d",
                                                      paddingLeft: "7px",
                                                      position: "absolute",
                                                    }}
                                                  >
                                                    Email already exists
                                                  </div>
                                                )}
                                              {!validEmail && (
                                                <div
                                                  className=""
                                                  style={{
                                                    color: "#ef5d5d",
                                                    paddingLeft: "7px",
                                                    position: "absolute",
                                                  }}
                                                >
                                                  Please Enter valid Email
                                                </div>
                                              )}
                                            </div>
                                            <span className="or-devider">
                                              {" "}
                                              or
                                            </span>
                                            <button
                                              class="btn save-details assign-me"
                                              value="5"
                                              onClick={(e) => approvTaskToMe(e)}
                                            >
                                              Assign to me
                                            </button>
                                          </div>
                                        </div>
                                        <div
                                          className="email-list-box"
                                          style={{
                                            paddingBottom: "15px",
                                            maxHeight: "115px",
                                            height: "auto",
                                          }}
                                        >
                                          {allUser && allUser.length > 0 ? (
                                            allUser.map((user, index) => (
                                              <div
                                                className="email-list-row"
                                                key={index}
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                  handleChooseApprove(user)
                                                }
                                              >
                                                <span class="name-circle">
                                                  {getInitials(
                                                    user.UserName
                                                      ? user.UserName
                                                      : user.EmailID
                                                      ? user.EmailID
                                                      : null
                                                  )}
                                                </span>
                                                <span className="name-of-emailer">
                                                  {user.UserName
                                                    ? user.UserName
                                                    : ""}
                                                </span>
                                                <span className="last-email-box">
                                                  {user.EmailID}
                                                </span>
                                              </div>
                                            ))
                                          ) : (
                                            <span
                                              className="last-email-box email-list-row"
                                              style={{
                                                textAlign: "center",
                                                opacity: "inherit",
                                              }}
                                              onClick={() =>
                                                handleOnClickApproverBtn()
                                              }
                                            >
                                              {/* No records Available */}
                                              {selectedUser !== "" && (
                                                <div className="dropbox-add-line">
                                                  <img
                                                    src={plusIcon}
                                                    alt="account Circle Purple"
                                                  />
                                                  {selectedUser !== "" &&
                                                    `Invite '${selectedUser}' via email`}
                                                </div>
                                              )}

                                              {noRecords === true &&
                                                selectedUser === "" &&
                                                "No records Available"}
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    <div className="row">
                      <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                        <div className="holding-list-normal-title">
                          Due Date
                        </div>
                      </div>
                      <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                        <div className="holding-list-bold-title">
                          {moment(
                            currentOpenedTask && currentOpenedTask.due_date
                          ).format("DD MMM")}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                        <div className="holding-list-normal-title">
                          Deadline
                        </div>
                      </div>
                      <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                        <div className="holding-list-bold-title">
                          {moment(
                            currentOpenedTask && currentOpenedTask.deadline_date
                          ).format("DD MMM")}
                        </div>
                      </div>
                    </div>
                    {currentOpenedTask &&
                      currentOpenedTask.date_of_approval &&
                      currentOpenedTask.status === "Approved" &&
                      userDetails.UserType !== 4 && (
                        <div className="row">
                          <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                            <div className="holding-list-normal-title">
                              Approval Pending on
                            </div>
                          </div>
                          <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                            <div className="holding-list-bold-title">
                              {moment(currentOpenedTask.DateOfApproval).format(
                                "DD MMM  h:mm a"
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    {userDetails.UserType !== 4 && (
                      <div className="row">
                        {currentOpenedTask &&
                        currentOpenedTask.status !== "Assigned" ? (
                          <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                            <div className="holding-list-normal-title">
                              Status
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        {currentOpenedTask &&
                        currentOpenedTask.status !== "Assigned" ? (
                          <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                            <div className="holding-list-bold-title">
                              {currentOpenedTask && currentOpenedTask.status
                                ? currentOpenedTask.status ===
                                  "Approval Pending"
                                  ? moment(
                                      currentOpenedTask &&
                                        currentOpenedTask.deadline_date
                                    ).isBefore(today)
                                    ? "Not reviewed"
                                    : "Approval Pending"
                                  : currentOpenedTask.status === "Not Assigned"
                                  ? currentOpenedTask.status
                                  : currentOpenedTask.status === "Assigned"
                                  ? "Task Assigned"
                                  : currentOpenedTask.status === "Approved"
                                  ? "Task Approved"
                                  : currentOpenedTask.status === "Rejected"
                                  ? "Task Rejected"
                                  : null
                                : ""}
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    )}
                    {/* {userDetails.UserType !== 4 &&
                      currentOpenedTask &&
                      currentOpenedTask.ExReview === 1 && (
                        <div className="row">
                          <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                            <div className="holding-list-normal-title">
                              Expert Review Status
                            </div>
                          </div>
                          <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                            <div className="holding-list-bold-title">
                              {currentOpenedTask.ExStatus}
                            </div>
                          </div>
                        </div>
                      )} */}

                    {/* {completedDate &&
                      isTaskApproved &&
                      userDetails.UserType !== 4 && (
                        <div className="row">
                          <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                            <div className="holding-list-normal-title">
                              Approval Pending on
                            </div>
                          </div>
                          <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                            <div className="holding-list-bold-title">
                              {moment(completedDate).format("DD MMM  h:mm a")}
                            </div>
                          </div>
                        </div>
                      )} */}
                    {userDetails.UserType !== 4 &&
                      currentOpenedTask &&
                      currentOpenedTask.ExReview === 1 &&
                      currentOpenedTask.ReviewerEmailID !== "" &&
                      currentOpenedTask.ReviewerName !== "" &&
                      currentOpenedTask.ReviewerMobile && (
                        <div className="row">
                          <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                            <div className="holding-list-normal-title">
                              Contact Details
                            </div>
                          </div>
                          <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                            <div className="holding-list-bold-title">
                              {`${currentOpenedTask.ReviewerMobile} | ${currentOpenedTask.ReviewerEmailID}`}
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                </div>
                <div className="task-details-file-grid1">
                  <div className="d-flex">
                    <div className="tab-list-space">
                      {showFiles ? (
                        <div
                          className="file-title pointer"
                          onClick={() => {
                            setShowFiles(true);
                            setShowComments(false);
                            setShowHtoDoIt(false);
                            setShowReference(false);
                          }}
                        >
                          Files
                        </div>
                      ) : (
                        <div
                          className="file-title unActiveText-color pointer"
                          onClick={() => {
                            setShowFiles(true);
                            setShowComments(false);
                            setShowHtoDoIt(false);
                            setShowReference(false);
                          }}
                        >
                          Files
                        </div>
                      )}
                      {showFiles && (
                        <div className="file-title-progress col-5"></div>
                      )}
                    </div>
                    <div className="tab-list-space">
                      {showComments ? (
                        <div
                          className="file-title  pointer"
                          style={{ color: "#2c2738" }}
                          onClick={() => getComments()}
                        >
                          Comments
                        </div>
                      ) : (
                        <div
                          className="file-title unActiveText-color"
                          onClick={() => getComments()}
                        >
                          Comments
                        </div>
                      )}
                      {showComments && (
                        <div className="file-title-progress comments-progress-width"></div>
                      )}
                    </div>
                    <div className="tab-list-space">
                      {referenceShow ? (
                        <div
                          className="file-title  pointer"
                          style={{ color: "#2c2738" }}
                          onClick={() => {
                            _fetchReferenceSectionData("2");
                            setShowFiles(false);
                            setShowComments(false);
                            setShowReference(true);
                          }}
                        >
                          References
                        </div>
                      ) : (
                        <div
                          className="file-title unActiveText-color"
                          onClick={() => {
                            _fetchReferenceSectionData("2");
                            setShowFiles(false);
                            setShowComments(false);
                            setShowReference(true);
                          }}
                        >
                          References
                        </div>
                      )}
                      {referenceShow && (
                        <div className="file-title-progress comments-progress-width"></div>
                      )}
                    </div>
                  </div>
                </div>
                {referenceShow && (
                  <div className="11">
                    {referenceSectionData && referenceSectionData.length > 0 ? (
                      <div className="auto-scroll">
                        {referenceSectionData &&
                        referenceSectionData[0] &&
                        referenceSectionData[0].Linktype === "F" ? (
                          <div className="d-flex ">
                            <div className="pr-5 w-38">
                              <div className="file-upload-title file-img-width">
                                <img
                                  src={fileIcon}
                                  alt="file Icon"
                                  className="file-icon-box"
                                  value="aaaa"
                                />{" "}
                                {referenceSectionData &&
                                  referenceSectionData[0] &&
                                  referenceSectionData[0].Filename}
                              </div>
                            </div>
                            <div className="pr-5 w-62">
                              <a
                                target="_blank"
                                href={`${
                                  referenceSectionData[0] &&
                                  referenceSectionData[0].Fileloc /
                                    referenceSectionData[0] &&
                                  referenceSectionData[0].Filename
                                }`}
                                style={{ textDecoration: "none" }}
                                className="file-download-title pointer d-flex"
                              >
                                download
                                <span className="d-none d-md-block">
                                  &nbsp;file
                                </span>
                              </a>
                            </div>
                          </div>
                        ) : (
                          <div className="d-flex">
                            <div className="pr-5 w-38">
                              <div
                                className="file-upload-title file-img-width"
                                style={{ color: "#6c5dd3" }}
                              >
                                <img
                                  src={fileIcon}
                                  alt="file Icon"
                                  className="file-icon-box"
                                  value="aaaa"
                                />{" "}
                                {referenceSectionData &&
                                  referenceSectionData[0] &&
                                  referenceSectionData[0].Fileloc /
                                    referenceSectionData[0] &&
                                  referenceSectionData[0].Fileloc}
                              </div>
                            </div>
                            <div className="pr-5 w-62">
                              <a
                                href={`${
                                  referenceSectionData &&
                                  referenceSectionData[0] &&
                                  referenceSectionData[0].Fileloc /
                                    referenceSectionData[0] &&
                                  referenceSectionData[0].Filename
                                }`}
                                target="_blank"
                                style={{ textDecoration: "none" }}
                                className="file-download-title pointer d-flex"
                              >
                                view
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="no-files">No Files To View here</div>
                    )}
                  </div>
                )}
                {showFiles && (
                  <div className="file-grid-data">
                    {(user && user.UserType && user.UserType === 4) ||
                    (user && user.UserType && userDetails.UserType === 3) ||
                    (user && user.UserType && userDetails.UserType === 5) ? (
                      <>
                        {/* check here */}
                        {currentOpenedTask &&
                        currentOpenedTask.status &&
                        currentOpenedTask.status !== "Approved" &&
                        currentOpenedTask.status !== "Not Assigned" ? (
                          (user &&
                            user.UserType &&
                            user.UserType &&
                            userDetails.UserType === 4) ||
                          (user &&
                            user.UserType &&
                            userDetails.UserType === 3) ||
                          (user &&
                            user.UserType &&
                            userDetails.UserType === 5) ? (
                            <>
                              {" "}
                              <div className="row">
                                <div className="col-12 col-sm-4 col-md-4 col-xl-4">
                                  <div className="file-upload-title file-img-width">
                                    <div className="">
                                      <div className="file-upload-box">
                                        <div className="image-display">
                                          <Dropzone
                                            multiple={true}
                                            maxSize={26214400}
                                            accept=".png,.jpg,
                                        application/pdf,application/rtf,application/msword,image/bmp,
                                        application/vnd.ms-excel,image/tiff,image/tif,image/jpeg,
                                        application/ms-excel,
                                        .tiff,.pdf,.doc,.docx,
                                        .XLS,.xlsx,.CSV,.zip,.rar,.txt"
                                            onDrop={(acceptedFiles) =>
                                              handleSelectUploadFile(
                                                acceptedFiles
                                              )
                                            }
                                          >
                                            {({
                                              getRootProps,
                                              getInputProps,
                                            }) => (
                                              <div
                                                {...getRootProps({
                                                  className: "dropzone",
                                                })}
                                              >
                                                <div>
                                                  <input {...getInputProps()} />
                                                </div>
                                                <img
                                                  src={fileUploadIcon}
                                                  className="cloudImg"
                                                  alt="File Upload icon"
                                                />
                                                <div className="drag-drop-title text-center">
                                                  Drag and drop your files here
                                                </div>
                                                <div className="text-center">
                                                  Upload files
                                                </div>
                                              </div>
                                            )}
                                          </Dropzone>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : null
                        ) : null}

                        <div className="no-files">
                          {fileList && fileList.length > 0
                            ? fileList.map((files, index) => (
                                <div className="d-flex">
                                  <div className="pr-3">
                                    <div className="file-upload-title file-img-width">
                                      <img
                                        src={fileIcon}
                                        alt="file Icon"
                                        className="file-icon-box"
                                        value={files.file_name}
                                      />{" "}
                                      {files.file_name}
                                    </div>
                                  </div>
                                  <div className="pr-3">
                                    {currentOpenedTask &&
                                      currentOpenedTask.task_name !==
                                        undefined && (
                                        <a
                                          href={`data:application/${files.file_name
                                            .split(".")
                                            .pop()};base64,${
                                            files.encoded_string
                                          }`}
                                          style={{ textDecoration: "none" }}
                                          className="file-download-title pointer d-flex"
                                          download={files.file_name}
                                        >
                                          download{" "}
                                          <span className="d-none d-md-block">
                                            &nbsp;file
                                          </span>
                                        </a>
                                      )}
                                  </div>
                                  <div className="pr-3">
                                    <div
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        deleteUploadedFile(files.file_id)
                                      }
                                      className="file-download-title pointer d-flex"
                                    >
                                      <img
                                        className="delete-icon"
                                        src={deleteBlack}
                                        alt="delete Icon"
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))
                            : "No Files To View here"}
                        </div>
                      </>
                    ) : fileList && fileList.length > 0 ? (
                      fileList.map((file, index) => (
                        <div className="no-files">
                          {file && file.Files && file.Files.length > 0
                            ? file.Files.map((files, index) => (
                                <div className="row" key={files.file_id}>
                                  <div className="col-8 col-sm-4 col-md-4 col-xl-4">
                                    <div className="file-upload-title file-img-width">
                                      <img
                                        src={fileIcon}
                                        alt="file Icon"
                                        value={files.file_name}
                                      />{" "}
                                      {files.file_name}
                                    </div>
                                  </div>
                                  <div className="col-4 col-sm-8 col-md-8 col-xl-8">
                                    {currentOpenedTask &&
                                      currentOpenedTask.task_name !==
                                        undefined && (
                                        <a
                                          href={`data:application/${files.file_name
                                            .split(".")
                                            .pop()};base64,${
                                            files.encoded_string
                                          }`}
                                          style={{ textDecoration: "none" }}
                                          className="file-download-title pointer d-flex"
                                          download={files.file_name}
                                        >
                                          download{" "}
                                          <span className="d-none d-md-block">
                                            &nbsp;file
                                          </span>
                                        </a>
                                      )}
                                  </div>
                                </div>
                              ))
                            : "No Files To View here"}
                        </div>
                      ))
                    ) : (
                      <div className="no-files">No Filess To View here</div>
                    )}

                    {/* Task Actions (Approval, Rejection, Mark Complete) */}
                    {currentOpenedTask &&
                      (currentOpenedTask.status === "Assigned" ||
                        currentOpenedTask.status === "Rejected") &&
                      (userDetails.UserType === 3 ||
                        userDetails.UserType === 5) &&
                      user.EmailID !== "" && (
                        <button
                          style={{ marginTop: 10, width: 150 }}
                          onClick={() => teamMemberMarkComplete()}
                          className="btn save-details-bnt approve-task"
                          value="3"
                        >
                          Mark Complete
                        </button>
                      )}
                    {currentOpenedTask &&
                      currentOpenedTask.status === "Approval Pending" &&
                      (user.UserType === 3 || user.UserType === 5) &&
                      user.EmailID !== "" && (
                        <div class="btn-toolbar text-center well">
                          <div class="col-6 col-sm-2 col-md-2 col-xl-2 text-left pl-0">
                            <button
                              onClick={(e) => handleAppTask(currentOpenedTask)}
                              className="btn save-details-bnt approve-task"
                            >
                              approve task
                            </button>
                          </div>
                          <div class="col-6 col-sm-2 col-md-2 col-xl-2 text-left pl-45">
                            <button
                              className="btn save-details-bnt reject-task"
                              value="3"
                              onClick={() => setVisibleRejectTaskModal(true)}
                            >
                              reject Task
                            </button>
                          </div>
                        </div>
                      )}
                  </div>
                )}
                {showComments && (
                  <div className="file-grid-data blank-space-height">
                    {getCommentsbyId && getCommentsbyId.length > 0 ? (
                      getCommentsbyId.map((comment, index) => (
                        <div>
                          <div className="comment-box">
                            <div className="name-box">
                              {getInitials(
                                comment && comment.user_name
                                  ? comment.user_name
                                  : "No Username"
                              )}
                            </div>
                            <div className="rigt-box-comment">
                              <div className="d-flex">
                                <div className="right-box-text">
                                  {comment && comment.user_name
                                    ? comment.user_name
                                    : "No Username"}
                                </div>
                                <div className="days-ago">
                                  {moment(comment.commented_on).format(
                                    "DD MMM"
                                  )}
                                </div>
                              </div>
                              <div className="comment-desc">
                                {comment.content}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="no-comments">No Comments</div>
                    )}

                    <div className="comment-box">
                      <div className="name-box">
                        {getInitials(user && user.full_name)}
                      </div>
                      <div className="rigt-box-comment">
                        <div className="input-comment-box input-comment-boxLeft">
                          <TextareaAutosize
                            minRows={1.3}
                            style={{ overflow: "hidden" }}
                            type="text"
                            className="form-control textAreaHeight"
                            value={inputComment}
                            placeholder="Add a comment"
                            onChange={(e) => handleChange(e)}
                            required
                          />
                          <div className="inputIcon">
                            <img
                              src={inputRightArrow}
                              alt=""
                              style={{ cursor: "pointer" }}
                              onClick={() => submitComment()}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {showHtoDoIt && (
                  <div className="file-grid-data blank-space-height">
                    <h1>We Don't Know</h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <TaskDetailsView />
      </div>
    </>
  );
}

export default withRouter(RightSideGrid);
