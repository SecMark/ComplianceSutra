import { combineReducers } from "redux";
import auth from "../Components/Authectication/redux/reducers";
import complianceOfficer from "../Components/OnBording/redux/reducers";
import teamMemberFlow from "../Components/TeamMemberFlow/redux/reducers";
import taskReport from "../Components/OnBording/SubModules/DashBoardCO/redux/reducers";
import global from "../CommonModules/GlobalData/redux/reducers";

import users from "../Components/UserVerification/redux/reducers";

import adminMenu from "../Components/OnBording/SubModules/DashBoardCO/MenuRedux/reducers";
import NotificationRedu from "../Components/OnBording/SubModules/DashBoardCO/components/notification/Redux/Reducers/NotificationRedu";
import HistoryReducer from "../Components/HistoryModule/redux/reducers";
import UpdatesReducer from "../Components/NewRegulationModule/redux/reducers";
import CalenderReducer from "../Components/CalenderView/redux/reducers";

const createRootReducer = (history) =>
  combineReducers({
    auth,
    complianceOfficer,
    teamMemberFlow,
    taskReport,
    global,
    users,
    adminMenu,
    NotificationRedu,
    HistoryReducer,
    UpdatesReducer,
    CalenderReducer,
  });

export default createRootReducer;
