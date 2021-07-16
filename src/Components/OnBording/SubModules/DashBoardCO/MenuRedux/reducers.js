import { handleActions } from "redux-actions";
import { types } from "./actions";

const actionHandler = {

  [types.ACTIVE_MENU_ACTIONS]: (state, { payload }) => ({
    ...state,
    currentMenu: payload,
  }),

  [types.SETTING_ACTIVE_TAB]: (state, { payload }) => ({
    ...state,
    activeTab: payload,
  }),


};



export default handleActions(actionHandler, {
    currentMenu: "dashboard",
    activeTab:"personal"
});
