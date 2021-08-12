import React, { useState } from "react";
import RightImageBg from "../../../../../assets/Images/Onboarding/RectangleOnboadign.png";
import comtech from "../../../../../assets/Images/CapmTech.png";
import secmark from "../../../../../assets/Images/secmark.png";
import { useDispatch, useSelector } from "react-redux";
import { checkPersonalDetailsForm } from "../../util.js";
import { actions as personalDetailsAction } from "../../../redux/actions";
import { withRouter } from "react-router-dom";
import SideBarInputControl from "../../components/SideBarInputControlTeamMember";
import { toast } from "react-toastify";
function PersonalDetails({ history }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const quote_id = state && state.auth && state.auth.quote_id;
  const [isValidate, setIsValidate] = useState(false);
  const [values, setValues] = useState({
    fullName: "",
    mobileNumber: "",
    designation: "",
    password: "",
    confirmPassword: "",
  });

  const onChangeHandler = (name) => (event) => {
    if (name === "fullName" || name === "designation") {
      const re = /^[a-z|A-Z_ ]*$/;
      if (event.target.value && !re.test(event.target.value)) {
        return "";
      }
    }
    const mobileNumberReg = /^[0-9]{0,10}$/;
    if (name === "mobileNumber") {
      console.log("event.target.value", event.target.value);
      if (!mobileNumberReg.test(event.target.value)) {
        return "";
      }
    }
    setValues({ ...values, [name]: event.target.value });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSubmit();
    }
  };

  const onSubmit = () => {
    const email =
      state &&
      state.teamMemberFlow &&
      state.teamMemberFlow.teamMemberEmailVerifyInfo &&
      state.teamMemberFlow.teamMemberEmailVerifyInfo &&
      state.teamMemberFlow.teamMemberEmailVerifyInfo &&
      state.teamMemberFlow.teamMemberEmailVerifyInfo.teamMemberInfo &&
      state.teamMemberFlow.teamMemberEmailVerifyInfo.teamMemberInfo.email;

    const companyName =
      state &&
      state.teamMemberFlow &&
      state.teamMemberFlow.teamMemberEmailVerifyInfo &&
      state.teamMemberFlow.teamMemberEmailVerifyInfo &&
      state.teamMemberFlow.teamMemberEmailVerifyInfo &&
      state.teamMemberFlow.teamMemberEmailVerifyInfo.teamMemberInfo.companyName;

    setIsValidate(true);
    if (checkPersonalDetailsForm(values)) {
      return;
    }
    setIsValidate(false);
    if (companyName && email) {
      dispatch(
        personalDetailsAction.insUpdateDeletAPIRequestTM({
          entityName: companyName,
          adminName: values.fullName,
          adminMobile: values.mobileNumber,
          adminEmail: email,
          adminPWD: values.password,
          isClientTypeUser: 0,
          userType: 4,
          actionFlag: 1,
          designation: values.designation,
          userID: "",
          history,
          from: "personal-details-team",
        })
      );
    } else {
      toast.error("something went wrong");
    }
  };
  return (
    <div className="row">
      <div className="col-3 left-fixed">
        <div className="on-boarding">
          <SideBarInputControl currentScreen={1} />
        </div>
      </div>
      <div className="col-12 padding-right">
        <img
          className="bottom-right-bg"
          src={RightImageBg}
          alt="RightImageBg"
        />
        <div className="get-main">
          <div className="container">
            <div className="">
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
              <div className="wrapper_login">
                <p className="login_title">Tell us a bit about yourself</p>
                <div className="form_section">
                  <div className="row">
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="FullName">Full Name </label>
                        <input
                          type="text"
                          className={
                            "form-control " +
                            (isValidate && values.fullName === ""
                              ? "input-error"
                              : "")
                          }
                          id="FullName"
                          placeholder="Enter your full name"
                          value={values.fullName}
                          onChange={onChangeHandler("fullName")}
                          onKeyPress={(e) => handleKeyDown(e)}
                        />
                        {isValidate && values.fullName === "" && (
                          <p className="input-error-message">
                            Full name is required
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="MobileNumber">Mobile Number</label>
                        <input
                          type="text"
                          className={
                            "form-control " +
                            ((isValidate && values.mobileNumber === "") ||
                            (isValidate &&
                              values.mobileNumber !== "" &&
                              values.mobileNumber.length < 10)
                              ? "input-error"
                              : "")
                          }
                          id="MobileNumber"
                          placeholder="Enter your mobile number"
                          value={values.mobileNumber}
                          onChange={onChangeHandler("mobileNumber")}
                          onKeyPress={(e) => handleKeyDown(e)}
                        />
                        {isValidate && values.mobileNumber === "" && (
                          <p className="input-error-message">
                            Mobile number is required
                          </p>
                        )}
                        {isValidate &&
                          values.mobileNumber !== "" &&
                          values.mobileNumber.length < 8 && (
                            <p className="input-error-message">
                              Mobile number is invalid
                            </p>
                          )}
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="Company Email">Designation</label>
                        <input
                          type="text"
                          className={
                            "form-control " +
                            (isValidate && values.designation === ""
                              ? "input-error"
                              : "")
                          }
                          id="Designation"
                          placeholder="eg, CO, Team Leader"
                          value={values.designation}
                          onChange={onChangeHandler("designation")}
                          onKeyPress={(e) => handleKeyDown(e)}
                        />
                        {isValidate && values.designation === "" && (
                          <p className="input-error-message">
                            Designation is required
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-6">&nbsp;</div>
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="Company Email">Password</label>
                        <input
                          type="password"
                          className={
                            "form-control " +
                            ((isValidate && values.password === "") ||
                            (isValidate &&
                              values.password !== "" &&
                              values.password.length < 8)
                              ? "input-error"
                              : "")
                          }
                          id="Password"
                          placeholder="Enter 8 digit password"
                          value={values.password}
                          onChange={onChangeHandler("password")}
                          onKeyPress={(e) => handleKeyDown(e)}
                        />
                        {isValidate && values.password === "" && (
                          <p className="input-error-message">
                            Please enter password
                          </p>
                        )}
                        {isValidate &&
                          values.password !== "" &&
                          values.password.length < 8 && (
                            <p className="input-error-message">
                              Password should minimum 8 characters
                            </p>
                          )}
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="ConfirmPassword">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          className={
                            "form-control " +
                            ((isValidate && values.designation === "") ||
                            (isValidate &&
                              values.confirmPassword !== "" &&
                              values.confirmPassword.length < 8)
                              ? "input-error"
                              : "")
                          }
                          id="ConfirmPassword"
                          placeholder="Repeat password"
                          value={values.confirmPassword}
                          onChange={onChangeHandler("confirmPassword")}
                          onKeyPress={(e) => handleKeyDown(e)}
                        />
                        {isValidate && values.confirmPassword === "" && (
                          <p className="input-error-message">
                            Please enter repeat password
                          </p>
                        )}
                        {isValidate &&
                          values.confirmPassword !== "" &&
                          values.confirmPassword.length < 8 && (
                            <p className="input-error-message">
                              Repeat password should be minimum 8 characters
                            </p>
                          )}
                        {isValidate &&
                          values.confirmPassword !== "" &&
                          values.confirmPassword.length > 8 &&
                          values.password !== "" &&
                          values.confirmPassword !== values.password && (
                            <p className="input-error-message">
                              Password and repeat password should be same
                            </p>
                          )}
                      </div>
                    </div>
                  </div>
                  Heq
                  {values.password !== "" && (
                    <ul className="Instruction">
                      <li>
                        <span></span>At least 8-16 characters—the more
                        characters, the better
                      </li>
                      <li>
                        <span></span>A mixture of both uppercase and lowercase
                        letters
                      </li>
                      <li>
                        <span></span>A mixture of letters and numbers
                      </li>
                    </ul>
                  )}
                </div>
              </div>
              <div className="bottom-logo-strip personal-details">
                <div className="row aligncenter">
                  <div className="col-6">
                    <button
                      onClick={() => onSubmit()}
                      disabled={
                        values.fullName === "" ||
                        values.mobileNumber === "" ||
                        values.countryCode === "" ||
                        values.companyName === "" ||
                        values.designation === "" ||
                        values.password === "" ||
                        values.confirmPassword === "" ||
                        values.mobileNumber.length < 10
                      }
                      style={{ width: 134 }}
                      className="btn save-details common-button"
                    >
                      SAVE DETAILS
                    </button>
                  </div>
                  <div className="col-6 text-right">
                    <img
                      className="header_logo footer-logo-secmark"
                      src={secmark}
                      alt="SECMARK"
                      title="SECMARK"
                    />
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

export default withRouter(PersonalDetails);
