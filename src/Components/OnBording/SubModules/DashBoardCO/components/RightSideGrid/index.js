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
function RightSideGrid({
  isTaskListOpen,
  setIsTaskListOpen,
  isTaskApproved,
  setIsTaskApproved,
  taskList,
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

  const [currentTaskData, setCurrentTaskData] = useState([]);
  const [currentDropDown, setCurrentDropDown] = useState("");
  const [fileList, setFileList] = useState([]);
  const [searchBoxShow, setsearchBoxShow] = useState(false);

  const [searchBoxShowMobile, setsearchBoxShowMobile] = useState(false);
  const [navigationHideShow, setNavigationHideShow] = useState(false);
  const [taskData, setTaskData] = useState([]);
  const [listTaskData, setListTaskData] = useState("");
  const [taskDataBackup, setTaskDataBackup] = useState([]);
  const [expandedFlags, setExpandedFlags] = useState([]);
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
  const taskModalOpenStatus =
    state &&
    state.adminMenu &&
    state.adminMenu &&
    state.adminMenu.openModalFlag;

  const currentFilterViewByRedux =
    state && state.adminMenu && state.adminMenu.currentFilterViewBy;
  const [
    isShowReAssignModalForTeamMember,
    setIsShowReAssignModalForTeamMember,
  ] = useState(false);
  const [isShowReAssignModalForApprover, setIsShowReAssignModalForApprover] =
    useState(false);
  const getTaskById =
    state &&
    state.taskReport &&
    state.taskReport.taskReportById &&
    state.taskReport.taskReportById.taskReportById;

  useEffect(() => {
    if (user && user.UserID !== undefined && userDetails.UserType === 4) {
      fetchMothTaskOnTrack();
    }
  }, []);

  useEffect(() => {
    if (taskModalOpenStatus === "board") {
      setDisplayTask("2");
      setTaskListDisplay("0");
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
    let task_id = state && state.adminMenu && state.adminMenu.taskID;
    if (task_id !== null && taskModalOpenStatus !== "") {
      getSelectTaskDetails();
    }
  }, [state.adminMenu.taskID]);

  useEffect(() => {
    if (currentFilterViewByRedux === "") {
      setCurrentBoardViewBy(currentFilterViewByRedux);
    }
  }, [currentFilterViewByRedux]);

  useEffect(() => {
    if (taskList != undefined && taskList.length > 0) {
      let tempArr = [];
      let tempRowCount = {};
      taskList.map((item) => {
        if (item.Details.length >= 1 && item.Details[0].TaskId != 0) {
          tempArr.push({ ...item });
          tempRowCount[item.Status.trim()] = 3;
        }
      });
      let sortedArray = tempArr.sort((a, b) => a.ORD - b.ORD);
      let task_id =
        state && state.NotificationRedu && state.NotificationRedu.taskID;
      if (task_id !== null && localStorage.allRowCount) {
        let getItemAllrow = localStorage.getItem("allRowCount");
        var personObject = JSON.parse(getItemAllrow);
        setRowCount(personObject);
      } else {
        setRowCount(tempRowCount);
      }
      setTaskData(sortedArray);
      setTaskDataBackup(sortedArray);
    }
  }, [taskList]);

  useEffect(() => {
    setAllUser([]);
    const ApproverUsers =
      state &&
      state.taskReport &&
      state.taskReport.getUserByRole &&
      state.taskReport.getUserByRole.getUserByRole;

    if (ApproverUsers != undefined) {
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
    const getTaskId = getTaskById;
    if (getTaskId) {
      const taskId = getTaskById.TaskId;

      const payload = {
        taskID: taskId,
        actionFlag: 0,
      };
      axios
        .post(`${BACKEND_BASE_URL}/api/getTaskFile`, payload)
        .then((response) => {
          let fileData = response.data;
          setFileList(fileData);
        })
        .catch((error) => {});
    }
  }, [getTaskById, uploadFile]);

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
  }, [getTaskById]);

  const innerSearch = useOuterClick((e) => {
    if (searchBoxShow) {
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

  useEffect(() => {
    if (taskListDisplay === "1") {
      const payload = {
        entityid: "",
        userID: user.UserID,
        usertype: user.UserType,
      };
      axios
        .post(`${BACKEND_BASE_URL}/api/getTaskReport`, payload)
        .then((response) => {
          let fileData = response.data;
          let tempArr = [];
          let tempRowCount = {};
          fileData.map((item) => {
            if (item.Details.length >= 1 && item.Details[0].TaskId != 0) {
              tempArr.push({ ...item });
              tempRowCount[item.Status.trim()] = 3;
            }
          });
          let sortedArray = tempArr.sort((a, b) => a.ORD - b.ORD);
          setRowCount(tempRowCount);
          setListTaskData(sortedArray);
        })
        .catch((error) => {
          console.log("error => ", error);
        });
    }
  }, [taskListDisplay]);

  const innerSearchMobile = useOuterClick((e) => {
    if (searchBoxShowMobile) {
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
    if (str != "" && str) {
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

  const _renderTaskViewModal = () => {
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
        <div className="">
          <div className="task-details-modal sddsdsdsd">
            <div className="task-details-header">
              <div className="closing-icon">
                <div className="task-details-title">
                  {getTaskById && getTaskById.EntityName}
                </div>
                <div
                  className="task-close-icon"
                  onClick={() => {
                    setIsTaskListOpen(false);
                    setExpandedFlags([]);
                    setShowFiles(true);
                    setShowComments(false);
                    setShowHtoDoIt(false);
                    setShowReference(false);
                    setIsTaskModalOpen(false);
                    dispatch(adminMenuActions.setCurrentBoardViewTaskId(null));
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
                {getTaskById && getTaskById.TaskName}{" "}
                <span className="nse-label d-none d-md-block">
                  {getTaskById && getTaskById.LicenseCode}
                </span>
              </div>

              <div className="d-flex d-block d-md-none">
                <span className="nse-label ml-0">
                  {getTaskById && getTaskById.LicenseCode}
                </span>
                <div
                  className="pink-label-mobile ml-0"
                  style={{
                    backgroundColor:
                      getTaskById && getTaskById.Status
                        ? getTaskById.Status === "Assign"
                          ? "#fcf3cd"
                          : getTaskById.Status === "Completed By User"
                          ? moment(
                              getTaskById && getTaskById.ActualTaskEndDate
                            ).isBefore(today)
                            ? "#cdfcd8"
                            : "#ffefea"
                          : getTaskById.Status === "Approved"
                          ? "#cdfcd8"
                          : getTaskById.Status === "Assigned"
                          ? "#ffefea"
                          : getTaskById.Status === "Request Rejected"
                          ? "#ffefea"
                          : "#d2fccd"
                        : "#d2fccd",
                  }}
                >
                  <div
                    className="approved-text"
                    style={{
                      color:
                        getTaskById && getTaskById.Status
                          ? getTaskById.Status === "Completed By User"
                            ? moment(
                                getTaskById && getTaskById.ActualTaskEndDate
                              ).isBefore(today)
                              ? "#7fba7a"
                              : "#ff5f31"
                            : getTaskById.Status === "Approved"
                            ? "#7fba7a"
                            : getTaskById.Status === "Assigned"
                            ? "#f8c102"
                            : getTaskById.Status === "Assign"
                            ? "#f8c102"
                            : getTaskById.Status === "Request Rejected"
                            ? "#ff5f31"
                            : ""
                          : "#fcf3cd",
                    }}
                  >
                    {getTaskById && getTaskById.Status && (
                      <div style={{ textTransform: "uppercase" }}>
                        {getTaskById.Status === "Completed By User"
                          ? moment(
                              getTaskById && getTaskById.ActualTaskEndDate
                            ).isBefore(today)
                            ? "Not reviewed"
                            : "Approval Pending"
                          : getTaskById.Status === "Assign"
                          ? "Assign Task"
                          : getTaskById.Status === "Assigned"
                          ? "Task Assigned"
                          : getTaskById.Status === "Approved"
                          ? "Task Approved"
                          : getTaskById.Status === "Request Rejected"
                          ? "Task Rejected"
                          : null}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-header d-none d-md-block">
                {getTaskById && getTaskById.Status !== "Assigned" && (
                  <div
                    className="approved-label"
                    style={{
                      backgroundColor:
                        getTaskById && getTaskById.Status
                          ? getTaskById.Status === "Assign"
                            ? "#fcf3cd"
                            : getTaskById.Status === "Completed By User"
                            ? moment(
                                getTaskById && getTaskById.ActualTaskEndDate
                              ).isBefore(today)
                              ? "#cdfcd8"
                              : "#ffefea"
                            : getTaskById.Status === "Approved"
                            ? "#cdfcd8"
                            : getTaskById.Status === "Assigned"
                            ? "#ffefea"
                            : getTaskById.Status === "Request Rejected"
                            ? "#ffefea"
                            : "#d2fccd"
                          : "#d2fccd",
                    }}
                  >
                    <div
                      className="approved-text"
                      style={{
                        color:
                          getTaskById && getTaskById.Status
                            ? getTaskById.Status === "Completed By User"
                              ? moment(
                                  getTaskById && getTaskById.ActualTaskEndDate
                                ).isBefore(today)
                                ? "#7fba7a"
                                : "#ff5f31"
                              : getTaskById.Status === "Approved"
                              ? "#7fba7a"
                              : getTaskById.Status === "Assigned"
                              ? "#f8c102"
                              : getTaskById.Status === "Assign"
                              ? "#f8c102"
                              : getTaskById.Status === "Request Rejected"
                              ? "#ff5f31"
                              : ""
                            : "#fcf3cd",
                      }}
                    >
                      {getTaskById && getTaskById.Status && (
                        <div style={{ textTransform: "uppercase" }}>
                          {getTaskById.Status === "Completed By User"
                            ? moment(
                                getTaskById && getTaskById.ActualTaskEndDate
                              ).isBefore(today)
                              ? "Not reviewed"
                              : "Approval Pending"
                            : getTaskById.Status === "Assign"
                            ? "Assign Task"
                            : getTaskById.Status === "Assigned"
                            ? "Task Assigned"
                            : getTaskById.Status === "Approved"
                            ? "Task Approved"
                            : getTaskById.Status === "Request Rejected"
                            ? "Task Rejected"
                            : null}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {getTaskById && getTaskById.RegulatoryUpdates === 1 && (
                <div className="row">
                  <div className="col-12">
                    <div className="regulation-changes">
                      <div className="float-left">
                        <img src={redCircle} alt="account Circle Purple" />
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
              <div className="task-detail-data">
                {userDetails.UserType != 4 && (
                  <div className="row">
                    <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                      <div className="holding-list-normal-title">
                        Assigned to
                      </div>
                    </div>
                    <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                      {getTaskById && getTaskById.AssignedTo != 0 ? (
                        <div className="holding-list-bold-title">
                          {getTaskById &&
                          getTaskById.AssignedToUserName === "" ? null : (
                            <span className="cicrcle-name">
                              {getInitials(
                                getTaskById && getTaskById.AssignedToUserName
                              )}
                            </span>
                          )}
                          {getTaskById && getTaskById.AssignedToUserName}
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
                                              handleAppSearch(e.target.value)
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
                                            selectedUser != "" && (
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
                                        <span className="or-devider">or </span>
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
                                          style={{ textAlign: "center" }}
                                        >
                                          No records Available
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
                {userDetails.UserType != 3 && (
                  <div className="row">
                    <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                      <div className="holding-list-normal-title">
                        Assigned by
                      </div>
                    </div>
                    <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                      <div className="holding-list-bold-title">
                        {getTaskById &&
                        getTaskById.AssignedFromUserName === "" ? null : (
                          <span className="cicrcle-name">
                            {getInitials(
                              getTaskById && getTaskById.AssignedFromUserName
                            )}
                          </span>
                        )}
                        {getTaskById && getTaskById.AssignedFromUserName}
                      </div>
                    </div>
                  </div>
                )}
                {userDetails.UserType != 5 && (
                  <div className="row">
                    <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                      <div className="holding-list-normal-title">Approver</div>
                    </div>
                    <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                      {getTaskById && getTaskById.ApproverName != "Assign" ? (
                        <div className="holding-list-bold-title">
                          {getTaskById &&
                          getTaskById.ApproverName === "" ? null : (
                            <span className="cicrcle-name">
                              {getInitials(
                                getTaskById && getTaskById.ApproverName
                              )}
                            </span>
                          )}
                          {getTaskById && getTaskById.ApproverName}
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
                            {approverDropDown === "openapproverdropdown" && (
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
                                            onKeyPress={(e) => handleKeyDown(e)}
                                            onChange={(e) =>
                                              handleAppSearch(e.target.value)
                                            }
                                          />
                                          {emailAvaliableCheck &&
                                            selectedUser != "" && (
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
                                        <span className="or-devider"> or</span>
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
                                          style={{ textAlign: "center" }}
                                        >
                                          No records Available
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
                    <div className="holding-list-normal-title">Due Date</div>
                  </div>
                  <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                    <div className="holding-list-bold-title">
                      {moment(getTaskById && getTaskById.EndDate).format(
                        "DD MMM"
                      )}
                    </div>
                  </div>
                </div>
                {userDetails.UserType != 4 && (
                  <div className="row">
                    <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                      <div className="holding-list-normal-title">Deadline</div>
                    </div>
                    <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                      <div className="holding-list-bold-title">
                        {moment(
                          getTaskById && getTaskById.ActualTaskEndDate
                        ).format("DD MMM")}
                      </div>
                    </div>
                  </div>
                )}
                {userDetails.UserType != 4 &&
                  getTaskById &&
                  getTaskById.Status !== "Assigned" && (
                    <div className="row">
                      <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                        <div className="holding-list-normal-title">Status</div>
                      </div>
                      <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                        <div className="holding-list-bold-title">
                          {getTaskById && getTaskById.Status
                            ? getTaskById.Status === "Completed By User"
                              ? moment(
                                  getTaskById && getTaskById.ActualTaskEndDate
                                ).isBefore(today)
                                ? "Not reviewed"
                                : "Approval Pending"
                              : getTaskById.Status === "Assign"
                              ? "Assign Task"
                              : getTaskById.Status === "Assigned"
                              ? "Task Assigned"
                              : getTaskById.Status === "Approved"
                              ? "Task Approved"
                              : getTaskById.Status === "Request Rejected"
                              ? "Task Rejected"
                              : null
                            : ""}
                        </div>
                      </div>
                    </div>
                  )}
                {completedDate && isTaskApproved && userDetails.UserType != 4 && (
                  <div className="row">
                    <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                      <div className="holding-list-normal-title">
                        Completed on
                      </div>
                    </div>
                    <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                      <div className="holding-list-bold-title">
                        {moment(completedDate).format("DD MMM  h:mm a")}
                      </div>
                    </div>
                  </div>
                )}
                {userDetails.UserType != 4 &&
                  getTaskById &&
                  getTaskById.ExStatus === 1 && (
                    <div className="row">
                      <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                        <div className="holding-list-normal-title">
                          Expert Review
                        </div>
                      </div>
                      <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                        <div className="holding-list-bold-title">Pending</div>
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
                    <div
                      className="file-title-progress col-5"
                      style={{ position: "inherit" }}
                    ></div>
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
              <div>
                {referenceSectionData && referenceSectionData.length > 0 ? (
                  <div>
                    {referenceSectionData &&
                    referenceSectionData[0] &&
                    referenceSectionData[0].Linktype === "F" ? (
                      <div className="d-flex">
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
                              referenceSectionData &&
                              referenceSectionData[0] &&
                              referenceSectionData[0].Fileloc /
                                referenceSectionData &&
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
                              referenceSectionData[0].Fileloc}
                          </div>
                        </div>
                        <div className="pr-5 w-62">
                          <a
                            href={`${
                              referenceSectionData &&
                              referenceSectionData[0] &&
                              referenceSectionData[0].Fileloc /
                                referenceSectionData &&
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
                  <div className="no-files"> No Files To View here </div>
                )}
              </div>
            )}
            {showFiles && (
              <div className="file-grid-data">
                {(user && user.UserType && user.UserType === 4) ||
                (user &&
                  user.UserType &&
                  (userDetails.UserType === 3 ||
                    userDetails.UserType === 5)) ? (
                  <>
                    {getTaskById &&
                    getTaskById.Status &&
                    getTaskById.Status === "Assigned" &&
                    getTaskById &&
                    getTaskById.Status &&
                    getTaskById.TaskStatus === 0
                      ? (user && user.UserType && user.UserType === 4) ||
                        ((user && user.UserType && user.UserType === 3) ||
                        user.UserType === 5 ? (
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
                        ) : null)
                      : null}

                    {fileList && fileList.length > 0 ? (
                      fileList.map((file, index) => (
                        <div className="no-files">
                          {file && file.Files && file.Files.length > 0
                            ? file.Files.map((files, index) => (
                                <div className="d-flex">
                                  <div className="pr-3">
                                    <div className="file-upload-title file-img-width">
                                      <img
                                        src={fileIcon}
                                        alt="file Icon"
                                        className="file-icon-box"
                                        value={files.TaskFileId}
                                      />{" "}
                                      {files.FileName}
                                    </div>
                                  </div>
                                  <div className="pr-3">
                                    {getTaskById &&
                                      getTaskById.TaskId !== undefined && (
                                        <a
                                          target="_blank"
                                          href={`${BACKEND_BASE_URL}/viewfiles.ashx?id=${getTaskById.TaskId}&flag=downloadtaskfiles&file=${files.FileName}`}
                                          style={{ textDecoration: "none" }}
                                          className="file-download-title pointer d-flex"
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
                                      onClick={() => deleteFile(files)}
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
                      ))
                    ) : (
                      <div className="no-files">No Files To View here</div>
                    )}
                  </>
                ) : fileList && fileList.length > 0 ? (
                  fileList.map((file, index) => (
                    <div className="no-files">
                      {file && file.Files && file.Files.length > 0
                        ? file.Files.map((files, index) => (
                            <div className="row">
                              <div className="col-8 col-sm-4 col-md-4 col-xl-4">
                                <div className="file-upload-title file-img-width">
                                  <img
                                    src={fileIcon}
                                    alt="file Icon"
                                    value={files.TaskFileId}
                                  />{" "}
                                  {files.FileName}
                                </div>
                              </div>
                              <div className="col-4 col-sm-8 col-md-8 col-xl-8">
                                {getTaskById &&
                                  getTaskById.TaskId !== undefined && (
                                    <a
                                      target="_blank"
                                      href={`${BACKEND_BASE_URL}/viewfiles.ashx?id=${getTaskById.TaskId}&flag=downloadtaskfiles&file=${files.FileName}`}
                                      style={{ textDecoration: "none" }}
                                      className="file-download-title pointer d-flex"
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
                  <div className="no-files">No Files To View here</div>
                )}

                {(getTaskById &&
                  getTaskById.Status &&
                  getTaskById.Status === "Approved") ||
                (getTaskById &&
                  getTaskById.Status &&
                  getTaskById.TaskStatus === 1) ? (
                  (user && user.UserType && user.UserType === 3) ||
                  user.UserType === 4 ||
                  user.UserType === 5
                ) : getTaskById &&
                  getTaskById.Status &&
                  getTaskById.Status === "Assigned" &&
                  getTaskById &&
                  getTaskById.Status &&
                  getTaskById.TaskStatus === 0 ? (
                  user && user.UserType && user.UserType === 4 ? (
                    <button
                      style={{ marginTop: 10, width: 150 }}
                      onClick={() => teamMemberMarkComplete()}
                      className="btn save-details-bnt approve-task"
                      value="3"
                    >
                      Mark Complete
                    </button>
                  ) : (
                    ""
                  )
                ) : getTaskById &&
                  getTaskById.Status &&
                  getTaskById.Status === "Assign" &&
                  getTaskById &&
                  getTaskById.Status &&
                  getTaskById.TaskStatus === 0 ? (
                  ""
                ) : getTaskById &&
                  getTaskById.Status &&
                  getTaskById.Status === "Request Rejected" &&
                  getTaskById &&
                  getTaskById.Status &&
                  getTaskById.TaskStatus === 3 ? (
                  user &&
                  user.UserType &&
                  user.UserType === 4 && (
                    <button
                      style={{ marginTop: 10, width: 150 }}
                      onClick={() => teamMemberMarkComplete()}
                      className="btn save-details-bnt approve-task"
                      value="3"
                    >
                      Mark Complete
                    </button>
                  )
                ) : (getTaskById &&
                    getTaskById.Status &&
                    getTaskById.Status === "Completed By User") ||
                  (getTaskById &&
                    getTaskById.Status &&
                    getTaskById.TaskStatus === 4) ? (
                  (user && user.UserType && user.UserType === 3) ||
                  (user && user.UserType && user.UserType === 5) ? (
                    <div class="btn-toolbar text-center well">
                      <div class="col-6 col-sm-2 col-md-2 col-xl-2 text-left pl-0">
                        <button
                          onClick={(e) => handleAppTask(getTaskById)}
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
                  ) : (
                    ""
                  )
                ) : (
                  ""
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
                            comment &&
                              comment.B &&
                              comment.B[0] &&
                              comment.B[0].UserName &&
                              comment.B[0].UserName != ""
                              ? comment.B[0].UserName
                              : "No Username"
                          )}
                        </div>
                        <div className="rigt-box-comment">
                          <div className="d-flex">
                            <div className="right-box-text">
                              {comment &&
                              comment.B &&
                              comment.B[0] &&
                              comment.B[0].UserName &&
                              comment.B[0].UserName != ""
                                ? comment.B[0].UserName
                                : "No Username"}
                            </div>
                            <div className="days-ago">
                              {moment(comment.CommentOn).format("DD MMM")}
                            </div>
                          </div>
                          <div className="comment-desc">{comment.Comment}</div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-comments">No Comments</div>
                )}

                <div className="comment-box">
                  <div className="name-box">
                    {getInitials(user && user.UserName)}
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
      </Modal>
    );
  };
  const getAllFile = () => {
    if (getTaskById != undefined) {
      const taskId = getTaskById.TaskId;
      const payload = {
        taskID: taskId,
        actionFlag: 0,
      };
      axios
        .post(`${BACKEND_BASE_URL}/api/getTaskFile`, payload)
        .then((response) => {
          let fileData = response.data;
          setFileList(fileData);
        })
        .catch((error) => {
          console.log("error => ", error);
        });
    }
  };

  const deleteFile = (file) => {
    if (userDetails.UserType === 4) {
      const payload = {
        taskID: 0,
        TaskFileId: file.TaskFileId,
        actionFlag: 3,
      };
      axios
        .post(`${BACKEND_BASE_URL}/api/getTaskFile`, payload)
        .then((response) => {
          if (
            response &&
            response.data &&
            response.data[0] &&
            response.data[0].Status === "Deleted"
          ) {
            getAllFile();
            toast.success("File deleted successfully");
          } else {
            toast.error("Error in the deleting file !!!");
          }
        })
        .catch((error) => {});
    }
  };

  const submitModal = () => {
    let id = getTaskById.TaskId;
    dispatch(
      taskReportActions.taskAssignByTaskID({
        taskID: id,
        userType: 1,
        email: "",
        invitee: "",
        isApproved: 3,
        loginID: userDetails.UserID,
        userDetails: userDetails,
      })
    );
    dispatch(
      taskReportActions.postTaskCommentByTaskID({
        actionFlag: 1, //Action Flag
        taskID: getTaskById.TaskId, //TaskID
        comment: rejectTaskInput,
        commentBy: user.UserID, //UserID
        link: 0,
      })
    );
    setRejectTaskInputComment("");
    setVisibleRejectTaskModal(false);
    toast.success("Task rejected successfully");
  };

  const teamMemberMarkComplete = () => {
    let taskId = getTaskById.TaskId;
    dispatch(
      taskReportActions.taskAssignByTaskID({
        taskID: taskId,
        userType: 1,
        email: "",
        invitee: "",
        isApproved: 4, //Compeleted by user
        userDetails: userDetails,
        loginID: userDetails.UserID,
      })
    );
    toast.success("Task completed successfully");
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

  const _fetchReferenceSectionData = (type) => {
    let taskID = null;
    let task_id_bv = state && state.adminMenu && state.adminMenu.taskID;
    let task_id_cal =
      state && state.adminMenu && state.adminMenu.taskIDByCalendarView;
    let task_id =
      state && state.NotificationRedu && state.NotificationRedu.taskID;

    if (task_id !== null) {
      taskID = task_id;
    } else if (task_id_bv !== null) {
      taskID = task_id_bv;
    } else if (task_id_cal !== null) {
      taskID = task_id_cal;
    } else {
      taskID = getTaskById && getTaskById.TaskId;
    }
    if (taskID !== null) {
      axios
        .post(`${BACKEND_BASE_URL}/api/Circular`, {
          taskID: taskID,
          taskFileID: 0,
          actionFlag: 0,
        })
        .then((response) => {
          if (
            response &&
            response.data &&
            response.data[0] &&
            response.data[0].status !== "False"
          ) {
            if (type === "1") {
              setRecentRegulationData(response.data);
            } else if (type === "2") {
              setReferenceSectionData(response.data);
            } else {
              setReferenceSectionData([]);
              setRecentRegulationData([]);
            }
          } else {
            setReferenceSectionData([]);
            setRecentRegulationData([]);
          }
        })
        .catch((err) => {
          console.log("error =>  ", err);
        });
    }
  };
  const getSelectTaskDetails = (e) => {
    setShowFiles(true);
    setShowComments(false);
    setCurrentDropDown("");

    let taskID = null;
    let task_id_bv = state && state.adminMenu && state.adminMenu.taskID;
    let task_id_cal =
      state && state.adminMenu && state.adminMenu.taskIDByCalendarView;

    let task_id =
      state && state.NotificationRedu && state.NotificationRedu.taskID;

    if (task_id !== null && e === undefined) {
      if (localStorage.expandedFlagss) {
        let getItem = localStorage.getItem("expandedFlagss");
        let getItemArr = getItem && getItem.split(",");
        const nuevo =
          getItemArr &&
          getItemArr.length > 0 &&
          getItemArr.map((i) => Number(i));
        if (nuevo !== null) {
          setExpandedFlags([...nuevo]);
        }
      }

      taskID = task_id;
      setIsTaskListOpen(true);
      setCurrentTaskData(task_id);
    } else if (task_id_bv !== null && e === undefined) {
      setIsTaskModalOpen(true);
      taskID = task_id_bv;
      setCurrentTaskData(task_id_bv);
    } else if (task_id_cal !== null && e === undefined) {
      setIsTaskModalOpen(true);
      taskID = task_id_cal;
      setCurrentTaskData(taskID);
    } else {
      taskID = e.TaskId;
      setCurrentTaskData(e);
      setIsTaskListOpen(true);
    }
    dispatch(
      taskReportActions.taskReportByIdRequest({
        taskID: taskID,
      })
    );
  };

  const getApproveUsers = () => {
    dispatch(
      taskReportActions.userByRoleRequest({
        coUserId: user.UserID,
        ecoUserId: "",
        coUserType: 5,
      })
    );
  };

  const getUserDetail = (e) => {
    dispatch(
      taskReportActions.userByRoleRequest({
        coUserId: user.UserID,
        ecoUserId: "",
        coUserType: 4,
      })
    );
  };

  const handleChange = (e) => {
    setInputComment(e.target.value);
  };

  const submitComment = () => {
    dispatch(
      taskReportActions.postTaskCommentByTaskID({
        actionFlag: 1, //Action Flag
        taskID: getTaskById.TaskId, //TaskID
        comment: inputComment,
        commentBy: user.UserID, //UserID
        link: 0,
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
        taskid: getTaskById.TaskId,
        ftype: 0,
      })
    );
  };

  const getUpload = (file) => {
    let url = "";
    if (currentTaskData && currentTaskData.TaskId) {
      url = `${BACKEND_BASE_URL}/api/UploadFile?Taskid=${currentTaskData.TaskId}&Userid=${userDetails.UserID}&ftype=0`;
    } else {
      url = `${BACKEND_BASE_URL}/api/UploadFile?Taskid=${currentTaskData}`;
    }
    var formData = [];
    formData = new FormData();
    for (var i = 0; i < file.length; i++) {
      formData.append("file", file[i]);
    }
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    console.log(url, formData, config);
    return post(url, formData, config);
  };

  const handleSelectUploadFile = (file) => {
    const _fileList = (fileList && fileList[0] && fileList[0].Files) || [];
    var isPresent = false;
    let fileArray = [];
    file.forEach((file) => {
      isPresent = _fileList.some(function (el) {
        return el.FileName === file.name;
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
    getUpload(fileArray).then((response) => {
      toast.success("File Upload Successfully");
      setUploadFile("");
      getAllFile();
    });
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

  const handleAppTask = (getTaskById) => {
    let taskId = getTaskById.TaskId;
    dispatch(
      taskReportActions.taskAssignByTaskID({
        taskID: taskId,
        isApproved: 1, //Approve Task
        userType: 1,
        email: "",
        invitee: "",
        loginID: userDetails.UserID,
        userDetails: userDetails,
      })
    );

    toast.success("Task approved !!!");
  };

  const handleChooseApprove = (data) => {
    let approvEmail = data.EmailID;
    let id = getTaskById.TaskId;
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
    let id = getTaskById.TaskId;
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
      .post(`${BACKEND_BASE_URL}/api/availabilityCheck`, {
        loginID: selectedUser,
        loginty: "AdminEmail",
      })
      .then((response) => {
        if (response && response.data && response.data.Status === "True") {
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
      .post(`${BACKEND_BASE_URL}/api/availabilityCheck`, {
        loginID: selectedUser,
        loginty: "AdminEmail",
      })
      .then((response) => {
        if (response && response.data && response.data.Status === "True") {
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
    let id = getTaskById.TaskId;
    dispatch(
      taskReportActions.taskAssignByTaskID({
        taskID: id,
        email: selectedUser,
        userType: 4,
        invitee: user.EmailID,
        isApproved: 0,
        loginID: userDetails.UserID,
      })
    );
    setSelectedUser("");
  };

  const handleApproveTask = (e) => {
    let id = getTaskById.TaskId;
    dispatch(
      taskReportActions.taskAssignByTaskID({
        taskID: id,
        email: selectedUser,
        userType: 5,
        invitee: user.EmailID,
        isApproved: 0,
        loginID: userDetails.UserID,
      })
    );
    setSelectedUser("");
  };

  const AssignTaskToMe = (e) => {
    let id = getTaskById.TaskId;
    dispatch(
      taskReportActions.taskAssignByTaskID({
        taskID: id,
        email: user.EmailID,
        userType: 4,
        invitee: user.EmailID,
        isApproved: 0,
        userDetails: userDetails,
        loginID: userDetails.UserID,
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
    let id = getTaskById.TaskId;
    dispatch(
      taskReportActions.taskAssignByTaskID({
        taskID: id,
        email: user.EmailID,
        userType: 5,
        invitee: user.EmailID,
        isApproved: 0,
        loginID: userDetails.UserID,
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
    dispatch(
      taskReportActions.taskAssignByTaskID({
        taskID: taskId,
        isApproved: 1, //Approve Task
        userType: 1,
        email: "",
        invitee: "",
        loginID: userDetails.UserID,
      })
    );
    setTimeout(() => {
      dispatch(
        taskReportActions.taskReportRequest({
          entityid: "",
          userID: userDetails.UserID,
          usertype: userDetails.UserType,
        })
      );
    }, 1000);
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
    if (searchText != "") {
      taskList &&
        taskList.forEach((obj1) => {
          obj1.Details.forEach((obj2) => {
            if (obj2.TaskName !== "Norec") {
              if (
                obj2.TaskName.toLowerCase().includes(
                  searchText.toLowerCase()
                ) ||
                obj2.EntityName.toLowerCase().includes(
                  searchText.toLowerCase()
                ) ||
                obj2.LicenseCode.toLowerCase().includes(
                  searchText.toLowerCase()
                ) ||
                obj2.AssignedName.toLowerCase().includes(
                  searchText.toLowerCase()
                )
              ) {
                let task = { Status: obj1.Status, data: obj2 };
                tempArr.push(task);
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
        onClick={(e) => getSelectTaskDetails(task)}
      >
        {listType === 1 && Status === "overdue" && (
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
                <span class="all-companies-nse-label">{task.LicenseCode}</span>
              </div>
              <span className="pink-label-title-right">
                <div
                  className="overdue-title"
                  onClick={(e) => getSelectTaskDetails(task)}
                >
                  {task.TaskName}
                </div>
                <div
                  className={
                    Status === "overdue"
                      ? "red-week d-block d-md-none"
                      : "black-week d-block d-md-none"
                  }
                  style={{ cursor: "pointer" }}
                  onClick={(e) => getSelectTaskDetails(task)}
                >
                  <div className="d-block d-md-none">
                    {getDayDate(task.EndDate, 2)}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {task && task.Status && task.Status !== "Assigned" && (
                      <span
                        className="pink-label-text "
                        style={{
                          backgroundColor:
                            task && task.Status
                              ? task.Status === "Assign"
                                ? "#fcf3cd"
                                : task.Status === "Completed By User"
                                ? moment(task.ActualTaskEndDate).isBefore(today)
                                  ? "#cdfcd8"
                                  : "#ffefea"
                                : task.Status === "Approved"
                                ? "#cdfcd8"
                                : task.Status === "Assigned"
                                ? "#ffefea"
                                : task.Status === "Request Rejected"
                                ? "#ffefea"
                                : "#d2fccd"
                              : "#d2fccd",
                          color:
                            task && task.Status
                              ? task.Status === "Completed By User"
                                ? moment(task.ActualTaskEndDate).isBefore(today)
                                  ? "#7fba7a"
                                  : "#ff5f31"
                                : task.Status === "Approved"
                                ? "#7fba7a"
                                : task.Status === "Assigned"
                                ? "#f8c102"
                                : task.Status === "Assign"
                                ? "#f8c102"
                                : task.Status === "Request Rejected"
                                ? "#ff5f31"
                                : ""
                              : "#fcf3cd",
                        }}
                      >
                        {task.Status && task.Status === "Completed By User"
                          ? moment(task.ActualTaskEndDate).isBefore(today)
                            ? "Not reviewed"
                            : "Approval Pending"
                          : task.Status === "Assign"
                          ? "Assign Task"
                          : task.Status === "Assigned"
                          ? "Task Assigned"
                          : task.Status === "Approved"
                          ? "Task Approved"
                          : task.Status === "Request Rejected"
                          ? "Task Rejected"
                          : ""}
                      </span>
                    )}
                  </div>
                </div>

                {task.Status && (
                  <p
                    className="pink-label-text d-none d-md-block"
                    style={{
                      backgroundColor:
                        task && task.Status
                          ? task.Status === "Assign"
                            ? "#fcf3cd"
                            : task.Status === "Completed By User"
                            ? moment(task.ActualTaskEndDate).isBefore(today)
                              ? "#cdfcd8"
                              : "#ffefea"
                            : task.Status === "Approved"
                            ? "#cdfcd8"
                            : task.Status === "Assigned"
                            ? "#ffefea"
                            : task.Status === "Request Rejected"
                            ? "#ffefea"
                            : "#d2fccd"
                          : "#d2fccd",
                      color:
                        task && task.Status
                          ? task.Status === "Completed By User"
                            ? moment(task.ActualTaskEndDate).isBefore(today)
                              ? "#7fba7a"
                              : "#ff5f31"
                            : task.Status === "Approved"
                            ? "#7fba7a"
                            : task.Status === "Assigned"
                            ? "#f8c102"
                            : task.Status === "Assign"
                            ? "#f8c102"
                            : task.Status === "Request Rejected"
                            ? "#ff5f31"
                            : ""
                          : "#fcf3cd",
                    }}
                  >
                    {task.Status && task.Status === "Completed By User"
                      ? moment(task.ActualTaskEndDate).isBefore(today)
                        ? "Not reviewed"
                        : "Approval Pending"
                      : task.Status === "Assign"
                      ? "Assign Task"
                      : task.Status === "Assigned"
                      ? "Task Assigned"
                      : task.Status === "Approved"
                      ? "Task Approved"
                      : task.Status === "Request Rejected"
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
            {task.EntityName}
          </div>
        </div>
        <div
          className="col-2 col-md-2 col-sm-2 col-xl-2 d-none d-md-block"
          style={{ cursor: "pointer" }}
          onClick={(e) => getSelectTaskDetails(task)}
        >
          {task.AssignedTo != 0 ? (
            <div className="d-flex">
              {userDetails.UserType === 4 ? (
                task.ApproverName === "Assign" ? null : (
                  <div className="circle-name d-none d-md-block">
                    <div className="circle-text">
                      {userDetails.UserType === 4 &&
                        getInitials(task.ApproverName)}
                    </div>
                  </div>
                )
              ) : (
                <div className="circle-name d-none d-md-block">
                  <div className="circle-text">
                    {getInitials(task.AssignedName)}
                  </div>
                </div>
              )}
              {userDetails.UserType === 4 ? (
                <div className="circle-front-text d-none d-md-block">
                  {task.ApproverName === "Assign"
                    ? "No Approver"
                    : task.ApproverName}
                </div>
              ) : (
                <div className="circle-front-text d-none d-md-block">
                  {_getAssignedName(task.AssignedName)}
                </div>
              )}
            </div>
          ) : (
            <div>
              <div
                className="circle-front-text NoStatus"
                style={{ color: "#6c5dd3" }}
              >
                {" "}
                <img src={assignIconCircle} alt="" /> ASSIGN
              </div>
            </div>
          )}
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
                {getDayDate(task.EndDate, 1)}
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
                {task.AssignedTo !== 0 && (
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
                        {_getAssignedName(task.AssignedName)}
                      </span>
                    </div>
                  </div>
                )}
                {task.AssignedTo === 0 && (
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
          getTaskById && task.TaskId === getTaskById.TaskId
            ? " row active-action-card-sidebar "
            : "row action-card-sidebar"
        }
        onClick={(e) => getSelectTaskDetails(task)}
        style={{ cursor: "pointer" }}
      >
        <div className="col-10">
          <div className="all-companies-sub-title">
            <div className="graybox-left">
              <span className="all-companies-nse-label">
                {task.LicenseCode}
              </span>{" "}
            </div>
            <div
              className="pink-label-title-right"
              onClick={(e) => getSelectTaskDetails(task)}
            >
              <div className="overdue-title-sidebar-title pl-1">
                {task.TaskName}
              </div>
              <div
                className="red-week  date-font pl-1"
                style={{ cursor: "pointer" }}
              >
                {getDayDate(task.EndDate, 2)}
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
                onClick={(e) => getSelectTaskDetails(task)}
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
    const payload = {
      entityid: "0",
      userID: userDetails.UserID,
      usertype: userDetails.UserType,
    };
    axios
      .post(`${BACKEND_BASE_URL}/api/DashBoardAnalytics`, payload)
      .then((response) => {
        if (response && response.data && response.data.length > 0) {
          let completedtask = response.data[0].CompletedTask;
          setCompletedTask(completedtask);
          let scheduledTask = response.data[0].SchedulededTask;
          setScheduledTask(scheduledTask);
        }
      })
      .catch((error) => {});
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
      {isTaskModalOpen && _renderTaskViewModal()}
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
                          Completed
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
              Tasks
            </div>
            {!searchBoxShowMobile && (
              <div className="w-75 d-flex pl-0">
                <div className="companies-sub-title d-block d-md-none">
                  Tasks
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
            {searchValue != "" && (
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
              <span className="take-action d-none d-md-block">
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
            {searchValue != "" && (
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
                    return <>{renderTaskList(task.data, task.Status, 2)}</>;
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
                    <div className="take-action">
                      <div className="task-list-grid">
                        {item.Status.trim() === "overdue" && (
                          <div
                            className="action-title upcoming-btn"
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
                              {item.Details.length}
                            </p>
                            {!expandedFlags.includes(index) ? (
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
                        {item.Status.trim() === "Pending" && (
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
                                  {item.Details.length}
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
                        {(item.Status.trim() === "Upcoming" ||
                          item.Status.trim() === "Completed") && (
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
                                item.Status.trim() === "Upcoming"
                                  ? "upcoming-title"
                                  : "complete-title"
                              }
                            >
                              {item.Status.trim() === "Upcoming"
                                ? "Upcoming"
                                : "Completed"}
                              <span
                                className={
                                  item.Status.trim() === "Upcoming"
                                    ? "black-circle"
                                    : "green-circle"
                                }
                              >
                                <p className="black-circle-text">
                                  {item.Details.length}
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
                        {(item.Status.trim() === "Upcoming"
                          ? expandedFlags.includes(index)
                          : item.Status.trim() === "Completed"
                          ? expandedFlags.includes(index)
                          : item.Status.trim() === "overdue"
                          ? !expandedFlags.includes(index)
                          : item.Status.trim() === "Pending"
                          ? !expandedFlags.includes(index)
                          : expandedFlags.includes(index)) && (
                          <>
                            {item.Details.slice(
                              0,
                              rowCount[item.Status.trim()]
                            ).map((task) => {
                              return (
                                <>
                                  {renderTaskList(task, item.Status.trim(), 1)}
                                </>
                              );
                            })}
                            <div>
                              {item.Details.length > 3 && (
                                <>
                                  {rowCount[item.Status.trim()] > 3 && (
                                    <div
                                      onClick={() =>
                                        showLessMore(item.Status, 3)
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
                                  {rowCount[item.Status.trim()] === 3 && (
                                    <div
                                      onClick={() =>
                                        showLessMore(
                                          item.Status,
                                          item.Details.length
                                        )
                                      }
                                      className="viewAll"
                                      style={{ width: "fit-content" }}
                                    >
                                      View All ({item.Details.length - 3} MORE)
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
              <CompanyTaskList user={user} sideBarTaskList={false} />
            )}
            {searchValue === "" && taskListDisplay === "3" && (
              <LicenseTaskList user={user} sideBarTaskList={false} />
            )}
            {searchValue === "" && taskListDisplay === "4" && (
              <AssigneList user={user} sideBarTaskList={false} />
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
                                <div className="this-Month ">Completed</div>
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
                      {searchValue != "" && (
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
                      </ul>
                    </span>
                  </div>
                )}

                <div className="take-action">
                  {searchValue != "" && (
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
                              {renderSidebarTaskList(task.data, task.Status, 2)}
                            </>
                          );
                        })}
                    </div>
                  )}
                  {searchValue === "" &&
                    taskListDisplay === "1" &&
                    taskData &&
                    taskData.length > 0 &&
                    taskData.map((item, index) => {
                      return (
                        <>
                          <div className="task-list-grid">
                            {item.Status.trim() === "overdue" && (
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
                                    {item.Details.length}
                                  </p>
                                </span>
                                {!expandedFlags.includes(index) ? (
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
                            {item.Status.trim() === "Pending" && (
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
                                      {item.Details.length}
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
                            {(item.Status.trim() === "Upcoming" ||
                              item.Status.trim() === "Completed") && (
                              <div
                                className={
                                  item.Status.trim() === "Upcoming"
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
                                    item.Status.trim() === "Upcoming"
                                      ? "upcoming-title"
                                      : "complete-title"
                                  }
                                >
                                  {item.Status.trim() === "Upcoming"
                                    ? "Upcoming"
                                    : "Completed"}
                                  <span
                                    className={
                                      item.Status.trim() === "Upcoming"
                                        ? "black-circle"
                                        : "green-circle"
                                    }
                                  >
                                    <p className="black-circle-text">
                                      {item.Details.length}
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
                            {(item.Status.trim() === "Upcoming"
                              ? expandedFlags.includes(index)
                              : item.Status.trim() === "Completed"
                              ? expandedFlags.includes(index)
                              : item.Status.trim() === "overdue"
                              ? !expandedFlags.includes(index)
                              : item.Status.trim() === "Pending"
                              ? !expandedFlags.includes(index)
                              : expandedFlags.includes(index)) && (
                              <>
                                {item.Details.slice(
                                  0,
                                  rowCount[item.Status.trim()]
                                ).map((task) => {
                                  return (
                                    <>
                                      {renderSidebarTaskList(
                                        task,
                                        item.Status.trim(),
                                        1
                                      )}
                                    </>
                                  );
                                })}
                                <div>
                                  {item.Details.length > 3 && (
                                    <>
                                      <div className="sidebar-btn">
                                        {rowCount[item.Status.trim()] > 3 && (
                                          <div
                                            onClick={() =>
                                              showLessMore(item.Status, 3)
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
                                        {rowCount[item.Status.trim()] === 3 && (
                                          <div
                                            onClick={() =>
                                              showLessMore(
                                                item.Status,
                                                item.Details.length
                                              )
                                            }
                                            className="viewAll"
                                          >
                                            View All ({item.Details.length - 3}{" "}
                                            )
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
                        getTaskById={getTaskById}
                      />
                    </>
                  )}
                  {searchValue === "" && taskListDisplay === "3" && (
                    <LicenseTaskList
                      user={user}
                      sideBarTaskList={true}
                      getTaskById={getTaskById}
                    />
                  )}
                  {searchValue === "" && taskListDisplay === "4" && (
                    <AssigneList
                      user={user}
                      sideBarTaskList={true}
                      getTaskById={getTaskById}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isTaskListOpen && (
        <div className="row ">
          <ReAssignTasksModal
            openModal={isShowReAssignModalForTeamMember}
            setShowModal={setIsShowReAssignModalForTeamMember}
            userId={getTaskById && getTaskById.AssignedTo}
            taskId={getTaskById && getTaskById.TaskId}
            isSingleTask
          />
          <ReAssignTasksModal
            openModal={isShowReAssignModalForApprover}
            setShowModal={setIsShowReAssignModalForApprover}
            userId={getTaskById && getTaskById.AprovalAssignedToID}
            taskId={getTaskById && getTaskById.TaskId}
            isSingleTask
          />
          <div className="col-12 right-side-bar">
            <div className="">
              <div className="task-details-veiw scroll-remove-file">
                <div className="task-details-header">
                  <div className="closing-icon">
                    <div className="task-details-title">
                      {getTaskById && getTaskById.EntityName}
                    </div>
                    <div
                      className="task-close-icon"
                      onClick={() => {
                        setIsTaskListOpen(false);
                        setShowFiles(true);
                        setShowComments(false);
                        setShowHtoDoIt(false);
                        setShowReference(false);
                        setExpandedFlags([]);
                        dispatch(notificationActions.setTaskID(null));
                      }}
                    >
                      <img src={closeBlack} alt="Arrow close" />
                    </div>
                  </div>
                  <div className="task-details-sub-title">
                    {getTaskById && getTaskById.TaskName}{" "}
                    <span className="nse-label d-none d-md-block">
                      {getTaskById && getTaskById.LicenseCode}
                    </span>
                  </div>

                  <div className="d-flex d-block d-md-none">
                    <span className="nse-label ml-0">
                      {getTaskById && getTaskById.LicenseCode}
                    </span>
                    <div
                      className="pink-label-mobile ml-0"
                      style={{
                        backgroundColor:
                          getTaskById && getTaskById.Status
                            ? getTaskById.Status === "Assign"
                              ? "#fcf3cd"
                              : getTaskById.Status === "Completed By User"
                              ? moment(
                                  getTaskById && getTaskById.ActualTaskEndDate
                                ).isBefore(today)
                                ? "#cdfcd8"
                                : "#ffefea"
                              : getTaskById.Status === "Approved"
                              ? "#cdfcd8"
                              : getTaskById.Status === "Assigned"
                              ? "#ffefea"
                              : getTaskById.Status === "Request Rejected"
                              ? "#ffefea"
                              : "#d2fccd"
                            : "#d2fccd",
                      }}
                    >
                      <div
                        className="approved-text"
                        style={{
                          color:
                            getTaskById && getTaskById.Status
                              ? getTaskById.Status === "Completed By User"
                                ? moment(
                                    getTaskById && getTaskById.ActualTaskEndDate
                                  ).isBefore(today)
                                  ? "#7fba7a"
                                  : "#ff5f31"
                                : getTaskById.Status === "Approved"
                                ? "#7fba7a"
                                : getTaskById.Status === "Assigned"
                                ? "#f8c102"
                                : getTaskById.Status === "Assign"
                                ? "#f8c102"
                                : getTaskById.Status === "Request Rejected"
                                ? "#ff5f31"
                                : ""
                              : "#fcf3cd",
                        }}
                      >
                        {getTaskById && getTaskById.Status && (
                          <div style={{ textTransform: "uppercase" }}>
                            {getTaskById.Status === "Completed By User"
                              ? moment(
                                  getTaskById && getTaskById.ActualTaskEndDate
                                ).isBefore(today)
                                ? "Not reviewed"
                                : "Approval Pending"
                              : getTaskById.Status === "Assign"
                              ? "Assign Task"
                              : getTaskById.Status === "Assigned"
                              ? "Task Assigned"
                              : getTaskById.Status === "Approved"
                              ? "Task Approved"
                              : getTaskById.Status === "Request Rejected"
                              ? "Task Rejected"
                              : null}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="border-header d-none d-md-block">
                    {getTaskById && (
                      <div
                        className="approved-label"
                        style={{
                          backgroundColor:
                            getTaskById && getTaskById.Status
                              ? getTaskById.Status === "Assign"
                                ? "#fcf3cd"
                                : getTaskById.Status === "Completed By User"
                                ? moment(
                                    getTaskById && getTaskById.ActualTaskEndDate
                                  ).isBefore(today)
                                  ? "#cdfcd8"
                                  : "#ffefea"
                                : getTaskById.Status === "Approved"
                                ? "#cdfcd8"
                                : getTaskById.Status === "Assigned"
                                ? "#ffefea"
                                : getTaskById.Status === "Request Rejected"
                                ? "#ffefea"
                                : "#d2fccd"
                              : "#d2fccd",
                        }}
                      >
                        <div
                          className="approved-text"
                          style={{
                            color:
                              getTaskById && getTaskById.Status
                                ? getTaskById.Status === "Completed By User"
                                  ? moment(
                                      getTaskById && getTaskById.EndDate
                                    ).isBefore(today)
                                    ? "#7fba7a"
                                    : "#ff5f31"
                                  : getTaskById.Status === "Approved"
                                  ? "#7fba7a"
                                  : getTaskById.Status === "Assigned"
                                  ? "#f8c102"
                                  : getTaskById.Status === "Assign"
                                  ? "#f8c102"
                                  : getTaskById.Status === "Request Rejected"
                                  ? "#ff5f31"
                                  : ""
                                : "#fcf3cd",
                          }}
                        >
                          {getTaskById && getTaskById.Status && (
                            <div style={{ textTransform: "uppercase" }}>
                              {getTaskById.Status === "Completed By User"
                                ? moment(
                                    getTaskById && getTaskById.ActualTaskEndDate
                                  ).isBefore(today)
                                  ? "Not reviewed"
                                  : "Approval Pending"
                                : getTaskById.Status === "Assign"
                                ? "Assign Task"
                                : getTaskById.Status === "Assigned"
                                ? "Task Assigned"
                                : getTaskById.Status === "Approved"
                                ? "Task Approved"
                                : getTaskById.Status === "Request Rejected"
                                ? "Task Rejected"
                                : null}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="task-detail-data">
                    {getTaskById && getTaskById.RegulatoryUpdates === 1 && (
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
                    {userDetails.UserType != 4 && (
                      <div className="row">
                        <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                          <div className="holding-list-normal-title">
                            Assigned to
                          </div>
                        </div>
                        <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                          {getTaskById && getTaskById.AssignedTo != 0 ? (
                            <div
                              className="holding-list-bold-title"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                setIsShowReAssignModalForTeamMember(true)
                              }
                            >
                              {getTaskById &&
                              getTaskById.AssignedToUserName === "" ? null : (
                                <span className="cicrcle-name">
                                  {getInitials(
                                    getTaskById &&
                                      getTaskById.AssignedToUserName
                                  )}
                                </span>
                              )}
                              {getTaskById && getTaskById.AssignedToUserName}
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
                                                selectedUser != "" && (
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
                    {userDetails.UserType !== 3 && (
                      <div className="row">
                        <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                          <div className="holding-list-normal-title">
                            Assigned by
                          </div>
                        </div>
                        <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                          <div className="holding-list-bold-title">
                            {getTaskById &&
                            getTaskById.AssignedFromUserName === "" ? null : (
                              <span className="cicrcle-name">
                                {getInitials(
                                  getTaskById &&
                                    getTaskById.AssignedFromUserName
                                )}
                              </span>
                            )}
                            {getTaskById && getTaskById.AssignedFromUserName}
                          </div>
                        </div>
                      </div>
                    )}
                    {userDetails.UserType != 5 && (
                      <div className="row">
                        <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                          <div className="holding-list-normal-title">
                            Approver
                          </div>
                        </div>
                        <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                          {getTaskById &&
                          getTaskById.ApproverName != "Assign" ? (
                            <div
                              className="holding-list-bold-title"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                setIsShowReAssignModalForApprover(true)
                              }
                            >
                              {getTaskById &&
                              getTaskById.ApproverName === "" ? null : (
                                <span className="cicrcle-name">
                                  {getInitials(
                                    getTaskById && getTaskById.ApproverName
                                  )}
                                </span>
                              )}
                              {getTaskById && getTaskById.ApproverName}
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
                                                selectedUser != "" && (
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
                          {moment(getTaskById && getTaskById.EndDate).format(
                            "DD MMM"
                          )}
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
                            getTaskById && getTaskById.ActualTaskEndDate
                          ).format("DD MMM")}
                        </div>
                      </div>
                    </div>
                    {userDetails.UserType != 4 && (
                      <div className="row">
                        {getTaskById && getTaskById.Status !== "Assigned" ? (
                          <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                            <div className="holding-list-normal-title">
                              Status
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        {getTaskById && getTaskById.Status !== "Assigned" ? (
                          <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                            <div className="holding-list-bold-title">
                              {getTaskById && getTaskById.Status
                                ? getTaskById.Status === "Completed By User"
                                  ? moment(
                                      getTaskById &&
                                        getTaskById.ActualTaskEndDate
                                    ).isBefore(today)
                                    ? "Not reviewed"
                                    : "Approval Pending"
                                  : getTaskById.Status === "Assign"
                                  ? "Assign Task"
                                  : getTaskById.Status === "Assigned"
                                  ? "Task Assigned"
                                  : getTaskById.Status === "Approved"
                                  ? "Task Approved"
                                  : getTaskById.Status === "Request Rejected"
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
                    {userDetails.UserType != 4 &&
                      getTaskById &&
                      getTaskById.ExStatus === 1 && (
                        <div className="row">
                          <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                            <div className="holding-list-normal-title">
                              Expert Review
                            </div>
                          </div>
                          <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                            <div className="holding-list-bold-title">
                              Pending
                            </div>
                          </div>
                        </div>
                      )}
                    {completedDate &&
                      isTaskApproved &&
                      userDetails.UserType != 4 && (
                        <div className="row">
                          <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                            <div className="holding-list-normal-title">
                              Completed on
                            </div>
                          </div>
                          <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                            <div className="holding-list-bold-title">
                              {moment(completedDate).format("DD MMM  h:mm a")}
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
                    (user &&
                      user.UserType &&
                      (userDetails.UserType === 3 ||
                        userDetails.UserType === 5)) ? (
                      <>
                        {/* check here */}
                        {getTaskById &&
                        getTaskById.Status &&
                        getTaskById.TaskStatus !== 1 &&
                        // (getTaskById.Status === "Assigned" ||
                        // getTaskById.Status === "Request Rejected") &&
                        (getTaskById.TaskStatus === 0 ||
                          getTaskById.TaskStatus === 3 ||
                          getTaskById.TaskStatus === 4) ? (
                          (user && user.UserType && user.UserType === 4) ||
                          (user &&
                            user.UserType &&
                            (userDetails.UserType === 3 ||
                              userDetails.UserType === 5)) ? (
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

                        {fileList && fileList.length > 0 ? (
                          fileList.map((file, index) => (
                            <div className="no-files">
                              {file && file.Files && file.Files.length > 0
                                ? file.Files.map((files, index) => (
                                    <div className="d-flex">
                                      <div className="pr-3">
                                        <div className="file-upload-title file-img-width">
                                          <img
                                            src={fileIcon}
                                            alt="file Icon"
                                            className="file-icon-box"
                                            value={files.TaskFileId}
                                          />{" "}
                                          {files.FileName}
                                        </div>
                                      </div>
                                      <div className="pr-3">
                                        {getTaskById &&
                                          getTaskById.TaskId !== undefined && (
                                            <a
                                              target="_blank"
                                              href={`${BACKEND_BASE_URL}/viewfiles.ashx?id=${getTaskById.TaskId}&flag=downloadtaskfiles&file=${files.FileName}`}
                                              style={{ textDecoration: "none" }}
                                              className="file-download-title pointer d-flex"
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
                                          onClick={() => deleteFile(files)}
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
                          ))
                        ) : (
                          <div className="no-files">No Files To View here</div>
                        )}
                      </>
                    ) : fileList && fileList.length > 0 ? (
                      fileList.map((file, index) => (
                        <div className="no-files">
                          {file && file.Files && file.Files.length > 0
                            ? file.Files.map((files, index) => (
                                <div className="row">
                                  <div className="col-8 col-sm-4 col-md-4 col-xl-4">
                                    <div className="file-upload-title file-img-width">
                                      <img
                                        src={fileIcon}
                                        alt="file Icon"
                                        value={files.TaskFileId}
                                      />{" "}
                                      {files.FileName}
                                    </div>
                                  </div>
                                  <div className="col-4 col-sm-8 col-md-8 col-xl-8">
                                    {getTaskById &&
                                      getTaskById.TaskId !== undefined && (
                                        <a
                                          href={`${BACKEND_BASE_URL}/viewfiles.ashx?id=${getTaskById.TaskId}&flag=downloadtaskfiles&file=${files.FileName}`}
                                          style={{ textDecoration: "none" }}
                                          className="file-download-title pointer d-flex"
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
                      <div className="no-files">No Files To View here</div>
                    )}

                    {user.UserType !== 4 &&
                    moment(
                      getTaskById && getTaskById.ActualTaskEndDate
                    ).isBefore(today) === true ? (
                      ""
                    ) : (getTaskById &&
                        getTaskById.Status &&
                        getTaskById.Status === "Approved") ||
                      (getTaskById &&
                        getTaskById.Status &&
                        getTaskById.TaskStatus === 1) ? (
                      (user &&
                        user.UserType &&
                        (userDetails.UserType === 3 ||
                          userDetails.UserType === 5)) ||
                      user.UserType === 4 ||
                      (user.UserType === 5 && " ")
                    ) : getTaskById &&
                      getTaskById.Status &&
                      getTaskById.Status === "Assigned" &&
                      getTaskById &&
                      getTaskById.Status &&
                      getTaskById.TaskStatus === 0 ? (
                      (user && user.UserType && user.UserType === 4) ||
                      (user && user.UserType && user.UserType === 3) ? (
                        <button
                          style={{ marginTop: 10, width: 150 }}
                          onClick={() => teamMemberMarkComplete()}
                          className="btn save-details-bnt approve-task"
                          value="3"
                        >
                          Mark Complete
                        </button>
                      ) : (
                        ""
                      )
                    ) : getTaskById &&
                      getTaskById.Status &&
                      getTaskById.Status === "Assign" &&
                      getTaskById &&
                      getTaskById.Status &&
                      getTaskById.TaskStatus === 0 ? (
                      ""
                    ) : getTaskById &&
                      getTaskById.Status &&
                      getTaskById.Status === "Request Rejected" &&
                      getTaskById &&
                      getTaskById.Status &&
                      getTaskById.TaskStatus === 3 ? (
                      user &&
                      user.UserType &&
                      user.UserType === 4 && (
                        <button
                          style={{ marginTop: 10, width: 150 }}
                          onClick={() => teamMemberMarkComplete()}
                          className="btn save-details-bnt approve-task"
                          value="3"
                        >
                          Mark Complete
                        </button>
                      )
                    ) : (getTaskById &&
                        getTaskById.Status &&
                        getTaskById.Status === "Completed By User") ||
                      (getTaskById &&
                        getTaskById.Status &&
                        getTaskById.TaskStatus === 4) ? (
                      (user && user.UserType && user.UserType === 3) ||
                      (user && user.UserType && user.UserType === 5) ? (
                        <div class="btn-toolbar text-center well">
                          <div class="col-6 col-sm-2 col-md-2 col-xl-2 text-left pl-0">
                            <button
                              onClick={(e) => handleAppTask(getTaskById)}
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
                      ) : (
                        ""
                      )
                    ) : (
                      ""
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
                                comment &&
                                  comment.B &&
                                  comment.B[0] &&
                                  comment.B[0].UserName &&
                                  comment.B[0].UserName != ""
                                  ? comment.B[0].UserName
                                  : "No Username"
                              )}
                            </div>
                            <div className="rigt-box-comment">
                              <div className="d-flex">
                                <div className="right-box-text">
                                  {comment &&
                                  comment.B &&
                                  comment.B[0] &&
                                  comment.B[0].UserName &&
                                  comment.B[0].UserName != ""
                                    ? comment.B[0].UserName
                                    : "No Username"}
                                </div>
                                <div className="days-ago">
                                  {moment(comment.CommentOn).format("DD MMM")}
                                </div>
                              </div>
                              <div className="comment-desc">
                                {comment.Comment}
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
                        {getInitials(user && user.UserName)}
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
