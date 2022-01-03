import React, { useState } from "react";
import styles from "./style.module.scss";
import Button from "../../components/Buttons/Button";
import AddNewAuditer from "./AddNewAuditer";
import AddNewSubUser from "./AddNewSubUser";
import CreateAuditee from "./CreateAuditee"

function CommonAuditFormPage() {
  const [openModal, setOpenModal] = useState(false);
  const [openSubModal, setSubOpenModal] = useState(false);
  const [openAuditee, setAuditee] = useState(false);
  return (
    <div className={styles.App}>
      <h6>Create Auditor Forms and Subordinate Forms.</h6>
      <div className={styles.auditUserButton}>
        <Button
          description="+ NEW AUDITOR"
          onClick={() => {
            setOpenModal(true);
          }}
        />
      </div>
      <div className={styles.subUserButton}>
        <Button
          description="+ NEW SUBUSER"
          onClick={() => {
            setSubOpenModal(true);
          }}
        />
      </div>
      <div className={styles.auditee}>
        <Button
          description="+ NEW AUDITEE"
          onClick={() => {
            setAuditee(true);
          }}
        />
      </div>

      {openModal && <AddNewAuditer closeModal={setOpenModal} />}
      {openSubModal && <AddNewSubUser closeSubModal={setSubOpenModal} />}
      {openAuditee && <CreateAuditee closeAuditeModal={setAuditee} />}
    </div>
  );
}

export default CommonAuditFormPage;
