import React, { useState, useReducer, useEffect } from "react";
import Datepicker from "../../../CommonModules/sharedComponents/Datepicker";
import reducer from "./reducer";
import diffInDate from "../../../CommonModules/sharedComponents/Datepicker/utils";
import { actions as adminMenuActions } from "../../../CommonModules/SideBar/Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  clearLincenseList,
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

  const state = useSelector((state) => state);
  const history = useHistory();
  const actionDispatch = useDispatch();

  useEffect(() => {
    const companyRequestPayload = {
      userID: state.auth.loginInfo?.UserID,
      entityid: constant.companyEntityId,
      usertype: state.auth.loginInfo?.UserType,
    };
    actionDispatch(getCompanyList(companyRequestPayload));
  }, [state.auth.loginInfo?.UserID]);

  useEffect(() => {
    setTimeDiff(
      diffInDate(state.HistoryReducer.from, state.HistoryReducer.to)
    );
  }, [state.HistoryReducer]);

  useEffect(() => {
    if (
      state.HistoryReducer.numberOfSelectedCompanies !== 0 &&
      state.HistoryReducer.numberOfSelectedLicense !== 0 &&
      state.HistoryReducer.from !== "" &&
      state.HistoryReducer.to !== ""
    ) {
      setIsAllInputFilled(true);
    } else {
      setIsAllInputFilled(false);
    }
  }, [state.HistoryReducer]);

  useEffect(() => {
    if (state.HistoryReducer.numberOfSelectedCompanies === 0) {
      actionDispatch(clearLincenseList());
    }
  }, [state.HistoryReducer.numberOfSelectedCompanies]);

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
        options={state.HistoryReducer.companyList}
        lableTitle="Company"
        inputTitle="Select Company"
        dispatch={actionDispatch}
      />
      <MultiSelectLicenseDropdown
        options={state.HistoryReducer.licenseList}
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
