import React from "react";
import "./style.css";
import clienticons from "../../../../assets/Images/CAPMLanding/clientmobile.png";
import financialServices from "../../../../assets/Images/CAPMLanding/financialservicesmobile.png";
import exteam from "../../../../assets/Images/CAPMLanding/exteam.svg";
import Mangment from "../../../../assets/Images/CAPMLanding/Managment.svg";
import Services from "../../../../assets/Images/CAPMLanding/Service.svg";
import techservice from "../../../../assets/Images/CAPMLanding/Tech&system.svg";
import sms from "../../../../assets/Images/CAPMLanding/sms.svg";
import multiplatform from "../../../../assets/Images/CAPMLanding/multiplatformsupport.svg";
import { AiOutlineArrowRight } from "react-icons/ai";

function ThirdSection() {
  return (
    <div className="third-section mt-5">
      <div className="container">
        <h2 className="third-section-main-heading1">DOMAIN EXPERTS</h2>
        <h1 className="third-section-main-heading2">
          Delivering product excellence across
        </h1>
        <h1 className="third-section-main-heading2">Financial Services</h1>
        <div className="container">
          <div className="row d-flex justify-content-center third-section-breakline-border-top">
            <div className="col p-3">
              <h1 className="third-section-services">BROKRAGE HOUSES</h1>
            </div>
            <div className="col p-3">
              <h1 className="third-section-services"> NBFCs </h1>
            </div>
            <div className="col p-3">
              <h1 className="third-section-services">
                {" "}
                DEPOSITORY PARTICIPANTS
              </h1>
            </div>
            <div className="col p-3">
              <h1 className="third-section-services">
                {" "}
                WEALTH & PORTFOLIO MANAGERS
              </h1>
            </div>
          </div>
          <div className="row d-flex justify-content-center third-section-breakline-border-bottom">
            <div className="col p-3">
              <h1 className="third-section-services"> RESEARCH ANALYSTS </h1>
            </div>
            <div className="col p-3">
              <h1 className="third-section-services"> EXCHANGES</h1>
            </div>
            <div className="col p-3">
              <h1 className="third-section-services"> BANK SUBSIDIARIES </h1>
            </div>
            <div className="col p-3">
              <h1 className="third-section-services"> INSURANCE COMPANIES </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="third-section-clients-background justify-content-center">
        <img
          className="third-section-backcolor"
          src={clienticons}
          alt="clienticons"
        />
      </div>
      <div className="third-section-demo-sections">
        <h2 className="third-section-main-heading1">
          BUILT FOR FINANCIAL SERVICES
        </h2>
        <h1 className="third-section-main-heading2">
          Experience and domain experties
        </h1>
        <h1 className="third-section-main-heading2">
          packaged into a powerful tool
        </h1>
        <div className="third-section-finincial-services">
          <img
            className="third-section-financial-image"
            src={financialServices}
            alt="financialServices"
          />
          <h1 className="third-section-add-on-service">
            Add on services with the tool
          </h1>
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col p-5">
                <h1 className="third-section-tools">MOCK INSPECTIONS</h1>
                <p className="third-section-tools-para">
                  Get mock inspection services from SecMark
                </p>
              </div>
              <div className="col p-5">
                <h1 className="third-section-tools">EXPERT COMPLIANCE</h1>
                <p className="third-section-tools-para">
                  Get additional check from SecMark compliance experts
                </p>
              </div>
              <div className="col p-5">
                <h1 className="third-section-tools">FORENSIC AUDITS</h1>
                <p className="third-section-tools-para">
                  Get SecMark forensic audit experts
                </p>
              </div>
            </div>
          </div>
          <div>
            <h1 className="third-section-add-on-service">
              Built for financial services
            </h1>
          </div>
        </div>
        <div className="container">
          <div className="row d-flex flex-wrap justify-content-center">
            <div className="col col-xl-4 mb-5">
              {/* <div className="card" style={{ width: "18rem" }}>
                    <div className="card-body">
                      <h5 className="card-title">Card title</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        Card subtitle
                      </h6>
                      <p className="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                    </div>
                  </div> */}
              <div className="third-section-cards">
                <img src={Mangment} alt="exteam" />
                <h1 className="third-section-cards-heading">Brokrage Firms</h1>
                <p className="third-section-cards-para">
                  Dealing with multiple compliances at once, need a smart
                  solution
                </p>
              </div>
            </div>
            <div className="col col-xl-4 mb-5">
              <div className="third-section-cards">
                <img src={exteam} alt="exteam" />
                <h1 className="third-section-cards-heading">
                  Portfolio Management Services
                </h1>
                <p className="third-section-cards-para">
                  Have 100+ individual clients to manage, need a better way to
                  handle compliances
                </p>
              </div>
            </div>
            <div className="col col-xl-4 mb-5">
              <div className="third-section-cards">
                <img src={Services} alt="exteam" />
                <h1 className="third-section-cards-heading">
                  Investment Advisors
                </h1>
                <p className="third-section-cards-para">
                  Have 50+ individual clients to manage, need a better way to
                  handle compliances
                </p>
              </div>
            </div>
            <div className="col col-xl-4 mb-5">
              <div className="third-section-cards">
                <img src={techservice} alt="exteam" />
                <h1 className="third-section-cards-heading">insurence</h1>
                <p className="third-section-cards-para">
                  Have large number of clients and want to make compliance
                  management easier
                </p>
              </div>
            </div>
            <div className="col-12 col-sm-8 mb-5">
              <div className="third-section-cards">
                <img
                  src={sms}
                  alt="sms"
                  style={{ marginTop: "70px", marginLeft: "60px" }}
                />
                <h1
                  className="third-section-cards-heading"
                  style={{ marginTop: "60px" }}
                >
                  Your business not listed here?
                </h1>
                <p className="third-section-cards-para">
                  Drop us a line if you want our products for your business{" "}
                </p>
                <span className="third-section-rightarrow">
                  <AiOutlineArrowRight />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <h2 className="third-section-main-heading1">MULTIPLATFORM SUPPORT</h2>
          <h1 className="third-section-main-heading2">
            Access tasks, completion and
          </h1>
          <h1 className="third-section-main-heading2">performance from anywhere</h1>
          <h1 className="third-section-multiplatform-image">
              <img  src={multiplatform} alt="multiplatform"/>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default ThirdSection;
