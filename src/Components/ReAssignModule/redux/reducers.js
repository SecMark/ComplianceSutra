import {
  SET_LOADING,
  SET_SUCCESS,
  SELECT_FROM_DATE,
  SELECT_TO_DATE,
  SET_REASSIGN_TASKS_LIST,
  CLEAR_STATE
} from "./types";

const intialState = {
  from: "",
  to: "",
  isLoading: false,
  isSuccess: false,
  reAssignTasksList: [],
};

const reducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case SET_REASSIGN_TASKS_LIST: {
      return {
        ...state,
        reAssignTasksList: [...payload],
      };
    }

    case SET_LOADING: {
      return {
        ...state,
        isLoading: payload.isLoading,
      };
    }

    case SET_SUCCESS: {
      return {
        ...state,
        isSuccess: payload,
      };
    }
    
    case SELECT_FROM_DATE:
      return {
        ...state,
        from: payload,
      };

    case SELECT_TO_DATE:
      return {
        ...state,
        to: payload,
      };
      
    case CLEAR_STATE:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };

    default:
      return state;
  }
};

export default reducer;
