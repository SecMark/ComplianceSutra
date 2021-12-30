import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const Auth = () => {
  const history = useHistory();
  const authInfo = useSelector((state) => state?.auth?.loginInfo);
  const email = authInfo?.email || authInfo?.EmailID;
  const isMobileVerified = authInfo?.mobileVerified || 0;
  const isSignupDone = authInfo?.signup_done;
  const userType = authInfo?.UserType;
  useEffect(() => {
    const { pathname } = history.location;
    console.log({ pathname });
    if (!(email && isMobileVerified && isSignupDone && userType)) {
      if (pathname.includes("sign-up")) {
        history.replace("/sign-up");
      } else if (!pathname.includes("login")) {
        history.replace("/login");
      }
    } else {
      if (pathname.includes("login") || pathname.includes("sign-up")) {
        if (userType === 3) history.push("/dashboard-view");
        else history.push("/dashboard");
      }
    }
  }, []);
  return <></>;
};

export const getUserType = (roles) => {
  let userType = 0;
  let complianceOfficer, approver, teamMember;
  complianceOfficer = approver = teamMember = null;
  if (roles?.length > 0) {
    [...roles].forEach((role) => {
      if (role.User_type_no === 4) teamMember = role;
      else if (role.User_type_no === 5) approver = role;
      else if (role.User_type_no === 3) complianceOfficer = role;
    });
  }
  if (complianceOfficer) userType = complianceOfficer.User_type_no;
  else if (approver) userType = approver.User_type_no;
  else if (teamMember) userType = teamMember.User_type_no;
  else userType = 4;

  return userType;
};

export default Auth;
