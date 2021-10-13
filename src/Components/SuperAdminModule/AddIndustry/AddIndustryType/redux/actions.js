import {
  SET_INDUSTRY_NAME,
  GET_INDUSTRY_NAME,
  SET_INDUSTRY_APPLICABLE_IN,
  GET_INDUSTRY_APPLICABLE_IN,
  SET_ACTIVATE_INDUSTRY_ON,
  GET_ACTIVATE_INDUSTRY_ON,
  SET_SHORT_DESCRIPTION,
  GET_SHORT_DESCRIPTION,
  SET_ASSOCIATE_LICENSE,
  GET_ASSOCIATE_LICENSE,
  
} from "./types";

export const setIndustryName = (payload) => {
  return {
    type: SET_INDUSTRY_NAME,
    payload,
  };
};

export const getIndustryName = () => {
  return {
    type: GET_INDUSTRY_NAME,
  };
};

export const setIndustryApplicableIN = (payload) => {
  return {
    type: SET_INDUSTRY_APPLICABLE_IN,
    payload,
  };
};

export const getIndustryApplicableIN = () => {
  return {
    type: GET_INDUSTRY_APPLICABLE_IN,
  };
};

export const setActivateIndustryOn = (payload) => {
  return {
    type: SET_ACTIVATE_INDUSTRY_ON,
    payload,
  };
};

export const getActivateIndustryOn = () => {
  return {
    type: GET_ACTIVATE_INDUSTRY_ON,
  };
};

export const setShortDescription = (payload) => {
  return {
    type: SET_SHORT_DESCRIPTION,
    payload,
  };
};

export const getShortDescription = () => {
  return {
    type: GET_SHORT_DESCRIPTION,
  };
};

export const setAssociateLicense = (payload) => {
  return {
    type: SET_ASSOCIATE_LICENSE,
    payload,
  };
};

export const getAssociateLicense = () => {
  return {
    type: GET_ASSOCIATE_LICENSE,
  };
};

