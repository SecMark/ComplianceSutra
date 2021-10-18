import { useEffect, useState } from "react";
import "./style.css";
export const ProjectManagementHeader = ({ children }) => {
  return (
    <div className="project-management__header  mt-3 mt-md-0">
      <div className="project-management__header--border d-flex-align-items-center justify-content-between flex-column">
        {children}
      </div>
    </div>
  );
};
export const ProjectManagementMainContainer = ({ children, className }) => {
  return (
    <div className={`project-management__main-container ${className}`}>
      {children}
    </div>
  );
};
export const ProjectManagementMain = ({ children }) => {
  const [headerHeight, setHeaderHight] = useState(0);
  useEffect(() => {
    const headerRef = document
      .querySelector(".project-management__header")
      .getClientRects()[0].height;
    setHeaderHight(Math.trunc(headerRef));
  }, [children]);
  return (
    <div
      className="project-management__main"
      style={{
        height: `calc(90vh - ${headerHeight + 16}px)`,
      }}
    >
      {children}
    </div>
  );
};
