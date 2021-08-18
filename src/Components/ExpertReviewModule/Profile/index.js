import React, { useState } from "react";
import ManageNotification from "./ManageNotification";
import ManageSecruity from "./ManageSecurity";
import MigrationRequest from "./MigrationRequest";
import ProfileOptions from "./ProfileOptions";

import "./style.css";
import TaskManagement from "./TaskManagement";

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
        {options === "edit" && ""}
        {options === "notification" && <ManageNotification />}
        {options === "task" && <TaskManagement />}
        {options === "security" && <ManageSecruity />}
        {options === "migration" && <MigrationRequest />}
      </div>
    </div>
  );
};

export default Profile;
