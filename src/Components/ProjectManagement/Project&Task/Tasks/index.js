import React from "react";
import { ProjectTask } from "../../ProjectDesktop";
import "./style.css";
const Tasks = () => {
  return (
    <>
      <div className="project-tasks-list__container p-3 mt-md-3">
        <ProjectTask />
        <ProjectTask />
        <ProjectTask />
        <ProjectTask />
        <ProjectTask />
        <ProjectTask />
        <ProjectTask />
        <ProjectTask />
        <ProjectTask />
      </div>
    </>
  );
};

export default Tasks;
