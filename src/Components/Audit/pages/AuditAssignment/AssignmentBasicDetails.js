import React, { useEffect, useState } from "react";
import Text from "../../components/Text/Text";
import { Input } from "../../components/Inputs/Input";
import styles from "./style.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { setAuditAssignmentDetails,setAssignmentId } from "../../redux/actions";
import axiosInstance from "../../../../apiServices";
import Button from "../../components/Buttons/Button";
import { toast } from "react-toastify";
import moment from "moment";

function AssignmentBasicDetails({ next, stepper, values, setValues }) {
  const [templateNames, setTemplateNames] = useState([]);
  const [errors, setErrors] = useState({
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
  const dispatch = useDispatch();
  console.log("values", values);
  console.log("check errors", errors);

  useEffect(() => {
    fetchTemplateNames();
  }, []);

  //email validation
  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

  //form validate function
  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };

  //Function to fetch Template names
  const fetchTemplateNames = () => {
    try {
      axiosInstance.get("audit.api.getAuditTemplateList").then((response) => {
        if (response?.data?.message?.status === true) {
          const arr1 = [];
          response.data.message.audit_template_list.map((item) => {
            arr1.push({
              label: item.name,
              value: item.name,
            });
          });
          setTemplateNames(arr1);
        }
        console.log(
          "template names",
          response?.data?.message.audit_template_list
        );
      });
    } catch (err) {
      toast.error("somthing went wrong")
    }
  };


  //function to set form values and to check fileds validation
  const formValues = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "audit_template_name":
        setErrors({
          ...errors,
          audit_template_name:
            value.length === 0 ? "Please Select The Template Name" : "",
        });
        break;
      case "audit_name":
        setErrors({
          ...errors,
          audit_name: value.length === 0 ? "Audit name can't be empty" : "",
        });
        break;
      case "company_name":
        setErrors({
          ...errors,
          company_name: value.length === 0 ? "company name can't be empty" : "",
        });
        break;
      case "audit_scope":
        setErrors({
          ...errors,
          audit_scope: value.length === 0 ? "Audit Scope can't be empty" : "",
        });
        break;
      case "audit_description":
        setErrors({
          ...errors,
          audit_description:
            value.length === 0 ? "Audit description can't be empty" : "",
        });
        break;
      case "audit_deadline":
        setErrors({
          ...errors,
          audit_deadline:
            value.length === 0 ? "Audit deadline can't be empty" : "",
        });
        break;
      case "buffer_duration":
        setErrors({
          ...errors,
          buffer_duration:
            value.length === 0 ? "Buffer duration can't be empty" : "",
        });
        break;
      case "auditor_firm_name":
        setErrors({
          ...errors,
          auditor_firm_name:
            value.length === 0 ? "Auditor firm name can't be empty" : "",
        });
        break;
      case "auditor_name":
        setErrors({
          ...errors,
          auditor_name: value.length === 0 ? "Audit name can't be empty" : "",
        });
        break;
      case "auditor_email":
        setErrors({
          ...errors,
          auditor_email: validEmailRegex.test(value)
            ? ""
            : "Email is not valid",
        });
        break;
      case "auditor_designation":
        setErrors({
          ...errors,
          auditor_designation:
            value.length === 0 ? "Auditor designation can't be empty" : "",
        });
        break;
      case "auditor_mobile_no":
        setErrors({
          ...errors,
          auditor_mobile_no:
            value.length === 10 ? "" : "mobile no must be 10 digits",
        });
        break;
      default:
        break;
    }
    setValues({
      ...values,
      [event.target.name]: value,
    });
  };

  const onDateChange = (date, dateString) => {
    const todayDate = moment().format("YYYY-MM-DD");
    setValues({
      ...values,
      start_date: date?.format("YYYY-MM-DD") || "",
    });
    if (moment(todayDate).isAfter(dateString)) {
      setErrors({
        ...errors,
        start_date: `please select ${todayDate} or after ${todayDate}`,
      });
    } else {
      setErrors({
        ...errors,
        start_date:"",
      });
      
    }   
  };

  const dataSubmitAPicall = async () => {
    const payload = {
      audit_template_name: values.audit_template_name,
      audit_name: values.audit_name,
      audit_category: values.audit_scope,
      description: values.audit_description,
      company_name: values.company_name,
      duration_of_completion: values.audit_deadline,
      buffer_period: values.buffer_duration,
      auditor_name: values.auditor_name,
      auditor_firm_name: values.auditor_firm_name,
      auditor_email_id: values.auditor_email,
      auditor_mobile_no: values.auditor_mobile_no,
      designation: values.auditor_designation,
      start_date: values.start_date,
    };
    try {
      const data = await axiosInstance.post("audit.api.Assignment", payload);
      dispatch(setAssignmentId(data?.data?.message.assignment_id));
      if(data?.data?.message.status === true){
        next(stepper?.stepperAcitveSlide);
      }
      else{
        toast.error("somthing Went wrong");
      }
    } catch (err) {
      toast.error(err);
    }
  };
  const submitData = () => {
    // next(stepper?.stepperAcitveSlide);
    if (values.audit_template_name.length === 0) {
      toast.error("Please Select The Template Name");
      setErrors({
        ...errors,
        audit_template_name: "Please Select The Template Name",
      });
    } else if (values.audit_name.length === 0) {
      toast.error("Audit name can't be empty")
      setErrors({
        ...errors,
        audit_name: "Audit name can't be empty",
      });
    } else if (values.company_name.length === 0) {
      toast.error("company name can't be empty")
      setErrors({
        ...errors,
        company_name: "company name can't be empty",
      });
    } else if (values.audit_scope.length === 0) {
      toast.error("Audit Scope can't be empty")
      setErrors({
        ...errors,
        audit_scope: "Audit Scope can't be empty",
      });
    } else if (values.audit_description.length === 0) {
      toast.error("Audit description can't be empty")
      setErrors({
        ...errors,
        audit_description: "Audit description can't be empty",
      });
    } else if (values.audit_deadline.length === 0) {
      toast.error("Audit deadline can't be empty")
      setErrors({
        ...errors,
        audit_deadline: "Audit deadline can't be empty",
      });
    } else if (values.buffer_duration.length === 0) {
      toast.error("Buffer duration can't be empty")
      setErrors({
        ...errors,
        buffer_duration: "Buffer duration can't be empty",
      });
    } else if (values.auditor_firm_name.length === 0) {
      toast.error("Auditor firm name can't be empty")
      setErrors({
        ...errors,
        auditor_firm_name: "Auditor firm name can't be empty",
      });
    } else if (values.auditor_name.length === 0) {
      toast.error("Audit name can't be empty")
      setErrors({
        ...errors,
        auditor_name: "Audit name can't be empty",
      });
    } else if (values.start_date.length === 0) {
      toast.error("please Select start date")
      setErrors({
        ...errors,
        start_date: "please Select start date",
      });
    } else if (values.auditor_email.length === 0) {
      toast.error("Auditor email can't be empty")
      setErrors({
        ...errors,
        auditor_email: "Auditor email can't be empty",
      });
    } else if (values.auditor_designation.length === 0) {
      toast.error("Auditor designation can't be empty")
      setErrors({
        ...errors,
        auditor_designation: "Auditor designation can't be empty",
      });
    } else if (values.auditor_mobile_no.length === 0) {
      toast.error("Auditor mobile no can't be empty")
      setErrors({
        ...errors,
        auditor_mobile_no: "Auditor mobile no can't be empty",
      });
    } else {
      if (validateForm(errors)) {
        dispatch(setAuditAssignmentDetails(values));
        dataSubmitAPicall();
        
      } else {
        toast.error("pleasae fill the required fields");
      }
    }
  };
  
const dateFormat = 'YYYY-MM-DD';


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
            value={values.audit_template_name}
            valueForDropDown={templateNames}
          />
          {errors.audit_template_name.length > 0 && (
            <Text
              heading="p"
              variant="error"
              text={errors.audit_template_name}
            />
          )}
        </div>
        <div className={styles.flex6}>
          <Input
            variant="auditAssignmentInput"
            labelText="audit name"
            placeholder="Name of Audit"
            labelVariant="labelGreyMini"
            name="audit_name"
            value={values.audit_name}
            onChange={formValues}
          />
          {errors.audit_name.length > 0 && (
            <Text heading="p" variant="error" text={errors.audit_name} />
          )}
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
            value={values.company_name}
            onChange={formValues}
          />
          {errors.company_name.length > 0 && (
            <Text heading="p" variant="error" text={errors.company_name} />
          )}
        </div>
        <div className={styles.flex6}>
          <Input
            variant="auditAssignmentInput"
            labelText="audit scope"
            placeholder="Select audit scope"
            labelVariant="labelGreyMini"
            name="audit_scope"
            value={values.audit_scope}
            onChange={formValues}
          />
          {errors.audit_scope.length > 0 && (
            <Text heading="p" variant="error" text={errors.audit_scope} />
          )}
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
            value={values.audit_description}
            onChange={formValues}
          />
          {errors.audit_description.length > 0 && (
            <Text heading="p" variant="error" text={errors.audit_description} />
          )}
        </div>
      </div>
      <div className={`${styles.inputRow}`}>
        <div className={styles.flex6}>
          <Input
            variant="auditAssignmentInput"
            labelText="Audit Deadline"
            placeholder="Enter days"
            labelVariant="labelGreyMini"
            name="audit_deadline"
            value={values.audit_deadline}
            onChange={formValues}
          />
          {errors.audit_deadline.length > 0 && (
            <Text heading="p" variant="error" text={errors.audit_deadline} />
          )}
        </div>
        <div className={styles.flex6}>
          <Input
            variant="auditAssignmentInput"
            labelText="Buffer duration"
            placeholder="Select buffer period"
            labelVariant="labelGreyMini"
            name="buffer_duration"
            value={values.buffer_duration}
            onChange={formValues}
          />
          {errors.buffer_duration.length > 0 && (
            <Text heading="p" variant="error" text={errors.buffer_duration} />
          )}
        </div>
      </div>
      <div className={`${styles.inputRow} ${styles.inputRowSpacing}`}>
        <div className={styles.flex6}>
          <Input
            type="date"
            onChange={onDateChange}
            labelText="Start date"
            labelVariant="labelGreyMini"
            variant="auditAssignmentInput"
            value={ values?.start_date && moment(values?.start_date,dateFormat)}
          />
          {errors.start_date.length > 0 && (
            <Text heading="p" variant="error" text={errors.start_date} />
          )}
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
            value={values.auditor_firm_name}
          />
          {errors.auditor_firm_name.length > 0 && (
            <Text variant="error" heading="p" text={errors.auditor_firm_name} />
          )}
        </div>
        <div className={styles.flex6}>
          <Input
            variant="auditAssignmentInput"
            labelText="Auditor's name"
            placeholder="Name of the Auditor"
            labelVariant="labelGreyMini"
            name="auditor_name"
            onChange={formValues}
            value={values.auditor_name}
          />
          {errors.auditor_name.length > 0 && (
            <Text heading="p" variant="error" text={errors.auditor_name} />
          )}
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
            value={values.auditor_email}
          />
          {errors.auditor_email.length > 0 && (
            <Text heading="p" text={errors.auditor_email} variant="error" />
          )}
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
            value={values.auditor_designation}
            valueForDropDown={[
              { label: "Team Member", value: "Team Member" },
              { label: "Compliance Officer", value: "Compliance Officer" },
              { label: "Approver", value: "Approver" },
            ]}
          />
          {errors.auditor_designation.length > 0 && (
            <Text
              heading="p"
              variant="error"
              text={errors.auditor_designation}
            />
          )}
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
            value={values.auditor_mobile_no}
          />
          {errors.auditor_mobile_no.length > 0 && (
            <Text heading="p" variant="error" text={errors.auditor_mobile_no} />
          )}
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          description="Next"
          onClick={() => {
            submitData();
          }}
        />
      </div>
    </>
  );
}

export default AssignmentBasicDetails;
