import { handleActions } from "redux-actions";
import { types } from "./actions";

const actionHandler = {

  [types.ACTIVE_MENU_ACTIONS]: (state, { payload }) => ({
    ...state,
    currentMenu: payload,
  }),
  [types.SET_CURRENT_FILTER_MENU]: (state, { payload }) => ({
    ...state,
    currentFilterViewBy: payload,
  }),
  [types.MODAL_OPEN_FLAG]: (state, { payload }) => ({
    ...state,
    openModalFlag: payload,
  }),

  [types.SETTING_ACTIVE_TAB]: (state, { payload }) => ({
    ...state,
    activeTab: payload,
  }),

  [types.SET_CURRENT_TASK_ID_BV]: (state, { payload }) => ({
    ...state,
    taskID: payload,
  }),

  [types.SET_TASK_ID_CALENDAR]: (state, { payload }) => ({
    ...state,
    taskIDByCalendarView: payload,
  }),


};



export default handleActions(actionHandler, {
  currentMenu: "dashboard",
  activeTab: "personal",
  openModalFlag: false,
  currentFilterViewBy: "",
  taskID: null,
  taskIDByCalendarView:null
});
