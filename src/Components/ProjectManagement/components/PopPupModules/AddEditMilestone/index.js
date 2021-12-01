import React, { useEffect, useState } from "react";
import "./style.css";
import { DatePicker } from "antd";
import ProjectManagementModal from "../../ProjectManagementModal";
import { useDispatch, useSelector } from "react-redux";
import {
  addUpdateMilestoneRequest,
  addUpdateTaskListRequest,
} from "../../../redux/actions";
import CreatableSelect from "react-select/creatable";
import moment from "moment";
// Initial State
const initialState = {
  milestone_id: null,
  project: null,
  title: "",
  start_date: "",
  end_date: "",
  assign_user: [],
};

function AddEditMilestone({ visible, onClose, isEdit, editData }) {
  const [fieldValues, setFieldValues] = useState(editData || initialState);
  const [userList, setUserList] = useState([]);
  const dispatch = useDispatch();
  const modalsStatus = useSelector(
    (state) => state?.ProjectManagementReducer?.modalsStatus
  );
  const allUsersList = useSelector(
    (state) => state?.ProjectManagementReducer?.usersList
  );
  // custom style for dropdown
  // const customStyle = {
  //   control: (styles) => ({
  //     ...styles,
  //     width: "100%",
  //     minHeight: "50px",
  //     borderRadius: "8px",
  //   }),
  // };
  const handleDropDownChange = (option) => {
    setFieldValues({
      ...fieldValues,
      assign_user: [...option.map((label) => label?.value)],
    });
  };
  useEffect(() => {
    if (allUsersList && allUsersList.length > 0) {
      setUserList(allUsersList);
    }
  }, [allUsersList]);
  useEffect(() => {
    setFieldValues({ ...editData });
  }, [editData]);
  useEffect(() => {
    if (
      modalsStatus?.milestoneModal?.isVisible &&
      modalsStatus?.milestoneModal?.projectId
    ) {
      setFieldValues({
        ...fieldValues,
        project: modalsStatus?.milestoneModal?.projectId,
      });
    }
  }, [modalsStatus]);
  useEffect(() => {
    console.log(fieldValues);
  }, [fieldValues]);
  return (
    <ProjectManagementModal
      visible={visible}
      onClose={() => {
        setFieldValues(initialState);
        onClose();
      }}
    >
      <div className="milestone-modal__container d-flex align-items-center flex-column justify-content-center">
        <p className="modal__heading">New Milestone</p>
        <div className="form-group">
          <label htmlFor="milestone-title" className="modal__label">
            Milestone
          </label>
          <input
            id="milestone-title"
            type="text"
            className="modal-input"
            value={fieldValues?.title || ""}
            onChange={(e) =>
              setFieldValues({ ...fieldValues, title: e.target.value })
            }
          />
        </div>

        <div className="w-100 milestone-modal__date-inputs d-flex align-items-center justify-content-between">
          <div className="from-group">
            <label className="modal__label">Start Date</label>
            <DatePicker
              className="modal-input"
              format="DD MMMM Y"
              value={
                (fieldValues?.start_date &&
                  moment(fieldValues?.start_date, "YYYY-MM-DD")) ||
                null
              }
              onChange={(value) =>
                setFieldValues({
                  ...fieldValues,
                  start_date: value?.format("YYYY-MM-DD") || "",
                })
              }
            />
          </div>
          <div className="from-group">
            <label className="modal__label">End Date</label>
            <DatePicker
              className="modal-input"
              format="DD MMMM Y"
              value={
                (fieldValues?.end_date &&
                  moment(fieldValues?.end_date, "YYYY-MM-DD")) ||
                null
              }
              onChange={(value) =>
                setFieldValues({
                  ...fieldValues,
                  end_date: value?.format("YYYY-MM-DD") || "",
                })
              }
            />
          </div>
        </div>
        <div className="mt-3 w-100 form-group">
          <label htmlFor="" className="modal__label">
            Assign Users
          </label>
          <CreatableSelect
            isMulti
            // styles={customStyle}
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
        <div className="mt-5 w-100 d-flex align-items-center justify-content-center">
          <button
            onClick={() => {
              dispatch(addUpdateMilestoneRequest({ ...fieldValues }));
              setFieldValues(initialState);
              onClose();
            }}
            className="mx-2 px-4 py-2 project-management__button project-management__button--primary modal-button"
          >
            Submit
          </button>
          <button
            onClick={() => {
              setFieldValues(initialState);
              onClose();
            }}
            className="mx-2 px-4 py-2 project-management__button project-management__button--outlined modal-button"
          >
            Cancel
          </button>
        </div>
      </div>
    </ProjectManagementModal>
  );
}

export default AddEditMilestone;
