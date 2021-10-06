import React from "react";
import "./style.css";
import exteam from "../../../../assets/Images/CAPMLanding/exteam.svg";
import service from "../../../../assets/Images/CAPMLanding/Service.svg";
import Techsys from "../../../../assets/Images/CAPMLanding/Tech&system.svg";

function FourthSection() {
  return (
    <div className="fourth-section">
      <div className="container">
        <div className="fourth-section-Headings">
          <h1 className="fourth-section-heading1">
            INDUSTRY LEADERS & EXPERTS
          </h1>
          <h1 className="fourth-section-heading2">
            Handpicked team of industry
          </h1>
          <h1 className="fourth-section-heading2">leaders and experts</h1>
        </div>
        <div>
          <div className="row fourth-section-background">
            <div className="col p-5">
              <h1 className="fourth-section-counters">15+</h1>
              <h2 className="fourth-section-counters-para">
                Years of Hands on Experience
              </h2>
            </div>
            <div className="col p-5">
              <h1 className="fourth-section-counters">100+</h1>
              <h2 className="fourth-section-counters-para">
                Handpicked industry experts
              </h2>
            </div>
            <div className="col p-5">
              <h1 className="fourth-section-counters">150+</h1>
              <h2 className="fourth-section-counters-para">
                Clients under Financial Market Category
              </h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h1 style={{ textAlign: "center" }}>
              {" "}
              <img src={service} alt="service" />{" "}
            </h1>
            <h1 className="fourth-section-team-info-heading">24/7 Service</h1>
            <p className="fourth-section-team-info-heading-para">
              Go about your day without the anxiety of missing business. Whether
              you are at work, sleeping or in a meeting. Your will be answered.
              Guaranteed.
            </p>
          </div>
          <div className="col">
            <h1 style={{ textAlign: "center" }}>
              {" "}
              <img src={exteam} alt="service" />
            </h1>
            <h1 className="fourth-section-team-info-heading">
              Experienced Team
            </h1>
            <p className="fourth-section-team-info-heading-para">
              Here at CAPMTech our priority is customer satisfaction. Our team
              consists of members who have hands on experience with the
              Financial Market Industry.
            </p>
          </div>
          <div className="col">
            <h1 style={{ textAlign: "center" }}>
              {" "}
              <img src={Techsys} alt="service" />
            </h1>
            <h1 className="fourth-section-team-info-heading">
              Technology & System
            </h1>
            <p className="fourth-section-team-info-heading-para">
              The world is changing fast. We understand that and to deliver
              premium service we house state of art modern technology that will
              delivery precise service and a seamless customer experience
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FourthSection;
