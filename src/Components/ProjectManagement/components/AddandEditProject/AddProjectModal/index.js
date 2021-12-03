import React, { useEffect, useState } from "react";
import "./style.css";
import TextEditor from "../TextEditor";
import { DatePicker, Space } from "antd";
import { setProject, getUsersListRequest } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import calanderIcon from "../../../../../assets/Icons/calanderIcon.svg";
import CreatableSelect from "react-select/creatable";
import moment from "moment";
import { isBefore, isBeforeToday } from "../../date.helpers";
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
function AddProject({ show, onClose, editData }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [userList, setUserList] = useState([]);
  const [values, setValues] = useState(editData || initailState);
  const allUsersList = useSelector(
    (state) => state?.ProjectManagementReducer?.usersList
  );
  const [fieldErrors, setFieldErrors] = useState({
    isValidate: true,
    start_date: "",
    end_date: "",
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
    const start_date = values?.start_date;
    const end_date = values?.end_date;
    if (start_date !== "" || end_date !== "") {
      setFieldErrors({
        ...fieldErrors,
        isValidate:
          isBeforeToday(start_date) || isBeforeToday(end_date) ? true : false,
        start_date: isBeforeToday(start_date)
          ? "Please select today date or after " +
            moment(start_date).format("DD MMM Y")
          : "",
        end_date: isBeforeToday(end_date)
          ? "Please select today date or after " +
            moment(end_date).format("DD MMM Y")
          : "",
      });
      if (
        start_date !== "" &&
        end_date !== "" &&
        isBefore(start_date, end_date)
      ) {
        setFieldErrors({
          ...fieldErrors,
          isValidate: true,
          end_date:
            "End Date should be after Start Date (" +
            moment(start_date).format("DD MMM Y") +
            ")",
        });
      }
    } else {
      setFieldErrors({
        isValidate: true,
        start_date: "",
        end_date: "",
      });
    }
  }, [values?.start_date, values?.end_date]);
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
            required
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
                value={
                  values?.start_date && moment(values?.start_date, "YYYY-MM-DD")
                }
                format="DD MMM YYYY"
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
                    moment(values?.end_date, "YYYY-MM-DD")) ||
                  null
                }
                format="DD MMM YYYY"
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
          <TextEditor values={values} setValues={setValues} />
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
