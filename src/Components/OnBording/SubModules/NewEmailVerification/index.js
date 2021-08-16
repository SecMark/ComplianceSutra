import React from "react";
import "./styles.css";
import RightImageBg from "../../../../assets/Images/Onboarding/RectangleOnboadign.png";
import comtech from "../../../../assets/Images/CapmTech.png";
import secmark from "../../../../assets/Images/secmark.png";

import SideBar from "../SideBar";
import apiServices from "../../../../apiServices";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import { actions as adminMenuActions } from "../DashBoardCO/MenuRedux/actions";
import { actions as notficationActions } from "../DashBoardCO/components/notification/Redux/actions";
import { actions as loginActions } from "../../../Authectication/redux/actions";

function VerifyEmailErrorPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const state = useSelector((state) => state);
  const [showSupportText, setShowSupportText] = React.useState(false);
  const userDetails = state && state.auth && state.auth.loginInfo;
  const onLogoutClick = () => {
    if (userDetails.UserType === 3) {
      dispatch(adminMenuActions.setCurrentMenu("dashboard"));
    } else {
      dispatch(adminMenuActions.setCurrentMenu("taskList"));
    }
    dispatch(loginActions.createLogoutAction());
    dispatch(adminMenuActions.setCurrentBoardViewTaskId(null));
    dispatch(adminMenuActions.setCurrentCalendarViewTaskId(null));
    dispatch(notficationActions.setTaskID(null));
    history.push("/login");
  };

  const handleConfirmEmail = () => {
    const email = new URLSearchParams(location.search).get("email");
    if (email !== null && email !== "") {
      let payload = {
        actionFlag: 2,
        adminEmail: email,
      };
      apiServices.post("/api/ins_upd_del_User", payload).then((response) => {
        if (response && response.data && response.data.UserDetails) {
          toast.success("Emain verified succesfully!");
          onLogoutClick();
        } else {
          toast.error("Something went wrong");
          onLogoutClick();
        }
      });
    } else {
      toast.error("Verification link is invalid");
      onLogoutClick();
    }
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
                    {showSupportText && (
                      <p className="account-link">
                        {/* Did not receive an email? */}
                        Need help? Reach out to us 'at:
                        <span
                          style={{ cursor: "pointer" }}
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
