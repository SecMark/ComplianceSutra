import React from "react";
import styles from "./style.module.scss";

export const Button = ({
  description,
  disabled,
  variant = "default",
  draggable = false,
  onClick,
  onDragStart,
  size = "small",
  id,
}) => {
  return (
    <button
      onClick={onClick}
      onDragStart={(event) => onDragStart(event, id)}
      disabled={disabled}
      draggable={draggable}
      className={
        disabled ? styles.disabled : `${styles[variant]} ${styles[size]}`
      }
    >
      {description}
    </button>
  );
};

export default Button;
