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

  const redirectToLogin = () => {
    const email =
      state &&
      state.complianceOfficer &&
      state.complianceOfficer.userData &&
      state.complianceOfficer.userData &&
      state.complianceOfficer.userData &&
      state.complianceOfficer.userData.adminEmail;

    const adminPWD =
      state &&
      state.complianceOfficer &&
      state.complianceOfficer.userData &&
      state.complianceOfficer.userData &&
      state.complianceOfficer.userData &&
      state.complianceOfficer.userData.adminPWD;

    dispatch(
      loginActions.signInRequest({
        LoginId: email,
        Pwd: adminPWD,
        Loginty: "AdminEmail",
        history: history,
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
