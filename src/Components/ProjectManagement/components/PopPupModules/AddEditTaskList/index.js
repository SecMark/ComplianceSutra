import React, { useEffect, useState } from "react";
import "./style.css";
import ProjectManagementModal from "../../ProjectManagementModal";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { addUpdateTaskListRequest } from "../../../redux/actions";

// Initial State
const initialState = {
  milestone_id: null,
  project_id: null,
  title: "",
  task_list_id: null,
};
function AddEditTaskList({ visible, onClose, isEdit, editData }) {
  const [fieldValues, setFieldValues] = useState(editData || initialState);
  const dispatch = useDispatch();
  const milestone_list = useSelector(
    (state) =>
      state?.ProjectManagementReducer?.modalsStatus?.taskListModal
        ?.milestonesList
  );
  useEffect(() => {
    setFieldValues({ ...editData });
  }, [editData]);
  return (
    <ProjectManagementModal
      visible={visible}
      onClose={() => {
        setFieldValues(initialState);
        onClose();
      }}
    >
      <div className="milestone-modal__container d-flex align-items-center flex-column justify-content-center">
        <p className="milestone-modal__heading">Task List</p>
        <div className="form-group">
          <label className="milestone-modal__label">Task List</label>
          <input
            type="text"
            className="modal-input"
            value={fieldValues.title}
            onChange={(e) =>
              setFieldValues({ ...fieldValues, title: e.target.value })
            }
          />
        </div>
        <div className="form-group w-100">
          <label className="milestone-modal__label">Milestone</label>
          <Select
            options={milestone_list || []}
            defaultValue={
              [...milestone_list].filter(
                (item) => item?.value?.milestone_id === editData?.milestone_id
              )[0]
            }
            onChange={(option) => {
              const value = option?.value;
              setFieldValues({
                ...fieldValues,
                milestone_id: value?.milestone_id,
                project_id: value?.project_id,
              });
            }}
          />
        </div>
        <div className="mt-4 w-100 d-flex align-items-center justify-content-center">
          <button
            onClick={() => {
              dispatch(addUpdateTaskListRequest(fieldValues));
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

export default AddEditTaskList;
