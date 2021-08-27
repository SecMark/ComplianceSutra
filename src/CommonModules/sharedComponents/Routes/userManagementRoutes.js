import { lazy } from "react";
import constant from "../constants/constant";

const SADashboard = lazy(() =>
  import("../../../Components/UserManagementModule/Dashboard")
);
const SAProfile = lazy(() =>
  import("../../../Components/UserManagementModule/Profile")
);
const SANotifications = lazy(() =>
  import("../../../Components/UserManagementModule/Notifications/Notifications")
);

const SATaskHistoryFilter = lazy(() =>
  import("../../../Components/UserManagementModule/TaskHistoryFilter")
);

const SATaskDetails = lazy(() =>
  import("../../../Components/UserManagementModule/TaskDetails/index")
);

export const routes = [
  {
    path: `${constant.UserManagementBaseURL}/`,
    component: SADashboard,
  },
  {
    path: `${constant.UserManagementBaseURL}/dashboard`,
    component: SADashboard,
  },
  {
    path: `${constant.UserManagementBaseURL}/profile`,
    component: SAProfile,
  },
  {
    path: `${constant.UserManagementBaseURL}/notifications`,
    component: SANotifications,
  },
  {
    path: `${constant.UserManagementBaseURL}/task-history`,
    component: SATaskHistoryFilter,
  },
  {
    path: `${constant.UserManagementBaseURL}/task-details`,
    component: SATaskDetails,
  },
];
