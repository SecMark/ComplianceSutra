import {
  ADD_NEW_SECTION,
  GET_QUESTION_LIST,
  SET_QUESTION_LIST,
  SET_SECTION_NAME,
} from "./types";

export const setSectionName = (payload) => {
  return {
    type: SET_SECTION_NAME,
    payload,
  };
};

export const getQuestionList = (payload) => {
  return {
    type: GET_QUESTION_LIST,
    payload,
  };
};

export const setQuestionList = (payload) => {
  return {
    type: SET_QUESTION_LIST,
    payload,
  };
};

export const addSectionName = (payload) => {
  return {
    type: ADD_NEW_SECTION,
    payload,
  };
};
