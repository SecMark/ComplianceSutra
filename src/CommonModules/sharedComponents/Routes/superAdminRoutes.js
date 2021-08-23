import { lazy } from "react";
import constant from "../constants/constant";

const ERDashboard = lazy(() =>
  import("../../../Components/ExpertReviewModule/Dashboard")
);
const ERProfile = lazy(() =>
  import("../../../Components/ExpertReviewModule/Profile")
);
const ERNotifications = lazy(() =>
  import("../../../Components/ExpertReviewModule/Notifications/Notifications")
);

const ERTaskHistoryFilter = lazy(() =>
  import("../../../Components/ExpertReviewModule/TaskHistoryFilter")
);

const ERTaskDetails = lazy(() =>
  import("../../../Components/ExpertReviewModule/TaskDetails/index")
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
