import React, { useState } from "react";
const DateFilters = ({
  currentFilter,
  setDateFilter,
  containerClass,
  filters,
}) => {
  return (
    <div
      className={`d-flex pm__date-filter pm-data__container ${containerClass}`}
    >
      {filters.map((filter) => {
        return (
          <div
            className={`${
              currentFilter === filter &&
              "pm-data__active pm__date-filter-item--active"
            } pm__date-filter-item pm__date-filter-text`}
            onClick={() => setDateFilter(filter)}
          >
            {filter}
          </div>
        );
      })}
    </div>
  );
};

export default DateFilters;
