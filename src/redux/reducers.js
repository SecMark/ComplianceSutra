import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"
import auth from "../Components/Authectication/redux/reducers"
import complianceOfficer from "../Components/OnBording/redux/reducers"
import teamMemberFlow from "../Components/TeamMemberFlow/redux/reducers"
import taskReport from "../Components/OnBording/SubModules/DashBoardCO/redux/reducers"
import global from "../CommonModules/GlobalData/redux/reducers"
import invitemember from "../Components/OnBording/SubModules/IniviteFlowMember/redux/reducers"
import users from "../Components/UserVerification/redux/reducers"

import adminMenu from "../Components/OnBording/SubModules/DashBoardCO/MenuRedux/reducers"
import NotificationRedu from "../Components/OnBording/SubModules/DashBoardCO/components/notification/Redux/reducers";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    complianceOfficer,
    teamMemberFlow,
    taskReport,
    global,
    users,
    adminMenu,
    NotificationRedu,
  })

export default createRootReducer
