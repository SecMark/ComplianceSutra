import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import check from "../../../assets/Icons/check.png";
import uncheck from "../../../assets/Icons/uncheck.png";
import {
  selectLicenseToggle,
  setLicenseList,
} from "../../../Components/HistoryModule/redux/actions";
import "./style.css";

function MultiSelectLicenseDropdown({ lableTitle, options, dispatch }) {
  const [isOpen, setIsOpen] = useState(false);
  const state = useSelector((state) => state);
  const actionDispatch = useDispatch();

  useEffect(() => {
    if (state.HistoryReducer.numberOfSelectedLicense === 0) {
      console.log('dsfasd')
      actionDispatch(setLicenseList([]));
    }
  }, [state.HistoryReducer.numberOfSelectedLicense]);

  return (
    <>
      <div className="form-group mt-3">
        <label htmlFor="lable-title" className="mb-2">
          {lableTitle}:
        </label>
        <div
          className="form-control select-container"
          id="lable-title"
          onClick={(e) => {
            setIsOpen(!isOpen);
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
        <div className="dropdown-container" onBlur={() => setIsOpen(true)}>
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
      </div>
    </>
  );
}

export default MultiSelectLicenseDropdown;
