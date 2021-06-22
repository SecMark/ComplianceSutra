import {
  GET_COMPANY_LIST,
  GET_FILTER,
  SET_FILTER,
  SET_COMPANY_LIST,
  SET_LOADING,
  SET_SUCCESS,
  GET_LICENSE_LIST,
  SET_LICENSE_LIST,
  SELECT_COMPANY_TOGGLE,
  SELECT_LICENSE_TOGGLE,
  GET_HISTORY_LIST,
  SET_HISTORY_LIST,
  CLEAR_STATE,
  CLEAR_LICENSE_LIST,
} from "./types";

export const setFilter = (payload) => {
  return {
    type: SET_FILTER,
    payload,
  };
};

export const getFilter = () => {
  return {
    type: GET_FILTER,
  };
};

export const getCompanyList = (payload) => {
  return {
    type: GET_COMPANY_LIST,
    payload,
  };
};

export const setCompanyList = (payload) => {
  return {
    type: SET_COMPANY_LIST,
    payload,
  };
};

export const getLicenseList = (payload) => {
  return {
    type: GET_LICENSE_LIST,
    payload,
  };
};

export const setLicenseList = (payload) => {
  return {
    type: SET_LICENSE_LIST,
    payload,
  };
};

export const getHistoryList = (payload) => {
  return {
    type: GET_HISTORY_LIST,
    payload,
  };
};

export const setHistoryList = (payload) => {
  return {
    type: SET_HISTORY_LIST,
    payload,
  };
};

export const setLoading = (payload) => {
  return {
    type: SET_LOADING,
    payload,
  };
};

export const selectCompanyToggle = (payload) => {
  return {
    type: SELECT_COMPANY_TOGGLE,
    payload,
  };
};

export const selectLicenseToggle = (payload) => {
  return {
    type: SELECT_LICENSE_TOGGLE,
    payload,
  };
};

export const setSuccess = (payload) => {
  return {
    type: SET_SUCCESS,
    payload,
  };
};

export const clearLincenseList = () => {
  return {
    type: CLEAR_LICENSE_LIST,
  };
};

export const clearState = () => {
  return {
    type: CLEAR_STATE,
  };
};
