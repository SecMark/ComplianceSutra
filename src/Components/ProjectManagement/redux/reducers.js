import { handleActions } from "redux-actions";

import {
  GET_PROJECT_DETAIL,
  SET_PROJECT_DETAIL,
  GET_REGISTERED_USER_LIST,
  GET_PROJECT_MANAGEMENT_DATA_REQUEST,
  GET_PROJECT_MANAGEMENT_DATA_SUCCESS,
  GET_PROJECT_MANAGEMENT_DATA_FAILED,
  SET_PROJECT_CONTEXT_MENU,
  SET_TASK_CONTEXT_MENU,
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
    case GET_REGISTERED_USER_LIST:
      return {
        ...state,
        Registered_user: payload,
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
      projects: [],
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

  [SET_PROJECT_CONTEXT_MENU]: (state, { payload }) => ({
    ...state,
    contextMenu: {
      ...state.contextMenu,
      projectIds: [...payload],
    },
  }),
  [SET_TASK_CONTEXT_MENU]: (state, { payload }) => ({
    ...state,
    contextMenu: {
      ...state.contextMenu,
      taskListIds: [...payload],
    },
  }),
};

export default handleActions(actionHandlers, {
  projectManagementData: {
    isLoading: false,
    projects: [],
    isError: false,
  },
  contextMenu: {
    projectIds: [],
    taskListIds: [],
  },
});
