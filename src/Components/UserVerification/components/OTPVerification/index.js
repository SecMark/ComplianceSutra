import React, { useEffect, useState } from "react";
import "./otp.css";
import RightImageBg from "../../../../assets/Images/Onboarding/RectangleOnboadign.png";
import comtech from "../../../../assets/Images/CapmTech.png";
import secmark from "../../../../assets/Images/secmark.png";
import leftArrow from "../../../../assets/Icons/leftArrow.png";
import { useDispatch, useSelector } from "react-redux";
import SideBarInputControl from "../WebStepper.js";
import { actions as otpVerificationActions } from "../../redux/actions";
import api from "../../../../apiServices";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
let flag = false;
function VeryOTP({ history, currentStep }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [currentOTP, setCurrentOTP] = useState("");
  const [isOTPValid, setIsOTPValid] = useState(false);
  const [otp, setOTP] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberErr, setPhoneNumberErr] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isEnableSecureOTP, setIsEnabledSecureOTP] = useState(false);
  const [showChangeMobileSection, setShowChangeMobileSection] = useState(false);
  const [showResendSection, setShowResendSection] = useState(false);
  const initialMinute = 1;
  const initialSeconds = 0;
  const [disabled, setDisabled] = useState(false);
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [otpValid, setOtpInValid] = useState("");
  const [userID, setUserID] = useState(0);
  const [disabledButton, setDisabledButton] = useState(false);
  const [countryCode, setCountryCode] = useState(true);
  const [countryCodeCr, setCountryCodeCR] = useState("");
  const [values, setValues] = useState({
    countryCode: "+91",
  });

  const otpInfo =
    state && state.complianceOfficer && state.complianceOfficer.otoInfo;
  const email =
    state &&
    state.users &&
    state.users.personalInfo &&
    state.users.personalInfo.formData &&
    state.users.personalInfo.formData.adminEmail;

  const mobile_number =
    state &&
    state.users &&
    state.users.personalInfo &&
    state.users.personalInfo.formData &&
    state.users.personalInfo.formData.adminMobile;

  const countrycode =
    state &&
    state.users &&
    state.users.personalInfo &&
    state.users.personalInfo.formData &&
    state.users.personalInfo.formData.countrycode;

  let tempMobileNumber =
    state &&
    state.users &&
    state.users.personalInfo &&
    state.users.personalInfo.formData &&
    state.users.personalInfo.formData.adminMobile;

  let initialCountryCode = "";
  initialCountryCode =
    state &&
    state.users &&
    state.users.personalInfo &&
    state.users.personalInfo.formData &&
    state.users.personalInfo.formData.countrycode;

  let countryCodeCR =
    state &&
    state.users.otpInfo &&
    state.users.otpInfo[0] &&
    state.users.otpInfo.length > 0 &&
    state.users.otpInfo[0][0] &&
    state.users.otpInfo[0][0].UserDetails &&
    state.users.otpInfo[0][0].UserDetails[0] &&
    state.users.otpInfo[0][0].UserDetails &&
    state.users.otpInfo[0][0].UserDetails[0].countrycode;

  useEffect(() => {
    if (countryCodeCR !== undefined && isEnableSecureOTP) {
      let concatCntryCode = `+${countryCodeCR}`;
      setCountryCodeCR(concatCntryCode);
    }
  }, [countryCodeCR]);

  useEffect(() => {
    if (tempMobileNumber !== undefined) {
      setPhoneNumber(tempMobileNumber);
      setMobileNumber(tempMobileNumber);
    }
  }, [tempMobileNumber]);

  useEffect(() => {
    let location = window.location.href;
    let data = location.split("=");
    let splitEmailAndType = data && data[1].split("&");
    let emailFromLink = splitEmailAndType[0];
    let typeFromLink = data[2];
    getUserId(emailFromLink, typeFromLink);
  }, []);

  useEffect(() => {
    if (mobile_number !== undefined) {
      let mobNo = mobile_number.substring(2);
      // setPhoneNumber(mobNo)
      setMobileNumber(mobile_number);
    }
  }, [mobile_number]);

  const getUserId = (email, type) => {
    let payload = {
      loginID: email,
      pwd: "",
      rememberme: 0,
      loginty: "",
      userTYPe: parseInt(type),
    };

    api
      .post("/api/getUserID", payload)
      .then(function (response) {
        if (
          response &&
          response.data &&
          response.data[0] &&
          response.data[0].UserID
        ) {
          setUserID(response.data[0].UserID);
        } else {
          setUserID(0);
        }
      })
      .catch(function (error) {
        if (error) {
          setUserID(0);
        }
      });
  };
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
      .post("/api/CountryCodeCheck", payload)
      .then(function (response) {
        if (response && response.data && response.data.Status === "True") {
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
    setOtpInValid(false);
    setDisabled(false);
    setCountryCode(true);
    const { name, value } = e.target;
    const mobileNumberReg = /^[0-9]{0,10}$/;
    const otpRE = /^[0-9]{0,5}$/;
    if (e.target.name === "otp") {
      if (!mobileNumberReg.test(e.target.value)) {
        return "";
      }
    }
    if (name === "phoneNumber") {
      if (!mobileNumberReg.test(value)) {
        return "";
      } else {
        setPhoneNumber(value);
        setMobileNumber(value);
      }
      if (value.length < 10) {
        setPhoneNumberErr("Mobile number is invalid");
      } else {
        setPhoneNumberErr("");
      }
    }
    if (name === "countryCode") {
      const re = /[\d\+]+/;
      if (e.target.value && !re.test(e.target.value)) {
        return "";
      }
      setValues({ countryCode: e.target.value });
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
    setPhoneNumber("");
  };

  const resendOTP = (value, emails) => {
    setShowResendSection(false);
    setMinutes(1);
    let payload = {
      phn: value,
      email: emails,
    };
    api
      .post("/api/sendmsgwithverificationcode", payload)
      .then(function (response) {
        // handle success
        if (
          response &&
          response.data &&
          response.data.otp != "" &&
          response.data.statuscode === "200"
        ) {
          toast.success(
            "The OTP has been sent to your registered mobile number"
          );
        } else {
          toast.error("something went wrong please try again !!!");
        }
      })
      .catch(function (error) {
        if (error) {
        }
      });
  };

  const updateMobileNumberAndSendOTP = (e) => {
    e.preventDefault();
    const mobileNumberReg = /^[0-9]{0,10}$/;
    if (
      phoneNumber === "" ||
      !mobileNumberReg.test(phoneNumber) ||
      phoneNumber.length < 10
    ) {
      return "";
    } else {
      setDisabledButton(true);
      setDisabled(true);
    }
    availabilityCheck();
  };

  const availabilityCheck = (phoneNumber) => {
    let countryCode;
    let strr = values.countryCode;
    countryCode = strr.replace(/\D/g, "");
    let payload = {
      loginID: mobileNumber,
      loginty: "AdminMobile",
      countrycode:
        values.countryCode === "" || values.countryCode === "+"
          ? "91"
          : countryCode,
    };
    api
      .post("/api/availabilityCheck", payload)
      .then(function (response) {
        if (response && response.data && response.data.Status === "false") {
          let location = window.location.href;
          let data = location.split("=");
          let splitEmailAndType = data && data[1].split("&");
          let emailFromLink = splitEmailAndType[0];
          let typeFromLink = data[2];
          let countryCode;
          let strr = values.countryCode;
          // countryCode = strr.replace(/\D/g, '');
          countryCode = strr;
          const pwd =
            state &&
            state.users &&
            state.users.personalInfo &&
            state.users.personalInfo.formData &&
            state.users.personalInfo.formData.adminPWD;

          dispatch(
            otpVerificationActions.updateMobileNumberOTPRequest({
              adminName: "adminName",
              adminMobile: mobileNumber,
              adminEmail: emailFromLink,
              adminPWD: pwd,
              isClientTypeUser: 0,
              actionFlag: 2,
              userID: userID,
              countrycode:
                countryCode === "" || countryCode === "+" ? "+91" : countryCode,
            })
          );
          setMinutes(1);
          setSeconds(0);
          setIsEnabledSecureOTP(true);
          setShowChangeMobileSection(false);
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

  const sendOTPRequest = (emails) => {
    setDisabled(true);

    let payload = {};
    payload = {
      phn: mobileNumber,
      email: emails,
    };

    api
      .post("/api/sendmsgwithverificationcode", payload)
      .then(function (response) {
        // handle success
        if (
          response &&
          response.data &&
          response.data.otp != "" &&
          response.data.statuscode === "200"
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
    let location = window.location.href;
    let data = location.split("=");
    let splitEmailAndType = data && data[1].split("&");
    let emailFromLink = splitEmailAndType[0];
    let typeFromLink = data[2];
    let payload = {};
    payload = {
      phn: phoneNumber,
      email: emailFromLink,
      otp: otp,
    };
    if (otp !== "") {
      api
        .post("/api/GetOTP", payload)
        .then(function (response) {
          // handle success
          if (
            response &&
            response.data &&
            response.data.otp != "" &&
            response.data.Status === "False"
          ) {
            setOtpInValid(true);
          } else {
            setOtpInValid(false);
            toast.success("OTP is verified successfully");
            setTimeout(() => {
              history.push("/redirect-user-dashboard");
            }, 2000);
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
          <SideBarInputControl currentStep={2} />
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
              <div className="wrapper_login">
                <p className="login_title">
                  <img className="right-back-arrow" src={leftArrow} alt="" />{" "}
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
                        We will send OTP on{" "}
                        {countrycode && countrycode == 0 ? "" : countrycode}{" "}
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
                        style={{ cursor: "pointer" }}
                        onClick={() => sendOTPRequest(email)}
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

                        {countryCode === false || values.countryCode === "" ? (
                          <p
                            className="input-error-message"
                            style={{ marginBottom: "0px" }}
                          >
                            Invalid country code
                          </p>
                        ) : null}

                        {phoneNumberErr !== "" && (
                          <p className="input-error-message">
                            {phoneNumberErr}
                          </p>
                        )}
                        <button
                          disabled={
                            !countryCode ||
                            (phoneNumber === "" && phoneNumberErr !== "")
                          }
                          onClick={(e) => updateMobileNumberAndSendOTP(e)}
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
                      {countryCodeCr !== ""
                        ? countryCodeCr
                        : initialCountryCode}{" "}
                      {mobileNumber}{" "}
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
                        <p className="input-error-message">Invalid OTP</p>
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
                          Didn't receive an OTP?
                        </span>
                        <span
                          onClick={() => resendOTP(mobileNumber, email)}
                          className="resend"
                        >
                          RESEND
                        </span>
                      </p>
                    )}
                    <button
                      onClick={() => verifyOTP(mobileNumber)}
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
    </div>
  );
}

export default withRouter(VeryOTP);
