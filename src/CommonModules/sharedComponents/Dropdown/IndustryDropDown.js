import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import check from "../../../assets/Icons/check.png";
import uncheck from "../../../assets/Icons/uncheck.png";
import {
  selectLicenseToggle,
  getLicenseList,
  getCompanyList,
} from "../../../Components/HistoryModule/redux/actions";
import "./style.css";

function MultiSelectIndustryDropdown({ lableTitle, options, dispatch,cssstyle }) {
  const [isOpen, setIsOpen] = useState(false);
  const state = useSelector((state) => state);

  return (
    <>
      <div className="form-group mt-3">
        <label htmlFor="lable-title" className="mb-2">
          {lableTitle}:
        </label>
        <div
          className={`form-control ${cssstyle === "taskhistory" ? "taskhistory":"select-container"}`}
          id="lable-title"
          onClick={(e) => {
            if (options.length === 0) {
              setIsOpen(false);
            } else {
              setIsOpen(!isOpen);
            }
          }}
        >
          <span
            className={
              state.HistoryReducer.numberOfSelectedLicense !== 0
                ? "select-title-active"
                : "select-title"
            }
          >
            {state.HistoryReducer.numberOfSelectedLicense !== 0
              ? `${state.HistoryReducer.numberOfSelectedLicense} selected`
              : "select license"}
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
        {options.length !== 0 && (
          <div className="dropdown-container" onBlur={() => setIsOpen(false)}>
            <div className={`dropdown ${isOpen && "dropdown--open"}`}>
              {options.map((option) => {
                const id = option.LicenseID;
                return (
                  <div
                    className="dropdown-item d-flex"
                    key={id}
                    onClick={() => {
                      dispatch(selectLicenseToggle(id));
                    }}
                  >
                    <span className="dropdown-item__title">
                      {option.LicenseCode}
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
        )}
      </div>
    </>
  );
}

export default MultiSelectIndustryDropdown;
