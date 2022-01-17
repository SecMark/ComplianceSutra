import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Text from "../../components/Text/Text";
import Button from "../../components/Buttons/Button";
import { AiFillFile } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../../../apiServices";
import { toast } from "react-toastify";

function ReviewTemplateDetails() {
  const state = useSelector((state) => state);
  const [templateData, setTemplateData] = useState([]);
  const [questionaryDetails,setQuestionaryDetails] = useState([]);

  useEffect(() => {
    fetchCreateTemplateDetails();
    fetchQuestionaryDetails();
  }, []);


  const fetchCreateTemplateDetails = () =>{
    try {
      axiosInstance
        .get("audit.api.getAuditTemplate", {
          params: {
            audit_template_name: state?.AuditReducer?.templateName || "",
          },
        })
        .then((res) => {
          setTemplateData(res.data.message.data);
        });
    } catch (err) {
      toast.error("somthing went wrong");
    }
  }
  const fetchQuestionaryDetails = () =>{
    try {
      axiosInstance
        .get("audit.api.getQuestionFromAudit", {
          params: {
            audit_template_name: state?.AuditReducer?.templateName || "",
          },
        })
        .then((res) => {
          // setTemplateData(res.data.message.data);
          setQuestionaryDetails(res.data.message.message)
        });
    } catch (err) {
      toast.error("somthing went wrong");
    }
  }

  return (
    <div>
      <div className={styles.headingContainer}>
        <div className={styles.heading}>
          <Text heading="h1" size="large" text="Scope Details" />
        </div>
        <div className={styles.editButton}>
          <Button description="EDIT" variant="edit" />
        </div>
      </div>
      <div className={styles.createTemplateFields}>
        <div className={styles.outputValues}>
          <Text
            heading="h3"
            variant="reviewDetailsLeft"
            size="small"
            text="Audit Name"
          />
        </div>
        <div className={styles.outputValues}>
          {templateData?.audit_template_name || ""}
        </div>
      </div>
      <div className={styles.createTemplateFields}>
        <div className={styles.outputValues}>
          <Text
            heading="h3"
            variant="reviewDetailsLeft"
            size="small"
            text="Audit Category"
          />
        </div>
        <div className={styles.outputValues}>
          {templateData?.audit_category}
        </div>
      </div>
      <div className={styles.createTemplateFields}>
        <div className={styles.outputValues}>
          <Text
            heading="h3"
            size="small"
            variant="reviewDetailsLeft"
            text="Possible Complition duration"
          />
        </div>
        <div className={styles.outputValues}>
          {templateData?.duration_of_completion || "-"}
        </div>
      </div>
      <div className={styles.createTemplateFields}>
        <div className={styles.outputValues}>
          <Text
            heading="h3"
            variant="reviewDetailsLeft"
            size="small"
            text="Buffer Time"
          />
        </div>
        <div className={styles.outputValues}>{templateData?.buffer_period || "-"}</div>
      </div>
      <div className={styles.createTemplateFields}>
        <div className={styles.outputValues}>
          <Text
            heading="h3"
            variant="reviewDetailsLeft"
            size="small"
            text="Description"
          />
        </div>
        <div className={styles.outputValues}>
          {templateData?.audit_description || "-"}
        </div>
      </div>
      <div className={styles.createTemplateFields}>
        <div className={styles.outputValues}>
          <Text
            heading="h3"
            variant="reviewDetailsLeft"
            size="small"
            text="Attached Files"
          />
        </div>
        <div className={styles.outputValues}>
          {templateData?.file?.map((item) => (
              <div style={{display:"flex"}}>
                <AiFillFile /> <Text
                 heading="h1"
                 size="small"
                 text={item.file_name}
                />
              </div>
            ))}
            {templateData?.reference_files?.map((item) => (
              <div style={{display:"flex"}}>
                <AiFillFile /> <Text
                 heading="h1"
                 size="small"
                 text={item.file_name}
                />
              </div>
            ))}
        </div>
      </div>
      <div className={styles.headingContainer}>
        <div className={styles.heading}>
          <Text heading="h1" size="large" text="Questionaire Details" />
        </div>
        <div className={styles.editButton}>
          <Button description="EDIT" variant="edit" />
        </div>
      </div>
      <div className={styles.createTemplateFields}>
        <div className={styles.outputValues}>
          <Text
            heading="h3"
            variant="reviewDetailsLeft"
            size="small"
            text="Section 1"
          />
        </div>
        <div className={styles.outputValues}>
          {questionaryDetails?.map((item)=>(
            <>
            <Text heading="h3"
                 size="small"
                 text={item.questionnaire_section}            
            />
            </>
          )) || "-"}
        </div>
      </div>
      <div className={styles.createTemplateFields}>
        <div className={styles.outputValues}>
          <Text
            heading="h3"
            variant="reviewDetailsLeft"
            size="small"
            text="Question"
          />
        </div>
        <div className={styles.outputValues}>
         { questionaryDetails?.map((item)=>(
           <>
             {item.list?.map((items)=>(
               <>
               <Text heading="h3"
                 size="small"
                  text={items.question}
                 />
               </>
             ))}
           </>
         )) || "-"}
        </div>
      </div>
    </div>
  );
}

export default ReviewTemplateDetails;
