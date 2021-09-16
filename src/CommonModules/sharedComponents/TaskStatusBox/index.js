import React from "react";
import "./style.css";
const TaskStatusBox = ({ status, children }) => {
  return (
    <div
      className="task-status__container"
      style={{
        backgroundColor:
          status === "pending"
            ? "#fcf3cd"
            : status === "rejected"
            ? "#ffefea"
            : status === "approved"
            ? "#e4f1e4"
            : "#b3adf7",
      }}
    >
      <p
        className="task-status__text"
        style={{
          color:
            status === "pending"
              ? "#d0a100"
              : status === "rejected"
              ? "#ff5f31"
              : status === "approved"
              ? "#7fba7a"
              : "#6c5dd3",
        }}
      >
        {children}
      </p>
    </div>
  );
};

export default TaskStatusBox;
