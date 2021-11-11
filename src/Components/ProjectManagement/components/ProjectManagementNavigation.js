import React from "react";
import "./style.css";
export const ProjectManagmentPages = [
  {
    id: "project-management-project",
    value: "Project & Task",
    buttonName: "Project",
  },
  {
    id: "project-management-task",
    value: "Task",
    buttonName: "Task",
  },
  {
    id: "project-management-calender",
    value: "Calender",
    buttonName: "Calender",
  },
];

const ProjectManagementNavigation = ({
  containerClass,
  buttonClass,
  currentPageView,
  setCurrentPageView,
}) => {
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