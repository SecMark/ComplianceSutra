import React from "react";
import LeftSideBar from "../LeftSideBar/index";
import "./style.css";
import TaskForm from "./TaskHistoryForm/TaskForm";
import TaskHistoryResult from "./TaskHistoryResults";
function index() {
  return (
    <div>
      <div className="ER-dashboard-container">
        <div className="ER-main row">
          <div className="col-12 col-md-3 col-xl-4">
            <div className="ER-task-statics">
              <h3>Tasks History</h3>
              <div className="active-task">
                <p className="th-details">
                  Add details to filter results from your completed tasks
                </p>

                <TaskForm />
              </div>
            </div>
          </div>
          <div className="col-12 col-xl-8">
            <TaskHistoryResult />
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
