import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { Modal } from "react-responsive-modal";
import companyDropArrow from "../../../../../../../assets/Icons/companyDropArrow.png";
import deleteIcon from "../../../../../../../assets/Icons/deleteIcon.png";
import closeBlack from "../../../../../../../assets/Icons/closeBlack.png";
import { actions as coActions } from "../../../redux/actions";
import validator from "validator";
import api from "../../../../../../../apiServices";
import { toast } from "react-toastify";
import { actions as logInfoActions } from "../../../../../../Authectication/redux/actions";
function CoSettingRightGrid({ handleClose, history }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [isValidate, setIsValidate] = useState(false);
  const [valuesBackup, setValuesBackup] = useState(null);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [otpValid, setOtpInValid] = useState("");
  const [otp, setOtp] = useState("");
  const [showResendSection, setShowResendSection] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [isCompanyNameValid, setIsCompanyNameValid] = useState(true);
  const [email, setEmail] = useState(null);
  const [number, setNumber] = useState(null);

  const [values, setValues] = useState({
    full_name: "",
    designation: "",
    email: "",
    mobile_no: "",
    countrycode: "",
  });
  const [isValidEmail, setIsValidEmail] = useState(null);

  const [valuesChanged, setValuesChanged] = useState(false);
  const [verifyModalHideShow, setVerifyModalHideShow] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  const [isOtpVerfied, setIsOtpVerfied] = useState(false);

  const [isEnableSecureOTP, setIsEnabledSecureOTP] = useState(false);
  const [showChangeMobileSection, setShowChangeMobileSection] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [verifyPassword, setVerifyPassword] = useState({
    password: "",
    passwordError: "",
  });
  const loggedUser = state && state.auth && state.auth.loginInfo;
  const [userInfoBackup, setUserInfoBackup] = useState(null);
  useEffect(() => {
    dispatch(
      coActions.availabilityCheckequest({
        loginID: loggedUser.email,
        loginty: "AdminEmail",
      })
    );
  }, []);

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

  const verfiyEmail = async (email) => {
    if (validator.isEmail(email)) {
      if (email !== valuesBackup.email) {
        let payload = {
          loginID: email,
          pwd: "",
          rememberme: 0,
          loginty: "AdminEmail",
        };
        return await api
          .post("/api/availabilityCheck", payload)
          .then(function (response) {
            if (response && response.data && response.data.Status === "True") {
              setIsValidEmail(false);
              setEmail(null);
              return false;
            } else {
              setIsValidEmail(true);
              return true;
            }
          })
          .catch(function (error) {
            if (error) {
              return false;
            }
          });
      } else {
        setIsValidEmail(true);
      }
    }
  };

  useEffect(() => {
    const _name =
      state &&
      state.taskReport &&
      state.taskReport.userAvailability &&
      state.taskReport.userAvailability.availabilityInfo &&
      state.taskReport.userAvailability.availabilityInfo.full_name;
    const _designation =
      state &&
      state.taskReport &&
      state.taskReport.userAvailability &&
      state.taskReport.userAvailability.availabilityInfo &&
      state.taskReport.userAvailability.availabilityInfo.designation;
    const _email =
      state &&
      state.taskReport &&
      state.taskReport.userAvailability &&
      state.taskReport.userAvailability.availabilityInfo &&
      state.taskReport.userAvailability.availabilityInfo.email;
    const _mobile =
      state &&
      state.taskReport &&
      state.taskReport.userAvailability &&
      state.taskReport.userAvailability.availabilityInfo &&
      state.taskReport.userAvailability.availabilityInfo.mobile_no;
    const _userInfo =
      state &&
      state.taskReport &&
      state.taskReport.userAvailability &&
      state.taskReport.userAvailability.availabilityInfo;

    let userObj = {
      full_name: _name != "" && _name != undefined ? _name : "",
      designation:
        _designation != "" && _designation != undefined ? _designation : "",
      email: _email != "" && _email != undefined ? _email : "",
      mobile_no: _mobile != "" && _mobile != undefined ? Number(_mobile) : "",
      countrycode:
        _userInfo !== "" && _userInfo !== undefined
          ? _userInfo.countrycode
          : "",
    };

    setValues(userObj);
    setValuesBackup(userObj);
    setUserInfoBackup(_userInfo);
  }, [state.taskReport.userAvailability]);

  // useEffect(() => {
  //   const actionStatus =
  //     state &&
  //     state.taskReport &&
  //     state.taskReport.coDetailsInsUpdDelInfo &&
  //     state.taskReport.coDetailsInsUpdDelInfo.insUpdDelstatus;
  //   if (actionStatus != undefined) {
  //     if (actionStatus === "Success") {
  //       let updEmail =
  //         state &&
  //         state.taskReport &&
  //         state.taskReport.coDetailsInsUpdDelInfo &&
  //         state.taskReport.coDetailsInsUpdDelInfo.data;

  //       let logInfo = { ...loggedUser };
  //       logInfo.email = updEmail[0][0].UserDetails[0].email;
  //       dispatch(logInfoActions.updateEmailInfo(logInfo));
  //       setTimeout(() => {
  //         const UpdatedLogInInfo = state && state.auth && state.auth.loginInfo;
  //         dispatch(
  //           coActions.availabilityCheckequest({
  //             loginID: logInfo.email,
  //             loginty: "AdminEmail",
  //           })
  //         );
  //       }, 1000);
  //     }
  //   }
  // }, [state.taskReport.coDetailsInsUpdDelInfo]);

  const onSubmit = () => {
    let isSubmit = false;
    if (
      values.full_name === "" ||
      values.mobile_no === "" ||
      values.mobile_no.length < 10 ||
      values.email === "" ||
      !validator.isEmail(values.email) ||
      (isValidEmail !== null && !isValidEmail) ||
      values.designation === "" ||
      values.countrycode === ""
    ) {
      setIsValidate(true);
      isSubmit = false;
    } else {
      if (
        values.email === valuesBackup.email &&
        values.mobile_no === valuesBackup.mobile_no
      ) {
        setIsValidate(false);
        handleFinalSubmit();
      } else {
        //<--------------------------------- commenting this till i get login api ------------------------------->
        // if (email)
        // setVerifyModalHideShow(true);
        // else {
        if (!otpValid) {
          setOtpModal(true);
          setOtpInValid(false);
          setSeconds(59);
          setIsOtpVerfied(false);
          sendOTPRequest();
        }
      }
    }
  };
  const handleVerifyModalAction = (flag) => {
    if (flag) {
      let payload = {
        loginID: loggedUser.email,
        pwd: verifyPassword.password,
      };
      api
        .post("/api/Loginsuccess", payload)
        .then(function (response) {
          if (
            response &&
            response.data &&
            response.data.StatusCode === 200 &&
            response.data.Message === "SUCCESS"
          ) {
            setVerifyPassword({ password: "", passwordError: "" });
            handleFinalSubmit();
            setVerifyModalHideShow(false);
            setEmail(null);

            if (number) {
              setEmailVerified(true);
              setOtpModal(true);
              sendOTPRequest();
              setSeconds(59);
            }
          } else if (
            response &&
            response.data &&
            response.data.StatusCode === 200 &&
            response.data.Message === "FAIL"
          ) {
            setVerifyPassword({
              ...verifyPassword,
              ["passwordError"]: "invalid password.",
            });
          } else {
            toast.error("Something went to wrong, Please try after sometime", {
              autoClose: 5000,
            });
          }
        })
        .catch(function (error) {
          if (error) {
            toast.error("Something went to wrong, Please try after sometime", {
              autoClose: 5000,
            });
          }
        });
    } else {
      number && setOtpModal(true);
      setVerifyPassword({ password: "", passwordError: "" });
      setVerifyModalHideShow(false);
    }
  };

  const manageData = () => {
    if (handleClose == undefined) {
      history.push("/settings");
    } else {
      handleClose();
    }
  };

  const resendOTP = () => {
    setShowResendSection(false);
    let payload ={};
    let MobNowithCountryCode = values.countrycode + values.mobile_no
    payload = {
      mobile_number: MobNowithCountryCode,
    };
    api
      .post("compliance.api.generateOtp", payload)
      .then(function (response) {
        // handle success
        if (response && response.status === 200) {
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

  const handleFinalSubmit = () => {
    let payload = {
      full_name: values.full_name,
      mobile_no: values.mobile_no,
      adminEmail: values.email,
      userType: values.email !== valuesBackup.email ? 9 : 1,
      actionFlag: 2,
      designation: values.designation,
      userID: userInfoBackup.UserID,
      countrycode: values.countrycode,
    };
    console.log(payload);
    dispatch(coActions.coDetailsInsUpdDelRequest(payload));
    setValuesChanged(false);
  };
  const onChangeHandler = (name) => (event) => {
    if (name === "full_name" || name === "designation") {
      const re = /^[a-z|A-Z_ ]*$/;
      if (event.target.value && !re.test(event.target.value)) {
        return "";
      }
    }
    if (name === "mobile_no") {
      const mobileNumberReg = /^[0-9]{0,10}$/;
      if (!mobileNumberReg.test(Number(event.target.value))) {
        return "";
      }
      setNumber(event.target.value);
    }
    if (name === "email") {
      verfiyEmail(event.target.value);
      setEmail(event.target.value);
    }
    setValuesChanged(true);
    setValues({ ...values, [name]: event.target.value });

    // }
  };

  const verifyOTP = () => {
    let payload = {};
    payload = {
      input_otp: otp,
    };
    if (otp !== "") {
      api
        .post("compliance.api.verifyOtp", payload)
        .then(function (response) {
          // handle success
          if (response && response.data && response.data.message.status || response.data.message === true) {
            setOtpInValid(true);
            setIsOtpVerfied(true);
            setOtpModal(false);
            handleFinalSubmit();
            setNumber(null);
          } else {
            toast.error("Invalid OTP");
            setOtpInValid(false);
          }
        })
        .catch(function (error) {
          if (error) {
            setOtpInValid(false);
            toast.error("Invalid OTP");
          }
        });
    } else {
      toast.error("Enter OTP");
    }
  };

  const sendOTPRequest = (text) => {
    setDisabled(true);
    let payload = {};
    let MobNowithCountryCode = values.countrycode + values.mobile_no
    payload = {
      mobile_number: MobNowithCountryCode,
    };

    api
      .post("compliance.api.generateOtp", payload)
      .then(function (response) {
        // handle success
        if (response && response.status === 200) {
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

  const renderVerifyDialog = () => {
    return (
      <Modal
        blockScroll={false}
        classNames={{
          overlayAnimationIn: "",
          overlayAnimationOut: "",
          modalAnimationIn: "",
          modalAnimationOut: "",
          modal: "customPersonalModal",
        }}
        open={verifyModalHideShow}
        center={true}
        showCloseIcon={false}
        onClose={() => setVerifyModalHideShow(false)}
        modalId="governance"
        styles={{ width: 373, height: 210, overflow: "hidden" }}
        onOverlayClick={() => setVerifyModalHideShow(false)}
      >
        <div className="capmtech-review-model confirm-model">
          <div className="confirm-title-model">Confirm the changes</div>
          <div className="confirm-title-desc">
            Please confirm by entering your password that it's you who is making
            the changes
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control  input-not-blank "
              placeholder="Enter your password"
              value={verifyPassword.password}
              onChange={(e) =>
                setVerifyPassword({
                  ...verifyPassword,
                  ["password"]: e.target.value,
                })
              }
            />

            {verifyPassword.passwordError != "" && (
              <p className="input-error-message">{"invalid password"}</p>
            )}
          </div>
          <div className="d-flex">
            <button
              class="btn save-details common-button btn-width"
              onClick={() => handleVerifyModalAction(true)}
            >
              confirm changes
            </button>
            <div
              className="cancel-link-model"
              onClick={() => handleVerifyModalAction(false)}
            >
              Cancel
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <div className="co-manangment-grid">
      {verifyModalHideShow && renderVerifyDialog()}
      {otpModal && !otpValid && (
        <Modal
          blockScroll={false}
          classNames={{
            overlayAnimationIn: "",
            overlayAnimationOut: "",
            modalAnimationIn: "",
            modalAnimationOut: "",
            modal: "customPersonalOTPModal",
          }}
          open={otpModal}
          center={true}
          showCloseIcon={false}
          onClose={() => setOtpModal(false)}
          modalId="customPersonalOTPModal"
          styles={{ width: 373, height: 210, overflow: "hidden" }}
          // onOverlayClick={() => setOtpModal(false)}
        >
          <div className="capmtech-review-model confirm-model">
            <div className="confirm-title-model">
              Enter OTP to confirm changes
            </div>
            <div className="confirm-title-desc">
              Sent to +91{values.mobile_no}
            </div>
            <div class="form-group">
              <input
                type="number"
                class="form-control  input-not-blank "
                placeholder="Enter 6 digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength="6"
              />

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
              {verifyPassword.passwordError != "" && (
                <p className="input-error-message">{"invalid password"}</p>
              )}
            </div>
            <div className="d-flex">
              {otp !== "" ? (
                <button
                  class="btn save-details common-button btn-width"
                  onClick={() => verifyOTP()}
                >
                  submit otp
                </button>
              ) : (
                <button
                  class="btn save-details common-button btn-width"
                  disabled
                >
                  submit otp
                </button>
              )}
              <div
                className="cancel-link-model"
                onClick={() => setOtpModal(false)}
              >
                Cancel
              </div>
            </div>
          </div>
        </Modal>
      )}
      <div className="d-flex">
        <div className="col-10 col-sm-12 col-md-12 col-xl-12 pl-0">
          <div className="personal-mgt-title">Personal</div>
        </div>
        <div className="col-2 col-sm-12 col-md-12 col-xl-12 d-block d-sm-none">
          <img
            className="close-icon-personal"
            src={closeBlack}
            alt="close Black"
            onClick={() => {
              manageData();
            }}
          />
        </div>
      </div>
      <div className="border-header d-none d-sm-block"></div>
      <form className="">
        <div className="form-row">
          <label className="col-form-label" htmlFor="name">
            Full Name
          </label>
          <div>
            <input
              type="text"
              className={
                "form-control right-input-row " +
                (isValidate && values.full_name === "" ? "input-error" : "")
              }
              value={values.full_name}
              placeholder="Enter your name"
              id="name"
              onChange={onChangeHandler("full_name")}
            />
            {isValidate && values.full_name === "" && (
              <p className="input-error-message absPosition">
                Name is required
              </p>
            )}
          </div>
        </div>
        <div className="form-row">
          <label className="col-form-label" htmlFor="designation">
            Designation:
          </label>
          <div>
            <input
              type="text"
              className={
                "form-control right-input-row " +
                (isValidate && values.designation === "" ? "input-error" : "")
              }
              value={values.designation}
              placeholder="Enter your designation"
              id="designation"
              onChange={onChangeHandler("designation")}
            />
            {isValidate && values.designation === "" && (
              <p className="input-error-message absPosition">
                Designation is required
              </p>
            )}
          </div>
        </div>
        <div className="form-row">
          <label className="col-form-label" htmlFor="email">
            Email-Id:
          </label>
          <div>
            <input
              type="text"
              className={`form-control right-input-row ${
                isValidate &&
                (values.email === "" ||
                  !validator.isEmail(values.email) ||
                  (validator.isEmail(values.email) &&
                    isValidEmail !== null &&
                    !isValidEmail))
                  ? "input-error"
                  : ""
              }`}
              value={values.email}
              placeholder="Enter your email id"
              id="email"
              onChange={onChangeHandler("email")}
            />
            {isValidate && values.email === "" && (
              <p className="input-error-message absPosition">
                Email ID is required
              </p>
            )}
            {isValidate &&
              values.email !== "" &&
              !validator.isEmail(values.email) && (
                <p className="input-error-message absPosition">
                  Enter Valid Email ID
                </p>
              )}
            {isValidate &&
              values.email !== "" &&
              validator.isEmail(values.email) &&
              !isValidEmail &&
              values.email !== valuesBackup.email && (
                <p className="input-error-message absPosition">
                  Email already exists.
                </p>
              )}
          </div>
        </div>
        <div className="form-row">
          <label className="col-form-label" htmlFor="mobile">
            Mobile Number:
          </label>
          <div className="d-flex">
            <div className="pin-no">
              <input
                type="text"
                className={
                  "form-control right-input-row contact-no-pin" +
                  (isValidate && values.countrycode === "" ? "input-error" : "")
                }
                style={{ width: "50px" }}
                value={values.countrycode}
                placeholder="+91"
                id="countrycode"
                onChange={onChangeHandler("countrycode")}
                maxLength="3"
                max="999"
                min="0"
              />
              {isValidate && values.countrycode === "" && (
                <p className="input-error-message absPosition">
                  Country Code required
                </p>
              )}
            </div>

            <div>
              <input
                inputmode="Number"
                style={{ paddingLeft: "0.75rem" }}
                className={
                  "form-control right-input-row contact-input-box" +
                  (isValidate &&
                  (values.mobile_no === "" || values.mobile_no.length < 10)
                    ? "input-error"
                    : "")
                }
                value={values.mobile_no}
                placeholder="Enter your mobile no"
                id="mobile"
                onChange={onChangeHandler("mobile_no")}
                maxLength="10"
              />
              {isValidate && values.mobile_no === "" && (
                <p className="input-error-message absPosition">
                  Mobile number is required
                </p>
              )}
              {isValidate &&
                values.mobile_no !== "" &&
                values.mobile_no.length < 10 && (
                  <p className="input-error-message absPosition">
                    Mobile number is invalid
                  </p>
                )}
            </div>
          </div>
        </div>
      </form>
      <div className="bottom-logo-strip personal-details">
        <div className="row aligncenter">
          {/* <div class="col-12">
                        <div className="form-row">
                           <label className="col-form-label" for="name">Confirm password:</label>
                           <input type="text" className="form-control right-input-row" placeholder="Enter your password" name="name" />
                        </div>
                     </div> */}
          {/* <div class="col-12">
                        <button class="btn save-changes-btn">save changes</button>
                    </div> */}
          <div className="col-12 col-sm-12 col-md-12 col-xl-12 flex">
            <button
              className={
                valuesChanged !== false
                  ? "btn save-changes-blue-btn"
                  : "btn save-changes-btn"
              }
              style={{ backgroundColor: "#e4e4e4" }}
              disabled={valuesChanged === false}
              onClick={() => onSubmit()}
            >
              save changes
            </button>

            {valuesChanged && (
              <div
                className="discard-label-link"
                onClick={() => {
                  setValues(valuesBackup);
                  setValuesChanged(false);
                  setIsValidate(false);
                }}
              >
                discard changes
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default CoSettingRightGrid;
