import React, { useEffect, useState } from "react";
import RightImageBg from "../../../../../assets/Images/Onboarding/RectangleOnboadign.png";

import comtech from "../../../../../assets/Images/CapmTech.png";
import secmark from "../../../../../assets/Images/secmark.png";
import leftArrow from "../../../../../assets/Icons/leftArrow.png";
import { useDispatch, useSelector } from "react-redux";
import SideBarInputControl from "../SideBarInputControlTeamMember";
import api from "../../../../../apiServices";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
function VeryOTP({ history }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [currentOTP, setCurrentOTP] = useState("");
  const [isOTPValid, setIsOTPValid] = useState(false);
  const [otp, setOTP] = useState("");
  const [isEnableSecureOTP, setIsEnabledSecureOTP] = useState(false);
  const otpInfo =
    state && state.complianceOfficer && state.complianceOfficer.otoInfo;

  const email = state && state.teamMemberFlow && state.teamMemberFlow.personalInfoTM &&
    state.teamMemberFlow.personalInfoTM.formDataPersonalTM &&
    state.teamMemberFlow.personalInfoTM.formDataPersonalTM.adminEmail
  const mobileNumber = state && state.teamMemberFlow && state.teamMemberFlow.personalInfoTM
    && state.teamMemberFlow.personalInfoTM.formDataPersonalTM &&
    state.teamMemberFlow.personalInfoTM.formDataPersonalTM.adminMobile
  const handelChange = (e) => {
    const mobileNumberReg = /^[0-9]{0,5}$/;
    if (e.target.name === "otp") {
      if (!mobileNumberReg.test(e.target.value)) {
        return "";
      }
    }
    setOTP(e.target.value);
  };
  const sendOTPRequest = () => {
    let payload = {}
    if (mobileNumber && email) {
      payload = {
        phn: email,
        email: mobileNumber,
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
            toast.success("The OTP has been sent to your registered mobile number")
            setCurrentOTP(response.data.otp);
          } else {
            setCurrentOTP("");
            toast.error("something went wrong please try again !!!")
            setIsEnabledSecureOTP(false);
          }
        })
        .catch(function (error) {
          if (error) {
            setIsEnabledSecureOTP(false);
          }
        });
    } else {
      toast.error("Please follow verification process")
      return '';
    }
  };

  const checkOTP = () => {
    if (currentOTP === otp) {
      toast.success("OTP verified");
      history.push("/team-member");
    } else {
      toast.error("Invalid OTP");
      setOTP("");
    }
  };


  return (
    <div className="row">
      <div className="col-3 left-fixed">
        <div className="on-boarding">
          <SideBarInputControl currentScreen={2} />
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
                        <img src={comtech} alt="COMPLIANCE SUTRA" title="COMPLIANCE SUTRA" />
                        <span className="camp">COMPLIANCE SUTRA</span>
                      {/* </a> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="wrapper_login">
                {isEnableSecureOTP === false && (
                  <div>
                    <p className="login_title">
                      <img
                        className="right-back-arrow"
                        src={leftArrow}
                        alt=""
                      />{" "}
                      Let's secure your account
                      <br />
                      with verified mobile
                    </p>
                    <div className="send-otp">
                      <p className="disc-text">
                        This helps you prevent unauthorized access to your account. And you don't have to remember any password </p>
                      <p className="will-send-text">
                        We will send OTP on +91 9876543211{" "}
                      </p>
                      <button
                        onClick={() => sendOTPRequest()}
                        className="btn save-details common-button"
                      >
                        SECURE NOW
                      </button>
                    </div>
                  </div>
                )}
                {isEnableSecureOTP && (
                  <div className="verify-otp">
                    <p className="disc-text">
                      Please enter the verification code sent to your phone no.
                    </p>
                    <p className="will-send-text"> +91 987****210 </p>
                    {/* <p className="will-send-text"> +91 987****210 <span className="change">Edit</span></p> */}
                    {/* <p> <span className="resend-text">Didn't receive the OTP?
                    </span><span className="resend">RESEND</span></p> */}
                    <div className="form-group">
                      <input
                        type="text"
                        name="otp"
                        value={otp}
                        onChange={handelChange}
                        className="form-control"
                        id="OTP"
                        placeholder="Enter 5 digit OTP"
                        required
                      />
                    </div>
                    <button
                      disabled={currentOTP === ""}
                      onClick={() => checkOTP()}
                      className="btn save-details common-button"
                    >
                      VERIFY
                    </button>
                  </div>
                )}
                {/* <span className="change">CHANGE</span> */}
                {/* <div className="verify-otp">                 
                  <p className="disc-text">Please enter the verification code sent to your phone no.</p>
                    <p className="will-send-text"> +91 987****210 </p>
                    <p className="will-send-text"> +91 987****210 <span className="change">Edit</span></p>
                    <p> <span className="resend-text">Didn't receive the OTP?
                    </span><span className="resend">RESEND</span></p> 
                     <div className="form-group">
                        <input type="text" className="form-control" id="OTP" placeholder="Enter 6 digit OTP" required />
                     </div> 
                     <button className="btn save-details common-button">VERIFY</button>
                  </div> */}
              </div>
              <div className="bottom-logo-strip">
                <div className="row aligncenter">
                  <div className="col-6"></div>
                  <div className="col-6 text-right">
                    {/* <a href="#" style={{'cursor': 'auto'}}> */}
                      <img className="header_logo footer-logo-secmark" src={secmark} alt="SECMARK" title="SECMARK" />
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
