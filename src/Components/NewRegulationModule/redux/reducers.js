import { IS_LOADING, IS_SUCCESS, SET_UPDATES } from "./types";
const initailState = {
  updateList: [],
  isSuccess: false,
  isLoading: false,
};

const reducer = (state = initailState, { type, payload }) => {
  switch (type) {
    case SET_UPDATES:
      return { ...state, updateList: [...payload] };

    case IS_SUCCESS:
      return { ...state, isSuccess: payload };

    case IS_LOADING:
      return { ...state, isLoading: payload };

    default:
      return state;
  }
};

export default reducer;
