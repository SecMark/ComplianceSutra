import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import constant from "../../../../CommonModules/sharedComponents/constants/constant";
import {setIndustryApplicableIN} from "../AddIndustryType/redux/actions";
import "./style.css";

function MultiSelectDropdown({
  lableTitle,
  options,
  inputTitle,
  dispatch,
  cssstyle,
}) {
  const [selectTitle, setSelectTitle] = useState({
    selected: false,
    title: inputTitle,
  });
  const [selec, setSelec] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const sagaState = useSelector((state) => state);

  //   useEffect(() => {
  //     const licenseRequestPayload = {
  //       userID: sagaState.auth.loginInfo?.UserID,
  //       entityid: constant.licenseEntityId,
  //       usertype: sagaState.auth.loginInfo?.UserType,
  //     };
  //     dispatch(getLicenseList(licenseRequestPayload));
  //   }, []);
  return (
    <>
      <div className="form-group">
        <label htmlFor="lable-title" className="St-lable mb-2">
          {lableTitle}
        </label>
        <div
          className={`form-control ${
            cssstyle === "taskhistory" ? "taskhistory" : "select-container"
          }`}
          id="lable-title"
          onClick={(e) => {
            setIsOpen(!isOpen);
          }}
        >
          <span
            className={
              sagaState.AddIndustryReducer.industryApplicableIn.length !== 0
                ? "select-title-active"
                : "select-title"
            }
          >
            {sagaState.AddIndustryReducer.industryApplicableIn.length !== 0
              ? `${sagaState.AddIndustryReducer.industryApplicableIn} selected`
              : `select ${inputTitle}`}
          </span>
          {/* <span className="select-title-active">{sagaState.AddIndustryReducer.industryApplicableIn}</span> */}
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
              return (
                <div
                  className="dropdown-item d-flex"
                  onClick={() => {
                    setIsOpen(false);
                    setSelec(option);
                    dispatch(setIndustryApplicableIN(option))
                  }}
                >
                  <span className="dropdown-item__title">{option}</span>
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
