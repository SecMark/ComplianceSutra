import React, { useEffect, useState } from "react";
import "./style.css";
import RightImageBg from "../../../../assets/Images/Onboarding/RectangleOnboadign.png";
import comtech from "../../../../assets/Images/CapmTech.png";

import { Modal } from "react-responsive-modal";
import modelSquare from "../../../../assets/Icons/modelSquare.png";
import modelBox from "../../../../assets/Icons/modelBox.png";
import reviewClose from "../../../../assets/Icons/reviewClose.png";
import Collapsible from "react-collapsible";
import { BACKEND_BASE_URL } from "../../../../apiServices/baseurl";
import SideBarInputControl from "../SideBarInputControl";
import { useDispatch, useSelector } from "react-redux";
import { actions as companyActions } from "../../redux/actions";
import { isEmail, issessionEmail, useOuterClick } from "./utils";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import MobileStepper from "../mobileStepper";
import AssignDrawerMobile from "../AssignDrawerMobile";
import axios from "axios";
import { isMobile } from "react-device-detect";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import assignIcon1 from "../../../../assets/Icons/assignIcon.png";
import assignIcon3 from "../../../../assets/Icons/assignIcon2.png";
import assignIcon5 from "../../../../assets/Icons/assignIcon3.png";
import assignIcon2 from "../../../../assets/Icons/assignIcon4.png";
import assignIcon4 from "../../../../assets/Icons/assignIcon5.png";

function AssignTask({ history }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [assignPromptHideShow, setAssignPromptHideShow] = useState(false);
  const [assignField, setAssignField] = useState(undefined);
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

  const [fields, setFields] = useState([]);

  const [taskToAssign, setTaskToAssign] = useState({});

  const [emailList, setEmailList] = useState([]);
  const [currentDropDown, setCurrentDropDown] = useState("");
  const [showToolTip, setShowToolTip] = useState(true);
  const [activeToolTipIndex, setActiveToolTipIndex] = useState(0);
  const [visibleExpertReviewModal, setVisibleExpertReviewModal] =
    useState(false);
  const [emailError, setemailError] = useState([]);
  const [taskListData, setTaskListData] = useState([]);

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

      values[CompanyIndex].obj[index] = temp;
      setFields(values);
      setCurrentDropDown("");
    }

    setShowToolTip(false);
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

  const storeEmails = (
    e,

    companyEntityName,
    EntityGroupID,
    index
  ) => {
    let emailObject = companyEntityName + EntityGroupID + index;

    handleCheckEmailAvailability(e.target.value, emailObject);
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

  const chooseImage = (index) => {
    if (index == 0 || index % 5 == 0) {
      return assignIcon1;
    }
    if (index == 1 || index % 5 == 1) {
      return assignIcon2;
    }
    if (index == 2 || index % 5 == 2) {
      return assignIcon3;
    }
    if (index == 3 || index % 5 == 3) {
      return assignIcon4;
    }
    if (index == 4 || index % 5 == 4) {
      return assignIcon5;
    }
  };

  useEffect(() => {
    dispatch(
      companyActions.getAssignTaskDataReuest({
        coUserId: userID,
      })
    );
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowToolTip(false);
    }, 10000);
  }, []);

  useEffect(() => {
    const newLicenseList = assignTaskData?.task_details?.map((values) => {
      return {
        company_id: values.company_id,
        companyName: values.companyName,
        licenseAndTaskList: values.licenseAndTaskList.map((Lvalues) => {
          return {
            licenseName: Lvalues.licenseName,
            show: false,
            taskList: Lvalues.taskList.map((Stask) => {
              return {
                name: Stask.name,
                subject: Stask.subject,
                license: Stask.license,
                completed_by: Stask.completed_by,
                customer: Stask.customer,
                frequency: Stask.frequency,
                customer_name: Stask.customer_name,
                assign: false,
              };
            }),
          };
        }),
      };
    });
    assignTaskData && setTaskListData(newLicenseList);
  }, [assignTaskData]);

  const showAllTask = (index) => {
    let temp = [...taskListData];
    temp[0].licenseAndTaskList[index].show =
      !temp[0].licenseAndTaskList[index].show;
    setTaskListData(temp);
  };

  const assignTask = (index, jIndex) => {
    let temp = [...taskListData];
    temp[0].licenseAndTaskList[index].taskList[jIndex].assigned =
      !temp[0].licenseAndTaskList[index].taskList[jIndex].assigned;
    setTaskListData(temp);
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

            {taskListData &&
              taskListData[0]?.licenseAndTaskList.map((licenseItem, JIndex) => {
                return (
                  <div className="row">
                    <div className="col-4">
                      <span onClick={() => showAllTask(JIndex)}>
                        {licenseItem.show ? <BsChevronUp /> : <BsChevronDown />}
                      </span>
                      <img
                        src={chooseImage(JIndex)}
                        alt="assignIcon"
                        style={
                          chooseImage(1) == assignIcon4
                            ? { height: 44, width: 44 }
                            : {}
                        }
                      />
                      <span>{licenseItem.licenseName}</span>
                    </div>
                    <div className="col-4">{licenseItem.taskList.length}</div>
                    <div className="col-4">
                      <input placeholder="Add email to assign task" />
                    </div>
                    {licenseItem.show && (
                      <>
                        {" "}
                        <div className="col-5">
                          <div className="accordian-data-title spacing-alignment">
                            Task Name
                          </div>
                        </div>
                        <div className="col-3">
                          <div className="accordian-data-title">Frequency</div>
                        </div>
                        <div className="col-4">
                          <div className="accordian-data-title">
                            Assign Task
                          </div>
                        </div>
                        <div className="col-12 spacing-alignment-border">
                          <div className="header-border"></div>
                        </div>
                      </>
                    )}

                    {licenseItem.show &&
                      licenseItem.taskList.map((subTask, Sindex) => {
                        return (
                          <>
                            <div className="col-5">
                              <div className="accordian-data-title spacing-alignment">
                                {subTask.subject}
                              </div>
                            </div>
                            <div className="col-3">
                              <div className="accordian-data-title">
                                {subTask.frequency}
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="accordian-data-title">
                                {subTask.assigned ? (
                                  <input placeholder="Add email to assign task" />
                                ) : (
                                  <button
                                    onClick={() => assignTask(JIndex, Sindex)}
                                  >
                                    Assign Task
                                  </button>
                                )}
                              </div>
                            </div>
                          </>
                        );
                      })}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(AssignTask);
