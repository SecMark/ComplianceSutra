import React, { useState } from "react";
import "./style.css";
const ProjectManagmentPages = [
  {
    id: "project-and-task",
    value: "Project & Task",
    buttonName: "Project",
  },
  {
    id: "project-mangament-task",
    value: "Task",
    buttonName: "Task",
  },
  {
    id: "project-mangament-calender",
    value: "Calender",
    buttonName: "Calender",
  },
];

const ProjectManagementNavigation = ({ containerClass, buttonClass }) => {
  const [currentPageView, setCurrentPageView] = useState(
    ProjectManagmentPages[0]
  );
  return (
    <div className={`d-flex w-100 mt-3 align-items-start ${containerClass}`}>
      {ProjectManagmentPages.map((page) => (
        <p
          key={page.id}
          className={`${buttonClass} mb-0 project-management__page-display mr-4 px-1 text-center ${
            currentPageView.buttonName === page.buttonName
              ? "project-management__text--active project-management__page-display--active"
              : ""
          }`}
          onClick={() => setCurrentPageView(page)}
        >
          {page.buttonName}
        </p>
      ))}
    </div>
  );
};

export default ProjectManagementNavigation;
