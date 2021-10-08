import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import leftTopCorner from "../../../assets/Images/Compliancedemo/left-top-corner.png";
import Calendar from "../../../assets/Images/Compliancedemo/calnderLast.png";
import Leaderboard from "../../../assets/Images/Compliancedemo/leaderboard.png";
import Teamperformance from "../../../assets/Images/Compliancedemo/team-performance.png";
import DemoHeader from "../DemoHeader";

function ComplianceDemo7() {
  return (
    <div className="compliance-end">
      <DemoHeader />
      <div className="left-top-corner">
        <img src={leftTopCorner} alt="left-top-corner" />
      </div>
      <div className="back-ground-image">
        <div className="left-section">
          <div className="container">
            <div className="demo7 heading-section">
              <p className="compliance compliance-mobile">
                Compliance Module Demo
              </p>
              <p className="title-hassle">
                Hassle free <br />
                compliance!
              </p>
              <p className="title-hassle-desc">
                Access to both macro and micro level view of <br />
                things with regular status updates on your
                <br /> WhatsApp and mail.
              </p>
              <Link
                class="btn get-started-button common-button"
                to={"/on-boarding"}
              >
                GET STARTED
              </Link>
              {/* <button type="button" class="btn get-started-button common-button">GET STARTED</button> */}
            </div>
            <div className="email-subscribe">
              <p className="email-label">
                Want to share this with your manager or peers?
              </p>
              <div class="newsletter">
                <div class="content">
                  <div class="input-group">
                    <input
                      type="email"
                      class="form-control"
                      placeholder="Enter email"
                    />
                    <span class="input-group-btn">
                      <button class="btn invite-btn" type="submit">
                        INVITE
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="right-section">
            <img
              className="performance"
              src={Teamperformance}
              alt="Teamperformance"
            />
            <img className="Leaderboard" src={Leaderboard} alt="Leaderboard" />
            <img className="Calendar" src={Calendar} alt="Calendar" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplianceDemo7;
