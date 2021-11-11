import React, { useState, useEffect } from "react";
// import { Link, Route } from "react-router-dom";
import { MdAdd, MdAddBox } from "react-icons/md";
import "./style.css";
import MobileLeftSideBar from "../../CommonModules/sharedComponents/MobileLeftSideBar";
import { useParams, useRouteMatch } from "react-router";
import { Switch, Route } from "react-router-dom";
import ProjectAndTask from "./Project&Task";
import SubTasks from "./SubTasks";
import Milestone from "./Milestone";
const ProjectManagement = () => {
  const { path, url } = useRouteMatch();
  useEffect(() => {
    console.log({ path, url });
  }, []);
  return (
    <div className="project-management p-0 p-md-4">
      <div className="project-management__container">
        <MobileLeftSideBar />
        <Switch>
          <Route exact path={path}>
            <ProjectAndTask />
          </Route>
          <Route exact path={`${path}/project-milestone`}>
            <Milestone />
          </Route>
          <Route exact path={`${path}/project-tasks`}>
            <h1>task list</h1>
          </Route>
          <Route exact path={`${path}/sub-tasks`}>
            <SubTasks />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default ProjectManagement;
