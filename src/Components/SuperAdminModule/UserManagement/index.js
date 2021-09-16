import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import UserList from "./components/UserList";
import RoleList from "./components/RoleList";
import ClientList from "./components/ClientList";
import LicenceList from "./components/LicenceList";
import StatusList from "./components/StatusList";
import AddEditUser from "./components/AddEditUser";
import "./style.css";
import Drawer from "../../../CommonModules/sharedComponents/Drawer";

const Dashboard = () => {
  const [sortBy, setSortBy] = useState("Alphabatically");
  const [openRightTab, setOpenRightTab] = useState(true);
  return (
    <>
      <div
        className={`popupmodalright ${
          openRightTab ? "popup-open-right" : "popup-close-right"
        }`}
      >
        <div
          className="box1"
          onClick={() => setOpenRightTab(!openRightTab)}
        ></div>
        <div className="box2">
          <AddEditUser type="new" onCloseTab={() => setOpenRightTab(false)} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="Super-admin-main">
            <div className="Super-admin-task-statics row">
              <h5 className="mt-2">
                <span className="ml-1">User Management</span>
                <div className="nav-title-progress"></div>
              </h5>
              <div className="Super-admin-search-input mb-2">
                <input
                  className="form-control Super-admin-search"
                  placeholder="Search by users"
                />
              </div>
            </div>
            <div className="row">
              {sortBy !== "Alphabatically" && (
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
                    <AiOutlinePlus size={18} className="m-1" />
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
              <RoleList />
            ) : sortBy === "Clients" ? (
              <ClientList />
            ) : sortBy === "License" ? (
              <LicenceList />
            ) : sortBy === "Status" ? (
              <StatusList />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
