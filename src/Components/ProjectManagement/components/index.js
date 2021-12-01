import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import "./style.css";
export const ProjectManagementHeader = ({ children, isNoBorder }) => {
  return (
    <div className="project-management__header  mt-3 mt-md-0">
      <div
        className={`${
          !isNoBorder && "project-management__header--border"
        } d-flex-align-items-center justify-content-between flex-column`}
      >
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
export const ProjectManagementMain = ({ children, className }) => {
  const [headerHeight, setHeaderHight] = useState(0);
  useEffect(() => {
    const headerRef = document
      .querySelector(".project-management__header")
      .getClientRects()[0].height;
    setHeaderHight(Math.trunc(headerRef));
  }, [children]);
  return (
    <div
      className={`project-management__main ${className}`}
      style={{
        height: `calc(95vh - ${headerHeight + (isMobile ? 32 : 96) || 26}px)`,
      }}
    >
      {children}
    </div>
  );
};
