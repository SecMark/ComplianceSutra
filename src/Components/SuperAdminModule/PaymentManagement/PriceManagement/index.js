import React, { useState } from "react";
import RightSideBar from "./RightSideBar";
import "./style.css";

const PriceManagement = (props) => {
  const [options, setOptions] = useState("edit");

  const selectProfileOption = (option) => {
    setOptions(option);
  };
  return (
    <div className="PriceManagement-profile-main">
      <div className="">
        <RightSideBar
          selectProfileOption={selectProfileOption}
          option={options}
        />
      </div>
      <div className="PriceManagement-options-select"></div>
    </div>
  );
};

export default PriceManagement;
