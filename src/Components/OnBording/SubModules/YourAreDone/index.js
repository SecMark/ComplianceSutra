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
      state.users &&
      state.users.personalInfo &&
      state.users.personalInfo.formData &&
      state.users.personalInfo.formData.adminEmail;

    const pwd =
      state &&
      state.users &&
      state.users.personalInfo &&
      state.users.personalInfo.formData &&
      state.users.personalInfo.formData.adminPWD;

    dispatch(
      loginActions.signInRequest({
        LoginId: email,
        Pwd: pwd,
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
