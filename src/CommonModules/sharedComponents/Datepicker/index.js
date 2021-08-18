import React, { useState } from "react";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { DatePicker } from "antd";
import "./style.css";
import moment from "moment";

const Datepicker = ({
  name,
  picker,
  dispatch,
  actionType,
  pageName,
  value,
}) => {
  const onChangeHandler = (date, dateString) => {
    const months = date?._locale?._months;
    const dateArr = dateString.split(" ").map((n, index) => {
      if (index === 1) {
        return months.indexOf(n) + 1;
      } else {
        return parseInt(n);
      }
    });
    dispatch({ type: actionType, payload: dateArr });
  };
  return (
    <div className="form-group">
      {value && value.length === 3 ? (
        <DatePicker
          defaultValue={moment(value?.join("-"), "DD-MM-YYYY")}
          style={{ width: "100%", color: "#000", border: "1px solid #ced4da" }}
          format="DD MMMM Y"
          name={name}
          className={pageName === "newRegulation" ? "date-picker" : "taskhistoryfilter"}
          onChange={onChangeHandler}
        />
      ) : (
        <DatePicker
          style={{ width: "100%", color: "#000", border: "1px solid #ced4da" }}
          format="DD MMMM Y"
          name={name}
          className={pageName === "newRegulation" ? "date-picker" : ""}
          onChange={onChangeHandler}
        />
      )}
    </div>
  );
};

export default Datepicker;
