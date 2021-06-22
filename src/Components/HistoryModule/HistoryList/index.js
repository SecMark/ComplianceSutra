import React, { useEffect, useReducer, useState } from "react";
import LeftSideBar from "../../../CommonModules/SideBar/LeftSideBar";
import closeIcon from "../../../assets/Icons/closeIcon.png";
import HistoryFilterFormJs from "../HistoryFilterForm.js";
import filter from "../../../assets/Icons/Filters.png";
import download from "../../../assets/Icons/download.png";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import constant from "../../../CommonModules/sharedComponents/constants/constant";
import moment from "moment";
import { clearState, getHistoryList } from "../redux/actions";

const HistoryList = (props) => {
  const [isShowFilter, setIsShowFilter] = useState(false);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
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
  }, []);

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
              onClick={() => setIsShowFilter(!isShowFilter)}
              style={{
                marginRight: "2rem",
                cursor: "pointer",
              }}
            />
            <h3 style={{ marginBottom: "0px" }}>Filters</h3>
          </div>
          <HistoryFilterFormJs />
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
                      <td className="task-detail">
                        {moment(list.EndDate).format("DD MMMM YYYY")}
                      </td>
                      <td>
                        <button className="on-time">On Time</button>
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
