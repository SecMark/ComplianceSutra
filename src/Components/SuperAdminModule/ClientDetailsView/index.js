import React, { Suspense, useEffect, useState } from "react";
import "./style.css";
import "../LicenseDetails/style.css";
import searchIcon from "../../../.../../assets/Icons/searchIcon.png";
import closeIconGray from "../../../.../../assets/Icons/closeIconGray.png";
import backgroundImage from "../../../.../../assets/ERIcons/background.png";
import { useOuterClick } from "../../OnBording/SubModules/DashBoardCO/components/RightSideGrid/outerClick";
// import TaskDetailRightSide from "./Components/TaskDetailRightSide";
// import ToggleButton from "../../../CommonModules/sharedComponents/ToggleButton/index";
import { MdExpandMore, MdAddBox } from "react-icons/md";
import Loading from "../../../CommonModules/sharedComponents/Loader";
import TaskStatusBox from "../../../CommonModules/sharedComponents/TaskStatusBox";
import companies_data from "./components/data";
import ClientDetailsRightSide from "./components/ClientDetailsRightSide";
const sortByFilters = ["addition date", "alphabatically", "updates"];
const LicenseDetails = ({ closeTaskDetails }) => {
  const [currentOpenedTask, setCurrentOpenedTask] = useState({});
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [currentFilterIndex, setCurrentFilterIndex] = useState(0);
  const handleSearchBoxClose = (typeOfClick) => {
    if (isSearchBoxOpen) {
      if (
        searchValue !== "" &&
        typeOfClick &&
        typeOfClick === "search-box-close"
      ) {
        setSearchValue("");
        setIsSearchBoxOpen(false);
      }
      if (searchValue === "") {
        setIsSearchBoxOpen(false);
      }
    }
  };
  const overviewSearchBoxRef = useOuterClick(handleSearchBoxClose);
  return (
    <div className="license-details d-flex justify-content-between align-items-center">
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
                  onClick={() => handleSearchBoxClose("search-box-close")}
                >
                  <img src={closeIconGray} alt="close icon" />
                </span>
              </div>
            </div>
          )}
          {!isSearchBoxOpen && (
            <div className="d-flex justify-content-between align-items-center">
              <span className="side-overview__header--title pb-3">Clients</span>
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
          <>
            <div className="pb-2 side-overview__sort-by d-flex align-items-center">
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
            {/* ADD CLIENT BUTTON */}
            <button className="pt-0 mb-2 task-details__button task-details__button--stroke">
              <MdAddBox />
              &nbsp;add client
            </button>
          </>
        )}
        {/* {!isSearchBoxOpen && (
          <>
            <div className="side-overview__sort-by d-flex align-items-center pt-0">
              <span className="side-overview__sort-by--item sort-by-title mr-2">
                Show
              </span>
              <select className="form-control side-overview__show-by--dropdown">
                <option value="all">All Licenses</option>
                <option value="gst">GST</option>
                <option value="nse">NSE</option>
              </select>
            </div>
          </>
        )} */}
        {/* Tasks */}
        <div className="side-overview__tasks">
          {searchValue !== "" && (
            <div className="tasks__by-status">
              {/* View By Alphabatically */}
              {/* <Suspense fallback={<Loading isInline />}>
                <TaskListBySearch
                  setCurrentTask={setCurrentOpenedTask}
                  currentTask={currentOpenedTask}
                  searchValue={searchValue}
                />
              </Suspense> */}
            </div>
          )}
          {searchValue === "" &&
            // sortByFilters[currentFilterIndex] === "status" && (
            true && (
              <div className="tasks__by-status">
                {/* View By Status */}
                {/* <Suspense fallback={<Loading isInline />}>
                  <TasksListByStatus />
                </Suspense> */}
                {/* {license_data &&
                  license_data.length !== 0 &&
                  license_data.map((license_details, index) => {
                    return (
                      <TasksByLicenseName
                        key={license_details.id}
                        data={license_details}
                        isTaskListOpen={index % 2 !== 0}
                        currentTask={currentOpenedTask}
                        setCurrentTask={setCurrentOpenedTask}
                      />
                    );
                  })} */}

                {companies_data.length !== 0 &&
                  companies_data.map((company) => {
                    const {
                      company_name,
                      expert_review,
                      expert_review_status,
                      monthly_revenu,
                      licenses,
                      payment_due,
                    } = company;
                    return (
                      <div
                        className={`company__container ${
                          currentOpenedTask === company &&
                          "company__container--active"
                        } p-3`}
                        onClick={() => setCurrentOpenedTask(company)}
                      >
                        <div className="d-flex align-items-center justify-content-between">
                          <p className="licenses-list__task-name mb-0">
                            {company_name}
                          </p>
                          <div className="task-count">{licenses}</div>
                        </div>
                        <div className="mt-1 d-flex align-items-center justify-content-between">
                          <p className="licenses-list__task-name mb-0 company__revenu-price">
                            ₹{monthly_revenu}&nbsp;
                            <span className="company__small-title">{`(${payment_due})`}</span>
                          </p>
                          {currentOpenedTask === company ? (
                            <p className="mb-0 licenses-list__task-name company__small-title">
                              Licences
                            </p>
                          ) : (
                            !expert_review && (
                              <MdExpandMore className="license-details__expand-more license-details__expand-more--90deg" />
                            )
                          )}
                        </div>
                        {expert_review && (
                          <div className="d-flex align-items-center justify-content-between">
                            <div
                              style={{
                                width: "fit-content",
                              }}
                              className="mt-2"
                            >
                              <TaskStatusBox
                                status={
                                  expert_review_status === "active"
                                    ? "approved"
                                    : expert_review_status === "inactive"
                                    ? "rejected"
                                    : "pending"
                                }
                                fontSize={10}
                              >
                                Expert Review {expert_review_status}
                              </TaskStatusBox>
                            </div>
                            <MdExpandMore className="license-details__expand-more license-details__expand-more--90deg" />
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            )}
          {searchValue === "" &&
            sortByFilters[currentFilterIndex] === "company" && (
              <div className="tasks__by-status">
                {/* View By Company */}
                {/* <Suspense fallback={<Loading isInline />}>
                  <TasksListByCompany
                    currentTask={currentOpenedTask}
                    setCurrentTask={setCurrentOpenedTask}
                  />
                </Suspense> */}
              </div>
            )}
          {searchValue === "" &&
            sortByFilters[currentFilterIndex] === "licenses" && (
              <div className="tasks__by-status">
                {/* View By Company */}
                {/* <Suspense fallback={<Loading isInline />}>
                  <TaskListByLicense
                    currentTask={currentOpenedTask}
                    setCurrentTask={setCurrentOpenedTask}
                  />
                </Suspense> */}
              </div>
            )}
          {searchValue === "" && sortByFilters[currentFilterIndex] === "team" && (
            <div>
              {/* View By Company */}
              {/* <Suspense fallback={<Loading isInline />}>
                <TaskListByTeam
                  currentTask={currentOpenedTask}
                  setCurrentTask={setCurrentOpenedTask}
                />
              </Suspense> */}
            </div>
          )}
        </div>
      </div>
      {/* ==== Task Detail ==== */}
      <div className="task-detail__task-data position-relative">
        <div className="background-image">
          <img src={backgroundImage} alt="" />
        </div>
        {/* <TaskDetailRightSide
          taskData={currentOpenedTask}
          closeTaskDetails={closeTaskDetails}
        /> */}
        <ClientDetailsRightSide taskData={currentOpenedTask} />
      </div>
    </div>
  );
};

const TasksByLicenseName = ({
  data,
  isTaskListOpen,
  currentTask,
  setCurrentTask,
}) => {
  const [isTaskListShow, setIsTaskListShow] = useState(isTaskListOpen || false);
  return (
    <div className="mb-4">
      <div className="d-flex align-items-center justify-content-between px-3">
        {/* Task Category Heading */}
        <p className="licenses-list__category-heading mb-0">
          {data.license_category}
        </p>
        <span className="task-data__header--entity-name ml-0 ml-md-3 mt-2 mt-md-0">
          {data.license_initials}
        </span>
        {/* Task Expand More Button */}
        <button
          className="task-details__button font-weight-bold"
          onClick={() => setIsTaskListShow(!isTaskListShow)}
          style={{
            transform: isTaskListShow ? "rotate(180deg)" : "rotate(0deg)",
            transition: "all 200ms ease",
          }}
        >
          <MdExpandMore className="license-details__expand-more" />
        </button>
        {/* Toggle Button */}
        {/* <ToggleButton
          isChecked={data.isActive}
          onChangeHandler={(flag) => {
            // Action for toggle
          }}
        /> */}
      </div>
      {isTaskListShow && (
        <div className="licenses-list__item-tasks py-2">
          {/* Small Heading Inside Tasks List */}
          {data.license_sub_category !== "" && (
            <p className="licenses-list__category-heading px-3 licenses-list__category-heading--small">
              {data.license_sub_category}
            </p>
          )}
          <div className="my-2">
            {/* Tasks */}
            {data.tasks &&
              data.tasks.length !== 0 &&
              data.tasks.map((task) => {
                return (
                  <div
                    key={task.id}
                    onClick={() => setCurrentTask(task)}
                    className={`licenses-list__task ${
                      currentTask.id === task.id &&
                      "licenses-list__task--active"
                    } px-3 py-2 d-flex align-items-center justify-content-between`}
                  >
                    <div className="d-flex flex-column">
                      <p className="licenses-list__task-name mb-2">
                        {task.name}
                      </p>
                      <p className="licenses-list__task-date mb-0">
                        {task.date}
                      </p>
                    </div>
                    <button className="task-details__button license-details__expand-more--90deg p-0">
                      <MdExpandMore className="license-details__expand-more" />
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};
export default LicenseDetails;
