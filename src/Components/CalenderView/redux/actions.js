import { SET_SUCCESS } from "../../HistoryModule/redux/types";
import {
  CLEAR_STATE,
  GET_DAY,
  GET_MONTH,
  GET_WEEK,
  SET_DAY,
  SET_LOADING,
  SET_MONTH,
  SET_WEEK,
} from "./types";

export const setDayData = (payload) => {
  return { type: SET_DAY, payload };
};

export const getDayData = (payload) => {
  return {
    type: GET_DAY,
    payload,
  };
};

export const setWeekData = (payload) => {
  return { type: SET_WEEK, payload };
};

export const getWeekData = (payload) => {
  return {
    type: GET_WEEK,
    payload,
  };
};

export const setMonthData = (payload) => {
  return { type: SET_MONTH, payload };
};

export const getMonthData = (payload) => {
  return {
    type: GET_MONTH,
    payload,
  };
};

export const setSuccess = (payload) => {
  return {
    type: SET_SUCCESS,
    payload,
  };
};

export const setLoading = (payload) => {
  return {
    type: SET_LOADING,
    payload,
  };
};

export const clearState = () => {
  return {
    type: CLEAR_STATE,
  };
};
