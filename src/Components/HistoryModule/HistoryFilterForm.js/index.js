import React, { useState, useReducer, useEffect } from "react";
import Datepicker from "../../../CommonModules/sharedComponents/Datepicker";
import reducer from "./reducer";
import diffInDate from "../../../CommonModules/sharedComponents/Datepicker/utils";
import { actions as adminMenuActions } from "../../../CommonModules/SideBar/Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  getCompanyList,
  getLicenseList,
  setLicenseList,
} from "../redux/actions";
import { useHistory, withRouter } from "react-router";
import constant from "../../../CommonModules/sharedComponents/constants/constant";

import "./style.css";
import MultiSelectLicenseDropdown from "../../../CommonModules/sharedComponents/Dropdown/LicenseDropDown";
import MultiSelectCompanyDropdown from "../../../CommonModules/sharedComponents/Dropdown/CompanyDropDown";

const HistoryFilterForm = (props) => {
  const [timeDiff, setTimeDiff] = useState(0);
  const [isAllInputFilled, setIsAllInputFilled] = useState(false);

  const sagaState = useSelector((state) => state);
  const history = useHistory();
  const actionDispatch = useDispatch();

  useEffect(() => {
    const companyRequestPayload = {
      userID: sagaState.auth.loginInfo?.UserID,
      entityid: constant.companyEntityId,
      usertype: sagaState.auth.loginInfo?.UserType,
    };
    actionDispatch(getCompanyList(companyRequestPayload));
  }, [sagaState.auth.loginInfo?.UserID]);

  useEffect(() => {
    setTimeDiff(
      diffInDate(sagaState.HistoryReducer.from, sagaState.HistoryReducer.to)
    );
  }, [sagaState.HistoryReducer]);

  useEffect(() => {
    if (
      sagaState.HistoryReducer.numberOfSelectedCompanies !== 0 &&
      sagaState.HistoryReducer.numberOfSelectedLicense !== 0 &&
      sagaState.HistoryReducer.from !== "" &&
      sagaState.HistoryReducer.to !== ""
    ) {
      setIsAllInputFilled(true);
    } else {
      setIsAllInputFilled(false);
    }
  }, [sagaState.HistoryReducer]);

  const setFilterAndNavigateToHistoryList = () => {
    actionDispatch(adminMenuActions.setCurrentMenu("complianceHistoryList"));
    history.push("/compliance-history-list");
  };

  return (
    <>
      <div style={{ marginTop: "20px" }}>
        <label htmlFor="from" className="mb-2">
          From:
        </label>
        <Datepicker
          name="from"
          dispatch={actionDispatch}
          actionType="SELECT_FROM_DATE"
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        <label htmlFor="to" className="mb-2">
          To:{" "}
          {timeDiff > 365 && (
            <span style={{ color: "red" }}>
              You can't choose more than 1 year!
            </span>
          )}
        </label>

        <Datepicker
          name="to"
          dispatch={actionDispatch}
          actionType="SELECT_TO_DATE"
        />
      </div>
      <MultiSelectCompanyDropdown
        options={sagaState.HistoryReducer.companyList}
        lableTitle="Company"
        inputTitle="Select Company"
        dispatch={actionDispatch}
      />
      <MultiSelectLicenseDropdown
        options={sagaState.HistoryReducer.licenseList}
        lableTitle="License"
        inputTitle="Select License"
        dispatch={actionDispatch}
      />
      {isAllInputFilled ? (
        <button
          onClick={setFilterAndNavigateToHistoryList}
          className="filter-button-active"
        >
          View History
        </button>
      ) : (
        <button className="filter-button">View History</button>
      )}
    </>
  );
};

export default withRouter(HistoryFilterForm);
