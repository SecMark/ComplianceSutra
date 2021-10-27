import React, { useEffect, useState } from "react";
import "./style.css";
import styled, { createGlobalStyle, css } from "styled-components";
import threeDots from "../../../../../../assets/Icons/threeDots.PNG";
import mobileSteperIcon from "../../../../../../assets/Icons/mobileSteperIcon.png";
import { useSelector, useDispatch, connect } from "react-redux";
import assignIconCircle from "../../../../../../assets/Icons/assignIconCircle.png";
import { actions as taskReportActions } from "../../redux/actions";
import CustomCard from "./Components/BoardCard";
import MyLaneHeader from "./Components/BoardHeader";
import Board from "react-trello";
import {
  getDataByCompany,
  getDataByLicenses,
  getDataByStatus,
  getDataByTeam,
} from "../../../../../../CommonModules/helpers/tasks.helper";
function BoardView({ setCurrentBoardViewBy, currentBoardViewBy }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [taskData, setTaskData] = useState([]);

  const taskList =
    state &&
    state.taskReport &&
    state.taskReport.taskReport &&
    state.taskReport.taskReport.taskReport &&
    state.taskReport.taskReport.taskReport;
  const userDetails = state && state.auth && state.auth.loginInfo;
  // useEffect(() => {
  //   dispatch(taskReportActions.taskReportRequest());
  // }, [currentBoardViewBy]);

  useEffect(() => {
    if (taskList && taskList.length > 0) {
      let data = [];
      switch (currentBoardViewBy) {
        case "status":
          data = getDataByStatus(taskList);
          setTaskData(data);
          break;
        case "company":
          data = getDataByCompany(taskList);
          setTaskData(data);
          break;
        case "license":
          data = getDataByLicenses(taskList);
          setTaskData(data);
          break;
        case "team-member":
          data = getDataByTeam(taskList);
          setTaskData(data);
          break;
        default:
          data = getDataByStatus(taskList);
          setTaskData(data);
          break;
      }
    }
  }, [taskList, currentBoardViewBy]);

  const data1 = () => {
    let arr1 = [];

    let i = 0;
    let j = 0;
    let obj = [];
    if (taskData) {
      for (i = 0; i < taskData.length; i++) {
        obj = taskData[i].tasks;
        if (
          obj &&
          obj.length > 0 &&
          obj.some((i) => !i.license.includes("Norec"))
        ) {
          for (j = 0; j < taskData[i].tasks.length; j++) {
            obj =
              taskData[i] &&
              taskData[i].tasks &&
              taskData[i].tasks.map((item, index) => {
                if (item.license === "Norec") {
                  return {};
                } else {
                  return (obj = {
                    id: item.task_name,
                    description: item.subject,
                    label: item.due_date,
                    currentBoardViewBy: currentBoardViewBy,
                    metadata: {
                      cardId: "Card2",
                    },
                    title: item.license,
                    status: taskData[i].status,
                    style: { color: "red" },
                    currentItem: item,
                  });
                }
              });
          }

          arr1 = [
            ...arr1,
            Object.assign({
              id: taskData[i].status,
              title: taskData[i].status,
              cards: obj,
              cardStyle: { minWidth: "100px", color: "red" },
            }),
          ];
        }
      }
    }

    return { lanes: arr1 };
  };

  const ScrollableLane = styled.div`
    flex: 1;
    overflow-y: auto;
    min-width: 100%;
    overflow-x: hidden;
    align-self: center;
    max-height: 55vh;
    margin-top: 10px;
    flex-direction: column;
    justify-content: space-between;
  `;

  const components = {
    // GlobalStyle: MyGlobalStyle, // global style created with method `createGlobalStyle` of `styled-components`
    LaneHeader: MyLaneHeader,
    Card: CustomCard,
    ScrollableLane: ScrollableLane,
    data: data1(),
    // AddCardLink: MyAddCardLink,
  };
  return (
    <div className="row">
      <div className="col-12">
        {taskData && taskData.length > 0 && (
          <div className="task-list-grid customHeight">
            <Board
              components={components}
              laneStyle={
                userDetails.UserType === 3 ||
                userDetails.UserType === 5 ||
                userDetails.UserType === 6
                  ? {
                      maxHeight: "98vh",
                      maxWidth: "100%",
                      height: "60vh",
                    }
                  : { maxHeight: "98vh", maxWidth: "100%", height: "50vh" }
              }
              cardDraggable={false}
              draggable={false}
              cardStyle={{ minWidth: "100%" }}
              editable={false}
              hideCardDeleteIcon={true}
              style={{ backgroundColor: "transparent" }}
              data={data1()}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default BoardView;
