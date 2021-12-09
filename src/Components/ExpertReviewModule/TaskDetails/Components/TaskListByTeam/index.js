import React, { useEffect, useState } from "react";
import data from "./data";
import { TaskLeftOverview } from "../TasksListByStatus";
import upArrow from "../../../../../assets/Icons/topArrowAccordian.png";
import api from "../../../../../apiServices/";
import { useSelector } from "react-redux";
import NoTaskFound from "../NoTasksFound";
const TaskListByTeam = ({ currentTask, setCurrentTask }) => {
  const [expendedViewAll, setExpendedViewAll] = useState([]);
  const [tasksList, setTasksList] = useState([]);
  const state = useSelector((state) => state);
  const userDetails = state && state.auth && state.auth.loginInfo;
  console.log(data);
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
        entityid: "3",
        userID: userDetails.UserID,
        usertype: userDetails.UserType,
      })
      .then((response) => {
        if (response && response.data && response.data.length !== 0) {
          const data = response.data;
          let temporaryArray = [];
          data.forEach((item) => {
            if (item?.Details.length >= 1 && item.Status.trim() !== "Norec") {
              temporaryArray.push({ ...item });
            }
          });
          let sortedArray = temporaryArray.sort((a, b) => a.ORD - b.ORD);
          setTasksList(sortedArray);
        }
      });
  }, []);
  return (
    <div className="company-task__overview">
      {tasksList.length !== 0 &&
        tasksList.map((dataByTeam, index) => {
          const teamTitle = dataByTeam.Status;
          const tasks = dataByTeam.Details;
          const tasksLength = tasks.length;
          return (
            <>
              <p className="company__title mb-0">{teamTitle}</p>
              {tasks.slice(0, 3).map((item) => {
                return (
                  <TaskLeftOverview
                    task={item}
                    currentTask={currentTask}
                    setCurrentTask={setCurrentTask}
                  />
                );
              })}
              {!expendedViewAll.includes(index) && tasksLength > 3 && (
                <div
                  className="view-all-tasks d-flex align-items-center m-3"
                  onClick={() => handleExpandViewAll(true, index)}
                >
                  <p className="view-all-tasks--title mb-0 mr-2">
                    view all {tasksLength - 3} more
                  </p>
                  <img
                    src={upArrow}
                    alt="arrow"
                    className={`by-status__item--accordion-arrow ${
                      !expendedViewAll.includes(index) && "accordion-arrow-down"
                    }`}
                  />
                </div>
              )}
              {expendedViewAll.includes(index) && tasksLength > 3 && (
                <>
                  {tasks.slice(3, tasksLength).map((item) => {
                    return (
                      <TaskLeftOverview
                        task={item}
                        currentTask={currentTask}
                        setCurrentTask={setCurrentTask}
                      />
                    );
                  })}
                  <div
                    className="view-all-tasks d-flex align-items-center m-3"
                    onClick={() => handleExpandViewAll(false, index)}
                  >
                    <p className="view-all-tasks--title mb-0 mr-2">show less</p>
                    <img
                      src={upArrow}
                      alt="arrow"
                      className="by-status__item--accordion-arrow"
                    />
                  </div>
                </>
              )}
            </>
          );
        })}
      {tasksList.length === 0 && <NoTaskFound />}
    </div>
  );
};

export default TaskListByTeam;
