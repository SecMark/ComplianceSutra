import React from "react";
import Select from "react-select";

const customStyles = {
  multiValue: () => ({
    border: "none",
    color: "#9386ad",
    fontSize: "85%",
    display: "flex",
  }),
  multiValueLabel: () => ({
    backgroundColor: "#f7f4fe",
    padding: 2,
    margin: 2,
    borderRadius: 8,
  }),
  indicatorSeparator: () => ({
    backgroundColor: "#f7f4fe",
  }),
  multiValueRemove: () => ({
    paddingTop: 3,
  }),

  dropdownIndicator: () => ({
    color: "black",
    paddingRight: 4,
  }),
};
const Dropdown = ({ options }) => {
  return (
    <div>
      Expert in
      <Select options={options} isMulti styles={customStyles} />
    </div>
  );
};
export default Dropdown;
