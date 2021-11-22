import React, { useRef, useState } from "react";
import Cobg from "../../assets/Images/Onboarding/co-bg.png";
import ListView from "./ProjectView/ListView";
import "./style.css";

const ProjectDesktop = (props) => {
  return (
    <div className="row co-dashboard fix-top">
      <div className=" left-fixed ">
        <div className="on-boarding"></div>
      </div>
      <div className="col-12 ">
        <img className="right-bg" src={Cobg} alt="" />
        <div className="project-management-container">
          <div className="project-mangement-header">
            <div className="project-mangement-title">Projects & Task</div>

            <div className="project-task-button">
              <button>P +</button>
              <button>T +</button>
            </div>
          </div>

          <div className="project-view">
            <span className="active">Projects</span>
            <div className="view-progress"></div>
            <span className="inactive second-view">Tasks</span>
            <span className="inactive second-view">Calendar</span>
          </div>
          <ListView />
        </div>
      </div>
    </div>
  );
};

export default ProjectDesktop;
