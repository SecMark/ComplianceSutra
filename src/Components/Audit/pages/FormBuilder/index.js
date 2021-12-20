import React, { useState } from "react";
import FormComponents from "../../components/FormComponents/FormComponent";
import CheckList from "./CheckList/";
import Stepper from "../../../../CommonModules/sharedComponents/Stepper";
import Text from "../../components/Text/Text";
import styles from "./style.module.scss";
import IconButton from "../../components/Buttons/IconButton";
import { MdArrowBack, MdClose, MdExpandMore } from "react-icons/md";
import Button from "../../components/Buttons/Button";

const auditAssignmentSteps = [
  { id: 1, text: "Add Audit Scope", heading: "Buid Template Questionarie" },
  { id: 2, text: "Create Questionarie", heading: "Buid Template Questionarie" },
  {
    id: 3,
    text: "Create CheckList",
    heading: "Create CheckList For Template",
  },
  {
    id: 4,
    text: "Review & Create",
    heading: "Review Template Details",
  },
];

const FormBuilder = () => {
  const [sectionName, setSectionName] = useState("");

  const [stepper, setStepper] = useState({
    stepperAcitveSlide: 2,
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

          <div
            className={`${styles.auditHeaderButtonContainer} ${styles?.stepperContainer}`}
          >
            <Text
              heading="p"
              text={
                auditAssignmentSteps[stepper?.stepperAcitveSlide - 1]?.heading
              }
              variant="stepperMainHeading"
            />
            <Stepper
              steps={auditAssignmentSteps}
              setStepper={setStepper}
              stepper={stepper}

            />
          </div>
          <div className={styles.auditHeaderBorder}></div>
        </div>

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

        <div className={styles.saveTemplate}>
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
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
