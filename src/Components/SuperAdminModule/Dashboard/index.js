import React, { useState } from "react";
import QuickOverview from "../QuickOverview";
import TaskList from "../TaskList";
import ClientList from "../ClientList";
import "./style.css";

const Dashboard = () => {
  const [navTab, setNav] = useState("Tasks");

  return (
    <div className="row">
      <div className="col-md-3">
        <QuickOverview />
      </div>
      <div className="col-md-9">
        <div className="Super-admin-main">
          <div className="Super-admin-task-statics row">
            <h5
              className={navTab === "Tasks" ? "mt-2" : "mt-2 text-muted"}
              onClick={() => setNav("Tasks")}
            >
              <span className="ml-1">Tasks</span>
              {navTab === "Tasks" && <div className="nav-title-progress"></div>}
            </h5>
            <h5
              className={navTab === "Clients" ? "mt-2" : " mt-2 text-muted"}
              onClick={() => setNav("Clients")}
            >
              <span className="ml-4">Clients</span>
              {navTab === "Clients" && (
                <div className="nav-title-progress ml-4"></div>
              )}
            </h5>
            <div className="Super-admin-search-input mb-2">
              <input
                className="form-control Super-admin-search"
                placeholder="Search for Tasks"
              />
            </div>
          </div>
          {navTab === "Tasks" ? <TaskList /> : <ClientList />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
