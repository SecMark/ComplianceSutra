import React from "react";
import { DatePicker } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

import styles from "./style.module.scss";

const Datepicker = ({
  onChange,
  labelText,
  variant = "medium",
  labelVariant = "labelMedium",
  name,
  id,
}) => {
  const { RangePicker } = DatePicker;
  return (
    <>
      <div className={styles.labelContainer}>
        <label className={styles[labelVariant]}>{labelText}</label>
      </div>
      <div>
        <RangePicker
          onChange={onChange}
          format="DD MMMM Y"
          className={styles[variant]}
          name={name}
          onChange={onChange}
          id={id}
        />
      </div>
    </>
  );
};

export default Datepicker;
