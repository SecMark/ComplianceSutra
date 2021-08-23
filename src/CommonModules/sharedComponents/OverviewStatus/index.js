import React from "react";
const OverviewStatus = ({ status, children }) => {
  const background =
    status === "approved"
      ? "#e4f1e4"
      : status === "pending"
      ? "#fcf3cd"
      : status === "rejected"
      ? "#ffefea"
      : "#e5e1ff";
  const text =
    status === "approved"
      ? "#7fba7a"
      : status === "pending"
      ? "#d0a100"
      : status === "rejected"
      ? "#ff5f31"
      : "#6c5dd3";
  return (
    <div
      className="task-data__status"
      style={{
        backgroundColor: background,
      }}
    >
      <p
        className="task-data__status--text"
        style={{
          color: text,
        }}
      >
        {children}
      </p>
    </div>
  );
};
export default OverviewStatus;
