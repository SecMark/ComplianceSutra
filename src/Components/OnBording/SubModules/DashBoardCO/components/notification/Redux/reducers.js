import { handleActions } from "redux-actions";
import { types } from "./actions";

const actionHandler = {

  [types.SET_TASK_ID]: (state, { payload }) => ({
    ...state,
    taskID: payload,
  }),

};



export default handleActions(actionHandler, {
    taskID: null,
});
