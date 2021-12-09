import React, { useState, useEffect } from "react";
import "./style.css";
import closeBlack from "../../../../../../../../assets/Icons/closeBlack.png";
import fileIcon from "../../../../../../../../assets/Icons/fileIcon.png";
import inputRightArrow from "../../../../../../../../assets/Icons/inputRightArrow.png";
import assignIconCircle from "../../../../../../../../assets/Icons/assignIconCircle.png";
import fileUploadIcon from "../../../../../../../../assets/Icons/fileUploadIcon.png";
import { toast } from "react-toastify";
import moment from "moment";
import Dropzone from "react-dropzone";
import { useOuterClick } from "../../../RightSideGrid/outerClick.js";
import { BACKEND_BASE_URL } from "../../../../../../../../apiServices/baseurl";
import { useSelector, useDispatch, connect } from "react-redux";
import { actions as taskReportActions } from "../../../../redux/actions";
import axios, { post } from "axios";
import { withRouter } from "react-router-dom";
import deleteBlack from "../../../../../../../../assets/Icons/deleteBlack.png";

import TextareaAutosize from "react-textarea-autosize";
function RightSideGrid({
  setIsTaskListOpen,
  isTaskApproved,
  setIsTaskApproved,
  taskList,
  NotificationRedu,
}) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
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

  const [currentDropDown, setCurrentDropDown] = useState("");
  const [fileList, setFileList] = useState([]);
  const [searchBoxShow, setsearchBoxShow] = useState(false);

  const [searchBoxShowMobile, setsearchBoxShowMobile] = useState(false);
  const [expandedFlags, setExpandedFlags] = useState([]);
  const [rowCount, setRowCount] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [today, setToday] = useState(new Date());
  const [emailAvaliableCheck, setEmailAvaliableCheck] = useState(false);
  const user = state && state.auth && state.auth.loginInfo;
  const getTaskById =
    state &&
    state.taskReport &&
    state.taskReport.taskReportById &&
    state.taskReport.taskReportById.taskReportById;

  const currentTaskData =
    state &&
    state.taskReport &&
    state.taskReport.taskReportById &&
    state.taskReport.taskReportById.taskReportById &&
    state.taskReport.taskReportById.taskReportById;
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

  const innerRef = useOuterClick((e) => {
    if (
      (currentDropDown !== "open" && !e.target.id.includes("assignBtn")) ||
      (currentDropDown === "open" && e.target.id === "")
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
        .catch((error) => {});
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

  useEffect(() => {
    let task_id =
      state && state.NotificationRedu && state.NotificationRedu.taskID;

    if (task_id) {
      getSelectTaskDetails();
    }
  }, []);

  const getSelectTaskDetails = (e) => {
    setShowFiles(true);
    setShowComments(false);
    setExpandedFlags([]);
    let taskID = null;
    let task_id =
      state && state.NotificationRedu && state.NotificationRedu.taskID;

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

    setIsTaskListOpen(true);
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
    if (approverDropDown === "") {
      getApproveUsers();
      setEmailAvaliableCheck(false);
      setSelectedUser("");
    }
  };

  const AssignDisplay = () => {
    // setCurrentDropDown("open")
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

  const onHBMenu = () => {
    const drawerParent = document.getElementById("sideBarParent");
    const drawerChild = document.getElementById("sideBarChild");
    if (drawerParent) {
      drawerParent.classList.add("overlay");
      drawerChild.style.left = "0%";
    }
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="task-details-veiw">
          <div className="task-details-header">
            <div className="closing-icon">
              <div className="task-details-title">
                {getTaskById && getTaskById.EntityName}
              </div>
              <div className="task-close-icon" onClick={() => {}}>
                <img src={closeBlack} alt="Arrow close" />
              </div>
            </div>
            <div className="task-details-sub-title">
              {getTaskById && getTaskById.TaskName}{" "}
              <span className="nse-label d-none d-sm-block">
                {getTaskById && getTaskById.LicenseCode}
              </span>
            </div>

            <div className="d-flex d-block d-sm-none">
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
                        ? getTaskById && getTaskById.EndDate < today
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
                          ? getTaskById && getTaskById.EndDate < today
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
                        ? getTaskById && getTaskById.EndDate < today
                          ? "Task Completed"
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

            <div className="border-header d-none d-sm-block">
              <div
                className="approved-label"
                style={{
                  backgroundColor:
                    getTaskById && getTaskById.Status
                      ? getTaskById.Status === "Assign"
                        ? "#fcf3cd"
                        : getTaskById.Status === "Completed By User"
                        ? getTaskById && getTaskById.EndDate < today
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
                          ? getTaskById && getTaskById.EndDate < today
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
                        ? getTaskById && getTaskById.EndDate < today
                          ? "Task Completed"
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
            <div className="task-detail-data">
              {userDetails.UserType != 4 && (
                <div className="row">
                  <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                    <div className="holding-list-normal-title">Assigned to</div>
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
                                      <div
                                        class="form-group"
                                        style={{ width: "100%" }}
                                      >
                                        <input
                                          style={{ width: "100%" }}
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
                                      <span
                                        className="or-devider"
                                        style={{ display: "none" }}
                                      >
                                        or{" "}
                                      </span>
                                      <button
                                        class="btn save-details assign-me"
                                        style={{ display: "none" }}
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
                                            {user.UserName ? user.UserName : ""}
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
                    <div className="holding-list-normal-title">Assigned by</div>
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
                                      <div
                                        class="form-group"
                                        style={{ width: "100%" }}
                                      >
                                        <input
                                          style={{ width: "100%" }}
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
                                      </div>
                                      <span
                                        className="or-devider"
                                        style={{ display: "none" }}
                                      >
                                        {" "}
                                        or
                                      </span>
                                      <button
                                        class="btn save-details assign-me"
                                        value="5"
                                        onClick={(e) => approvTaskToMe(e)}
                                        style={{ display: "none" }}
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
                                            {user.UserName ? user.UserName : ""}
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
              {userDetails.UserType != 4 && (
                <div className="row">
                  <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                    <div className="holding-list-normal-title">Status</div>
                  </div>
                  <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                    <div className="holding-list-bold-title">
                      {getTaskById && getTaskById.Status
                        ? getTaskById.Status === "Completed By User"
                          ? getTaskById.EndDate < today
                            ? "Task Completed"
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
              <div className="row">
                <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                  <div className="holding-list-normal-title">License</div>
                </div>
                <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                  <div className="holding-list-bold-title">
                    {getTaskById && getTaskById.LicenseCode}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                  <div className="holding-list-normal-title">Company</div>
                </div>
                <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                  <div className="holding-list-bold-title">
                    {getTaskById && getTaskById.EntityName}
                  </div>
                </div>
              </div>
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
                    }}
                  >
                    Files
                  </div>
                )}
                {showFiles && <div className="file-title-progress col-5"></div>}
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
            </div>
          </div>
          {showFiles && (
            <div className="file-grid-data">
              {(user && user.UserType && user.UserType === 4) ||
              (user && user.UserType && user.UserType === 3) ? (
                <>
                  {getTaskById &&
                  getTaskById.Status &&
                  getTaskById.Status === "Assigned" &&
                  getTaskById &&
                  getTaskById.Status &&
                  getTaskById.TaskStatus === 0 ? (
                    (user && user.UserType && user.UserType === 4) ||
                    (user && user.UserType && user.UserType === 3) ? (
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
                                        handleSelectUploadFile(acceptedFiles)
                                      }
                                    >
                                      {({ getRootProps, getInputProps }) => (
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
                                        href={`${BACKEND_BASE_URL}/viewfiles.ashx?id=${getTaskById.TaskId}&flag=downloadtaskfiles&file=${files.FileName}`}
                                        style={{ textDecoration: "none" }}
                                        className="file-download-title pointer d-flex"
                                      >
                                        download{" "}
                                        <span className="d-none d-sm-block">
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
                              {getTaskById && getTaskById.TaskId !== undefined && (
                                <a
                                  href={`${BACKEND_BASE_URL}/viewfiles.ashx?id=${getTaskById.TaskId}&flag=downloadtaskfiles&file=${files.FileName}`}
                                  style={{ textDecoration: "none" }}
                                  className="file-download-title pointer d-flex"
                                >
                                  download{" "}
                                  <span className="d-none d-sm-block">
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
                (user.UserType === 5 && " ")
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
    </div>
  );
}

export default withRouter(RightSideGrid);
