import React, { useEffect, useState } from "react";
import "./style.css";
import { DatePicker } from "antd";
import ProjectManagementModal from "../../ProjectManagementModal";
import { useDispatch, useSelector } from "react-redux";
import { addUpdateMilestoneRequest } from "../../../redux/actions";
import CreatableSelect from "react-select/creatable";
import moment from "moment";
import {
  getProjectDateFormat,
  isAfter,
  isBefore,
  isBeforeToday,
} from "../../date.helpers";
import { MdError } from "react-icons/md";
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
  const [fieldErrors, setFieldErrors] = useState({
    isValidate: true,
    start_date: "",
    end_date: "",
    title: "",
  });
  const dispatch = useDispatch();
  const modalsStatus = useSelector(
    (state) => state?.ProjectManagementReducer?.modalsStatus
  );
  const allUsersList = useSelector(
    (state) => state?.ProjectManagementReducer?.usersList
  );
  const dateValiations = modalsStatus?.milestoneModal?.dateValidations;
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
    const { title, start_date, end_date } = fieldValues;
    // if (title !== "" || start_date !== "" || end_date !== "") {
    setFieldErrors({
      isValidate:
        (title === "" && isEdit) ||
        title === "" ||
        // Start Date Validation
        (!isEdit &&
          (start_date === "" ||
            isBefore(dateValiations?.start_date, start_date) ||
            isAfter(dateValiations?.end_date, start_date) ||
            isBeforeToday(start_date) ||
            (end_date !== "" && isAfter(end_date, start_date)))) ||
        // End Date Validation
        (!isEdit &&
          (end_date === "" ||
            isAfter(dateValiations?.end_date, end_date) ||
            isBefore(dateValiations?.start_date, end_date) ||
            isBeforeToday(end_date) ||
            (start_date !== "" && isBefore(start_date, end_date)))),
      start_date:
        start_date !== "" && !isEdit
          ? isBeforeToday(start_date)
            ? "Start date should not be prior to today date."
            : isBefore(dateValiations?.start_date, start_date) ||
              isAfter(dateValiations?.end_date, start_date)
            ? "Start Date should be between " +
              getProjectDateFormat(dateValiations?.start_date) +
              " to " +
              getProjectDateFormat(dateValiations?.end_date)
            : end_date !== "" && isAfter(end_date, start_date)
            ? "Start date should not be later to end date"
            : ""
          : "",
      end_date:
        end_date !== "" && !isEdit
          ? isBeforeToday(end_date)
            ? "End date should not be prior to today date."
            : isAfter(dateValiations?.end_date, end_date) ||
              isBefore(dateValiations?.start_date, end_date)
            ? "End Date should be between " +
              getProjectDateFormat(dateValiations?.start_date) +
              " to " +
              getProjectDateFormat(dateValiations?.end_date)
            : start_date !== "" && isBefore(start_date, end_date)
            ? "End date should not be prior to start date"
            : ""
          : "",
    });
    // }
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
            required
            id="milestone-title"
            type="text"
            className="modal-input"
            value={fieldValues?.title || ""}
            onChange={(e) =>
              setFieldValues({ ...fieldValues, title: e.target.value })
            }
          />
          {fieldErrors?.title !== "" && (
            <p className="add-project-err-msg">{fieldErrors?.title}</p>
          )}
          {isEdit && fieldValues?.title === "" && (
            <p className="add-project-err-msg my-0">
              <MdError />
              &nbsp;Title is required
            </p>
          )}
        </div>

        <div className="w-100 milestone-modal__date-inputs d-flex align-items-start justify-content-between">
          <div className="from-group">
            <label className="modal__label">Start Date</label>
            <DatePicker
              disabled={isEdit}
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
            {fieldErrors?.start_date !== "" && (
              <p className="add-project-err-msg">
                <MdError />
                &nbsp;{fieldErrors?.start_date}
              </p>
            )}
          </div>
          <div className="from-group">
            <label className="modal__label">End Date</label>
            <DatePicker
              // disabled={isEdit && isBeforeToday(dateValiations?.end_date)}
              disabled={isEdit}
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
            {!isEdit && fieldErrors?.end_date !== "" && (
              <p className="add-project-err-msg">
                <MdError />
                &nbsp;{fieldErrors?.end_date}
              </p>
            )}
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
            disabled={fieldErrors?.isValidate}
            className={`mx-2 px-4 py-2 project-management__button project-management__button--primary modal-button ${
              fieldErrors?.isValidate && "project-management__button--disabled"
            }`}
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
