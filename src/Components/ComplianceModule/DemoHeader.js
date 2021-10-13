import React from "react";
import { useHistory } from "react-router";
import brandLogo from "../../assets/Images/logo.png";
import "./DemoHeader.css";
const DemoHeader = () => {
  const history = useHistory();
  return (
    <div
      className="w-100"
      style={{
        position: "absolute",
        top: "0px",
        left: "0px",
        backgroundColor: "#fff",
        zIndex: "9",
      }}
    >
      <div className="demo-header d-flex align-items-center justify-content-between container custom-container py-4">
        <div className="d-flex">
          <div className="branding d-flex align-items-center">
            <img src={brandLogo} alt="compliance sutra" height="28px" />
            <h5 className="mb-0 branding__name ml-2">Compliance Sutra</h5>
            <div className="branding__seperator d-none d-md-block mx-3"></div>
            <h5 className="mb-0 d-none d-md-block">Compliance Module Demo</h5>
          </div>
        </div>
        <button
          className="button skip-button d-none d-md-block"
          onClick={() => {
            history.push("/on-boarding");
          }}
        >
          skip demo
        </button>
        <button
          className="button skip-button d-block d-md-none"
          onClick={() => {
            history.push("/on-boarding");
          }}
        >
          skip
        </button>
      </div>
    </div>
  );
};

export default DemoHeader;
