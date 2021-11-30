import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackDrop from "../../../../CommonModules/sharedComponents/Loader/BackDrop";
import { DesktopTask, ProjectSubTask, ProjectTask } from "../../ProjectDesktop";
import { getIndividualTasksRequest } from "../../redux/actions";
import "./style.css";
const Tasks = () => {
  const isLoading = useSelector(
    (state) => state?.ProjectManagementReducer?.projectManagementData?.isLoading
  );
  const isError = useSelector(
    (state) => state?.ProjectManagementReducer?.projectManagementData?.isError
  );
  const individualTasksList = useSelector(
    (state) =>
      state?.ProjectManagementReducer?.projectManagementData?.individualTasks
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!(individualTasksList && individualTasksList.length > 0))
      dispatch(getIndividualTasksRequest());
  }, []);
  return (
    <>
      <BackDrop isLoading={isLoading} />
      {/* <div className="project-tasks-list__container p-3 mt-md-3"> */}
      <div className="project-tasks-list__container mt-md-2 p-0 pl-md-2">
        {individualTasksList &&
          individualTasksList.length > 0 &&
          individualTasksList.map((task) => {
            return (
              <>
                <DesktopTask data={task} />
                <ProjectSubTask data={task} />
              </>
            );
          })}
        {/* <ProjectTask />
        <ProjectTask />
        <ProjectTask />
        <ProjectTask />
        <ProjectTask />
        <ProjectTask />
        <ProjectTask />
        <ProjectTask />
        <ProjectTask /> */}
      </div>
    </>
  );
};

export default Tasks;
