import React, { useEffect } from "react";
import "./style.css";
import RightImageBg from "../../../../assets/Images/Onboarding/RectangleOnboadign.png";
import comtech from "../../../../assets/Images/CapmTech.png";
import secmark from "../../../../assets/Images/secmark.png";
import { withRouter } from "react-router-dom";
import emailVerify from "../../../../assets/Icons/emailVerify.png";
import { useDispatch, useSelector } from "react-redux";
import { actions as emailVerification } from "../../redux/actions";
import SideBar from "../SideBar";

function EmailVerify({ history }) {
  const location = window.location.href.split('?');
  let email = location[1].split('=');
  localStorage.setItem("coemail", email[1]);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

 

   useEffect(() => {

      setTimeout(() => {
         history.push("/personal-details")
      }, 3000);
    // dispatch(emailVerification.insUpdateDeletAPIRequest({
    //    entityName: "",
    //    adminName: "",
    //    adminMobile: "",
    //    adminEmail: email,
    //    adminPWD: "",
    //    isClientTypeUser: 0,
    //    userType: "",
    //    actionFlag: 1,
    //    designation: "",
    //    userID: "",
    //    history
    // }),
    // );
  }, []);
  console.log("emailVerification", email);
  return (
    <div className="row">
      <div className="col-3 left-fixed">
        <div className="on-boarding">
          <SideBar />
          {/* <SideBarInputControl /> */}
        </div>
      </div>
      {/* <div className="col-3">
            <SideBar />
         </div> */}
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
              <div className="email-verify">
                <img src={emailVerify} alt="" />
                <p className="verify-title">Thank you for registering!</p>
                <p className="verify-link">
                  Let's go ahead and set up your account now.
                </p>
              </div>
              <div className="bottom-logo-strip">
                <div className="row aligncenter">
                  {/* <div className="col-6">
                           <p className="account-link">Already have an account?<span className="login-link"> LOGIN</span></p>
                        </div> */}
                  <div className="col-md-12 col-xs-12 d-none d-sm-block text-right">
                    {/* <a href="#" style={{'cursor': 'auto'}}> */}
                      <span className="powerBy">Powered by</span>
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

export default withRouter(EmailVerify);
