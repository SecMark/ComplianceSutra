import React, { useRef, useState } from "react";
import Cobg from "../../../assets/Images/Onboarding/co-bg.png";
import SideBarInputControl from "../../OnBording/SubModules/SideBarInputControl";
import "./style.css";

const ProjectDesktop = (props) => {
  return (
    <div className="row co-dashboard fix-top">
      <div className=" left-fixed ">
        <div className="on-boarding"></div>
      </div>
      <div className="col-12 ">
        <img className="right-bg" src={Cobg} alt="" />
        <div className="project-management-container"></div>
      </div>
    </div>
  );
};

export default ProjectDesktop;
