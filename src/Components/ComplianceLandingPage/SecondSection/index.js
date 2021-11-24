import React from "react";
import "./style.css";
import instantsetup from "../../../assets/Images/ComplianceLanding/instantsetup.svg";
import taskManagement from "../../../assets/Images/ComplianceLanding/taskMangment.svg";
import regulatryUpdates from "../../../assets/Images/ComplianceLanding/regulatryUpdates.svg";
import riskkManagement from "../../../assets/Images/ComplianceLanding/riskmanagment.svg";
import planningkManagement from "../../../assets/Images/ComplianceLanding/planning&mangment.svg";
import { FaCheckCircle } from "react-icons/fa";
function SecondSection() {
  return (
    <div className="container">
      <div className="Compliance-second-section">
        {/* first section */}
        <div className="Compliance-second-section-heading">
          <h1 className="Compliance-second-section-heading1">INSTANT SETUP</h1>
          <h1 className="Compliance-second-section-heading2">
            Get started in 2 mins
          </h1>
        </div>
        <div className="row">
          <div className="col Compliance-second-section-features-text">
            <h1>You have to do it only once!</h1>
            <ul className="Compliance-second-section-list-style mt-5">
              <li>
                <FaCheckCircle
                  style={{ color: "#7fba7a", width: "20px", height: "20px" }}
                />{" "}
                One time Instant Set-up
              </li>
              <li>
                <FaCheckCircle
                  style={{ color: "#7fba7a", width: "20px", height: "20px" }}
                />{" "}
                Support for Single, multiple or group companies
              </li>
              <li>
                <FaCheckCircle
                  style={{ color: "#7fba7a", width: "20px", height: "20px" }}
                />{" "}
                50+ Compliance to choose from
              </li>
              <li>
                <FaCheckCircle
                  style={{ color: "#7fba7a", width: "20px", height: "20px" }}
                />{" "}
                One time task allocation
              </li>
            </ul>
          </div>
          <div className="col">
            <img className="Compliance-second-section-banner-images" src={instantsetup} alt="instantsetup" />
          </div>
        </div>
        <div className="Compliance-second-section-heading">
          <h1 className="Compliance-second-section-heading1">
            Task Management
          </h1>
          <h1 className="Compliance-second-section-heading2">
            Automated Compliance 
          </h1>
          <h1 className="Compliance-second-section-heading2">
             Management
          </h1>
        </div>
        <div className="row">
          <div className="col">
            <img className="Compliance-second-section-banner-images" src={taskManagement} alt="instantsetup" />
          </div>
          <div className="col Compliance-second-section-features-text">
            <h1>No more worrying about follow ups!</h1>
            <ul className="Compliance-second-section-list-style mt-5">
              <li>
                <FaCheckCircle
                  style={{ color: "#7fba7a", width: "20px", height: "20px" }}
                />
                Daily, Weekly and Monthly task list
              </li>
              <li>
                <FaCheckCircle
                  style={{ color: "#7fba7a", width: "20px", height: "20px" }}
                />{" "}
                Auto reminders for each task
              </li>
              <li>
                <FaCheckCircle
                  style={{ color: "#7fba7a", width: "20px", height: "20px" }}
                />{" "}
                Task allocation and completion notifications
              </li>
              <li>
                <FaCheckCircle
                  style={{ color: "#7fba7a", width: "20px", height: "20px" }}
                />{" "}
                Get notification on your mail and WhatsApp too
              </li>
            </ul>
          </div>
        </div>
        {/* first section end */}
        {/* second section start*/}
        <div className="Compliance-second-section-heading">
          <h1 className="Compliance-second-section-heading1">
            REGULATORY UPDATES
          </h1>
          <h1 className="Compliance-second-section-heading2">
            Get Regulatory Updates
          </h1>
        </div>
        <div className="row">
          <div className="col Compliance-second-section-features-text">
            <h1>Receive realtime Regulation Updates</h1>
            <ul className="Compliance-second-section-list-style mt-5">
              <li>
                <FaCheckCircle
                  style={{ color: "#7fba7a", width: "20px", height: "20px" }}
                />{" "}
                Be notified of any updates
              </li>
              <li>
                <FaCheckCircle
                  style={{ color: "#7fba7a", width: "20px", height: "20px" }}
                />{" "}
                Take actions and do corrections as required
              </li>
              <li>
                <FaCheckCircle
                  style={{ color: "#7fba7a", width: "20px", height: "20px" }}
                />{" "}
                Get updated formats for PDFs, Excel, etc
              </li>
              <li>
                <FaCheckCircle
                  style={{ color: "#7fba7a", width: "20px", height: "20px" }}
                />{" "}
                View past updates stored in our archive
              </li>
            </ul>
          </div>
          <div className="col">
            <img className="Compliance-second-section-banner-images" src={regulatryUpdates} alt="instantsetup" />
          </div>
        </div>
        <div className="Compliance-second-section-heading">
          <h1 className="Compliance-second-section-heading1">
            RISK MANAGEMENT
          </h1>
          <h1 className="Compliance-second-section-heading2">
            Anticipate risks, delays
          </h1>
          <h1 className="Compliance-second-section-heading2">& take action</h1>
        </div>
        <div className="row">
          <div className="col">
            <img className="Compliance-second-section-banner-images" src={riskkManagement} alt="instantsetup" />
          </div>
          <div className="col Compliance-second-section-features-text">
            <h1>Avoid last minute rush and delays</h1>
            <ul className="Compliance-second-section-list-style mt-5">
              <li>
                <FaCheckCircle
                  style={{ color: "#7fba7a", width: "20px", height: "20px" }}
                />
                Auto-assessment for potential risk everyday
              </li>
              <li>
                <FaCheckCircle
                  style={{ color: "#7fba7a", width: "20px", height: "20px" }}
                />{" "}
                Take actions and do course correction
              </li>
              <li>
                <FaCheckCircle
                  style={{ color: "#7fba7a", width: "20px", height: "20px" }}
                />{" "}
                Accommodate unplanned leaves and reassign tasks
              </li>
              <li>
                <FaCheckCircle
                  style={{ color: "#7fba7a", width: "20px", height: "20px" }}
                />{" "}
                Automated task updates for every regulation change
              </li>
            </ul>
          </div>
        </div>
        {/* second section end*/}
        {/* third section  start*/}
        <div className="Compliance-second-section-heading">
          <h1 className="Compliance-second-section-heading1">
            PLANNING & MANAGEMENT
          </h1>
          <h1 className="Compliance-second-section-heading2">
            Complete control on your
          </h1>
          <h1 className="Compliance-second-section-heading2">
            fingertips, anywhere!
          </h1>
        </div>
        <div className="row">
          <div className="col Compliance-second-section-features-text">
            <h1>Keep your team on track!</h1>
            <ul className="Compliance-second-section-list-style mt-5">
              <li>
                <FaCheckCircle
                  style={{ color: "#7fba7a", width: "20px", height: "20px" }}
                />{" "}
                Task completion tracking
              </li>
              <li>
                <FaCheckCircle
                  style={{ color: "#7fba7a", width: "20px", height: "20px" }}
                />{" "}
                Measure team performance
              </li>
              <li>
                <FaCheckCircle
                  style={{ color: "#7fba7a", width: "20px", height: "20px" }}
                />{" "}
                Access to both Macro and Micro level view
              </li>
              <li>
                <FaCheckCircle
                  style={{ color: "#7fba7a", width: "20px", height: "20px" }}
                />{" "}
                Regular status reports on mail and whatsapp
              </li>
            </ul>
          </div>
          <div className="col">
            <img className="Compliance-second-section-banner-images" src={planningkManagement} alt="instantsetup" />
          </div>
        </div>
        {/* third section end */}
      </div>
    </div>
  );
}

export default SecondSection;
