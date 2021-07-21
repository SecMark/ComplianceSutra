import { SET_NOTIFICATION_TASK } from "./types"
export const setNotificationTaskId = (payload) => {
  return {
    type: SET_NOTIFICATION_TASK,
    payload: payload,
  }

}
