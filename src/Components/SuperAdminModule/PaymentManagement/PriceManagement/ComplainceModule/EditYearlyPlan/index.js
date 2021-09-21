import React from "react";
import Select from "react-dropdown-select";

const EditYearlyPlan = (props) => {
  const options = [
    {
      value: "9x",
      label: "9x",
    },
  ];

  return (
    <div>
      <div>
        <label>Tool's Monthly Price</label>
        <input type="text" className="form-control" />
      </div>
      <div>
        <label>Yearly price Calculation</label>
        <div>
          <input type="radio" className="" />
          <span>Yearly price Calculation</span>
          <Select
            options={options}
            dropdownPosition="bottom"
            handle="true"
            direction="ltr"
            dropdownHeight="300px"
          />
        </div>
      </div>
    </div>
  );
};

export default EditYearlyPlan;
