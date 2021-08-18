import React, { useState } from "react";
import data from "./data";
import { TaskLeftOverview } from "../TasksListByStatus";
import upArrow from "../../../../../assets/Icons/topArrowAccordian.png";
const TaskListByTeam = ({ currentTask, setCurrentTask }) => {
  const [expendedViewAll, setExpendedViewAll] = useState([]);
  console.log(data);
  const handleExpandViewAll = (flag, index) => {
    let temporaryViewAllList = [...expendedViewAll];
    if (flag) {
      temporaryViewAllList.push(index);
    } else {
      temporaryViewAllList = temporaryViewAllList.filter(
        (item) => item !== index
      );
    }
    setExpendedViewAll(temporaryViewAllList);
  };
  return (
    <div className="company-task__overview">
      {data.map((dataByTeam, index) => {
        const teamTitle = dataByTeam.Status;
        const tasks = dataByTeam.Details;
        const tasksLength = tasks.length;
        return (
          <>
            <p className="company__title mb-0">{teamTitle}</p>
            {tasks.slice(0, 3).map((item) => {
              return (
                <TaskLeftOverview
                  task={item}
                  currentTask={currentTask}
                  setCurrentTask={setCurrentTask}
                />
              );
            })}
            {!expendedViewAll.includes(index) && tasksLength > 3 && (
              <div
                className="view-all-tasks d-flex align-items-center m-3"
                onClick={() => handleExpandViewAll(true, index)}
              >
                <p className="view-all-tasks--title mb-0 mr-2">
                  view all {tasksLength - 3} more
                </p>
                <img
                  src={upArrow}
                  alt="arrow"
                  className={`by-status__item--accordion-arrow ${
                    !expendedViewAll.includes(index) && "accordion-arrow-down"
                  }`}
                />
              </div>
            )}
            {expendedViewAll.includes(index) && tasksLength > 3 && (
              <>
                {tasks.slice(3, tasksLength).map((item) => {
                  return (
                    <TaskLeftOverview
                      task={item}
                      currentTask={currentTask}
                      setCurrentTask={setCurrentTask}
                    />
                  );
                })}
                <div
                  className="view-all-tasks d-flex align-items-center m-3"
                  onClick={() => handleExpandViewAll(false, index)}
                >
                  <p className="view-all-tasks--title mb-0 mr-2">show less</p>
                  <img
                    src={upArrow}
                    alt="arrow"
                    className="by-status__item--accordion-arrow"
                  />
                </div>
              </>
            )}
          </>
        );
      })}
    </div>
  );
};

export default TaskListByTeam;
