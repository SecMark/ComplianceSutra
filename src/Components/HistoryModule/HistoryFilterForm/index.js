import React, { useState, useEffect } from "react";
import Datepicker from "../../../CommonModules/sharedComponents/Datepicker";
import {
  differenceInDate,
  isSameOrAfterToday,
} from "../../../CommonModules/sharedComponents/Datepicker/utils";
import { actions as adminMenuActions } from "../../../CommonModules/SideBar/Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { clearLincenseList, getHistoryList } from "../redux/actions";
import { useHistory, withRouter } from "react-router";
import constant from "../../../CommonModules/sharedComponents/constants/constant";
import MultiSelectLicenseDropdown from "../../../CommonModules/sharedComponents/Dropdown/LicenseDropDown";
import MultiSelectCompanyDropdown from "../../../CommonModules/sharedComponents/Dropdown/CompanyDropDown";
import "./style.css";

const HistoryFilterForm = (props) => {
  const [differenceInDays, setDifferenceInDays] = useState(0);
  const [isAllInputFilled, setIsAllInputFilled] = useState(false);
  const [priorDate, setPriorDate] = useState("");

  const state = useSelector((state) => state);
  const history = useHistory();
  const actionDispatch = useDispatch();

  useEffect(() => {
    if (state.HistoryReducer.companyList.length !== 0) {
      const priorDates = state.HistoryReducer.companyList.map((item) =>
        moment(item.EndDate).format("YYYY-MM-DD")
      );
      const priorDate = priorDates.reduce((prev, curr) => {
        if (moment(prev).isAfter(curr)) {
          return curr;
        }
        return prev;
      });
      setPriorDate(priorDate);
    }
  }, [state.HistoryReducer.companyList]);

  useEffect(() => {
    setDifferenceInDays(
      differenceInDate(state.HistoryReducer.from, state.HistoryReducer.to)
    );
  }, [state.HistoryReducer.from, state.HistoryReducer.to]);

  useEffect(() => {
    if (
      state.HistoryReducer.from.length !== 1 &&
      isSameOrAfterToday(state.HistoryReducer?.from) &&
      state.HistoryReducer.to.length !== 1 &&
      isSameOrAfterToday(state.HistoryReducer?.to) &&
      differenceInDays <= 365 &&
      priorDate !== "" &&
      moment(
        moment(state.HistoryReducer?.from.join("-"), "DD-MM-YYYY").format(
          "YYYY-MM-DD"
        )
      ).isSameOrAfter(priorDate) &&
      moment(
        moment(state.HistoryReducer?.from.join("-"), "DD-MM-YYYY").format(
          "YYYY-MM-DD"
        )
      ).isSameOrBefore(
        moment(state.HistoryReducer?.to.join("-"), "DD-MM-YYYY").format(
          "YYYY-MM-DD"
        )
      )
    ) {
      if (
        state.HistoryReducer.numberOfSelectedCompanies !== 0 &&
        state.HistoryReducer.numberOfSelectedLicense !== 0
      ) {
        setIsAllInputFilled(true);
      } else {
        setIsAllInputFilled(true);
      }
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
    let historyListPayload = {};
    if (
      state.HistoryReducer.from.length !== 1 &&
      state.HistoryReducer.to.length !== 1
    ) {
      historyListPayload = {
        entityid: constant.historyEntityId,
        userID: state.auth.loginInfo?.UserID,
        usertype: state.auth.loginInfo?.UserType,
        startDate:
          state.HistoryReducer.from &&
          moment(state.HistoryReducer.from.join("-"), "DD-M-YYYY").format(
            "YYYY-MM-DD"
          ),
        endDate:
          state.HistoryReducer.to &&
          moment(state.HistoryReducer?.to.join("-"), "DD-M-YYYY").format(
            "YYYY-MM-DD"
          ),
      };
    }
    if (
      state.HistoryReducer.numberOfSelectedCompanies !== 0 &&
      state.HistoryReducer.numberOfSelectedLicense !== 0 &&
      state.HistoryReducer.from.length !== 1 &&
      state.HistoryReducer.to.length !== 1
    ) {
      historyListPayload = {
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
          moment(state.HistoryReducer?.from.join("-"), "DD-M-YYYY").format(
            "YYYY-MM-DD"
          ),
        endDate:
          state.HistoryReducer.to &&
          moment(state.HistoryReducer?.to.join("-"), "DD-M-YYYY").format(
            "YYYY-MM-DD"
          ),
      };
    }
    actionDispatch(adminMenuActions.setCurrentMenu("history"));
    actionDispatch(getHistoryList(historyListPayload));
    props.setIsShowFilter(!props.isShowFilter);
  };
  return (
    <>
      <div className="spacing">
        <label htmlFor="from" className="mb-2">
          From:
        </label>
        <Datepicker
          value={state.HistoryReducer.from}
          name="from"
          dispatch={actionDispatch}
          actionType="SELECT_FROM_DATE"
          pageName="historyCompliance"
        />
        <p style={{ color: "red", fontSize: "0.8rem" }}>
          {priorDate !== "" &&
            state.HistoryReducer?.from !== "" &&
            state.HistoryReducer?.from.length !== 1 &&
            moment(
              moment(state.HistoryReducer?.from.join("-"), "DD-MM-YYYY").format(
                "YYYY-MM-DD"
              )
            ).isBefore(priorDate) && (
              <small>
                {"* " +
                  constant.errorMessage.errorDueToPriorDate +
                  " " +
                  moment(priorDate, "YYYY-MM-DD").format("D MMMM Y")}
              </small>
            )}
        </p>
      </div>

      <div className="spacing">
        <label htmlFor="to" className="mb-2">
          To:{" "}
        </label>
        <Datepicker
          value={state.HistoryReducer.to}
          name="to"
          dispatch={actionDispatch}
          actionType="SELECT_TO_DATE"
          pageName="historyCompliance"
        />
        <p className="warning">
          {differenceInDays > 365 && (
            <>
              <small>{"* " + constant.errorMessage.errorDueToRange}</small>
              <br />
            </>
          )}
          {state.HistoryReducer?.to.length !== 1 &&
            isSameOrAfterToday(state.HistoryReducer?.to) !== undefined &&
            !isSameOrAfterToday(state.HistoryReducer?.to) && (
              <>
                <small>
                  {"* " + constant.errorMessage.errorDueToGreaterDate}
                </small>
                <br />
              </>
            )}
          {state.HistoryReducer.from.length !== 1 &&
            state.HistoryReducer.to.length !== 1 &&
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
                    state.HistoryReducer?.from.join("-"),
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
      {isAllInputFilled &&
      differenceInDays <= 365 &&
      moment(
        moment(state.HistoryReducer?.from.join("-"), "DD-MM-YYYY").format(
          "YYYY-MM-DD"
        )
      ).isSameOrBefore(
        moment(state.HistoryReducer?.to.join("-"), "DD-MM-YYYY").format(
          "YYYY-MM-DD"
        )
      ) ? (
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
