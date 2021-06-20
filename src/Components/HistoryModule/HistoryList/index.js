import React, { useReducer, useState } from "react";
import LeftSideBar from "../../../CommonModules/SideBar/LeftSideBar";
import filter from "../../../assets/Icons/Filters.png";
import download from "../../../assets/Icons/download.png";
import "./style.css";
import { useSelector } from "react-redux";

const HistoryList = (props) => {
  const state = useSelector((state) => state);
  console.log("state", state);
  return (
    <div className="history-side-bar">
      <LeftSideBar />
      <div className="history-container">
        <div className="row">
          <h2 className="main-title">
            Compliance History <img src={filter} className="history-filter" />
          </h2>
          <div className="scroll-personal-grid d-md-block d-sm-block table-responsive mt-4">
            <table className="table co-company-details-tbl table_legenda">
              <thead>
                <tr>
                  <th className="tw-20" clscope="col">
                    Complete on
                  </th>
                  <th className="tw-30" scope="col">
                    Task Name
                  </th>
                  <th className="tw-20" scope="col">
                    Company
                  </th>
                  <th className="tw-30">Assigned To</th>
                  <th className="tw-30">Approver</th>
                  <th className="tw-30">Due Date</th>
                  <th className="tw-30">status</th>
                  <th className="tw-30">Download</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1 June 2021</td>
                  <td>Enchanment Supervisor</td>
                  <td>B&K solutions</td>
                  <td>
                    {" "}
                    <div className="holding-list-bold-title-background">
                      <span className="circle-dp">JM</span>{" "}
                      <div className="nameCirle">Jatin </div>
                    </div>
                  </td>
                  <td>
                    {" "}
                    <div className="holding-list-bold-title-background">
                      <span className="circle-dp">JM</span>{" "}
                      <div className="nameCirle">Jatin </div>
                    </div>
                  </td>
                  <td>4 june 2021</td>
                  <td>
                    <button className="delayed">Delayed</button>
                  </td>
                  <td>
                    <img src={download} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryList;
