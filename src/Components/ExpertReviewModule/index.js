import React from "react";
import LeftSideBar from "./LeftSideBar";
import { Suspense } from "react";
import { Route } from "react-router";
import Loading from "../../CommonModules/sharedComponents/Loader";

import "./style.css";
import { routes } from "../../CommonModules/sharedComponents/Routes/expertreviewerRoutes";

function ExperReview(props) {
  return (
    <div className="ER-container">
      <LeftSideBar />
      <div className="ER-routes">
        {/* Expert Reviewer Routes */}
        <Suspense fallback={Loading}>
          {routes.map((route) => (
            <Route exact path={route.path} component={route.component}></Route>
          ))}
        </Suspense>
      </div>
    </div>
  );
}

export default ExperReview;
