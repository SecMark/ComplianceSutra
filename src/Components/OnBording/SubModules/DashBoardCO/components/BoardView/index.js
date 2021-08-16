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
function BoardView({ setCurrentBoardViewBy, currentBoardViewBy }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [taskData, setTaskData] = useState([]);

  const getCurrentEntityId = (viewType) => {
    let entityID = "";
    if (viewType === "status") {
      entityID = "";
    } else if (viewType === "company") {
      entityID = "2";
    } else if (viewType === "license") {
      entityID = "1";
    } else if (viewType === "team-member") {
      entityID = "3";
    }
    return entityID;
  };

  const taskList =
    state &&
    state.taskReport &&
    state.taskReport.taskReport &&
    state.taskReport.taskReport.taskReport &&
    state.taskReport.taskReport.taskReport;
  const userDetails = state && state.auth && state.auth.loginInfo;
  useEffect(() => {
    dispatch(
      taskReportActions.taskReportRequest({
        entityid: getCurrentEntityId(currentBoardViewBy),
        userID: userDetails.UserID,
        usertype: userDetails.UserType,
      })
    );
  }, [currentBoardViewBy]);

  useEffect(() => {
    if (currentBoardViewBy !== "status") {
      let data =
        taskList &&
        taskList.length > 0 &&
        taskList.sort((a, b) => a.Status.localeCompare(b.Status));
      setTaskData(data);
    } else {
      setTaskData(taskList);
    }
  }, [taskList]);

  console.log(taskList);
  const data1 = () => {
    let arr1 = [];

    let i = 0;
    let j = 0;
    let obj = [];
    if (taskData) {
      for (i = 0; i < taskData.length; i++) {
        obj = taskData[i].Details;
        if (
          obj &&
          obj.length > 0 &&
          obj.some((i) => !i.LicenseCode.includes("Norec"))
        ) {
          for (j = 0; j < taskData[i].Details.length; j++) {
            obj =
              taskData[i] &&
              taskData[i].Details &&
              taskData[i].Details.map((item, index) => {
                if (item.LicenseCode === "Norec") {
                  return {};
                } else {
                  return (obj = {
                    id: item.TaskId,
                    description: item.TaskName,
                    label: item.EndDate,
                    currentBoardViewBy: currentBoardViewBy,
                    metadata: {
                      cardId: "Card2",
                    },
                    title: item.LicenseCode,
                    Statusorg: taskData[i].Status,
                    style: { color: "red" },
                    currentItem: item,
                  });
                }
              });
          }

          arr1 = [
            ...arr1,
            Object.assign({
              id: taskData[i].ORD,
              title: taskData[i].Status,
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
