import React from "react";
import "./style.css";
import comtech from "../../../../assets/Images/CapmTech.png";
import secmark from "../../../../assets/Images/secmark.png";
import leftArrow from "../../../../assets/Icons/leftArrow.png";
import india from "../../../../assets/Icons/india.png";
import SideBarInputControl from "../SideBarInputControl";

function AddedCompanyLicenses() {
  return (
    <div className="row">
      <div className="col-3 left-fixed">
        <div className="on-boarding">
          <SideBarInputControl />
        </div>
      </div>
      <div className="col-12 padding-right">
        <div className="get-main">
          <div className="container">
            <div className="get-started-header">
              <div className="row">
                <div className="col-lg-12">
                  <div className="header_logo">
                    {/* <a href="#" style={{'cursor': 'auto'}}> */}
                      <img src={comtech} alt="COMPLIANCE SUTRA" title="COMPLIANCE SUTRA" />
                      <span className="camp">COMPLIANCE SUTRA</span>
                    {/* </a> */}
                  </div>
                </div>
              </div>
            </div>

            <div class="">
              <div class="">
                <div className="company-licenses">
                  <p className="company-title">
                    {" "}
                    <img src={leftArrow} alt="" /> Give us your company details
                  </p>
                </div>
              </div>
            </div>
            <div className="">
              <table class="table added-company-licenses">
                <caption className="add-company-link">Add NEW company</caption>
                <thead>
                  <tr>
                    <th scope="col">Company Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Business category</th>
                    <th scope="col">Licenses</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>B&K Securities</td>
                    <td>Ltd.</td>
                    <td>Insurance</td>
                    <td>
                      <div className="license-count">4</div>
                    </td>
                  </tr>
                  <tr>
                    <td>B&K Trading</td>
                    <td>Partnership Firm</td>
                    <td>Brokerage</td>
                    <td>
                      <div className="license-count">8</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="">
              <div className="bottom-logo-strip">
                <button className="btn save-details common-button1  mb-2">
                  Next
                </button>
                <div className="row aligncenter">
                  <div className="col-6">
                    <p className="account-link">
                      *For companies requiring compliance in{" "}
                      <img src={india} alt="india" /> INDIA
                    </p>
                  </div>
                  <div className="col-6 text-right-logo">
                    {/* <a href="#" style={{'cursor': 'auto'}}> */}
                      {/* <span className="powerBy">Powered by</span> */}
                      <img className="header_logo footer-logo-secmark" src={secmark} alt="SECMARK" title="SECMARK" />
                    {/* </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddedCompanyLicenses;
