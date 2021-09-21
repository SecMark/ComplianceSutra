import React, { useState } from "react";
import QuickOverview from "../QuickOverview";
import TaskList from "../TaskList";
import ClientList from "../ClientList";
import TeamPerformance from "./team-performance";
import "./style.css";
import { MdClose } from "react-icons/md";
import TakeAction from "./TakeAction";

const Dashboard = () => {
  // const [navTab, setNav] = useState("Tasks");
  // const [navTab, setNav] = useState("TeamPerformance");
  // const [navTab, setNav] = useState("Risk&Delays");
  const [navTab, setNav] = useState("PendingActions");

  return (
    <div className="row">
      <div className="col-md-3">
        <QuickOverview />
      </div>
      <div className="col-md-9">
        <div className="Super-admin-main">
          {(navTab === "Tasks" || navTab === "Clients") && (
            <div className="Super-admin-task-statics row">
              <h5
                className={navTab === "Tasks" ? "mt-2" : "mt-2 text-muted"}
                onClick={() => setNav("Tasks")}
              >
                <span className="ml-1">Tasks</span>
                {navTab === "Tasks" && (
                  <div className="nav-title-progress"></div>
                )}
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
          )}
          {navTab === "TeamPerformance" && (
            <>
              <div className="d-flex align-items-center mb-0">
                <MdClose
                  className="mr-3"
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: "600",
                    marginLeft: "-3px",
                  }}
                  onClick={() => {
                    setNav("Tasks");
                  }}
                />
                <h4 className="mb-0">Team Performance</h4>
                <div className="Super-admin-search-input mb-2">
                  <input
                    className="form-control Super-admin-search"
                    placeholder="Search for Tasks"
                  />
                </div>
              </div>
            </>
          )}
          {navTab === "Tasks" && <TaskList />}
          {navTab === "Clients" && <ClientList />}
          {navTab === "TeamPerformance" && <TeamPerformance />}
          {navTab === "Risk&Delays" && <TakeAction />}
          {navTab === "PendingActions" && <TakeAction />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
