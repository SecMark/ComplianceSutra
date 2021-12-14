import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import Text from "../../components/Text/Text";
import { Input } from "../../components/Inputs/Input";
import Button from "../../components/Buttons/Button";
import IconButton from "../../components/Buttons/IconButton";
import { MdArrowBack, MdClose, MdExpandMore } from "react-icons/md";
import Stepper from "../../../../CommonModules/sharedComponents/Stepper";
import QuestionnaireForm from "./QuestionnaireForm";
const auditAssignmentSteps = [
  { id: 1, text: "Add Audit Scope", heading: "Create Audit Assignment" },
  { id: 2, text: "Add Additional Details", heading: "Add Additional Details" },
  {
    id: 3,
    text: "Assign Questionnaire",
    heading: "Assign Tax Audit Questionnaire to Team",
  },
  {
    id: 4,
    text: "Review Audit Assignment",
    heading: "Review Assignment Details",
  },
];

const AuditAssignment = () => {
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
  return (
    <div className={styles.auditAssignment}>
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
      <div
        className={styles.auditAssignmentMain}
        style={{
          height: `calc( 100vh - ${headerHeight + 94}px )`,
        }}
      >
        {stepper?.stepperAcitveSlide === 1 && (
          <>
            <Text
              heading="p"
              text="add basic audit details"
              variant="stepperSubHeading"
            />
            <div className={styles.inputRow}>
              <div className={styles.flex6}>
                <Input
                  type="select"
                  variant="auditAssignmentInput"
                  labelText="Audit Template"
                  placeholder="Select template"
                  labelVariant="labelGreyMini"
                  valueForDropDown={[
                    { label: "Template 1", value: 4 },
                    { label: "Template 2", value: 3 },
                    { label: "Template 3", value: 5 },
                  ]}
                />
              </div>
              <div className={styles.flex6}>
                <Input
                  variant="auditAssignmentInput"
                  labelText="audit name"
                  placeholder="Name of Audit"
                  labelVariant="labelGreyMini"
                />
              </div>
            </div>
            <div className={styles.inputRow}>
              <div className={styles.flex6}>
                <Input
                  variant="auditAssignmentInput"
                  labelText="company's name"
                  placeholder="Select company name"
                  labelVariant="labelGreyMini"
                />
              </div>
              <div className={styles.flex6}>
                <Input
                  variant="auditAssignmentInput"
                  labelText="audit scope"
                  placeholder="Select audit scope"
                  labelVariant="labelGreyMini"
                />
              </div>
            </div>
            <div className={styles.inputRow}>
              <div className={styles.flex12}>
                <Input
                  type="textarea"
                  variant="auditAssignmentInput"
                  labelText="brief description"
                  placeholder="Write a short brief about the audit to be done"
                  labelVariant="labelGreyMini"
                />
              </div>
            </div>
            <div className={`${styles.inputRow} ${styles.inputRowSpacing}`}>
              <div className={styles.flex6}>
                <Input
                  variant="auditAssignmentInput"
                  labelText="Audit Deadline"
                  placeholder="Select date"
                  labelVariant="labelGreyMini"
                />
              </div>
              <div className={styles.flex6}>
                <Input
                  variant="auditAssignmentInput"
                  labelText="Buffer duration"
                  placeholder="Select buffer period"
                  labelVariant="labelGreyMini"
                />
              </div>
            </div>
            <Text
              heading="p"
              text="basic auditor details"
              variant="stepperSubHeading"
            />
            <div className={styles.inputRow}>
              <div className={styles.flex6}>
                <Input
                  variant="auditAssignmentInput"
                  labelText="Auditor's firm name"
                  placeholder="Eg. NK CA Associates"
                  labelVariant="labelGreyMini"
                />
              </div>
              <div className={styles.flex6}>
                <Input
                  variant="auditAssignmentInput"
                  labelText="Auditor's name"
                  placeholder="Name of the Auditor"
                  labelVariant="labelGreyMini"
                />
              </div>
            </div>
            <div className={styles.inputRow}>
              <div className={styles.flex6}>
                <Input
                  variant="auditAssignmentInput"
                  labelText="Auditor's email ID"
                  placeholder="Enter Email ID here"
                  labelVariant="labelGreyMini"
                  type="email"
                />
              </div>
              <div className={styles.flex6}>
                <Input
                  type="select"
                  variant="auditAssignmentInput"
                  labelText="Auditor's designation"
                  placeholder="Select Designation"
                  labelVariant="labelGreyMini"
                  valueForDropDown={[
                    { label: "Team Member", value: 4 },
                    { label: "Compliance Officer", value: 3 },
                    { label: "Approver", value: 5 },
                  ]}
                />
              </div>
            </div>
            <div className={styles.inputRow}>
              <div className={styles.flex6}>
                <Input
                  variant="auditAssignmentInput"
                  labelText="Mobile number"
                  placeholder="Type 10 digit number"
                  labelVariant="labelGreyMini"
                  type="email"
                />
              </div>
            </div>
          </>
        )}
        {stepper?.stepperAcitveSlide === 2 && (
          <>
            <Text
              heading="p"
              text="branch location"
              variant="stepperSubHeading"
            />
            <div className={styles.inputRow}>
              <div className={styles.flex6}>
                <Input
                  variant="auditAssignmentInput"
                  labelText="Address 1"
                  placeholder="Eg. Street No./House No."
                  labelVariant="labelGreyMini"
                />
              </div>
              <div className={styles.flex6}>
                <Input
                  variant="auditAssignmentInput"
                  labelText="Address 2"
                  placeholder="Eg. Gali No./ Nearby location"
                  labelVariant="labelGreyMini"
                />
              </div>
            </div>
            <div className={styles.inputRow}>
              <div className={styles.flex6}>
                <Input
                  variant="auditAssignmentInput"
                  labelText="pincode"
                  placeholder="Enter 6 digit pincode"
                  labelVariant="labelGreyMini"
                />
              </div>
              <div className={styles.flex6}>
                <Input
                  variant="auditAssignmentInput"
                  labelText="District/City"
                  placeholder="Enter district/city here"
                  labelVariant="labelGreyMini"
                />
              </div>
            </div>
            <div className={`${styles.inputRow} ${styles.inputRowSpacing}`}>
              <div className={styles.flex6}>
                <Input
                  type="select"
                  variant="auditAssignmentInput"
                  labelText="state"
                  placeholder="Select State"
                  labelVariant="labelGreyMini"
                  valueForDropDown={[
                    { label: "Delhi", value: 4 },
                    { label: "Mumbai", value: 3 },
                    { label: "Uttar Pradesh", value: 5 },
                  ]}
                />
              </div>
            </div>
            <Text
              heading="p"
              text="branch incharge details"
              variant="stepperSubHeading"
            />
            <div className={`${styles.inputRow} ${styles.inputRowSpacing}`}>
              <div className={styles.flex6}>
                <Input
                  variant="auditAssignmentInput"
                  labelText="branch audit incharge"
                  placeholder="Enter audit incharge name here"
                  labelVariant="labelGreyMini"
                />
              </div>
              <div className={styles.flex6}>
                <Input
                  type="email"
                  variant="auditAssignmentInput"
                  labelText="audit incharge's email id"
                  placeholder="Enter Email Id here"
                  labelVariant="labelGreyMini"
                />
              </div>
            </div>
            <Text
              heading="p"
              text="audit team details (Optional)"
              variant="stepperSubHeading"
            />
            <div className={styles.inputRow}>
              <div className={styles.flex6}>
                <Input
                  variant="auditAssignmentInput"
                  labelText="team member's name"
                  placeholder="Enter name"
                  labelVariant="labelGreyMini"
                />
              </div>
              <div className={styles.flex6}>
                <Input
                  type="email"
                  variant="auditAssignmentInput"
                  labelText="team member's email id"
                  placeholder="Enter Email Id here"
                  labelVariant="labelGreyMini"
                />
              </div>
            </div>
            <div className={`${styles.inputRow} ${styles.inputRowSpacing}`}>
              <div className={styles.flex6}>
                <Input
                  type="select"
                  variant="auditAssignmentInput"
                  labelText="team member's designation"
                  placeholder="Select designation"
                  labelVariant="labelGreyMini"
                  valueForDropDown={[
                    { label: "Team Member", value: 4 },
                    { label: "Compliance Officer", value: 3 },
                    { label: "Approver", value: 5 },
                  ]}
                />
              </div>
            </div>
          </>
        )}
        {stepper?.stepperAcitveSlide === 3 && <QuestionnaireForm />}
        {stepper?.stepperAcitveSlide === 4 && (
          <>
            <div className={styles.reviewDetailsHeadingContainer}>
              <Text
                heading="p"
                text="basic audit details"
                variant="stepperSubHeading"
              />
              <Button variant="stroke" description="Edit" size="none" />
            </div>
            <div className={styles.dataRow}>
              <div className={styles.keyBox}>
                <Text
                  heading="p"
                  text="audit template"
                  variant="smallTableHeading"
                />
              </div>
              <div className={styles.valueBox}>
                <Text
                  heading="p"
                  text="tax audit"
                  variant="smallTableHeading"
                />
              </div>
            </div>
            <div className={styles.dataRow}>
              <div className={styles.keyBox}>
                <Text
                  heading="p"
                  text="assignment name"
                  variant="smallTableHeading"
                />
              </div>
              <div className={styles.valueBox}>
                <Text
                  heading="p"
                  text="tax audit"
                  variant="smallTableHeading"
                />
              </div>
            </div>
            <div className={styles.dataRow}>
              <div className={styles.keyBox}>
                <Text
                  heading="p"
                  text="company's name"
                  variant="smallTableHeading"
                />
              </div>
              <div className={styles.valueBox}>
                <Text
                  heading="p"
                  text="BK securities"
                  variant="smallTableHeading"
                />
              </div>
            </div>
            <div className={styles.dataRow}>
              <div className={styles.keyBox}>
                <Text
                  heading="p"
                  text="Audit scope"
                  variant="smallTableHeading"
                />
              </div>
              <div className={styles.valueBox}>
                <Text
                  heading="p"
                  text="Local branch audit"
                  variant="smallTableHeading"
                />
              </div>
            </div>
            <div className={styles.dataRow}>
              <div className={styles.keyBox}>
                <Text
                  heading="p"
                  text="audit deadline"
                  variant="smallTableHeading"
                />
              </div>
              <div className={styles.valueBox}>
                <Text
                  heading="p"
                  text="Nov 21, 2021"
                  variant="smallTableHeading"
                />
              </div>
            </div>
          </>
        )}

        {/* auditAssignmentMain ends here */}
      </div>
      <div className={styles.buttonContainer}>
        <Button
          description="Next"
          onClick={() => handleNextClick(stepper?.stepperAcitveSlide)}
        />
      </div>

      {/* auditAssignment ends here */}
    </div>
  );
};

export default AuditAssignment;

{
  /* <Text
          heading="p"
          text="add basic audit details"
          variant="stepperSubHeading"
        />
        <div className={styles.inputRow}>
          <div className={styles.flex6}>
            <Input
                type="select"
              variant="auditAssignmentInput"
              labelText="Audit Template"
              placeholder="Select template"
              labelVariant="labelGreyMini"
              valueForDropDown={[
                { label: "Template 1", value: 4 },
                { label: "Template 2", value: 3 },
                { label: "Template 3", value: 5 },
              ]}
            />
          </div>
          <div className={styles.flex6}>
            <Input
              variant="auditAssignmentInput"
              labelText="audit name"
              placeholder="Name of Audit"
              labelVariant="labelGreyMini"
            />
          </div>
        </div>
        <div className={styles.inputRow}>
          <div className={styles.flex6}>
            <Input
              variant="auditAssignmentInput"
              labelText="company's name"
              placeholder="Select company name"
              labelVariant="labelGreyMini"
            />
          </div>
          <div className={styles.flex6}>
            <Input
              variant="auditAssignmentInput"
              labelText="audit scope"
              placeholder="Select audit scope"
              labelVariant="labelGreyMini"
            />
          </div>
        </div>
        <div className={styles.inputRow}>
          <div className={styles.flex12}>
            <Input
              type="textarea"
              variant="auditAssignmentInput"
              labelText="brief description"
              placeholder="Write a short brief about the audit to be done"
              labelVariant="labelGreyMini"
            />
          </div>
        </div>
        <div className={`${styles.inputRow} ${styles.inputRowSpacing}`}>
          <div className={styles.flex6}>
            <Input
              variant="auditAssignmentInput"
              labelText="Audit Deadline"
              placeholder="Select date"
              labelVariant="labelGreyMini"
            />
          </div>
          <div className={styles.flex6}>
            <Input
              variant="auditAssignmentInput"
              labelText="Buffer duration"
              placeholder="Select buffer period"
              labelVariant="labelGreyMini"
            />
          </div>
        </div>
        <Text
          heading="p"
          text="basic auditor details"
          variant="stepperSubHeading"
        />
        <div className={styles.inputRow}>
          <div className={styles.flex6}>
            <Input
              variant="auditAssignmentInput"
              labelText="Auditor's firm name"
              placeholder="Eg. NK CA Associates"
              labelVariant="labelGreyMini"
            />
          </div>
          <div className={styles.flex6}>
            <Input
              variant="auditAssignmentInput"
              labelText="Auditor's name"
              placeholder="Name of the Auditor"
              labelVariant="labelGreyMini"
            />
          </div>
        </div>
        <div className={styles.inputRow}>
          <div className={styles.flex6}>
            <Input
              variant="auditAssignmentInput"
              labelText="Auditor's email ID"
              placeholder="Enter Email ID here"
              labelVariant="labelGreyMini"
              type="email"
            />
          </div>
          <div className={styles.flex6}>
            <Input
            type="select"
              variant="auditAssignmentInput"
              labelText="Auditor's designation"
              placeholder="Select Designation"
              labelVariant="labelGreyMini"
              valueForDropDown={[
                { label: "Team Member", value: 4 },
                { label: "Compliance Officer", value: 3 },
                { label: "Approver", value: 5 },
              ]}
            />
          </div>
        </div>
        <div className={styles.inputRow}>
          <div className={styles.flex6}>
            <Input
              variant="auditAssignmentInput"
              labelText="Mobile number"
              placeholder="Type 10 digit number"
              labelVariant="labelGreyMini"
              type="email"
            />
          </div>
        </div> */
}
