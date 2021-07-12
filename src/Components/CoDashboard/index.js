import React from "react";
import "./style.css";
import SideBarCo from "./subModules/sideBar";
import RightSideGrid from "./subModules/RightSideGrid";

function CoDashboard() {
  return (
    <div className="row co-dashboard">
      <div className="col-4 left-fixed left-side-width">
        <div className="side-inner">
          <SideBarCo />
        </div>
      </div>

      <div className="col-12 pd-right co-bg">
        <RightSideGrid />
      </div>
    </div>
  );
}

export default CoDashboard;
