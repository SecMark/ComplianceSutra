import { lazy } from "react";
import constant from "../constants/constant";

const ERDashboard = lazy(() =>
  import("../../../Components/ExpertReviewModule/Dashboard")
);
const ERProfile = lazy(() =>
  import("../../../Components/ExpertReviewModule/Profile")
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
    path: `${constant.ExpertReviewerBaseUrl}/task-details`,
    component: ERTaskDetails,
  },
];
