import { DatePicker } from "antd";
import React from "react";
import Select from "react-dropdown-select";
import "./style.css";

const EditYearlyPlan = (props) => {
  const options = [
    {
      value: "9x",
      label: "9x",
    },
  ];

  return (
    <div className="edit-year-plan--container">
      <div>
        <label>Tool's Monthly Price</label>
        <input type="text" className="form-control" style={{width:"200px"}}/>
      </div>
      <div className="mt-4">
        <label>Yearly price Calculation</label>
        <div className="edit-yearly-plan-calculuation row">
          <div className="col-md-1 p-0">
            <input type="radio" className="" />
          </div>
          <div className="col-md-3 p-0">
            <p>Yearly price Calculation</p>
          </div>
          <div className="col-md-2 p-0">
            <Select
              options={options}
              dropdownPosition="bottom"
              handle="true"
              direction="ltr"
              dropdownHeight="300px"
              style={{ width: "80px" }}
            />
          </div>
          <div className="col-md-3 p-0">
            <p>
              Yearly Price of the tool will be of the Monthly charges (₹12000)
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="d-flex">
          <input type="radio" />
          <label className="ml-2">Add custom price</label>
          <input
            type="text"
            className="form-control ml-2"
            style={{ width: "150px" }}
          />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <label>Select date for applying price changes from </label>
          <DatePicker className="form-control" />
        </div>
        <div className="col-md-6 mt-4">
          <label>to</label>
          <DatePicker className="form-control" />
        </div>
      </div>
    </div>
  );
};

export default EditYearlyPlan;
