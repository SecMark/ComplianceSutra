import React, { useState, useEffect } from "react";
import "./style.css";
import { MdClose } from "react-icons/md";
import TaskOverview from "./TaskOverview";
import TaskUpdates from "./TaskUpdates";
import TaskReferences from "./TaskReferences";
const TaskDetailRightSide = React.memo(({ taskData, closeTaskDetails }) => {
  // const [taskDetails, setTaskDetails] = useState({});
  const [taskDisplay, setTaskDisplay] = useState(1);
  const [headerHeight, setHeaderHight] = useState(0);
  useEffect(() => {
    const headerRef = document
      .querySelector(".task-data__header")
      .getClientRects()[0].height;
    setHeaderHight(Math.trunc(headerRef));
  }, [taskDisplay, taskData]);
  // useEffect(() => {
  //   if (taskData !== undefined && Object.keys(taskData).length !== 0) {
  //     setTaskDetails(taskData);
  //   }
  // }, [taskData]);

  return (
    <>
      <div className="task-data__container position-relative">
        <span className="task-data__close" onClick={closeTaskDetails}>
          <MdClose />
        </span>
        <div className="task-data__header">
          <div className="position-relative task-data__header-details">
            <div className="d-flex align-items-md-center mb-3 flex-column flex-md-row align-items-start">
              <p className="mb-0 task-data__header--title">{taskData.name}</p>
              <span className="task-data__header--entity-name ml-0 ml-md-3 mt-2 mt-md-0">
                GST
              </span>
            </div>
            <div className="license-details__tabs d-flex align-items-center">
              {["overview", "references", "updates"].map((tab, index) => (
                <p
                  className={`license-details__tab mb-0 ${
                    taskDisplay === index + 1 && "license-details__tab--active"
                  }`}
                  onClick={() => setTaskDisplay(index + 1)}
                >
                  {tab}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div
          className="task-data__main"
          style={{
            height: `calc(90vh - ${headerHeight}px)`,
          }}
        >
          <div className="row my-4 task-data-fields">
            {taskDisplay === 1 && <TaskOverview />}
            {taskDisplay === 2 && <TaskReferences />}
            {taskDisplay === 3 && <TaskUpdates />}
          </div>
        </div>
      </div>
    </>
  );
});

export default TaskDetailRightSide;
