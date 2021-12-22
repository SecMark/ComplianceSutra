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
}) => {
  return (
    <button
      onClick={onClick}
      onDragStart={onDragStart}
      disabled={disabled}
      draggable={draggable}
      className={
        disabled ? styles.disabled : `${styles[variant]} ${styles[size]}`
      }
    >
      {icon} {description}
    </button>
  );
};

export default IconButton;
