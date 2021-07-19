import { createAction } from "redux-actions";

 const SET_TASK_ID = "CAPMTECH/SET_TASK_ID"

const  setTaskID = createAction(SET_TASK_ID);

export const types = {
    SET_TASK_ID
}

export const actions = {
    setTaskID
}