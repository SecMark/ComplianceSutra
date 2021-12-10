import React from "react";
import styles from "./style.module.scss";

const Label = ({ text, variant = "medium" }) => {
  return <label className={styles[variant]}>{text}</label>;
};

export default Label;
