import React from "react";
import styles from "./style.module.scss";

const IconButton = ({
  description,
  disabled,
  variant = "default",
  draggable = false,
  onClick,
  onDragStart,
  size = "small",
  icon,
  disabledVariant,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      onDragStart={onDragStart}
      disabled={disabled}
      draggable={draggable}
      className={
        disabled
          ? `${styles[variant]} ${styles[disabledVariant || "disabled"]} ${
              className || ""
            }`
          : `${styles[variant]} ${styles[size]} ${className || ""}`
      }
    >
      {icon} {description}
    </button>
  );
};

export default IconButton;
