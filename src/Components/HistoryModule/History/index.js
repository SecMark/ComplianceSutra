import React, { useState } from "react";
import check from "../../../assets/Icons/check.png";
import filter from "../../../assets/Icons/Filters.png";
import LeftSideBar from "../../../CommonModules/SideBar/LeftSideBar";
import Datepicker from "../../../CommonModules/sharedComponents/Datepicker";
import "./style.css";

const History = (props) => {
  return (
    <div className="history-side-bar">
      <LeftSideBar />
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
            <div style={{ marginTop: "20px" }}>
              <label htmlFor="from" className="mb-2">
                From:
              </label>
              <Datepicker name="from" />
            </div>

            <div style={{ marginTop: "20px" }}>
              <label htmlFor="to" className="mb-2">
                To:
              </label>
              <Datepicker name="to" />
            </div>

            <div className="form-group"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
