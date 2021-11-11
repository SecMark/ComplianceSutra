import React, { useEffect, useRef, useState } from "react";
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
const ProjectAndTask = () => {
  const calenderRef = useRef();
  const [currentPageView, setCurrentPageView] = useState(
    ProjectManagmentPages[0]
  );
  const [calenderFunctions, setCalenderFunctions] = useState({});
  const [dayDate, setDayDate] = useState(new Date());
  const [monthDate, setMonthDate] = useState(new Date());
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  useEffect(() => {
    if (calenderRef.current) {
      setCalenderFunctions(calenderRef.current);
    }
  }, [currentPageView, calenderRef, dayDate, weekStartDate, monthDate]);
  const [activeDays, setActiveDays] = useState(constant.month);
  return (
    <>
      <ProjectManagementHeader>
        <div className="w-100 d-flex align-items-center justify-content-between">
          <p className="project-management__header-title mb-0">
            {currentPageView.buttonName === "Calender"
              ? currentPageView.buttonName
              : "Project & Task"}
          </p>
          {/* {calenderFunctions && Object.keys(calenderFunctions).length > 0 && (
            
          )} */}
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
