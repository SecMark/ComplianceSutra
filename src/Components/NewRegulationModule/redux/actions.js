import { GET_UPDATES, IS_LOADING, IS_SUCCESS, SET_UPDATES } from "./types";

export const setUpdates = (payload) => {
  return {
    type: SET_UPDATES,
    payload,
  };
};

export const getUpdates = (payload) => {
  return {
    type: GET_UPDATES,
    payload,
  };
};

export const setSuccess = (payload) => {
  return {
    type: IS_SUCCESS,
    payload,
  };
};

export const setLoading = (payload) => {
  return {
    type: IS_LOADING,
    payload,
  };
};
