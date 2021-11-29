import React, { useEffect, useState } from "react";
import "./style.css";
import TextEditor from "../TextEditor";
import { DatePicker, Space } from "antd";
import { setProject, getRegisteredUser } from "../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import calanderIcon from "../../../../assets/Icons/calanderIcon.svg";
import api from "../../../../apiServices";
import axiosInstance from "../../../../apiServices";
import CreatableSelect from "react-select/creatable";
import moment from "moment";

function AddProject({ show, onClose }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [userLilst, setUserList] = useState([]);
  const [validate, setIsValidate] = useState(true);
  const [values, setValues] = useState({
    project_name: "",
    assign_user: [],
    start_date: "",
    end_date: "",
    project_overview: "",
  });
  const [errors, setErrors] = useState({
    project_Err: "",
    assign_Err: "",
    start_date_Err: "",
    end_date_Err: "",
    project_overview_Err: "",
  });
  console.log("got this values", values);
  console.log("userList", userLilst);
  useEffect(() => {
    getRegisteredUSerList();
  }, []);

  // custom style for dropdown
  const customStyle = {
    control: (styles) => ({
      ...styles,
      width: "100%",
      height: "50px",
      borderRadius: "10px",
    }),
  };

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

  const onHandleChange = (evt) => {
    const value = evt.target.value;
    setValues({
      ...values,
      [evt.target.name]: value,
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

  const EmptyfieldsCheck = () => {
    if (
      values.project_name === "" ||
      values.assign_user.length === 0 ||
      values.start_date === "" ||
      values.end_date === "" ||
      values.project_overview === ""
    ) {
      return true;
    } else {
      return false;
    }
  };

  // submiting form values
  const onSubmitValue = () => {
    const payload = values;
    dispatch(setProject(payload));
    onClose();
  };

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

  const calanderimg = <img src={calanderIcon} />;

  return !show ? null : (
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
            onChange={onHandleChange}
          />
          {values.project_name === "" && (
            <p className="add-project-err-msg">Project Name can't be empty</p>
          )}

          <div className="row mt-3">
            <div className="col-sm-12 col-lg-6">
              <label className="add-edit-project-labels">User</label>
              <CreatableSelect
                isMulti
                styles={customStyle}
                onChange={handleDropDownChange}
                options={userLilst}
              />
              {values.assign_user.length === 0 && (
                <p className="add-project-err-msg">User can't be empty</p>
              )}
            </div>
            <div className="col-sm-6 col-lg-3">
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
            <div className="col-sm-6 col-lg-3">
              <label className="add-edit-project-labels">End Date</label>
              <DatePicker
                className="add-edit-project-inputs"
                suffixIcon={calanderimg}
                name="end_date"
                onChange={(date, dateString) => {
                  onDateChange(date, dateString, "end_date");
                }}
              />
              <p className="add-project-err-msg">{errors.end_date_Err}</p>
            </div>
          </div>
          <label className="add-edit-project-labels mt-3">
            Project overview
          </label>
          <TextEditor values={values} setValues={setValues} />
          {values.project_overview === 0 && (
            <p className="add-project-err-msg">this field can not be empty</p>
          )}
          <div className="d-flex mt-3 justify-content-center">
            <div className="p-2">
              <button
                className={
                  EmptyfieldsCheck()
                    ? `add-edit-project-submit-btn-disabled`
                    : `add-edit-project-submit-btn-primary`
                }
                disabled={EmptyfieldsCheck()}
                onClick={() => {
                  onSubmitValue();
                }}
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

export default AddProject;
