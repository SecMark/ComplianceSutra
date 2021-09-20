import React, { useState } from "react";
import "./style.css";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";

const PriceManagement = (props) => {
  const [options, setOptions] = useState("edit");

  const selectProfileOption = (option) => {
    setOptions(option);
  };
  return (
    <div className="row">
      <div className="col-md-3">
        <div className="side-bar-outer">
          <LeftSideBar
            selectProfileOption={selectProfileOption}
            option={options}
          />
        </div>
      </div>
      <div className="col-md-9 bg-img">
        <RightSideBar />
      </div>
    </div>
  );
};

export default PriceManagement;
