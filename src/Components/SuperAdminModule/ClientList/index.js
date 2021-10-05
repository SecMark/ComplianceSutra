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
      <div className="mt-4">
        <table className="table">
          <thead>
            <tr>
              <th>CLIENT'S NAME </th>
              <th>STATUS</th>
              <th>NO OF LICENSES</th>
              <th>HEAD OFFICE</th>
              <th>BILLING AMOUNT & DATE </th>
              <th>PROJECTED REVENUE</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((user, index) => (
              <>
                <tr key={index}>
                  <td>
                    <span>BK SECURITIES </span>
                  </td>
                  <td>
                    <span>Mark</span>
                  </td>
                  <td>
                    <span>Otto</span>
                  </td>
                  <td>
                    <span>@mdo </span>
                  </td>
                  <td>
                    <spna>Otto</spna>
                  </td>
                  <td>
                    <span>@mdo</span>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Clients;
