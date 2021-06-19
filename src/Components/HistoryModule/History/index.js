import React, { useState, useReducer } from "react";
import reducer from "./reducer";
import LeftSideBar from "../../../CommonModules/SideBar/LeftSideBar";
import MultiSelectDropdown from "../../../CommonModules/sharedComponents/Dropdown/index";
import "./style.css";

const initialState = {
  from: "",
  to: "",
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
const History = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="history-side-bar">
      <LeftSideBar />
      <div className="history-container">
        <div className="row">
          <div className="col-md-5">
            <p className="main-title">Compliance History</p>
            <span>
              Get your historical compliance task you have completed at one
              place
            </span>
            <div className="form-group">
              <label htmlFor="from">From:</label>
              <input type="text" className="form-control" />
            </div>

            <div className="form-group">
              <label htmlFor="to">To:</label>
              <input type="text" className="form-control" />
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
