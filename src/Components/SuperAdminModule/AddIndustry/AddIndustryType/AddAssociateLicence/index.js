import React, { useState } from "react";
import "./style.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useSelector } from "react-redux";
function AddAssociateLicence({ onDropdownChange, dopdownValues, dropdata }) {
  const animatedComponents = makeAnimated();
  const options = [
    { value: "Good And Service Tax", label: "Good And Service Tax" },
    {
      value: "National Stock Exchange Tax",
      label: "National Stock Exchange Tax",
    },
    { value: "Brand New License", label: "Brand New License" },
  ];

  const customstyle = {
    control: (styles) => ({
      ...styles,
      width: "100%",
      backgroundColor: "#fafafa",
    }),
  };

  return (
    <div>
      <div>
        <h6 className="It-License">License Details</h6>
        <div className="mb-3">
          <lable className="Al-lable mb-2" htmlFor="activateon">
            Select Associate License
          </lable>
          <Select
            defaultValue={dropdata}
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            styles={customstyle}
            options={options}
            onChange={onDropdownChange}
          />
        </div>
      </div>
    </div>
  );
}

export default AddAssociateLicence;
