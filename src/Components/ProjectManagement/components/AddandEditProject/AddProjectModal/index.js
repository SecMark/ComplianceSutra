import React, { useEffect, useState } from "react";
import "./style.css";
import TextEditor from "../TextEditor";
import { DatePicker, Space } from "antd";
import { setProject, getUsersListRequest } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import calanderIcon from "../../../../../assets/Icons/calanderIcon.svg";
import CreatableSelect from "react-select/creatable";
import moment from "moment";
import { isBefore, isBeforeToday, isAfter } from "../../date.helpers";
import { MdError } from "react-icons/md";

// Initial state
const initailState = {
  project_id: null,
  project_name: "",
  start_date: "",
  end_date: "",
  project_overview: "",
  assign_user: [],
};
function AddProject({ show, onClose, editData, isEdit }) {
  const dispatch = useDispatch();
  const [userList, setUserList] = useState([]);
  const [values, setValues] = useState(
    Object?.keys(editData).length > 0 ? editData : initailState
  );
  const allUsersList = useSelector(
    (state) => state?.ProjectManagementReducer?.usersList
  );
  const [fieldErrors, setFieldErrors] = useState({
    isValidate: true,
    start_date: "",
    end_date: "",
    title: "",
  });

  useEffect(() => {
    // Get all users list
    if (allUsersList && allUsersList.length > 0) {
      setUserList(allUsersList);
    }
  }, [allUsersList]);
  useEffect(() => {
    setValues({
      ...editData,
    });
  }, [editData]);
  useEffect(() => {
    dispatch(getUsersListRequest());
  }, []);

  useEffect(() => {
    const { project_name, start_date, end_date } = values;
    setFieldErrors({
      // validation falg
      isValidate:
        (!project_name && isEdit) ||
        !project_name ||
        // start-date validation
        (!isEdit &&
          (start_date === "" ||
            isBeforeToday(start_date) ||
            (end_date !== "" && isAfter(end_date, start_date)))) ||
        // end-date validation
        (!isEdit &&
          (end_date === "" ||
            isBeforeToday(end_date) ||
            (start_date !== "" && isBefore(start_date, end_date)))),

      // error messages
      start_date:
        start_date !== "" && !isEdit
          ? isBeforeToday(start_date)
            ? "Start date should not be prior to today's date."
            : end_date !== "" && isAfter(end_date, start_date)
            ? "Start date should not be later to end date"
            : ""
          : "",
      end_date:
        end_date !== "" && !isEdit
          ? isBeforeToday(end_date)
            ? "End date should not be prior to today's date"
            : start_date !== "" && isBefore(start_date, end_date)
            ? "End date should not be prior to start date"
            : ""
          : "",
    });
  }, [values?.start_date, values?.end_date, values?.project_name]);

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

  const createSelectStyles = {
    menu: (provided) => {
      return {
        ...provided,
        backgroundColor: "#fff",
        zIndex: "9999999",
      };
    },
    control: (provided) => ({
      ...provided,
      border: "2px solid #e2e2e2",
      borderRadius: "6px",
    }),
  };

  const calanderimg = <img src={calanderIcon} alt="calender" />;

  return !show ? null : (
    // <div className="add-edit-modal" onClick={onClose}>
    <div className="add-edit-modal">
      <div
        className="add-edit-project-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="add-edit-main-container">
          <label className="add-edit-project-labels">Project Name</label>
          <input
            // className="modal-input"
            class="modal-input"
            name="project_name"
            onChange={onHandleChange}
            value={values.project_name}
            required
          />
          {isEdit && values?.project_name === "" && (
            <p className="add-project-err-msg mt-2 mb-3">
              <MdError />
              &nbsp;Project title is required
            </p>
          )}
          <div className="row mt-3">
            <div className="col-sm-12 col-lg-6">
              <label className="add-edit-project-labels">User</label>
              <CreatableSelect
                isMulti
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
                styles={createSelectStyles}
              />
            </div>
            <div className="col-sm-6 col-lg-3">
              <label className="add-edit-project-labels">Start Date</label>

              <DatePicker
                className="modal-input"
                name="start_date"
                suffixIcon={calanderimg}
                onChange={(date, dateString) => {
                  setValues({
                    ...values,
                    start_date: date?.format("YYYY-MM-DD") || "",
                  });
                }}
                value={
                  values?.start_date && moment(values?.start_date, "YYYY-MM-DD")
                }
                format="DD MMM YYYY"
                disabled={isEdit}
              />
              {fieldErrors?.start_date !== "" && (
                <p className="add-project-err-msg">
                  <MdError />
                  &nbsp;
                  {fieldErrors?.start_date}
                </p>
              )}
            </div>
            <div className="col-sm-6 col-lg-3">
              <label className="add-edit-project-labels">End Date</label>
              <DatePicker
                className="modal-input"
                suffixIcon={calanderimg}
                onChange={(date, dateString) => {
                  setValues({
                    ...values,
                    end_date: date?.format("YYYY-MM-DD") || "",
                  });
                }}
                value={
                  (values?.end_date &&
                    moment(values?.end_date, "YYYY-MM-DD")) ||
                  null
                }
                format="DD MMM YYYY"
                disabled={isEdit}
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
          <label className="add-edit-project-labels mt-3">
            Project overview
          </label>
          <TextEditor
            values={values}
            setValues={setValues}
            project_overview={editData?.project_overview}
          />
          <div className="d-flex mt-3 justify-content-center">
            <div className="p-2">
              <button
                className="add-edit-project-submit-btn"
                onClick={onSubmitValue}
                disabled={fieldErrors?.isValidate}
                style={{
                  ...(fieldErrors?.isValidate && { opacity: "0.7" }),
                }}
              >
                {isEdit ? "Update" : "Submit"}
              </button>
            </div>
            <div className="p-2">
              <button
                className="add-edit-project-cancel-btn"
                onClick={() => {
                  setValues(initailState);
                  setFieldErrors({
                    isValidate: true,
                    start_date: "",
                    end_date: "",
                    title: "",
                  });
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

export default AddProject;
