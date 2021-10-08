import React, { useState } from "react";
import { MdAddCircle, MdCheck, MdExpandMore } from "react-icons/md";
const TaskUpdates = () => {
  return (
    <>
      <div className="col-12 d-flex align-items-center justify-content-between">
        <h6>Recent Updates</h6>
        <button className="task-details__button task-details__button--stroke">
          <MdAddCircle />
          &nbsp;add new update
        </button>
      </div>
      <UpdatesAccordion />
      <UpdatesAccordion />
      <UpdatesAccordion />
      <UpdatesAccordion />
      <UpdatesAccordion />
    </>
  );
};

export default TaskUpdates;

const UpdatesAccordion = ({ data }) => {
  const [isShowData, setShowData] = useState(false);
  return (
    <div className="my-2 task-details__accordion col-12 ">
      <div className="task-details__accordion-container py-1 d-flex align-items-center justify-content-between">
        <div className="circle task-detials__accordion-item check-icon mx-3">
          <MdCheck />
        </div>
        <p className="task-details__accordion-title mb-0">
          Updates in the GST license
        </p>
        <div className="task-details__accordion-right d-flex align-items-center justify-content-between">
          <span className="task-details__accordion-text--small">
            3 days ago
          </span>
          <button
            className="task-details__button task-details__accordion-button"
            onClick={() => setShowData(!isShowData)}
            style={{
              transform: isShowData ? "rotate(180deg)" : "rotate(0deg)",
              transition: "all 200ms ease",
            }}
          >
            <MdExpandMore />
          </button>
        </div>
      </div>
      {isShowData && (
        <div className="task-details__accordion-data">
          <p className="task-details__accordion-data--text task-details__accordion-title mb-0 px-3 py-2">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            libero quibusdam, dolorem tempore, fugit labore voluptatum quos
            accusantium deleniti natus esse cum id!
          </p>
        </div>
      )}
    </div>
  );
};
