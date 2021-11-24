import React from "react";
import { DeleteIconButton } from "../Buttons";
import ProjectManagementModal from "../ProjectManagementModal";
import projectDeleteIcon from "../../../../assets/ERIcons/projectDeleteIcon.svg";
import "./style.css";
const DeactivateAndDeleteModal = ({
  iconSrc,
  Icon,
  visible,
  onClose,
  Text,
  onOk,
}) => {
  return (
    <ProjectManagementModal visible={visible} onClose={onClose}>
      <div className="d-flex align-items-center flex-column justify-content-center">
        <div className="modal-image">
          <img
            src={projectDeleteIcon}
            alt="icon"
            className="project-management__modal-icon-image"
          />
          {/* {iconSrc && (
            <img
              src={projectDeleteIcon}
              alt="icon"
              className="project-management__modal-icon-image"
            />
          )}
          {Icon && Icon} */}
        </div>
        <p className="modal-message my-3">Are you sure to delete this file ?</p>
      </div>
    </ProjectManagementModal>
  );
};

export default DeactivateAndDeleteModal;
