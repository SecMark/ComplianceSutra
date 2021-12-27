import React, { useEffect, useState } from "react";
import Text from "../../components/Text/Text";
import { Input } from "../../components/Inputs/Input";
import styles from "./style.module.scss";
import {useSelector,useDispatch} from "react-redux"
import {setAuditAssignmentDetails} from "../../redux/actions";
import axiosInstance from "../../../../apiServices";

function AssignmentBasicDetails() {
  const [values, setValues] = useState({
    audit_template_name: "",
    audit_name: "",
    company_name: "",
    audit_scope: "",
    audit_description: "",
    audit_deadline: "",
    buffer_duration: "",
    auditor_firm_name: "",
    auditor_name: "",
    auditor_email: "",
    auditor_designation: "",
    auditor_mobile_no: "",
  });
  const [templateNames,setTemplateNames] =useState([])
  console.log("temp",templateNames);
  const dispatch = useDispatch();


  useEffect(()=>{
    fetchTemplateNames();
  },[])

  //Function to fetch Template names
  const fetchTemplateNames =()=>{
      try{
        axiosInstance.get("audit.api.getAuditTemplateList").
        then((response)=>{
            if(response.data.message.status === true){
                const arr1 = [];
                response.data.message.audit_template_list.map(item=>{
                      arr1.push({
                          label: item.name,
                          value: item.name
                      })
                })
                setTemplateNames(arr1);
            }
           console.log("template names" , response.data.message.audit_template_list)
        })
      }
      catch(err){

      }
  }

console.log("state values",values);
  const formValues = (event) => {
    const value = event.target.value;
    setValues({
      ...values,
      [event.target.name]: value,
    });
  };
  const submitData = ()=>{
      dispatch(setAuditAssignmentDetails(values))
  }

  return (
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
            onChange={formValues}
            name="audit_template_name"
            valueForDropDown={templateNames}
          />
        </div>
        <div className={styles.flex6}>
          <Input
            variant="auditAssignmentInput"
            labelText="audit name"
            placeholder="Name of Audit"
            labelVariant="labelGreyMini"
            name="audit_name"
            onChange={formValues}
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
            name="company_name"
            onChange={formValues}
          />
        </div>
        <div className={styles.flex6}>
          <Input
            variant="auditAssignmentInput"
            labelText="audit scope"
            placeholder="Select audit scope"
            labelVariant="labelGreyMini"
            name="audit_scope"
            onChange={formValues}
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
            name="audit_description"
            onChange={formValues}
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
            name="audit_deadline"
            onChange={formValues}
          />
        </div>
        <div className={styles.flex6}>
          <Input
            variant="auditAssignmentInput"
            labelText="Buffer duration"
            placeholder="Select buffer period"
            labelVariant="labelGreyMini"
            name="buffer_duration"
            onChange={formValues}
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
            name="auditor_firm_name"
            onChange={formValues}
          />
        </div>
        <div className={styles.flex6}>
          <Input
            variant="auditAssignmentInput"
            labelText="Auditor's name"
            placeholder="Name of the Auditor"
            labelVariant="labelGreyMini"
            name="auditor_name"
            onChange={formValues}
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
            name="auditor_email"
            onChange={formValues}
          />
        </div>
        <div className={styles.flex6}>
          <Input
            type="select"
            variant="auditAssignmentInput"
            labelText="Auditor's designation"
            placeholder="Select Designation"
            labelVariant="labelGreyMini"
            name="auditor_designation"
            onChange={formValues}
            valueForDropDown={[
              { label: "Team Member", value:"Team Member" },
              { label: "Compliance Officer",value:"Compliance Officer" },
              { label: "Approver", value: "Approver" },
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
            name="auditor_mobile_no"
            onChange={formValues}
            
          />
        </div>
      </div>
      <button onClick={submitData}>Submit</button>
    </>
  );
}

export default AssignmentBasicDetails;
