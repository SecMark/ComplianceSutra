import React from "react";
import Searchable from "react-searchable-dropdown";
import Datepicker from "../../../CommonModules/sharedComponents/Datepicker";

import "./style.css";

const options = [
  { name: "Swedish", value: "sv" },
  { name: "English", value: "en" },
  {
    type: "group",
    name: "Group name",
    items: [{ name: "Spanish", value: "es" }],
  },
];

const NewRegulationFilter = ({ label }) => {
  return (
    <div className="filter-form">
      <div>
        <label>Issuer</label>
        <Searchable
          className="search-dropdown"
          placeholder="Select issuer"
          notFoundText="No result found"
          listMaxHeight={200}
          options={options}
        />
      </div>
      <div>
        <label>Industry</label>
        <Searchable
          className="l"
          placeholder="Select Industry"
          notFoundText="No result found"
          listMaxHeight={200}
          options={options}
        />
      </div>
      <div>
        <label>Topic</label>
        <Searchable
          className=""
          placeholder="Select Topic"
          notFoundText="No result found"
          listMaxHeight={200}
          options={options}
        />
      </div>
      <div>
        <label>From</label>
        <Datepicker pageName="newRegulation" />
      </div>
      <div>
        <label>To</label>
        <Datepicker pageName="newRegulation" />
      </div>

      <button className="view-updates-active">View Updates</button>
    </div>
  );
};

export default NewRegulationFilter;
