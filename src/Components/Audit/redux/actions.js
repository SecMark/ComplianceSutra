import {
  ADD_NEW_SECTION,
  GET_QUESTION_LIST,
  SET_QUESTION_LIST,
  SET_SECTION_NAME,
  SET_TEMPLATE_NAME,
  SET_AUDIT_ASSIGNMENT_BASIC_DETAILS,
  GET_AUDIT_ASSIGNMENT_BASIC_DETAILS
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

export const setTemplateName = (payload) => {
  return {
    type: SET_TEMPLATE_NAME,
    payload,
  }
}

export const setAuditAssignmentDetails = (payload) =>{
  return {
    type: SET_AUDIT_ASSIGNMENT_BASIC_DETAILS,
    payload,
  }
}