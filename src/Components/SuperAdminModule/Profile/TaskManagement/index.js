import React, { useState } from "react";
import Searchable from "react-searchable-dropdown";

import "./style.css";

const TaskManagement = (props) => {
  return (
    <div className="task-management-container">
      <h2 className="task-management-header">Task Management</h2>
      <div className="task-management-main">
        <p>Detail View</p>
        <select className="task-status-option">
          <option>Task Status</option>
        </select>
      </div>
    </div>
  );
};

export default TaskManagement;
