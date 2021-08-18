import React from "react";
import "./style.css";
import data from "./data";
import { TaskLeftOverview } from "../TasksListByStatus";
const TaskListByCompany = ({ currentTask, setCurrentTask }) => {
  return (
    <>
      <div className="company-task__overview">
        <p className="company__title">{data.Status}</p>
        {data.Details.slice(0, 3).map((item) => {
          return (
            <TaskLeftOverview
              task={item}
              currentTask={currentTask}
              setCurrentTask={setCurrentTask}
            />
          );
        })}
      </div>
    </>
  );
};

export default TaskListByCompany;
