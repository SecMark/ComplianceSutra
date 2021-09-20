import React, { useState } from "react";
import { AiFillInfoCircle, AiFillCheckCircle } from "react-icons/ai";
import plusIcon3 from "../../../assets/Icons/plusIcon3.png";
import downArrow from "../../../assets/Icons/downArrow.png";
import "./style.css";

const Clients = () => {
  const [sortBy, setSortBy] = useState("Alphabatically");
  return (
    <>
      <div className="row">
        <div className="col">
          <ul className="sort-by-filter">
            <span className="sort-by add-btn">
              <img src={plusIcon3} alt="plus" />
              Add New Client
            </span>
            <span className="sort-by">Sort by</span>
            <span
              className={
                sortBy == "Alphabatically"
                  ? "sort-filter-active"
                  : "sort-filter-inactive"
              }
              onClick={() => setSortBy("Alphabatically")}
            >
              Alphabatically
            </span>
            <span
              className={
                sortBy == "Billing Cycle"
                  ? "sort-filter-active"
                  : "sort-filter-inactive"
              }
              onClick={() => setSortBy("Billing Cycle")}
            >
              Billing Cycle
            </span>
            <span
              className={
                sortBy == "Status"
                  ? "sort-filter-active"
                  : "sort-filter-inactive"
              }
              onClick={() => setSortBy("Status")}
            >
              Status
            </span>
            <span
              className={
                sortBy == "Expert Review"
                  ? "sort-filter-active"
                  : "sort-filter-inactive"
              }
              onClick={() => setSortBy("Expert Review")}
            >
              Expert Review
            </span>
          </ul>
        </div>
      </div>
      <div className="ER-task-container mt-0">
        <div className="ER-take-action">
          <div className="task-list-grid">
            <table className="table">
              <thead>
                <tr>
                  <th>CLIENT'S NAME</th>
                  <th>STATUS</th>
                  <th>NO OF LICENSES</th>
                  <th>HEAD OFFICE</th>
                  <th>BILLING AMOUNT & DATE</th>
                  <th>PROJECTED REVENUE</th>
                </tr>
              </thead>
              {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((item, index) => {
                return (
                  <tbody key={index}>
                    <tr>
                      <th>BK Securities</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                  </tbody>
                  // <div className="ER-task-detail" key={index}>
                  //   <button className="code">Good and Service Tax</button>
                  //   <div>
                  //     <div className="overdue-company">
                  //       <p className="company-name">Good and Service tax</p>
                  //     </div>
                  //   </div>
                  //   <div className="detail-name align-left-always">
                  //     <p>
                  //       <span className="circle-dp"></span>
                  //       <span className="user-name">
                  //         Kedia Financial Securities
                  //       </span>
                  //     </p>
                  //   </div>
                  //   <span className="overdue-date">21 May</span>
                  //   <span>{">"}</span>
                  // </div>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Clients;
