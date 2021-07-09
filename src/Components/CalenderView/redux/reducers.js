import {
  CLEAR_STATE,
  SET_DAY,
  SET_LOADING,
  SET_SUCCESS,
  SET_WEEK,
} from "./types";

const intialSate = {
  daysData: [],
  weekData: [],
  isSuccess: false,
  isLoading: false,
};

const reducer = (state = intialSate, { type, payload }) => {
  switch (type) {
    case SET_DAY:
      return {
        ...state,
        daysData: [...payload],
      };

    case SET_WEEK:
      return {
        ...state,
        weekData: [...payload],
      };

    case SET_SUCCESS:
      return {
        ...state,
        isSuccess: payload,
      };

    case SET_LOADING:
      return {
        ...state,
        isLoading: payload,
      };

    case CLEAR_STATE:
      return {
        ...state,
        daysData: [],
        weekData: [],
      };

    default:
      return state;
  }
};

export default reducer;
