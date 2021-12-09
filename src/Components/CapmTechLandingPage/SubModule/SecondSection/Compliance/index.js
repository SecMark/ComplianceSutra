import React from "react";
import exteam from "../../../../../assets/Images/CAPMLanding/exteam.svg";
import Managment from "../../../../../assets/Images/CAPMLanding/Managment.svg";
import Service from "../../../../../assets/Images/CAPMLanding/Service.svg";
import Techsystem from "../../../../../assets/Images/CAPMLanding/Tech&system.svg";
import ComplianceTask from "../../../../../assets/Images/CAPMLanding/ComplianceTasks.svg";
import ComplianceLandingPage from "../../../../ComplianceLandingPage";
import "./style.css";
import { Link } from "react-router-dom";

function Compliance() {
  return (
    <div>
      <div className="row">
        <div className="col-sm-12 col-xl-4">
          <div className="media">
            <img
              className="mr-2 compliance-list-icons"
              src={Service}
              alt="service"
            />
            <div className="media-body" style={{ marginLeft: "-70px" }}>
              <h5 className="mt-5 compliance-icon-title">INSTANT SETUP</h5>
              <span className="compliance-icon-title-para">
                One time set-up to get started in 2 mins
              </span>
            </div>
          </div>
          <div className="media compliance-mediaobjects">
            <img
              className="mr-2 compliance-list-icons"
              src={exteam}
              alt="service"
            />
            <div className="media-body" style={{ marginLeft: "-70px" }}>
              <h5 className="mt-5 compliance-icon-title">TASK MANAGMENT</h5>
              <span className="compliance-icon-title-para">
                {" "}
                Automated Compliance & Audit Management
              </span>
            </div>
          </div>
          <div className="media compliance-mediaobjects">
            <img
              className="mr-2 compliance-list-icons"
              src={Techsystem}
              alt="service"
            />
            <div className="media-body" style={{ marginLeft: "-70px" }}>
              <h5 className="mt-5 compliance-icon-title">RISK MANAGMENT</h5>
              <span className="compliance-icon-title-para">
                {" "}
                Anticipate risks, delay & Take action
              </span>
            </div>
          </div>
          <div className="media compliance-mediaobjects">
            <img
              className="mr-2 compliance-list-icons"
              src={Managment}
              alt="service"
            />
            <div className="media-body" style={{ marginLeft: "-70px" }}>
              <h5 className="mt-5 compliance-icon-title">
                PLANNING & MANAGMENT
              </h5>
              <span className="compliance-icon-title-para">
                {" "}
                Complete control on your fingertips, anywhere{" "}
              </span>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div className="p-2">
            <Link to="/compliance-landing">  <button className="compliance-more-detail-button">
                MORE DETAILS
              </button></Link>
            </div>
            <div className="p-2">
            <Link to="/compliance-demo">  <button className="compliance-View-detail-button">
                VIEW DEMO
              </button></Link>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-xl-8">
          <img
            className="Compliance-banner"
            src={ComplianceTask}
            alt="compliance task"
          />
        </div>
      </div>
    </div>
  );
}

export default Compliance;
