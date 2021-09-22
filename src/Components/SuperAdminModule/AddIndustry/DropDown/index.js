import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import check from "../../../../assets/Icons/check.png";
import uncheck from "../../../../assets/Icons/uncheck.png";
 import {
   getLicenseList,
   selectCompanyToggle,
 } from "../../../../Components/HistoryModule/redux/actions.js";
import constant from "../../../../CommonModules/sharedComponents/constants/constant";
import "./style.css";

function MultiSelectDropdown({
  lableTitle,
  options,
  inputTitle,
  dispatch,
  cssstyle
}) {
  const [selectTitle, setSelectTitle] = useState({
    selected: false,
    title: inputTitle,
  });
  const [selec,setSelec] = useState("")
  const [isOpen, setIsOpen] = useState(false);
  const sagaState = useSelector((state) => state);
  console.log("this are the opions",options)
//   useEffect(() => {
//     const licenseRequestPayload = {
//       userID: sagaState.auth.loginInfo?.UserID,
//       entityid: constant.licenseEntityId,
//       usertype: sagaState.auth.loginInfo?.UserType,
//     };
//     dispatch(getLicenseList(licenseRequestPayload));
//   }, []);
console.log("my state ",selec)
  return (
    <>
      <div className="form-group">
        <label htmlFor="lable-title" className="St-lable mb-2">
          {lableTitle}
        </label>
        <div 
          className={`form-control ${cssstyle === "taskhistory" ? "taskhistory":"select-container"}`}
          id="lable-title"
          onClick={(e) => {
            setIsOpen(!isOpen);
          }}
        >
          <span
            className={
              sagaState.HistoryReducer.numberOfSelectedCompanies !== 0
                ? "select-title-active"
                : "select-title"
            }
          >
            {sagaState.HistoryReducer.numberOfSelectedCompanies !== 0
              ? `${sagaState.HistoryReducer.numberOfSelectedCompanies} selected`
              : `select ${inputTitle}`}
          </span>
          <span
            style={{
              transform: isOpen ? "rotate(0deg)" : "rotate(180deg)",
              height: "0",
              width: "0",
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderBottom: "5px solid #000",
              backgroundColor: "transparent",
              transition: " all 400ms ease-in-out",
            }}
          ></span>
        </div>
        <div className="dropdown-container" onBlur={() => setIsOpen(true)}>
          <div className={`dropdown ${isOpen && "dropdown--open"}`}>
            {options.map((option) => {
              const id = option.EntityGroupID;
              return (
                <div
                  className="dropdown-item d-flex"
                  
                  onClick={() => {
                    const selectedCompanies = options
                      .filter((list) => list.selected === true)
                      .map((list) => list.EntityGroupID)
                      .join(",");
                      setSelec(selectedCompanies);
                      console.log("selected",selectedCompanies);
                  }}
                >
                  <span className="dropdown-item__title">
                    {option}
                    {console.log(option)}
                  </span>
                  <span className="dropdown-item--selected">
                    {option.selected ? (
                      <img src={check} />
                    ) : (
                      <img src={uncheck} />
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default MultiSelectDropdown;
