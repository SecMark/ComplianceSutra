import React, { useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import RightArrow from "../../../../assets/Icons/keyboardArrowRightBlack.png";

function TaskHistoryResult() {
  const state = useSelector((state) => state); // state
  const dispatch = useDispatch(); // dispatch

  return (
    <div className="th-result">
      <div>
        <h1 className="result-title">
          Showing {state.HistoryReducer.historyList.length} results:
        </h1>
      </div>
      <div className="row mt-3">
        <table className="table table-borderless">
          <thead className="bottom-line">
            <th scope="col">COMPLETION DATE</th>
            <th scope="col">TASK NAME</th>
            <th scope="col">COMPANY</th>
            <th scope="col">REVIEW STATUS</th>
          </thead>
          <tbody className="tablebody">
            {state.HistoryReducer.historyList.map((list) => (
              <tr>
                <td className="th-date">
                  {moment(list.Completed).format("DD MMMM YYYY")}
                </td>
                <td className="th-taskname">{list.TaskName}</td>
                <td className="th-company">{list.EntityName}</td>
                <td>
                  <button
                    className={
                      list.Status === "PENDING"
                        ? "pending"
                        : list.Status === "ON TIME"
                        ? "on-time"
                        : "delayed"
                    }
                  >
                    {list.Status}
                  </button>
                  <img
                    className="rightarrow"
                    src={RightArrow}
                    alt="rightarrow"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskHistoryResult;
