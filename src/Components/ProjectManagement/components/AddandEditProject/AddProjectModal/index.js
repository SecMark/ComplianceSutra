import React, { useEffect, useState } from "react";
import "./style.css";
import TextEditor from "../TextEditor";
import { DatePicker, Space } from "antd";
import { setProject, getUsersListRequest } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import calanderIcon from "../../../../../assets/Icons/calanderIcon.svg";
import axiosInstance from "../../../../../apiServices";
import CreatableSelect from "react-select/creatable";
import moment from "moment";

// Initial state
const initailState = {
  project_id: null,
  project_name: "",
  start_date: "",
  end_date: "",
  project_overview: "",
  assign_user: [],
};
function AddProject({ show, onClose, editData }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [userList, setUserList] = useState([]);
  const [values, setValues] = useState(editData || initailState);
  const allUsersList = useSelector(
    (state) => state?.ProjectManagementReducer?.usersList
  );
  useEffect(() => {
    // Get all users list
    if (allUsersList && allUsersList.length > 0) {
      console.log({ allUsersList });
      setUserList(
        [...allUsersList].map((item) => ({
          label: item.full_name,
          value: item.name,
        }))
      );
    }
  }, [allUsersList]);
  useEffect(() => {
    console.log(values);
    console.log(values?.start_date, values?.end_date);
  }, [values]);

  useEffect(() => {
    setValues({
      ...editData,
    });
  }, [editData]);
  useEffect(() => {
    dispatch(getUsersListRequest());
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

  const onHandleChange = (evt) => {
    const value = evt.target.value;
    setValues({
      ...values,
      [evt.target.name]: value,
    });
  };

  // function to change dropdownvalue
  const handleDropDownChange = (val) => {
    // console.log({ val });
    const arr2 = [];
    val.map((label) => {
      arr2.push(label.value);
    });
    setValues({
      ...values,
      assign_user: arr2,
    });
  };

  // submiting form values
  const onSubmitValue = () => {
    const payload = values;
    dispatch(setProject(payload));
    onClose();
  };

  const calanderimg = <img src={calanderIcon} alt="calender" />;

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
            value={values.project_name}
          />
          <div className="row mt-3">
            <div className="col-sm-12 col-lg-6">
              <label className="add-edit-project-labels">User</label>
              <CreatableSelect
                isMulti
                styles={customStyle}
                onChange={handleDropDownChange}
                options={userList}
                defaultValue={
                  editData?.assign_user?.map((user) => {
                    return [...userList]?.filter((item) => {
                      if (item?.value === user) {
                        return item;
                      }
                    })[0];
                  }) || []
                }
              />
            </div>
            <div className="col-sm-6 col-lg-3">
              <label className="add-edit-project-labels">Start Date</label>

              <DatePicker
                className="add-edit-project-inputs"
                name="start_date"
                suffixIcon={calanderimg}
                onChange={(date, dateString) => {
                  setValues({
                    ...values,
                    start_date: date?.format("YYYY-MM-DD") || "",
                  });
                }}
                // defaultValue={
                //   (values?.start_date &&
                //     moment(values?.start_date, "YYYY-MM-DD")) ||
                //   null
                // }
                value={
                  values?.start_date &&
                  moment(values?.start_date, "DD MMM YYYY")
                }
                format="DD MMM YYYY"
              />
            </div>
            <div className="col-sm-6 col-lg-3">
              <label className="add-edit-project-labels">End Date</label>
              <DatePicker
                className="add-edit-project-inputs"
                suffixIcon={calanderimg}
                onChange={(date, dateString) => {
                  setValues({
                    ...values,
                    end_date: date?.format("YYYY-MM-DD") || "",
                  });
                }}
                value={
                  (values?.end_date &&
                    moment(values?.end_date, "DD MMM YYYY")) ||
                  null
                }
                format="DD MMM YYYY"
              />
            </div>
          </div>
          <label className="add-edit-project-labels mt-3">
            Project overview
          </label>
          <TextEditor values={values} setValues={setValues} />
          <div className="d-flex mt-3 justify-content-center">
            <div className="p-2">
              <button
                className="add-edit-project-submit-btn"
                onClick={onSubmitValue}
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
