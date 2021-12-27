import React, { useState } from "react";
import styles from "./style.module.scss";
import Text from "../../components/Text/Text";
import { Input } from "../../components/Inputs/Input";
import Button from "../../components/Buttons/Button";
import IconButton from "../../components/Buttons/IconButton";
import { AiOutlineClose } from "react-icons/ai";

function AddNewAuditer({ closeModal }) {
  const [newAuditor, setNewAuditor] = useState({
    AuditName: "",
    SelectName: "",
    MobileNo: "",
    Email: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewAuditor({ ...newAuditor, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      newAuditor.AuditName &&
      newAuditor.SelectName &&
      newAuditor.MobileNo &&
      newAuditor.Email
    ) {
      setNewAuditor({ AuditName: "", SelectName: "", MobileNo: "", Email: "" });
      console.log(newAuditor);
    }
  };

  return (
    <>
      {/* <Text heading="h5" text="Add New Audier" variant="auditheading" /> */}
      <div className={styles.body}>
        <div className={styles.mainContainer}>
          <div className={styles.Container}>
            <div className={styles.closeButton}>
              <IconButton
                icon={<AiOutlineClose />}
                variant="closeBtn"
                onClick={() => closeModal(false)}
              />
              {/* <Button>X</Button> */}
            </div>
            <Text heading="h6" text="Auditor Name" variant="auditNames" />
            <div className={styles.auditInput}>
              <Input
                variant="AddNewAuditInput"
                name="AuditName"
                value={newAuditor.AuditName}
                onChange={handleChange}
              />
            </div>
            <Text heading="h6" text="Experties" variant="expterties" />
            <div className={styles.auditdropInput}>
              <Input
                type="select"
                variant="dropdownInput"
                placeholder="Select"
                name="SelectName"
                id="select"
                value={newAuditor.SelectName}
                onChange={handleChange}
                valueForDropDown={[
                  { label: "select", value: 0 },
                  { label: "Team Member", value: 4 },
                  { label: "Compliance Officer", value: 3 },
                  { label: "Approver", value: 5 },
                ]}
              />
            </div>
            <Text heading="h6" text="Mobile No." variant="mobileNo" />
            <div className={styles.auditInput}>
              <Input
                variant="mobileNum"
                name="MobileNo"
                value={newAuditor.MobileNo}
                onChange={handleChange}
              />
            </div>
            <Text heading="h6" text="Emai Address" variant="emailAddress" />
            <div className={styles.auditInput}>
              <Input
                variant="mobileNum"
                name="Email"
                value={newAuditor.Email}
                onChange={handleChange}
              />
            </div>
            <Text
              heading="h6"
              text="Allowed to add Sub-Ordinate"
              variant="allow-sub"
            />
            <div className={styles.sliderRound}>
              <div className="col-12 pr-0">
                <div className={styles.switchbtn}>
                  <label className={styles.switch}>
                    <input type="checkbox" />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>
            </div>
            <div className={styles.btnContainer}>
              <Button description="Submit" onClick={handleSubmit} />
              <Button
                description="Cancel"
                variant="cancelButton"
                onClick={() => closeModal(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddNewAuditer;
