import React, { useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import Stepper from "../../../../CommonModules/sharedComponents/Stepper";
import AddBasicDetials from "./AddBasicDetails";
import AddReferences from "./AddReferences";
import { setSubTaskName } from "../AddSubTask/redux/actions";
function AddSubTask() {
  const actionDispatch = useDispatch();
  const steps = [
    {
      id: 1,
      text: "Add Basic Details",
    },
    {
      id: 2,
      text: "Add References",
    },
    {
      id: 3,
      text: "Review Details & Confirm",
    },
  ];

  const [stepper, setStepper] = useState({
    stepperAcitveSlide: 1,
    stepperCompletedSlides: [],
  });
  const [basicDetails, setBasicDetails] = useState({
    subTaskName: "Quaterly review of Stock Exchnage",
  });

  const handleValueSubmit = () => {
    actionDispatch(setSubTaskName(basicDetails.subTaskName));
  };
  const handleChnageBasicDetails = (e) => {
    const value = e.target.value;
    setBasicDetails({ ...basicDetails, [e.target.name]: value });
  };
  const handleNextClick = (step) => {
    handleValueSubmit();
    if (step) {
      setStepper({
        ...stepper,
        stepperAcitveSlide: step + 1,
        stepperCompletedSlides: [...stepper.stepperCompletedSlides, step],
      });
    }
  };

  const handlePreviousClick = (step) => {
    if (step) {
      setStepper({
        ...stepper,
        stepperAcitveSlide: step - 1,
        stepperCompletedSlides: [...stepper.stepperCompletedSlides, step - 1],
      });
    }
  };
  return (
    <div>
      <h1 className="SubTask-heading">ADD New SubTask Details</h1>
      <div className="cs-drawer__horizontal-line"></div>
      <div className="mt-4">
        <Stepper steps={steps} stepper={stepper} setStepper={setStepper} />
      </div>
      <div>
        {stepper.stepperAcitveSlide === 1 && (
          <AddBasicDetials
            basicDetails={basicDetails}
            handleChnageBasicDetails={handleChnageBasicDetails}
          />
        )}
        {stepper.stepperAcitveSlide === 2 && (<AddReferences/>)}
        {stepper.stepperAcitveSlide === 3 && <div>hello 2</div>}
      </div>
      {stepper.stepperAcitveSlide === 2 && (
        <button
          className="SuTask-button-goback"
          onClick={() => handlePreviousClick(stepper.stepperAcitveSlide)}
        >
          Back
        </button>
      )}

      <button
        className="SuTask-button"
        onClick={() => handleNextClick(stepper.stepperAcitveSlide)}
      >
        NEXT
      </button>
    </div>
  );
}

export default AddSubTask;
