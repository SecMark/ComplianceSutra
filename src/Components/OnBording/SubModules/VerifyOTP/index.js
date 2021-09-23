import React, { useEffect, useState } from "react";
import "./style.css";
import RightImageBg from "../../../../assets/Images/Onboarding/RectangleOnboadign.png";
import comtech from "../../../../assets/Images/CapmTech.png";
import secmark from "../../../../assets/Images/secmark.png";

import { useDispatch, useSelector } from "react-redux";
import SideBarInputControl from "../SideBarInputControl";
import { actions as otpVerificationActions } from "../../redux/actions";
import api from "../../../../apiServices";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import MobileStepper from "../mobileStepper";
import { audit_auth_url, audit_url } from "../../../../apiServices/baseurl";

function VeryOTP({ history, currentStep }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [currentOTP, setCurrentOTP] = useState("");
  const [isOTPValid, setIsOTPValid] = useState(false);
  const [otp, setOTP] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberErr, setPhoneNumberErr] = useState("");
  const [isEnableSecureOTP, setIsEnabledSecureOTP] = useState(false);
  const [showChangeMobileSection, setShowChangeMobileSection] = useState(false);
  const [showResendSection, setShowResendSection] = useState(false);
  const initialMinute = 1;
  const initialSeconds = 0;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [otpValid, setOtpInValid] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [availCheck, setAvailCheck] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [values, setValues] = useState({
    countryCode: "+91",
  });

  const otpInfo =
    state && state.complianceOfficer && state.complianceOfficer.otoInfo;
  const email =
    state &&
    state.complianceOfficer &&
    state.complianceOfficer.personalInfo &&
    state.complianceOfficer.personalInfo.data &&
    state.complianceOfficer.personalInfo.data.user;
  const auth_token =
    state &&
    state.complianceOfficer &&
    state.complianceOfficer.personalInfo &&
    state.complianceOfficer.personalInfo.data &&
    state.complianceOfficer.personalInfo.data.token;

  // console.log(state.complianceOfficer.personalInfo.data.email);
  const mobileNumber =
    state &&
    state.complianceOfficer &&
    state.complianceOfficer.personalInfo &&
    state.complianceOfficer.personalInfo.data &&
    state.complianceOfficer.personalInfo.data.mobile_no;

  const cntryCode = "+91";

  const userID =
    state &&
    state.complianceOfficer &&
    state.complianceOfficer.personalInfo &&
    state.complianceOfficer.personalInfo.data &&
    state.complianceOfficer.personalInfo.data.userid;

  console.log(state.complianceOfficer);
  const validateCountryCode = (e) => {
    let strr = e.target.value;
    let str = strr.replace(/\D/g, "");

    if (str === "") {
      str = "91";
    }
    let payload = {
      cntryCode: str,
    };

    api
      .get("CountryCodeCheck", { params: { uInput: payload } })
      .then(function (response) {
        // handle success

        if (
          response &&
          response.data &&
          response.data.message &&
          response.data.message.Status === "True"
        ) {
          setCountryCode(true);
        } else {
          setCountryCode(false);
        }
      })
      .catch(function (error) {
        if (error) {
          toast.error(error);
        }
      });
  };

  const handelChange = (e) => {
    setDisabled(false);
    const { name, value } = e.target;
    const mobileNumberReg = /^[0-9]{0,10}$/;
    const otpRE = /^[0-9]{0,5}$/;
    if (e.target.name === "otp") {
      if (!mobileNumberReg.test(e.target.value)) {
        return "";
      }
    }
    if (name === "countryCode") {
      setCountryCode(true);
      const re = /[\d\+]+/;
      if (e.target.value && !re.test(e.target.value)) {
        return "";
      } else {
        setValues({ countryCode: e.target.value });
      }
    }
    if (name === "phoneNumber") {
      if (!mobileNumberReg.test(value)) {
        return "";
      } else {
        setPhoneNumber(e.target.value);
      }
      if (value.length < 10) {
        setPhoneNumberErr("Mobile number is invalid");
      } else {
        setPhoneNumberErr("");
      }
    }
    if (name === "otp") {
      if (!otpRE.test(value)) {
        return "";
      }
      setOTP(value);
    }
  };

  const updateMobileNumber = () => {
    setShowChangeMobileSection(true);
    setIsEnabledSecureOTP(true);
  };

  const resendOTP = () => {
    setShowResendSection(false);
    let payload = {
      phn: mobileNumber,
      email: email,
    };

    api
      .get(`${audit_auth_url}sendmsgwithverificationcode`, {
        params: { uInput: payload },
      })
      .then(function (response) {
        // handle success
        if (
          response &&
          response.data &&
          response.data.message &&
          response.data.message.statuscode === "200"
        ) {
          toast.success(
            "The OTP has been sent to your registered mobile number"
          );
        } else {
          toast.error("something went wrong please try again !!!");
        }
      })
      .catch(function (error) {});
    setSeconds(59);
  };

  const updateMobileNumberAndSendOTP = () => {
    setSeconds(59);
    const mobileNumberReg = /^[0-9]{0,10}$/;
    if (
      phoneNumber === "" ||
      !mobileNumberReg.test(phoneNumber) ||
      phoneNumber.length < 10
    ) {
      return "";
    } else {
      setDisabled(true);
      setCountryCode(true);
    }
    availabilityCheck(phoneNumber);
  };

  const availabilityCheck = (phoneNumber) => {
    let countryCode;
    let strr = values.countryCode;
    countryCode = strr.replace(/\D/g, "");
    let payload = {
      loginID: phoneNumber,
      loginty: "AdminMobile",
      countrycode:
        values.countryCode === "" || values.countryCode === "+"
          ? "91"
          : countryCode,
    };
    api
      .get("availabilityCheck", { params: { uInput: payload } })
      .then(function (response) {
        if (
          response &&
          response.data &&
          response.data.message &&
          response.data.message.Status === "false"
        ) {
          if (countryCode) {
            const adminPWD =
              state &&
              state.complianceOfficer &&
              state.complianceOfficer.userData &&
              state.complianceOfficer.userData &&
              state.complianceOfficer.userData &&
              state.complianceOfficer.userData.adminPWD;

            let countryCode;
            let strr = values.countryCode;

            countryCode = strr;

            setTimeout(() => {
              dispatch(
                otpVerificationActions.updatePhoneNumberOTPRequest({
                  entityName: "",
                  adminName: "",
                  adminMobile: phoneNumber,
                  adminEmail: email,
                  adminPWD: adminPWD,
                  isClientTypeUser: 0,

                  actionFlag: 2,
                  designation: "",
                  userID: userID,
                  history,
                  countrycode:
                    countryCode === "" || countryCode === "+"
                      ? "+91"
                      : countryCode,
                  from: "personal-details-team",
                })
              );
            }, 1000);
            setIsEnabledSecureOTP(true);
            setShowChangeMobileSection(false);
          } else {
            setCountryCode(false);
          }
        } else {
          toast.error("Mobile Number Already registered");
        }
      })
      .catch(function (error) {
        if (error) {
          toast.error(error);
        }
      });
  };

  const sendOTPRequest = (text) => {
    setDisabled(true);
    let payload = {};
    payload = {
      phn: mobileNumber,
      email: email,
    };

    api
      .get(`${audit_auth_url}sendmsgwithverificationcode`, {
        params: { uInput: payload },
        headers: {
          Authorization: `token ${auth_token}`,
        },
      })
      .then(function (response) {
        // handle success
        if (
          response &&
          response.data &&
          response.data.message &&
          response.data.message.statuscode === "200"
        ) {
          setIsEnabledSecureOTP(true);
          setShowChangeMobileSection(false);
          toast.success(
            "The OTP has been sent to your registered mobile number"
          );
        } else {
          toast.error("something went wrong please try again !!!");
          setIsEnabledSecureOTP(true);
          setShowChangeMobileSection(false);
        }
      })
      .catch(function (error) {
        if (error) {
          setIsEnabledSecureOTP(false);
        }
      });
  };

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
      }
      if (seconds === 0) {
        if (minutes === 0) {
          setShowResendSection(true);
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const verifyOTP = () => {
    let payload = {};
    payload = {
      phn: mobileNumber,
      email: email,
      otp: otp,
    };
    if (otp !== "") {
      api
        .get("GetOTP", { params: { uInput: payload } })
        .then(function (response) {
          // handle success
          if (
            response &&
            response.data &&
            response.data.message &&
            response.data.message.otp !== "" &&
            response.data.message.Status === "False"
          ) {
            setOtpInValid(true);
          } else {
            setOtpInValid(false);
            setTimeout(() => {
              history.push("/redirect-dashboard");
            }, 4000);
          }
        })
        .catch(function (error) {
          if (error) {
            setOtpInValid(false);
          }
        });
    } else {
      toast.error("Enter OTP");
    }
  };

  return (
    <div className="row">
      <div className="col-3 left-fixed">
        <div className="on-boarding">
          <SideBarInputControl currentStep={5} />
        </div>
      </div>
      <div className="col-12 padding-right">
        <img
          className="bottom-right-bg"
          src={RightImageBg}
          alt="RightImageBg"
        />
        <div className="get-main otp-mobile-py">
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
              <div className="d-block d-sm-none mobile-steper">
                <div className="row mobile-top-py">
                  <div className="col-8">
                    <MobileStepper currentStep={5} />
                  </div>
                </div>
              </div>
              <div className="wrapper_login">
                <p className="login_title">
                  Let's secure your account
                  <br />
                  with verified mobile
                </p>

                {isEnableSecureOTP === false && (
                  <div>
                    <div className="send-otp">
                      <p className="disc-text">
                        This helps you prevent unauthorized access to your
                        account. And you don't have to remember any password
                      </p>
                      <p className="will-send-text">
                        We will send OTP on {cntryCode == 0 ? "" : cntryCode}{" "}
                        {mobileNumber}{" "}
                        <span className="space-mobile d-block d-sm-none">
                          <br />
                        </span>
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => updateMobileNumber()}
                          className="change"
                        >
                          CHANGE
                        </span>
                      </p>
                      <button
                        disabled={disabled}
                        onClick={() => sendOTPRequest()}
                        className="btn save-details common-button"
                      >
                        SECURE NOW
                      </button>
                    </div>
                  </div>
                )}
                {showChangeMobileSection && (
                  <div>
                    <div className="send-otp">
                      <p className="disc-text">
                        This helps you prevent unauthorized access to your
                        account. And you don't have to remember any password
                      </p>
                      <p className="will-send-text">We will send OTP on:</p>
                      <div className="form-group smallBtn">
                        <div className="d-flex">
                          <input
                            style={{
                              width: "45px",
                              fontWeight: "400",
                              fontSize: "13px",
                            }}
                            type="text"
                            className="form-control plus-pin"
                            id="countryCode"
                            name="countryCode"
                            maxLength="3"
                            value={values.countryCode}
                            onChange={handelChange}
                            onBlur={(e) => validateCountryCode(e)}
                          />
                          <input
                            style={{ fontWeight: "400", fontSize: "13px" }}
                            type="text"
                            name="phoneNumber"
                            value={phoneNumber}
                            onChange={handelChange}
                            className={
                              "form-control input-mobile-box-otp" +
                              (phoneNumberErr !== "" ? "input-error" : "")
                            }
                            id="OTP"
                            maxLength={10}
                            placeholder="Enter mobile number"
                            required
                          />
                        </div>
                        {!countryCode && (
                          <p
                            className="input-error-message"
                            style={{ marginBottom: "0px" }}
                          >
                            Invalid country code
                          </p>
                        )}
                        {phoneNumberErr !== "" && (
                          <p
                            className="input-error-message"
                            style={{ position: "absolute" }}
                          >
                            {phoneNumberErr}
                          </p>
                        )}
                        <button
                          disabled={!countryCode || disabled}
                          onClick={() => {
                            updateMobileNumberAndSendOTP();
                          }}
                          className="btn save-details common-button"
                        >
                          Secure Now
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {isEnableSecureOTP && !showChangeMobileSection && (
                  <div className="verify-otp">
                    <p className="disc-text">
                      Please enter the verification code sent to your phone no.
                    </p>
                    <p className="will-send-text">
                      {" "}
                      {cntryCode} {mobileNumber}{" "}
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => updateMobileNumber()}
                        className="mobile-change"
                      >
                        CHANGE
                      </span>
                    </p>

                    <div className="form-group smallBtn">
                      <input
                        type="text"
                        className={
                          "form-control " +
                          (otp !== "" && otpValid === true
                            ? "input-error"
                            : "") +
                          (otp !== "" && otpValid === false
                            ? " success-input-form-control"
                            : "")
                        }
                        value={otp}
                        name="otp"
                        onChange={handelChange}
                        id="OTP"
                        maxLength={5}
                        placeholder="Enter 5 digit OTP"
                        required
                      />
                      {otp !== "" && otpValid === true && (
                        <p
                          className="input-error-message"
                          style={{ position: "absolute" }}
                        >
                          OTP is invalid
                        </p>
                      )}
                    </div>
                    {!showResendSection && (
                      <p style={{ display: "flex" }} className="Resend-OTP-in">
                        {" "}
                        Resend OTP in:
                        <span className="second">
                          {minutes === 0 && seconds === 0 ? null : (
                            <p
                              style={{ fontStyle: "bold" }}
                              className="count-text-sec"
                            >
                              {" "}
                              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                            </p>
                          )}
                        </span>
                      </p>
                    )}
                    {showResendSection && (
                      <p>
                        {" "}
                        <span className="resend-text">
                          <b>Didn't receive an OTP?</b>
                        </span>
                        <span onClick={() => resendOTP()} className="resend">
                          RESEND
                        </span>
                      </p>
                    )}
                    <button
                      style={{ cursor: "pointer" }}
                      onClick={() => verifyOTP()}
                      className="btn save-details common-button mt-0"
                    >
                      VERIFY
                    </button>
                  </div>
                )}
              </div>
              <div className="bottom-logo-strip">
                <div className="row aligncenter">
                  <div className="col-6"></div>
                  <div className="col-6 d-none d-sm-block text-right">
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

export default withRouter(VeryOTP);
