import React, { useState } from "react";
const DateFilters = ({
  currentFilter,
  setDateFilter,
  containerClass,
  filters,
}) => {
  return (
    <div className={`${containerClass} pm__date-filter pm-data__container`}>
      {filters.map((filter) => {
        return (
          <div
            className={`${
              currentFilter === filter &&
              "pm-data__active pm__date-filter-item--active"
            } pm__date-filter-item pm__date-filter-text`}
            onClick={() => setDateFilter(filter)}
          >
            {filter === "day"
              ? "Daily"
              : filter === "week"
              ? "Weekly"
              : filter === "month"
              ? "monthly"
              : null}
          </div>
        );
      })}
    </div>
  );
};

export default DateFilters;
