import {
  GET_INDUSTRY_LIST,
  GET_ISSUER_LIST,
  GET_TOPIC_LIST,
  GET_UPDATES,
  IS_LOADING,
  IS_SUCCESS,
  SET_FROM_DATE,
  SET_INDUSTRY,
  SET_INDUSTRY_LIST,
  SET_ISSUER,
  SET_ISSUER_LIST,
  SET_TOPIC,
  SET_TOPIC_LIST,
  SET_TO_DATE,
  SET_UPDATES,
} from "./types";

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

export const setIndustryList = (payload) => {
  return {
    type: SET_INDUSTRY_LIST,
    payload,
  };
};

export const getIndustryList = (payload) => {
  return {
    type: GET_INDUSTRY_LIST,
    payload,
  };
};

export const setIssuerList = (payload) => {
  return {
    type: SET_ISSUER_LIST,
    payload,
  };
};

export const getIssuerList = (payload) => {
  return {
    type: GET_ISSUER_LIST,
    payload,
  };
};

export const setTopicList = (payload) => {
  return {
    type: SET_TOPIC_LIST,
    payload,
  };
};

export const getTopicList = (payload) => {
  return {
    type: GET_TOPIC_LIST,
    payload,
  };
};

export const setIndustry = (payload) => {
  return {
    type: SET_INDUSTRY,
    payload,
  };
};

export const setIssuer = (payload) => {
  return {
    type: SET_ISSUER,
    payload,
  };
};

export const setTopic = (payload) => {
  return {
    type: SET_TOPIC,
    payload,
  };
};

export const setFromDate = (payload) => {
  return {
    type: SET_FROM_DATE,
    payload,
  };
};

export const setToDate = (payload) => {
  return {
    type: SET_TO_DATE,
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

export const setIsFilter = (payload) => {
  return {
    type: SET_ISSUER_LIST,
    payload,
  };
};
