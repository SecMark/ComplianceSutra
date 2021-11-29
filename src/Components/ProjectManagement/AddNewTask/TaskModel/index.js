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
import axiosInstance from "../../../../apiServices";
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
  const [frequency, setFrequency] = useState("None");
  const [userLilst, setUserList] = useState([]);
  const [values,setValues] =useState({
    assign_user:[]
  })
  const [weeklyDay, setWeeklyDay] = useState("Monday");
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  console.log(acceptedFiles);
  console.log(frequency);
  console.log(weeklyDay);
  const calanderimg = <img src={calanderIcon} />;

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

 useEffect(()=>{
  getRegisteredUSerList();
 },[])

  // function to get the registered user list
  const getRegisteredUSerList = () => {
    axiosInstance.get("compliance.api.getAllUsersList").then((response) => {
      const arr1 = [];
      response.data.message.user_list.map((el) => {
        arr1.push({
          label: el.name,
          value: el.full_name,
        });
      });
      setUserList(arr1);
    });
  };

  // function to change dropdownvalue

  const handleDropDownChange = (val) => {
    const arr2 = [];
    val.map((label) => {
      arr2.push(label.label);
    });
    setValues({
      ...values,
      assign_user: arr2,
    });
  };
  
  const FrequencyChange = (e) => {
    setFrequency(e.target.value);
  };
  const onDayChange = (val) => {
    setWeeklyDay(val);
  };


  const onDateChange = (date, dateString, name) => {

  }
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
                onChange={handleDropDownChange}
                options={userLilst}
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
              <div className="add-new-task-radio-btn justify-content-center">
                <RadioGroup
                  row
                  className="justify-content-center"
                  aria-label="frequency"
                  name="row-radio-buttons-group"
                  value={frequency}
                  onChange={FrequencyChange}
                >
                  <FormControlLabel
                    value="None"
                    control={<Radio />}
                    label="None"
                  />
                  <FormControlLabel
                    value="Daily"
                    control={<Radio />}
                    label="Daily"
                  />
                  <FormControlLabel
                    value="Weekly"
                    control={<Radio />}
                    label="Weekly"
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
          {frequency === "Weekly" && (
            <div className="row mt-3">
              <div className="col">
                <div className="add-new-task-radio-weekly-btn d-flex flex-wrap justify-content-center">
                  <h1
                    className={`${
                      weeklyDay === "Monday" && "add-task-weekly-day-selection"
                    }`}
                    onClick={() => {
                      onDayChange("Monday");
                    }}
                  >
                    Monday
                  </h1>
                  <h1
                    className={`${
                      weeklyDay === "Tuesday" && "add-task-weekly-day-selection"
                    }`}
                    onClick={() => {
                      onDayChange("Tuesday");
                    }}
                  >
                    Tuesday
                  </h1>
                  <h1
                    className={`${
                      weeklyDay === "Wednesday" &&
                      "add-task-weekly-day-selection"
                    }`}
                    onClick={() => {
                      onDayChange("Wednesday");
                    }}
                  >
                    Wednesday
                  </h1>
                  <h1
                    className={`${
                      weeklyDay === "Thursday" &&
                      "add-task-weekly-day-selection"
                    }`}
                    onClick={() => {
                      onDayChange("Thursday");
                    }}
                  >
                    Thursday
                  </h1>
                  <h1
                    className={`${
                      weeklyDay === "Friday" && "add-task-weekly-day-selection"
                    }`}
                    onClick={() => {
                      onDayChange("Friday");
                    }}
                  >
                    Friday
                  </h1>
                  <h1
                    className={`${
                      weeklyDay === "Saturday" &&
                      "add-task-weekly-day-selection"
                    }`}
                    onClick={() => {
                      onDayChange("Saturday");
                    }}
                  >
                    Saturday
                  </h1>
                  <h1
                    className={`${
                      weeklyDay === "Sunday" && "add-task-weekly-day-selection"
                    }`}
                    onClick={() => {
                      onDayChange("Sunday");
                    }}
                  >
                    Sunday
                  </h1>
                </div>
              </div>
            </div>
          )}
          {
            frequency==="Monthly" &&
            <div className="row mt-3">
                <div className="col justify-content-center">
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
            
          }
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
