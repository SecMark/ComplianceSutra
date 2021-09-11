import React, { useState } from "react";
import SideBarBg from "../../../assets/Images/Onboarding/side-bar-bg.png";
import Stepper from "react-js-stepper";

function SideBarInputControl({ currentStep }) {
  const [activeStep, setActiveStep] = useState(currentStep ? currentStep : 1);
  const steps = [
    { title: "Personal Details" },
    { title: "Secure your account" },
  ];

  return (
    <div className="side-bar">
      <div className="side-bar-image-outer">
        <span className="image-span">
          <div className="image-inner">
            <img src={SideBarBg} alt="" />
          </div>
        </span>
      </div>
      <div className="side-bar-stpper">
        <Stepper
          steps={steps}
          activeStep={activeStep}
          // onSelect={handleOnClickStepper}
          showNumber={false}
        />
      </div>
    </div>
  );
}

export default SideBarInputControl;
