import {
  SET_LOADING,
  SET_SUCCESS,
  GET_REASSIGN_TASKS_LIST,
  SET_REASSIGN_TASKS_LIST,
  CLEAR_STATE,
} from "./types";

export const getReAssignTasksList = (payload) => {
  return {
    type: GET_REASSIGN_TASKS_LIST,
    payload,
  };
};

export const setReAssignTasksList = (payload) => {
  return {
    type: SET_REASSIGN_TASKS_LIST,
    payload,
  };
};

export const setLoading = (payload) => {
  return {
    type: SET_LOADING,
    payload,
  };
};

export const setSuccess = (payload) => {
  return {
    type: SET_SUCCESS,
    payload,
  };
};

export const clearState = () => {
  return {
    type: CLEAR_STATE,
  };
};
