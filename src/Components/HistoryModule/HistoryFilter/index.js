import React from "react";
import filter from "../../../assets/Icons/Filters.png";
import HistoryFilterForm from "../HistoryFilterForm/index.js";
import { withRouter } from "react-router";
import "./style.css";
const HistoryFilter = (props) => {
  return (
    <>
      <div className="history-container">
        <div className="row">
          <div className="col-md-5 p-0">
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
    </>
  );
};

export default withRouter(HistoryFilter);
