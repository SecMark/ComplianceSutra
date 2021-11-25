import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  ProjectManagementHeader,
  ProjectManagementMain,
  ProjectManagementMainContainer,
} from "../components";
import ProjectManagementNavigation, {
  ProjectManagmentPages,
} from "../components/ProjectManagementNavigation";
import Project, { ProjectHeader } from "../ProjectDesktop";
import ProjectManagamentCalender from "./Calender";
import Projects from "./Projects";
import Tasks from "./Tasks";
import DateFilters from "./Calender/components/DateFilters";
import constant from "../../../CommonModules/sharedComponents/constants/constant";
import DateButtons from "./Calender/components/DateButtons";
import { MdAdd } from "react-icons/md";
import AddProject from "../components/AddandEditProject/AddProjectModal";
import NewTaskModel from "../components/AddNewTask/TaskModel";
import { getProjectDataRequest } from "../redux/actions";
const ProjectAndTask = () => {
  const dispatch = useDispatch();
  const calenderRef = useRef();
  const [currentPageView, setCurrentPageView] = useState(
    ProjectManagmentPages[0]
  );
  const [calenderFunctions, setCalenderFunctions] = useState({});
  const [dayDate, setDayDate] = useState(new Date());
  const [monthDate, setMonthDate] = useState(new Date());
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [activeDays, setActiveDays] = useState(constant.month);
  const [isShowAddProject, setIsShowAddProject] = useState(false);
  const [isShowAddTask, setIsShowAddTask] = useState(false);

  useEffect(() => {
    if (calenderRef.current) {
      setCalenderFunctions(calenderRef.current);
    }
  }, [currentPageView, calenderRef, dayDate, weekStartDate, monthDate]);
  useEffect(() => {
    dispatch(getProjectDataRequest());
  }, []);
  return (
    <>
      <AddProject
        show={isShowAddProject}
        onClose={() => setIsShowAddProject(false)}
      />
      <NewTaskModel
        showTask={isShowAddTask}
        onClose={() => setIsShowAddTask(false)}
      />
      <ProjectManagementHeader>
        <div className="w-100 d-flex align-items-center justify-content-between">
          <p className="project-management__header-title mb-0">
            {currentPageView.buttonName === "Calender"
              ? currentPageView.buttonName
              : "Project & Task"}
          </p>
          {/* {calenderFunctions && Object.keys(calenderFunctions).length > 0 && (
          
          )} */}
          {currentPageView.id !== "project-management-calender" && (
            <div className="d-flex align-items-center">
              <button
                onClick={() => setIsShowAddProject(true)}
                className="mr-2 project-management__button project-management__button--primary"
              >
                P <MdAdd />
              </button>
              <button
                onClick={() => setIsShowAddTask(true)}
                className="project-management__button project-management__button--primary"
              >
                T <MdAdd />
              </button>
            </div>
          )}
          {currentPageView.id === "project-management-calender" &&
            calenderFunctions &&
            Object.keys(calenderFunctions).length > 0 && (
              <>
                <div className="justify-content-start flex-grow-1 px-4 d-none d-md-flex">
                  <DateButtons
                    setDays={calenderFunctions?.setDays}
                    activeDays={activeDays}
                    monthDate={monthDate}
                    weekStartDate={weekStartDate}
                    addDaysInDate={calenderFunctions?.addDaysInDate}
                    dayDate={dayDate}
                  />
                </div>
                <DateFilters
                  filters={[constant.day, constant.week, constant.month]}
                  currentFilter={activeDays}
                  setDateFilter={setActiveDays}
                  containerClass="d-none d-md-flex"
                />
              </>
            )}
        </div>
        <ProjectManagementNavigation
          currentPageView={currentPageView}
          setCurrentPageView={setCurrentPageView}
        />
      </ProjectManagementHeader>
      <ProjectManagementMainContainer>
        {/* Components over the main  */}
        {currentPageView.id === "project-management-project" && (
          <ProjectHeader />
        )}
        {currentPageView.id === "project-management-calender" && (
          <DateFilters
            filters={[constant.day, constant.week, constant.month]}
            currentFilter={activeDays}
            setDateFilter={setActiveDays}
            containerClass="mb-3 d-md-none"
          />
        )}

        <ProjectManagementMain
          className={`${
            currentPageView.id === "project-management-calender" &&
            "project-management__main--calender"
          }`}
        >
          {/* Components of main */}
          {currentPageView.id === "project-management-project" && <Projects />}
          {currentPageView.id === "project-management-task" && <Tasks />}
          {currentPageView.id === "project-management-calender" && (
            <ProjectManagamentCalender
              ref={calenderRef}
              activeDays={activeDays}
              setActiveDays={setActiveDays}
              dayDate={dayDate}
              setDayDate={setDayDate}
              monthDate={monthDate}
              setMonthDate={setMonthDate}
              weekStartDate={weekStartDate}
              setWeekStartDate={setWeekStartDate}
            />
          )}
          {/* <ProjectMilestone />
            <ProjectSubTask /> */}
          {/* <ProjectTask /> */}
        </ProjectManagementMain>
      </ProjectManagementMainContainer>
    </>
  );
};

export default ProjectAndTask;
