import React from 'react'
import "./style.css";
import banner1 from "../../../assets/Images/CAPMLanding/banner1.png";

function FirstSection() {
    return (
        <div className="compliance-first-section">
        <div className="container">
            {/* <div className="d-flex">
                <div className="mr-auto p-2">
                    <h1 className="compliance-first-section-heading1">
                        COMPLIANCE
                    </h1>
                </div>
                <div className="p-2">
                    <h1 className="compliance-first-section-heading2">
                        OverView
                    </h1>
                </div>
                <div className="p-2">
                    <h1 className="compliance-first-section-heading2">
                        Features
                    </h1>
                </div>
                <div className="p-2">
                    <h1 className="compliance-first-section-heading2">
                        Demo
                    </h1>
                </div>
                <div className="p-2">
                    <h1 className="compliance-first-section-heading2">
                        Business
                    </h1>
                </div>

            </div> */}
            <div className="first-section-main-heading">
                <h1>
                    Hassle free Compliance
                </h1>
                <h1>
                        Management for your company 
                </h1>
                <img src={banner1} alt="banner1"/>

            </div>
            
        </div>
        </div>
    )
}

export default FirstSection
