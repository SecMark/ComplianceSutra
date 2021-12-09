import React from "react";
import "./style.css";
import Section2 from "../../../../assets/Images/CAPMLanding/Logos.png";
import Compliance from "./Compliance";

function SecondSection() {
  return (
    <div className="second-section mt-5">
      {/* <div className="center">
        <img className="Section2Img" src={Section2} alt="" />
      </div> */}
      <div className="container">
        <ul className="title ">
          <li className="active">Compliance</li>
          {/* <li>Audit</li> */}
          <li>Process</li>
        </ul>
      </div>
      <div>
        <Compliance />
      </div>
    </div>
  );
}

export default SecondSection;
