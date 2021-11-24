import React, { useEffect, useState } from "react";
import "./style.css";
import { DatePicker, Space } from "antd";
import calanderIcon from "../../../../assets/Icons/calanderIcon.svg";
import CreatableSelect from "react-select/creatable";
import { useDropzone } from "react-dropzone";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

// custom style for dropdown
const customStyle = {
  control: (styles) => ({
    ...styles,
    width: "100%",
    height: "50px",
    borderRadius: "10px",
  }),
};

function NewTaskModel({ showTask, onClose }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const calanderimg = <img src={calanderIcon} />;

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return !showTask ? null : (
    <div className="add-edit-modal" onClick={onClose}>
      <div
        className="add-edit-project-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="add-edit-main-container">
          <label className="add-edit-project-labels">Project Name</label>
          <input
            className="add-edit-project-inputs"
            name="project_name"
            // onChange={onHandleChange}
          />
          <div className="row mt-3">
            <div className="col-sm-12 col-lg-6">
              <label className="add-edit-project-labels">Task List</label>
              <CreatableSelect
                isMulti
                styles={customStyle}
                // onChange={handleDropDownChange}
                // options={userLilst}
              />
            </div>
            <div className="col-sm-6 col-lg-3">
              <label className="add-edit-project-labels">Start Date</label>

              <DatePicker
                className="add-edit-project-inputs"
                name="start_date"
                suffixIcon={calanderimg}
                // onChange={(date, dateString) => {
                //   setValues({
                //     ...values,
                //     start_date: dateString,
                //   });
                // }}
              />
            </div>
            <div className="col-sm-6 col-lg-3">
              <label className="add-edit-project-labels">End Date</label>
              <DatePicker
                className="add-edit-project-inputs"
                suffixIcon={calanderimg}
                // onChange={(date, dateString) => {
                //   setValues({
                //     ...values,
                //     end_date: dateString,
                //   });
                // }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-lg-6">
              <label className="add-edit-project-labels mt-3">
                Project overview
              </label>
              <input className="add-edit-project-inputs" />
            </div>
            <div className="col-sm-12 col-lg-6">
              <label className="add-edit-project-labels mt-3">
                Attach Files
              </label>
              <div className="add-new-subtask-fileDropZone">
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <p className="add-new-subtask-fileDropZone-text">
                    Dropo Your Files Here
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-lg-6">
              <label className="add-edit-project-labels mt-3">Assign To</label>
              <CreatableSelect
                isMulti
                styles={customStyle}
                // onChange={handleDropDownChange}
                // options={userLilst}
              />
            </div>
            <div className="col-sm-12 col-lg-6">
              <label className="add-edit-project-labels mt-3">comments</label>
              <input className="add-edit-project-inputs" />
            </div>
          </div>
          <div className="row">
            <div className="col">
            <label className="add-edit-project-labels mt-3">Frequency</label>
              <div className="add-new-task-radio-btn">
              <RadioGroup
                row
                aria-label="frequency"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="none"
                  control={<Radio />}
                  label="none"
                />
                <FormControlLabel
                  value="daily"
                  control={<Radio />}
                  label="daily"
                />
                <FormControlLabel
                  value="weekly"
                  control={<Radio />}
                  label="weekly"
                />
                <FormControlLabel
                  value="weekly"
                  control={<Radio />}
                  label="weekly"
                />
                <FormControlLabel
                  value="Monthly"
                  control={<Radio />}
                  label="Monthly"
                />
                <FormControlLabel
                  value="Quarterly"
                  control={<Radio />}
                  label="Quarterly"
                />
                <FormControlLabel
                  value="Half Yearly"
                  control={<Radio />}
                  label="Half Yearly"
                />
                 <FormControlLabel
                  value="Yearly"
                  control={<Radio />}
                  label="Yearly"
                />
                
              </RadioGroup>
              </div>
            </div>
          </div>
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

export default NewTaskModel;
