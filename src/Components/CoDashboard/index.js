import React from 'react';
import "./style.css"
import Cobg from "../../assets/Images/Onboarding/co-bg.png";
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
        <img className="right-bg" src={Cobg} alt="" />
            <RightSideGrid />
        </div>
    </div>
    )
}


export default CoDashboard;
