import React, { useState, Suspense } from "react";
import "./style.css";
import searchIcon from "../../../.../../assets/Icons/searchIcon.png";
import closeIconGray from "../../../.../../assets/Icons/closeIconGray.png";
import { useOuterClick } from "../../OnBording/SubModules/DashBoardCO/components/RightSideGrid/outerClick";
import TaskDetailRightSide from "./Components/TaskDetailRightSide";
import Loading from "../../../CommonModules/sharedComponents/Loader";
const TasksListByStatus = React.lazy(() =>
  import("./Components/TasksListByStatus")
);
const TasksListByCompany = React.lazy(() =>
  import("./Components/TasksListByCompany")
);
const TaskListByTeam = React.lazy(() => import("./Components/TaskListByTeam"));
const sortByFilters = ["status", "company", "licenses", "team"];
const TaskDetailView = () => {
  const [currentOpenedTask, setCurrentOpenedTask] = useState({});
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [currentFilterIndex, setCurrentFilterIndex] = useState(0);
  const handleSearchBoxClose = (e) => {
    if (isSearchBoxOpen) {
      setSearchValue("");
      setIsSearchBoxOpen(false);
    }
  };
  const overviewSearchBoxRef = useOuterClick(handleSearchBoxClose);
  return (
    <div className="task-detail d-flex justify-content-between align-items-center">
      {/* ==== Task Detail Side Overview ==== */}
      <div className="task-detail__side-overview d-none d-md-block">
        {/* Header */}
        <div className="side-overview__header">
          {isSearchBoxOpen && (
            <div className="pb-3" ref={overviewSearchBoxRef}>
              <div className="side-overview__header--search-box position-relative">
                <span className="search-box-search">
                  <img src={searchIcon} alt="search icon" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  autoFocus
                  placeholder="Search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <span
                  className="search-box-close"
                  onClick={handleSearchBoxClose}
                >
                  <img src={closeIconGray} alt="close icon" />
                </span>
              </div>
            </div>
          )}
          {!isSearchBoxOpen && (
            <div className="d-flex justify-content-between align-items-center">
              <span className="side-overview__header--title pb-3">Tasks</span>
              <div class="pb-3 side-overview__header--search-icon">
                <img
                  src={searchIcon}
                  alt="overview serach"
                  onClick={() => setIsSearchBoxOpen(true)}
                />
              </div>
            </div>
          )}
        </div>
        {/* Sort By Filters */}
        {!isSearchBoxOpen && (
          <div className="side-overview__sort-by d-flex align-items-center">
            <span className="side-overview__sort-by--item sort-by-title mr-2">
              Sort by
            </span>
            {sortByFilters.map((filter, index) => (
              <span
                className={`side-overview__sort-by--item sort-by-filter ml-1 ${
                  index === currentFilterIndex && "sort-by-filter--active"
                }`}
                onClick={() => setCurrentFilterIndex(index)}
                key={index}
              >
                {filter}
              </span>
            ))}
          </div>
        )}
        {/* Tasks */}
        <div className="side-overview__tasks">
          {searchValue === "" &&
            sortByFilters[currentFilterIndex] === "status" && (
              <div className="tasks__by-status">
                {/* View By Status */}
                <Suspense fallback={<Loading isInline />}>
                  <TasksListByStatus
                    search={searchValue}
                    setCurrentTask={setCurrentOpenedTask}
                    currentTask={currentOpenedTask}
                  />
                </Suspense>
              </div>
            )}
          {searchValue === "" &&
            sortByFilters[currentFilterIndex] === "company" && (
              <div className="tasks__by-status">
                {/* View By Company */}
                <Suspense fallback={<Loading isInline />}>
                  <TasksListByCompany
                    currentTask={currentOpenedTask}
                    setCurrentTask={setCurrentOpenedTask}
                  />
                </Suspense>
              </div>
            )}
          {searchValue === "" &&
            sortByFilters[currentFilterIndex] === "licenses" && (
              <div>
                {/* View By Company */}
                {/* <TaskListByLicense currentTask={currentOpenedTask}
                  setCurrentTask={setCurrentOpenedTask} /> */}
              </div>
            )}
          {searchValue === "" && sortByFilters[currentFilterIndex] === "team" && (
            <div>
              {/* View By Company */}
              <Suspense fallback={<Loading isInline />}>
                <TaskListByTeam
                  currentTask={currentOpenedTask}
                  setCurrentTask={setCurrentOpenedTask}
                />
              </Suspense>
            </div>
          )}
        </div>
      </div>
      {/* ==== Task Detail ==== */}
      <div className="task-detail__task-data">
        <TaskDetailRightSide taskData={currentOpenedTask} />
      </div>
    </div>
  );
};

export default TaskDetailView;
