import React, { useState } from "react";
import "./style.css";
const ToggleButton = ({ forHTML, isChecked, onChangeHandler }) => {
  const [isActive, setIsActive] = useState(isChecked || false);
  const handleToggle = (e) => {
    setIsActive(!isActive);
    onChangeHandler(e.target.checked);
  };
  return (
    <div className="cs-toggle__container">
      <label class="switch">
        <input
          type="checkbox"
          checked={isActive}
          onChange={handleToggle}
          id={forHTML}
        />
        <span class="slider round"></span>
      </label>
    </div>
  );
};

export default ToggleButton;

// Props:
//      1) forHTML: string value which will be id for your checkbox input
//      2) isChecked: default value for checkbox ( true or false )
//      3) onChangeHandler: function for accessing value of checkbox [function type: (value)=>{// action for checkbox state}]
