import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";
import { SmallIconButton } from "./Buttons";
// import { useOuterClick } from "../../OnBording/SubModules/DashBoardCO/components/RightSideGrid/outerClick";
const ProjectManagementModal = ({
  visible,
  onClose,
  children,
  isNotCloseable,
}) => {
  // const modalRef = useOuterClick(onClose);
  useEffect(() => {
    if (visible) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [visible]);
  return (
    visible && (
      <div
        className="project-management__modal-wrapper"
        style={{
          ...(!visible && {
            zIndex: -1,
            opacity: 0,
            pointerEvents: "none",
            display: "none",
            height: "0",
            width: "0",
          }),
        }}
      >
        <div className="project-management__small-modal">
          {!isNotCloseable && (
            <SmallIconButton
              onClick={onClose}
              className="project-management__modal-close-btn"
            >
              <MdClose />
            </SmallIconButton>
          )}

          {children}
        </div>
      </div>
    )
  );
};

export default ProjectManagementModal;
