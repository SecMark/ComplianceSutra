import React, { useState, useReducer, useEffect } from "react";
import filter from "../../../assets/Icons/Filters.png";
import "./style.css";
import LeftSideBar from "../../../CommonModules/SideBar/LeftSideBar";
import HistoryFilterForm from "../HistoryFilterForm.js/index.js";
import { withRouter } from "react-router";
const HistoryFilter = (props) => {
  return (
    <>
      <div className="history-side-bar">
        <LeftSideBar />
        <div className="history-wrapper">
          <div className="history-container">
            <div className="row">
              <div className="col-md-5">
                <h2 className="main-title">
                  Compliance History <img src={filter} />
                </h2>

                <span className="SbPara">
                  Get your historical compliance task you have completed at one
                  place
                </span>
                <HistoryFilterForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(HistoryFilter);
