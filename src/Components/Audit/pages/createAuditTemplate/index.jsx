import React, { useState } from "react";
import Text from "../../components/Text/Text";
import { Input } from "../../components/Inputs/Input";
import styles from "./style.module.scss";
import DropZone from "../../components/FileDragAndDrop/dropZone";
import { toast } from "react-toastify";
import IconButton from "../../components/Buttons/IconButton";
import { AiFillPlusCircle, AiFillDelete } from "react-icons/ai";
import axiosInstance from "../../../../apiServices";
import { useEffect } from "react";
import Select from "react-select";
import { AiFillFile } from "react-icons/ai";
import Button from "../../components/Buttons/Button";
import Label from "../../components/Labels/Label";
import Dropzone from "react-dropzone";
import { setTemplateName } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";

function CreateAuditTemplate({ next, back, stepper }) {
  const [circularfileList, setcirCularFileList] = useState([]);
  const [attchmentfileList, setAttachmentFileList] = useState([]);
  const [questionList, setQuestionList] = useState([
    { audit_question: "", audit_answer: "" },
  ]);
  const [catagoryList, setCatagoryList] = useState([]);
  const [values, setValues] = useState({
    audit_template_name: "",
    audit_category: "",
    buffer_period: "",
    audit_description: "",
    duration_of_completion: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    getCatagoryList();
  }, []);

  const customStyle = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "#fafafa",
      width: "250px",
      border: "none",
      boxShadow: "rgb(99 99 99 / 20%) 0px 2px 8px 0px;",
    }),
  };
  //function to get Audit Category List
  const getCatagoryList = () => {
    axiosInstance
      .get("audit.api.getAuditCatagory")
      .then((response) => {
        const arr1 = [];
        response.data.message.audit_catagory_list.map((el) => {
          arr1.push({
            value: el,
            label: el,
          });
        });
        setCatagoryList(arr1);
      })
      .catch((err) => {
        toast.error("enable to fetch audit catagory");
      });
  };

  //function to check if template name or audit catagory is empty or not
  const fileUpload = (file, doc) => {
    if (values.audit_template_name === "") {
      toast.error("Please Enter the template name  first");
    } else if (values.audit_category === "") {
      toast.error("Please Enter the Audit catagory  first");
    } else {
      uploadFile(file, doc);
    }
  };

  // function to get files data
  const getFileData = () => {
    axiosInstance
      .get("audit.api.getAuditTemplate", {
        params: {
          audit_template_name: values.audit_template_name,
        },
      })
      .then((response) => {
        if (response?.data?.message?.data?.reference_files === null) {
          setAttachmentFileList([]);
          if (response?.data?.message?.data?.file === null) {
            setcirCularFileList([]);
          } else {
            setcirCularFileList(response?.data?.message?.data?.file);
          }
        } else if (response?.data?.message?.data?.file === null) {
          setcirCularFileList([]);
          if (response?.data?.message?.data?.reference_files === null) {
            setAttachmentFileList([]);
          } else {
            setAttachmentFileList(
              response?.data?.message?.data?.reference_files
            );
          }
        } else {
          setcirCularFileList(response?.data?.message?.data?.file);
          setAttachmentFileList(response?.data?.message?.data?.reference_files);
        }
      });
  };

  //function to set files into state
  const uploadFile = (file, doc) => {
    const audit_template_name = values.audit_template_name;
    const fileArray1 = [];
    const fileArray2 = [];
    if (doc === "guideliencedoc") {
      file.forEach((file) => {
        fileArray1.push(file);
      });
    } else {
      file.forEach((file) => {
        fileArray2.push(file);
      });
    }
    const formData = new FormData();
    formData.append("audit_template_name", audit_template_name);
    formData.append("audit_category", values.audit_category);
    for (let i = 0; i < fileArray1.length; i++) {
      formData.append("guidelines_documents", fileArray1[i]);
    }
    for (let i = 0; i < fileArray2.length; i++) {
      formData.append("reference_attachment_files", fileArray2[i]);
    }
    try {
      axiosInstance
        .post("audit.api.UpdateAuditTemplate", formData)
        .then((response) => {
          if (response?.data?.message?.status === true) {
            getFileData();
            toast.success(response?.data?.message?.status_response);
            dispatch(setTemplateName(values?.audit_template_name));
          }
        });
    } catch (err) {
      toast.error("somthing went wrong");
    }
  };

  //function to set question answer state
  const questionInputChange = (event, index) => {
    const { name, value } = event.target;
    const list = [...questionList];
    list[index][name] = value;
    setQuestionList(list);
  };

  //function to remove question field
  const removeQuestionFields = (index) => {
    const list = [...questionList];
    list.splice(index, 1);
    setQuestionList(list);
  };

  // function to add new question
  const addQuestionField = () => {
    setQuestionList([
      ...questionList,
      { audit_question: "", audit_answer: "" },
    ]);
  };

  // function for state change for other fields
  const onFormValueChange = (event) => {
    const value = event.target.value;
    setValues({
      ...values,
      [event.target.name]: value,
    });
  };

  // function for audit catagory dropdown
  const onDropdownChnage = (even) => {
    setValues({
      ...values,
      audit_category: even.label,
    });
  };

  // function to download file
  const fileDownload = (item) => {
    axiosInstance
      .post("compliance.api.GetFileContent", { file_id: item })
      .then((res) => {
        const url = `data:application/${res.data.message.file_name
          .split(".")
          .pop()};base64,${res.data.message.encoded_string}`;
        const hiddenElement = document.createElement("a");
        hiddenElement.href = url;
        hiddenElement.download = res.data.message.file_name;
        hiddenElement.click();
      });
  };

  // function to delete file
  const removeFileData = (file_id) => {
    axiosInstance
      .post("audit.api.DeleteFile", { file_id: file_id })
      .then((res) => {
        if (res.data.message.status === true) {
          getFileData();
        }
      });
  };

  //function to submit final data
  const dataSubmit = () => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    formData.append("audit_questions", JSON.stringify(questionList));
    axiosInstance
      .post("audit.api.UpdateAuditTemplate", formData)
      .then((response) => {
        if (response.data.message.status === true) {
          toast.success(response.data.message.status_response);
        }
      })
      .catch((err) => {
        toast.error("something went wrong");
      });
    dispatch(setTemplateName(values.audit_template_name));
  };
  //  next(()=>{
  //    dataSubmit();
  // })
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <Text
            heading="p"
            text="Add Scope & Basic Details"
            variant="stepperSubHeading"
          />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <Input
            variant="auditTemplate"
            placeholder="name of the template"
            labelText="Name of the Template"
            labelVariant="createTemplateLabel"
            name="audit_template_name"
            onChange={onFormValueChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <Label text="Audit Complaince" variant="createTemplateLabel" />
          <Select
            options={catagoryList}
            value={{
              value: values.audit_category,
              label: values.audit_category,
            }}
            defaultValue={{
              value: "Select Type here",
              label: "Select Type here",
            }}
            styles={customStyle}
            onChange={onDropdownChnage}
          />
        </div>
      </div>
      <div className={styles.inputContainer}>
        <Input
          variant="textArea"
          rows="6"
          type="textArea"
          labelText="Brief Audit Description"
          placeholder="Brief about audit Description"
          labelVariant="createTemplateLabel"
          name="audit_description"
          onChange={onFormValueChange}
        />
      </div>
      <div>
        {circularfileList.length === 0 && (
          <DropZone
            uploadFile={(file) => {
              fileUpload(file, "guideliencedoc");
            }}
            labelText="Add official circular/Guidelines Documents from Regulators"
          />
        )}
        {circularfileList.length !== 0 &&
          circularfileList.map((item) => {
            return (
              <div className={styles.container}>
                <div className={styles.commonContainer}>
                  <AiFillFile />
                </div>
                <div className={styles.commonContainer}>
                  <Text heading="h1" text={item.file_name} size="small" />{" "}
                </div>
                <div>
                  <Button
                    onClick={() => {
                      fileDownload(item.file_id);
                    }}
                    description="View"
                    variant="viewfilebtn"
                  />
                </div>
                <div>
                  <Button
                    onClick={() => {
                      removeFileData(item.file_id);
                    }}
                    description="Delete"
                    variant="viewfilebtn"
                  />
                </div>
              </div>
            );
          })}
        {circularfileList.length >= 1 && (
          <Dropzone
            multiple={true}
            onDrop={(file) => {
              fileUpload(file, "guideliencedoc");
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps({
                  className: "dropzone",
                })}
              >
                <div>
                  <input {...getInputProps()} />
                </div>
                <Button
                  description="ADD NEW FILE/REFERENCE"
                  variant="extraFileAddBtn"
                  size="large"
                />
              </div>
            )}
          </Dropzone>
        )}
      </div>
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <Input
            variant="auditTemplate"
            placeholder="type the no of days"
            labelText="Possible Duration of Completion"
            labelVariant="createTemplateLabel"
            name="duration_of_completion"
            onChange={onFormValueChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            variant="auditTemplate"
            placeholder="enter the extra no of days required"
            labelText="Buffer period(extra time for audit completion)"
            labelVariant="createTemplateLabel"
            name="buffer_period"
            onChange={onFormValueChange}
          />
        </div>
      </div>
      <div>
        {attchmentfileList.length === 0 && (
          <DropZone
            uploadFile={fileUpload}
            labelText="Add Attachments/references"
          />
        )}
        {attchmentfileList.length !== 0 &&
          attchmentfileList.map((item) => {
            return (
              <div className={styles.container}>
                <div className={styles.commonContainer}>
                  <AiFillFile />
                </div>
                <div className={styles.commonContainer}>
                  <Text heading="h1" text={item.file_name} size="small" />{" "}
                </div>
                <div>
                  <Button
                    onClick={() => {
                      fileDownload(item.file_id);
                    }}
                    description="View"
                    variant="viewfilebtn"
                  />
                </div>
                <div>
                  <Button
                    onClick={() => {
                      removeFileData(item.file_id);
                    }}
                    description="Delete"
                    variant="viewfilebtn"
                  />
                </div>
              </div>
            );
          })}
        {attchmentfileList.length >= 1 && (
          <Dropzone
            multiple={true}
            onDrop={(file) => {
              fileUpload(file);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps({
                  className: "dropzone",
                })}
              >
                <div>
                  <input {...getInputProps()} />
                </div>
                <Button
                  description="ADD NEW FILE/REFERENCE"
                  variant="extraFileAddBtn"
                  size="large"
                />
              </div>
            )}
          </Dropzone>
        )}
        {/*  */}
      </div>
      <div className="mt-3">
        <div>
          <Text
            heading="p"
            text="Frequently Asked questions"
            variant="stepperSubHeading"
          />
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
                    labelVariant="createTemplateLabel"
                    value={item.audit_question}
                    name="audit_question"
                    onChange={(event) => questionInputChange(event, index)}
                  />
                  <Input
                    variant="auditTemplate"
                    placeholder="Add Answer to your Question"
                    labelText={`Answer of Question ${index + 1}`}
                    labelVariant="createTemplateLabel"
                    value={item.audit_answer}
                    name="audit_answer"
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
      {/* <button onClick={dataSubmit}>Sumbit</button> */}
      <div className={styles.saveTemplate}>
        <div>
          <Button
            description="SAVE TEMPLATE & QUIT"
            variant="preview"
            size="medium"
          />
        </div>
        <div>
          <Button
            description="NEXT"
            size="small"
            variant="default"
            onClick={() => {
              next(stepper?.stepperAcitveSlide);
              dataSubmit();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateAuditTemplate;
