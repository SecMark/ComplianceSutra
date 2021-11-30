import { handleActions } from "redux-actions";

import {
  GET_PROJECT_DETAIL,
  SET_PROJECT_DETAIL,
  GET_PROJECT_MANAGEMENT_DATA_REQUEST,
  GET_PROJECT_MANAGEMENT_DATA_SUCCESS,
  GET_PROJECT_MANAGEMENT_DATA_FAILED,
  SET_PROJECT_MODAL_STATE,
  SET_MILESTONE_MODAL_STATE,
  SET_TASKLIST_MODAL_STATE,
  SET_TASK_MODAL_STATE,
  CLEAR_PROJECT_MODAL_STATE,
  CLEAR_MILESTONE_MODAL_STATE,
  CLEAR_TASKLIST_MODAL_STATE,
  CLAER_TASK_MODAL_STATE,
  GET_USERS_LIST_SUCCESS,
  GET_USERS_LIST_REQUEST,
  GET_USERS_LIST_FAILED,
  GET_INDIVIDUAL_TASKS_REQUEST,
  GET_INDIVIDUAL_TASKS_SUCCESS,
  GET_INDIVIDUAL_TASKS_FAILED,
  SET_DELETE_MODAL_STATE,
  CLEAR_DELETE_MODAL_STATE,
  DEACTIVATE_REQUEST,
  DEACTIVATE_SUCCESS,
  DEACTIVATE_FAILED,
  GET_TRASH_PROJECTS_REQUEST,
  GET_TRASH_PROJECTS_SUCCESS,
  GET_TRASH_MILESTONE_REQUEST,
  GET_TRASH_MILESTONE_SUCCESS,
  GET_TRASH_MILESTONE_FAILED,
  GET_TRASH_TASKS_REQUEST,
  GET_TRASH_TASKS_SUCCESS,
  GET_TRASH_TASKS_FAILED,
  GET_TRASH_PROJECTS_FAILED,
} from "./actions";

export const addAndEditProjectReducer = (
  state = {
    projectDetails: {
      project_name: "",
      assign_user: [],
      start_date: "",
      end_date: "",
      project_overview: "",
    },
    Registered_user: [],
  },
  { type, payload }
) => {
  switch (type) {
    case GET_PROJECT_DETAIL:
      return state;
    case SET_PROJECT_DETAIL:
      return {
        ...state,
        projectDetails: {
          ...payload,
        },
      };
    default:
      return state;
  }
};

export const projectManagementData = (state = {}, { type, payload }) => {
  switch (type) {
    case GET_PROJECT_MANAGEMENT_DATA_REQUEST:
      return {};
    case GET_PROJECT_MANAGEMENT_DATA_SUCCESS:
      return payload;
    case GET_PROJECT_MANAGEMENT_DATA_FAILED:
      return {};
    default:
      return state;
  }
};

const actionHandlers = {
  [GET_PROJECT_MANAGEMENT_DATA_REQUEST]: (state) => ({
    ...state,
    projectManagementData: {
      ...state.projectManagementData,
      isLoading: true,
      projects: [...state?.projectManagementData?.projects],
      isError: false,
    },
  }),
  [GET_PROJECT_MANAGEMENT_DATA_SUCCESS]: (state, { payload }) => ({
    ...state,
    projectManagementData: {
      ...state.projectManagementData,
      isLoading: false,
      projects: payload,
      isError: false,
    },
  }),
  [GET_PROJECT_MANAGEMENT_DATA_FAILED]: (state) => ({
    ...state,
    projectManagementData: {
      ...state.projectManagementData,
      isLoading: false,
      projects: [],
      isError: true,
    },
  }),

  [GET_INDIVIDUAL_TASKS_REQUEST]: (state) => ({
    ...state,
    projectManagementData: {
      ...state?.projectManagementData,
      isLoading: true,
      individualTasks: [],
      isError: false,
    },
  }),
  [GET_INDIVIDUAL_TASKS_SUCCESS]: (state, { payload }) => ({
    ...state,
    projectManagementData: {
      ...state?.projectManagementData,
      isLoading: false,
      individualTasks: [...payload],
      isError: false,
    },
  }),
  [GET_INDIVIDUAL_TASKS_FAILED]: (state) => ({
    ...state,
    projectManagementData: {
      ...state?.projectManagementData,
      isLoading: false,
      individualTasks: [],
      isError: true,
    },
  }),

  [SET_PROJECT_MODAL_STATE]: (state, { payload }) => ({
    ...state,
    modalsStatus: {
      ...state.modalsStatus,
      projectModal: {
        ...state.modalsStatus.projectModal,
        ...payload,
      },
    },
  }),

  [SET_MILESTONE_MODAL_STATE]: (state, { payload }) => ({
    ...state,
    modalsStatus: {
      ...state.modalsStatus,
      milestoneModal: {
        ...state.modalsStatus.milestoneModal,
        ...payload,
      },
    },
  }),
  [SET_TASKLIST_MODAL_STATE]: (state, { payload }) => ({
    ...state,
    modalsStatus: {
      ...state.modalsStatus,
      taskListModal: {
        ...state.modalsStatus.taskListModal,
        ...payload,
      },
    },
  }),
  [SET_TASK_MODAL_STATE]: (state, { payload }) => ({
    ...state,
    modalsStatus: {
      ...state.modalsStatus,
      taskModal: {
        ...state.modalsStatus.taskModal,
        ...payload,
        editData: { ...payload.editData },
        // projectList: [...state?.projectManagementData?.projects]?.map(
        //   (project) => {
        //     return {
        //       value: {
        //         project_id: project?.project_id,
        //         project_milestone_data: [
        //           ...project?.project_milestone_data,
        //         ]?.map((milestone) => ({
        //           value: milestone?.milestone_id,
        //           label: milestone?.milestone_title,
        //         })),
        //       },
        //       label: project?.project_name,
        //     };
        //   }
        // ),
      },
    },
  }),

  [CLEAR_PROJECT_MODAL_STATE]: (state) => ({
    ...state,
    modalsStatus: {
      ...state?.modalsStatus,
      projectModal: {
        isVisible: false,
        isEdit: false,
        editData: {},
        projectId: null,
      },
    },
  }),

  [CLEAR_MILESTONE_MODAL_STATE]: (state) => ({
    ...state,
    modalsStatus: {
      ...state?.modalsStatus,
      milestoneModal: {
        isVisible: false,
        isEdit: false,
        editData: {
          milestone_id: null,
          project: null,
          title: "",
          start_date: "",
          end_date: "",
          assign_user: [],
        },
        milestoneId: null,
        projectId: null,
      },
    },
  }),
  [CLEAR_TASKLIST_MODAL_STATE]: (state) => ({
    ...state,
    modalsStatus: {
      ...state?.modalsStatus,
      taskListModal: {
        isVisible: false,
        isEdit: false,
        milestonesList: [],
        editData: {
          milestone_id: null,
          project_id: null,
          title: "",
          task_list_id: null,
        },
        taskListId: null,
      },
    },
  }),
  [CLAER_TASK_MODAL_STATE]: (state) => ({
    ...state,
    modalsStatus: {
      ...state?.modalsStatus,
      taskModal: {
        isVisible: false,
        isEdit: false,
        editData: {
          task_id: null,
          project_id: null,
          milestone_id: null,
          task_list_id: null,
          subject: "",
          start_date: "",
          end_date: "",
          assign_to: "",
          comments: "",
          frequency: "",
          weekly_repeat_day: "",
          repeat_on_day: "",
          file_details: [],
          description: "",
        },
        task_list: [],
      },
    },
  }),

  [GET_USERS_LIST_REQUEST]: (state) => ({
    ...state,
    usersList: [],
  }),
  [GET_USERS_LIST_SUCCESS]: (state, { payload }) => ({
    ...state,
    usersList: payload,
  }),
  [GET_USERS_LIST_FAILED]: (state) => ({
    ...state,
    usersList: [],
  }),

  [SET_DELETE_MODAL_STATE]: (state, { payload }) => ({
    ...state,
    deactivateModalAndStatus: {
      ...state.deactiveModalAndStatus,
      ...payload,
    },
  }),
  [CLEAR_DELETE_MODAL_STATE]: (state) => ({
    ...state,
    deactivateModalAndStatus: {
      ...state.deactiveModalAndStatus,
      modalName: "",
      isVisible: false,
      id: null,
    },
  }),

  [DEACTIVATE_REQUEST]: (state, { payload }) => ({
    ...state,
    deactivateRequestStatus: {
      ...state?.deactivateRequestStatus,
      isLoading: true,
      isError: false,
      errorMessage: "",
    },
  }),
  [DEACTIVATE_SUCCESS]: (state) => ({
    ...state,
    deactivateRequestStatus: {
      ...state?.deactivateRequestStatus,
      isLoading: false,
      isError: false,
      errorMessage: "",
    },
  }),
  [DEACTIVATE_FAILED]: (state, payload) => ({
    ...state,
    deactivateRequestStatus: {
      ...state?.deactivateRequestStatus,
      isLoading: false,
      isError: true,
      errorMessage: payload,
    },
  }),

  [GET_TRASH_PROJECTS_REQUEST]: (state) => ({
    ...state,
    projectManagementTrash: {
      ...state?.projectManagementTrash,
      isLoading: true,
      isError: false,
      trashProjects: [...state?.projectManagementTrash?.trashProjects],
    },
  }),
  [GET_TRASH_PROJECTS_SUCCESS]: (state, { payload }) => ({
    ...state,
    projectManagementTrash: {
      ...state?.projectManagementTrash,
      isLoading: false,
      isError: false,
      trashProjects: [...payload],
    },
  }),
  [GET_TRASH_PROJECTS_FAILED]: (state) => ({
    ...state,
    projectManagementTrash: {
      ...state?.projectManagementTrash,
      isLoading: false,
      isError: true,
      trashProjects: [],
    },
  }),

  [GET_TRASH_MILESTONE_REQUEST]: (state) => ({
    ...state,
    projectManagementTrash: {
      ...state?.projectManagementTrash,
      isLoading: true,
      isError: false,
      trashMilestones: [...state?.projectManagementTrash?.trashMilestones],
    },
  }),
  [GET_TRASH_MILESTONE_SUCCESS]: (state, { payload }) => ({
    ...state,
    projectManagementTrash: {
      ...state?.projectManagementTrash,
      isLoading: false,
      isError: false,
      trashMilestones: [...payload],
    },
  }),
  [GET_TRASH_MILESTONE_FAILED]: (state) => ({
    ...state,
    projectManagementTrash: {
      ...state?.projectManagementTrash,
      isLoading: false,
      isError: true,
      trashMilestones: [],
    },
  }),

  [GET_TRASH_TASKS_REQUEST]: (state) => ({
    ...state,
    projectManagementTrash: {
      ...state?.projectManagementTrash,
      isLoading: true,
      isError: false,
      trashTasks: [...state?.projectManagementTrash?.trashTasks],
    },
  }),
  [GET_TRASH_TASKS_SUCCESS]: (state, { payload }) => ({
    ...state,
    projectManagementTrash: {
      ...state?.projectManagementTrash,
      isLoading: false,
      isError: false,
      trashTasks: [...payload],
    },
  }),
  [GET_TRASH_TASKS_FAILED]: (state) => ({
    ...state,
    projectManagementTrash: {
      ...state?.projectManagementTrash,
      isLoading: false,
      isError: true,
      trashTasks: [],
    },
  }),
};

export default handleActions(actionHandlers, {
  projectManagementData: {
    isLoading: false,
    projects: [],
    isError: false,
    individualTasks: [],
  },
  usersList: [],
  modalsStatus: {
    projectModal: {
      isVisible: false,
      isEdit: false,
      editData: {
        project_id: null,
        project_name: "",
        start_date: "",
        end_date: "",
        project_overview: "",
        assign_user: [],
      },
      projectId: null,
    },
    milestoneModal: {
      isVisible: false,
      isEdit: false,
      editData: {
        milestone_id: null,
        project: null,
        title: "",
        start_date: "",
        end_date: "",
        assign_user: [],
      },
      milestoneId: null,
      projectId: null,
    },
    taskListModal: {
      isVisible: false,
      isEdit: false,
      milestonesList: [],
      editData: {
        milestone_id: null,
        project_id: null,
        title: "",
        task_list_id: null,
      },
      taskListId: null,
    },
    taskModal: {
      isVisible: false,
      isEdit: false,
      editData: {
        task_id: null,
        project_id: null,
        milestone_id: null,
        task_list_id: null,
        subject: "",
        start_date: "",
        end_date: "",
        assign_to: "",
        comments: "",
        frequency: "",
        weekly_repeat_day: "",
        repeat_on_day: "",
        file_details: [],
        description: "",
      },
      task_list: [],
    },
  },
  deactivateModalAndStatus: {
    modalName: "",
    isVisible: false,
    id: null,
  },
  deactivateRequestStatus: {
    isLoading: false,
    isError: false,
    errorMessage: "",
  },
  projectManagementTrash: {
    isLoading: false,
    isError: false,
    trashProjects: [],
    trashMilestones: [],
    trashTasks: [],
  },
});
