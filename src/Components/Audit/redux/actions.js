import { ADD_NEW_SECTION, SET_SECTION_NAME } from "./types";

export const setSectionName = (payload) => {
  return {
    type: SET_SECTION_NAME,
    payload,
  };
};

export const addSectionName = (payload) => {
  return {
    type: ADD_NEW_SECTION,
    payload,
  };
};
