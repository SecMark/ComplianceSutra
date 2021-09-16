import React from "react";
import LeftSideBar from "../LeftSideBar/index";
import "./style.css";
import TaskForm from "./TaskHistoryForm/TaskForm";
function index() {
  return (
    <div className="Super-admin-dashboard-container">
      {/* <div> <LeftSideBar/></div> */}
      <div className="Super-admin-main">
        <div className="Super-admin-task-statics row">
          <h3>Tasks History</h3>
          <div className="active-task">

              <p className="th-details">
                Add details to filter results from your completed tasks
              </p>


            <TaskForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;

{
  /* <div className="col-1">
        <LeftSideBar />
      </div>
      <div className="col">
        <div>
            <h1 className="task-history-title">Task History</h1>
        </div>
        <div className="line32"></div>
        <div>
          <p className="th-add-details-having">
            Add details to filter results from your completed tasks
          </p>
        </div>
       <div>
           <TaskForm/>
       </div>
      </div> */
}
