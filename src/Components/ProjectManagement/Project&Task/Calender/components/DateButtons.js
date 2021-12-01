import moment from "moment";
import React from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import constant from "../../../../../CommonModules/sharedComponents/constants/constant";

const DateButtons = ({
  setDays,
  activeDays,
  monthDate,
  weekStartDate,
  addDaysInDate,
  dayDate,
}) => {
  return (
    <div className="mb-3 mb-md-0 pm-data__container pm-date__container d-flex align-items-center justify-content-between">
      <AiOutlineLeft
        className="mr-2 pm-data__active pm-calender-view__header-navigation--arrow"
        onClick={() => setDays(activeDays, constant.decrement)}
      />
      {activeDays === constant.day && (
        <>
          <span className="pm__date-filter-text">
            {moment(dayDate).format("MMMM D,  ddd")}
          </span>
        </>
      )}

      {activeDays === constant.week && (
        <span className="pm__date-filter-text">
          {`${moment(weekStartDate).format("ddd D")}-${moment(
            addDaysInDate(weekStartDate, 7)
          ).format("ddd D,YYYY")}`}
        </span>
      )}

      {activeDays === constant.month && (
        <span
          className="pm__date-filter-text"
          // onClick={() => setIsShowSmallCalender(!isShowSmallCalender)}
          style={{ cursor: "pointer" }}
        >
          {`${moment(monthDate).format("MMMM")}`}
        </span>
      )}

      <AiOutlineRight
        className="ml-2 pm-data__active pm-calender-view__header-navigation--arrow"
        onClick={() => setDays(activeDays, constant.increment)}
      />
    </div>
  );
};

export default DateButtons;
