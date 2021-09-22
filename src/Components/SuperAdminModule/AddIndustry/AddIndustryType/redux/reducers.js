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

const initialState = {
  industryName: "",
  industryApplicableIn: "",
  activateIndustryOn: [],
  shortDescription: "",
  associateLicense: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_INDUSTRY_NAME:
      return {
        ...state,
        industryName: payload,
      };
    case SET_ACTIVATE_INDUSTRY_ON:
      return{
        ...state,
        activateIndustryOn:payload
      }
    case SET_ASSOCIATE_LICENSE:
      return{
        ...state,
        associateLicense:payload
      }
    case SET_SHORT_DESCRIPTION:
      return{
        ...state,
        shortDescription:payload
      }
    default:
      return state;
  }
};

export default reducer;
