import React, { Suspense, useEffect, useState } from "react";
import styles from "./style.module.scss";
import Text from "../../components/Text/Text";
import Button from "../../components/Buttons/Button";
import IconButton from "../../components/Buttons/IconButton";
import { MdArrowBack, MdClose } from "react-icons/md";
import Stepper from "../../../../CommonModules/sharedComponents/Stepper";
import QuestionnaireForm from "./QuestionnaireForm";
import AssignmentBasicDetails from "./AssignmentBasicDetails";
import AddressDetails from "./AddressDetails";
import ReviewDetails from "./ReviewDetails";
import { auditAssignmentSteps } from "./StepperSteps";
import Loading from "../../../../CommonModules/sharedComponents/Loader";

const AuditAssignment = () => {
  const [values, setValues] = useState({
    audit_template_name: "",
    audit_name: "",
    company_name: "",
    audit_scope: "",
    audit_description: "",
    start_date: "",
    audit_deadline: "",
    buffer_duration: "",
    auditor_firm_name: "",
    auditor_name: "",
    auditor_email: "",
    auditor_designation: "",
    auditor_mobile_no: "",
  });
  const [auditTeamDetails, setAuditTeamDetails] = useState([
    {
      team_member: "",
      team_member_email: "",
      designation: "",
    },
  ]);
  const [branchData, setBranchData] = useState({
    address_title: "",
    address_line1: "",
    pincode: "",
    state: "",
    city: "",
    branch_auditor_incharge: "",
    auditor_incharge_email: "",
  });
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
          height: `calc( 100vh - ${headerHeight + 116}px )`,
        }}
      >
        {stepper?.stepperAcitveSlide === 1 && (
          <AssignmentBasicDetails
            next={handleNextClick}
            stepper={stepper}
            values={values}
            setValues={setValues}
          />
        )}
        {stepper?.stepperAcitveSlide === 2 && (
          <AddressDetails
            next={handleNextClick}
            stepper={stepper}
            auditTeamDetails={auditTeamDetails}
            setAuditTeamDetails={setAuditTeamDetails}
            branchData={branchData}
            setBranchData={setBranchData}
          />
        )}
        {stepper?.stepperAcitveSlide === 3 &&
        
            <QuestionnaireForm/>
      
        
        
        }
        {stepper?.stepperAcitveSlide === 4 && <ReviewDetails />}

        {/* auditAssignmentMain ends here */}
      </div>

      {/* <div className={styles.buttonContainer}>
        <Button
          description="Next"
          onClick={() => {
            handleNextClick(stepper?.stepperAcitveSlide);
          }}
        />
      </div> */}
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
