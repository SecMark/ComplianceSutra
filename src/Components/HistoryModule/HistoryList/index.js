import React, { useEffect, useReducer, useState } from "react";
import LeftSideBar from "../../../CommonModules/SideBar/LeftSideBar";
import filter from "../../../assets/Icons/Filters.png";
import download from "../../../assets/Icons/download.png";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import constant from "../../../CommonModules/sharedComponents/constants/constant";
import moment from "moment";
import { clearState, getHistoryList } from "../redux/actions";

const HistoryList = (props) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      state.HistoryReducer.numberOfSelectedCompanies !== 0 &&
      state.HistoryReducer.numberOfSelectedLicense !== 0 &&
      state.HistoryReducer.from !== "" &&
      state.HistoryReducer.to !== ""
    ) {
      const historyListPayload = {
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
          moment(state.HistoryReducer.from.join("-"), "DD-M-YYYY").format(
            "YYYY-MM-DD"
          ),
        endDate:
          state.HistoryReducer.to &&
          moment(state.HistoryReducer.to.join("-"), "DD-M-YYYY").format(
            "YYYY-MM-DD"
          ),
      };
      dispatch(getHistoryList(historyListPayload));
      dispatch(clearState());
    }
  }, []);

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
                  <th className="tw-30" align="center">
                    Download
                  </th>
                </tr>
              </thead>
              <tbody>
                {state.HistoryReducer.historyList.length !== 0 ? (
                  state.HistoryReducer.historyList.map((list) => (
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
                      <td>
                        <img src={download} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>Compliance History not found</tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryList;
