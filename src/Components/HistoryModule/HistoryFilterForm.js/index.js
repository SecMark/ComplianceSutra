import React, { useState, useReducer, useEffect } from "react";
import Datepicker from "../../../CommonModules/sharedComponents/Datepicker";
import reducer from "./reducer";
import diffInDate from "../../../CommonModules/sharedComponents/Datepicker/utils";
import MultiSelectDropdown from "../../../CommonModules/sharedComponents/Dropdown/index";
import "./style.css";
import { actions as adminMenuActions } from "../../../CommonModules/SideBar/Redux/actions";
import { useDispatch } from "react-redux";
import { setFilter } from "../redux/actions";
import { useHistory, withRouter } from "react-router";

const HistoryFilterForm = (props) => {
  const initialState = {
    from: [],
    to: [],
    companies: [
      { name: "Google", id: 1, selected: false },
      { name: "Facebook", id: 2, selected: false },
      { name: "Walmart", id: 3, selected: false },
      { name: "Amazon", id: 4, selected: false },
    ],
    licenses: [
      { name: "BSE", id: 1, selected: false },
      { name: "NEFT", id: 2, selected: false },
      { name: "BDE", id: 3, selected: false },
      { name: "NSE", id: 4, selected: false },
    ],
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();
  const filterDispatch = useDispatch();
  const activeDispatch = useDispatch();

  const setFilterAndNavigateToHistoryList = () => {
    const filterPayload = {
      from: "123",
      to: "123",
      selectedCompany: "123",
      selectedLicenses: "123",
    };
    filterDispatch(setFilter(filterPayload));
    activeDispatch(adminMenuActions.setCurrentMenu("complianceHistoryList"));

    history.push("/compliance-history-list");
  };

  const [timeDiff, setTimeDiff] = useState(0);
  useEffect(() => {
    setTimeDiff(diffInDate(state.from, state.to));
  }, [state]);

  return (
    <>
      <div style={{ marginTop: "20px" }}>
        <label htmlFor="from" className="mb-2">
          From:
        </label>
        <Datepicker
          name="from"
          dispatch={dispatch}
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

        <Datepicker name="to" dispatch={dispatch} actionType="SELECT_TO_DATE" />
      </div>
      <MultiSelectDropdown
        options={state.companies}
        lableTitle="Company"
        inputTitle="Select Company"
        dispatchType="SELECT_COMPANY_TOGGLE"
        dispatch={dispatch}
      />
      <MultiSelectDropdown
        options={state.licenses}
        lableTitle="License"
        inputTitle="Select License"
        dispatchType="SELECT_LICENSE_TOGGLE"
        dispatch={dispatch}
      />
      <button
        onClick={setFilterAndNavigateToHistoryList}
        className="filter-button"
      >
        View History
      </button>
    </>
  );
};

export default withRouter(HistoryFilterForm);
