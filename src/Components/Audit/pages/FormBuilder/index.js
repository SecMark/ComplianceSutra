import React, { useState } from "react";
import FormComponents from "../../components/FormComponents/FormComponent";
import styles from "./style.module.scss";
import Stepper from "../../../../CommonModules/sharedComponents/Stepper";
import { steps } from "../../constants/StepperSteps/steps";
import { AiOutlineArrowLeft } from "react-icons/ai";
import IconButton from "../../components/Buttons/IconButton";
import Text from "../../components/Text/Text";
import Button from "../../components/Buttons/Button";
import CreateAuditTemplate from "../createAuditTemplate";

const FormBuilder = () => {
  const [sectionName, setSectionName] = useState("");
  const [stepper, setStepper] = useState({
    stepperAcitveSlide: 1,
    stepperCompletedSlides: [],
  });

  // ---Stepper  Function for next click
  const nextClick = (step) => {
    if (step) {
      setStepper({
        ...stepper,
        stepperAcitveSlide: step + 1,
        stepperCompletedSlides: [...stepper.stepperCompletedSlides, step],
      });
    }
  };

  // ---  Stepper Function for back click
  const backClick = (step) => {
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
        <div className={styles.subContainer}>
          <IconButton
            icon={<AiOutlineArrowLeft />}
            variant="backIcon"
            onClick={() => {
              backClick(stepper.stepperAcitveSlide);
            }}
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
        {/* All Audit component will render here  --start-- */}
        <div className={styles.mainContent}>
          {stepper.stepperAcitveSlide === 1 && <CreateAuditTemplate/>}
          {stepper.stepperAcitveSlide === 2 && (
            <FormComponents
              sectionName={sectionName}
              setSectionName={setSectionName}
            />
          )}
        </div>
        {/* All Audit component will render here --end--  */}

        {stepper.stepperAcitveSlide !== 4 ? (
          <div className={styles.buttonContainer}>
            <div className={styles.saveButton}>
              <Button
                onClick={() => {
                  nextClick(stepper.stepperAcitveSlide);
                }}
                variant="default"
                description="NEXT"
                size="small"
              />
            </div>
            <div className={styles.exitButton}>
              <Button
                variant="preview"
                description="SAVE TEMPLATE AND EXIT"
                size="medium"
              />
            </div>
          </div>
        ) : (
          <div className={styles.buttonContainer}>
            <div>
              <Button variant="stepperSaveBtn" description="CREATE TEMPLATE" />
            </div>
          </div>
        )}
        {/* <FormComponents sectionName={sectionName} setSectionName={setSectionName} /> */}
      </div>
    </div>
  );
};

export default FormBuilder;
