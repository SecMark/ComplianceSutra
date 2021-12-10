import React, { useState } from "react";
import FormComponents from "../../components/FormComponents/FormComponent";

const FormBuilder = () => {
  const [sectionName, setSectionName] = useState("");
  return (
    <FormComponents sectionName={sectionName} setSectionName={setSectionName} />
  );
};

export default FormBuilder;
