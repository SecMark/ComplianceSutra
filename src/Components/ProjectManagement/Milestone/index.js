import React, { useEffect, useState } from "react";
import { MdAdd, MdBlock, MdChevronLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  ProjectManagementHeader,
  ProjectManagementMain,
  ProjectManagementMainContainer,
} from "../components";
import { SmallIconButton } from "../components/Buttons";
import DeactivateAndDeleteModal from "../components/Modals/DeactivateAndDeleteModal";
import AddEditMilestone from "../components/PopPupModules/AddEditMilestone";
import { ProjectMilestone } from "../ProjectDesktop";
import {
  clearDeleteModalSatate,
  clearMilestoneModalState,
  deactivateRequest,
  getProjectDataRequest,
  setMilestoneModalState,
} from "../redux/actions";
import projectDeleteIcon from "../../../assets/ERIcons/projectDeleteIcon.svg";
import BackDrop from "../../../CommonModules/sharedComponents/Loader/BackDrop";
const Milestone = () => {
  const [milestones, setMilestones] = useState([]);
  const history = useHistory();
  const modalsStatus = useSelector(
    (state) => state?.ProjectManagementReducer?.modalsStatus
  );
  const deactivateModalAndStatus = useSelector(
    (state) => state?.ProjectManagementReducer?.deactivateModalAndStatus
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
  useEffect(() => {
    const { location } = history;
    if (location?.state && Object?.keys(location?.state)?.length > 0) {
      setMilestones(
        (location?.state?.milestone_data && [
          ...location?.state?.milestone_data,
        ]) ||
          []
      );
    }
  }, [history]);
  useEffect(() => {
    if (projectData && projectData.length > 0) {
      let currentProject =
        projectData.filter(
          (item) => item.project_id === history?.location?.state?.project_id
        ) || [];
      if (currentProject && currentProject.length > 0) {
        const milestones = currentProject[0]?.milestone_data;
        if (milestones && milestones.length > 0) {
          setMilestones(milestones);
        } else {
          setMilestones([]);
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
        isLoading={isDeactivateRequestInProgress || isProjectDataLoading}
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
      <AddEditMilestone
        visible={modalsStatus?.milestoneModal?.isVisible}
        onClose={() => dispatch(clearMilestoneModalState())}
        isEdit={modalsStatus?.milestoneModal?.isEdit}
        editData={modalsStatus?.milestoneModal?.editData}
      />
      <ProjectManagementHeader isNoBorder>
        <div className="mb-3 w-100 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <SmallIconButton className="mr-1" onClick={() => history.goBack()}>
              <MdChevronLeft />
            </SmallIconButton>
            <p className="project-management__header-title mb-0 d-inline-block">
              Milestone
            </p>
          </div>
          <SmallIconButton
            type="primary"
            className="mr-2"
            onClick={() =>
              dispatch(
                setMilestoneModalState({
                  ...modalsStatus?.milestoneModal,
                  isVisible: !modalsStatus?.milestoneModal?.isVisible,
                  projectId: history?.location?.state?.project_id,
                })
              )
            }
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
          {history?.location?.state?.project_name}
        </p>
      </ProjectManagementHeader>
      <ProjectManagementMainContainer>
        <ProjectManagementMain className="project-management__main--calender">
          {milestones &&
            milestones.length > 0 &&
            milestones.map((milestone) => (
              <ProjectMilestone
                data={milestone}
                projectName={history?.location?.state?.project_name}
              />
            ))}
          {milestones && milestones.length === 0 && (
            <p
              style={{
                opacity: "0.8",
              }}
              className="project-management__header-title mt-5 text-center"
            >
              No milestones found for this project
            </p>
          )}
        </ProjectManagementMain>
      </ProjectManagementMainContainer>
    </>
  );
};

export default Milestone;
