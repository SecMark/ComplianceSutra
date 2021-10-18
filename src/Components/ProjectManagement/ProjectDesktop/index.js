import { Progress } from "antd";
import React, { useState } from "react";
import {
  MdAdd,
  MdExpandMore,
  MdMoreHoriz,
  MdTextsms,
  MdCheckCircle,
  MdRadioButtonChecked,
} from "react-icons/md";
import {
  IoBanOutline,
  IoCalendarOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";
import {
  DeleteIconButton,
  EditIconButton,
  SmallIconButton,
} from "../components/Buttons";
import { RiMessage2Fill } from "react-icons/ri";
import "./style.css";
const Project = () => {
  const [expandMoreLevel, setExpandMoreLevel] = useState(0);
  return (
    <>
      {/* Desktop Component */}
      <div className="d-none d-md-block project-management__project-item my-md-2">
        <div className="project-management__project-data-container d-flex align-items-center w-100 justify-content-between">
          <p className="project-data-container__project-name project-data-container__item">
            Management
          </p>
          <p className="project-data-container__item">1</p>
          <p className="project-data-container__item wide">
            Rakesh Jhunjhunwala
          </p>
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
                className={`icon ${
                  expandMoreLevel >= 1 && "icon__rotate--180"
                }`}
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
                      <div className="py-2 px-2 background__item-3">
                        {/* Last Component */}
                        <div className="project-data-container__3 d-flex align-items-center justify-content-between">
                          <p className="project-data-container__project-name project-data-container__item">
                            Check the project
                          </p>
                          <p className="project-data-container__item">10%</p>
                          <p className="project-data-container__item wide">
                            Ajit
                          </p>
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
                          <div className="project-data-container__buttons d-flex justify-content-end align-items-center">
                            <SmallIconButton type="grey" className="p-2 mr-2">
                              <MdTextsms className="icon__small" />
                            </SmallIconButton>
                            <EditIconButton className="mr-2" />
                            <SmallIconButton type="grey" className="p-2 mr-2">
                              <MdCheckCircle className="icon__small" />
                            </SmallIconButton>
                            <SmallIconButton type="grey" className="p-2">
                              <MdRadioButtonChecked className="icon__small" />
                            </SmallIconButton>
                          </div>
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
      {/* Mobile Component */}
      <div className="d-flex d-md-none project-management__project-container-mobile mb-3 p-2 py-3">
        <div className="w-100">
          {/* Title */}
          <div className="d-flex align-items-center justify-content-between mb-3">
            <p className="project-container-mobile__data-title flex-grow-1 mb-0">
              Management Design
            </p>
            {/* <SmallIconButton type="grey" className="mx-2">
              <IoCheckmarkCircleOutline />
            </SmallIconButton>
            <SmallIconButton type="grey">
              <IoBanOutline />
            </SmallIconButton> */}
          </div>
          <div className="d-flex justify-content-between w-100 align-items-center">
            <div className="project-container-mobile__data">
              {/* Data */}
              <div className="d-grid project-container-mobile__data-container">
                <div className="project-container-mobile__data-item">
                  <p className="project-data-container__item project-container-mobile__data-item-title">
                    Owner
                  </p>
                  <p className="project-data-container__item">Ashu</p>
                </div>
                <div className="project-container-mobile__data-item">
                  <p className="project-data-container__item project-container-mobile__data-item-title">
                    Task
                  </p>
                  <p className="project-data-container__item">2/2</p>
                </div>
                <div className="project-container-mobile__data-item">
                  <p className="project-data-container__item project-container-mobile__data-item-title">
                    Milestone
                  </p>
                  <p className="project-data-container__item">0/1</p>
                </div>
                <div className="project-container-mobile__data-item">
                  <p className="project-data-container__item project-container-mobile__data-item-title">
                    Duration
                  </p>
                  <p className="project-data-container__item">2 Days</p>
                </div>
              </div>
            </div>
            <div className="project-container-mobile__progress px-3">
              {/* Progress Bar */}
              <Progress
                trailColor="tranparent"
                type="circle"
                percent={66}
                width={70}
                strokeColor="#7A73FF"
                strokeWidth={11}
              />
            </div>
          </div>
          {/* Bottom Data */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            {/* Start Date and End Date */}
            <p className="project-data-container__item flex-grow-1 text-left">
              <IoCalendarOutline /> 14 Aug, 2021 To 21 Aug, 2021
            </p>
            <EditIconButton className="mx-2" />
            <DeleteIconButton />
            {/* Edit and Delete Button */}
          </div>
        </div>
      </div>
    </>
  );
};

export const ProjectMilestone = () => {
  return (
    <div className="d-flex d-md-none project-management__project-container-mobile mb-3 p-2 py-3">
      <div className="w-100">
        {/* Title */}
        <div className="d-flex align-items-center justify-content-between mb-3">
          <p className="project-container-mobile__data-title flex-grow-1 mb-0">
            Discussion with Client (Milestone)
          </p>
          {/* <SmallIconButton type="grey" className="mx-2">
          <IoCheckmarkCircleOutline />
        </SmallIconButton>
        <SmallIconButton type="grey">
          <IoBanOutline />
        </SmallIconButton> */}
        </div>
        <div className="d-flex justify-content-between w-100 align-items-center">
          <div className="project-container-mobile__data">
            {/* Data */}
            <div className="d-grid project-container-mobile__data-container mb-3">
              <div className="project-container-mobile__data-item">
                <p className="project-data-container__item project-container-mobile__data-item-title">
                  Owner
                </p>
                <p className="project-data-container__item">Ashu</p>
              </div>
              <div className="project-container-mobile__data-item">
                <p className="project-data-container__item project-container-mobile__data-item-title">
                  Assign to
                </p>
                <p className="project-data-container__item">Ashu Kumar</p>
              </div>
            </div>
            <div className="d-flex mb-3">
              <p className="project-data-container__item project-container-mobile__data-item-title mr-4 mb-0">
                Owner
              </p>
              <p className="project-data-container__item mb-0">Ashu</p>
            </div>
          </div>
          <div className="project-container-mobile__progress px-3">
            {/* Progress Bar */}
            <Progress
              trailColor="tranparent"
              type="circle"
              percent={66}
              width={70}
              strokeColor="#7A73FF"
              strokeWidth={11}
            />
          </div>
        </div>
        {/* Bottom Data */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          {/* Start Date and End Date */}
          <p className="project-data-container__item flex-grow-1 text-left">
            <IoCalendarOutline /> 14 Aug, 2021 To 21 Aug, 2021
          </p>
          <EditIconButton className="mx-2" />
          <DeleteIconButton />
          {/* Edit and Delete Button */}
        </div>
      </div>
    </div>
  );
};

export const ProjectSubTask = () => {
  return (
    <div className="d-flex d-md-none project-management__project-container-mobile mb-3 p-2 py-3">
      <div className="w-100">
        {/* Title */}
        <div className="d-flex align-items-center justify-content-between mb-3">
          <p className="project-container-mobile__data-title flex-grow-1 mb-0">
            Discussion with Client (Milestone)
          </p>
          <SmallIconButton type="grey" className="mx-2">
            <IoCheckmarkCircleOutline />
          </SmallIconButton>
          <SmallIconButton type="grey">
            <IoBanOutline />
          </SmallIconButton>
        </div>
        <div className="d-flex justify-content-between w-100 align-items-center">
          <div className="project-container-mobile__data">
            {/* Data */}
            <div className="d-grid project-container-mobile__data-container mb-3">
              <div className="project-container-mobile__data-item">
                <p className="project-data-container__item project-container-mobile__data-item-title">
                  Owner
                </p>
                <p className="project-data-container__item">Ashu</p>
              </div>
              <div className="project-container-mobile__data-item">
                <p className="project-data-container__item project-container-mobile__data-item-title">
                  Assign to
                </p>
                <p className="project-data-container__item">Ashu Kumar</p>
              </div>
            </div>
            {/* Data (Row) */}
            <div className="d-flex mb-3">
              <p className="project-data-container__item project-container-mobile__data-item-title project-container-mobile__sub-task-text mr-4 mb-0">
                Duration
              </p>
              <p className="project-data-container__item project-container-mobile__sub-task-text mb-0">
                : 3 days
              </p>
            </div>
            <div className="d-flex mb-3">
              <p className="project-data-container__item project-container-mobile__sub-task-text project-container-mobile__data-item-title mr-4 mb-0">
                Schedule Date
              </p>
              <p className="project-container-mobile__sub-task-text project-data-container__item mb-0">
                : 2 Aug, 2021
              </p>
            </div>
            <div className="d-flex mb-3">
              <p className="project-container-mobile__sub-task-text project-data-container__item project-container-mobile__data-item-title mr-4 mb-0">
                Actual End Date
              </p>
              <p className="project-container-mobile__sub-task-text project-data-container__item mb-0">
                : 21 Aug, 2021
              </p>
            </div>
          </div>
          <div className="project-container-mobile__progress px-3">
            {/* Progress Bar */}
            <Progress
              trailColor="tranparent"
              type="circle"
              percent={66}
              width={70}
              strokeColor="#7A73FF"
              strokeWidth={11}
            />
          </div>
        </div>
        {/* Bottom Data */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          {/* Start Date and End Date */}
          <p className="project-data-container__item flex-grow-1 text-left">
            <IoCalendarOutline /> 14 Aug, 2021 To 21 Aug, 2021
          </p>
          {/* Message and Edit Button */}
          <SmallIconButton type="grey" className="mx-2 icon__small p-1">
            <RiMessage2Fill />
          </SmallIconButton>
          <EditIconButton />
        </div>
      </div>
    </div>
  );
};

export const ProjectHeader = () => (
  <div className="d-none d-md-flex mb-md-2 project-management__project-header project-management__project-data-container align-items-center w-100 justify-content-between">
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

export const ProjectTask = () => {
  return (
    <div className="project-data-container__2 d-flex align-items-center justify-content-between">
      <p className="project-data-container__project-name project-data-container__item flex-grow-1">
        Project Discuss Meeting
      </p>
      <div className="project-data-container__buttons d-flex align-items-center justify-content-between">
        <SmallIconButton type="outlined">
          <MdMoreHoriz />
        </SmallIconButton>
      </div>
    </div>
  );
};
export default Project;
