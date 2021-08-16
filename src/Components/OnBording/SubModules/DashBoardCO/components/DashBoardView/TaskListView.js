import React, { useState, useEffect, useRef, useCallback } from "react";
import "./style.css";
import "../BoardView/style.css";
import Modal from "react-awesome-modal";
import AssigneList from "./component/AssignedView.js";
import CompanyTaskList from "./component/companyList.js";
import LicenseTaskList from "./component/LicenseTaskList.js";
import { Link } from "react-router-dom";
import { useDropdownOuterClick } from "../RightSideGrid/dropdownOuterClick";
import redArrowTop from "../../../../../../assets/Icons/redArrowTop.png";
import togglemobile from "../../../../../../assets/Icons/togglemobile.png";
import keyboardArrowRightBlack from "../../../../../../assets/Icons/keyboardArrowRightBlack.png";
import downArrow from "../../../../../../assets/Icons/downArrow.png";

import upArrow from "../../../../../../assets/Icons/topArrowAccordian.png";
import RedLine from "../../../../../../assets/Icons/RedLine.png";
import { isMobile } from "react-device-detect";
import assignIconCircle from "../../../../../../assets/Icons/assignIconCircle.png";
import viewAllArow from "../../../../../../assets/Icons/viewAllArow.png";
import viewAllArowTop from "../../../../../../assets/Icons/viewAllArowTop.png";
import closeIconGray from "../../../../../../assets/Icons/closeIconGray.png";
import searchIcon from "../../../../../../assets/Icons/searchIcon.png";
import { toast } from "react-toastify";
import moment from "moment";
import { useOuterClick } from "../RightSideGrid/outerClick.js";
import { BACKEND_BASE_URL } from "../../../../../../apiServices/baseurl";
import { useSelector, useDispatch, connect } from "react-redux";
import { actions as taskReportActions } from "../../redux/actions";
import MobileLeftSidebar from "../MobileLeftSidebar";
import axios, { post } from "axios";
import { withRouter } from "react-router-dom";

import BoardView from "../BoardView/index";
import dropdownBottomArrow from "../../../../../../assets/Icons/dropdownBottomArrow.png";
import dropdownCheckIcon from "../../../../../../assets/Icons/dropdownCheckIcon.png";

import RiskAndDelaysTaskList from "./component/RiskAndDelaysTaskList";
import PendingAction from "./component/PendingAction";
import View from "../../../../../CalenderView/View";
import { setNotificationTaskId } from "../notification/Redux/Action";

function RightSideGrid({
  isTaskListOpen,
  taskList,
  user,
  click,
  setClick,
  setListView,
}) {
  const searchInput = useRef(null);

  const [openBoardDrD, setOpenBoardDrp] = useState(false);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [currentBoardViewBy, setCurrentBoardViewBy] = useState("status");

  const [completedDate, setCompletedDate] = useState("");

  const [showFiles, setShowFiles] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [showHtoDoIt, setShowHtoDoIt] = useState(false);

  const [approverDropDown, setApproverDropDown] = useState("");
  const [inputComment, setInputComment] = useState("");
  const [rejectTaskInput, setRejectTaskInputComment] = useState("");
  const [uploadFile, setUploadFile] = useState();
  const [visibleRejectTaskModal, setVisibleRejectTaskModal] = useState(false);

  const [allUser, setAllUser] = useState([]);
  const [allUserBackup, setAllUserBackup] = useState([]);

  const [selectedUser, setSelectedUser] = useState("");

  const [currentTaskData, setCurrentTaskData] = useState([]);
  const [currentDropDown, setCurrentDropDown] = useState("");
  const [fileList, setFileList] = useState([]);
  const [searchBoxShow, setsearchBoxShow] = useState(false);

  const [searchBoxShowMobile, setsearchBoxShowMobile] = useState(false);

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
  const [assignRowCount, setAssignRowCount] = useState([]);
  const [taskListDisplay, setTaskListDisplay] = useState("1");
  const [displayTask, setDisplayTask] = useState("1");
  const [mobileViewBy, setMobileViewBy] = useState(false);

  const getTaskById =
    state &&
    state.taskReport &&
    state.taskReport.taskReportById &&
    state.taskReport.taskReportById.taskReportById;

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
      setRowCount(tempRowCount);
      setTaskData(sortedArray);
      setTaskDataBackup(sortedArray);
    }
  }, [taskList]);

  useEffect(() => {
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
        .catch((error) => {});
    }
  }, [taskListDisplay]);

  const innerRefDrop = useDropdownOuterClick((e) => {
    if (openBoardDrD === true && !e.target.id.includes("dropDown")) {
      setOpenBoardDrp(false);
    }
  });
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

  const innerSearchMobile = useOuterClick((e) => {
    if (searchBoxShowMobile) {
      setsearchBoxShowMobile(false);
      setSearchValue("");
    }
  });

  const innerRef = useOuterClick((e) => {
    if (
      (currentDropDown !== "open" && !e.target.id.includes("assignBtn")) ||
      (currentDropDown === "open" && e.target.id == "")
    ) {
      setCurrentDropDown("");
      setSelectedUser("");
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
      } else if (names.length == 1) {
        initials = names[0].substring(0, 2).toUpperCase();
      }
    }
    return initials;
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
    toast.success("Mark completed  successfully");
  };

  const handleChangeRejectTaskComment = (e) => {
    e.preventDefault();
    setRejectTaskInputComment(e.target.value);
  };

  const renderRejectTaskModal = () => {
    return (
      <Modal
        onClickAway={() => setVisibleRejectTaskModal(false)}
        visible={visibleRejectTaskModal}
        width="373px"
        height="265px"
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

  const getSelectTaskDetails = (e) => {
    setShowFiles(true);
    setShowComments(false);
    setExpandedFlags([]);
    setCurrentTaskData(e);
    let taskID = null;
    let task_id = null;

    if (task_id !== null && e === undefined) {
      taskID = task_id;
    } else {
      taskID = e.TaskId;
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
      })
    );
    setInputComment("");
  };

  const getComments = () => {
    setShowFiles(false);
    setShowComments(true);
    setShowHtoDoIt(false);

    dispatch(
      taskReportActions.taskCommentsByTaskIdRequest({
        taskid: getTaskById.TaskId,
      })
    );
  };

  const getUpload = (file) => {
    const url = `${BACKEND_BASE_URL}/api/UploadFile?Taskid=${currentTaskData.TaskId}`;
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
    if (approverDropDown == "") {
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
    setEmailAvaliableCheck(false);
    setSelectedUser(searchText);
    let temp = [];
    if (searchText == "") {
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
        console.log("inside resposnse => ", response);
        if (response && response.data && response.data.Status === "True") {
          setEmailAvaliableCheck(true);
        } else {
          setEmailAvaliableCheck(false);
          handleAssignToTask(event);
        }
      })
      .catch((err) => {});
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleCheckEmailAvailability(event);
    }
  };

  const handleAssignKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCheckAssignToEmailAvailability(e);
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

  const _getAssignedName = (name) => {
    let str = "";
    if (name.length < 11) {
      str = name;
    } else {
      str = `${name.slice(0, 9)}...`;
    }
    return str;
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
    setsearchBoxShow(false);
    setsearchBoxShowMobile(false);
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
  const AssignShowLessMore = (status, count) => {
    let tempRowCnt = { ...assignRowCount };
    tempRowCnt[status.trim()] = count;
    setAssignRowCount(tempRowCnt);
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
    if (dateObj.toLocaleDateString() == today.toLocaleDateString()) {
      return "Today";
    } else if (dateObj.toLocaleDateString() == yesterday.toLocaleDateString()) {
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
  useEffect(() => {
    searchInput.current && searchInput.current.focus();
  }, [searchBoxShow]);

  function handleFocus() {
    setsearchBoxShow(true);
    searchInput.current && searchInput.current.focus();
  }

  const renderTaskList = (task, Status, listType) => {
    return (
      <Link
        to="/dashboard"
        style={{ textDecoration: "none" }}
        onClick={() => {
          if (userDetails && userDetails.UserType !== 6) {
            dispatch(setNotificationTaskId(task.TaskId));
            localStorage.setItem(
              "expandedFlagss",
              expandedFlags,
              "allRowCount-copy",
              rowCount
            );
            localStorage.setItem("allRowCount", JSON.stringify(rowCount));
          }
        }}
        style={{
          pointerEvents: `${
            userDetails && userDetails.UserType === 6 ? "none" : "auto"
          }`,
        }}
      >
        <div
          className="row"
          style={{ marginBottom: "15px", position: "relative" }}
        >
          {listType === 1 && Status === "overdue" && (
            <div className="redWidth">
              <div className="redLine">
                {" "}
                <img src={RedLine} alt="" />
              </div>
            </div>
          )}
          <div className="col-10 col-md-5 col-sm-5 col-xl-5">
            <div className="all-companies-sub-title new-task-list">
              <div
                onClick={(e) => getSelectTaskDetails(task)}
                style={{ cursor: "pointer", display: "flex" }}
              >
                <div class="graybox-left">
                  <span class="all-companies-nse-label">
                    {task.LicenseCode}
                  </span>
                </div>
                <span className="pink-label-title-right">
                  <div className="overdue-title">{task.TaskName}</div>
                  <div
                    className={
                      Status === "overdue"
                        ? "red-week d-block d-sm-none"
                        : "black-week d-block d-sm-none"
                    }
                    style={{ cursor: "pointer" }}
                    onClick={(e) => getSelectTaskDetails(task)}
                  >
                    <div className="d-block d-sm-none">
                      {getDayDate(task.EndDate, 2)}
                    </div>
                  </div>
                  {task.Status !== "Assigned" && (
                    <p
                      className="pink-label-text d-none d-sm-block"
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
                          ? "NOT REVIEWED"
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
          <div className="col-2 col-md-2 col-sm-2 col-xl-2 d-none d-sm-block">
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
            className="col-2 col-md-3 col-sm-3 col-xl-3 d-none d-sm-block"
            style={{ cursor: "pointer" }}
            onClick={(e) => getSelectTaskDetails(task)}
          >
            {task.AssignedTo != 0 ? (
              <div className="d-flex new-task-list">
                {userDetails.UserType === 4 ? (
                  task.ApproverName === "Assign" ? null : (
                    <div className="circle-name d-none d-sm-block">
                      <div className="circle-text">
                        {userDetails.UserType === 4 &&
                          getInitials(task.ApproverName)}
                      </div>
                    </div>
                  )
                ) : (
                  <div className="circle-name d-none d-sm-block">
                    <div className="circle-text">
                      {getInitials(task.AssignedName)}
                    </div>
                  </div>
                )}

                {userDetails.UserType === 4 ? (
                  <div className="circle-front-text d-none d-sm-block">
                    {task.ApproverName === "Assign"
                      ? "No Approver"
                      : task.ApproverName}
                  </div>
                ) : (
                  <div className="circle-front-text d-none d-sm-block mail">
                    {_getAssignedName(task.AssignedName)}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="circle-front-text NoStatus">
                  {" "}
                  <img src={assignIconCircle} alt="" /> ASSIGN
                </div>
              </div>
            )}
          </div>
          <div className="col-2">
            <div className="align-right task-list-new">
              <div className="d-flex">
                <div
                  className={
                    Status === "overdue"
                      ? "red-week d-none d-sm-block"
                      : "black-week d-none d-sm-block"
                  }
                  style={{ cursor: "pointer" }}
                  onClick={(e) => getSelectTaskDetails(task)}
                >
                  {getDayDate(task.EndDate, 1)}
                </div>
                <div
                  className="right-arrow-week text-right-grid"
                  onClick={(e) => getSelectTaskDetails(task)}
                >
                  {
                    <img
                      className="d-none d-sm-block"
                      src={keyboardArrowRightBlack}
                      alt="Right Arrow"
                    />
                  }
                  {task.AssignedTo !== 0 && (
                    <img
                      className="d-block d-sm-none"
                      src={keyboardArrowRightBlack}
                      alt="Right Arrow"
                    />
                  )}
                  {showUserToolTip === `Tooltip${task.TaskId}` && (
                    <div className="toolTip-input">
                      <div className="tooltiptext1 mobDisplaynone">
                        <span className="font-normal-text1">
                          {task.AssignedName}
                        </span>
                      </div>
                    </div>
                  )}
                  {task.AssignedTo === 0 && (
                    <div className="only-mobile-assign-add d-block d-sm-none">
                      <div
                        className="assign-user-icon"
                        onMouseOver={() =>
                          setShowUserToolTip(`Tooltip${task.TaskId}`)
                        }
                        onMouseOut={() => setShowUserToolTip("")}
                      >
                        <img
                          src={assignIconCircle}
                          className="d-block d-sm-none"
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
      </Link>
    );
  };

  const renderCompanyTaskList = (task, Status, listType) => {
    return (
      <div
        className="row"
        style={{ marginBottom: "15px", position: "relative" }}
      >
        {listType === 1 && Status === "overdue" && (
          <div className="redWidth">
            <div className="redLine">
              {" "}
              <img src={RedLine} alt="" />
            </div>
          </div>
        )}
        <div className="col-10 col-md-6 col-sm-6 col-xl-6">
          <div className="all-companies-sub-title">
            <div
              onClick={(e) => getSelectTaskDetails(task)}
              style={{ cursor: "pointer" }}
            >
              <div class="graybox-left">
                <span class="all-companies-nse-label">{task.LicenseCode}</span>
              </div>
              <span className="pink-label-title-right">
                <div className="overdue-title">{task.TaskName}</div>
                <div
                  className={
                    Status === "overdue"
                      ? "red-week d-block d-sm-none"
                      : "black-week d-block d-sm-none"
                  }
                  style={{ cursor: "pointer" }}
                  onClick={(e) => getSelectTaskDetails(task)}
                >
                  <div className="d-block d-sm-none">
                    {getDayDate(task.EndDate, 2)}
                  </div>
                </div>
                {task.Status !== "Assigned" && (
                  <p
                    className="pink-label-text d-none d-sm-block"
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
                        ? "NOT REVIEWED"
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
        <div className="col-2 col-md-2 col-sm-2 col-xl-2 d-none d-sm-block">
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
          className="col-2 col-md-2 col-sm-2 col-xl-2 "
          style={{ cursor: "pointer" }}
          onClick={(e) => getSelectTaskDetails(task)}
        >
          {task.AssignedTo != 0 ? (
            <div className="" z style={{ display: "none" }}>
              {userDetails.UserType === 4 ? (
                task.ApproverName === "Assign" ? null : (
                  <div className="circle-name d-none d-sm-block">
                    <div className="circle-text">
                      {userDetails.UserType === 4 &&
                        getInitials(task.ApproverName)}
                    </div>
                  </div>
                )
              ) : (
                <div className="circle-name d-none d-sm-block">
                  <div className="circle-text" style={{ display: "none" }}>
                    {getInitials(task.AssignedName)}
                  </div>
                </div>
              )}
              {userDetails.UserType === 4 ? (
                <div className="circle-front-text d-none d-sm-block">
                  {task.ApproverName === "Assign"
                    ? "No Approver"
                    : task.ApproverName}
                </div>
              ) : (
                <div className="circle-front-text d-none d-sm-block">
                  {task.AssignedName}
                </div>
              )}
            </div>
          ) : (
            <div>
              <div
                className="circle-front-text NoStatus"
                style={{ color: "#6c5dd3", display: "none" }}
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
                    ? "red-week d-none d-sm-block"
                    : "black-week d-none d-sm-block"
                }
                style={{ cursor: "pointer" }}
                onClick={(e) => getSelectTaskDetails(task)}
              >
                {getDayDate(task.EndDate, 1)}
              </div>
              <div
                className="right-arrow-week text-right-grid"
                onClick={(e) => getSelectTaskDetails(task)}
              >
                {
                  <img
                    className="d-none d-sm-block"
                    src={keyboardArrowRightBlack}
                    alt="Right Arrow"
                  />
                }
                {task.AssignedTo !== 0 && (
                  <img
                    className="d-block d-sm-none"
                    src={keyboardArrowRightBlack}
                    alt="Right Arrow"
                  />
                )}
                {showUserToolTip === `Tooltip${task.TaskId}` && (
                  <div className="toolTip-input">
                    <div className="tooltiptext1 mobDisplaynone">
                      <span className="font-normal-text1">
                        {task.AssignedName}
                      </span>
                    </div>
                  </div>
                )}
                {task.AssignedTo === 0 && (
                  <div className="only-mobile-assign-add d-block d-sm-none">
                    <div
                      className="assign-user-icon"
                      onMouseOver={() =>
                        setShowUserToolTip(`Tooltip${task.TaskId}`)
                      }
                      onMouseOut={() => setShowUserToolTip("")}
                    >
                      <img
                        src={assignIconCircle}
                        className="d-block d-sm-none"
                        alt="Assign Circle"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {Status === "overdue" && (
          <div className="redWidth-bottom ">
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
          getTaskById && task.TaskId == getTaskById.TaskId
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
  const innerRefDropWeb = useDropdownOuterClick((e) => {
    if (openBoardDrD === true && !e.target.id.includes("drpBoard")) {
      setOpenBoardDrp(false);
    }
  });

  return (
    <>
      {click === "riskAndDelays" ? (
        <div className="all-companies-task-grid mobile-dashboard-view">
          <RiskAndDelaysTaskList
            click={click}
            setClick={setClick}
            user={user}
          />
        </div>
      ) : click === "pendingAction" ? (
        <div className="all-companies-task-grid mobile-dashboard-view">
          <PendingAction click={click} setClick={setClick} user={user} />
        </div>
      ) : (
        <>
          {visibleRejectTaskModal && renderRejectTaskModal()}
          {!isTaskListOpen && (
            <div className="all-companies-task-grid mobile-dashboard-view">
              {isMobile && (
                <div id="sideBarParent" className="">
                  <div id="sideBarChild" className="leftSideBarFixed">
                    <MobileLeftSidebar
                      className="d-block d-sm-none"
                      close={() => closeMobileSidebar()}
                    />
                  </div>
                </div>
              )}
              <>
                <div className="d-flex mobile-height-dasboardView">
                  <div className="companies-sub-title w-25 d-none d-sm-block">
                    Tasks
                  </div>

                  <div className="d-flex pl-0">
                    <div
                      className="overview-mobile d-block d-sm-none"
                      onClick={() => setListView("0")}
                    >
                      Overview
                    </div>
                    <div className="companies-sub-title d-block d-sm-none">
                      Tasks
                    </div>
                  </div>

                  <div className="w-75 d-none d-sm-block">
                    {!searchBoxShow && (
                      <div className="only-search-icon" onClick={handleFocus}>
                        <img src={searchIcon} alt="sidebar Check Icon" />
                      </div>
                    )}
                    {searchBoxShow && (
                      <div
                        className="searchBox d-none d-sm-block"
                        ref={innerSearch}
                      >
                        <div className="input-group form-group">
                          <img
                            className="IconGray"
                            src={searchIcon}
                            alt="search Icon"
                          />
                          <input
                            ref={searchInput}
                            autofocus
                            className="form-control mozilla-py"
                            type="text"
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
                        ? "col-12 d-block d-sm-none"
                        : "col-5 d-block d-sm-none mobile"
                    }
                  >
                    {!searchBoxShowMobile && (
                      <div
                        className="only-search-icon"
                        onClick={() => setsearchBoxShowMobile(true)}
                      >
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
                            className="form-control"
                            type="text"
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

                <div
                  className="task-details-file-grid task-details-file-grid-dashboard custimDesignTask"
                  style={{ position: "relative" }}
                >
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
                          setTaskListDisplay("");
                        }}
                      >
                        Calendar
                      </span>
                      {displayTask === "3" && (
                        <div
                          className="file-title-progress"
                          style={{ left: "67px", width: "90px" }}
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
                          setTaskListDisplay("");
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
                  {((searchValue === "" && displayTask === "1") ||
                    (searchValue === "" && displayTask === "2")) && (
                    <div className="take-action mb-0 d-none d-sm-block">
                      <ul className="pull-right" style={{ float: "right" }}>
                        <span
                          style={{
                            fontSize: "10px",
                            backgroundColor: "transparent",
                          }}
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
                      </ul>
                    </div>
                  )}
                </div>
                {displayTask === "2" && searchValue === "" && (
                  <div>
                    <div
                      className="take-action"
                      style={{ height: "72vh", overflowY: "hidden" }}
                    >
                      {taskData && taskData.length > 0 && (
                        <div className="task-list-grid">
                          <BoardView
                            setCurrentBoardViewBy={setCurrentBoardViewBy}
                            currentBoardViewBy={currentBoardViewBy}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {displayTask === "3" && searchValue === "" && (
                  <div>
                    <div className="take-action" style={{ height: "72vh" }}>
                      {taskData && taskData.length > 0 && (
                        <div className="task-list-grid">
                          <View getSelectTaskDetails={getSelectTaskDetails} />
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <div
                  className={
                    displayTask === "1" &&
                    "task-grid-scroll customScrollSecond newHeigt"
                  }
                >
                  {searchValue != "" && (
                    <div
                      className="take-action"
                      style={{
                        marginBottom: "0px",
                        paddingBottom: "0px",
                        paddingTop: "20px",
                        height: "70vh",
                      }}
                    >
                      {searchData.length > 0 &&
                        searchData.map((task) => {
                          return (
                            <>{renderTaskList(task.data, task.Status, 2)}</>
                          );
                        })}
                    </div>
                  )}

                  {isMobile && displayTask === "1" && (
                    <>
                      <div
                        className="dropdown-mobile"
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
                            className=""
                            onClick={(e) => {
                              setTaskListDisplay("4");
                              setDisplayTask("1");
                              setMobileViewBy(false);
                            }}
                          >
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
                        </div>
                      )}
                    </>
                  )}
                  {taskListDisplay === "1" &&
                    displayTask === "1" &&
                    searchValue === "" &&
                    listTaskData &&
                    listTaskData.length > 0 &&
                    listTaskData.map((item, index) => {
                      return (
                        <>
                          <div className="mobile-dashboard-view">
                            <div className="take-action">
                              <div className="task-list-grid">
                                {item.Status.trim() === "overdue" && (
                                  <div
                                    className="action-title upcoming-btn"
                                    style={{
                                      color: "#f22727",
                                      fontWeight: "500",
                                      display: "flex",
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
                                    style={{
                                      cursor: "pointer",
                                      width: "fit-content",
                                    }}
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
                                    style={{
                                      cursor: "pointer",
                                      width: "fit-content",
                                    }}
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
                                      {!expandedFlags.includes(index) ? (
                                        <img
                                          src={downArrow}
                                          className="arrowDown"
                                          alt="Arrow down"
                                        />
                                      ) : (
                                        <img
                                          src={upArrow}
                                          className="arrowDown"
                                          alt="Arrow Up"
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
                                  : !expandedFlags.includes(index)) && (
                                  <>
                                    {item.Details.slice(
                                      0,
                                      rowCount[item.Status.trim()]
                                    ).map((task) => {
                                      return (
                                        <>
                                          {renderTaskList(
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
                                          {rowCount[item.Status.trim()] ===
                                            3 && (
                                            <div
                                              onClick={() =>
                                                showLessMore(
                                                  item.Status,
                                                  item.Details.length
                                                )
                                              }
                                              className="viewAll"
                                            >
                                              View All (
                                              {item.Details.length - 3} More)
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
                          </div>
                        </>
                      );
                    })}
                  {/* License View Temp test */}
                  <div className="task-list-grid">
                    {taskListDisplay === "3" && (
                      <LicenseTaskList user={user} sideBarTaskList={false} />
                    )}
                  </div>
                  {/* Company view Display */}
                  <div className="task-list-grid">
                    {taskListDisplay === "2" && (
                      <CompanyTaskList user={user} sideBarTaskList={false} />
                    )}
                  </div>

                  {/* Assigned View  */}
                  <div className="Assign View">
                    {taskListDisplay === "4" && (
                      <AssigneList
                        assignRowCount
                        user={user}
                        sideBarTaskList={false}
                      />
                    )}
                  </div>
                </div>
              </>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default withRouter(RightSideGrid);
