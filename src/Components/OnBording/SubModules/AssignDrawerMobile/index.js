import React, { useState, useEffect } from "react";
import "./style.css";
import closeIcon from "../../../../assets/Icons/closeIcon.png";
import inputRightArrow from "../../../../assets/Icons/inputRightArrow.png";
import dropdownBlueIcon from "../../../../assets/Icons/dropdownBlueIcon.png";
import { BACKEND_BASE_URL } from "../../../../apiServices/baseurl";
import axios from "axios";
import { isEmail } from "../AssignTask/utils";
function AssignDrawerMobile(props) {
  const [emailErr, setEmailErr] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [emailListHideShow, setEmailListHideShow] = useState(false);
  const [isEmailExist, setIsEmailExist] = useState(false);
  const [url, setUrl] = useState(window.location.hash);

  const closeButtonCall = (flag) => {
    props.close(emailVal, flag);
  };
  useEffect(() => {
    setEmailVal(props.isExistValue);
  }, []);

  const checkEmailAlreadyExistsOrNot = async (email) => {
    if (isEmail(email)) {
      await axios
        .post(`${BACKEND_BASE_URL}/api/availabilityCheck`, {
          loginID: email.trim(),
          pwd: "",
          rememberme: 0,
          loginty: "AdminEmail",
        })
        .then(
          (response) => {
            if (response && response.data && response.data.Status === "True") {
              setIsEmailExist(true);
            } else {
              setIsEmailExist(false);
            }
          },
          (error) => {}
        );
    }
  };

  return (
    <div className="get-main">
      <div className="container-fluid pl-0 pr-0">
        <div className="choose-licenses">
          <div className="choose-licenses-title choose-licene-goverance">
            <div className="d-flex">
              <div className="col-6 pl-0">
                <img
                  className="closeIcon"
                  onClick={() => closeButtonCall(2)}
                  src={closeIcon}
                  alt="closeIcon"
                />
              </div>
            </div>
            <p className="licenses-title">
              {url && url === "#/assign-task"
                ? "Assign Task"
                : "Assign Compliance Officer"}
            </p>
            <div className="input-comment-box">
              <input
                type="text"
                className="form-control"
                value=""
                placeholder="Add email to assign"
                value={emailVal}
                onChange={(e) => {
                  setEmailVal(e.target.value);
                  if (
                    props.comeFrom === "governance" &&
                    isEmail(e.target.value)
                  ) {
                    checkEmailAlreadyExistsOrNot(e.target.value);
                  }
                }}
                onFocus={() => {
                  if (props.comeFrom === "assignTask") {
                    setEmailListHideShow(true);
                  }
                }}
              />
              <div
                className="inputIcon"
                onClick={() => {
                  if (props.comeFrom === "assignTask" && emailVal != "") {
                    closeButtonCall(1);
                  } else if (
                    props.comeFrom === "governance" &&
                    emailVal != "" &&
                    !isEmailExist
                  ) {
                    closeButtonCall(1);
                  }
                }}
                style={{
                  opacity:
                    props.comeFrom === "assignTask" &&
                    isEmail(emailVal) &&
                    emailVal != ""
                      ? 1
                      : props.comeFrom === "governance" &&
                        isEmail(emailVal) &&
                        emailVal != "" &&
                        !isEmailExist
                      ? 1
                      : 0.6,
                }}
              >
                <img
                  src={inputRightArrow}
                  alt=""
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
            {emailVal != "" && !isEmail(emailVal) && (
              <p className="input-error-message">
                Please Enter Valid Email Address
              </p>
            )}
            {emailVal != "" && isEmail(emailVal) && isEmailExist && (
              <p className="input-error-message">
                Email is alreday assigned to other role
              </p>
            )}
            {emailErr === "" &&
              emailListHideShow &&
              props.comeFrom === "assignTask" && (
                <div className="dropdown-email">
                  {props.emailList && props.emailList.length > 0 && (
                    <div className="dropdown-user-list">
                      {props.emailList &&
                        props.emailList.length > 0 &&
                        props.emailList.map((data, id) => (
                          <div key={id} className="user-list-row">
                            <div
                              onClick={() => {
                                setEmailVal(data.email);
                                setEmailListHideShow(false);
                              }}
                              className="dropdown-email"
                            >
                              {data.email}
                            </div>
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
                            CAPMTech Expert Review
                          </div>
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={() => props.openExpertReview()}
                            className="dropDown-blueLink"
                          >
                            View Details
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignDrawerMobile;
