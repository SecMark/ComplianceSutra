import React, { useState, useEffect } from "react";
import "./style.css";
import comtech from "../../../../assets/Images/CapmTech.png";
import secmark from "../../../../assets/Images/secmark.png";
import RightImageBg from "../../../../assets/Images/Onboarding/RectangleOnboadign.png";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../../../OnBording/SubModules/SideBar";
import { getTemplate } from "./ForgotPasswordTemplate";
import validator from "validator";
import apiServices from "../../../../apiServices";
import api from "../../../../apiServices";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";

function ForgotPassword({ history }) {
  const [values, setValues] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({
    emailErr: "",
  });
  const onChangeHandler = (name) => (event) => {
    if (name === "email") {
      let inputKey = "emailErr";
      if (!validator.isEmail(event.target.value)) {
        setErrors({ ...errors, [inputKey]: "Email is invalid" });
      } else {
        setErrors({ ...errors, [inputKey]: "" });
      }
    }

    setValues({ ...values, [name]: event.target.value });
  };

  const sendResetPasswordEmail = (email) => {
    let obj = {
      email: email,
      invitation: "F",
    };
    apiServices
      .post("/api/getEmailbody", obj)
      .then(function (response) {
        // handle success
        if (
          response &&
          response.data &&
          response.data.Status &&
          response.data.Status === true
        ) {
          toast.success(
            "The reset password link has been sent to your email account successfully"
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
  const onSubmit = () => {
    if (errors.emailErr !== "" || values.email === "") {
      // scrollToElement('.input-error');
      return;
    }
    let payload = {
      loginID: values.email,
      pwd: "",
      rememberme: 0,
      loginty: "AdminEmail",
    };
    let body;
    api
      .post("/api/availabilityCheck", payload)
      .then(function (response) {
        // handle success
        if (response && response.data && response.data.Status === "True") {
          sendResetPasswordEmail(values.email);
        } else {
          toast.error("Email is not available please register account");
        }
      })
      .catch(function (error) {
        if (error) {
        }
      });
  };

  const sendEmail = (body) => {
    window.Email.send({
      Host: "180.179.151.1",
      Username: "secmarktx@m3c.io",
      Password: "Am6#uIayAOE#c",
      To: `${values.email}`,
      From: "support@capmtech.com",
      Subject: "Reset password",
      Body: body,
    })
      .then(function (message) {
        if (message === "OK") {
          toast.success(
            "The verification link has been sent to your email account successfully"
          );
        } else {
          toast.error("The mail not sent successfully");
        }
      })
      .then(function (error) {});
  };
  const redirectToSignupScreen = () => {
    return history.push("/");
  };
  return (
    <div className="row forgot-pass-mobile">
      <div className="col-3 left-fixed">
        <div className="on-boarding">
          <SideBar />
          {/* <SideBarInputControl /> */}
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
            <div className="forgot-pass-top">
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
              <div className="comtech_forgot forgot_form_wrapper">
                <p className="comtech_forgot_title">Forgot Password</p>
                <div className="forgot_form_wrapper">
                  <div className="form-group">
                    <label htmlFor="Company Email">Registered Email</label>
                    <input
                      type="text"
                      className={
                        "form-control" +
                        (errors && values.email !== "" && errors.emailErr !== ""
                          ? " input-error"
                          : "") +
                        // (setErrors("") ? " jhd" : "non")
                        // +  (setErrors(""))
                        (values.email !== "" && errors.emailErr === ""
                          ? " success-form-control"
                          : "")
                      }
                      placeholder="Enter your registered email"
                      value={values.email}
                      onChange={onChangeHandler("email")}
                    />
                    {errors &&
                      values.email !== "" &&
                      errors.emailErr !== "" && (
                        <p className="input-error-message">Email is invalid</p>
                      )}
                  </div>

                  <button
                    style={{ cursor: "pointer" }}
                    type="submit"
                    onClick={() => onSubmit()}
                    className="btn common-button-forgot"
                  >
                    Send Link
                  </button>
                  <p className="activate-link">
                    We will send a password reset link on your email
                  </p>
                </div>
              </div>
              <div className="bottom-logo-strip">
                <div className="row aligncenter">
                  <div className="col-md-6 col-xs-12 d-none d-sm-block">
                    <p
                      onClick={() => redirectToSignupScreen()}
                      style={{ cursor: "pointer" }}
                      className="account-link"
                    >
                      Don't have an account?
                      <span className="login-link"> SIGNUP</span>
                    </p>
                  </div>
                  <div className="col-md-6 col-xs-12 d-none d-sm-block text-right">
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

export default withRouter(ForgotPassword);
