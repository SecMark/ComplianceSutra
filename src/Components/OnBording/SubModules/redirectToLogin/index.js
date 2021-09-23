import React, { useEffect } from "react";
import CheckIcon from "../../../../assets/Images/Onboarding/checkIcon.png";
import { withRouter } from "react-router-dom";

import { actions as loginActions } from "../../../Authectication/redux/actions";
import { useDispatch, useSelector } from "react-redux";
function YourAreDone({ history }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  useEffect(() => {
    setTimeout(() => {
      redirectToLogin();
    }, 8000);
  }, []);
  useEffect(() => {
    console.log(state);
  }, []);

  const redirectToLogin = () => {
    const email =
      state &&
      state.complianceOfficer &&
      state.complianceOfficer.userInfo &&
      state.complianceOfficer.emailInfo.userInfo.email;
    // state.complianceOfficer.userData &&
    // state.complianceOfficer.userData &&
    // state.complianceOfficer.userData.adminEmail;

    const password =
      state &&
      state.complianceOfficer &&
      state.complianceOfficer.userInfo &&
      state.complianceOfficer.emailInfo.userInfo.password;
    // state.complianceOfficer.userData &&
    // state.complianceOfficer.userData &&
    // state.complianceOfficer.userData.adminPWD;

    dispatch(
      loginActions.signInRequest({
        // LoginId: email,
        email,
        password,
        // Pwd: adminPWD,
        // Loginty: "AdminEmail",
        history,
      })
    );
  };
  return (
    <div className="you-are-done">
      <div className="text-section">
        <img src={CheckIcon} alt="CheckIcon" />
        <p className="title"> And you are done! </p>
        <p className="desc">Taking you to the dashboard</p>
      </div>
    </div>
  );
}

export default withRouter(YourAreDone);
