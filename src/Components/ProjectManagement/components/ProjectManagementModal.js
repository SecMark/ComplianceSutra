import { Modal } from "antd";
import React from "react";
import { MdClose } from "react-icons/md";
import { SmallIconButton } from "./Buttons";
import { useOuterClick } from "../../OnBording/SubModules/DashBoardCO/components/RightSideGrid/outerClick";
const ProjectManagementModal = ({ visible, onClose, children }) => {
  const modalRef = useOuterClick(onClose);
  return (
    <div
      className="project-management__modal-wrapper"
      style={{
        ...(!visible && {
          zIndex: -1,
          opacity: 0,
          pointerEvents: "none",
        }),
      }}
    >
      <div ref={modalRef} className="project-management__small-modal">
        <SmallIconButton
          onClick={onClose}
          className="project-management__modal-close-btn"
        >
          <MdClose />
        </SmallIconButton>
        {children}
      </div>
    </div>
  );
};

export default ProjectManagementModal;
