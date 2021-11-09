import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import check from "../../../assets/Icons/check.png";
import uncheck from "../../../assets/Icons/uncheck.png";
import {
  getLicenseList,
  selectCompanyToggle,
  setLicenseList,
} from "../../../Components/HistoryModule/redux/actions";
import constant from "../constants/constant";
import "./style.css";

function MultiSelectCompanyDropdown({
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
  const [isOpen, setIsOpen] = useState(false);
  const sagaState = useSelector((state) => state);

  useEffect(() => {
    const licenseRequestPayload = {
      userID: sagaState.auth.loginInfo?.UserID,
      entityid: constant.licenseEntityId,
      usertype: sagaState.auth.loginInfo?.UserType,
    };
    dispatch(getLicenseList(licenseRequestPayload));
  }, []);

  return (
    <>
      <div className="form-group mt-3">
        <label htmlFor="lable-title" className="mb-2">
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
              sagaState.HistoryReducer.numberOfSelectedCompanies !== 0
                ? "select-title-active"
                : "select-title"
            }
          >
            {sagaState.HistoryReducer.numberOfSelectedCompanies !== 0
              ? `${sagaState.HistoryReducer.numberOfSelectedCompanies} selected`
              : "select company"}
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
          <div className={`dropdown-multi ${isOpen && "dropdown--open"}`}>
            {options.map((option) => {
              return (
                <div
                  onClick={() => {
                    dispatch(selectCompanyToggle(option.id));

                    setTimeout(() => {
                      const choosedCompanies =
                        sagaState.HistoryReducer.companyList.filter(
                          (list) => list.selected === true
                        );
                      const selectedCompanies = choosedCompanies
                        .map((list) => list.company_docname)
                        .join(",");

                      if (selectedCompanies) {
                        const array = [];
                        choosedCompanies.map((item) => {
                          array.push(...item.license);
                        });
                        dispatch(getLicenseList(array));
                      }
                    }, 1000);
                  }}
                >
                  <span className="dropdown-item__title">
                    {option.company_name}
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

export default MultiSelectCompanyDropdown;
