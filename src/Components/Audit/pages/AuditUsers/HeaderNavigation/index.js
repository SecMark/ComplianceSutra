import React from "react";
import "./style.css";
export const UserManagmentPages = [
  {
    id: "project-management-task",
    value: "CompleteWork",
    buttonName: "Complete Work",
  },
  {
    id: "project-management-project",
    value: "CurrentWork",
    buttonName: "Current Work",
  },
];
export const UserWorkManagmentPages = [
  {
    id: "project-management-task",
    value: "Questionnarie",
    buttonName: "Questionnarie",
  },
  {
    id: "project-management-project",
    value: "Checkpoints",
    buttonName: "Checkpoints",
  },
];
const HeaderNavigation = ({
  containerClass,
  buttonClass,
  currentPageView,
  setCurrentPageView,
  pages,
}) => {
  return (
    <div className={`d-flex w-100 mt-3 align-items-start ${containerClass}`}>
      {pages.map((page) => (
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

export default HeaderNavigation;
