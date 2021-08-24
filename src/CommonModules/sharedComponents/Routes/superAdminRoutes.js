import { lazy } from "react";
import constant from "../constants/constant";

const ERDashboard = lazy(() =>
  import("../../../Components/SuperAdminModule/TaskListView")
);
const ERProfile = lazy(() =>
  import("../../../Components/SuperAdminModule/Profile")
);
const ERNotifications = lazy(() =>
  import("../../../Components/SuperAdminModule/Notifications/Notifications")
);

const ERTaskHistoryFilter = lazy(() =>
  import("../../../Components/SuperAdminModule/TaskHistoryFilter")
);

const ERTaskDetails = lazy(() =>
  import("../../../Components/SuperAdminModule/TaskDetails/index")
);

export const routes = [
  {
    path: `${constant.SuperAdminBaseURL}/`,
    component: ERDashboard,
  },
  {
    path: `${constant.SuperAdminBaseURL}/dashboard`,
    component: ERDashboard,
  },
  {
    path: `${constant.SuperAdminBaseURL}/profile`,
    component: ERProfile,
  },
  {
    path: `${constant.SuperAdminBaseURL}/notifications`,
    component: ERNotifications,
  },
  {
    path: `${constant.SuperAdminBaseURL}/task-history`,
    component: ERTaskHistoryFilter,
  },
  {
    path: `${constant.SuperAdminBaseURL}/task-details`,
    component: ERTaskDetails,
  },
];
