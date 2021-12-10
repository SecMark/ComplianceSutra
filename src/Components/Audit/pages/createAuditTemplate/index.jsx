import React, { useState } from "react";
import Text from "../../components/Text/Text";
import { Input } from "../../components/Inputs/Input";
import styles from "./style.module.scss";
import DropZone from "../../components/FileDragAndDrop/dropZone";
import { toast } from "react-toastify";
import IconButton from "../../components/Buttons/IconButton";
import { AiFillPlusCircle, AiFillDelete } from "react-icons/ai";

function CreateAuditTemplate() {
  const [fileList, setFileList] = useState([]);
  const [questionList, setQuestionList] = useState([
    { Question: "", Answer: "" },
  ]);
  const [valueForDropDown] =useState([{
    name :"internal and Mandetory audit",
    value:"internal and Mandetory audit"
  },
  {
    name: "audit",
    value:"audit"
  }
])
  const [values, setValues] =
    useState(
      {
        auditTemplateName: "",
        auditCategory: "",
        bufferPeriod: "",
        auditDescription: "",
        durationOfCompletion: "",
      }
    );
  
  //function to set files into state
  const uploadFile = (file) => {
    const _fileList = (fileList && fileList[0] && fileList[0].Files) || [];
    let isPresent = false;
    const fileArray = [];
    file.forEach((file) => {
      isPresent = _fileList.some(function (element) {
        return element.FileName === file.name;
      });
      if (!isPresent) {
        fileArray.push(file);
      } else {
        toast.error(
          `File ${file.name} is already uploaded. Please rename it and upload`
        );
        return "";
      }
    });
    setFileList(fileArray);
  };

  // handle input change for question
  const questionInputChange = (event, index) => {
    const { name, value } = event.target;
    const list = [...questionList];
    list[index][name] = value;
    setQuestionList(list);
  };

  // handle click event of the Remove button to remove question
  const removeQuestionFields = (index) => {
    const list = [...questionList];
    list.splice(index, 1);
    setQuestionList(list);
  };

  // handle click event of the Add button to add new question
  const addQuestionField = () => {
    setQuestionList([...questionList, { Question: "", Answer: "" }]);
  };

  const onFormValueChange = (event) => {
    const value = event.target.value;
    setValues({
      ...values,
      [event.target.name]: value,
    });
  };

  return (
    <div>
      <div className={styles.container}>
        <div>
          <Text heading="h1" text="Add Scope & Basic Details" size="medium" />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <Input
            variant="auditTemplate"
            placeholder="name of the template"
            labelText="Name of the Template"
            name="auditTemplateName"
            onChange={onFormValueChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            variant="auditTemplate"
            placeholder="name of the template"
            labelText="Audit Compliance"
            type="select"
            name="auditCategory"
            value={values.auditCategory}
            valueForDropDown={valueForDropDown}
            onChange={onFormValueChange}
            
          />
        </div>
      </div>
      <div className={styles.inputContainer}>
        <Input
          variant="textArea"
          rows="6"
          type="textArea"
          labelText="Brief Audit Description"
          name="auditDescription"
          onChange={onFormValueChange}
        />
      </div>
      <div>
        <DropZone
          uploadFile={uploadFile}
          labelText="Add official circular/Guidelines Documents from Regulators"
        />
      </div>
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <Input
            variant="auditTemplate"
            placeholder="type the no of days"
            labelText="Possible Duration of Completion"
            name="durationOfCompletion"
            onChange={onFormValueChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            variant="auditTemplate"
            placeholder="enter the extra no of days required"
            labelText="Buffer period(extra time for audit completion)"
            name="bufferPeriod"
            onChange={onFormValueChange}
          />
        </div>
      </div>
      <div>
        <DropZone
          uploadFile={uploadFile}
          labelText="Add Attachments/references"
        />
      </div>
      <div>
        <div>
          <Text heading="h1" text="Frequently Asked questions" size="medium" />
        </div>
        <div className={styles.container}>
          {questionList.map((item, index) => {
            return (
              <>
                <div className={styles.questionContainer} key={index}>
                  <Input
                    variant="auditTemplate"
                    placeholder="Type Your Question Here"
                    labelText={`Question ${index + 1}`}
                    value={item.Question}
                    name="Question"
                    onChange={(event) => questionInputChange(event, index)}
                  />
                  <Input
                    variant="auditTemplate"
                    placeholder="Add Answer to your Question"
                    labelText={`Answer of Question ${index + 1}`}
                    value={item.Answer}
                    name="Answer"
                    onChange={(event) => questionInputChange(event, index)}
                  />
                  {questionList.length !== 1 && (
                    <IconButton
                      icon={<AiFillDelete />}
                      variant="removeIcon"
                      description="Remove"
                      onClick={() => removeQuestionFields(index)}
                      size="small"
                    />
                  )}
                  {questionList.length - 1 === index && (
                    <IconButton
                      icon={<AiFillPlusCircle />}
                      variant="addIcon"
                      description="ADD NEW FAQ"
                      onClick={addQuestionField}
                      size="small"
                    />
                  )}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CreateAuditTemplate;
