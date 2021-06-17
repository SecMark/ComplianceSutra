import { SET_NOTIFICATION_TASK } from "../Action/types"

const initialState = {
  task_id: null,
}

export default function NotificationRedu(state = initialState, action) {
  switch (action.type) {
    case SET_NOTIFICATION_TASK:
      return {
        task_id: action.payload,
      }
    default:
      return state
  }
}
