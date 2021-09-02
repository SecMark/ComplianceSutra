import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} from "../types/user";

const initialState = {
  isLoading: false,
  userList: [],
};

function userList(state = initialState, action) {
  switch (action.type) {
    case GET_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        userList: action.payload,
        isLoading: false,
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}

export default userList;
