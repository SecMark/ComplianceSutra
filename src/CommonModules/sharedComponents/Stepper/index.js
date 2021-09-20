import React from "react";
import StepperProgressIcon from "../../../assets/Icons/stepper-progress-cricle.svg";
import StepperCheckIcon from "../../../assets/Icons/check-icon-disable.svg";
import StepperCheckIconActive from "../../../assets/Icons/check-icon.svg";
import "./style.css";
const Stepper = ({ steps, stepper, setStepper }) => {
  const handleStepClick = (step) => {
    const completedSlides = stepper.stepperCompletedSlides;
    if (completedSlides.includes(step)) {
      setStepper({
        ...stepper,
        stepperCompletedSlides: completedSlides.filter((item) => item !== step),
        stepperAcitveSlide: step,
      });
    }
  };
  return (
    <div className="stepper mb-5 d-flex align-items-center justify-content-center">
      {steps &&
        steps.length !== 0 &&
        steps.map((step, index) => {
          return (
            <>
              <div
                key={index}
                className="stepper-item position-relative d-flex align-items-center"
              >
                <img
                  src={
                    stepper.stepperAcitveSlide === step.id
                      ? StepperProgressIcon
                      : stepper.stepperCompletedSlides.includes(step.id)
                      ? StepperCheckIconActive
                      : StepperCheckIcon
                  }
                  alt="icon"
                  className="stepper-image"
                  onClick={() => handleStepClick(step.id)}
                />
                {step.id === stepper.stepperAcitveSlide && (
                  <p className="stepper-text position-absolute">{step.text}</p>
                )}
              </div>
              {index !== steps.length - 1 && (
                <div className="stepper-horizontal-line"></div>
              )}
            </>
          );
        })}
    </div>
  );
};

export default Stepper;
// --- Steps----
//   const steps = [
//     {
//       id: 1,
//       text: "Add Basic Details",
//     },
//     {
//       id: 2,
//       text: "Add Expert Review Details",
//     },
//     {
//       id: 3,
//       text: "Submit Your Docs",
//     },
//     {
//       id: 4,
//       text: "Review Details & Confirm",
//     },
//   ];

// --- State for Stepper ---
//   const [stepper, setStepper] = useState({
//     stepperAcitveSlide: 1,
//     stepperCompletedSlides: [],
//   });

// --- Function for next click
//   const handleNextClick = (step) => {
//     if (step) {
//       setStepper({
//         ...stepper,
//         stepperAcitveSlide: step + 1,
//         stepperCompletedSlides: [...stepper.stepperCompletedSlides, step],
//       });
//     }
//   };

// --- Function for back click
// const handleBackClick = (step) => {
//   if (step) {
//     setStepper({
//       ...stepper,
//       stepperAcitveSlide: step - 1,
//       stepperCompletedSlides: stepper.stepperCompletedSlides.filter(
//         (item) => item !== step
//       ),
//     });
//   }
// };
