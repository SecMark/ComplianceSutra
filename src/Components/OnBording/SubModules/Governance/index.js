import React, { useState, useEffect } from "react";
import "./style.css";
import comtech from "../../../../assets/Images/CapmTech.png";
import secmark from "../../../../assets/Images/secmark.png";
import reviewClose from "../../../../assets/Icons/reviewClose.png";
import mobileUserAssign from "../../../../assets/Icons/mobileUserAssign.png";
import RightImageBg from "../../../../assets/Images/Onboarding/RectangleOnboadign.png";
import smallCloseTag from "../../../../assets/Icons/smallCloseTag.png";
import { useDispatch, useSelector } from "react-redux";
import SideBarInputControl from "../../../OnBording/SubModules/SideBarInputControl";
import { isEmail } from "../AssignTask/utils";
import { withRouter } from "react-router-dom";
import modelSquare from "../../../../assets/Icons/modelSquare.png";
import modelBox from "../../../../assets/Icons/modelBox.png";
import { actions as governanceActions } from "../../../OnBording/redux/actions";
import MobileStepper from "../mobileStepper";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import AssignDrawerMobile from "../AssignDrawerMobile";
import axiosInstance from "../../../../apiServices";

function Governance({ history }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [assignTaskEmail, setAssignTaskEmail] = useState([]);
  const [approvalTaskEmail, setApprovalTaskEmail] = useState([]);
  const [visibleExpertReviewModal, setVisibleExpertReviewModal] =
    useState(false);
  const [assignButtonIndex, setAssignButtonIndex] = useState([]);
  const [emailApproval, setApprovalEmail] = useState("");
  const [approvalEmailErr, setApprovalEmailErr] = useState("");
  const [companyData, setCompanyData] = useState([]);
  const [statusReportEmail, setStatusReportEmail] = useState([]);
  const [taskReportEmailErr, setTaskReportEmailErr] = useState("");
  const [statusEmail, setStatusEmail] = useState("");
  const [enableSecmarkReview, setEnableSecmarkReview] = useState(false);
  const [emailCheck, setEmailCheck] = useState("");
  const [fieldsAssign, setfieldsAssign] = useState(undefined);
  const [assignPromptHideShow, setAssignPromptHideShow] = useState(false);
  const [disabled, setdisabled] = useState(false);
  const [showUserToolTip, setShowUserToolTip] = useState("");
  const [assignExist, setAssignExist] = useState("");
  const [emailAlreadyAssign, setEmailAlreadyAssign] = useState(false);
  const [emailApproveRole, setemailApproveRole] = useState(false);
  const [emailApproveReport, setemailApproveReport] = useState(false);
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

  const companyInfo =
    state &&
    state?.complianceOfficer &&
    state?.complianceOfficer?.goveranceData;

  const handleKeyDown1 = (e) => {
    if (e.key === "Enter") {
      handleOnBlurEmailApproval(e);
    }
  };

  const handleKeyDown2 = (e) => {
    if (e.key === "Enter") {
      handleOnBlurEmailStatusReport(e);
    }
  };

  const renderDialogBox = () => {
    return (
      <div className="governance-modal">
        <Modal
          blockScroll={false}
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
          modalId="governance"
          styles={{ width: 640, margin: 20, overflow: "hidden" }}
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

  const handleAssignTaskEmail = (e, index, item) => {
    setEmailCheck(false);
    setEmailAlreadyAssign(false);
    const { value, name } = e.target;
    let obj = {
      email: value,
      companyName: item.EntityName,
      categoryName: item.Category,
      emailAvail: "",
    };
    let tempobj = [...assignTaskEmail];
    if (tempobj && tempobj[index] && tempobj[index].email) {
      tempobj[index].email = value;
      tempobj[index].companyName = item.EntityName;
      tempobj[index].categoryName = item.Category;
      tempobj[index].emailAvail = "";
    } else {
      tempobj[index] = obj;
    }
    setAssignTaskEmail(tempobj);
  };

  const assignComplainceOffice = (event, index) => {
    const { value } = event.target;
    let temp = [...companyData];
    temp[index].compliance_officer = value;
    setCompanyData(temp);
  };

  const onDoneButtonClick = async () => {
    const { data } = await axiosInstance.post(
      "compliance.api.setGovernanceOfficerCompany",
      {
        details: companyData,
        expert_review: enableSecmarkReview,
        status_report: [emailApproval, statusEmail],
      }
    );

    if (data.message.success) {
      localStorage.setItem("expertReview", enableSecmarkReview);
      history.push("/assign-task");
    }
  };

  const handleApprovalTaskEmail = (e) => {
    setemailApproveRole(false);
    setApprovalEmailErr("");
    const { value, name } = e.target;
    const email = e.target.value;
    setApprovalEmail(e.target.value);
  };
  const handleStatusReportEmail = (e) => {
    setemailApproveReport(false);
    setTaskReportEmailErr("");
    const { value, name } = e.target;
    const email = e.target.value;
    setStatusEmail(e.target.value);
  };

  const handleOnBlurEmailApproval = (e) => {
    if (e.target.value !== "" && isEmail(e.target.value)) {
      //checkEmailAlreadyExistsOrNot(e.target.value, 0, "approval");
    }
    handleappprovalEmail();
  };
  const handleappprovalEmail = () => {
    if (emailApproval !== "" && isEmail(emailApproval) === true) {
      setdisabled(true);
    } else if (emailApproval === "") {
      setdisabled(true);
    }
  };

  const handleOnBlurEmailStatusReport = (e) => {
    let list = statusReportEmail;
    if (e.target.value !== "") {
      if (isEmail(e.target.value)) {
        // checkEmailAlreadyExistsOrNot(e.target.value, 0, "statusreport");
      }
    } else {
    }
    EmailCheck();
  };
  const EmailCheck = () => {
    if (statusEmail !== "" && isEmail(statusEmail) === true) {
      setdisabled(true);
    } else if (statusEmail === "") {
      setdisabled(true);
    }
  };
  const handleEnableSecmarkReview = (e) => {
    setEnableSecmarkReview(true);
  };
  const handleDeleteEmail = (index) => {
    const list = [...approvalTaskEmail];
    list.splice(index, 1);
    setApprovalTaskEmail(list);
  };
  const handleDeleteEmailStatus = (index) => {
    const list = [...statusReportEmail];
    list.splice(index, 1);
    setStatusReportEmail(list);
  };

  const skipPage = () => {
    history.push("/assign-task");
  };

  const handleMobileAssignClick = (item, index) => {
    let assignObj = {
      emailItem: item,
      emailIndex: index,
    };
    setfieldsAssign(assignObj);
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
      handleAssignTaskEmail(
        obj,
        fieldsAssign.emailIndex,
        fieldsAssign.emailItem
      );
    }
    setAssignExist("");
    setAssignPromptHideShow(false);
    setfieldsAssign(undefined);
    const drawerParent = document.getElementById("drawerParentMobile");
    const drawerChild = document.getElementById("drawerChildMobile");
    if (drawerParent) {
      drawerParent.classList.remove("overlayAssignTask");
      drawerChild.style.bottom = "-100%";
    }
  };

  const renderCompanyRow = (item, index) => {
    return (
      <div key={index} className="col-12 row">
        <div className="col-8 col-md-3 col-sm-3 col-xl-3 pl-0">
          <div className="goverance-desc-input">{item.company_name}</div>
          <div className="goverance-desc-input-after d-block d-sm-none">
            {item.company_name}
          </div>
        </div>
        <div className="col-3 col-md-5 col-sm-5 col-xl-5 d-none d-sm-block">
          <div className="goverance-desc-input-after">{item.industry[0]}</div>
        </div>
        <div className="col-4 col-md-4 col-sm-4 col-xl-4">
          <div className="input-grid-right">
            <div className="form-group mt-2 d-none d-sm-block">
              <div>
                <input
                  type="text"
                  className="form-control place-style countryCode-sucess"
                  placeholder="Add email to assign"
                  name="assigntaskemail"
                  autoComplete="off"
                  onFocus={() => setdisabled(false)}
                  // onBlur={(e) => checkEmailAvailorNot(e, index)}
                  onChange={(e) => {
                    assignComplainceOffice(e, index);
                  }}
                  value={item && item[index] && item[index].compliance_officer}
                />
                {assignTaskEmail &&
                  assignTaskEmail[index] &&
                  assignTaskEmail[index].email !== "" &&
                  !isEmail(assignTaskEmail[index].email) && (
                    <p
                      className="input-error-message"
                      style={{ position: "absolute" }}
                    >
                      Please enter valid email address
                    </p>
                  )}

                {emailAlreadyAssign === true
                  ? assignTaskEmail[index].email !== "" && (
                      <p
                        className="input-error-message"
                        style={{ position: "absolute" }}
                      >
                        Email is already assigned to other role
                      </p>
                    )
                  : assignTaskEmail &&
                    assignTaskEmail[index] &&
                    assignTaskEmail[index].emailAvail !== "" && (
                      <p
                        className="input-error-message"
                        style={{ position: "absolute" }}
                      >
                        Email is already exists
                      </p>
                    )}
              </div>
            </div>
            {assignTaskEmail &&
              assignTaskEmail[index] &&
              assignTaskEmail[index].email === "" && (
                <div
                  onClick={() => handleMobileAssignClick(item, index)}
                  className="only-mobile-assign-add d-block d-sm-none"
                >
                  <div className="assign-status mt-1">assign</div>
                </div>
              )}
            {showUserToolTip === `AssignTip${index}` && (
              <div className="toolTip-input">
                <div className="tooltiptext">
                  <span className="font-normal-text">
                    {assignTaskEmail[index].email}
                  </span>
                </div>
              </div>
            )}
            {assignTaskEmail &&
              assignTaskEmail[index] &&
              assignTaskEmail[index].email != "" && (
                <div className="only-mobile-assign-add d-block d-sm-none">
                  <div
                    className="assign-user-icon"
                    onMouseOver={() => setShowUserToolTip(`AssignTip${index}`)}
                    onMouseOut={() => setShowUserToolTip("")}
                    onClick={() => {
                      setAssignExist(item.email);
                      handleMobileAssignClick(item, index);
                    }}
                  >
                    <img src={mobileUserAssign} alt="assign user icon" />
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    dispatch(governanceActions.governanceAPIRequest());
  }, []);

  useEffect(() => {
    let tempArr = [];
    console.log(state?.complianceOfficer);
    setCompanyData(companyInfo);
    setAssignTaskEmail(tempArr);
  }, [companyInfo]);

  return (
    <div className="row">
      {visibleExpertReviewModal && renderDialogBox()}
      <div className="col-3 left-fixed">
        <div className="on-boarding">
          <SideBarInputControl currentStep={3} />
        </div>
      </div>
      <div className="col-12 padding-right">
        <img
          className="bottom-right-bg"
          src={RightImageBg}
          alt="RightImageBg"
        />
        <div className="get-main-goverance">
          <div id="drawerParentMobile" className="">
            <div id="drawerChildMobile" className="sideBarGovernance">
              {assignPromptHideShow && (
                <AssignDrawerMobile
                  close={(e, flag) => closeAssign(e, flag)}
                  comeFrom={"governance"}
                  isExistValue={assignExist}
                />
              )}
            </div>
          </div>
          <div className="container">
            <div className="bottom-input">
              <div className="get-started-header">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="header_logo">
                      <img
                        src={comtech}
                        alt="COMPLIANCE SUTRA"
                        title="COMPLIANCE SUTRA"
                      />
                      <span className="camp">COMPLIANCE SUTRA</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-block d-sm-none mobile-steper">
                <div className="row mobile-top-py">
                  <div className="col-8">
                    <MobileStepper currentStep={3} />
                  </div>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => skipPage()}
                    className="col-4 d-block d-sm-none"
                  >
                    <span className="skip-step">SKIP THIS STEP</span>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="">
                  <div className="company-licenses-goverance">
                    <p className="company-title-goverance">
                      {" "}
                      Let's set up governance{" "}
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => skipPage()}
                        className="skip-step d-none d-sm-block"
                      >
                        SKIP THIS STEP
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="bottom-logo-strip-goverance">
                <div className="who-assign-task">
                  <div className="row">
                    <div className="col-10">
                      <div className="assign-goverance">
                        Who will assign tasks?
                      </div>
                      <div className="goverance-desc">
                        People who can assign tasks to team members (Eg. Sr.
                        Management, Compliance Officer or Team Manager or leads)
                      </div>
                      <div className="space-bottom">
                        <div className="col-12 row">
                          <div className="col-8 col-md-3 col-sm-3 col-xl-3 pl-0">
                            <div className="govarance-title">Company Name</div>
                          </div>
                          <div className="col-3 col-md-5 col-sm-5 col-xl-5 d-none d-sm-block">
                            <div className="govarance-title">
                              Business category
                            </div>
                          </div>
                          <div className="col-4 col-md-4 col-sm-4 col-xl-4">
                            <div className="govarance-title d-flex">
                              <span className="d-none d-sm-block">
                                Assign&nbsp;
                              </span>{" "}
                              Compliance Officer
                            </div>
                          </div>
                        </div>
                        <div className="divider-line"></div>
                        {companyData &&
                          companyData.length > 0 &&
                          companyData.map((item, index) => {
                            let modifiedObj = item;
                            item.email = "";
                            return renderCompanyRow(modifiedObj, index);
                          })}
                      </div>
                    </div>
                  </div>
                  <div className="col-10 pl-0 pr-0">
                    <div class="border-line"></div>
                  </div>
                </div>
                <div className="who-assign-task">
                  <div className="row">
                    <div className="col-10">
                      <div className="assign-goverance">
                        Who will approve tasks?
                      </div>
                      <div className="goverance-desc">
                        Person who can approve tasks completed by team members
                        (Eg. Compliance Officer or Sr. Team Manager)
                      </div>
                      <div className="form-group mt-2">
                        <div>
                          {approvalTaskEmail &&
                            approvalTaskEmail.length > 0 &&
                            approvalTaskEmail.map((item, index) => (
                              <div key={index} className="chip">
                                {item.email}

                                <img
                                  onClick={() => handleDeleteEmail(index)}
                                  src={smallCloseTag}
                                  alt="Close Tag"
                                />
                              </div>
                            ))}
                          <input
                            type="text"
                            className="form-control only-bottom"
                            placeholder="Add emails to invite"
                            value={emailApproval || ""}
                            onFocus={() => setdisabled(false)}
                            onBlur={(e) => handleOnBlurEmailApproval(e)}
                            name="approvaltaskemail"
                            onChange={(e) => handleApprovalTaskEmail(e)}
                            onKeyPress={(e) => handleKeyDown1(e)}
                          />
                          {emailApproval !== "" && !isEmail(emailApproval) && (
                            <p
                              className="input-error-message"
                              style={{ position: "absolute" }}
                            >
                              Please enter valid email address
                            </p>
                          )}
                          {approvalEmailErr === "yes" ? (
                            <p
                              className="input-error-message"
                              style={{ position: "absolute" }}
                            >
                              Email is already exists
                            </p>
                          ) : emailApproveRole === true ? (
                            <p
                              className="input-error-message"
                              style={{ position: "absolute" }}
                            >
                              Email is already assigned to other role
                            </p>
                          ) : null}
                        </div>
                      </div>
                      <div className="review-box" style={{ marginTop: "26px" }}>
                        <div className="row">
                          <div className="col-9 pr-0">
                            <div className="pink-title">
                              Enable expert review
                            </div>
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
                                  type="checkbox"
                                  value={enableSecmarkReview}
                                  onChange={(e) => handleEnableSecmarkReview(e)}
                                />
                                <span className="slider round"></span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-10 pl-0 pr-0">
                    <div class="border-line"></div>
                  </div>
                </div>
                <div className="who-assign-task">
                  <div className="row">
                    <div className="col-10">
                      <div className="assign-goverance">
                        Who should receive status reports?
                      </div>
                      <div className="goverance-desc">
                        People who needs to have an overall view of completion
                        and performance. (Eg. Compliance Officer or Sr.
                        Management like company owners)
                      </div>
                      <div className="form-group mt-2">
                        <div>
                          {statusReportEmail &&
                            statusReportEmail.length > 0 &&
                            statusReportEmail.map((item, index) => (
                              <div
                                key={index}
                                onClick={() => handleDeleteEmailStatus(index)}
                                style={{ cursor: "pointer" }}
                                className="chip"
                              >
                                {item.email}
                                <img src={smallCloseTag} alt="Close Tag" />
                              </div>
                            ))}

                          <input
                            type="text"
                            className="form-control only-bottom"
                            placeholder="Add emails to invite"
                            value={statusEmail}
                            name="statusEmail"
                            onFocus={() => setdisabled(false)}
                            onBlur={(e) => handleOnBlurEmailStatusReport(e)}
                            onChange={(e) => handleStatusReportEmail(e)}
                            onKeyPress={(e) => handleKeyDown2(e)}
                          />
                          {statusEmail !== "" && !isEmail(statusEmail) && (
                            <p
                              className="input-error-message"
                              style={{ position: "absolute" }}
                            >
                              Please enter valid email address
                            </p>
                          )}

                          {taskReportEmailErr === "yes" ? (
                            <p
                              className="input-error-message"
                              style={{ position: "absolute" }}
                            >
                              Email is already exists
                            </p>
                          ) : emailApproveReport === true ? (
                            <p
                              className="input-error-message"
                              style={{ position: "absolute" }}
                            >
                              Email is already assigned to other role
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bottom-logo-strip">
                <div className="row aligncenter">
                  <div className="col-md-6 col-xs-12">
                    {disabled === true ? (
                      <button
                        onClick={() => onDoneButtonClick()}
                        className="btn save-details common-button  mb-2"
                        disabled={
                          assignTaskEmail.find(
                            (item) => item.compliance_officer
                          ) === undefined &&
                          approvalTaskEmail.length !== 0 &&
                          statusReportEmail.length !== 0
                            ? true
                            : false
                        }
                      >
                        Done
                      </button>
                    ) : (
                      <button
                        className="btn save-details common-button  mb-2"
                        disabled={true}
                      >
                        Done
                      </button>
                    )}
                  </div>
                  <div className="col-md-6 col-xs-12 d-none d-sm-block text-right">
                    <a href="#" style={{ cursor: "auto" }}>
                      <span className="powerBy">Powered by</span>
                      <img
                        className="header_logo footer-logo-secmark"
                        src={secmark}
                        alt="SECMARK"
                        title="SECMARK"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Governance);
