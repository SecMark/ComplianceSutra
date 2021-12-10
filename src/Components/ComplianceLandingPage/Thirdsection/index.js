import React from "react";
import "./style.css";
import exteam from "../../../assets/Images/CAPMLanding/exteam.svg";
import Mangment from "../../../assets/Images/CAPMLanding/Managment.svg";
import Services from "../../../assets/Images/CAPMLanding/Service.svg";
import techservice from "../../../assets/Images/CAPMLanding/Tech&system.svg";
import sms from "../../../assets/Images/CAPMLanding/sms.svg";
import { AiOutlineArrowRight } from "react-icons/ai";
function ThirdSection() {
  return (
    <div className="compliance-third-section">
      <h1 className="compliance-third-section-main-heading">
        Built for financial services
      </h1>
      <div className="container">
          <div className="row d-flex flex-wrap justify-content-center">
            <div className="col col-xl-4 mb-5">
              <div className="compliance-third-section-cards">
                <img src={Mangment} alt="exteam" />
                <h1 className="compliance-third-section-cards-heading">Brokerage Firms</h1>
                <p className="compliance-third-section-cards-para">
                  Dealing with multiple compliances at once, need a smart
                  solution
                </p>
              </div>
            </div>
            <div className="col col-xl-4 mb-5">
              <div className="compliance-third-section-cards">
                <img src={exteam} alt="exteam" />
                <h1 className="compliance-third-section-cards-heading">
                  Portfolio Management Services
                </h1>
                <p className="compliance-third-section-cards-para">
                  Have 100+ individual clients to manage, need a better way to
                  handle compliances
                </p>
              </div>
            </div>
            <div className="col col-xl-4 mb-5">
              <div className="compliance-third-section-cards">
                <img src={Services} alt="exteam" />
                <h1 className="compliance-third-section-cards-heading">
                  Investment Advisors
                </h1>
                <p className="compliance-third-section-cards-para">
                  Have 50+ individual clients to manage, need a better way to
                  handle compliances
                </p>
              </div>
            </div>
            <div className="col col-xl-4 mb-5">
              <div className="compliance-third-section-cards">
                <img src={techservice} alt="exteam" />
                <h1 className="compliance-third-section-cards-heading">insurence</h1>
                <p className="compliance-third-section-cards-para">
                  Have large number of clients and want to make compliance
                  management easier
                </p>
              </div>
            </div>
            {/* <div className="col-12 col-sm-8 mb-5">
              <div className="compliance-third-section-cards-last">
                <img
                  src={sms}
                  alt="sms"
                  style={{ marginTop: "70px", marginLeft: "60px" }}
                />
                <h1
                  className="compliance-third-section-cards-heading"
                  style={{ marginTop: "60px" }}
                >
                  Your business not listed here?
                </h1>
                <p className="compliance-third-section-cards-para">
                  Drop us a line if you want our products for your business{" "}
                </p>
                <span className="compliance-third-section-rightarrow">
                  <AiOutlineArrowRight />
                </span>
              </div>
            </div> */}
          </div>
        </div>
    </div>
  );
}

export default ThirdSection;
