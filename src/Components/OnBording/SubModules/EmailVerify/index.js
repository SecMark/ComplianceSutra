import React, { useEffect } from "react";
import "./style.css";
import RightImageBg from "../../../../assets/Images/Onboarding/RectangleOnboadign.png";
import comtech from "../../../../assets/Images/CapmTech.png";
import secmark from "../../../../assets/Images/secmark.png";
import { withRouter } from "react-router-dom";
import emailVerify from "../../../../assets/Icons/emailVerify.png";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../SideBar";

function EmailVerify({ history }) {
  const location = window.location.href.split("?");
  let email = location[1].split("=");
  localStorage.setItem("coemail", email[1]);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    setTimeout(() => {
      history.push("/personal-details");
    }, 3000);
  }, []);

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
              <div className="email-verify">
                <img src={emailVerify} alt="" />
                <p className="verify-title">Thank you for registering!</p>
                <p className="verify-link">
                  Let's go ahead and set up your account now.
                </p>
              </div>
              <div className="bottom-logo-strip">
                <div className="row aligncenter">
                  <div className="col-md-12 col-xs-12 d-none d-sm-block text-right">
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

export default withRouter(EmailVerify);
