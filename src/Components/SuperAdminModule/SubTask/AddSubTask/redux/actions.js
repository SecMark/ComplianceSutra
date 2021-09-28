import {
  SET_SUBTASK_NAME,
  GET_SUBTASK_NAME,
  SET_ASSOCIATE_LICENCE,
  GET_ASSOCIATE_LICENCE,
  SET_ASSOCIATE_SUBLICENCE,
  GET_ASSOCIATE_SUBLICENCE,
  SET_ACTIVATE_SUBTASK_ON,
  GET_ACTIVATE_SUBTASK_ON,
  SET_OCCURENCE,
  GET_OCCURENCE,
  SET_COMPLITION_DATE,
  GET_COMPLITION_DATE,
  SET_DUE_DATE,
  GET_DUE_DATE,
  SET_TEMPORARY_DUE_DATE,
  GET_TEMPORARY_DUE_DATE,
  SET_ANOTHER_TEMPORARY_DUE_DATE,
  GET_ANOTHER_TEMPORARY_DUE_DATE,
} from "./types";

export const setSubTaskName = (payload) => {
  return {
    type: SET_SUBTASK_NAME,
    payload,
  };
};

export const getSubTaskName = () => {
  return {
    type: GET_SUBTASK_NAME,
  };
};

export const setAssociateLicence = (payload) => {
  return {
    type: SET_ASSOCIATE_LICENCE,
    payload,
  };
};

export const getAssociateLicence = () => {
  return {
    type: GET_ASSOCIATE_LICENCE,
  };
};

export const setAssociateSubLicence = (payload) => {
  return {
    type: SET_ASSOCIATE_SUBLICENCE,
    payload,
  };
};

export const getAssociateSubLicence = () => {
  return {
    type: GET_ASSOCIATE_SUBLICENCE,
  };
};

export const setActivateSubTaskOn = (payload) => {
  return {
    type: SET_ACTIVATE_SUBTASK_ON,
    payload,
  };
};

export const getActivateSubTaskOn = () => {
  return {
    type: GET_ACTIVATE_SUBTASK_ON,
  };
};

export const setOccurence = (payload) => {
  return {
    type: SET_OCCURENCE,
    payload,
  };
};

export const getOccurence = () => {
  return {
    type: GET_OCCURENCE,
  };
};

export const setCompletionDate = (payload) => {
  return {
    type: SET_COMPLITION_DATE,
    payload,
  };
};

export const getCompletionDate = () => {
  return {
    type: GET_COMPLITION_DATE,
  };
};

export const setDueDate = (payload) => {
  return {
    type: SET_DUE_DATE,
    payload,
  };
};

export const getDueDate = () => {
  return {
    type: GET_DUE_DATE,
  };
};

export const setTemporaryDueDate = (payload) => {
  return {
    type: SET_TEMPORARY_DUE_DATE,
    payload,
  };
};

export const getTemporaryDueDate = () => {
  return {
    type: GET_TEMPORARY_DUE_DATE,
  };
};

export const setAnotherTemporaryDueDate = (payload) => {
  return {
    type: SET_ANOTHER_TEMPORARY_DUE_DATE,
    payload,
  };
};

export const getAnotherTemporaryDueDate = () => {
  return {
    type: GET_ANOTHER_TEMPORARY_DUE_DATE,
  };
};
