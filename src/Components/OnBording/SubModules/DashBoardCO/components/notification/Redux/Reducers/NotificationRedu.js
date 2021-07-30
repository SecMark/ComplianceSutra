import { SET_NOTIFICATION_TASK, SET_TASK_ID } from "../Action/types";
const initialState = {
  taskID: null,
};

export default function NotificationRedu(state = initialState, action) {
  switch (action.type) {
    case SET_NOTIFICATION_TASK:
      return {
        taskID: action.payload,
      };
    case SET_TASK_ID:
      return { ...state, taskID: action.payload };
    default:
      return state;
  }
}
