import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router";
import BackDrop from "../../../CommonModules/sharedComponents/Loader/BackDrop";
import MobileLeftSideBar from "../../../CommonModules/sharedComponents/MobileLeftSideBar";
import {
  ProjectManagementHeader,
  ProjectManagementMain,
  ProjectManagementMainContainer,
} from "../components";
import ProjectManagementNavigation, {
  ProjectTrashPages,
} from "../components/ProjectManagementNavigation";
import Milestone from "../Milestone";
import ProjectAndTask from "../Project&Task";
import Project, {
  ProjectHeader,
  TrashMilestone,
  TrashProject,
  TrashTask,
} from "../ProjectDesktop";
import {
  getTrashMilestoneRequest,
  getTrashProjectRequest,
  getTrashTasksRequest,
  getUsersListRequest,
} from "../redux/actions";
import "../style.css";
const Trash = () => {
  const [currentPageView, setCurrentPageView] = useState(ProjectTrashPages[0]);
  const trashData = useSelector(
    (state) => state?.ProjectManagementReducer?.projectManagementTrash
  );
  const dispatch = useDispatch();
  const isLoading = trashData?.isLoading;
  const isDeleteRequestInProgress = useSelector(
    (state) =>
      state?.ProjectManagementReducer?.deleteFromTrashRequestStatus?.isLoading
  );
  const isRestoreRequestInProgress = useSelector(
    (state) =>
      state?.ProjectManagementReducer?.restoreFromTrashRequestStatus?.isLoading
  );

  useEffect(() => {
    if (currentPageView.id === "project-trash-project") {
      dispatch(getTrashProjectRequest());
    } else if (currentPageView.id === "project-trash-milestone") {
      dispatch(getTrashMilestoneRequest());
    } else if (currentPageView.id === "project-trash-tasks") {
      dispatch(getTrashTasksRequest());
    }
  }, [currentPageView]);
  useEffect(() => {
    dispatch(getUsersListRequest());
  }, []);
  return (
    <>
      <BackDrop
        isLoading={
          isLoading || isDeleteRequestInProgress || isRestoreRequestInProgress
        }
      />
      <div className="project-management p-0 p-md-4">
        <div className="project-management__container">
          <MobileLeftSideBar />
          <ProjectManagementHeader>
            <div className="w-100 d-flex align-items-center justify-content-between">
              <p className="project-management__header-title mb-0">Trash</p>
            </div>
            <ProjectManagementNavigation
              currentPageView={currentPageView}
              setCurrentPageView={setCurrentPageView}
              pages={ProjectTrashPages}
            />
          </ProjectManagementHeader>
          <ProjectManagementMainContainer>
            <ProjectHeader
              isTasksHeader={currentPageView.id === "project-trash-tasks"}
            />
            <ProjectManagementMain>
              {currentPageView.id === "project-trash-project" && (
                <>
                  {trashData?.trashProjects &&
                    trashData?.trashProjects.map((project) => {
                      return <TrashProject data={project} />;
                    })}
                </>
              )}
              {currentPageView.id === "project-trash-milestone" && (
                <>
                  {trashData?.trashMilestones &&
                    trashData?.trashMilestones.map((milestone) => {
                      return <TrashMilestone data={milestone} />;
                    })}
                </>
              )}
              {currentPageView.id === "project-trash-tasks" && (
                <>
                  {trashData?.trashTasks &&
                    trashData?.trashTasks.map((task) => {
                      return <TrashTask data={task} />;
                    })}
                </>
              )}
            </ProjectManagementMain>
          </ProjectManagementMainContainer>
        </div>
      </div>
    </>
  );
};

export default Trash;
