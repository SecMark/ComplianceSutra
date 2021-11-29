import React, { useEffect, useState } from "react";
import "./style.css";
import { DatePicker } from "antd";
import calanderIcon from "../../../../assets/Icons/calanderIcon.svg";
import CreatableSelect from "react-select/creatable";
import { useDropzone } from "react-dropzone";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import axiosInstance from "../../../../apiServices";
import moment from "moment";
import { toast } from "react-toastify";


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
  const [values, setValues] = useState({
    subject: "",
    start_date: "",
    end_date: "",
    project_overview: "",
    comments: "",
    assign_user: [],
  });
  const [errors, setErrors] = useState({
    project_Err: "",
    assign_Err: "",
    start_date_Err: "",
    end_date_Err: "",
    project_overview_Err: "",
  });
  const [weeklyDay, setWeeklyDay] = useState("Monday");
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  console.log(acceptedFiles);
  console.log(frequency);
  console.log(weeklyDay);
  const calanderimg = <img src={calanderIcon} />;


  const files = acceptedFiles.map((file,index) => (
    <li key={file.path}>
      {file.path}
    </li>
  ));

  useEffect(() => {
    getRegisteredUSerList();
  }, []);

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



  // to change the frequency
  const FrequencyChange = (e) => {
    setFrequency(e.target.value);
  };

  //to change day of weekly
  const onDayChange = (val) => {
    setWeeklyDay(val);
  };


  // setState for start date nad end date 
  const onDateChange = (date, dateString, name) => {
    const todayDate = moment().format("YYYY-MM-DD");
    if (name === "start_date") {
      setValues({
        ...values,
        start_date: dateString,
      });
      if (moment(todayDate).isAfter(dateString)) {
        setErrors({
          ...errors,
          start_date_Err: `please select ${todayDate} or after ${todayDate}`,
        });
      } else {
        setErrors({
          ...errors,
          start_date_Err: "",
        });
      }
    } else if (name === "end_date") {
      setValues({
        ...values,
        end_date: dateString,
      });
      if (moment(todayDate).isAfter(dateString)) {
        setErrors({
          ...errors,
          end_date_Err: `please select ${todayDate} or after ${todayDate}`,
        });
      } else {
        setErrors({
          ...errors,
          end_date_Err: "",
        });
      }
    }
  };


  // changes the state  for project name , over View, comment,
  const onHandleChange = (evt) => {
    const value = evt.target.value;
    setValues({
      ...values,
      [evt.target.name]: value,
    });
  };


// api request to Submit data

  const onSubmitData = () => {
    var formData = [];
    const val =Object.keys(values);
    formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append("file_details", file);
    });
    val.forEach((key,index)=>{
      formData.append(key,values[key])
    })
    formData.append("frequency",frequency);
    formData.append("weekly_repeat_day",weeklyDay);
   axiosInstance
      .post("compliance.api.updateProjectTask", formData)
      .then((response) => {
        if(response.data.message.status === true){
            toast.success("Task Added successfully")
            onClose();
        }
        else{
          toast.warning(response.data.message.status_response);
        }
      })
      .catch((err) => {});
  };



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
            name="subject"
            onChange={onHandleChange}
          />
          <div className="row mt-3">
            <div className="col-sm-6 col-lg-6">
              <label className="add-edit-project-labels">Start Date</label>

              <DatePicker
                className="add-edit-project-inputs"
                name="start_date"
                suffixIcon={calanderimg}
                onChange={(date, dateString) => {
                  onDateChange(date, dateString, "start_date");
                }}
              />
              <p className="add-project-err-msg">{errors.start_date_Err}</p>
            </div>
            <div className="col-sm-6 col-lg-6">
              <label className="add-edit-project-labels">End Date</label>
              <DatePicker
                className="add-edit-project-inputs"
                name="end_date"
                suffixIcon={calanderimg}
                onChange={(date, dateString) => {
                  onDateChange(date, dateString, "end_date");
                }}
              />
              <p className="add-project-err-msg">{errors.start_date_Err}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-lg-6">
              <label className="add-edit-project-labels mt-3">
                Project overview
              </label>
              <input
                className="add-edit-project-inputs"
                name="project_overview"
                onChange={onHandleChange}
              />
            </div>
            <div className="col-sm-12 col-lg-6">
              <label className="add-edit-project-labels mt-3">
                Attach Files
              </label>
              <div className="add-new-subtask-fileDropZone">
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  {acceptedFiles.length === 0 ?
                    <p className="add-new-subtask-fileDropZone-text">
                    Please Drop Your files here
                   </p> : files
                  }
                    
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
                onChange={handleDropDownChange}
                options={userLilst}
              />
            </div>
            <div className="col-sm-12 col-lg-6">
              <label className="add-edit-project-labels mt-3">comments</label>
              <input
                className="add-edit-project-inputs"
                name="comments"
                onChange={onHandleChange}
              />
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
          {frequency === "Monthly" && (
            <div className="row mt-3">
              <div className="col justify-content-center">
              <label className="add-edit-project-labels">Please enter every month day</label>
              <input
            className="add-edit-project-inputs"
            onChange={(event)=>setWeeklyDay(event.target.value)}
          />
              </div>
            </div>
          )}
          <div className="d-flex mt-3 justify-content-center">
            <div className="p-2">
              <button
                className="add-edit-project-submit-btn"
                onClick={onSubmitData}
              >
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
