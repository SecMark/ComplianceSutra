import { lazy } from "react";
import constant from "../constants/constant";

const ERDashboard = lazy(() =>
  import("../../../Components/ExpertReviewModule/Dashboard")
);
const ERProfile = lazy(() =>
  import("../../../Components/ExpertReviewModule/Profile")
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
];
