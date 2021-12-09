import React, { useEffect, useState } from "react";
import "./style.css";
import { DatePicker } from "antd";
import calanderIcon from "../../../../../assets/Icons/calanderIcon.svg";
import CreatableSelect from "react-select/creatable";
import { useDropzone } from "react-dropzone";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { MdError } from "react-icons/md";
import { addAndUpdateTaskRequest } from "../../../redux/actions";
import {
  getProjectDateFormat,
  isAfter,
  isBefore,
  isBeforeToday,
} from "../../date.helpers";
// custom style for dropdown
const customStyle = {
  control: (styles) => ({
    ...styles,
    width: "100%",
    height: "50px",
    borderRadius: "10px",
  }),
};

const initialState = {
  task_id: null,
  project_id: null,
  milestone_id: null,
  task_list_id: null,
  subject: "",
  start_date: "",
  end_date: "",
  assign_to: "",
  comments: "",
  frequency: "",
  weekly_repeat_day: "",
  repeat_on_day: "",
  file_details: [],
};

function NewTaskModel({ showTask, onClose, editData, isEdit }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [fileList, setFileList] = useState([]);
  const [fieldInputs, setFieldInputs] = useState(editData || initialState);
  const [fieldErrors, setFieldErrors] = useState({
    isValidate: true,
    start_date: "",
    end_date: "",
    subject: "",
  });
  const [weeklyDay, setWeeklyDay] = useState("Monday");
  const dateValidations = useSelector(
    (state) =>
      state?.ProjectManagementReducer?.modalsStatus?.taskModal?.dateValidations
  );
  // useEffect(() => {
  //   console.log({ dateValidations });
  // }, [dateValidations]);
  const dispatch = useDispatch();
  // to change the frequency
  const FrequencyChange = (e) => {
    // setFrequency(e.target.value);
    setFieldInputs({ ...fieldInputs, frequency: e.target.value });
  };

  //to change day of weekly
  const onDayChange = (val) => {
    setWeeklyDay(val);
    setFieldInputs({
      ...fieldInputs,
      weekly_repeat_day: fieldInputs?.frequency === "Weekly" ? val : null,
    });
  };

  const calanderimg = <img src={calanderIcon} />;
  const usersList = useSelector(
    (state) => state?.ProjectManagementReducer?.usersList
  );

  // handle file upload
  const handleSelectUploadFile = () => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const _fileList = (fileList && fileList.length > 0 && fileList) || [];
      let isPresent = false;
      let fileArray = [];
      acceptedFiles.forEach((file) => {
        isPresent = _fileList.some((element) => element?.name === file?.name);
        if (!isPresent) {
          fileArray.push(file);
        } else {
          toast.error(
            `File ${file.name} is already uploaded. Please rename it and upload again.`
          );
          return "";
        }
      });
      if (fileArray && fileArray.length > 0) {
        setFileList([..._fileList, ...fileArray]);
      }
    }
  };

  // handle submit
  const onSubmit = () => {
    let formData = new FormData();
    const allInputs = Object.keys(fieldInputs);
    fileList.forEach((file) => {
      formData.append("file_details", file);
    });
    allInputs.forEach((key) => {
      if (
        fieldInputs[key] !== null &&
        fieldInputs[key] !== "" &&
        fieldInputs[key] !== [] &&
        fieldInputs[key] !== undefined
      ) {
        formData.append(key, fieldInputs[key]);
      }
    });
    dispatch(addAndUpdateTaskRequest(formData));
    setFieldErrors({});
    setFieldInputs({});
    setFileList([]);
    onClose();
  };
  useEffect(() => {
    handleSelectUploadFile();
  }, [acceptedFiles]);

  useEffect(() => {
    setFieldInputs({ ...editData });
  }, [editData]);

  useEffect(() => {
    const { start_date, end_date, subject, project_id } = fieldInputs;
    setFieldErrors({
      isValidate:
        (subject === "" && isEdit) ||
        subject === "" ||
        // Start Date Validation
        (!isEdit &&
          (start_date === "" ||
            (project_id &&
              (isBefore(dateValidations?.start_date, start_date) ||
                isAfter(dateValidations?.end_date, start_date))) ||
            isBeforeToday(start_date) ||
            (end_date !== "" && isAfter(end_date, start_date)))) ||
        // End Date Validation
        (!isEdit &&
          (end_date === "" ||
            (project_id &&
              (isAfter(dateValidations?.end_date, end_date) ||
                isBefore(dateValidations?.start_date, end_date))) ||
            isBeforeToday(end_date) ||
            (start_date !== "" && isBefore(start_date, end_date)))),
      start_date:
        start_date !== "" && !isEdit
          ? isBeforeToday(start_date)
            ? "Start date should not be prior to today date."
            : project_id &&
              (isBefore(dateValidations?.start_date, start_date) ||
                isAfter(dateValidations?.end_date, start_date))
            ? "Start Date should be between " +
              getProjectDateFormat(dateValidations?.start_date) +
              " to " +
              getProjectDateFormat(dateValidations?.end_date)
            : end_date !== "" && isAfter(end_date, start_date)
            ? "Start date should not be later to end date"
            : ""
          : "",
      end_date:
        end_date !== "" && !isEdit
          ? isBeforeToday(end_date)
            ? "End date should not be prior to today date."
            : project_id &&
              (isAfter(dateValidations?.end_date, end_date) ||
                isBefore(dateValidations?.start_date, end_date))
            ? "End Date should be between " +
              getProjectDateFormat(dateValidations?.start_date) +
              " to " +
              getProjectDateFormat(dateValidations?.end_date)
            : start_date !== "" && isBefore(start_date, end_date)
            ? "End date should not be prior to start date"
            : ""
          : "",
    });
  }, [fieldInputs?.end_date, fieldInputs?.start_date, fieldInputs?.subject]);
  return !showTask ? null : (
    <div className="add-edit-modal">
      <div
        className="add-edit-project-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="add-edit-main-container">
          <label className="add-edit-project-labels">Task Name</label>
          <input
            className="modal-input"
            name="project_name"
            value={fieldInputs?.subject}
            onChange={(e) =>
              setFieldInputs({ ...fieldInputs, subject: e.target.value })
            }
          />
          <div className="row mt-3">
            <div className="col-md-6 col-lg-6 col-sm-6">
              <label className="add-edit-project-labels">Start Date</label>

              <DatePicker
                disabled={isEdit}
                className="modal-input"
                name="start_date"
                format="DD MMMM Y"
                suffixIcon={calanderimg}
                value={
                  (fieldInputs?.start_date &&
                    moment(fieldInputs?.start_date, "YYYY-MM-DD")) ||
                  null
                }
                onChange={(value) =>
                  setFieldInputs({
                    ...fieldInputs,
                    start_date: value?.format("YYYY-MM-DD") || "",
                  })
                }
              />
              {fieldErrors?.start_date !== "" && (
                <p className="add-project-err-msg">
                  <MdError />
                  &nbsp;
                  {fieldErrors?.start_date}
                </p>
              )}
            </div>
            <div className="col-md-6 col-lg-6 col-sm-6">
              <label className="add-edit-project-labels">End Date</label>
              <DatePicker
                disabled={isEdit}
                className="modal-input"
                suffixIcon={calanderimg}
                format="DD MMMM Y"
                value={
                  (fieldInputs?.end_date &&
                    moment(fieldInputs?.end_date, "YYYY-MM-DD")) ||
                  null
                }
                onChange={(value) =>
                  setFieldInputs({
                    ...fieldInputs,
                    end_date: value?.format("YYYY-MM-DD") || "",
                  })
                }
              />
              {fieldErrors?.end_date !== "" && (
                <p className="add-project-err-msg">
                  <MdError />
                  &nbsp;
                  {fieldErrors?.end_date}
                </p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-lg-6">
              <label className="add-edit-project-labels mt-3">
                Task Description
              </label>
              <input
                className="modal-input"
                onChange={(e) =>
                  setFieldInputs({
                    ...fieldInputs,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-sm-12 col-lg-6">
              <label className="add-edit-project-labels mt-3">
                Attach Files
              </label>
              <div className="add-new-subtask-fileDropZone">
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <p className="add-new-subtask-fileDropZone-text">
                    Drop your files here
                  </p>
                </div>
              </div>
              {fileList &&
                fileList.length > 0 &&
                fileList.map((file) => {
                  return (
                    <p
                      style={{
                        fontWeight: "normal",
                        fontSize: "14px",
                      }}
                      className="mb-0"
                    >
                      {file.name}
                    </p>
                  );
                })}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-lg-6">
              <label className="add-edit-project-labels mt-3">Assign To</label>
              <CreatableSelect
                onChange={(option) => {
                  setFieldInputs({ ...fieldInputs, assign_to: option?.value });
                }}
                options={usersList || []}
                defaultValue={
                  (usersList &&
                    usersList.length > 0 &&
                    usersList.filter(
                      (user) => user.value === editData?.assign_to
                    )[0]) ||
                  null
                }
              />
            </div>
            <div className="col-sm-12 col-lg-6">
              <label className="add-edit-project-labels mt-3">Comments</label>
              <input
                className="modal-input"
                onChange={(e) =>
                  setFieldInputs({ ...fieldInputs, comments: e.target.value })
                }
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="add-edit-project-labels mt-3">Frequency</label>
              <div className="add-new-task-radio-btn pl-0 d-flex align-items-center justify-content-center">
                <RadioGroup
                  row
                  aria-label="frequency"
                  name="row-radio-buttons-group"
                  value={fieldInputs?.frequency || "None"}
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
                  {/* <FormControlLabel
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
                  /> */}
                </RadioGroup>
              </div>
            </div>
          </div>
          {fieldInputs?.frequency === "Weekly" && (
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
          {["Monthly", "Quarterly", "Half Yearly", "Yearly"].includes(
            fieldInputs?.frequency
          ) && (
            <div className="row mt-3">
              <div className="col justify-content-center">
                <label className="add-edit-project-labels">
                  Please enter month day
                </label>
                <input
                  className="modal-input"
                  value={fieldInputs?.repeat_on_day || ""}
                  onChange={(event) =>
                    setFieldInputs({
                      ...fieldInputs,
                      repeat_on_day: event.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}
          <div className="d-flex mt-3 justify-content-center">
            <div className="p-2">
              <button
                className="add-edit-project-submit-btn"
                onClick={onSubmit}
                disabled={fieldErrors?.isValidate}
                style={{
                  ...(fieldErrors?.isValidate && { opacity: "0.7" }),
                }}
              >
                {!isEdit ? "Submit" : "Update"}
              </button>
            </div>
            <div className="p-2">
              <button
                className="add-edit-project-cancel-btn"
                onClick={() => {
                  setFieldErrors({});
                  setFieldInputs({});
                  setFileList([]);
                  onClose();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// const isBeforeToday = (date) => {
//   const todayDate = moment().format("YYYY-MM-DD");
//   return moment(todayDate).isAfter(date);
// };

export default NewTaskModel;
