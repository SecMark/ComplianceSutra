import React, { useState } from "react";
import { MdAdd, MdExpandMore, MdMoreHoriz } from "react-icons/md";
import {
  DeleteIconButton,
  EditIconButton,
  SmallIconButton,
} from "../components/Buttons";
import "./style.css";
const Projects = () => {
  const [expandMoreLevel, setExpandMoreLevel] = useState(0);
  return (
    <div className="project-management__project-item my-md-2">
      <div className="project-management__project-data-container d-flex align-items-center w-100 justify-content-between">
        <p className="project-data-container__project-name project-data-container__item">
          Management
        </p>
        <p className="project-data-container__item">1</p>
        <p className="project-data-container__item wide">Rakesh Jhunjhunwala</p>
        <p className="project-data-container__item">3</p>
        <p className="project-data-container__item">4</p>
        <p className="project-data-container__item wide-2">2 Day</p>
        <p className="project-data-container__item wide">16 Aug 2021</p>
        <p className="project-data-container__item wide">16 Aug 2021</p>
        <p className="project-data-container__item">8</p>
        <div className="project-data-container__buttons d-flex justify-content-end align-items-center">
          <SmallIconButton type="outlined" className="mr-3">
            <MdMoreHoriz />
          </SmallIconButton>
          <SmallIconButton
            onClick={() => setExpandMoreLevel(expandMoreLevel >= 1 ? 0 : 1)}
          >
            <MdExpandMore
              className={`icon ${expandMoreLevel >= 1 && "icon__rotate--180"}`}
            />
          </SmallIconButton>
        </div>
      </div>
      {expandMoreLevel >= 1 && (
        <div className="py-2 pl-2 background--grey">
          <div className="project-management__project-item mb-md-2">
            <div className="project-management__project-data-container project-data-container__1 d-flex align-items-center justify-content-between">
              <p className="project-data-container__item project-data-container__project-name text-black">
                Discussion with client
              </p>
              <p className="project-data-container__item">40%</p>
              <p className="project-data-container__item wide">Ashu</p>
              <p className="project-data-container__item">-</p>
              <p className="project-data-container__item">-</p>
              <p className="project-data-container__item wide-2">3 Day</p>
              <p className="project-data-container__item wide">16 Aug 2021</p>
              <p className="project-data-container__item wide">16 Aug 2021</p>
              <p className="project-data-container__item">Ajit Shah</p>
              <div className="project-data-container__buttons d-flex align-items-center justify-content-end">
                <EditIconButton className="mr-2" />
                <DeleteIconButton className="mr-2" />
                <SmallIconButton type="primary" className="mr-2">
                  <MdAdd />
                </SmallIconButton>
                <SmallIconButton
                  onClick={() =>
                    setExpandMoreLevel(expandMoreLevel >= 2 ? 1 : 3)
                  }
                >
                  <MdExpandMore
                    className={`icon ${
                      expandMoreLevel >= 2 && "icon__rotate--180"
                    }`}
                  />
                </SmallIconButton>
              </div>
            </div>
            {expandMoreLevel >= 2 && (
              <div className="py-2 pl-2 background--white">
                <div className="project-management__project-item project-management__project-item-2 mb-md-2">
                  <div className="project-data-container__2 d-flex align-items-center justify-content-between">
                    <p className="project-data-container__project-name project-data-container__item">
                      Project Discuss Meeting
                    </p>
                    <div className="project-data-container__buttons d-flex align-items-center justify-content-between">
                      <SmallIconButton type="outlined" className="mr-3">
                        <MdMoreHoriz />
                      </SmallIconButton>
                      <SmallIconButton
                        onClick={() =>
                          setExpandMoreLevel(expandMoreLevel >= 3 ? 2 : 4)
                        }
                      >
                        <MdExpandMore
                          className={`icon ${
                            expandMoreLevel >= 4 && "icon__rotate--180"
                          }`}
                        />
                      </SmallIconButton>
                    </div>
                  </div>
                  {expandMoreLevel >= 3 && (
                    <div className="py-2 pl-2 background__item-3">
                      <div className="project-data-container__3 d-flex align-items-center justify-content-between">
                        <p className="project-data-container__project-name project-data-container__item">
                          Check the project
                        </p>
                        <p className="project-data-container__item">10%</p>
                        <p className="project-data-container__item wide">
                          Ajit
                        </p>
                        {/* <p className="project-data-container__item">Task</p>
                        <p className="project-data-container__item">
                          Milestone
                        </p> */}
                        <p className="project-data-container__item wide-flex-2">
                          Monthly
                        </p>
                        <p className="project-data-container__item wide-2">
                          0 Days
                        </p>
                        <p className="project-data-container__item wide">
                          16 Aug 2021
                        </p>
                        <p className="project-data-container__item wide">
                          16 Aug 2021
                        </p>
                        <p className="project-data-container__item">Ajit</p>
                        <div className="project-data-container__buttons"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const ProjectHeader = () => (
  <div className="mb-md-2 project-management__project-header project-management__project-data-container d-flex align-items-center w-100 justify-content-between">
    <p className="project-data-container__project-name project-data-container__item">
      Project Name
    </p>
    <p className="project-data-container__item">Completed</p>
    <p className="project-data-container__item wide">Owner</p>
    <p className="project-data-container__item">Task</p>
    <p className="project-data-container__item">Milestone</p>
    <p className="project-data-container__item wide-2">Duration</p>
    <p className="project-data-container__item wide">Start Date</p>
    <p className="project-data-container__item wide">End Date</p>
    <p className="project-data-container__item">Assign</p>
    <div className="project-data-container__buttons"></div>
  </div>
);

export default Projects;
