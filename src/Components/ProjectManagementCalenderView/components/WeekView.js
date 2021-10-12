import React from "react";
import Task from "./Task";

const WeekView = ({ sevenDays }) => {
  return (
    <table className="table pm-week-table w-100">
      <thead>
        <tr className="pm-data__container" style={{ borderRadius: "8px" }}>
          {sevenDays.map((day) => (
            <th className="pm-data__text" key={day?.day}>
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
  );
};

export default WeekView;
