import React from "react";
import "./style.css";
import TextEditor from "../TextEditor";
import { DatePicker } from "antd";
import calanderIcon from "../../../../assets/Icons/calanderIcon.svg";

function AddProjectMobile({ show, onClose }) {
  const calanderimg = <img src={calanderIcon} />;
  return (
    <div onClick={onClose}>
      <div>
        <div className="add-edit-main-container">
          <label className="add-edit-project-labels">Project Name</label>
          <input className="add-edit-project-inputs" />
          <div className="row mt-3">
            <div className="col-12 col-xl-6">
              <label className="add-edit-project-labels">User</label>
              <input className="add-edit-project-inputs" />
            </div>
            <div className="col-6 col-xl-3">
              <label className="add-edit-project-labels">Start Date</label>

              <DatePicker
                className="add-edit-project-inputs"
                suffixIcon={calanderimg}
              />
            </div>
            <div className="col-6 col-xl-3">
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
          <input className="add-edit-project-inputs-task-duration-mobile" />
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

export default AddProjectMobile;
