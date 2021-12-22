import React, { useState } from "react";
import FormComponents from "../../components/FormComponents/FormComponent";
import CheckList from "./CheckList/";
import Stepper from "../../../../CommonModules/sharedComponents/Stepper";
import Text from "../../components/Text/Text";
import styles from "./style.module.scss";
import IconButton from "../../components/Buttons/IconButton";
import { MdArrowBack, MdClose, MdExpandMore } from "react-icons/md";
import Button from "../../components/Buttons/Button";
import CreateAuditTemplate from "../createAuditTemplate/index.jsx";
import { steps } from "../../constants/StepperSteps/steps";
import ReviewTemplateDetails from "../ReviewAndConfirm";


const FormBuilder = () => {
  const [sectionName, setSectionName] = useState("");

  const [stepper, setStepper] = useState({
    stepperAcitveSlide: 1,
    stepperCompletedSlides: [],
  });

  // --- Function for next click
  const handleNextClick = (step) => {
    if (step) {
      setStepper({
        ...stepper,
        stepperAcitveSlide: step + 1,
        stepperCompletedSlides: [...stepper.stepperCompletedSlides, step],
      });
    }
  };
  // --- Function for back click
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

  return (
    <div className={styles.maincontainer}>
      <div className={styles.container}>
        <div className={styles.auditHeader}>
          <div
            className={`${styles.auditHeaderButtonContainer} ${
              stepper?.stepperAcitveSlide < 2 ? styles.rightAlign : ""
            }`}
          >
            {stepper?.stepperAcitveSlide > 1 && (
              <IconButton
                onClick={() => handleBackClick(stepper?.stepperAcitveSlide)}
                variant="iconButtonRound"
                icon={<MdArrowBack />}
                size="none"
              />
            )}
            <IconButton
              variant="iconButtonRound"
              icon={<MdClose />}
              size="none"
            />
          </div>

          <div className={styles.borderBox}>
          <div className={styles.subContainer}>
            <Text
              heading="h1"
              text={steps[stepper.stepperAcitveSlide - 1].heading}
              variant="default"
            />
          </div>
          <div className={styles.stepper}>
            <Stepper steps={steps} stepper={stepper} setStepper={setStepper} />
          </div>
        </div>
        </div>
        {/* All Audit component will render here  --start-- */}
        <div className={styles.mainContent}>
          {stepper.stepperAcitveSlide === 1 && <CreateAuditTemplate next={handleNextClick} back={handleBackClick} stepper={stepper}/>}

          {stepper?.stepperAcitveSlide === 2 && (
            <FormComponents
              sectionName={sectionName}
              setSectionName={setSectionName}
              next={handleNextClick}
              back={handleBackClick}
            />
          )}
          {stepper?.stepperAcitveSlide === 3 && (
            <CheckList next={handleNextClick} back={handleBackClick} />
          )}
          {stepper?.stepperAcitveSlide === 4 && (
            <ReviewTemplateDetails/>
          )}

          {/* <div className={styles.saveTemplate}>
            <div>
              <Button
                description="SAVE TEMPLATE & QUIT"
                variant="preview"
                size="medium"
              />
            </div>
            <div>
              <Button
                description="NEXT"
                size="small"
                variant="default"
                onClick={() => handleNextClick(stepper?.stepperAcitveSlide)}
              />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
