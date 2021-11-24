// TYPES
export const GET_PROJECT_DETAIL = "GET_PROJECT_DETAIL";
export const SET_PROJECT_DETAIL = "SET_PROJECT_DETAIL";
export const GET_REGISTERED_USER_LIST = "GET_REGISTERED_USER_LIST";

// ACTIONS
export const getProject = (payload) => {
  return {
    type: GET_PROJECT_DETAIL,
    payload,
  };
};

export const setProject = (payload) => {
  return {
    type: SET_PROJECT_DETAIL,
    payload,
  };
};

export const getRegisteredUser = (payload) => {
  return {
    type: GET_REGISTERED_USER_LIST,
    payload,
  };
};
