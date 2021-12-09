import React from "react";
import Select from "react-select";
import { DatePicker } from "antd";
import "./style.css";

const AddDetails = (props) => {
  const customStyles = {
    menu: (provided) => ({
      ...provided,
      width: 265,

      color: "black",
    }),
    menuList: (provided) => ({
      ...provided,
      backgroundColor: "white",
      color: "black",
    }),

    container: (provided) => ({
      ...provided,
      width: 265,

      margin: "0px 5px",
      fontSize: "13px",
    }),
    dropdownIndicator: () => ({
      color: "black",
      paddingRight: 4,
    }),

    singleValueLabel: () => ({
      backgroundColor: "white",
      padding: 2,
      margin: 2,
      borderRadius: 8,
    }),
    singleValue: () => ({
      border: "none",
      color: "black",
      fontSize: "85%",
      display: "flex",
    }),
    option: () => ({
      "&:hover": {
        backgroundColor: "#f7f4fe",
      },
      padding: 8,
      marginBottom: 5,
    }),
    indicatorSeparator: () => ({
      backgroundColor: "#f7f4fe",
    }),
    control: () => ({
      backgroundColor: "#e4e4e4",
      opacity: 0.3,
      display: "flex",
      borderRadius: 7,
      height: 40,
      fontWeight: "600",
    }),
  };

  return (
    <div className="row add-discount-details">
      <div className="col-md-6">
        <label>Add Percentage (%) Discount</label>
        <input
          type="text"
          placeholder="25%"
          className="form-control"
          style={{
            backgroundColor: "#e4e4e4",
            opacity: 0.3,
          }}
        />
      </div>
      <div className="col-md-6">
        <label>Add target Audience</label>
        <Select
          options={[
            {
              value: "Available",
              label: "Available",
            },
            {
              value: "Unavailable",
              label: "Unavailable",
            },
          ]}
          styles={customStyles}
          placeholder="Select an option"
        />
      </div>

      <div className="col-md-6 mt-4">
        <label>Select date for applying discount from </label>
        <DatePicker
          style={{
            backgroundColor: "#e4e4e485",
            opacity: 0.3,
            width: 270,
            height: 40,
            borderRadius: "4px",
            fontSize: "13px",

            fontWeight: "600",
            color: "black",
          }}
        />
      </div>
      <div className="col-md-6 mt-4">
        <label>to </label>
        <DatePicker
          style={{
            backgroundColor: "#e4e4e4",
            opacity: 0.3,
            width: 270,
            height: 40,
            borderRadius: "4px",
            fontSize: "13px",

            fontWeight: "600",
            color: "black",
          }}
        />
      </div>
      <div className="col-md-12 mt-4">
        <label>Apply tax on Prices</label>
      </div>
      <div className="col-md-5">
        <input type="radio" value="After Discount" name="discount" />
        <label for="After Discount" className="ml-2">
          After Discount
        </label>
      </div>
      <div className="col-md-5">
        <input type="radio" value="Befor Discount" name="discount" />
        <label for="Befor Discount" className="ml-2">
          Befor Discount
        </label>
      </div>
    </div>
  );
};

export default AddDetails;
