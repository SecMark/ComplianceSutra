import React, { useState } from "react";
import "./style.css";
import Drawer from "../../../../CommonModules/sharedComponents/Drawer/index";
import Stepper from "../../../../CommonModules/sharedComponents/Stepper/index";
import SABasicDetails from "./BasicDetails";
import SASubLicense from "./SubLicense";
import SASubTasks from "./Subtasks";
import SALicenseSummary from "./LicenseSummary";

const SALicense = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState("#aabbcc");

  const [stepper, setStepper] = useState({
    stepperAcitveSlide: 1,
    stepperCompletedSlides: [],
  });
  const [subTasks, setSubTasks] = useState({});
  const [basicDetails, setBasicDetails] = useState({
    industryType: [],
  });
  const steps = [
    {
      id: 1,
      text: "Add Basic Details",
    },
    {
      id: 2,
      text: "Add Sub Licenses",
    },
    {
      id: 3,
      text: "Add Subtasks",
    },
    {
      id: 4,
      text: "Review Details and Confirm",
    },
  ];
  const ColorOptions = [
    {
      label: "Black",
      value: "#000",
    },
    {
      label: "Purple",
      value: "#8166ff",
    },
    {
      label: "Aqua",
      value: "#44e2d1",
    },
    {
      label: "Green",
      value: " #98e244",
    },
    {
      label: "Yellow",
      value: " #ffeb66",
    },
    {
      label: "Orange",
      value: " #ff6666",
    },
    {
      label: "Lilac",
      value: " #ff66d7",
    },
  ];
  const [licenseColor, setLicenseColor] = useState(ColorOptions);

  const handleNextClick = (step) => {
    if (step) {
      setStepper({
        ...stepper,
        stepperAcitveSlide: step + 1,
        stepperCompletedSlides: [...stepper.stepperCompletedSlides, step],
      });
    }
  };
  const handleBackClick = (step) => {
    if (step) {
      setStepper({
        ...stepper,
        stepperAcitveSlide: step - 1,
        stepperCompletedSlides: stepper.stepperCompletedSlides.filter(
          (item) => item !== step
        ),
      });
    }
  };
  const onSubmitClick = (step) => {
    setIsOpen(false);
  };
  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>ADD</button>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="AddLicenseMain">
          <h5>Add New License</h5>
          <Stepper
            steps={steps}
            stepper={stepper}
            setStepper={setStepper}
            step={steps}
          />
          {(stepper.stepperAcitveSlide === 1 && (
            <SABasicDetails
              setBasicDetails={setBasicDetails}
              basicDetails={basicDetails}
            />
          )) ||
            (stepper.stepperAcitveSlide === 2 && (
              <SASubLicense
                licenseColor={licenseColor}
                setLicenseColor={setLicenseColor}
                color={color}
                setColor={setColor}
              />
            )) ||
            (stepper.stepperAcitveSlide === 3 && (
              <SASubTasks
                options={ColorOptions}
                setSubTasks={setSubTasks}
                subTasks={subTasks}
              />
            )) || (
              <SALicenseSummary
                basicDetails={basicDetails}
                stepper={stepper}
                setStepper={setStepper}
                subTasks={subTasks}
                color={color}
              />
            )}
          {stepper.stepperAcitveSlide && stepper.stepperAcitveSlide > 1 && (
            <button
              className="cs-drawer__button cs-drawer__button--stroke"
              onClick={() => handleBackClick(stepper.stepperAcitveSlide)}
              style={{
                border: "1px solid #6c5dd3",
                borderRadius: "5px",
              }}
            >
              Go Back
            </button>
          )}
          {stepper.stepperAcitveSlide && stepper.stepperAcitveSlide < 4 && (
            <button
              className="cs-drawer__button cs-drawer__button--primary"
              onClick={() => handleNextClick(stepper.stepperAcitveSlide)}
              style={{ margin: "1rem" }}
            >
              Next
            </button>
          )}
          {stepper.stepperAcitveSlide && stepper.stepperAcitveSlide === 4 && (
            <button
              className="cs-drawer__button cs-drawer__button--primary"
              onClick={onSubmitClick}
              style={{ margin: "1rem" }}
            >
              Confirm and Submit
            </button>
          )}
          {/* <button
            className="cs-drawer__button cs-drawer__button--primary"
            style={{ margin: "1rem" }}
            onClick={() => handleNextClick(stepper.stepperAcitveSlide)}
          >
            NEXT
          </button> */}
        </div>
      </Drawer>
    </div>
  );
};
export default SALicense;
