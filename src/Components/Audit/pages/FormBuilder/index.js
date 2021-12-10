import React, { useState } from "react";
import FormComponents from "../../components/FormComponents/FormComponent";
import styles from "./style.module.scss";
const FormBuilder = () => {
  const [sectionName, setSectionName] = useState("");
  return (
    <div className={styles.maincontainer}>
      <div className={styles.container}>
        <FormComponents sectionName={sectionName} setSectionName={setSectionName} />
      </div>
    </div>
  );
};

export default FormBuilder;
