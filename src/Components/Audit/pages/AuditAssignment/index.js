import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import Text from "../../components/Text/Text";
import { Input } from "../../components/Inputs/Input";
import Button from "../../components/Buttons/Button";
import IconButton from "../../components/Buttons/IconButton";
import { MdArrowBack, MdClose, MdExpandMore } from "react-icons/md";
const AuditAssignment = () => {
  const [headerHeight, setHeaderHeight] = useState(0);
  useEffect(() => {
    const _headerHeight = document
      .querySelector("." + styles.auditHeader)
      .getClientRects()[0].height;
    setHeaderHeight(_headerHeight);
  }, []);
  return (
    <div className={styles.auditAssignment}>
      <div className={styles.auditHeader}>
        <div className={styles.auditHeaderButtonContainer}>
          {/* <button className={styles.iconButton}>
            <MdArrowBack />
          </button> */}
          <IconButton
            variant="iconButtonRound"
            icon={<MdArrowBack />}
            size="none"
          />
          <IconButton
            variant="iconButtonRound"
            icon={<MdClose />}
            size="none"
          />
        </div>
        <Text
          heading="p"
          text="create audit assignment"
          variant="stepperMainHeading"
        />
        <div className={styles.auditHeaderBorder}></div>
      </div>
      <div
        className={styles.auditAssignmentMain}
        style={{
          height: `calc( 100vh - ${headerHeight + 94}px )`,
        }}
      >
        {/* <Text heading="p" text="branch location" variant="stepperSubHeading" />
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
        </div> */}

        <div className={styles.questionnaireForm}>
          <div className={styles.questionnaireFormHeader}>
            <Text
              heading="p"
              text="Questionnaire Form"
              variant="stepperSubHeading"
            />
            <div className={styles.questionnaireFormHeaderOptions}>
              <div className={styles.inputGroupRowReverse}>
                <Input
                  type="checkbox"
                  variant="auditAssignmentInput"
                  labelText="Assign all tasks to Ashu Kumar"
                  labelVariant="labelPrimary"
                />
              </div>
              <Button description="preveiw allocation" variant="preview" />
            </div>
          </div>
          <div className={styles.questionnaireFormMain}>
            <table className={styles.questionnaireFormTable}>
              <thead>
                <th>
                  <Text
                    heading="p"
                    text="section name"
                    variant="smallTableHeading"
                  />
                </th>
                <th>
                  <Text
                    heading="p"
                    text="Deadline Starts from"
                    variant="smallTableHeading"
                  />
                </th>
                <th>
                  <Text
                    heading="p"
                    text="Assign to"
                    variant="smallTableHeading"
                  />
                </th>
              </thead>
              <tbody>
                {/* General Details */}
                <tr>
                  <td className={styles.questionnaireFormSectionName}>
                    <Text
                      heading="p"
                      text="General Details"
                      variant="stepperSubHeadingBold"
                    />
                    <IconButton
                      variant="iconButtonRound"
                      icon={<MdExpandMore />}
                      size="none"
                    />
                  </td>
                  <td className={styles.questionnaireFormDeadline}>
                    <Input
                      type="select"
                      variant="auditAssignmentInputWhite"
                      placeholder="Select"
                      valueForDropDown={[
                        { label: "7 days", value: 4 },
                        { label: "14 days", value: 3 },
                        { label: "21 days", value: 5 },
                      ]}
                    />
                  </td>
                  <td>
                    <div className={styles.questionnaireFormAssignTo}>
                      <div className={styles.userTag}>
                        <Text
                          heading="p"
                          text="Ashu Kumar"
                          variant="smallTableHeading"
                        />
                      </div>
                      <div
                        className={`${styles.userTag} ${styles.userTagSelected}`}
                      >
                        <Text
                          heading="p"
                          text="Pooja K"
                          variant="smallTableHeading"
                        />
                      </div>
                      <div className={styles.userTag}>
                        <Text
                          heading="p"
                          text="Ashu Kumar"
                          variant="smallTableHeading"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td colSpan="2">
                    <table className={styles.questionnaireFormTable}>
                      <thead>
                        <th>
                          <Text
                            heading="p"
                            text="checkpoint"
                            variant="smallTableHeading"
                          />
                        </th>
                        <th>
                          <Text
                            heading="p"
                            text="Deadline Starts from"
                            variant="smallTableHeading"
                          />
                        </th>
                        <th>
                          <Text
                            heading="p"
                            text="Assign to"
                            variant="smallTableHeading"
                          />
                        </th>
                      </thead>
                      <tbody>
                        <tr>
                          <td className={styles.questionnaireFormSectionName}>
                            <Text
                              heading="p"
                              text="Send us your SEBI Registered License Number"
                              variant="stepperSubHeadingBold"
                            />
                          </td>
                          <td className={styles.questionnaireFormDeadline}>
                            <Input
                              type="select"
                              variant="auditAssignmentInputWhite"
                              placeholder="Select"
                              valueForDropDown={[
                                { label: "7 days", value: 4 },
                                { label: "14 days", value: 3 },
                                { label: "21 days", value: 5 },
                              ]}
                            />
                          </td>
                          <td>
                            <div className={styles.questionnaireFormAssignTo}>
                              <div className={styles.userTag}>
                                <Text
                                  heading="p"
                                  text="Ashu Kumar"
                                  variant="smallTableHeading"
                                />
                              </div>
                              <div
                                className={`${styles.userTag} ${styles.userTagSelected}`}
                              >
                                <Text
                                  heading="p"
                                  text="Pooja K"
                                  variant="smallTableHeading"
                                />
                              </div>
                              <div className={styles.userTag}>
                                <Text
                                  heading="p"
                                  text="Ashu Kumar"
                                  variant="smallTableHeading"
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                {/* Invoice Details */}
                <tr>
                  <td className={styles.questionnaireFormSectionName}>
                    <Text
                      heading="p"
                      text="Invoice Details"
                      variant="stepperSubHeadingBold"
                    />
                    <IconButton
                      variant="iconButtonRound"
                      icon={<MdExpandMore />}
                      size="none"
                    />
                  </td>
                  <td className={styles.questionnaireFormDeadline}>
                    <Input
                      type="select"
                      variant="auditAssignmentInputWhite"
                      placeholder="Select"
                      valueForDropDown={[
                        { label: "7 days", value: 4 },
                        { label: "14 days", value: 3 },
                        { label: "21 days", value: 5 },
                      ]}
                    />
                  </td>
                  <td>
                    <div className={styles.questionnaireFormAssignTo}>
                      <div className={styles.userTag}>
                        <Text
                          heading="p"
                          text="Ashu Kumar"
                          variant="smallTableHeading"
                        />
                      </div>
                      <div
                        className={`${styles.userTag} ${styles.userTagSelected}`}
                      >
                        <Text
                          heading="p"
                          text="Pooja K"
                          variant="smallTableHeading"
                        />
                      </div>
                      <div className={styles.userTag}>
                        <Text
                          heading="p"
                          text="Ashu Kumar"
                          variant="smallTableHeading"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
                {/* Tax Licenses */}
                <tr>
                  <td className={styles.questionnaireFormSectionName}>
                    <Text
                      heading="p"
                      text="Tax Licenses"
                      variant="stepperSubHeadingBold"
                    />
                    <IconButton
                      variant="iconButtonRound"
                      icon={<MdExpandMore />}
                      size="none"
                    />
                  </td>
                  <td className={styles.questionnaireFormDeadline}>
                    <Input
                      type="select"
                      variant="auditAssignmentInputWhite"
                      placeholder="Select"
                      valueForDropDown={[
                        { label: "7 days", value: 4 },
                        { label: "14 days", value: 3 },
                        { label: "21 days", value: 5 },
                      ]}
                    />
                  </td>
                  <td>
                    <div className={styles.questionnaireFormAssignTo}>
                      <div className={styles.userTag}>
                        <Text
                          heading="p"
                          text="Ashu Kumar"
                          variant="smallTableHeading"
                        />
                      </div>
                      <div
                        className={`${styles.userTag} ${styles.userTagSelected}`}
                      >
                        <Text
                          heading="p"
                          text="Pooja K"
                          variant="smallTableHeading"
                        />
                      </div>
                      <div className={styles.userTag}>
                        <Text
                          heading="p"
                          text="Ashu Kumar"
                          variant="smallTableHeading"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            {/* <div className={styles.divider}></div> */}
          </div>
        </div>

        {/* auditAssignmentMain ends here */}
      </div>
      <div className={styles.buttonContainer}>
        <Button description="Next" />
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
