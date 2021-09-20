import React, { useState } from "react";
import DiscountModule from "./DiscountModule";
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
      <div className="PriceManagement-options-select">
        <div className="selected-option">
          <DiscountModule />
        </div>
      </div>
    </div>
  );
};

export default PriceManagement;
