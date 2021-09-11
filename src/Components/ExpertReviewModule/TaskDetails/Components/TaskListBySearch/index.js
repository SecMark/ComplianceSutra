import React, { useCallback, useEffect, useState } from "react";
import { TaskLeftOverview } from "../TasksListByStatus";
import { actions as taskReportActions } from "../../../../OnBording/SubModules/DashBoardCO/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import NoTaskFound from "../NoTasksFound";

const TaskListBySearch = ({ searchValue }) => {
  const [tasksList, setTasksList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();
  const userDetails = useSelector(
    (state) => state && state.auth && state.auth.loginInfo
  );
  const taskData = useSelector(
    (state) =>
      state &&
      state.taskReport &&
      state.taskReport.taskReport &&
      state.taskReport.taskReport.taskReport
  );
  const getTaskBySearchValue = useCallback(
    (searchValue) => {
      const lowercaseSearchValue = searchValue;
      if (searchValue !== "" && tasksList.length !== 0) {
        let temporaryArray = [];
        tasksList.forEach((item) => {
          item.Details.forEach((task) => {
            if (task.TaskName !== "Norec") {
              if (
                task.TaskName.toLowerCase().includes(lowercaseSearchValue) ||
                task.EntityName.toLowerCase().includes(lowercaseSearchValue) ||
                task.LicenseCode.toLowerCase().includes(lowercaseSearchValue) ||
                task.AssignedName.toLowerCase().includes(lowercaseSearchValue)
              ) {
                temporaryArray.push({
                  Status: item.Status.trim(),
                  data: task,
                });
              }
            }
          });
        });
        setSearchResults([...new Set([...temporaryArray])]);
      }
    },
    [tasksList]
  );
  useEffect(() => {
    let temporaryArray = [];
    if (taskData !== undefined && taskData.length !== 0) {
      taskData.forEach((item) => {
        if (item?.Details.length >= 1 && item?.Status.trim() !== "Norec") {
          temporaryArray.push({ ...item });
        }
      });
      let sortedArray = temporaryArray.sort((a, b) => a.ORD - b.ORD);
      setTasksList(sortedArray);
    }
  }, [taskData]);
  useEffect(() => {
    dispatch(
      taskReportActions.taskReportRequest({
        userID: userDetails.UserID,
        usertype: userDetails.UserType,
      })
    );
  }, []);
  useEffect(() => {
    if (searchValue !== "") {
      getTaskBySearchValue(searchValue);
    }
  }, [searchValue]);
  return (
    <div>
      {searchResults &&
        searchResults.length !== 0 &&
        searchResults.map((item) => <TaskLeftOverview task={item.data} />)}
      {searchResults && searchResults.length === 0 && <NoTaskFound />}
    </div>
  );
};

export default TaskListBySearch;
