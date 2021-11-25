import { createAction } from "redux-actions";

// TYPES
export const GET_PROJECT_DETAIL = "GET_PROJECT_DETAIL";
export const SET_PROJECT_DETAIL = "SET_PROJECT_DETAIL";
export const GET_REGISTERED_USER_LIST = "GET_REGISTERED_USER_LIST";

export const GET_PROJECT_MANAGEMENT_DATA_REQUEST =
  "PROJECT_MANAGEMENT/GET_DATA_REQUEST";
export const GET_PROJECT_MANAGEMENT_DATA_SUCCESS =
  "PROJECT_MANAGEMENT/GET_DATA_SUCCESS";
export const GET_PROJECT_MANAGEMENT_DATA_FAILED =
  "PROJECT_MANAGEMENT/GET_DATA_FAILED";

export const SET_PROJECT_CONTEXT_MENU = "SET_PROJECT_CONTEXT_MENU";
export const SET_TASK_CONTEXT_MENU = "SET_TASK_CONTEXT_MENU";

// ACTIONS
export const getProject = (payload) => {
  return {
    type: GET_PROJECT_DETAIL,
    payload,
  };
};
export const setProject = (payload) => {
  return {
    type: SET_PROJECT_DETAIL,
    payload,
  };
};
export const getRegisteredUser = (payload) => {
  return {
    type: GET_REGISTERED_USER_LIST,
    payload,
  };
};

// Project Data
export const getProjectDataRequest = createAction(
  GET_PROJECT_MANAGEMENT_DATA_REQUEST
);
export const getProjectDataSuccess = createAction(
  GET_PROJECT_MANAGEMENT_DATA_SUCCESS
);
export const getProjectDataFailed = createAction(
  GET_PROJECT_MANAGEMENT_DATA_FAILED
);

// context menus
export const setProjectContextMenu = createAction(SET_PROJECT_CONTEXT_MENU);
export const setTaskContextMenu = createAction(SET_TASK_CONTEXT_MENU);
