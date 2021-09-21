import React from "react";
import { Suspense } from "react";
import { Route } from "react-router";
import LeftSideBar from "./LeftSideBar";
import Loading from "../../CommonModules/sharedComponents/Loader";

import "./style.css";
import { routes } from "../../CommonModules/sharedComponents/Routes/superAdminRoutes";

function SuperAdmin(props) {
  return (
      <div
        className="row co-dashboard remove-scroll-b"
      >
        <div className="left-fixed d-none d-md-block">
          <div className="on-boarding">
            <LeftSideBar />
          </div>
        </div>
        <div style={{ width: "100vw", marginLeft: "6vw" }}>
          <Suspense fallback={Loading}>
            {routes.map((route) => (
              <Route
                exact
                path={route.path}
                component={route.component}
              ></Route>
            ))}
          </Suspense>
        </div>
      </div>
  );
}

export default SuperAdmin;
