import React from "react";
import Task from "./Task";
import moment from "moment";
const WeekView = ({ sevenDays }) => {
  return (
    <>
      <table className="d-none d-md-table table pm-week-table w-100">
        <thead>
          <tr className="pm-data__container" style={{ borderRadius: "8px" }}>
            {sevenDays.map((day) => (
              <th
                className="d-none d-md-table-cell pm-data__text"
                key={day?.day}
              >
                {day?.day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {sevenDays &&
              sevenDays.map((data, index) => {
                return (
                  <td>
                    <Task
                      containerClass="mx-auto mb-2"
                      background={index % 2 === 0 && "light"}
                    />
                    {index % 3 === 0 && (
                      <Task
                        containerClass="mx-auto mb-2"
                        background={index % 2 === 0 && "light"}
                      />
                    )}

                    <Task
                      containerClass="mx-auto mb-2"
                      background={index % 2 === 0 && "light"}
                    />
                    {index % 4 === 0 && (
                      <>
                        <Task
                          containerClass="mx-auto mb-2"
                          background={index % 3 === 0 && "light"}
                        />
                        <Task
                          containerClass="mx-auto mb-2"
                          background={index % 2 === 0 && "light"}
                        />
                      </>
                    )}
                  </td>
                );
              })}
          </tr>
        </tbody>
      </table>
      <div className="d-md-none pm-calender-view__month">
        {sevenDays &&
          sevenDays.map((weekDay) => {
            const day = moment(weekDay.date).format("ddd");
            const dayDate = moment(weekDay.date).format("DD");
            const compareDate = moment(weekDay.date).format("YYYY-MM-DD");
            const currentDate = moment(new Date()).format("YYYY-MM-DD");
            return (
              <>
                <div
                  className={`pm-calender-view__week-day-container ${
                    currentDate === compareDate &&
                    "pm-calender-view__week-day-container--active"
                  }`}
                >
                  <p className="mb-0 text-center pm-calender-view__week-day-name pm__date-filter-text">
                    {day}
                  </p>
                  <p className="mb-0 text-center pm-calender-view__week-day-date pm__date-filter-text">
                    {dayDate}
                  </p>
                </div>
              </>
            );
          })}
      </div>
      <div className="d-md-none pm-calender-view__mobile-task-list mt-3">
        <Task />
        <Task />
        <Task />
        <Task />
      </div>
    </>
  );
};

export default WeekView;
