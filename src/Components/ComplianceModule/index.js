import React, { useState, useEffect } from "react";
import Stepper from "react-js-stepper";
import { withRouter, Redirect } from "react-router-dom";
import ComplianceDemo1 from "../ComplianceModule/ComplianceDemo1";
import ComplianceDemo2 from "../ComplianceModule/ComplianceDemo2";
import ComplianceDemo3 from "../ComplianceModule/ComplianceDemo3";
import ComplianceDemo4 from "../ComplianceModule/ComplianceDemo4";
import ComplianceDemo6 from "../ComplianceModule/ComplianceDemo6";
import ComplianceDemo16 from "../ComplianceModule/ComplianceDemo16";
import StepeerHeading from "../ComplianceModule/StepperComponent/SubModule/StepeerHeading";
import DemoHeader from "./DemoHeader";
import leftCorner from "../../assets/Images/Compliancedemo/Rectangle.png";
import leftCircle from "../../assets/Images/Compliancedemo/circle.png";
import demoBg from "../../assets/Images/Compliancedemo/demo-background.png";
import bottomCorner from "../../assets/Images/Compliancedemo/Rectangle.png";
import RectangleCenter from "../../assets/Images/Compliancedemo/RectangleCenter.png";
import NextButton from "../../assets/Images/Compliancedemo/NextButton1.png";
import ProgressBar from "./ProgresBar";
import CalenderIcon from "../../assets/Icons/Icon.png";
import TaskCompletionIcon from "../../assets/Icons/timer-24px.png";
import CompletingTasks from "../../assets/Icons/mode_edit-24px.png";
import AnticipateRisks from "../../assets/Icons/Path 75.png";
import "./style.css";

const stepperContentArray = [
  {
    icon: CalenderIcon,
    header: "Compliance calendar that drives completion",
    description:
      "Get alerts for not just on the deadline but also when to start the tasks",
  },
  {
    icon: TaskCompletionIcon,
    header: "Track completion & performance",
    description:
      "Keep track of task completion and team performance both via dashboard and regular reports on mail & whatsapp",
  },
  {
    icon: TaskCompletionIcon,
    header: "Track completion & performance",
    description:
      "Keep track of task completion and team performance both via dashboard and regular reports on mail & whatsapp",
  },
  {
    icon: CompletingTasks,
    header: "Completing tasks is as easy as answering mail",
    description:
      "Guiding and handholding team such that focus is on executing the task on time",
  },
  {
    icon: AnticipateRisks,
    header: "Anticipate risks & be agile",
    description:
      "Anticipate risks and manage unexpected delays by taking corrective actions",
  },
];

function ComplianceMainModule({ history }) {
  const [activeStep, setActiveStep] = useState(1);
  const [currentComponent, setCurrentComponent] = useState(1);
  const [stepperContent, setStepperContent] = useState({});
  const steps = [
    { title: "Drive completion with timeline" },
    { title: "Track completion & performance" },
    { title: "As easy as answering mall" },
    { title: "Anticipate risk & be agile" },
    { title: "Access & share compliance history" },
  ];
  const handleOnClickStepper = (step) => {
    let isIncre = true;
    if (step !== 2 && isIncre) {
      setActiveStep(step);
      setCurrentComponent(step);
    } else if (step === 2 && currentComponent !== 2.5) {
      isIncre = false;
      setActiveStep(step);
      setCurrentComponent(step);
    } else if (currentComponent === 2.5) {
      setActiveStep(step);
      setCurrentComponent(step);
    }
  };
  const handleOnClickNext = () => {
    if (currentComponent !== 5) {
      let isIncre = true;
      if (activeStep !== 2 && isIncre) {
        let nextStep = activeStep + 1;
        setActiveStep(nextStep);
        setCurrentComponent(nextStep);
      } else if (activeStep === 2 && currentComponent !== 2.5) {
        let nextStep = activeStep;
        isIncre = false;
        setActiveStep(nextStep);
        setCurrentComponent(nextStep + 0.5);
      } else if (currentComponent === 2.5) {
        let nextStep = activeStep + 1;
        setActiveStep(nextStep);
        setCurrentComponent(nextStep);
      }
    } else {
      history.push("/compliance-demo-end");
    }
  };
  console.log("currentComponent", currentComponent);
  const handleOnClickBack = () => {
    let prevStep = activeStep - 1;
    setActiveStep(prevStep);
  };

  useEffect(() => {
    let currentContent = stepperContentArray[activeStep - 1];
    setStepperContent(currentContent);
  }, [activeStep]);

  // useEffect(() => {
  //    setInterval(() => {
  //       if(activeStep!==6)
  //       setActiveStep((prevState) => prevState + 1)
  //    }, 3000);
  // }, [])
  return (
    <>
      <div className="compliance-main">
        <DemoHeader />
        {/* <img src={BackgroundImage} /> */}

        <div className="container custom-container">
          <p className="compliance compliance-mobile">Compliance Module Demo</p>
          <div className="row mobile-row-reverse">
            <div className="col-lg-5">
              <div className="bg-demo">
                <img src={demoBg} alt="demoBg" />
              </div>
              {/* <div className="left-rectangle">
              <img src={leftCorner} alt="Left Corner" />
            </div>
            <div className="left-circle">
              <img src={leftCircle} alt="Left Circle" />
            </div>
            <div className="bottom-rectangle">
              <img src={bottomCorner} alt="Bottom Corner" />
            </div>
            <div className="center-rectangle">
              <img src={RectangleCenter} alt="Center Retangle" />
            </div> */}
              <StepeerHeading content={stepperContent} />
              <div
                id="stepper"
                className="animate__animated animate__fadeInRight animate__delay-1s	5s stepper-section"
              >
                <Stepper
                  steps={steps}
                  activeStep={activeStep}
                  onSelect={handleOnClickStepper}
                  showNumber={false}
                />
              </div>
            </div>
            <div className="col-lg-7">
              <div className="mar-top">
                {currentComponent === 1 ? (
                  <div>
                    <ComplianceDemo1 />
                  </div>
                ) : currentComponent === 2 ? (
                  <div>
                    <ComplianceDemo2 />
                  </div>
                ) : currentComponent === 2.5 ? (
                  <div>
                    <ComplianceDemo3 />
                  </div>
                ) : currentComponent === 3 ? (
                  <div>
                    <ComplianceDemo4 />
                  </div>
                ) : currentComponent === 4 ? (
                  <div>
                    <ComplianceDemo6 />
                  </div>
                ) : currentComponent === 5 ? (
                  <div>
                    <ComplianceDemo16 />
                  </div>
                ) : (
                  <div> You are in Stage {activeStep} </div>
                )}
              </div>
            </div>
          </div>
          <div className="row align-right-end">
            {/* <input
            type="button"
            value={activeStep === steps.length ? "Finish" : "Next"}
            onClick={activeStep === steps.length ? null : handleOnClickNext}
          />
          {activeStep === 1 ? (
            ""
          ) : (
            <input type="button" value="Back" onClick={handleOnClickBack} />
          )} */}
            {/* {activeStep === 1 ? (
            ""
          ) : (
            <p type="button" value="Back" onClick={handleOnClickBack}>
              <img className="backIcon" src={NextButton} alt="NextButton" />
            </p>
          )} */}
            <button class="btn next-button" onClick={handleOnClickNext}>
              <img src={NextButton} alt="NextButton" />
            </button>
          </div>
        </div>
        <div className="progressbar-main">
          <ProgressBar completed={activeStep} />
        </div>
      </div>
    </>
  );
}
export default withRouter(ComplianceMainModule);
