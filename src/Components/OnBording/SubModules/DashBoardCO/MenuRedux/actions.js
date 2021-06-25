import { createAction } from "redux-actions";


const ACTIVE_MENU_ACTIONS = 'CAPMTECH/ACTIVE_MENU_ACTIONS';

const SETTING_ACTIVE_TAB = 'CAPMTECH/SETTING_ACTIVE_TAB';

const HELPSUPPORT_ACTIVE_TAB = 'CAPMTECH/HELPSUPPORT_ACTIVE_TAB';


const setCurrentMenu = createAction(ACTIVE_MENU_ACTIONS);
const setActiveTabInSetting = createAction(SETTING_ACTIVE_TAB);
const setActiveTabInHelpsupport = createAction(HELPSUPPORT_ACTIVE_TAB);

export const types = {
    ACTIVE_MENU_ACTIONS,
    SETTING_ACTIVE_TAB,
    HELPSUPPORT_ACTIVE_TAB
}

export const actions = {
    setCurrentMenu,
    setActiveTabInSetting,
    setActiveTabInHelpsupport
}