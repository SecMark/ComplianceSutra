import React from "react";
import styles from "./style.module.scss";

const Text = ({ heading, text, variant = "default", size = "none" }) => {
  return (
    <>
      {heading === "h1" && (
        <h1 className={`${styles[variant]} ${styles[size]}`}>{text}</h1>
      )}
      {heading === "h2" && (
        <h2 className={`${styles[variant]} ${styles[size]}`}>{text}</h2>
      )}
      {heading === "h3" && (
        <h3 className={`${styles[variant]} ${styles[size]}`}>{text}</h3>
      )}
      {heading === "h4" && (
        <h4 className={`${styles[variant]} ${styles[size]}`}>{text}</h4>
      )}
      {heading === "h5" && (
        <h5 className={`${styles[variant]} ${styles[size]}`}>{text}</h5>
      )}
      {heading === "h6" && (
        <h6 className={`${styles[variant]} ${styles[size]}`}>{text}</h6>
      )}
      {heading === "p" && (
        <p className={`${styles[variant]} ${styles[size]}`}>{text}</p>
      )}
      {heading === "span" && (
        <span className={`${styles[variant]} ${styles[size]}`}>{text}</span>
      )}
    </>
  );
};

export default Text;
