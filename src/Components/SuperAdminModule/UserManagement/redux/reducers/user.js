import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  EDIT_USER_STATUS_REQUEST,
  EDIT_USER_STATUS_SUCCESS,
  EDIT_USER_STATUS_FAILURE,
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

    case EDIT_USER_STATUS_REQUEST:
      return {
        ...state,
      };
    case EDIT_USER_STATUS_SUCCESS:
      return {
        ...state,
        userList: state.userList.map((item) =>
          item?.UserID == action.payload.gUserID
            ? { ...item, StatusActive: action.payload.actionFlag }
            : item
        ),
      };
    case EDIT_USER_STATUS_FAILURE:
      return {
        ...state,
      };

    default:
      return state;
  }
}

export default userList;
