import React, { useState } from "react";
import { useCallback } from "react";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import Select from "react-select";
import { toast } from "react-toastify";
import Modal from "../../../../../CommonModules/sharedComponents/Modal";
import constant from "../../../../../CommonModules/sharedComponents/constants/constant";
import "./style.css";
// temprary array for expert reviewer list
const options = [
  { value: 1, label: "Ashu Kumar" },
  { value: 2, label: "Virat Kohli" },
  { value: 3, label: "Rohit Sharma" },
  { value: 4, label: "Surya Kumar Yadav" },
];
const TaskMigrationModal = ({ isOpen, setIsOpen }) => {
  const [migrateTo, setMigrateTo] = useState(1);
  const [migrateToReviewer, setMigrateToReviewer] = useState(null);
  const handleClose = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
      setMigrateToReviewer(null);
    }
  }, [isOpen]);
  const handleMigrateTask = useCallback(() => {
    if (
      migrateToReviewer !== null &&
      Object.keys(migrateToReviewer).length !== 0
    ) {
      toast.dark(constant.MigrateTaskMessages.success, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      handleClose(); // closing modal after migrating task
    }
  }, [migrateToReviewer]);
  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <h4 class="mb-3">Where do you want to Migrate this task?</h4>
      <div className="task-migration__item d-flex align-items-start mb-3">
        <div
          className="task-migration__item-left"
          onClick={useCallback(() => setMigrateTo(1), [migrateTo])}
        >
          {migrateTo === 1 ? (
            <MdRadioButtonChecked />
          ) : (
            <MdRadioButtonUnchecked />
          )}
        </div>
        <div className="task-migration__item-right mx-2">
          <p
            className={`task-migration__item-heading mb-0 ${
              migrateTo !== 1 && "task-migration__item-heading--unactive"
            }`}
            onClick={useCallback(() => setMigrateTo(1), [migrateTo])}
          >
            Assign task to Fellow Expert Reviewer
          </p>
          <div className="mt-2">
            <Select
              options={options}
              value={migrateToReviewer}
              placeholder="Select Expert Reviewer"
              onChange={(expertReviewer) =>
                setMigrateToReviewer(expertReviewer)
              }
            />
          </div>
        </div>
      </div>
      <div className="task-migration__item d-flex align-items-start mt-2">
        <div
          className="task-migration__item-left"
          onClick={useCallback(() => setMigrateTo(2), [migrateTo])}
        >
          {migrateTo === 2 ? (
            <MdRadioButtonChecked />
          ) : (
            <MdRadioButtonUnchecked />
          )}
        </div>
        <div className="task-migration__item-right mx-2">
          <p
            className={`task-migration__item-heading mb-0  ${
              migrateTo !== 2 && "task-migration__item-heading--unactive"
            }`}
            onClick={useCallback(() => setMigrateTo(2), [migrateTo])}
          >
            Migrate task to Super Admin
          </p>
        </div>
      </div>
      <div className="mt-4 mb-0">
        <button className="modal__button" onClick={handleMigrateTask}>
          migrate task
        </button>
        <button
          className="modal__button modal__button--stroke"
          onClick={handleClose}
        >
          cancel
        </button>
      </div>
    </Modal>
  );
};

export default TaskMigrationModal;
