import React from "react";
import { Suspense } from "react";
import { Route } from "react-router";
import LeftSideBar from "./LeftSideBar";
import QuickOverview from "./QuickOverview";
import Loading from "../../CommonModules/sharedComponents/Loader";

import "./style.css";
import { routes } from "../../CommonModules/sharedComponents/Routes/superAdminRoutes";

function SuperAdmin(props) {
  return (
    <div
      className="row co-dashboard remove-scroll-b"
      style={{ height: "auto" }}
    >
      <div className="left-fixed d-none d-md-block">
        <div className="on-boarding">
          <LeftSideBar />
        </div>
      </div>
      <div>
        <QuickOverview />
      </div>
      <div className="col-12 right-side-bar-new">
        <Suspense fallback={Loading}>
          {routes.map((route) => (
            <Route exact path={route.path} component={route.component}></Route>
          ))}
        </Suspense>
      </div>
    </div>
  );
}

export default SuperAdmin;
