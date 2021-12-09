import React, { useEffect, useState } from "react";
import "./style.css";
import api from "../../../../../apiServices/";
import { useSelector } from "react-redux";
import { TaskLeftOverview } from "../TasksListByStatus";
import upArrow from "../../../../../assets/Icons/topArrowAccordian.png";
import NoTaskFound from "../NoTasksFound";
const TaskListByCompany = ({ currentTask, setCurrentTask }) => {
  const [tasksList, setTasksList] = useState([]);
  const [countDetails, setCountDetails] = useState({});
  const [expendedViewAll, setExpendedViewAll] = useState([]);
  const state = useSelector((state) => state);
  const userDetails = state && state.auth && state.auth.loginInfo;
  const handleExpandViewAll = (flag, index) => {
    let temporaryViewAllList = [...expendedViewAll];
    if (flag) {
      temporaryViewAllList.push(index);
    } else {
      temporaryViewAllList = temporaryViewAllList.filter(
        (item) => item !== index
      );
    }
    setExpendedViewAll(temporaryViewAllList);
  };
  useEffect(() => {
    api
      .post("/api/getTaskReport", {
        entityid: "2",
        userID: userDetails.UserID,
        usertype: userDetails.UserType,
      })
      .then((response) => {
        if (response && response.data && response.data.length !== 0) {
          const data = response.data;
          let temporaryArray = [];
          let rowCounts = {};
          data.forEach((item) => {
            if (item?.Details.length >= 1 && item.Status.trim() !== "Norec") {
              temporaryArray.push({ ...item });
              rowCounts[item.Status.trim()] = item.Details.length;
            }
          });
          let sortedArray = temporaryArray.sort((a, b) => a.ORD - b.ORD);
          setCountDetails(rowCounts);
          setTasksList(sortedArray);
        }
      });
  }, []);
  return (
    <>
      <div className="company-task__overview">
        {tasksList.length !== 0 &&
          tasksList &&
          tasksList.length !== 0 &&
          tasksList.map((task, index) => {
            const status = task.Status.trim();
            return (
              <>
                <p className="company__title mb-0">{status}</p>
                {task.Details.slice(0, 3).map((item) => {
                  return (
                    <TaskLeftOverview
                      task={item}
                      currentTask={currentTask}
                      setCurrentTask={setCurrentTask}
                    />
                  );
                })}
                {!expendedViewAll.includes(index) && countDetails[status] > 3 && (
                  <div
                    className="view-all-tasks d-flex align-items-center mx-3 my-3"
                    onClick={() => handleExpandViewAll(true, index)}
                  >
                    <p className="view-all-tasks--title mb-0 mr-2">
                      view all ({countDetails[status] - 3} more)
                    </p>
                    <img
                      src={upArrow}
                      alt=""
                      className={`by-status__item--accordion-arrow ${
                        !expendedViewAll.includes(index) &&
                        "accordion-arrow-down"
                      }`}
                    />
                  </div>
                )}
                {expendedViewAll.includes(index) && countDetails[status] > 3 && (
                  <>
                    {task.Details.slice(3, countDetails[status]).map((item) => {
                      return (
                        <TaskLeftOverview
                          task={item}
                          currentTask={currentTask}
                        />
                      );
                    })}
                    <div
                      className="view-all-tasks d-flex align-items-center mx-3 my-3"
                      onClick={() => handleExpandViewAll(false, index)}
                    >
                      <p className="view-all-tasks--title mb-0 mr-2">
                        show less
                      </p>
                      <img
                        src={upArrow}
                        alt=""
                        className={`by-status__item--accordion-arrow`}
                      />
                    </div>
                  </>
                )}
              </>
            );
          })}
        {tasksList.length === 0 && <NoTaskFound />}
      </div>
    </>
  );
};

export default TaskListByCompany;
