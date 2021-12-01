import { Modal, Progress } from "antd";
import React, { useEffect, useState } from "react";
import {
  MdAdd,
  MdExpandMore,
  MdMoreHoriz,
  MdTextsms,
  MdCheckCircle,
  MdRadioButtonChecked,
  MdHistory,
  MdBlock,
} from "react-icons/md";
import {
  IoBanOutline,
  IoCalendarOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";
import {
  DeleteIconButton,
  EditIconButton,
  SmallIconButton,
} from "../components/Buttons";
import { RiMessage2Fill } from "react-icons/ri";
import "./style.css";
import { useHistory, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import { useOuterClick } from "../../OnBording/SubModules/DashBoardCO/components/RightSideGrid/outerClick";
import { useDispatch, useSelector } from "react-redux";
import {
  setDeleteModalState,
  setMilestoneModalState,
  setProjectModalState,
  setTaskListModalState,
  setTaskModalState,
} from "../redux/actions";
import moment from "moment";
const Project = ({ data }) => {
  const [expandMoreLevel, setExpandMoreLevel] = useState(0);
  const [milestoneExpandMoreIds, setMilestoneExpandMoreIds] = useState([]);
  const [isShowProjectContextMenu, setIsShowProjectContextMenu] =
    useState(false);
  const projectContextMenuRef = useOuterClick(() =>
    setIsShowProjectContextMenu(!isShowProjectContextMenu)
  );
  const modalsStatus = useSelector(
    (state) => state?.ProjectManagementReducer?.modalsStatus
  );
  const projectData = useSelector(
    (state) => state?.ProjectManagementReducer?.projectManagementData?.projects
  );
  const deactivateModalAndStatus = useSelector(
    (state) => state?.ProjectManagementReducer?.deactivateModalAndStatus
  );
  const usersList = useSelector(
    (state) => state?.ProjectManagementReducer?.usersList
  );
  const dispatch = useDispatch();
  const handleMilestoneExpandMoreClick = (id) => {
    if (id && milestoneExpandMoreIds.includes(id)) {
      setMilestoneExpandMoreIds(
        [...milestoneExpandMoreIds].filter((m_id) => m_id !== id)
      );
    } else if (id && !milestoneExpandMoreIds.includes(id)) {
      setMilestoneExpandMoreIds([...milestoneExpandMoreIds, id]);
    }
  };
  const addMilestoneHandler = () =>
    dispatch(
      setMilestoneModalState({
        ...modalsStatus?.milestoneModal,
        isVisible: !modalsStatus?.milestoneModal?.isVisible,
        projectId: project_id,
      })
    );
  const {
    project_id,
    project_name,
    project_owner,
    project_start_date,
    project_end_date,
    project_assign_users,
    project_overview,
  } = data;
  const project_duration = differenceInDays(
    project_start_date,
    project_end_date
  );
  const history = useHistory();
  const { url } = useRouteMatch();

  useEffect(() => {
    console.log(expandMoreLevel);
  }, [expandMoreLevel]);
  return (
    <>
      {/* <Modal visible={true}>hi</Modal> */}
      {/* Desktop Component */}
      <div
        key={project_id || new Date().getTime()}
        className="d-none d-md-block project-management__project-item my-md-2 position-relative"
      >
        {isShowProjectContextMenu && (
          <ProjectAndTaskContextMenu
            containerRef={projectContextMenuRef}
            onAddClick={addMilestoneHandler}
            onEditClick={() => {
              dispatch(
                setProjectModalState({
                  ...modalsStatus?.projectModal,
                  isVisible: true,
                  isEdit: true,
                  editData: {
                    project_id,
                    project_name,
                    start_date: project_start_date,
                    end_date: project_end_date,
                    project_overview,
                    assign_user: project_assign_users,
                  },
                  projectId: project_id,
                })
              );
            }}
            onDeleteClick={() => {
              dispatch(
                setDeleteModalState({
                  ...deactivateModalAndStatus,
                  modalName: "Project",
                  id: project_id,
                  isVisible: true,
                })
              );
            }}
          />
        )}
        <div className="project-management__project-data-container d-flex align-items-center w-100 justify-content-between">
          <p className="project-data-container__project-name project-data-container__item">
            {project_name || "Management"}
          </p>
          {/* <p className="project-data-container__item">1</p> */}
          <p
            className="project-data-container__item wide"
            title={project_owner}
            style={{
              cursor: "pointer",
            }}
          >
            {(usersList?.length > 0 &&
              project_owner &&
              getUserName(usersList, project_owner)) ||
              project_owner}
          </p>
          <p className="project-data-container__item">3</p>
          <p className="project-data-container__item">4</p>
          <p className="project-data-container__item wide-2">
            {project_duration}
          </p>
          <p className="project-data-container__item wide">
            {project_start_date || "-"}
          </p>
          <p className="project-data-container__item wide">
            {project_end_date || "-"}
          </p>
          <p
            className="project-data-container__item"
            title={project_assign_users && project_assign_users[0]}
          >
            {(project_assign_users &&
              project_assign_users?.length > 0 &&
              usersList?.length > 0 &&
              getUserName(usersList, project_assign_users[0])) ||
              "-"}
          </p>
          <div className="project-data-container__buttons d-flex justify-content-end align-items-center">
            <SmallIconButton
              type="outlined"
              className="mr-3"
              onClick={() => {
                setIsShowProjectContextMenu(!isShowProjectContextMenu);
              }}
            >
              <MdMoreHoriz />
            </SmallIconButton>
            <SmallIconButton
              onClick={() => {
                setExpandMoreLevel(expandMoreLevel >= 1 ? 0 : 1);
                setMilestoneExpandMoreIds([]);
              }}
              className={
                data &&
                (data?.milestone_data?.length <= 0 || !data?.milestone_data) &&
                "project-management__button--disabled"
              }
            >
              <MdExpandMore
                className={`icon ${
                  expandMoreLevel >= 1 && "icon__rotate--180"
                }`}
              />
            </SmallIconButton>
          </div>
        </div>
        {expandMoreLevel >= 1 && (
          <div className="py-2 pl-2 background--grey">
            {data &&
              data?.milestone_data &&
              data?.milestone_data?.length > 0 &&
              data?.milestone_data?.map((milestone) => {
                const {
                  milestone_end_date,
                  milestone_id,
                  milestone_owner,
                  milestone_start_date,
                  milestone_title,
                  milestone_assign_users,
                } = milestone;
                return (
                  <div
                    id={milestone_id}
                    className="project-management__project-item mb-md-2"
                  >
                    <div className="project-management__project-data-container project-data-container__1 d-flex align-items-center justify-content-between">
                      <p className="project-data-container__item project-data-container__project-name text-black">
                        {milestone_title}
                      </p>
                      {/* <p className="project-data-container__item">40%</p> */}
                      <p className="project-data-container__item wide">
                        {getUserName(usersList, milestone_owner) || "-"}
                      </p>
                      <p className="project-data-container__item">-</p>
                      <p className="project-data-container__item">-</p>
                      <p className="project-data-container__item wide-2">
                        {differenceInDays(
                          milestone_start_date,
                          milestone_end_date
                        )}
                      </p>
                      <p className="project-data-container__item wide">
                        {milestone_start_date || "-"}
                      </p>
                      <p className="project-data-container__item wide">
                        {milestone_end_date || "-"}
                      </p>
                      <p
                        className="project-data-container__item"
                        title={milestone_assign_users?.toString()}
                      >
                        {/* {(milestone_assign_users &&
                          milestone_assign_users?.length > 0 &&
                          usersList?.length > 0 &&
                          getUserName(usersList, milestone_assign_users[0])) ||
                          "-"} */}
                        {getUsers(usersList, milestone_assign_users)}
                      </p>
                      <div className="project-data-container__buttons d-flex align-items-center justify-content-end">
                        <EditIconButton
                          className="mr-2"
                          onClickHandler={() => {
                            dispatch(
                              setMilestoneModalState({
                                ...modalsStatus?.milestoneModal,
                                isVisible: true,
                                isEdit: true,
                                editData: {
                                  milestone_id,
                                  project: project_id,
                                  title: milestone_title,
                                  start_date: milestone_start_date,
                                  end_date: milestone_end_date,
                                  assign_user: milestone_assign_users,
                                },
                              })
                            );
                          }}
                        />
                        <DeleteIconButton
                          className="mr-2"
                          onClickHandler={() =>
                            dispatch(
                              setDeleteModalState({
                                ...deactivateModalAndStatus,
                                modalName: "Milestone",
                                id: milestone_id,
                                isVisible: true,
                              })
                            )
                          }
                        />
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
                                milestonesList: _project_milestones || [],
                              })
                            );
                          }}
                        >
                          <MdAdd />
                        </SmallIconButton>
                        <SmallIconButton
                          // onClick={() =>
                          //   setExpandMoreLevel(expandMoreLevel >= 2 ? 1 : 2)
                          // }
                          onClick={() =>
                            handleMilestoneExpandMoreClick(milestone_id)
                          }
                          className={
                            milestone &&
                            (milestone?.task_list_data?.length <= 0 ||
                              !milestone?.task_list_data) &&
                            "project-management__button--disabled"
                          }
                        >
                          <MdExpandMore
                            className={`icon ${
                              milestoneExpandMoreIds.includes(milestone_id) &&
                              "icon__rotate--180"
                            }`}
                          />
                        </SmallIconButton>
                      </div>
                    </div>
                    {milestoneExpandMoreIds.includes(milestone_id) && (
                      <div className="py-2 pl-2 background--white">
                        {milestone?.task_list_data &&
                          milestone?.task_list_data?.length > 0 &&
                          milestone?.task_list_data?.map((tasklist) => {
                            return <DesktopTaskListComponent data={tasklist} />;
                          })}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        )}
      </div>
      {/* Mobile Component */}
      <div className="d-flex d-md-none project-management__project-container-mobile mb-3 p-2 py-3">
        <div className="w-100">
          {/* Title */}
          <div className="d-flex align-items-center justify-content-between mb-3">
            <p className="project-container-mobile__data-title flex-grow-1 mb-0">
              {project_name}
            </p>
            {/* <SmallIconButton type="grey" className="mx-2">
              <IoCheckmarkCircleOutline />
            </SmallIconButton>
            <SmallIconButton type="grey">
              <IoBanOutline />
            </SmallIconButton> */}
          </div>
          <div className="d-flex justify-content-between w-100 align-items-center">
            <div className="project-container-mobile__data">
              {/* Data */}
              <div className="d-grid project-container-mobile__data-container">
                <div className="project-container-mobile__data-item">
                  <p className="project-data-container__item project-container-mobile__data-item-title">
                    Owner
                  </p>
                  <p className="project-data-container__item">
                    {(usersList?.length > 0 &&
                      project_owner &&
                      getUserName(usersList, project_owner)) ||
                      project_owner}
                  </p>
                </div>
                <Link to={`${url}/project-tasks`}>
                  <div className="project-container-mobile__data-item">
                    <p className="project-data-container__item project-container-mobile__data-item-title">
                      Task
                    </p>
                    <p className="project-data-container__item">2/2</p>
                  </div>
                </Link>
                <Link to={`${url}/project-milestone`}>
                  <div className="project-container-mobile__data-item">
                    <p className="project-data-container__item project-container-mobile__data-item-title">
                      Milestone
                    </p>
                    <p className="project-data-container__item">
                      0/{data?.milestone_data?.length || 0}
                    </p>
                  </div>
                </Link>
                <div className="project-container-mobile__data-item">
                  <p className="project-data-container__item project-container-mobile__data-item-title">
                    Duration
                  </p>
                  <p className="project-data-container__item">
                    {project_duration}
                  </p>
                </div>
              </div>
            </div>
            <div className="project-container-mobile__progress px-3">
              {/* Progress Bar */}
              <Progress
                trailColor="tranparent"
                type="circle"
                percent={66}
                width={70}
                strokeColor="#7A73FF"
                strokeWidth={11}
              />
            </div>
          </div>
          {/* Bottom Data */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            {/* Start Date and End Date */}
            <p className="project-data-container__item flex-grow-1 text-left">
              <IoCalendarOutline />
              &nbsp;
              {moment(project_start_date).format("D MMM YYYY") +
                " To " +
                moment(project_end_date).format("D MMM YYYY")}
            </p>
            <EditIconButton className="mx-2" />
            <DeleteIconButton />
            {/* Edit and Delete Button */}
          </div>
        </div>
      </div>
    </>
  );
};

export const DesktopTask = ({ data }) => {
  const [taskData, setTaskData] = useState(data || {});
  const dispatch = useDispatch();
  const modalsStatus = useSelector(
    (state) => state?.ProjectManagementReducer?.modalsStatus
  );
  const deactivateModalAndStatus = useSelector(
    (state) => state?.ProjectManagementReducer?.deactivateModalAndStatus
  );
  const usersList = useSelector(
    (state) => state?.ProjectManagementReducer?.usersList
  );
  return (
    <div className="project-data-container__3 d-none d-md-flex align-items-center justify-content-between">
      <p className="project-data-container__project-name project-data-container__item">
        {taskData?.task_subject}
      </p>
      {/* <p className="project-data-container__item">10%</p> */}
      <p className="project-data-container__item wide">Ajit</p>
      <p className="project-data-container__item wide-flex-2">
        {taskData?.task_frequency || "-"}
      </p>
      <p className="project-data-container__item wide-2">
        {differenceInDays(taskData?.task_start_date, taskData?.task_end_date)}
      </p>
      <p className="project-data-container__item wide">
        {taskData?.task_start_date}
      </p>
      <p className="project-data-container__item wide">
        {taskData?.task_end_date}
      </p>
      <p className="project-data-container__item">
        {getUserName(usersList, taskData?.assign_to) || "-"}
      </p>
      <div className="project-data-container__buttons d-flex justify-content-end align-items-center">
        <SmallIconButton type="grey" className="p-2 mr-2">
          <MdTextsms className="icon__small" />
        </SmallIconButton>
        <EditIconButton
          className="mr-2"
          onClickHandler={() => {
            dispatch(
              setTaskModalState({
                ...modalsStatus?.taskModal,
                isVisible: true,
                isEdit: true,
                editData: {
                  ...modalsStatus?.taskModal?.editData,
                  task_id: taskData?.task_id,
                  milestone_id: taskData?.task_project_milestone,
                  project_id: taskData?.task_project,
                  subject: taskData?.task_subject,
                  task_list_id: taskData?.task_project_task_list,
                  start_date: taskData?.task_start_date,
                  end_date: taskData?.task_end_date,
                  frequency: taskData?.task_frequency,
                  assign_to: taskData?.assign_to,
                  description: taskData?.task_description || "",
                  comments: taskData?.task_comments || "",
                },
              })
            );
          }}
        />
        <SmallIconButton type="grey" className="p-2 mr-2">
          <MdCheckCircle className="icon__small" />
        </SmallIconButton>
        <SmallIconButton
          type="grey"
          className="p-2"
          onClick={() =>
            dispatch(
              setDeleteModalState({
                ...deactivateModalAndStatus,
                modalName: "Task",
                id: taskData?.task_id,
                isVisible: true,
              })
            )
          }
        >
          <MdRadioButtonChecked className="icon__small" />
        </SmallIconButton>
      </div>
    </div>
  );
};
const DesktopTaskListComponent = ({ data }) => {
  const [taskListData, setTaskListData] = useState(data || {});
  const [isShowTaskListContextMenu, setIsShowTaskListContextMenu] =
    useState(false);
  const taskListContextMenuRef = useOuterClick(() =>
    setIsShowTaskListContextMenu(!isShowTaskListContextMenu)
  );
  const [isExpandMore, setIsExpandMore] = useState(false);
  const projectData = useSelector(
    (state) => state?.ProjectManagementReducer?.projectManagementData?.projects
  );
  const modalsStatus = useSelector(
    (state) => state?.ProjectManagementReducer?.modalsStatus
  );
  const deactivateModalAndStatus = useSelector(
    (state) => state?.ProjectManagementReducer?.deactivateModalAndStatus
  );
  const dispatch = useDispatch();
  return (
    <div
      key={taskListData?.task_list_id}
      className="position-relative project-management__project-item project-management__project-item-2 mb-md-2"
    >
      {isShowTaskListContextMenu && (
        <ProjectAndTaskContextMenu
          containerRef={taskListContextMenuRef}
          onEditClick={() => {
            const _project = [...projectData].filter(
              (item) => item.project_id === taskListData?.project
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
                isEdit: true,
                milestonesList: _project_milestones || [],
                editData: {
                  ...modalsStatus?.taskListModal?.editData,
                  milestone_id: taskListData?.project_milestone,
                  project_id: taskListData?.project,
                  title: taskListData?.task_list_title,
                  task_list_id: taskListData?.task_list_id,
                },
              })
            );
          }}
          onAddClick={() => {
            dispatch(
              setTaskModalState({
                ...modalsStatus?.taskModal,
                isVisible: true,
                isEdit: false,
                editData: {
                  ...modalsStatus?.taskModal?.editData,
                  milestone_id: taskListData?.project_milestone,
                  project_id: taskListData?.project,
                  task_list_id: taskListData?.task_list_id,
                },
              })
            );
          }}
          onDeleteClick={() =>
            dispatch(
              setDeleteModalState({
                ...deactivateModalAndStatus,
                modalName: "TaskList",
                id: taskListData?.task_list_id,
                isVisible: true,
              })
            )
          }
        />
      )}
      <div className="project-data-container__2 d-flex align-items-center justify-content-between">
        <p className="project-data-container__project-name project-data-container__item">
          {taskListData?.task_list_title}
        </p>
        <div className="project-data-container__buttons d-flex align-items-center justify-content-between">
          <SmallIconButton
            type="outlined"
            className="mr-3"
            onClick={() =>
              setIsShowTaskListContextMenu(!isShowTaskListContextMenu)
            }
          >
            <MdMoreHoriz />
          </SmallIconButton>
          <SmallIconButton
            onClick={() => setIsExpandMore(!isExpandMore)}
            className={
              taskListData &&
              (taskListData?.task_data?.length <= 0 ||
                !taskListData?.task_data) &&
              "project-management__button--disabled"
            }
          >
            <MdExpandMore
              className={`icon ${isExpandMore && "icon__rotate--180"}`}
            />
          </SmallIconButton>
        </div>
      </div>
      {isExpandMore && (
        <div className="py-2 px-2 background__item-3">
          {/* Last Component */}
          {taskListData &&
            taskListData?.task_data &&
            taskListData?.task_data?.length > 0 &&
            taskListData.task_data.map((task) => {
              return <DesktopTask data={task} />;
            })}
        </div>
      )}
    </div>
  );
};
export const ProjectMilestone = () => {
  return (
    <div className="d-flex d-md-none project-management__project-container-mobile mb-3 p-2 py-3">
      <div className="w-100">
        {/* Title */}
        <div className="d-flex align-items-center justify-content-between mb-3">
          <p className="project-container-mobile__data-title flex-grow-1 mb-0">
            Discussion with Client (Milestone)
          </p>
          {/* <SmallIconButton type="grey" className="mx-2">
          <IoCheckmarkCircleOutline />
        </SmallIconButton>
        <SmallIconButton type="grey">
          <IoBanOutline />
        </SmallIconButton> */}
        </div>
        <div className="d-flex justify-content-between w-100 align-items-center">
          <div className="project-container-mobile__data">
            {/* Data */}
            <div className="d-grid project-container-mobile__data-container mb-3">
              <div className="project-container-mobile__data-item">
                <p className="project-data-container__item project-container-mobile__data-item-title">
                  Owner
                </p>
                <p className="project-data-container__item">Ashu</p>
              </div>
              <div className="project-container-mobile__data-item">
                <p className="project-data-container__item project-container-mobile__data-item-title">
                  Assign to
                </p>
                <p className="project-data-container__item">Ashu Kumar</p>
              </div>
            </div>
            <div className="d-flex mb-3">
              <p className="project-data-container__item project-container-mobile__data-item-title mr-4 mb-0">
                Owner
              </p>
              <p className="project-data-container__item mb-0">Ashu</p>
            </div>
          </div>
          <div className="project-container-mobile__progress px-3">
            {/* Progress Bar */}
            <Progress
              trailColor="tranparent"
              type="circle"
              percent={66}
              width={70}
              strokeColor="#7A73FF"
              strokeWidth={11}
            />
          </div>
        </div>
        {/* Bottom Data */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          {/* Start Date and End Date */}
          <p className="project-data-container__item flex-grow-1 text-left">
            <IoCalendarOutline /> 14 Aug, 2021 To 21 Aug, 2021
          </p>
          <EditIconButton className="mx-2" />
          <DeleteIconButton />
          {/* Edit and Delete Button */}
        </div>
      </div>
    </div>
  );
};

export const ProjectSubTask = ({ data }) => {
  const usersList = useSelector(
    (state) => state?.ProjectManagementReducer?.usersList
  );
  const modalsStatus = useSelector(
    (state) => state?.ProjectManagementReducer?.modalsStatus
  );
  const dispatch = useDispatch();
  return (
    <div
      key={data?.task_id}
      className="d-flex d-md-none project-management__project-container-mobile mb-3 p-2 py-3"
    >
      <div className="w-100">
        {/* Title */}
        <div className="d-flex align-items-center justify-content-between mb-3">
          <p className="project-container-mobile__data-title flex-grow-1 mb-0">
            {data?.task_subject}
          </p>
          <SmallIconButton type="grey" className="mx-2">
            <IoCheckmarkCircleOutline />
          </SmallIconButton>
          <SmallIconButton type="grey">
            <IoBanOutline />
          </SmallIconButton>
        </div>
        <div className="d-flex justify-content-between w-100 align-items-center">
          <div className="project-container-mobile__data">
            {/* Data */}
            <div className="d-grid project-container-mobile__data-container mb-3">
              <div className="project-container-mobile__data-item">
                <p className="project-data-container__item project-container-mobile__data-item-title">
                  Owner
                </p>
                <p className="project-data-container__item">Ashu</p>
              </div>
              <div className="project-container-mobile__data-item">
                <p className="project-data-container__item project-container-mobile__data-item-title">
                  Assign to
                </p>
                <p className="project-data-container__item">
                  {usersList &&
                    usersList?.length > 0 &&
                    usersList.filter(
                      (user) => user.value === data?.assign_to
                    )[0]?.label}
                </p>
              </div>
            </div>
            {/* Data (Row) */}
            <div className="d-flex mb-3">
              <p className="project-data-container__item project-container-mobile__data-item-title project-container-mobile__sub-task-text mr-4 mb-0">
                Duration
              </p>
              <p className="project-data-container__item project-container-mobile__sub-task-text mb-0">
                : 3 days
              </p>
            </div>
            <div className="d-flex mb-3">
              <p className="project-data-container__item project-container-mobile__sub-task-text project-container-mobile__data-item-title mr-4 mb-0">
                Schedule Date
              </p>
              <p className="project-container-mobile__sub-task-text project-data-container__item mb-0">
                :{" "}
                {data?.task_start_date &&
                  moment(data?.task_start_date).format("D MMM YYYY")}
              </p>
            </div>
            <div className="d-flex mb-3">
              <p className="project-container-mobile__sub-task-text project-data-container__item project-container-mobile__data-item-title mr-4 mb-0">
                Actual End Date
              </p>
              <p className="project-container-mobile__sub-task-text project-data-container__item mb-0">
                :{" "}
                {data?.task_end_date &&
                  moment(data?.task_end_date).format("D MMM YYYY")}
              </p>
            </div>
          </div>
          <div className="project-container-mobile__progress px-3">
            {/* Progress Bar */}
            <Progress
              trailColor="tranparent"
              type="circle"
              percent={66}
              width={70}
              strokeColor="#7A73FF"
              strokeWidth={11}
            />
          </div>
        </div>
        {/* Bottom Data */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          {/* Start Date and End Date */}
          <p className="project-data-container__item flex-grow-1 text-left">
            <IoCalendarOutline /> 14 Aug, 2021 To 21 Aug, 2021
          </p>
          {/* Message and Edit Button */}
          <SmallIconButton type="grey" className="mx-2 icon__small p-1">
            <RiMessage2Fill />
          </SmallIconButton>
          <EditIconButton
            onClickHandler={() => {
              dispatch(
                setTaskModalState({
                  ...modalsStatus?.taskModal,
                  isVisible: true,
                  isEdit: true,
                  editData: {
                    ...modalsStatus?.taskModal?.editData,
                    task_id: data?.task_id,
                    milestone_id: data?.task_project_milestone,
                    project_id: data?.task_project,
                    subject: data?.task_subject,
                    task_list_id: data?.task_project_task_list,
                    start_date: data?.task_start_date,
                    end_date: data?.task_end_date,
                    frequency: data?.task_frequency,
                    assign_to: data?.assign_to,
                    description: data?.task_description || "",
                    comments: data?.task_comments || "",
                  },
                })
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export const ProjectHeader = ({ isTasksHeader }) => (
  <div className="d-none d-md-flex mt-md-3 mb-md-2 project-management__project-header project-management__project-data-container align-items-center justify-content-between">
    <p className="project-data-container__project-name project-data-container__item">
      Project Name
    </p>
    {/* <p className="project-data-container__item">Completed</p> */}
    <p className="project-data-container__item wide">Owner</p>
    {!isTasksHeader && (
      <>
        <p className="project-data-container__item">Task</p>
        <p className="project-data-container__item">Milestone</p>
      </>
    )}
    {isTasksHeader && (
      <p className="project-data-container__item wide-flex-2">Frequency</p>
    )}
    <p className="project-data-container__item wide-2">Duration</p>
    <p className="project-data-container__item wide">Start Date</p>
    <p className="project-data-container__item wide">End Date</p>
    <p className="project-data-container__item">Assign</p>
    <div className="project-data-container__buttons"></div>
  </div>
);

export const ProjectTask = () => {
  const { url } = useRouteMatch();
  return (
    <Link
      to={{
        pathname: `${url}/sub-tasks`,
        state: {
          subtask_name: "Project Discuss Meeting",
          from: url,
        },
      }}
    >
      <div className="project-data-container__2 d-flex align-items-center justify-content-between mb-3">
        <p className="project-data-container__project-name project-data-container__item flex-grow-1">
          Project Discuss Meeting
        </p>
        <div className="project-data-container__buttons d-flex align-items-center justify-content-between">
          <SmallIconButton type="outlined">
            <MdMoreHoriz />
          </SmallIconButton>
        </div>
      </div>
    </Link>
  );
};

export const ProjectAndTaskContextMenu = ({
  containerRef,
  onEditClick,
  onDeleteClick,
  onAddClick,
}) => {
  return (
    <div className="project-three-dot-popup" ref={containerRef}>
      <div className="d-flex align-items-center justify-content-between">
        <EditIconButton className="mr-2" onClickHandler={onEditClick} />
        <DeleteIconButton className="mr-2" onClickHandler={onDeleteClick} />
        <SmallIconButton type="primary" onClick={onAddClick}>
          <MdAdd />
        </SmallIconButton>
      </div>
      <button className="mt-3 project-management__button project-management__button--outlined">
        set as template
      </button>
    </div>
  );
};

export const TrashProject = ({ data }) => {
  const { url } = useRouteMatch();
  return (
    <>
      <div
        key={data?.project_id}
        className="project-management__trash-project-data-container d-none d-md-flex align-items-center w-100 justify-content-between"
      >
        <p className="project-data-container__project-name project-data-container__item">
          {data?.project_name || "Management"}
        </p>
        <p className="project-data-container__item">1</p>
        <p className="project-data-container__item wide">
          {data?.project_owner || "Ashu Kumar"}
        </p>
        <p className="project-data-container__item">3</p>
        <p className="project-data-container__item">4</p>
        <p className="project-data-container__item wide-2">2 Day</p>
        <p className="project-data-container__item wide">
          {data?.project_start_date || "-"}
        </p>
        <p className="project-data-container__item wide">
          {data?.project_end_date || "-"}
        </p>
        <p className="project-data-container__item">8</p>
        <div className="project-data-container__buttons d-flex justify-content-end align-items-center">
          <SmallIconButton type="primary" className="mr-3">
            <MdHistory />
          </SmallIconButton>
          <DeleteIconButton />
        </div>
      </div>
      {/* Mobile Component */}
      <div className="d-flex d-md-none project-management__project-container-mobile mb-3 p-2 py-3">
        <div className="w-100">
          {/* Title */}
          <div className="d-flex align-items-center justify-content-between mb-3">
            <p className="project-container-mobile__data-title flex-grow-1 mb-0">
              Management Design
            </p>
            {/* <SmallIconButton type="grey" className="mx-2">
              <IoCheckmarkCircleOutline />
            </SmallIconButton>
            <SmallIconButton type="grey">
              <IoBanOutline />
            </SmallIconButton> */}
          </div>
          <div className="d-flex justify-content-between w-100 align-items-center">
            <div className="project-container-mobile__data">
              {/* Data */}
              <div className="d-grid project-container-mobile__data-container">
                <div className="project-container-mobile__data-item">
                  <p className="project-data-container__item project-container-mobile__data-item-title">
                    Owner
                  </p>
                  <p className="project-data-container__item">Ashu</p>
                </div>
                {/* <div className="project-container-mobile__data-item">
                    <p className="project-data-container__item project-container-mobile__data-item-title">
                      Assign To
                    </p>
                    <p className="project-data-container__item">{data?.assign_to}</p>
                  </div> */}
                {/* <div className="project-container-mobile__data-item">
                  <p className="project-data-container__item project-container-mobile__data-item-title">
                    Milestone
                  </p>
                  <p className="project-data-container__item">0/1</p>
                </div> */}
                <div className="project-container-mobile__data-item">
                  <p className="project-data-container__item project-container-mobile__data-item-title">
                    Duration
                  </p>
                  <p className="project-data-container__item">2 Days</p>
                </div>
              </div>
            </div>
            <div className="project-container-mobile__progress px-3">
              {/* Progress Bar */}
              <Progress
                trailColor="tranparent"
                type="circle"
                percent={66}
                width={70}
                strokeColor="#7A73FF"
                strokeWidth={11}
              />
            </div>
          </div>
          {/* Bottom Data */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            {/* Start Date and End Date */}
            <p className="project-data-container__item flex-grow-1 text-left">
              <IoCalendarOutline /> 14 Aug, 2021 To 21 Aug, 2021
            </p>
            <SmallIconButton type="primary" className="mr-3">
              <MdHistory />
            </SmallIconButton>
            <DeleteIconButton />
            {/* Edit and Delete Button */}
          </div>
        </div>
      </div>
    </>
  );
};

export const TrashMilestone = ({ data }) => {
  return (
    <>
      <div
        key={data?.milestone_id}
        className="d-none d-md-block project-management__project-item mb-md-2"
      >
        <div className="project-management__trash-project-data-container d-flex align-items-center justify-content-between">
          <p className="project-data-container__item project-data-container__project-name text-black">
            {data?.milestone_title}
          </p>
          <p className="project-data-container__item">40%</p>
          <p className="project-data-container__item wide">
            {data?.milestone_owner}
          </p>
          <p className="project-data-container__item">-</p>
          <p className="project-data-container__item">-</p>
          <p className="project-data-container__item wide-2">3 Day</p>
          <p className="project-data-container__item wide">
            {data?.milestone_start_date || "-"}
          </p>
          <p className="project-data-container__item wide">
            {data?.milestone_end_date || "-"}
          </p>
          <p className="project-data-container__item">Ajit Shah</p>
          <div className="project-data-container__buttons d-flex align-items-center justify-content-end">
            <SmallIconButton type="primary" className="mr-3">
              <MdHistory />
            </SmallIconButton>
            <DeleteIconButton />
          </div>
        </div>
      </div>
      {/* Mobile Component */}
      <div className="d-flex d-md-none project-management__project-container-mobile mb-3 p-2 py-3">
        <div className="w-100">
          {/* Title */}
          <div className="d-flex align-items-center justify-content-between mb-3">
            <p className="project-container-mobile__data-title flex-grow-1 mb-0">
              {data?.milestone_title}
            </p>
          </div>
          <div className="d-flex justify-content-between w-100 align-items-center">
            <div className="project-container-mobile__data">
              {/* Data */}
              <div className="d-grid project-container-mobile__data-container mb-3">
                <div className="project-container-mobile__data-item">
                  <p className="project-data-container__item project-container-mobile__data-item-title">
                    Owner
                  </p>
                  <p className="project-data-container__item">
                    {data?.milestone_owner}
                  </p>
                </div>
                <div className="project-container-mobile__data-item">
                  <p className="project-data-container__item project-container-mobile__data-item-title">
                    Assign to
                  </p>
                  <p className="project-data-container__item">Ashu Kumar</p>
                </div>
              </div>
              {/* <div className="d-flex mb-3">
                <p className="project-data-container__item project-container-mobile__data-item-title mr-4 mb-0">
                  Owner
                </p>
                <p className="project-data-container__item mb-0">
                  {data?.milestone_owner}
                </p>
              </div> */}
            </div>
            <div className="project-container-mobile__progress px-3">
              {/* Progress Bar */}
              <Progress
                trailColor="tranparent"
                type="circle"
                percent={66}
                width={70}
                strokeColor="#7A73FF"
                strokeWidth={11}
              />
            </div>
          </div>
          {/* Bottom Data */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            {/* Start Date and End Date */}
            <p className="project-data-container__item flex-grow-1 text-left">
              <IoCalendarOutline />
              &nbsp;
              {data?.milestone_start_date &&
                data?.milestone_start_date &&
                moment(data?.milestone_start_date).format("D MMM YYYY") +
                  " To " +
                  moment(data?.milestone_end_date).format("D MMM YYYY")}
            </p>
            <SmallIconButton type="primary" className="mr-3">
              <MdHistory />
            </SmallIconButton>
            <DeleteIconButton />
            {/* Edit and Delete Button */}
          </div>
        </div>
      </div>
    </>
  );
};

export const TrashTask = ({ data }) => {
  return (
    <>
      <div className="project-data-container__3 d-none d-md-flex align-items-center justify-content-between">
        <p className="project-data-container__project-name project-data-container__item">
          {data?.task_subject}
        </p>
        <p className="project-data-container__item">10%</p>
        <p className="project-data-container__item wide">Ajit</p>
        <p className="project-data-container__item wide-flex-2">
          {data?.task_frequency || "-"}
        </p>
        <p className="project-data-container__item wide-2">0 Days</p>
        <p className="project-data-container__item wide">
          {data?.task_start_date}
        </p>
        <p className="project-data-container__item wide">
          {data?.task_end_date}
        </p>
        <p className="project-data-container__item">{data?.assign_to || "-"}</p>
        <div className="project-data-container__buttons d-flex justify-content-end align-items-center">
          <SmallIconButton type="grey" className="p-2 mr-2">
            <MdTextsms className="icon__small" />
          </SmallIconButton>
          <SmallIconButton type="grey" className="p-2 mr-2">
            <MdCheckCircle className="icon__small" />
          </SmallIconButton>
          <SmallIconButton type="primary" className="mr-2 p-2">
            <MdHistory className="icon__small" />
          </SmallIconButton>
          <SmallIconButton type="grey" className="p-2">
            <MdBlock className="icon__small" />
          </SmallIconButton>
        </div>
      </div>
      {/* Mobile Component */}
      <div className="d-flex d-md-none project-management__project-container-mobile mb-3 p-2 py-3">
        <div className="w-100">
          {/* Title */}
          <div className="d-flex align-items-center justify-content-between mb-3">
            <p className="project-container-mobile__data-title flex-grow-1 mb-0">
              {data?.task_subject}
            </p>
          </div>
          <div className="d-flex justify-content-between w-100 align-items-center">
            <div className="project-container-mobile__data">
              {/* Data */}
              <div className="d-grid project-container-mobile__data-container mb-3">
                <div className="project-container-mobile__data-item">
                  <p className="project-data-container__item project-container-mobile__data-item-title">
                    Owner
                  </p>
                  <p className="project-data-container__item">
                    {data?.task_owner || "-"}
                  </p>
                </div>
                <div className="project-container-mobile__data-item">
                  <p className="project-data-container__item project-container-mobile__data-item-title">
                    Assign to
                  </p>
                  <p className="project-data-container__item">
                    {data?.assign_to || "-"}
                  </p>
                </div>
              </div>
              <div className="d-flex mb-3 trash-task">
                <p className="text-left project-data-container__item project-container-mobile__data-item-title mr-4 mb-0">
                  Duration
                </p>
                <p className="text-left project-data-container__item mb-0">
                  {data?.duration || "-"}
                </p>
              </div>
              <div className="d-flex mb-3 trash-task">
                <p className="text-left project-data-container__item project-container-mobile__data-item-title mr-4 mb-0">
                  Schedule Date
                </p>
                <p className="text-left project-data-container__item mb-0">
                  {data?.schedule_date || "-"}
                </p>
              </div>
              <div className="d-flex mb-3 trash-task">
                <p className="text-left project-data-container__item project-container-mobile__data-item-title mr-4 mb-0">
                  Actual End Date
                </p>
                <p className="text-left project-data-container__item mb-0">
                  {data?.task_end_date || "-"}
                </p>
              </div>
            </div>
            <div className="project-container-mobile__progress px-3">
              {/* Progress Bar */}
              <Progress
                trailColor="tranparent"
                type="circle"
                percent={66}
                width={70}
                strokeColor="#7A73FF"
                strokeWidth={11}
              />
            </div>
          </div>
          {/* Bottom Data */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            {/* Start Date and End Date */}
            <p className="project-data-container__item flex-grow-1 text-left">
              <IoCalendarOutline />
              &nbsp;
              {data?.task_start_date &&
                data?.task_start_date &&
                moment(data?.task_start_date).format("D MMM YYYY") +
                  " To " +
                  moment(data?.task_end_date).format("D MMM YYYY")}
            </p>
            <SmallIconButton type="primary" className="mr-3">
              <MdHistory />
            </SmallIconButton>
            <DeleteIconButton />
            {/* Edit and Delete Button */}
          </div>
        </div>
      </div>
    </>
  );
};

const getUserName = (userList, email) => {
  if (userList && userList?.length > 0) {
    const user = [...userList].filter((element) => element.value === email)[0];
    return (
      (user && Object.keys(user)?.length > 0 && user?.label) ||
      trimString(email)
    );
  }
  return email;
};
const getUsers = (usersList, assign_users) => {
  const userName =
    (assign_users &&
      assign_users?.length > 0 &&
      getUserName(usersList, assign_users[0])) ||
    "";
  return (
    trimString(userName) +
    (assign_users?.length > 1 ? " +" + (assign_users?.length - 1) : "")
  );
};
const trimString = (str, n = 8) => {
  return (str && str?.length > n && str?.substring(0, n) + "...") || str;
};
const differenceInDays = (start_date, end_date) => {
  const difference =
    (start_date &&
      end_date &&
      moment(end_date)?.diff(moment(start_date), "days") + 1) ||
    0;
  return difference + (difference > 1 ? " days" : " day");
};
export default Project;
