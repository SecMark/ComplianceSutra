import React from "react";
import { MdAdd, MdChevronLeft } from "react-icons/md";
import { useHistory, useLocation } from "react-router";
import {
  ProjectManagementHeader,
  ProjectManagementMain,
  ProjectManagementMainContainer,
} from "../components";
import { SmallIconButton } from "../components/Buttons";
import { ProjectMilestone, ProjectTask } from "../ProjectDesktop";

const Milestone = () => {
  const history = useHistory();
  const location = useLocation();
  return (
    <>
      <ProjectManagementHeader isNoBorder>
        <div className="mb-3 w-100 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <SmallIconButton className="mr-1" onClick={() => history.goBack()}>
              <MdChevronLeft />
            </SmallIconButton>
            <p className="project-management__header-title mb-0 d-inline-block">
              Milestone
            </p>
          </div>
          <SmallIconButton type="primary" className="mr-2">
            <MdAdd />
          </SmallIconButton>
        </div>
      </ProjectManagementHeader>
      <ProjectManagementMainContainer>
        <ProjectManagementMain className="project-management__main--calender">
          <ProjectMilestone />
          <ProjectMilestone />
          <ProjectMilestone />
        </ProjectManagementMain>
      </ProjectManagementMainContainer>
    </>
  );
};

export default Milestone;
