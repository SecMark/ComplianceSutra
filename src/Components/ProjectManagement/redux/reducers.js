import {
  GET_PROJECT_DETAIL,
  SET_PROJECT_DETAIL,
  GET_REGISTERED_USER_LIST,
} from "./actions";

export const addAndEditProjectReducer = (
  state = {
    projectDetails: {
      project_name: "",
      assign_user: [],
      start_date: "",
      end_date: "",
      project_overview: "",
    },
    Registered_user: [],
  },
  { type, payload }
) => {
  switch (type) {
    case GET_PROJECT_DETAIL:
      return state;
    case SET_PROJECT_DETAIL:
      return {
        ...state,
        projectDetails: {
          ...payload,
        },
      };
    case GET_REGISTERED_USER_LIST:
      return {
        ...state,
        Registered_user: payload,
      };
    default:
      return state;
  }
};
