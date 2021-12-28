import React, { useEffect, useState } from "react";
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
import Container from "../../components/Containers";
import { useHistory } from "react-router";

const FormBuilder = () => {
  const history =useHistory();
  const [sectionName, setSectionName] = useState("");
  const [headerHeight, setHeaderHeight] = useState(0);
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

  useEffect(() => {
    const _headerHeight = document
      .querySelector("." + styles.auditHeader)
      .getClientRects()[0].height;
    setHeaderHeight(_headerHeight);
  }, [stepper]);


  const navigateToHome = () =>{
    history.push("/audit")
  }
  return (
    <Container variant="content" className={styles.maincontainer}>
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
            onClick={navigateToHome}
          />
        </div>

        <div
          className={`${styles.auditHeaderButtonContainer} ${styles?.stepperContainer}`}
        >
          <Text
            heading="p"
            text={steps[stepper.stepperAcitveSlide - 1].heading}
            variant="stepperMainHeading"
          />
          <Stepper steps={steps} stepper={stepper} setStepper={setStepper} />
        </div>
        <div className={styles.auditHeaderBorder}></div>
      </div>
      {/* All Audit component will render here  --start-- */}
      <div
        className={styles.auditAssignmentMain}
        style={{
          height: `calc( 100vh - ${headerHeight + 94}px )`,
        }}
      >
        {stepper.stepperAcitveSlide === 1 && (
          <CreateAuditTemplate
            next={handleNextClick}
            back={handleBackClick}
            stepper={stepper}
          />
        )}

        {stepper?.stepperAcitveSlide === 2 && (
          <FormComponents
            sectionName={sectionName}
            setSectionName={setSectionName}
            next={handleNextClick}
            back={handleBackClick}
            stepper={stepper}
          />
        )}
        {stepper?.stepperAcitveSlide === 3 && (
          <CheckList
            next={handleNextClick}
            back={handleBackClick}
            stepper={stepper}
          />
        )}
        {stepper?.stepperAcitveSlide === 4 && <ReviewTemplateDetails />}

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
    </Container>
  );
};

export default FormBuilder;
