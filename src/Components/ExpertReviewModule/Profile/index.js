import React from "react";
import LeftSideBar from "../LeftSideBar";
import ProfileOptions from "./ProfileOptions";

import "./style.css";

function Profile(props) {
  return (
    <div className="ER-profile-main">
      <div className="row">
        <div className="col-md-4">
          <ProfileOptions />
        </div>
      </div>
    </div>
  );
}

export default Profile;
