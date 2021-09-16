import React from "react";
import "./style.css";

import RightImageBg from "../../../../assets/Images/Onboarding/RectangleOnboadign.png";
import comtech from "../../../../assets/Images/CapmTech.png";
import secmark from "../../../../assets/Images/secmark.png";
import privacyTip from "../../../../assets/Icons/privacyTip.png";
import SideBar from "../SideBar";
import apiServices from "../../../../apiServices";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

function VerifyEmailErrorPage() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [showSupportText, setShowSupportText] = React.useState(false);
  const email =
    state &&
    state.complianceOfficer &&
    state.complianceOfficer.verifyEmailInfo &&
    state.complianceOfficer.verifyEmailInfo.email;

  const resendEmail = () => {
    let obj = {
      email: email,
      invitation: "V",
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
            "The verification link has been sent to your email account successfully"
          );
        } else {
          toast.error("The mail not sent successfully");
        }
      })
      .catch(function (error) {
        if (error) {
        }
      });

    setShowSupportText(true);
  };

  return (
    <div className="row">
      <div className="col-3 left-fixed">
        <div className="on-boarding">
          <SideBar />
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
            <div className="verify-email-main">
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
              <div className="verify-email">
                <img src={privacyTip} alt="" />
                <p className="verify-title">
                  Verify your email to complete your registration
                </p>
                <p className="verify-link">
                  Please click on the link that has just been sent to{" "}
                  <span
                    style={{ fontWeight: "bolder" }}
                    className="aa"
                  >{` ${email}`}</span>{" "}
                  to verify your email.
                </p>
                <p className="verify-link">
                  Close this tab and continue your registration process.{" "}
                </p>
              </div>
              <div className="bottom-logo-strip-verify">
                <div className="row aligncenter">
                  <div className="col-md-8 col-xs-12">
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => resendEmail()}
                      className="account-link-black"
                    >
                      {" "}
                      Did not receive an email?{" "}
                      <span className="login-link contact-spacing ml-2">
                        {" "}
                        RESEND
                      </span>
                    </p>

                    {showSupportText && (
                      <p className="account-link">
                        {/* Did not receive an email? */}
                        Need help? Reach out to us 'at:
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => resendEmail()}
                          className="login-link-black contact-spacing"
                        >
                          {" "}
                          reachus@secmark.in
                          {/* // RESEND IT */}
                        </span>
                        <div className="d-block d-sm-none blank-mobile">
                          &nbsp;
                        </div>
                        Contact:
                        <span className="login-link-black"> 9869265949</span>
                      </p>
                    )}
                  </div>
                  <div className="col-md-4 col-xs-12 d-none d-sm-block text-right">
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

export default VerifyEmailErrorPage;
