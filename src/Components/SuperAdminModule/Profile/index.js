import React, { useState } from "react";
import ManageNotification from "./ManageNotification";
import ManageSecruity from "./ManageSecurity";

import ProfileOptions from "./ProfileOptions";
import EditProfile from "./EditProfile";

import "./style.css";

const Profile = (props) => {
  const [options, setOptions] = useState("edit");

  const selectProfileOption = (option) => {
    setOptions(option);
  };
  return (
    <div className="ER-profile-main">
      <div className="">
        <ProfileOptions
          selectProfileOption={selectProfileOption}
          option={options}
        />
      </div>
      <div className="ER-options-select">
        {options === "edit" && <EditProfile />}
        {options === "notification" && <ManageNotification />}
        {/* {options === "task" && <TaskManagement />} */}
        {options === "security" && <ManageSecruity />}
        {/* {options === "migration" && <MigrationRequest />} */}
      </div>
    </div>
  );
};

export default Profile;
