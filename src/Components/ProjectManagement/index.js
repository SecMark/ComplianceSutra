import React, { useRef, useState, useEffect } from "react";
import Cobg from "../../assets/Images/Onboarding/co-bg.png";
import ListView from "./ProjectView/ListView";
import AddProject from "./AddandEditProject/AddProjectModal";
import AddNewTask from "./AddNewTask/TaskModel";
import "./style.css";

const ProjectDesktop = (props) => {
  const [show, setShow] = useState(false);
  const [showTask, setShowTaskModel] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);
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
              <button onClick={() => setShow(true)}>P +</button>
              <button onClick={()=>setShowTaskModel(true)}>T +</button>
            </div>
          </div>
          <div className="project-view">
            <span className="active">Projects</span>
            <div className="view-progress"></div>
            <span className="inactive second-view">Tasks</span>
            <span className="inactive second-view">Calendar</span>
          </div>
          <ListView />
          <AddProject onClose={() => setShow(false)} show={show} />
          <AddNewTask onClose={() => setShowTaskModel(false)} showTask={showTask}/>
        </div>
      </div>
    </div>
  );
};

export default ProjectDesktop;
