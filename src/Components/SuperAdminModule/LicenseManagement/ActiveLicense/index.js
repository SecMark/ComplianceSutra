import React, { useState } from "react";
import UserList from "../../UserManagement/components/UserList";
import UserRoleList from "../../UserManagement/components/UserRoleList";
import { AiOutlinePlus } from "react-icons/ai";
import "./style.css";

const ActiveLicense = (props) => {
  const [openRightTab, setOpenRightTab] = useState(true);
  const [sortBy, setSortBy] = useState("Addtional Date");

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="ER-main">
          <div className="row">
            <h4 className="mt-2">
              <span className="ml-1">License Management</span>
            </h4>
            <div className="ER-search-input mb-2">
              <input
                className="form-control ER-search"
                placeholder="Search by users"
              />
            </div>
          </div>

          <div className="ER-task-statics row mt-4">
            <h6 className="mt-2">
              <span className="ml-1">Active Licenses</span>
              <div className="license-management-title-progress"></div>
            </h6>
            <h6 className="mt-2">
              <span className="ml-4">Industry Type</span>
              <div className=""></div>
            </h6>
          </div>
          <div className="row">
            {sortBy === "Roles" && (
              <div className="col-md-4">
                <div className="col mt-3">
                  <div className="row">
                    <span className="mt-2 ml-2">Show:</span>
                    <select
                      className="form-select ml-2"
                      style={{
                        width: "200px",
                        height: "40px",
                        padding: "5px",
                      }}
                    >
                      <option selected>All Results</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="col">
              <ul className="sort-by-filter">
                <span
                  className="sort-by add-btn"
                  onClick={() => setOpenRightTab(!openRightTab)}
                >
                  <AiOutlinePlus size={18} className="m-1 add-new-button" />
                  ADD NEW SUBTASK
                </span>

                <span
                  className="sort-by add-btn"
                  onClick={() => setOpenRightTab(!openRightTab)}
                >
                  <AiOutlinePlus size={18} className="m-1 add-new-button" />
                  ADD NEW LICENSE
                </span>

                <span className="sort-by ml-4">Sort by</span>
                <span
                  className={
                    sortBy == "Addtional Date"
                      ? "sort-filter-active"
                      : "sort-filter-inactive"
                  }
                  onClick={() => setSortBy("Addtional Date")}
                >
                  Addtional Date
                </span>

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
                    sortBy == "Updates"
                      ? "sort-filter-active"
                      : "sort-filter-inactive"
                  }
                  onClick={() => setSortBy("Updates")}
                >
                  Updates
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
            <UserRoleList />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ActiveLicense;
