import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import SideBarInputControl from "../LeftSideBar";
import Cobg from "../../../../../../assets/Images/Onboarding/co-bg.png";
import RighSideGrid from "../notification/SubModules/RightSideNotification";
import { withRouter } from "react-router-dom";
import { actions as adminMenuActions } from "../../MenuRedux/actions";
import Auth from "../../../../../Authectication/components/Auth";
function Notification({ history }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const userID =
    state &&
    state.auth &&
    state.auth.loginInfo &&
    (state.auth.loginInfo.email || state.auth.loginInfo.EmailID);
  const isMobileVerified =
    state &&
    state.auth &&
    state.auth.loginInfo &&
    state?.auth?.loginInfo?.mobileVerified;
  useEffect(() => {
    if (
      window.location.href.includes("notifications") &&
      state.adminMenu.currentMenu !== "notfications"
    ) {
      dispatch(adminMenuActions.setCurrentMenu("notfications"));
    }
  }, []);
  return (
    <div className="row co-dashboard">
      <Auth />
      <div className=" left-fixed ">
        <div className="on-boarding">
          <SideBarInputControl />
        </div>
      </div>
      <div className="col-12 ">
        <img className="right-bg" src={Cobg} alt="" />
        <RighSideGrid />
      </div>
    </div>
  );
}

export default withRouter(Notification);
