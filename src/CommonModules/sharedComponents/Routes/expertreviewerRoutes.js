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
    path: `${constant.ExpertReviewerBaseUrl}/`,
    component: ERDashboard,
  },
  {
    path: `${constant.ExpertReviewerBaseUrl}/dashboard`,
    component: ERDashboard,
  },
  {
    path: `${constant.ExpertReviewerBaseUrl}/profile`,
    component: ERProfile,
  },
  {
    path: `${constant.ExpertReviewerBaseUrl}/notifications`,
    component: ERNotifications,
  },

  {
    path: `${constant.ExpertReviewerBaseUrl}/task-history`,
    component: ERTaskHistoryFilter,
  },
  {
    path: `${constant.ExpertReviewerBaseUrl}/task-details`,
    component: ERTaskDetails,
  },
];
