import React from "react";
import "./styles.css";
import RightImageBg from "../../../../assets/Images/Onboarding/RectangleOnboadign.png";
import comtech from "../../../../assets/Images/CapmTech.png";
import secmark from "../../../../assets/Images/secmark.png";
import privacyTip from "../../../../assets/Icons/privacyTip.png";
import SideBar from "../SideBar";
import apiServices from "../../../../apiServices";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { actions as emailActions } from "../../../OnBording/redux/actions";
import { useHistory, useLocation, useParams } from "react-router";

function VerifyEmailErrorPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const url_params = useParams();
  const state = useSelector((state) => state);
  const [showSupportText, setShowSupportText] = React.useState(false);
  const email =
    state &&
    state.complianceOfficer &&
    state.complianceOfficer.verifyEmailInfo &&
    state.complianceOfficer.verifyEmailInfo.email;

  const resendEmail = () => {
    // window.Email.send({
    //   Host: "180.179.151.1",
    //   Username: "secmarktx@m3c.io",
    //   Password: "Am6#uIayAOE#c",
    //   To: email,
    //   From: "support@capmtech.com",
    //   Subject: "Verification Email",
    //   Body: getTemplate(email),
    // })
    //   .then(function (message) {
    //     if (message === "OK") {
    //       toast.success("The verification link has been sent to your email account successfully");
    //     } else {
    //       toast.error("The mail not sent successfully");
    //     }
    //     // toast.success("mail sent successfully")
    //   })
    //   .then(function (error) {
    //     // toast.error("mail not sent successfully")
    //   });
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
  const handleConfirmEmail = () => {
    console.log(new URLSearchParams(location.search));
    // const email =
    //   location.search &&
    //   location.search !== "" &&
    //   location.search.split("=")[1];
    const email = new URLSearchParams(location.search).get("email");
    if (email !== null && email !== "") {
      let payload = {
        actionFlag: 2,
        adminEmail: email,
      };
      console.log(payload);
      apiServices.post("/api/ins_upd_del_User", payload).then((response) => {
        //   if(response &&
        //       response.data &&
        //       response.data.Status  &&
        //       response.data.Status === true) {
        //           toast.success("Emain verified succesfully!")
        //           history.push("/login");
        //       }else {
        //           toast.error("Something went wrong");
        //       }
        console.log(response);
      });
    } else {
      toast.error("Verification link is invalid");
    }
  };
  return (
    <div className="row">
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
            <div className="verify-email-main">
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
              <div className="verify-email">
                <p className="verify-title">Verify your email</p>
                <p className="verify-link">
                  Click on confirm button to verify your email{" "}
                </p>
                <button class="confirm-btn mt-3" onClick={handleConfirmEmail}>
                  Confirm
                </button>
              </div>
              <div className="bottom-logo-strip-verify">
                <div className="row aligncenter">
                  <div className="col-md-8 col-xs-12">
                    {/* <p
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
                    </p> */}

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

export default VerifyEmailErrorPage;
