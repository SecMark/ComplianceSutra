import React, { useState } from "react";
import UserList from "../../UserManagement/components/UserList";
import { AiOutlinePlus } from "react-icons/ai";
import "./style.css";
import LicenseList from "../LicenseList";
import searchIcon from "../../../../assets/Icons/searchIcon.png";
import Dropdown from "react-dropdown";

const ActiveLicense = (props) => {
  const [openRightTab, setOpenRightTab] = useState(true);
  const [sortBy, setSortBy] = useState("Addtional Date");

  const options = [
    { value: "4", label: "Team Member" },
    { value: "3", label: "Compliance Officer" },
    { value: "5", label: "Approver" },
  ];

  const filterOptions = [
    { value: "0", label: "None" },
    { value: "4", label: "Team Members" },
    { value: "5", label: "Approvers" },
    { value: "3", label: "CO" },
    { value: "az", label: "A > Z" },
    { value: "za", label: "Z > A" },
  ];

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="Super-admin-main">
          <div className="row">
            <h4 className="mt-2">
              <span className="ml-1">License Management</span>
            </h4>
            <div className="Super-admin-search-input">
              <div className="input-group">
                <img
                  className="IconGray"
                  src={searchIcon}
                  alt="search Icon"
                  style={{
                    position: "absolute",
                    left: "0px",
                    zIndex: "999",
                    top: "5px",
                  }}
                />
                <input
                  className="pl-4 license-search"
                  placeholder="Search for license"
                />
              </div>
            </div>
          </div>

          <div className="Super-admin-task-statics row mt-4">
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
                    <span className="mt-2 ml-2 mt-2">Show:</span>
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

            <div
              className="col d-flex mt-4 mb-4 show-options"
              style={{ justifyContent: "space-between" }}
            >
              <div className="d-flex">
                <span className="mt-1 mx-2">show:</span>
                <Dropdown
                  arrowClosed={<span className="arrow-closed" />}
                  arrowOpen={<span className="arrow-open" />}
                  placeholder="Select an option"
                  options={filterOptions}
                  className="ml-2"
                />
              </div>

              <div className="sort-by-filter">
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
              </div>
            </div>
          </div>
          {sortBy === "Addtional Date" ? (
            <LicenseList />
          ) : sortBy === "Roles" ? (
            <UserList />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ActiveLicense;