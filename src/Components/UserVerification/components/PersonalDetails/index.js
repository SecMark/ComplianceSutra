import React, { useEffect, useState } from "react";
import RightImageBg from "../../../../assets/Images/Onboarding/RectangleOnboadign.png";
import comtech from "../../../../assets/Images/CapmTech.png";
import secmark from "../../../../assets/Images/secmark.png";
import { useDispatch, useSelector } from "react-redux";
import { checkPersonalDetailsForm } from "../utility.js";
import { actions as personalDetailsAction } from "../../redux/actions";
import { withRouter } from "react-router-dom";
import SideBarInputControl from "../WebStepper.js";
import api from "../../../../apiServices";
import "./style.css";
import MobileStepper from "../MobileStepper.js";
import { useLocation } from "react-router-dom";

function PersonalDetails({ history, location }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const search = useLocation().search;
  const email = new URLSearchParams(search).get("email").replace(" ", "+");
  const key = new URLSearchParams(search).get("key");
  localStorage.setItem("coemail", email);
  localStorage.setItem("accessToken", key);

  const [isValidate, setIsValidate] = useState(false);
  const [values, setValues] = useState({
    fullName: "",
    mobileNumber: "",
    countryCode: "+91",
    companyName: "",
    designation: "",
    password: "",
    confirmPassword: "",
  });
  const options = [
    { value: "NSE", label: "NSE" },
    { value: "BSE", label: "BSE" },
    { value: "CDS", label: "CDS" },
  ];

  const [mobileNumberValid, setMobileNumberValid] = useState(true);

  const [errors, setErrors] = useState({
    passwordErr: "",
    confirmPasswordErr: "",
    mobileNumErr: "",
    countryCodeErr: "",
    designationErr: "",
  });
  const [whatappFlag, setWhatappFlag] = useState(false);
  useEffect(() => {
    console.log(errors);
  }, [errors]);
  const [passwordState, setPasswordState] = useState({
    minlength: false,
    uppercaseandlowercase: false,
    alphabetsandigit: false,
  });
  const [countryCode, setCountryCode] = useState(true);

  const checkNumberAvailable = () => {
    let payload = {
      mobile_no: values.mobileNumber,
    };
    api
      .post("compliance.api.avabilityCheck", payload)
      .then((result) => {
        if (
          result &&
          result.data &&
          result.data.message &&
          result.data.message.status === true
        ) {
          setMobileNumberValid(false);
        } else {
          setMobileNumberValid(true);
        }
      })
      .catch((error) => {});
  };

  useEffect(() => {
    if (values.mobileNumber.length >= 10) {
      checkNumberAvailable();
    } else {
      setMobileNumberValid(true);
    }
  }, [values.mobileNumber]);

  const onChangeHandler = (name) => (event) => {
    if (
      name === "fullName" ||
      name === "companyName" ||
      name === "designation"
    ) {
      const re = /^[a-z|A-Z_ ]*$/;
      if (event.target.value && !re.test(event.target.value)) {
        return "";
      }
    }
    if (name === "countryCode") {
      const re = /[\d\+]+/;

      if (event.target.value && !re.test(event.target.value)) {
        return "";
      }
    }

    if (name === "mobileNumber") {
      let inputKey = "mobileNumErr";
      if (event.target.value > 0 && event.target.value < 9) {
      } else if (event.target.value == 10) {
      }
    }
    const mobileNumberReg = /^[0-9]{0,10}$/;
    let passwordRE =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{8,16}$/;

    if (name === "mobileNumber") {
      if (!mobileNumberReg.test(event.target.value)) {
        return "";
      }
    }
    if (name === "password") {
      let minlength = "minlength";
      let alphabetsandigit = "alphabetsandigit";
      let uppercaseandlowercase = "uppercaseandlowercase";
      let inputKey = "passwordErr";
      if (!passwordRE.test(event.target.value)) {
        setErrors({ ...errors, [inputKey]: "Password is invalid" });
      } else {
        if (
          event.target.value !== "" &&
          values?.confirmPassword === event.target.value
        ) {
          setErrors({
            ...errors,
            confirmPasswordErr: "Confirm Password should be same as Password",
          });
        }
        setErrors({ ...errors, [inputKey]: "" });
      }
      if (event.target.value.length < 8) {
        setPasswordState((prevState) => ({ ...prevState, [minlength]: false }));
      } else {
        setPasswordState((prevState) => ({ ...prevState, [minlength]: true }));
      }

      let uppercaseandlowercaseRE =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

      if (uppercaseandlowercaseRE.test(event.target.value)) {
        setPasswordState((prevState) => ({
          ...prevState,
          [alphabetsandigit]: true,
          [uppercaseandlowercase]: true,
        }));
      } else {
        if (/^[a-z]*$/.test(event.target.value)) {
          setPasswordState((prevState) => ({
            ...prevState,
            [alphabetsandigit]: false,
            [uppercaseandlowercase]: false,
          }));
        } else if (/^[a-zA-Z]*$/.test(event.target.value)) {
          setPasswordState((prevState) => ({
            ...prevState,
            [alphabetsandigit]: false,
            [uppercaseandlowercase]: true,
          }));
        } else if (
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]/.test(event.target.value)
        ) {
          setPasswordState((prevState) => ({
            ...prevState,
            [alphabetsandigit]: true,
            [uppercaseandlowercase]: true,
          }));
        } else if (/^[a-z0-9]*$/.test(event.target.value)) {
          setPasswordState((prevState) => ({
            ...prevState,
            [alphabetsandigit]: true,
            [uppercaseandlowercase]: false,
          }));
        } else if (/^[A-Z0-9]*$/.test(event.target.value)) {
          setPasswordState((prevState) => ({
            ...prevState,
            [alphabetsandigit]: true,
            [uppercaseandlowercase]: false,
          }));
        } else {
          setPasswordState((prevState) => ({
            ...prevState,
            [alphabetsandigit]: false,
            [uppercaseandlowercase]: false,
          }));
        }
      }
    }
    if (name === "confirmPassword") {
      let inputKey = "confirmPasswordErr";
      if (!passwordRE.test(event.target.value)) {
        setErrors({ ...errors, [inputKey]: "Confirm password is invalid" });
      } else {
        if (values?.password !== event.target.value) {
          setErrors({
            ...errors,
            [inputKey]: "Confirm Password should be same as Password",
          });
        } else {
          setErrors({ ...errors, [inputKey]: "" });
        }
      }
    }
    setValues({ ...values, [name]: event.target.value });
  };

  const handleWhatsappChange = (event) => {
    setWhatappFlag(event.target.checked);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // onSubmit();
    }
  };

  const onSubmit = () => {
    if (
      values.fullName !== "" &&
      values.mobileNumber !== "" &&
      values.mobileNumber !== "" &&
      values.designation !== "" &&
      values.password !== "" &&
      values.confirmPassword !== "" &&
      values.countryCode !== ""
    ) {
      dispatch(
        personalDetailsAction.userDataSaveRequest({
          email: email,
          token: key,
          full_name: values.fullName,
          mobile_number: values.mobileNumber,
          designation: values.designation,
          password: values.password,
          confirm_password: values.confirmPassword,
          countrycode: values.countryCode || "+91",
          history,
        })
      );
    } else {
      setIsValidate(true);
    }
  };

  const validateCountryCode = (e) => {
    let strr = e.target.value;
    let str = strr.replace(/\D/g, "");
    if (str === "") {
      str = "+91";
    }
    setCountryCode(true);
  };
  return (
    <div className="row">
      <div className="col-3 col-sm-4 col-md-4 col-xl-3 left-fixed">
        <div className="on-boarding">
          <SideBarInputControl currentStep={1} />
        </div>
      </div>
      <div className="col-12 padding-right">
        <img
          className="bottom-right-bg"
          src={RightImageBg}
          alt="RightImageBg"
        />
        <div className="get-main-personal-detail">
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
                        alt="Compliance Sutra"
                      />
                      <span className="camp">COMPLIANCE SUTRA</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-block d-sm-none mobile-steper ">
                <MobileStepper />
              </div>
              <div className="bottom-logo-strip-parent-fix">
                <div className="wrapper_login">
                  <p className="login_title">Tell us a bit about yourself</p>
                  <div className="form_section about-your-self">
                    <div className="row">
                      <div className="col-md-6 col-xs-12">
                        <div className="form-group">
                          <label htmlFor="FullName">Full Name </label>
                          <input
                            type="text"
                            className={
                              "form-control " +
                              (isValidate && values.fullName === ""
                                ? "input-error"
                                : "") +
                              (values.fullName !== ""
                                ? " success-input-form-control"
                                : "")
                            }
                            id="FullName"
                            placeholder="Enter your full name"
                            value={values.fullName}
                            onChange={onChangeHandler("fullName")}
                          />
                          {isValidate && values.fullName === "" && (
                            <p className="input-error-message">
                              Full name is required
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6 col-xs-12">
                        <div className="form-group">
                          <label htmlFor="MobileNumber">Mobile Number</label>
                          <div className="d-flex">
                            <input
                              type="text"
                              className={
                                "form-control plus-pin" +
                                (values.countryCode !== "" &&
                                errors.countryCodeErr === "true"
                                  ? " invalid-plus-pin"
                                  : " ") +
                                (values.countryCode !== ""
                                  ? " countryCode-sucess"
                                  : " ")
                              }
                              id="countryCode"
                              name="countryCode"
                              maxLength="3"
                              value={values.countryCode}
                              onChange={onChangeHandler("countryCode")}
                              onBlur={(e) => validateCountryCode(e)}
                            />

                            <input
                              type="text"
                              className={
                                "form-control " +
                                (values.mobileNumber !== "" &&
                                values.mobileNumber.length < 10
                                  ? " mobile-input-invalid-control"
                                  : " ") +
                                " dropdown-phone" +
                                ((isValidate && values.mobileNumber === "") ||
                                (isValidate &&
                                  values.mobileNumber !== "" &&
                                  values.mobileNumber.length < 10)
                                  ? " input-error"
                                  : "") +
                                (values.mobileNumber.length == 10
                                  ? " success-input-form-control"
                                  : "")
                              }
                              id="MobileNumber"
                              placeholder="Enter your mobile number"
                              value={values.mobileNumber}
                              onChange={onChangeHandler("mobileNumber")}
                              onKeyPress={(e) => handleKeyDown(e)}
                            />
                          </div>

                          {isValidate && values.mobileNumber === "" && (
                            <p className="input-error-message">
                              Mobile number is required
                            </p>
                          )}
                          {!mobileNumberValid && (
                            <p className="input-error-message mb-3">
                              Mobile number already exists
                            </p>
                          )}
                          {values.mobileNumber !== "" &&
                            values.mobileNumber.length < 10 && (
                              <p className="input-error-message">
                                Mobile number is invalid
                              </p>
                            )}
                        </div>
                      </div>
                      <div className="col-md-6 col-xs-12">
                        <div className="form-group">
                          <label htmlFor="Company Email">Designation</label>

                          <div>
                            <input
                              type="text"
                              className={
                                "form-control " +
                                (isValidate && values.designation === ""
                                  ? "input-error"
                                  : "") +
                                (values.designation === ""
                                  ? " "
                                  : " success-input-form-control")
                              }
                              id="Designation"
                              placeholder="Eg. Compliance Officer, Team Leader"
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
                      </div>

                      <div className="col-md-6 col-xs-12">
                        <div className="form-group">
                          <label htmlFor="Company Email">Password</label>
                          <input
                            type="password"
                            className={
                              "form-control " +
                              ((isValidate && values.password === "") ||
                              (values.password !== "" &&
                                errors.passwordErr !== "")
                                ? "input-error"
                                : "") +
                              (values.password !== ""
                                ? " input-not-blank"
                                : " ") +
                              (values.password !== "" &&
                              errors.passwordErr === ""
                                ? " password-success"
                                : " ")
                            }
                            id="Password"
                            autoComplete="off"
                            placeholder="Enter password"
                            value={values.password}
                            onChange={onChangeHandler("password")}
                            onKeyPress={(e) => handleKeyDown(e)}
                          />
                          {isValidate && values.password === "" && (
                            <p className="input-error-message">
                              Please enter password
                            </p>
                          )}
                          {values.password !== "" &&
                            errors &&
                            errors.passwordErr !== "" && (
                              <p className="input-error-message">
                                Password is invalid
                              </p>
                            )}

                          <ul className="Instruction" style={{ marginTop: 30 }}>
                            <li>
                              <div
                                className={
                                  passwordState.minlength === false
                                    ? "error"
                                    : "green-dot"
                                }
                              ></div>
                              At least 8-16 characters—the more characters, the
                              better
                            </li>
                            <li>
                              <div
                                className={
                                  passwordState.uppercaseandlowercase === false
                                    ? "error"
                                    : "green-dot"
                                }
                              ></div>
                              A mixture of both uppercase and lowercase letters
                            </li>
                            <li>
                              <div
                                className={
                                  passwordState.alphabetsandigit === false
                                    ? "error"
                                    : "green-dot"
                                }
                              ></div>
                              A mixture of letters and numbers
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-md-6 col-xs-12">
                        <div className="form-group">
                          <label htmlFor="ConfirmPassword">
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            className={
                              "form-control " +
                              (values.password !== values.confirmPassword &&
                                " input-error ") +
                              ((isValidate && values.confirmPassword === "") ||
                              (values.confirmPassword !== "" &&
                                errors.confirmPasswordErr !== "")
                                ? "input-error"
                                : "") +
                              "" +
                              (values.confirmPassword !== ""
                                ? " input-not-blank"
                                : " ") +
                              (values.confirmPassword !== "" &&
                              errors.confirmPassword === " password-success"
                                ? " "
                                : " ") +
                              (values.confirmPassword &&
                              values.password &&
                              values.confirmPassword === values.password
                                ? " password-success"
                                : "")
                            }
                            id="ConfirmPassword"
                            placeholder="Confirm password"
                            autoComplete="off"
                            value={values.confirmPassword}
                            onChange={onChangeHandler("confirmPassword")}
                            onKeyPress={(e) => handleKeyDown(e)}
                          />
                          {values.confirmPassword !== "" &&
                            errors &&
                            errors.confirmPasswordErr !== "" && (
                              <p className="input-error-message">
                                Confirm password is invalid
                              </p>
                            )}
                          {isValidate && values.confirmPassword === "" && (
                            <p className="input-error-message">
                              Please enter confirm password
                            </p>
                          )}
                          {isValidate &&
                            values.confirmPassword !== "" &&
                            values.confirmPassword.length > 8 &&
                            values.password !== "" &&
                            values.confirmPassword !== values.password && (
                              <p className="input-error-message">
                                Password and confirm password should be same
                              </p>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bottom-logo-strip personal-details">
                <div className="row aligncenter">
                  <div className="col-12"></div>
                  <div className="col-6">
                    <button
                      onClick={() => onSubmit()}
                      className="btn save-details common-button btn-width"
                      // disabled={
                      // values?.fullName === "" ||
                      // values?.designation === "" ||
                      // values?.countryCode === "" ||
                      // values?.companyName === "" ||
                      // values.password === "" ||
                      // values.confirmPassword === ""
                      // errors.passwordErr !== "" ||
                      // errors.confirmPasswordErr !== "" ||
                      // errors.countryCodeErr === "true" ||
                      // values.mobileNumber.length < 10 ||
                      // values.mobileNumber.length > 10
                      // }
                      disabled={
                        values?.fullName === "" ||
                        values?.designation === "" ||
                        values?.countryCode === "" ||
                        values?.password === "" ||
                        values?.confirmPassword === "" ||
                        values?.mobileNumber === "" ||
                        values?.mobileNumber?.length < 10 ||
                        values?.mobileNumber?.length > 10 ||
                        !mobileNumberValid ||
                        errors?.passwordErr !== "" ||
                        errors?.confirmPasswordErr !== "" ||
                        errors?.designationErr !== "" ||
                        errors?.countryCodeErr !== "" ||
                        errors?.mobileNumErr !== ""
                      }
                    >
                      SAVE DETAILS
                    </button>
                  </div>
                  <div className="col-6 text-right d-none d-sm-block">
                    <span className="powerBy">Powered by</span>
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
