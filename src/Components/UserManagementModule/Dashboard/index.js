import React, { useState } from "react";
import plusIcon3 from "../../../assets/Icons/plusIcon3.png";
import UserList from "../UserList";
import TaskList from "../TaskList";
import "./style.css";

const Dashboard = () => {
  const [sortBy, setSortBy] = useState("Alphabatically");
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="ER-main">
          <div className="ER-task-statics row">
            <h5 className="mt-2">
              <span className="ml-1">User Management</span>
              <div className="nav-title-progress"></div>
            </h5>
            <div className="ER-search-input mb-2">
              <input
                className="form-control ER-search"
                placeholder="Search by users"
              />
            </div>
          </div>
          <div className="row">
            {sortBy === "Roles" && (
              <div className="col mt-3">
                <div className="row">
                  <span className="mt-2 ml-2">Show:</span>
                  <select
                    className="form-select ml-2"
                    style={{ width: "200px", height: "40px", padding: "5px" }}
                  >
                    <option selected>All Results</option>
                  </select>
                </div>
              </div>
            )}
            <div className="col">
              <ul className="sort-by-filter">
                <span className="sort-by add-btn">
                  <img src={plusIcon3} alt="plus" />
                  ADD NEW USER
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
                    sortBy == "Roles"
                      ? "sort-filter-active"
                      : "sort-filter-inactive"
                  }
                  onClick={() => setSortBy("Roles")}
                >
                  Roles
                </span>
                <span
                  className={
                    sortBy == "Clients"
                      ? "sort-filter-active"
                      : "sort-filter-inactive"
                  }
                  onClick={() => setSortBy("Clients")}
                >
                  Clients
                </span>
                <span
                  className={
                    sortBy == "License"
                      ? "sort-filter-active"
                      : "sort-filter-inactive"
                  }
                  onClick={() => setSortBy("License")}
                >
                  License
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
              </ul>
            </div>
          </div>
          {sortBy === "Alphabatically" ? (
            <UserList />
          ) : sortBy === "Roles" ? (
            <TaskList />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
