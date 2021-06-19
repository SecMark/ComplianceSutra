import React, { useState } from "react";
import check from "../../../assets/Icons/check.png";
import uncheck from "../../../assets/Icons/uncheck.png";
import LeftSideBar from "../../../CommonModules/SideBar/LeftSideBar";
import "./style.css";

const History = (props) => {
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
