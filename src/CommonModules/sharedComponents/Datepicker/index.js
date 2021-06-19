import * as React from "react";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { DatePicker } from "antd";
import "./style.css";

const Datepicker = ({ name, picker }) => {
  const [value, setValue] = React.useState(null);

  return (
    <DatePicker
      style={{ width: "100%", color: "#000" }}
      format="D MMMM Y"
      name={name}
    />
  );
};

export default Datepicker;
