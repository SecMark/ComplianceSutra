import { SET_NOTIFICATION_TASK } from "./types"
export const setNotificationTaskId = (payload) => {
  console.log(payload)
  return {
    type: SET_NOTIFICATION_TASK,
    payload: payload,
  }
}
