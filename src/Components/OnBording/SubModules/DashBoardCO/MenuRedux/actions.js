import { createAction } from "redux-actions";


const ACTIVE_MENU_ACTIONS = 'CAPMTECH/ACTIVE_MENU_ACTIONS';

const SETTING_ACTIVE_TAB = 'CAPMTECH/SETTING_ACTIVE_TAB'
const MODAL_OPEN_FLAG = 'CAPMTECH/MODAL_OPEN_FLAG';
const SET_CURRENT_FILTER_MENU = 'CAPMTECH/SET_CURRENT_FILTER_MENU';
const SET_CURRENT_TASK_ID_BV = 'CAPMTECH/SET_CURRENT_TASK_ID_BV';
const SET_TASK_ID_CALENDAR = 'CAPMTECH/SET_TASK_ID_CALENDAR';


const setCurrentMenu = createAction(ACTIVE_MENU_ACTIONS);
const setActiveTabInSetting = createAction(SETTING_ACTIVE_TAB)
const setIsModalOpen = createAction(MODAL_OPEN_FLAG);
const setCurrentFilterMenuViewBy = createAction(SET_CURRENT_FILTER_MENU);
const setCurrentBoardViewTaskId = createAction(SET_CURRENT_TASK_ID_BV);
const setCurrentCalendarViewTaskId = createAction(SET_TASK_ID_CALENDAR)

export const types = {
    ACTIVE_MENU_ACTIONS,
    SETTING_ACTIVE_TAB,
    MODAL_OPEN_FLAG,
    SET_CURRENT_FILTER_MENU,
    SET_CURRENT_TASK_ID_BV,
    SET_TASK_ID_CALENDAR
}

export const actions = {
    setCurrentMenu,
    setActiveTabInSetting,
    setIsModalOpen,
    setCurrentFilterMenuViewBy,
    setCurrentBoardViewTaskId,
    setCurrentCalendarViewTaskId
}
