import React from "react";
import Text from "../../components/Text/Text";
import { Input } from "../../components/Inputs/Input";
import Button from "../../components/Buttons/Button";
import styles from "./style.module.scss";
import IconButton from "../../components/Buttons/IconButton";
import { AiOutlineClose } from "react-icons/ai";

function CreateAuditee({ closeAuditeModal }) {
  return (
    <>
      {/* <Text heading="h5" text="Add New Sub User" variant="auditheading" /> */}
      <div className={styles.subMainContainer}>
        <div className={styles.Container}>
          <div className={styles.closeButton}>
            <IconButton
              icon={<AiOutlineClose />}
              variant="closeBtn"
              onClick={() => closeAuditeModal(false)}
            />
          </div>
          <Text heading="h6" text="Subordinate Name" variant="auditNames" />
          <div className={styles.auditInput}>
            <Input
              variant="AddNewAuditInput"
              name="AuditName"
              //   value={newAuditor.AuditName}
              //   onChange={handleChange}
            />
          </div>
          <Text heading="h6" text="Experties" variant="expterties" />
          <Input
            type="select"
            variant="dropdownInput"
            placeholder="Select"
            name="SelectName"
            // value={newAuditor.SelectName}
            // onChange={handleChange}
            valueForDropDown={[
              { label: "Team Member", value: 4 },
              { label: "Compliance Officer", value: 3 },
              { label: "Approver", value: 5 },
            ]}
          />
          <Text heading="h6" text="Mobile No." variant="mobileNo" />
          <div className={styles.auditInput}>
            <Input
              variant="mobileNum"
              name="MobileNo"
              //   value={newAuditor.MobileNo}
              //   onChange={handleChange}
            />
          </div>
          <Text heading="h6" text="Emai Address" variant="emailAddress" />
          <div className={styles.auditInput}>
            <Input
              variant="mobileNum"
              name="Email"
              //   value={newAuditor.Email}
              //   onChange={handleChange}
            />
          </div>
          <div className={styles.btnSubmit}>
            <Button description="Submit" />
          </div>
          <div className={styles.btnCancel}>
            <Button
              description="Cancel"
              variant="cancelButton"
              onClick={() => closeAuditeModal(false)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateAuditee;
