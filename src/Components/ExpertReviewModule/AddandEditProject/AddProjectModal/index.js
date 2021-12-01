import React from "react";
import "./style.css";
import TextEditor from "../TextEditor";
import { DatePicker, Space } from "antd";
import calanderIcon from "../../../../assets/Icons/calanderIcon.svg";

function AddProject({ show, onClose }) {
  if (!show) {
    return null;
  }
  const calanderimg = <img src={calanderIcon} />;
  return (
    <div className="add-edit-modal" onClick={onClose}>
      <div
        className="add-edit-project-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="add-edit-main-container">
          <label className="add-edit-project-labels">Project Name</label>
          <input className="add-edit-project-inputs" />
          <div className="row mt-3">
            <div className="col-6">
              <label className="add-edit-project-labels">User</label>
              <input className="add-edit-project-inputs" />
            </div>
            <div className="col-3">
              <label className="add-edit-project-labels">Start Date</label>

              <DatePicker
                className="add-edit-project-inputs"
                suffixIcon={calanderimg}
              />
            </div>
            <div className="col-3">
              <label className="add-edit-project-labels">End Date</label>
              <DatePicker
                className="add-edit-project-inputs"
                suffixIcon={calanderimg}
              />
            </div>
          </div>
          <label className="add-edit-project-labels mt-3">
            Project overview
          </label>
          <TextEditor />
          <label className="add-edit-project-labels">Task Durention</label>
          <input className="add-edit-project-inputs-task-duretion" />
          <div className="d-flex mt-3 justify-content-center">
            <div className="p-2">
              <button className="add-edit-project-submit-btn" onClick={onClose}>
                Submit
              </button>
            </div>
            <div className="p-2">
              <button className="add-edit-project-cancel-btn" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProject;
