import React from "react";
import "./style.css";
import RightImageBg from "../../../../assets/Images/Onboarding/RectangleOnboadign.png";
import comtech from "../../../../assets/Images/CapmTech.png";
import secmark from "../../../../assets/Images/secmark.png";
import leftArrow from "../../../../assets/Icons/leftArrow.png";
import SideBarInputControl from "../SideBarInputControl";

function SendOTP({ currentStep }) {
  return (
    <div className="row">
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
                <p className="login_title">
                  <img className="right-back-arrow" src={leftArrow} alt="" />{" "}
                  Let's secure your account
                  <br />
                  with verified mobile
                </p>

                <div className="verify-otp">
                  <p className="disc-text">
                    Please enter the verification code sent to your phone no.
                  </p>
                  <p className="will-send-text"> +91 987****210 </p>

                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="OTP"
                      placeholder="Enter 6 digit OTP"
                      required
                    />
                  </div>
                  <button className="btn save-details common-button">
                    VERIFY
                  </button>
                </div>
              </div>
              <div className="bottom-logo-strip">
                <div className="row aligncenter">
                  <div className="col-6"></div>
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

export default SendOTP;
