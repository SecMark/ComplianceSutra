import { createAction } from "redux-actions";

// TYPES
export const GET_PROJECT_DETAIL = "GET_PROJECT_DETAIL";
export const SET_PROJECT_DETAIL = "SET_PROJECT_DETAIL";

export const GET_PROJECT_MANAGEMENT_DATA_REQUEST =
  "PROJECT_MANAGEMENT/GET_DATA_REQUEST";
export const GET_PROJECT_MANAGEMENT_DATA_SUCCESS =
  "PROJECT_MANAGEMENT/GET_DATA_SUCCESS";
export const GET_PROJECT_MANAGEMENT_DATA_FAILED =
  "PROJECT_MANAGEMENT/GET_DATA_FAILED";

export const SET_PROJECT_MODAL_STATE = "SET_PROJECT_MODAL_STATE";
export const SET_MILESTONE_MODAL_STATE = "SET_MILESTONE_MODAL_STATE";
export const SET_TASKLIST_MODAL_STATE = "SET_TASKLIST_MODAL_STATE";
export const SET_TASK_MODAL_STATE = "SET_TASK_MODAL_STATE";

export const CLEAR_PROJECT_MODAL_STATE = "CLEAR_PROJECT_MODAL_STATE";
export const CLEAR_MILESTONE_MODAL_STATE = "CLEAR_MILESTONE_MODAL_STATE";
export const CLEAR_TASKLIST_MODAL_STATE = "CLEAR_TASKLIST_MODAL_STATE";
export const CLAER_TASK_MODAL_STATE = "CLAER_TASK_MODAL_STATE";

export const ADD_UPDATE_TASKLIST_REQUEST = "ADD_UPDATE_TASKLIST_REQUEST";
export const ADD_UPDATE_TASKLIST_SUCCESS = "ADD_UPDATE_TASKLIST_SUCCESS";
export const ADD_UPDATE_TASKLIST_FAILED = "ADD_UPDATE_TASKLIST_FAILED";

export const ADD_UPDATE_MILESTONE_REQUEST = "ADD_UPDATE_MILESTONE_REQUEST";
export const ADD_UPDATE_MILESTONE_SUCCESS = "ADD_UPDATE_MILESTONE_SUCCESS";
export const ADD_UPDATE_MILESTONE_FAILED = "ADD_UPDATE_MILESTONE_FAILED";

export const GET_USERS_LIST_REQUEST = "GET_USERS_LIST_REQUEST";
export const GET_USERS_LIST_SUCCESS = "GET_USERS_LIST_SUCCESS";
export const GET_USERS_LIST_FAILED = "GET_USERS_LIST_FAILED";

export const ADD_UPDATE_TASK_REQUEST = "ADD_UPDATE_TASK_REQUEST";

export const GET_INDIVIDUAL_TASKS_REQUEST = "GET_INDIVIDUAL_TASKS_REQUEST";
export const GET_INDIVIDUAL_TASKS_SUCCESS = "GET_INDIVIDUAL_TASKS_SUCCESS";
export const GET_INDIVIDUAL_TASKS_FAILED = "GET_INDIVIDUAL_TASKS_FAILED";

export const SET_DELETE_MODAL_STATE = "SET_DELETE_MODAL_STATE";
export const CLEAR_DELETE_MODAL_STATE = "CLEAR_DELETE_MODAL_STATE";

export const DEACTIVATE_REQUEST = "DEACTIVATE_REQUEST";
export const DEACTIVATE_SUCCESS = "DEACTIVATE_SUCCESS";
export const DEACTIVATE_FAILED = "DEACTIVATE_FAILED";

export const GET_TRASH_PROJECTS_REQUEST = "GET_TRASH_PROJECTS_REQUEST";
export const GET_TRASH_PROJECTS_SUCCESS = "GET_TRASH_PROJECTS_SUCCESS";
export const GET_TRASH_PROJECTS_FAILED = "GET_TRASH_PROJECTS_FAILED";

export const GET_TRASH_MILESTONE_REQUEST = "GET_TRASH_MILESTONE_REQUEST";
export const GET_TRASH_MILESTONE_SUCCESS = "GET_TRASH_MILESTONE_SUCCESS";
export const GET_TRASH_MILESTONE_FAILED = "GET_TRASH_MILESTONE_FAILED";

export const GET_TRASH_TASKS_REQUEST = "GET_TRASH_TASKS_REQUEST";
export const GET_TRASH_TASKS_SUCCESS = "GET_TRASH_TASKS_SUCCESS";
export const GET_TRASH_TASKS_FAILED = "GET_TRASH_TASKS_FAILED";

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

// Modal Actions
export const setProjectModalState = createAction(SET_PROJECT_MODAL_STATE);
export const setMilestoneModalState = createAction(SET_MILESTONE_MODAL_STATE);
export const setTaskListModalState = createAction(SET_TASKLIST_MODAL_STATE);
export const setTaskModalState = createAction(SET_TASK_MODAL_STATE);

// Clear Modal Actions
export const clearProjectModalState = createAction(CLEAR_PROJECT_MODAL_STATE);
export const clearMilestoneModalState = createAction(
  CLEAR_MILESTONE_MODAL_STATE
);
export const clearTaskListModalState = createAction(CLEAR_TASKLIST_MODAL_STATE);
export const clearTaskModalState = createAction(CLAER_TASK_MODAL_STATE);

// Add and Update task list
export const addUpdateTaskListRequest = createAction(
  ADD_UPDATE_TASKLIST_REQUEST
);
export const addUpdateTaskListSuccess = createAction(
  ADD_UPDATE_TASKLIST_SUCCESS
);
export const addUpdateTaskListFailed = createAction(ADD_UPDATE_TASKLIST_FAILED);

// Add and Update milestone
export const addUpdateMilestoneRequest = createAction(
  ADD_UPDATE_MILESTONE_REQUEST
);
export const addUpdateMilestoneSuccess = createAction(
  ADD_UPDATE_MILESTONE_SUCCESS
);
export const addUpdateMilestoneFailed = createAction(
  ADD_UPDATE_MILESTONE_FAILED
);

// get users list
export const getUsersListRequest = createAction(GET_USERS_LIST_REQUEST);
export const getUsersListSuccess = createAction(GET_USERS_LIST_SUCCESS);
export const getUsersListFailed = createAction(GET_USERS_LIST_FAILED);

// add and update task
export const addAndUpdateTaskRequest = createAction(ADD_UPDATE_TASK_REQUEST);

// get individual tasks
export const getIndividualTasksRequest = createAction(
  GET_INDIVIDUAL_TASKS_REQUEST
);
export const getIndividualTasksSuccess = createAction(
  GET_INDIVIDUAL_TASKS_SUCCESS
);
export const getIndividualTasksFailed = createAction(
  GET_INDIVIDUAL_TASKS_FAILED
);

// set and clear delete modal
export const setDeleteModalState = createAction(SET_DELETE_MODAL_STATE);
export const clearDeleteModalSatate = createAction(CLEAR_DELETE_MODAL_STATE);

// deactivate request
export const deactivateRequest = createAction(DEACTIVATE_REQUEST);
export const deactivateSuccess = createAction(DEACTIVATE_SUCCESS);
export const deactivateFailed = createAction(DEACTIVATE_FAILED);

// get trash projects, milestone, tasks
export const getTrashProjectRequest = createAction(GET_TRASH_PROJECTS_REQUEST);
export const getTrashProjectSuccess = createAction(GET_TRASH_PROJECTS_SUCCESS);
export const getTrashProjectFailed = createAction(GET_TRASH_PROJECTS_FAILED);

export const getTrashMilestoneRequest = createAction(
  GET_TRASH_MILESTONE_REQUEST
);
export const getTrashMilestoneSuccess = createAction(
  GET_TRASH_MILESTONE_SUCCESS
);
export const getTrashMilestoneFailed = createAction(GET_TRASH_MILESTONE_FAILED);

export const getTrashTasksRequest = createAction(GET_TRASH_TASKS_REQUEST);
export const getTrashTasksSuccess = createAction(GET_TRASH_TASKS_SUCCESS);
export const getTrashTasksFailed = createAction(GET_TRASH_TASKS_FAILED);
