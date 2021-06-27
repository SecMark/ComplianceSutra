import React, { useState, useEffect } from "react";
import Datepicker from "../../../CommonModules/sharedComponents/Datepicker";
import {
  differenceInDate,
  isSameOrAfterToday,
} from "../../../CommonModules/sharedComponents/Datepicker/utils";
import { actions as adminMenuActions } from "../../../CommonModules/SideBar/Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  clearLincenseList,
  clearState,
  getCompanyList,
  getHistoryList,
} from "../redux/actions";
import { useHistory, withRouter } from "react-router";
import constant from "../../../CommonModules/sharedComponents/constants/constant";
import MultiSelectLicenseDropdown from "../../../CommonModules/sharedComponents/Dropdown/LicenseDropDown";
import MultiSelectCompanyDropdown from "../../../CommonModules/sharedComponents/Dropdown/CompanyDropDown";
import "./style.css";

const HistoryFilterForm = (props) => {
  const [differenceInDays, setDifferenceInDays] = useState(0);
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
    actionDispatch(clearState());
    actionDispatch(getCompanyList(companyRequestPayload));
  }, [state.auth.loginInfo?.UserID]);

  useEffect(() => {
    setDifferenceInDays(
      differenceInDate(state.HistoryReducer.from, state.HistoryReducer.to)
    );
  }, [state.HistoryReducer.from, state.HistoryReducer.to]);

  useEffect(() => {
    if (
      state.HistoryReducer.numberOfSelectedCompanies !== 0 &&
      state.HistoryReducer.numberOfSelectedLicense !== 0 &&
      state.HistoryReducer.from !== "" &&
      isSameOrAfterToday(state.HistoryReducer.from) &&
      state.HistoryReducer.to !== "" &&
      isSameOrAfterToday(state.HistoryReducer.to) &&
      differenceInDays <= 365
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
    if (
      state.HistoryReducer.numberOfSelectedCompanies !== 0 &&
      state.HistoryReducer.numberOfSelectedLicense !== 0 &&
      state.HistoryReducer.from !== "" &&
      state.HistoryReducer.to !== ""
    ) {
      const historyListPayload = {
        entityid: constant.historyEntityId,
        userID: state.auth.loginInfo?.UserID,
        usertype: state.auth.loginInfo?.UserType,

        entityList: state.HistoryReducer.companyList
          .filter((company) => company.selected === true)
          .map((company) => company.EntityGroupID)
          .join(","),

        licList: state.HistoryReducer.licenseList
          .filter((list) => list.selected === true)
          .map((list) => list.LicenseCode)
          .join(","),

        startDate:
          state.HistoryReducer.from &&
          moment(state.HistoryReducer.from.join("-"), "DD-M-YYYY").format(
            "YYYY-MM-DD"
          ),
        endDate:
          state.HistoryReducer.to &&
          moment(state.HistoryReducer.to.join("-"), "DD-M-YYYY").format(
            "YYYY-MM-DD"
          ),
      };
      actionDispatch(adminMenuActions.setCurrentMenu("complianceHistoryList"));
      actionDispatch(getHistoryList(historyListPayload));
      history.push("/compliance-history-list");
    }
  };
  return (
    <>
      <div className="spacing">
        <label htmlFor="from" className="mb-2">
          From:
        </label>
        <Datepicker
          name="from"
          dispatch={actionDispatch}
          actionType="SELECT_FROM_DATE"
        />
        {isSameOrAfterToday(state.HistoryReducer.from) !== undefined &&
          !isSameOrAfterToday(state.HistoryReducer.from) && (
            <p style={{ color: "red", fontSize: "0.8rem" }}>
              * <small>{constant.errorMessage.errorDueToGreaterDate}</small>
            </p>
          )}
      </div>

      <div className="spacing">
        <label htmlFor="to" className="mb-2">
          To:{" "}
        </label>
        <Datepicker
          name="to"
          dispatch={actionDispatch}
          actionType="SELECT_TO_DATE"
        />
        <p className="warning">
          {differenceInDays > 365 && (
            <>
              <small>{"* " + constant.errorMessage.errorDueToRange}</small>
              <br />
            </>
          )}
          {isSameOrAfterToday(state.HistoryReducer.to) !== undefined &&
            !isSameOrAfterToday(state.HistoryReducer.to) && (
              <>
                <small>
                  {"* " + constant.errorMessage.errorDueToGreaterDate}
                </small>
                <br />
              </>
            )}
          {state.HistoryReducer.from.length !== 0 &&
            state.HistoryReducer.to.length !== 0 &&
            moment(
              state.HistoryReducer.from[2] +
                "-" +
                state.HistoryReducer.from[1] +
                "-" +
                state.HistoryReducer.from[0] +
                "-"
            ).isAfter(
              state.HistoryReducer.to[2] +
                "-" +
                state.HistoryReducer.to[1] +
                "-" +
                state.HistoryReducer.to[0] +
                "-"
            ) && (
              <small>
                {"* " +
                  constant.errorMessage.errorDueToReverseDate +
                  moment(
                    state.HistoryReducer.from.join("-"),
                    "DD-MM-YYYY"
                  ).format("DD-MM-YYYY") +
                  "."}
              </small>
            )}
        </p>
        {}
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
      {isAllInputFilled && differenceInDays < 365 ? (
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
