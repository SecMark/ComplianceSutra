import React from "react";
import "./style.css";
import projectDeleteIcon from "../../../assets/ERIcons/projectDeleteIcon.svg";
import editProjecticon from "../../../assets/ERIcons/editProject.svg";
export const SmallIconButton = ({
  children,
  type = "primary" | "danger" | "outlined",
  onClick,
  className,
  title,
}) => {
  return (
    <button
      title={title}
      onClick={onClick}
      className={`${className} project-management__small-icon-button project-management__small-icon-button--${
        type === "primary"
          ? "primary"
          : type === "danger"
          ? "danger"
          : type === "outlined"
          ? "outlined"
          : type === "grey"
          ? "grey"
          : ""
      }`}
    >
      {children}
    </button>
  );
};

export const EditIconButton = ({ onClickHandler, className }) => (
  <SmallIconButton
    onClick={onClickHandler}
    type="primary"
    className={className}
    title="Edit"
  >
    <img
      src={editProjecticon}
      alt="edit-icon"
      width="24px"
      height="24px"
      className="p-1"
    />
  </SmallIconButton>
);
export const DeleteIconButton = ({ onClickHandler, className }) => (
  <SmallIconButton
    title="Delete"
    onClick={onClickHandler}
    type="danger"
    className={className}
  >
    <img
      src={projectDeleteIcon}
      alt="edit-icon"
      width="26px"
      height="26px"
      style={{ padding: "4px" }}
    />
  </SmallIconButton>
);
