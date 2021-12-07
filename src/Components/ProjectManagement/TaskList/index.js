import React, { useEffect, useState } from "react";
import { MdAdd, MdChevronLeft, MdBlock } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import BackDrop from "../../../CommonModules/sharedComponents/Loader/BackDrop";
import {
  ProjectManagementHeader,
  ProjectManagementMain,
  ProjectManagementMainContainer,
} from "../components";
import { SmallIconButton } from "../components/Buttons";
import AddEditTaskList from "../components/PopPupModules/AddEditTaskList";
import { ProjectTaskList } from "../ProjectDesktop";
import {
  clearTaskListModalState,
  setTaskListModalState,
  clearDeleteModalSatate,
  deactivateRequest,
  getProjectDataRequest,
} from "../redux/actions";
import DeactivateAndDeleteModal from "../components/Modals/DeactivateAndDeleteModal";
import projectDeleteIcon from "../../../assets/ERIcons/projectDeleteIcon.svg";
const TaskList = () => {
  const [tasklist, setTasklist] = useState([]);
  const [projects, setProjects] = useState([]);
  const history = useHistory();
  const modalsStatus = useSelector(
    (state) => state?.ProjectManagementReducer?.modalsStatus
  );
  const projectData = useSelector(
    (state) => state?.ProjectManagementReducer?.projectManagementData?.projects
  );
  const isProjectDataLoading = useSelector(
    (state) => state?.ProjectManagementReducer?.projectManagementData?.isLoading
  );
  const isDeactivateRequestInProgress = useSelector(
    (state) =>
      state?.ProjectManagementReducer?.deactivateRequestStatus?.isLoading
  );
  const dispatch = useDispatch();
  const state = history?.location?.state;
  const project_name = state?.project_name;
  const project_id = state?.project_id;
  const milestone_id = state?.milestone_id;
  const milestone_title = state?.milestone_title;
  const deactivateModalAndStatus = useSelector(
    (state) => state?.ProjectManagementReducer?.deactivateModalAndStatus
  );
  useEffect(() => {
    let currentProject;
    if (projectData && projectData.length > 0) {
      if (project_id && milestone_id) {
        currentProject = projectData?.find(
          (element) => element?.project_id === project_id
        );
        if (currentProject) {
          const currentMilestone = currentProject?.milestone_data?.find(
            (element) => element?.milestone_id === milestone_id
          );
          if (
            currentMilestone &&
            currentMilestone?.task_list_data &&
            currentMilestone?.task_list_data?.length > 0
          ) {
            setTasklist(currentMilestone?.task_list_data);
          } else {
            setTasklist([]);
          }
        }
      } else if (project_id && !milestone_id) {
        currentProject = projectData?.find(
          (element) => element?.project_id === project_id
        );
        if (
          currentProject &&
          currentProject?.task_list_data &&
          currentProject?.task_list_data?.length > 0
        ) {
          setTasklist(currentProject?.task_list_data);
        } else {
          setTasklist([]);
        }
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
      <AddEditTaskList
        visible={modalsStatus?.taskListModal?.isVisible}
        onClose={() => dispatch(clearTaskListModalState())}
        isEdit={modalsStatus?.taskListModal?.isEdit}
        editData={modalsStatus?.taskListModal?.editData}
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
              Tasklist
            </p>
          </div>
          <SmallIconButton
            type="primary"
            className="mr-2"
            onClick={() => {
              const _project = [...projectData].filter(
                (item) => item.project_id === project_id
              );
              const _project_milestones =
                _project &&
                _project.length > 0 &&
                _project[0].milestone_data?.map((milestone) => ({
                  value: {
                    milestone_id: milestone?.milestone_id,
                    project_id: milestone?.project,
                  },
                  label: milestone.milestone_title,
                }));

              dispatch(
                setTaskListModalState({
                  ...modalsStatus?.taskListModal,
                  isVisible: true,
                  editData: {
                    ...modalsStatus?.taskListModal?.editData,
                    project_id,
                    milestone_id,
                  },
                  milestonesList: _project_milestones || [],
                })
              );
            }}
          >
            <MdAdd />
          </SmallIconButton>
        </div>
        <p
          style={{
            color: "#7a73ff",
          }}
          className="project-management__header-title mt-4 mb-1 text-center"
        >
          {milestone_title || project_name}
        </p>
      </ProjectManagementHeader>
      <ProjectManagementMainContainer>
        <ProjectManagementMain className="project-management__main--calender">
          {tasklist &&
            tasklist?.length > 0 &&
            tasklist.map((tasklistData) => {
              return <ProjectTaskList data={tasklistData} />;
            })}
          {tasklist && tasklist.length === 0 && (
            <p
              style={{
                opacity: "0.8",
              }}
              className="project-management__header-title mt-5 text-center"
            >
              No tasklist found for this project
            </p>
          )}
        </ProjectManagementMain>
      </ProjectManagementMainContainer>
    </>
  );
};

export default TaskList;
