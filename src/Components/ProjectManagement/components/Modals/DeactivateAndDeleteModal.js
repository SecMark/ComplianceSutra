import React from "react";
import ProjectManagementModal from "../ProjectManagementModal";
import projectDeleteIcon from "../../../../assets/ERIcons/projectDeleteIcon.svg";
import "./style.css";
const DeactivateAndDeleteModal = ({
  iconSrc,
  Icon,
  visible,
  onClose,
  Text,
  onSubmit,
}) => {
  return (
    <ProjectManagementModal visible={visible} onClose={onClose}>
      <div className="d-flex align-items-center flex-column justify-content-center">
        <div className="modal-image modal-image--red-background">
          {/* <img
            src={projectDeleteIcon}
            alt="icon"
            className="project-management__modal-icon-image"
          /> */}
          {iconSrc && (
            <img
              src={projectDeleteIcon}
              alt="icon"
              className="project-management__modal-icon-image"
            />
          )}
          {Icon && <Icon />}
        </div>
        <p className="modal-message my-3">{Text}</p>
        <div
          style={{
            width: "80%",
            margin: "auto",
          }}
          className="mt-2 d-flex align-items-center justify-content-between"
        >
          <button
            style={{
              width: "40%",
            }}
            onClick={onSubmit}
            className="project-management__button project-management__button--primary"
          >
            Yes
          </button>
          <button
            style={{
              width: "40%",
            }}
            onClick={onClose}
            className="project-management__button project-management__button--outlined"
          >
            Cancel
          </button>
        </div>
      </div>
    </ProjectManagementModal>
  );
};

export default DeactivateAndDeleteModal;
