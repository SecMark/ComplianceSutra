import React, { useState } from "react";
import styles from "./style.module.scss";
import Button from "../../components/Buttons/Button";
import AddNewAuditer from "./AddNewAuditer";
import AddNewSubUser from "./AddNewSubUser";

function CommonAuditFormPage() {
  const [openModal, setOpenModal] = useState(false);
  const [openSubModal, setSubOpenModal] = useState(false);
  return (
    <div className={styles.App}>
      <h6>Create Auditor Forms and Subordinate Forms.</h6>
      <div className={styles.auditUserButton}>
        <Button
          description="Create Audit"
          onClick={() => {
            setOpenModal(true);
          }}
        />
      </div>
      <div className={styles.subUserButton}>
        <Button
          description="Create Sub User"
          onClick={() => {
            setSubOpenModal(true);
          }}
        />
      </div>
      {openModal && <AddNewAuditer closeModal={setOpenModal} />}
      {openSubModal && <AddNewSubUser closeSubModal={setSubOpenModal} />}
    </div>
  );
}

export default CommonAuditFormPage;
