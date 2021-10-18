import React, { useEffect, useState } from "react";
import "./style.css";
import RightImageBg from "../../../../assets/Images/Onboarding/RectangleOnboadign.png";
import comtech from "../../../../assets/Images/CapmTech.png";
import secmark from "../../../../assets/Images/secmark.png";
import leftArrow from "../../../../assets/Icons/leftArrow.png";
import downArrow from "../../../../assets/Icons/downArrow.png";
import assignIcon from "../../../../assets/Icons/assignIcon.png";
import mobileUserAssign from "../../../../assets/Icons/mobileUserAssign.png";
import inputRightArrow from "../../../../assets/Icons/inputRightArrow.png";
import assignIcon2 from "../../../../assets/Icons/assignIcon2.png";
import assignIcon3 from "../../../../assets/Icons/assignIcon3.png";
import assignIconCircle from "../../../../assets/Icons/assignIconCircle.png";
import assignIcon4 from "../../../../assets/Icons/assignIcon4.png";
import assignIcon5 from "../../../../assets/Icons/assignIcon5.png";
import topArrow from "../../../../assets/Icons/topArrow.png";
import closeIconWhite from "../../../../assets/Icons/whiteClose.png";
import moment from "moment";
import { Modal } from "react-responsive-modal";
import AccordianDownArrow from "../../../../assets/Icons/AccordianDownArrow.png";
import topArrowAccordian from "../../../../assets/Icons/topArrowAccordian.png";
import dropdownUser from "../../../../assets/Icons/dropdownUser.png";
import dropdownBlueIcon from "../../../../assets/Icons/dropdownBlueIcon.png";
import accountCircleIcon from "../../../../assets/Icons/accountCircle.png";
import modelSquare from "../../../../assets/Icons/modelSquare.png";
import modelBox from "../../../../assets/Icons/modelBox.png";
import reviewClose from "../../../../assets/Icons/reviewClose.png";
import Collapsible from "react-collapsible";
import { BACKEND_BASE_URL } from "../../../../apiServices/baseurl";
import SideBarInputControl from "../SideBarInputControl";
import { useDispatch, useSelector } from "react-redux";
import { actions as companyActions } from "../../redux/actions";
import {
  EmailApiRes,
  emailAvaliableCheckFunc,
  isEmail,
  issessionEmail,
  useOuterClick,
} from "./utils";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import MobileStepper from "../mobileStepper";
import AssignDrawerMobile from "../AssignDrawerMobile";
import axios from "axios";
import { isMobile } from "react-device-detect";

function AssignTask({ history }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [emailListwithTask, setEmailListwithTask] = useState([]);
  const [collapse, setCollapse] = useState([]);
  const [assignPromptHideShow, setAssignPromptHideShow] = useState(false);
  const [assignField, setAssignField] = useState(undefined);
  const [showUserToolTip, setShowUserToolTip] = useState("");
  const [assignExist, setAssignExist] = useState("");

  const [assignedEmail, setAssignTaskEmail] = useState([]);

  const innerRef = useOuterClick((e) => {
    if (currentDropDown !== "" && !e.target.id.includes("email-input"))
      setCurrentDropDown("");
  });

  const handleCheckEmailAvailability = async (value, emailObject) => {
    let data = false;
    let obj = {};

    if (isEmail(value) === true) {
      if (issessionEmail(value) === false) {
        await axios
          .post(`${BACKEND_BASE_URL}/api/availabilityCheck`, {
            loginID: value,
            pwd: "",
            rememberme: 0,
            loginty: "AdminEmail",
          })
          .then((response) => {
            if (response && response.data && response.data.Status === "True") {
              data = true;
            } else {
              data = false;
            }
          })
          .catch((err) => {});

        if (data === true) {
          obj = value;
          setemailError({ ...emailError, [emailObject]: "yes" });
        } else {
          setemailError({ ...emailError, [emailObject]: "no" });
          let emailArr = [...emailList];
          let obj = {};
          var emailExists = emailList.filter((item) => item.email === value);
          if (emailExists.length === 0) {
            if (isEmail(value)) {
              obj = { email: value };
              emailArr.push(obj);
            }
            setEmailList(emailArr);
          }
        }

        setAssignTaskEmail([...assignedEmail, obj]);
      }
    }
  };

  const cerificateInfo =
    state && state.complianceOfficer && state.complianceOfficer.cerificateInfo;
  const [taskList, setTaskList] = useState([]);
  const [taskListData, setTaskListData] = useState([]);
  const [fields, setFields] = useState([]);

  const [licenseData, setLicenseData] = useState([]);
  const [isValidate, setIsValidate] = useState(false);
  const [assignButtonIndex, setAssignButtonIndex] = useState([]);
  const [taskToAssign, setTaskToAssign] = useState({});
  const [isTaskAssigned, setTaskAssigned] = useState(false);
  const [enablesecmarkExpert, setEnablesecmarkExpert] = useState(false);
  const [activeInvite, setActiveInvite] = useState(false);
  const [inviteVal, setInviteVal] = useState("");
  const [emailList, setEmailList] = useState([]);
  const [currentDropDown, setCurrentDropDown] = useState("");
  const [showToolTip, setShowToolTip] = useState(true);
  const [activeToolTipIndex, setActiveToolTipIndex] = useState(0);
  const [visibleExpertReviewModal, setVisibleExpertReviewModal] =
    useState(false);
  const [emailError, setemailError] = useState([]);

  const userID =
    state &&
    state.complianceOfficer &&
    state.complianceOfficer.personalInfo &&
    state.complianceOfficer.personalInfo.data &&
    state.complianceOfficer.personalInfo.data[0][0] &&
    state.complianceOfficer.personalInfo.data[0][0] &&
    state.complianceOfficer.personalInfo.data[0][0].UserDetails &&
    state.complianceOfficer.personalInfo.data[0][0].UserDetails[0] &&
    state.complianceOfficer.personalInfo.data[0][0].UserDetails[0].UserID;

  const assignTaskData =
    state &&
    state.complianceOfficer &&
    state.complianceOfficer.assignedTaskData;

  const handleFields = (e) => {
    const { value, name } = e.target;
    if (name === "inviteemail") {
      setInviteVal(e.target.value);
    }
    if (name === "secmarkexpert") {
      setEnablesecmarkExpert(e.target.checked);
    }
  };

  const onSkipTextClick = () => {
    history.push("/otpverification-co");
  };
  const handleInputChange = (
    e,
    dropDownValue,
    index,
    item,
    companyEntityName,
    EntityGroupID,
    CompanyIndex
  ) => {
    if (dropDownValue === "") {
      const { value, name } = e.target;
      let taskListIds = [];
      item &&
        item.tasks &&
        item.tasks.length > 0 &&
        item.tasks.map((item, index) => {
          taskListIds.push(item.TaskListId);
        });
      const values = [...fields];
      let temp = {
        email: value,
        licenseID: item.LicenseID,
        taskListID: item.tasks,
        companyName: companyEntityName,
        EntityGroupID: EntityGroupID,
      };
      // if (
      //   (values[CompanyIndex] && values[CompanyIndex].obj && values[CompanyIndex].obj[index] && values[CompanyIndex].obj[index].email) ||
      //   (values[CompanyIndex] && values[CompanyIndex].obj && values[CompanyIndex].obj[index] && values[CompanyIndex].obj[index].licenseID)
      //   || (values && values[CompanyIndex].obj && values[CompanyIndex].obj[index] && values[CompanyIndex].obj[index].taskListID)
      // ) {
      //   // debugger
      //   // values[CompanyIndex].obj[index].licenseID = item.LicenseID;
      //   // values[CompanyIndex].obj[index].taskListID = item.tasks;
      //   // values[CompanyIndex].obj[index].email = e.target.value;
      //   // values[CompanyIndex].obj[index].companyName = companyEntityName

      // } else {

      // }
      let keyName = companyEntityName + EntityGroupID + index;

      handleButtonDisabledOnChange(e.target.value, keyName);
      values[CompanyIndex].obj[index] = temp;
      setFields(values);
    } else {
      const values = [...fields];
      let temp = {
        email: dropDownValue,
        licenseID: item.LicenseID,
        taskListID: item.tasks,
        companyName: companyEntityName,
        EntityGroupID: EntityGroupID,
      };
      // if (
      //   (values[CompanyIndex] && values[CompanyIndex].obj && values[CompanyIndex].obj[index] && values[CompanyIndex].obj[index].email) ||
      //   (values[CompanyIndex] && values[CompanyIndex].obj && values[CompanyIndex].obj[index] && values[CompanyIndex].obj[index].licenseID)
      //   || (values && values[CompanyIndex].obj && values[CompanyIndex].obj[index] && values[CompanyIndex].obj[index].taskListID)
      // ) {
      //   // values[CompanyIndex].obj[index].licenseID = item.LicenseID;
      //   // values[CompanyIndex].obj[index].taskListID = item.tasks;
      //   // values[CompanyIndex].obj[index].email = dropDownValue;

      // } else {
      //   values[CompanyIndex].obj.push(temp);
      // }
      values[CompanyIndex].obj[index] = temp;
      setFields(values);
      setCurrentDropDown("");
    }

    setShowToolTip(false);
  };

  useEffect(() => {
    let i = 1;

    assignTaskData &&
      assignTaskData.length > 0 &&
      assignTaskData.map((task) => {
        let tempArray = [];
        task &&
          task.Licenses &&
          task.Licenses.map((taskItem, index) => {
            if (i > 5) {
              i = 1;
            }
            let obj = { ...taskItem, imageType: i, licenseIndex: index };
            tempArray.push(obj);
            i++;
          });
        task.Licenses = tempArray;
      });
    setTaskListData(assignTaskData);

    let temp = [];
    let fieldArray = [];
    let fieldArrayselectedTask = [];
    let tempfieldsigletask;
    let taskarr = [];
    assignTaskData &&
      assignTaskData.length > 0 &&
      assignTaskData.map((item, index) => {
        let arr = [];
        let licenseObj = {
          email: "",
          licenseID: "",
          taskListID: [],
          companyName: "",
        };
        item &&
          item.Licenses.map((item, index) => {
            arr.push(licenseObj);
          });

        let tempfield = {
          companyName: item.EntityName,
          EntityGroupID: item.EntityId,
          obj: arr,
        };
        fieldArray.push(tempfield);
        temp.push({ open: index === 0 ? true : false });
      });
    setFields(fieldArray);
    setCollapse(temp);
  }, [assignTaskData]);
  const renderTaskList = (data, _companyName, _LicenseCode, EntityGroupID) => {
    return (
      data &&
      data.length > 0 &&
      data.map((item, key) => {
        let newItem = item;
        newItem.id = `${_companyName && _companyName}${
          _LicenseCode && _LicenseCode.replaceAll("\\s", "")
        }${key}`;
        return taskListShow(
          newItem,
          key,
          _companyName,
          _LicenseCode,
          EntityGroupID,
          data.length
        );
      })
    );
  };
  const handleOnFoucs = (item, itemTask, indexTask) => {
    let str = `CompanyType${
      item.EntityName && item.EntityName.replaceAll("\\s", "")
    }${
      itemTask.LicenseCode && itemTask.LicenseCode.replaceAll("\\s", "")
    }${indexTask}`;
    setCurrentDropDown(str);
    setShowToolTip(false);
  };

  const createDateFormatYYMMDD = (item) => {
    var d = new Date();
    let str = "";
    var currentMonth = d.getMonth();
    var currentYear = d.getFullYear();
    var currentDay = String(d.getDate()).padStart(2, "0");
    if (parseInt(currentDay) < parseInt(item)) {
      str = `${currentYear}-${currentMonth + 1}-${item}`;
    } else {
      str = `${currentYear}-${currentMonth + 2}-${item}`;
      return str;
    }
  };
  const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {}); // empty object is the initial value for result object
  };
  const arrayFromObject = (obj) => {
    var arr = [];
    for (var i in obj) {
      arr.push(obj[i]);
    }
    return arr;
  };

  const groupByProperty = (key) => (array) =>
    array.reduce((objectsByKeyValue, obj) => {
      const value = obj[key];
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});

  const NoneEmpty = (inputArray) => {
    if (inputArray.length) {
      var currentElement = inputArray[0];
      for (
        var i = 1, len = inputArray.length;
        i < len && currentElement === "";
        i += 1
      ) {
        currentElement = currentElement || inputArray[i];
      }
      if (currentElement !== null) {
        return false;
      }
      return true;
    }
  };

  const routeToAssignTask = () => {
    let createGroupByEmail = [];
    let emailLicenseArr = [];
    fields &&
      fields.map((item, index) => {
        item &&
          item.obj &&
          item.obj.map((data, index) => {
            if (data.email !== "") emailLicenseArr.push(data);
          });
      });
    let temp = groupBy(emailLicenseArr, "email");
    let tempAssignArr = [];
    taskToAssign &&
      Object.values(taskToAssign).map((item, index) => {
        let obj = {
          email: item.email,
          EntityGroupID: item.EntityGroupID,
          taskListId: item && item.task && item.task.TaskListId,
        };
        tempAssignArr.push(obj);
      });
    let newarr = [];
    emailLicenseArr &&
      emailLicenseArr.map((item, index) => {
        newarr.push(item);
      });
    tempAssignArr &&
      tempAssignArr.map((item, index) => {
        newarr.push(item);
      });
    let emailList = groupBy(newarr, "email");
    let entitityArr = [];
    let tempEntityObj = {};
    let tempLicenseArr = [];
    let taskArr = [];
    let payload = [];

    Object.entries(emailList).forEach(([key, value]) => {
      let obj = { email: key };
      let entity = [];
      value.forEach((item) => {
        let taskarr = [];
        let licenseArr = [];
        let tempObj = {};
        if (item.hasOwnProperty("licenseID") && item.licenseID !== "") {
          tempEntityObj = {
            eid: item.EntityGroupID,
            licenseID: item.licenseID,
            taskListId: "",
          };
        } else if (
          item.hasOwnProperty("taskListId") &&
          item.taskListId !== ""
        ) {
          tempEntityObj = {
            eid: item.EntityGroupID,
            taskListId: item.taskListId,
            licenseID: "",
          };
        }
        entity.push(tempEntityObj);
        obj.entity = entity;
      });
      payload.push(obj);
    });
    let json = [];
    let entityGroupBy = [];
    let entitityArrPayload = [];
    let tempObj = {};
    let entityArr = [];
    let tempentityArr = [];
    payload &&
      payload.length > 0 &&
      payload.map((item, index) => {
        let objPayload = {};
        let result = [];
        let dataPayload = [];

        result = item.entity.reduce((r, { eid, licenseID, taskListId }) => {
          var temp = r.find((o) => eid === o.eid);
          if (!temp) {
            r.push((temp = { eid, lid: [], tid: [] }));
          }
          if (typeof licenseID === "number") {
            temp.lid.push(licenseID);
          }
          if (typeof taskListId === "number") {
            temp.tid.push(taskListId);
          }

          return r;
        }, []);

        result &&
          result.map((data, index) => {
            objPayload = {
              eid: data.eid,
              lid: data.lid.join(","),
              tid: data.tid.join(","),
            };
            dataPayload.push(objPayload);
          });
        json = {
          email: item.email,
          COUSERID: userID,
          secReview: enablesecmarkExpert ? 1 : 0,
          history: history,
          entity: dataPayload,
        };

        entitityArrPayload.push(json);
      });
    dispatch(companyActions.insertTaskListRequest(entitityArrPayload));
  };

  const handleSubMenuEmailCheck = (value, taskListId) => {
    let emailCheck = !isEmail(value);
    if (emailCheck === false) {
      handleCheckEmailAvailability(value, taskListId);
    }
  };

  const renderDialogBox = () => {
    return (
      <div className="governance-modal">
        <Modal
          classNames={{
            overlayAnimationIn: "",
            overlayAnimationOut: "",
            modalAnimationIn: "",
            modalAnimationOut: "",
          }}
          open={visibleExpertReviewModal}
          center={true}
          showCloseIcon={false}
          onClose={() => setVisibleExpertReviewModal(false)}
          modalId="assignTask"
          //styles={{ width: 640, margin: 20 }}
          onOverlayClick={() => setVisibleExpertReviewModal(false)}
        >
          <div className="capmtech-review-model">
            <img
              style={{ cursor: "pointer" }}
              onClick={() => setVisibleExpertReviewModal(false)}
              className="reviewClose"
              src={reviewClose}
              alt="review Close"
            />
            <div className="model-tw-img">
              <img className="square-box" src={modelBox} alt="model box" />
              <img
                className="circle-box"
                src={modelSquare}
                alt="model Square"
              />
            </div>
            <div className="title">COMPLIANCE SUTRA Expert Review</div>
            <p className="heading-subtitle">
              What is COMPLIANCE SUTRA expert review?
            </p>
            <p className="subtitle-sescription">
              Secmark Expert review enables you to build strong compliance and
              task completion through assistance on verification of task to
              industry Expert.
            </p>
            <p className="heading-subtitle">How it works?</p>
            <p className="subtitle-sescription">
              Select segments for which you wanted to avail said services.
              Charges will be applicable as shown in payment screen.
            </p>
          </div>
        </Modal>
      </div>
    );
  };
  const createDateFormat = (item) => {
    var d = new Date();
    let str = "";
    var currentMonth = d.getMonth();
    var currentYear = d.getFullYear();
    var currentDay = String(d.getDate()).padStart(2, "0");
    if (parseInt(currentDay) < parseInt(item)) {
      return (str = `${currentYear}-${currentMonth + 1}-${item}`);
    } else {
      str = `${currentYear}-${currentMonth + 2}-${item}`;
      return str;
    }
  };
  const userExists = (taskListId) => {
    const found = assignButtonIndex.some(
      (item) => item.taskListId === taskListId
    );
    if (found) {
      return true;
    }
    return false;
  };
  const capitalize_Words = (str) => {
    if (str) {
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }
  };
  useEffect(() => {
    dispatch(
      companyActions.getAssignTaskDataReuest({
        coUserId: userID,
      })
    );
  }, []);

  const handleEmail = (
    e,
    item,
    companyEntityName,
    _LicenseCode,
    EntityGroupID
  ) => {
    const { value, name } = e.target;
    let obj = {
      email: value,
      task: item,
      companyName: companyEntityName,
      EntityGroupID: EntityGroupID,
    };
    let tempobj = taskToAssign;
    if (tempobj && tempobj[item.id] && tempobj[item.id].email) {
      tempobj[item.id].email = value;
      tempobj[item.id].task = item;
    } else {
      tempobj[item.id] = obj;
    }

    setTaskToAssign({ ...taskToAssign, tempobj });
    handleButtonDisabledOnChange(e.target.value, item.TaskListId);

    // const values = [...taskToAssign];
    // values[index].email = value;
    // values[index].task = item
    // let temp = { email: value, companyName: companyEntityName, LicenseCode: _LicenseCode, tasks: item, };
    // if (
    //   (values[CompanyIndex] && values[CompanyIndex].taskObj && values[CompanyIndex].companyName === companyEntityName && values[CompanyIndex].LicenseCode === _LicenseCode)
    // ) {

    //   values[CompanyIndex].taskObj[index].tasks = item;
    //   values[CompanyIndex].taskObj[index].email = e.target.value;

    // } else {
    //   values[CompanyIndex].taskObj.push(temp);
    // }
    // const values = [...taskToAssign];
    // if (isEmail(e.target.value)) {
    //   values[item.TaskListId] = e.target.value;
    // }
    // setTaskToAssign(values);
  };

  const handleButtonDisabledOnChange = (email, keysName) => {
    let keyName = keysName;
    if (email !== "") {
      if (isEmail(email) === true) {
        setemailError({
          ...emailError,
          [keyName]: "no",
        });
        if (issessionEmail(email) === false) {
          setemailError({
            ...emailError,
            [keyName]: "no",
          });
        } else {
          setemailError({
            ...emailError,
            [keyName]: "yes",
          });
        }
      } else {
        setemailError({
          ...emailError,
          [keyName]: "yes",
        });
      }
    } else {
      setemailError({
        ...emailError,
        [keyName]: "no",
      });
    }
  };

  const checkEmailFormat = (item) => {
    if (
      taskToAssign &&
      taskToAssign[item.id] &&
      taskToAssign[item.id].email !== ""
    ) {
      if (!isEmail(taskToAssign[item.id].email)) {
        return true;
      }
      return false;
    }
  };

  const taskListShow = (
    item,
    key,
    _companyName,
    _LicenseCode,
    EntityGroupID,
    taskLength
  ) => {
    return (
      <div key={key} className="accordian-data-history ">
        <div className="row">
          {/* <div className="row" style={{ height: "65px" }}> */}
          <div className="col-4 col-md-3 col-sm-3 col-xl-5">
            <div className="accordian-data-backend spacing-alignment">
              {item.TaskListName}
            </div>
          </div>
          <div className="col-4 col-md-5 col-sm-5 col-xl-3">
            <div className="accordian-data-backend">{item.EventFrequency}</div>
          </div>
          <div className="col-4 col-md-4 col-sm-4 col-xl-4">
            <div className="input-padding">
              <div className="form-group d-none d-sm-block">
                {(assignButtonIndex.length !== 0 && !userExists(item.TaskListId)
                  ? true
                  : assignButtonIndex.length === 0
                  ? true
                  : false) && (
                  <div
                    className="assign-status"
                    onClick={(e) => {
                      const values = [...assignButtonIndex];
                      let obj = {
                        taskListId: item.TaskListId,
                        taskListName: item.TaskListName,
                      };
                      values.push(obj);
                      setAssignButtonIndex(values);
                    }}
                  >
                    Assign
                  </div>
                )}
                {assignButtonIndex &&
                  assignButtonIndex.length > 0 &&
                  userExists(item.TaskListId) && (
                    <div
                      className="assign-status"
                      style={{ minHeight: "52px" }}
                    >
                      <input
                        type="text"
                        className="form-control form-control-focus"
                        placeholder="Add email to assign"
                        autoComplete="off"
                        name="email-inner"
                        //  placeholder={taskToAssign && taskToAssign[item.id] && taskToAssign[item.id].email ? taskToAssign[item.id].email : "Add email to assign" }
                        value={
                          taskToAssign &&
                          taskToAssign[item.id] &&
                          taskToAssign[item.id].email
                        }
                        //onBlur={(e) => sendEmail(e, item, key)}
                        onBlur={() => {
                          handleSubMenuEmailCheck(
                            taskToAssign &&
                              taskToAssign[item.id] &&
                              taskToAssign[item.id].email,
                            item.TaskListId
                          );
                        }}
                        onChange={(e) => {
                          handleEmail(
                            e,
                            item,
                            _companyName,
                            _LicenseCode,
                            EntityGroupID
                          );
                        }}
                      />
                      {checkEmailFormat(item) && (
                        <p
                          style={{
                            textTransform: "none",
                            marginBottom: "0px",
                            position: "absolute",
                          }}
                          className="input-error-message "
                        >
                          Please enter valid email address
                        </p>
                      )}
                      {taskToAssign &&
                        taskToAssign[item.id] &&
                        taskToAssign[item.id].email !== "" &&
                        isEmail(taskToAssign[item.id].email) &&
                        issessionEmail(taskToAssign[item.id].email) && (
                          <p
                            className="input-error-message absPosition"
                            style={{ textTransform: "none", width: "100%" }}
                          >
                            Email already assigned to another role
                          </p>
                        )}
                      {taskToAssign &&
                        taskToAssign[item.id] &&
                        taskToAssign[item.id].email !== "" &&
                        isEmail(taskToAssign[item.id].email) &&
                        assignedEmail.length !== 0 &&
                        assignedEmail.find(
                          (items, indexs) =>
                            items === taskToAssign[item.id].email
                        ) && (
                          <p
                            className="input-error-message"
                            style={{
                              textTransform: "none",
                              position: "absolute",
                            }}
                          >
                            Email is already exists
                          </p>
                        )}
                    </div>
                  )}
              </div>
              {taskToAssign[item.id] === undefined && (
                <div
                  onClick={() =>
                    handleMobileChildAssignClick(
                      item,
                      _companyName,
                      _LicenseCode,
                      EntityGroupID,
                      "Child"
                    )
                  }
                  className="only-mobile-assign-add d-block d-sm-none"
                >
                  <div className="assign-status">assign</div>
                </div>
              )}
              {showUserToolTip === item.id && (
                <div className="toolTip-input">
                  <div className="tooltiptext2">
                    <span className="font-normal-text2">
                      {taskToAssign[item.id].email}
                    </span>
                  </div>
                </div>
              )}
              {taskToAssign[item.id] != undefined &&
                taskToAssign[item.id].email != "" && (
                  <div className="only-mobile-assign-add d-block d-sm-none">
                    <div
                      className="assign-user-icon"
                      onMouseOver={() => setShowUserToolTip(item.id)}
                      onMouseOut={() => setShowUserToolTip("")}
                      onClick={() => {
                        setAssignExist(taskToAssign[item.id].email);
                        handleMobileChildAssignClick(
                          item,
                          _companyName,
                          _LicenseCode,
                          EntityGroupID,
                          "Child"
                        );
                      }}
                    >
                      <img
                        className="mobileUser-icon"
                        src={mobileUserAssign}
                        alt="assign user icon"
                      />
                    </div>
                  </div>
                )}

              {/* <div className="col-12 alignment-fix">
                <div className="header-border-blur"></div>
              </div> */}
            </div>
          </div>
          {/* <div className="header-border-blur"></div> */}
          <div className="col-12 spacing-alignment-border">
            {taskLength - 1 !== key && (
              <div className="header-border-blur"></div>
            )}
          </div>
        </div>
      </div>
    );
  };
  // useEffect(() => {
  //   let arr = [];
  //   let data = [];
  //   arr =
  //     cerificateInfo &&
  //     cerificateInfo.length > 0 &&
  //     cerificateInfo.map((item, index) => {
  //       if (item.hasOwnProperty("table") && Array.isArray(item.table)) {
  //         if (item.table) {
  //           return item;
  //         }
  //       }
  //       return [];
  //     });
  //   const res =
  //     arr &&
  //     arr.length > 0 &&
  //     arr.map((item) => {
  //       if (item.table) {
  //         Object.values(item).map((newItem) => {
  //           newItem.map((a) => {
  //             data.push(a);
  //           });
  //         });
  //       }
  //       return data;
  //     });
  //   var result = [];
  //   result =
  //     res &&
  //     res[0].reduce(function (r, a) {
  //       r[a.licenseCode] = r[a.licenseCode] || [];
  //       r[a.licenseCode].push(a);
  //       return r;
  //     }, Object.create(null));
  //   setTaskList(result);
  // }, [cerificateInfo]);

  const sendEmail = (e, item, key) => {
    if (!isEmail(e.target.value) && e.target.name) {
      return;
    }

    const companyName =
      state &&
      state.complianceOfficer &&
      state.complianceOfficer.emailInfo &&
      state.complianceOfficer.emailInfo.companyName;
    const EntityGroupID =
      state &&
      state.complianceOfficer &&
      state.complianceOfficer.personalInfo &&
      state.complianceOfficer.personalInfo.data &&
      state.complianceOfficer.personalInfo.data[0][0] &&
      state.complianceOfficer.personalInfo.data[0][0] &&
      state.complianceOfficer.personalInfo.data[0][0].UserDetails &&
      state.complianceOfficer.personalInfo.data[0][0].UserDetails[0] &&
      state.complianceOfficer.personalInfo.data[0][0].UserDetails[0].EntityID;

    const userID =
      state &&
      state.complianceOfficer &&
      state.complianceOfficer.personalInfo &&
      state.complianceOfficer.personalInfo.data &&
      state.complianceOfficer.personalInfo.data[0][0] &&
      state.complianceOfficer.personalInfo.data[0][0] &&
      state.complianceOfficer.personalInfo.data[0][0].UserDetails &&
      state.complianceOfficer.personalInfo.data[0][0].UserDetails[0] &&
      state.complianceOfficer.personalInfo.data[0][0].UserDetails[0].UserID;

    const email = e.target.value;
    const link = `http://139.162.5.110:9091/#/sign-up-request?email=${email}&companyName=${companyName}`;
    const mail = {
      link: link,
      email: email,
      item: item,
      companyName: companyName,
      date: createDateFormat(item.eventDate),
    };
    if (email && companyName && EntityGroupID && userID) {
      dispatch(companyActions.createTaskMailRequest(mail));
      var d = new Date();
      let currentMonth = d.getMonth();
      let currentYear = d.getFullYear();
      var dateR = new Date(currentYear, currentMonth, parseInt(item.eventDate));
      var targetDate = moment(createDateFormatYYMMDD(item.eventDate))
        .subtract(5, "day")
        .toDate();
      var taskEndDate = moment(targetDate).format("YYYY-MM-DD");
      const taskJson = {
        actualTaskEndDate: createDateFormatYYMMDD(item.eventDate),
        taskEndDate: taskEndDate,
        startDate: moment().format("YYYY-MM-DD"),
        assignedTo: email,
        taskListID: item.taskListId,
        entityID: EntityGroupID,
        userID: userID,
        actionFlag: 1,
      };
      dispatch(companyActions.insertTaskListRequest(taskJson));
      setTaskAssigned(true);
    } else {
      toast.error("something went wrong !!!");
      return "";
    }
  };

  const onClickArrow = (item, itemTask) => {
    const arrow = document.getElementById(`arrow${item.EntityName}${itemTask}`);
    const SortBar = document.getElementById(
      `content${item.EntityName}${itemTask}`
    );
    if (arrow && SortBar) {
      if (
        arrow.classList.contains("downArrow") &&
        SortBar.classList.contains("accordian-bar-with-min")
      ) {
        arrow.classList.remove("downArrow");
        arrow.classList.add("upArrow");
        SortBar.classList.add("filter-price-height");
        SortBar.classList.add("accordian-bar-with-fullheight");
      } else if (
        arrow.classList.contains("upArrow") &&
        SortBar.classList.contains("filter-price-height")
      ) {
        SortBar.classList.remove("filter-price-height");
        SortBar.classList.remove("accordian-bar-with-fullheight");
        arrow.classList.remove("upArrow");
        arrow.classList.add("downArrow");
      }
    }
  };

  const storeEmails = (
    e,

    companyEntityName,
    EntityGroupID,
    index
  ) => {
    let emailObject = companyEntityName + EntityGroupID + index;

    handleCheckEmailAvailability(e.target.value, emailObject);
  };

  const onClickCompanyName = (index) => {
    const arrow = document.getElementById(`arrow-company${index}`);
    if (collapse[index].open === true) {
      let list = [...collapse];
      list[index].open = false;
      setCollapse(list);
      arrow.classList.remove("upArrow");
      arrow.classList.add("downArrow");
    } else {
      let list = [...collapse];
      list[index].open = true;
      arrow.classList.add("upArrow");
      arrow.classList.remove("downArrow");
      setCollapse(list);
    }
  };

  const handleMobileChildAssignClick = (
    item,
    _companyName,
    _LicenseCode,
    EntityGroupID,
    section
  ) => {
    let assignObj = {
      entityName: _companyName,
      taskItem: item,
      groupID: EntityGroupID,
      section: section,
      licensecode: _LicenseCode,
    };
    setAssignField(assignObj);
    setAssignPromptHideShow(true);
    const drawerParent = document.getElementById("drawerParentMobile");
    const drawerChild = document.getElementById("drawerChildMobile");
    if (drawerParent) {
      drawerParent.classList.add("overlayAssignTask");
      drawerChild.style.bottom = "0px";
    }
  };
  const handleMobileAssignClick = (
    indexTask,
    itemTask,
    EntityName,
    EntityGroupID,
    index,
    section
  ) => {
    let assignObj = {
      entityName: EntityName,
      taskIndex: indexTask,
      taskItem: itemTask,
      groupID: EntityGroupID,
      section: section,
      licenseIndex: index,
    };
    setAssignField(assignObj);
    setAssignPromptHideShow(true);
    const drawerParent = document.getElementById("drawerParentMobile");
    const drawerChild = document.getElementById("drawerChildMobile");
    if (drawerParent) {
      drawerParent.classList.add("overlayAssignTask");
      drawerChild.style.bottom = "0%";
    }
  };
  const closeAssign = (e, flag) => {
    let obj = { target: { value: e } };
    if (flag === 1) {
      if (assignField.section === "Parent") {
        handleInputChange(
          "",
          e,
          assignField.taskIndex,
          assignField.taskItem,
          assignField.entityName,
          assignField.groupID,
          assignField.licenseIndex
        );
      } else {
        handleEmail(
          obj,
          assignField.taskItem,
          assignField.entityName,
          assignField.licensecode,
          assignField.groupID
        );
      }
      storeEmails(obj);
    }
    setAssignExist("");
    setAssignPromptHideShow(false);
    setAssignField(undefined);
    const drawerParent = document.getElementById("drawerParentMobile");
    const drawerChild = document.getElementById("drawerChildMobile");
    if (drawerParent) {
      drawerParent.classList.remove("overlayAssignTask");
      drawerChild.style.bottom = "-100%";
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setShowToolTip(false);
    }, 10000);
  }, []);

  const chooseImage = (index) => {
    if (index == 0 || index % 5 == 0) {
      return assignIcon;
    }
    if (index == 1 || index % 5 == 1) {
      return assignIcon4;
    }
    if (index == 2 || index % 5 == 2) {
      return assignIcon2;
    }
    if (index == 3 || index % 5 == 3) {
      return assignIcon5;
    }
    if (index == 4 || index % 5 == 4) {
      return assignIcon3;
    }
  };

  return (
    <div className="row">
      {visibleExpertReviewModal && renderDialogBox()}
      <div className="col-3 left-fixed">
        <div className="on-boarding">
          <SideBarInputControl currentStep={4} />
        </div>
      </div>
      <div className="col-12 padding-right">
        <img
          className="bottom-right-bg"
          src={RightImageBg}
          alt="RightImageBg"
        />
        <div className="get-main-assign-task">
          <div id="drawerParentMobile" className="">
            <div id="drawerChildMobile" className="sideBarAssignTask">
              {assignPromptHideShow && (
                <AssignDrawerMobile
                  close={(e, flag) => closeAssign(e, flag)}
                  emailList={emailList}
                  comeFrom={"assignTask"}
                  isExistValue={assignExist}
                  openExpertReview={() => setVisibleExpertReviewModal(true)}
                />
              )}
            </div>
          </div>
          <div className="container">
            <div className="get-started-header">
              <div className="row">
                <div className="col-lg-12">
                  <div className="header_logo">
                    {/* <a href="#" style={{'cursor': 'auto'}}> */}
                    <img
                      src={comtech}
                      alt="COMPLIANCE SUTRA"
                      title="COMPLIANCE SUTRA"
                    />
                    <span className="camp">COMPLIANCE SUTRA</span>
                    {/* </a> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="d-block d-sm-none mobile-steper">
              <div className="row mobile-top-py">
                <div className="col-8">
                  <MobileStepper currentStep={4} />
                  {/* <div class="side-bar-stpper ">
                          
                      </div> */}
                </div>
                <div className="col-4 d-block d-sm-none">
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      onSkipTextClick();
                    }}
                    className="skip-step"
                  >
                    SKIP THIS STEP
                  </span>
                </div>
              </div>
            </div>
            <div className="">
              <div className="">
                <div className="assign-tasks">
                  <p className="company-title">
                    {" "}
                    {/* <img src={leftArrow} alt="" /> */}
                    Let's assign task to your team
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        onSkipTextClick();
                      }}
                      className="skip-step d-none d-sm-block"
                    >
                      SKIP THIS STEP
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bottom-logo-strip-parent">
              {taskListData &&
                taskListData.length > 0 &&
                taskListData.map((item, index) => (
                  <div
                    key={index}
                    className="main-accordian assign-task-accordian"
                  >
                    <div
                      onClick={() => onClickCompanyName(index)}
                      className=" assigntask1 accordian-title d-flex"
                    >
                      {capitalize_Words(item.EntityName)} {""}
                      <i id={`arrow-company${index}`} className="downArrow" />
                    </div>
                    <Collapsible
                      overflowWhenOpen="inherit"
                      open={collapse[index].open}
                    >
                      {item.Licenses &&
                        item.Licenses.length > 0 &&
                        item.Licenses.map((itemTask, indexTask) => (
                          <div
                            key={indexTask}
                            id={`content-company${item.EntityName}${itemTask.LicenseCode}`}
                            style={{ cursor: "pointer" }}
                            className="accordian-grid"
                          >
                            <div className="row accoridian-open-pb">
                              <div className="col-6 col-md-4 col-sm-4 col-lg-5">
                                <div className="d-flex">
                                  <div
                                    onClick={() =>
                                      onClickArrow(item, itemTask.LicenseCode)
                                    }
                                    className="assigntask2 down-arrow d-none d-sm-block"
                                  >
                                    <i
                                      id={`arrow${item.EntityName}${itemTask.LicenseCode}`}
                                      className="downArrow"
                                    />
                                  </div>
                                  <div className="assign-icon">
                                    <img
                                      src={chooseImage(itemTask.licenseIndex)}
                                      // style={{objectFit:"cover",height:"48px"}}
                                      // {
                                      //   itemTask.imageType !== 1 || itemTask.imageType !== 2 || itemTask.imageType !== 3 || itemTask.imageType !== 4 ? height : "49px",width:"49px"
                                      // }
                                      alt=""
                                    />
                                  </div>
                                  <div className="dadaad">
                                    <div className="gst-type">
                                      {itemTask.LicenseCode}
                                    </div>
                                    <div className="count-task-num d-block d-sm-none">
                                      {itemTask.tasks.length} Tasks{" "}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-4 col-md-4 col-sm-4 col-lg-3 d-none d-sm-block">
                                <div className="count-task-num">
                                  {itemTask.tasks.length} Tasks{" "}
                                </div>
                              </div>

                              <div className="col-6 col-md-4 col-sm-4 col-lg-4">
                                <div className="only-mobile-flex mobile-load right-tooltip">
                                  {indexTask === 0 &&
                                    index === 0 &&
                                    showToolTip && (
                                      <div className="toolTip-input">
                                        <div
                                          className="tooltiptext"
                                          style={{ display: "flex" }}
                                        >
                                          {isMobile && (
                                            <div
                                              style={{
                                                width: "10px",
                                                marginTop: "8px",
                                                marginLeft: "3px",
                                              }}
                                            >
                                              <img
                                                src={closeIconWhite}
                                                onClick={() =>
                                                  setShowToolTip(false)
                                                }
                                                style={{
                                                  width: "10px",
                                                  height: "10px",
                                                }}
                                                alt="close Icon"
                                              />
                                            </div>
                                          )}
                                          <div
                                            style={{ marginLeft: "10px" }}
                                            onClick={() =>
                                              setShowToolTip(false)
                                            }
                                          >
                                            <span className="font-normal-text">
                                              Add email to assign this task.
                                            </span>{" "}
                                            You can also get a COMPLIANCE SUTRA
                                            expert to review it for you!
                                          </div>
                                        </div>
                                      </div>
                                    )}

                                  {fields[index].obj[indexTask].email ===
                                    "" && (
                                    <div
                                      onClick={() =>
                                        handleMobileAssignClick(
                                          indexTask,
                                          itemTask,
                                          item.EntityName,
                                          item.EntityId,
                                          index,
                                          "Parent"
                                        )
                                      }
                                      className="only-mobile-assign-add d-block d-sm-none"
                                    >
                                      <div className="assign-status pt-2">
                                        assign
                                      </div>
                                    </div>
                                  )}
                                  {showUserToolTip ===
                                    `Parent${index}${indexTask}` && (
                                    <div className="toolTip-input">
                                      <div className="tooltiptext1">
                                        <span className="font-normal-text1">
                                          {fields[index].obj[indexTask].email}
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                  {fields[index].obj[indexTask].email != "" && (
                                    <div className="only-mobile-assign-add d-block d-sm-none">
                                      <div
                                        className="assign-user-icon"
                                        onMouseOver={() =>
                                          setShowUserToolTip(
                                            `Parent${index}${indexTask}`
                                          )
                                        }
                                        onMouseOut={() =>
                                          setShowUserToolTip("")
                                        }
                                        onClick={() => {
                                          setAssignExist(
                                            fields[index].obj[indexTask].email
                                          );
                                          handleMobileAssignClick(
                                            indexTask,
                                            itemTask,
                                            item.EntityName,
                                            item.EntityId,
                                            index,
                                            "Parent"
                                          );
                                        }}
                                      >
                                        <img
                                          src={mobileUserAssign}
                                          alt="assign user icon"
                                        />
                                      </div>
                                    </div>
                                  )}
                                  <div className="form-group d-none d-sm-block">
                                    <div>
                                      <input
                                        type="text"
                                        id="email-input"
                                        className="form-control"
                                        placeholder="Add email to assign"
                                        value={
                                          fields &&
                                          fields[index] &&
                                          fields[index].obj &&
                                          fields[index].obj[indexTask] &&
                                          fields[index].obj[indexTask].email
                                        }
                                        autoComplete="off"
                                        name="email"
                                        onBlur={(e) =>
                                          storeEmails(
                                            e,
                                            item.EntityName,
                                            item.EntityId,
                                            indexTask
                                          )
                                        }
                                        onChange={(e) => {
                                          handleInputChange(
                                            e,
                                            "",
                                            indexTask,
                                            itemTask,
                                            item.EntityName,
                                            item.EntityId,
                                            index
                                          );
                                        }}
                                        onFocus={handleOnFoucs.bind(
                                          this,
                                          item,
                                          itemTask,
                                          indexTask
                                        )}
                                      />

                                      {fields &&
                                        fields[index] &&
                                        fields[index].obj &&
                                        fields[index].obj[indexTask] &&
                                        fields[index].obj[indexTask].email !==
                                          "" &&
                                        !isEmail(
                                          fields[index].obj[indexTask].email
                                        ) && (
                                          <p className="input-error-message absPosition">
                                            Please enter valid email address
                                          </p>
                                        )}
                                      {fields &&
                                        fields[index] &&
                                        fields[index].obj &&
                                        fields[index].obj[indexTask] &&
                                        fields[index].obj[indexTask].email !==
                                          "" &&
                                        isEmail(
                                          fields[index].obj[indexTask].email
                                        ) &&
                                        issessionEmail(
                                          fields[index].obj[indexTask].email
                                        ) && (
                                          <p
                                            className="input-error-message absPosition"
                                            style={{ textTransform: "none" }}
                                          >
                                            Email already assigned to another
                                            role
                                          </p>
                                        )}

                                      {fields &&
                                        fields[index] &&
                                        fields[index].obj &&
                                        fields[index].obj[indexTask] &&
                                        fields[index].obj[indexTask].email !==
                                          "" &&
                                        isEmail(
                                          fields[index].obj[indexTask].email
                                        ) &&
                                        assignedEmail.length !== 0 &&
                                        assignedEmail.find(
                                          (items, indexs) =>
                                            items ===
                                            fields[index].obj[indexTask].email
                                        ) && (
                                          <p
                                            className="input-error-message absPosition"
                                            style={{ textTransform: "none" }}
                                          >
                                            Email is already exists
                                          </p>
                                        )}

                                      {currentDropDown ===
                                        `CompanyType${
                                          item.EntityName &&
                                          item.EntityName.replaceAll("\\s", "")
                                        }${
                                          itemTask.LicenseCode &&
                                          itemTask.LicenseCode.replaceAll(
                                            "\\s",
                                            ""
                                          )
                                        }${indexTask}` && (
                                        <div ref={innerRef}>
                                          <div
                                            id={`CompanyType${
                                              item.EntityName &&
                                              item.EntityName.replaceAll(
                                                "\\s",
                                                ""
                                              )
                                            }${
                                              itemTask.LicenseCode &&
                                              itemTask.LicenseCode.replaceAll(
                                                "\\s",
                                                ""
                                              )
                                            }${indexTask}`}
                                            className="dropdown-email"
                                          >
                                            {emailList && emailList.length > 0 && (
                                              <div
                                                className="dropdown-user-list"
                                                style={{ zIndex: 99999999 }}
                                              >
                                                {emailList &&
                                                  emailList.length > 0 &&
                                                  emailList.map((data, id) => (
                                                    <div
                                                      key={id}
                                                      className="user-list-row"
                                                    >
                                                      <div
                                                        onClick={() =>
                                                          handleInputChange(
                                                            "",
                                                            data.email,
                                                            indexTask,
                                                            itemTask,
                                                            item.EntityName,
                                                            item.EntityId,
                                                            index
                                                          )
                                                        }
                                                        className="dropdown-email"
                                                      >
                                                        <img
                                                          src={assignIconCircle}
                                                          alt="user circle Icons"
                                                        />
                                                        {data.email}
                                                      </div>
                                                      <hr />
                                                    </div>
                                                  ))}

                                                <div>
                                                  <div className="col-12 pl-0 pr-0">
                                                    <div className="Line-dropdown"></div>
                                                  </div>
                                                  <div className="user-list-row">
                                                    <img
                                                      className="blue-icon"
                                                      src={dropdownBlueIcon}
                                                      alt="dropdown Blue Icon"
                                                    />
                                                    <div className="SecMark-Expert-Review">
                                                      Expert Review
                                                    </div>
                                                    <div
                                                      style={{
                                                        cursor: "pointer",
                                                      }}
                                                      onClick={() =>
                                                        setVisibleExpertReviewModal(
                                                          true
                                                        )
                                                      }
                                                      className="dropDown-blueLink"
                                                    >
                                                      View Details
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
                                  <div
                                    onClick={() =>
                                      onClickArrow(item, itemTask.LicenseCode)
                                    }
                                    className="assigntask2 down-arrow d-block d-sm-none"
                                  >
                                    <i
                                      id={`arrow${item.EntityName}${itemTask.LicenseCode}`}
                                      className="downArrow"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div
                                id={`content${item.EntityName}${itemTask.LicenseCode}`}
                                className="accordian-bar-with-min col-md-12 bg-transperent"
                              >
                                <div className="accoridian-coolpus-view">
                                  <div className="accordian-collapus-header d-none d-sm-block">
                                    <div className="row">
                                      <div className="col-5">
                                        <div className="accordian-data-title spacing-alignment">
                                          Task Name
                                        </div>
                                      </div>
                                      <div className="col-3">
                                        <div className="accordian-data-title">
                                          Frequency
                                        </div>
                                      </div>
                                      <div className="col-4">
                                        <div className="accordian-data-title">
                                          Assign Task
                                        </div>
                                      </div>
                                      <div className="col-12 spacing-alignment-border">
                                        <div className="header-border"></div>
                                      </div>
                                    </div>
                                  </div>
                                  {renderTaskList(
                                    itemTask.tasks,
                                    item.EntityName,
                                    itemTask.LicenseCode,
                                    item.EntityId
                                  )}

                                  <div className="space-btn"></div>
                                  {/* <div className="accordian-data-history">
                                      <div className="row">
                                         <div className="col-3 alignment-fix">
                                            <div className="accordian-data-backend">Task Name</div>
                                         </div>
                                         <div className="col-5">
                                            <div className="accordian-data-backend pl-2">Due Date</div>
                                         </div>
                                         <div className="col-4 pr-0 pl-0">
                                            {/*<div className="input-padding">
                                               <div className="form-group"><input type="text" className="form-control form-control-focus" placeholder="Enter email to assign" required="" /></div>
                                            </div>*
                                         </div>
                                         <div className="col-12 alignment-fix">
                                            <div className="header-border-blur"></div>
                                         </div>
                                      </div>
                                   </div> */}
                                  <div className="space-btn"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </Collapsible>
                  </div>
                ))}
            </div>
          </div>
          <div className="container">
            <div className="bottom-logo-strip">
              <div className="row aligncenter">
                <div className="col-12">
                  <div className="pinkBox-inline">
                    <button
                      onClick={() => routeToAssignTask()}
                      className={
                        Object.values(emailError).find(
                          (item) => item === "yes"
                        ) !== true
                          ? "btn save-details common-button2  mb-2"
                          : "btn save-details common-button2"
                      }
                      disabled={
                        Object.values(emailError).find(
                          (item) => item === "yes"
                        ) || emailError.length === 0
                      }
                    >
                      Done
                    </button>
                    <div className="review-box">
                      <div className="row">
                        <div className="col-9 pr-0">
                          <div className="pink-title">Enable expert review</div>
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={() => setVisibleExpertReviewModal(true)}
                            className="view-detail-link"
                          >
                            View Details
                          </div>
                        </div>
                        <div className="col-3 pr-0">
                          <div className="switch-btn">
                            <label className="switch">
                              <input
                                name="secmarkexpert"
                                value={enablesecmarkExpert}
                                onChange={(e) => handleFields(e)}
                                type="checkbox"
                              />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-sm-6 col-xl-6">
                  {/* <p className="account-link-assign">You are not the right person to assign the task?{activeInvite === false ?
                    (<span style={{ cursor: 'pointer' }} onClick={() => { setActiveInvite(true) }} className="invite-link"> INVITE</span>)
                    : (<input
                      name="inviteemail"
                      value={inviteVal}
                      className="form-control"
                      placeholder="Add email to invite"
                      onChange={(e) => handleFields(e)}
                    />
                    )}{inviteVal !== "" && !isEmail(inviteVal) && (<p className="input-error-message">Please Enter Valid Email Address</p>)}</p> */}
                </div>
                <div className="col-6 col-md-6 col-sm-6 col-xl-6 d-none d-sm-block text-right">
                  {/* <a href="#" style={{'cursor': 'auto'}}> */}
                  <span className="powerBy">Powered by</span>
                  <img
                    className="header_logo footer-logo-secmark"
                    src={secmark}
                    alt="SECMARK"
                    title="SECMARK"
                  />
                  {/* </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(AssignTask);
