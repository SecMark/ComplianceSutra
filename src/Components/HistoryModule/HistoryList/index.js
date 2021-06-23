import React, { useEffect, useReducer, useState } from "react";
import LeftSideBar from "../../../CommonModules/SideBar/LeftSideBar";
import closeIcon from "../../../assets/Icons/closeIcon.png";
import HistoryFilterForm from "../HistoryFilterForm.js";
import filter from "../../../assets/Icons/Filters.png";
import download from "../../../assets/Icons/download.png";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import constant from "../../../CommonModules/sharedComponents/constants/constant";
import moment from "moment";
import { clearState, getHistoryList, setSuccess } from "../redux/actions";
import { withRouter } from "react-router";

const HistoryList = (props) => {
  const [isShowFilter, setIsShowFilter] = useState(false);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsShowFilter(false);
    dispatch(setSuccess(false));
  },[state.HistoryReducer.isSuccess])

  const getNameInitials = (name) => {
    if (name != undefined) {
      let initials = "";
      initials = name
        .split(" ")
        .map((n) => n[0])
        .join("");
      return initials.toUpperCase();
    }
  };

  return (
    <div className="history-side-bar">
      <div
        className={`filter-popup ${isShowFilter && "popup-open"}`}
        style={{
          boxShadow: isShowFilter
            ? "1px 1px 9999px 9999px rgba(0,0,0,0.7)"
            : "none",
        }}
      >
        <div className="container" style={{ width: "300px" }}>
          <div className="popup-header d-flex align-items-center my-5">
            <img
              src={closeIcon}
              alt="close-icon"
              onClick={() => {
                dispatch(clearState())
                setIsShowFilter(!isShowFilter)
              }}
              style={{
                marginRight: "2rem",
                cursor: "pointer",
              }}
            />
            <h3 style={{ marginBottom: "0px" }}>Filters</h3>
          </div>
          <HistoryFilterForm />
        </div>
      </div>

      <LeftSideBar />
      <div className="history-container">
        <div className="row">
          <div className="history-header">
            <h2 className="main-title">
              Compliance History <img src={filter} className="history-filter" />
            </h2>
            <button
              className="filter-toggle"
              onClick={() => setIsShowFilter(!isShowFilter)}
            >
              Filter
            </button>
          </div>
          <div className="scroll-personal-grid d-md-block d-sm-block table-responsive mt-4">
          {state.HistoryReducer.historyList.length !== 0 ? (
            <table className="table co-company-details-tbl table_legenda">
              <thead>
                <tr>
                  <th clscope="col">
                    Complete on
                  </th>
                  <th scope="col">
                    Task Name
                  </th>
                  <th scope="col">
                    Company
                  </th>
                  <th>Assigned To</th>
                  <th>Approver</th>
                  <th>Due Date</th>
                  <th>status</th>
                  <th>
                    Download
                  </th>
                </tr>
              </thead>
              <tbody>
                {state.HistoryReducer.historyList.map((list) => (
                    <tr>
                      <td className="task-detail">
                        {moment(list.Completed).format("DD MMMM YYYY")}
                      </td>
                      <td className="task-name">{list.TaskName}</td>
                      <td className="task-detail">{list.EntityName}</td>
                      <td>
                        {" "}
                        <div className="holding-list-bold-title-background">
                          <span className="circle-dp">
                            {getNameInitials(list.AprovalAssignedTo)}
                          </span>{" "}
                          <div className="nameCirle">
                            {list.AprovalAssignedTo}{" "}
                          </div>
                        </div>
                      </td>
                      <td>
                        {" "}
                        <div className="holding-list-bold-title-background">
                          <span className="circle-dp">
                            {getNameInitials(list.AssignedTo)}
                          </span>{" "}
                          <div className="nameCirle"> {list.AssignedTo} </div>
                        </div>
                      </td>
                      <td className="task-detail">
                        {moment(list.EndDate).format("DD MMMM YYYY")}
                      </td>
                      <td>
                        <button
                          className={
                            list.Status === "Pending"
                              ? list.Status === "Delayed"
                                ? "delayed"
                                : "on-time"
                              : "pending"
                          }
                        >
                          {list.Status}
                        </button>
                      </td>
                      <td align="left">
                        <img src={download} />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            ) : (
              <div className="no-data">
              <p>Compliance History not found! Select filter.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default withRouter(HistoryList);
