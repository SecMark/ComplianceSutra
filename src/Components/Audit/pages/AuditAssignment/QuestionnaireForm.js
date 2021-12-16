import React from "react";
import styles from "./style.module.scss";
import Text from "../../components/Text/Text";
import { Input } from "../../components/Inputs/Input";
import Button from "../../components/Buttons/Button";
import { MdExpandMore } from "react-icons/md";
import IconButton from "../../components/Buttons/IconButton";
const QuestionnaireForm = () => {
  return (
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
              <Text heading="p" text="Assign to" variant="smallTableHeading" />
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
      </div>
    </div>
  );
};

export default QuestionnaireForm;
