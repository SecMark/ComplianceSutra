import { GET_FILTER, SET_FILTER } from "./types";

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
