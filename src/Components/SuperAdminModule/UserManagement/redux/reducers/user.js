import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} from "../types/user";

const initialState = {
  loading: false,
  userList: [],
};

function userList(state = initialState, action) {
  switch (action.type) {
    case GET_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        userList: action.payload,
        loading: false,
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}

export default userList;
