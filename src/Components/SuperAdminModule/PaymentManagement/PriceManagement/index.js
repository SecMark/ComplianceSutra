import React, { useState } from "react";
import DiscountModule from "./DiscountModule";
import ComplainceModule from "./ComplainceModule";
import "./style.css";
import RightSideBar from "./RightSideBar";

const PriceManagement = (props) => {
  const [options, setOptions] = useState("complianceModule");

  const selectProfileOption = (option) => {
    setOptions(option);
  };
  return (
    <div className="row">
      <div className="col-md-3">
        <div className="side-bar-outer">
          <RightSideBar
            selectProfileOption={selectProfileOption}
            option={options}
          />
        </div>
      </div>

      <div className="col-md-9 PriceManagement-options-select">
        <div className="selected-option">
          {options === "complianceModule" && <ComplainceModule />}
          {options === "discount" && <DiscountModule />}
        </div>
      </div>
    </div>
  );
};

export default PriceManagement;
