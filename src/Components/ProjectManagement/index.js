import React, { useState, useEffect } from "react";
// import { Link, Route } from "react-router-dom";
import { MdAdd, MdAddBox } from "react-icons/md";
import "./style.css";
import MobileLeftSideBar from "../../CommonModules/sharedComponents/MobileLeftSideBar";
import {
  ProjectManagementHeader,
  ProjectManagementMain,
  ProjectManagementMainContainer,
} from "./components";

import ProjectManagementNavigation from "./components/ProjectManagementNavigation";
import {
  DeleteIconButton,
  EditIconButton,
  SmallIconButton,
} from "./components/Buttons";
import Projects, { ProjectHeader } from "./ProjectDesktop";
const ProjectManagement = () => {
  return (
    <div className="project-management p-0 p-md-4">
      <div className="project-management__container">
        <MobileLeftSideBar />
        <ProjectManagementHeader>
          <div className="w-100 d-flex align-items-center justify-content-between">
            <p className="project-management__header-title mb-0">
              Project & Task
            </p>
          </div>
          <ProjectManagementNavigation />
        </ProjectManagementHeader>
        <ProjectManagementMainContainer>
          {/* Components over the main  */}
          <ProjectHeader />
          <ProjectManagementMain>
            {/* Components of main */}
            <Projects />
            <Projects />
            <Projects />
          </ProjectManagementMain>
        </ProjectManagementMainContainer>
      </div>
    </div>
  );
};

export default ProjectManagement;
