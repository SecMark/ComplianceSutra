import React, { useEffect, useState } from "react";
import { MdAdd, MdBlock, MdChevronLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import BackDrop from "../../../CommonModules/sharedComponents/Loader/BackDrop";
import {
  ProjectManagementHeader,
  ProjectManagementMain,
  ProjectManagementMainContainer,
} from "../components";
import NewTaskModel from "../components/AddNewTask/TaskModel";
import { SmallIconButton } from "../components/Buttons";
import DeactivateAndDeleteModal from "../components/Modals/DeactivateAndDeleteModal";
import {
  getDateValidationsFromProject,
  ProjectSubTask,
} from "../ProjectDesktop";
import {
  clearDeleteModalSatate,
  clearTaskModalState,
  deactivateRequest,
  getProjectDataRequest,
  setTaskModalState,
} from "../redux/actions";
import projectDeleteIcon from "../../../assets/ERIcons/projectDeleteIcon.svg";
const Tasks = () => {
  const [taskData, setCurrentTaskData] = useState([]);
  const modalsStatus = useSelector(
    (state) => state?.ProjectManagementReducer?.modalsStatus
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const { task_list_title, task_list_id, project_id, milestone_id } =
    history?.location?.state;
  const projectData = useSelector(
    (state) => state?.ProjectManagementReducer?.projectManagementData?.projects
  );
  const isProjectDataLoading = useSelector(
    (state) => state?.ProjectManagementReducer?.projectManagementData?.isLoading
  );
  const deactivateModalAndStatus = useSelector(
    (state) => state?.ProjectManagementReducer?.deactivateModalAndStatus
  );
  const isDeactivateRequestInProgress = useSelector(
    (state) =>
      state?.ProjectManagementReducer?.deactivateRequestStatus?.isLoading
  );

  useEffect(() => {
    let currentProject;
    currentProject = projectData?.find(
      (element) => element?.project_id === project_id
    );
    if (project_id && milestone_id && task_list_id) {
      if (currentProject) {
        const currentMilestone = currentProject?.milestone_data?.find(
          (element) => element?.milestone_id === milestone_id
        );
        if (
          currentMilestone &&
          currentMilestone?.task_list_data &&
          currentMilestone?.task_list_data?.length > 0
        ) {
          const currentTaskList = currentMilestone?.task_list_data?.find(
            (element) => element?.task_list_id === task_list_id
          );
          const currentTaskData = currentTaskList?.task_data;
          if (currentTaskData && currentTaskData.length > 0) {
            setCurrentTaskData(currentTaskData);
          } else {
            setCurrentTaskData([]);
          }
        }
      }
    } else if (project_id && task_list_id) {
      const currentTaskList = currentProject?.task_list_data?.find(
        (element) => element?.task_list_id === task_list_id
      );
      const currentTaskData = currentTaskList?.task_data;
      if (currentTaskData && currentTaskData?.length > 0) {
        setCurrentTaskData(currentTaskData);
      } else {
        setCurrentTaskData([]);
      }
    }
  }, [projectData]);
  useEffect(() => {
    if (projectData && projectData.length === 0) {
      dispatch(getProjectDataRequest());
    }
  }, []);
  return (
    <>
      <BackDrop
        isLoading={isProjectDataLoading || isDeactivateRequestInProgress}
      />
      <NewTaskModel
        showTask={modalsStatus?.taskModal?.isVisible}
        onClose={() => dispatch(clearTaskModalState())}
        isEdit={modalsStatus?.taskModal?.isEdit}
        editData={modalsStatus?.taskModal?.editData}
      />
      <DeactivateAndDeleteModal
        visible={deactivateModalAndStatus?.isVisible}
        onClose={() => dispatch(clearDeleteModalSatate())}
        Text={`Are you sure ${
          deactivateModalAndStatus?.modalName !== "Task"
            ? "to delete this " + deactivateModalAndStatus?.modalName
            : "you want to De-activate this Task"
        }?`}
        iconSrc={
          deactivateModalAndStatus?.modalName !== "Task" && projectDeleteIcon
        }
        Icon={deactivateModalAndStatus?.modalName === "Task" && MdBlock}
        id={deactivateModalAndStatus?.id}
        onSubmit={() => {
          dispatch(
            deactivateRequest({
              ...deactivateModalAndStatus,
            })
          );
          dispatch(clearDeleteModalSatate());
        }}
      />
      <ProjectManagementHeader isNoBorder>
        <div className="mb-3 w-100 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <SmallIconButton className="mr-1" onClick={() => history.goBack()}>
              <MdChevronLeft />
            </SmallIconButton>
            <p className="project-management__header-title mb-0 d-inline-block">
              {task_list_title || "Tasks"}
            </p>
          </div>
          <SmallIconButton
            type="primary"
            className="mr-2"
            onClick={() => {
              const dateValidations = getDateValidationsFromProject(
                project_id,
                projectData
              );
              dispatch(
                setTaskModalState({
                  ...modalsStatus?.taskModal,
                  isVisible: true,
                  editData: {
                    ...modalsStatus?.taskModal?.editData,
                    project_id,
                    milestone_id,
                    task_list_id,
                  },
                  dateValidations,
                })
              );
            }}
          >
            <MdAdd />
          </SmallIconButton>
        </div>
      </ProjectManagementHeader>
      <ProjectManagementMainContainer>
        <ProjectManagementMain className="project-management__main--calender">
          {taskData &&
            taskData.length > 0 &&
            taskData.map((task) => {
              return <ProjectSubTask data={task} />;
            })}
          {(!taskData || (taskData && taskData?.length === 0)) && (
            <p
              style={{
                opacity: "0.8",
              }}
              className="project-management__header-title mt-5 text-center"
            >
              No tasks found for this project
            </p>
          )}
        </ProjectManagementMain>
      </ProjectManagementMainContainer>
    </>
  );
};

export default Tasks;
