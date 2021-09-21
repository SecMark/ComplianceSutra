import React from "react";
import "./style.css";
import { useDispatch } from "react-redux";

import { FaPowerOff } from "react-icons/fa";

import { useHistory } from "react-router";
import { actions as loginActions } from "../../../Authectication/redux/actions";

const ProfileOptions = ({ option, selectProfileOption }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onClickLogout = () => {
    dispatch(loginActions.createLogoutAction());
    history.push("/login");
  };
  return (
    <div className="ER-profile-options">
      <div>
        <h3 style={{ margin: "0" }}>Hi Ramesh,</h3>
        <span>rameshkumar@sechmark.in</span>
      </div>
      <div className="options-container">
        <ul className="options-list">
          <li
            onClick={() => selectProfileOption("edit")}
            className={option === "edit" && "active"}
          >
            Edit Profile Details
          </li>
          <li
            onClick={() => selectProfileOption("notification")}
            className={option === "notification" && "active"}
          >
            Manage Notifications
          </li>

          <li
            onClick={() => selectProfileOption("security")}
            className={option === "security" && "active"}
          >
            Manage Security
          </li>
        </ul>
        <div className="LogoutButton">
          <button onClick={onClickLogout}>
            <FaPowerOff style={{ marginRight: "8px" }} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileOptions;
