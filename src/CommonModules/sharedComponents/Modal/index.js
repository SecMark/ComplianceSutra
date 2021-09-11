import React from "react";
import { useOuterClick } from "../../../Components/OnBording/SubModules/DashBoardCO/components/RightSideGrid/outerClick";
import "./style.css";
const Modal = ({ children, isOpen, onClose }) => {
  const modalRef = useOuterClick(onClose);
  return (
    <div
      className="modal-overlay-background"
      style={{
        display: !isOpen && "none",
      }}
    >
      <div className="modal-background-gradient" ref={modalRef}>
        <div className="modal-inner-container">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
