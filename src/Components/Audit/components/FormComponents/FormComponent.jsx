import React, { useEffect, useState } from "react";
import Text from "../Text/Text";
import Button from "../Buttons/Button";
import styles from "./style.module.scss";
import { inputItem } from "../../constants/FormBuilderConstants/InputItem";
import IconButton from "../Buttons/IconButton";
import {
  BsPlusCircleFill,
  BsTrashFill,
  BsPlusSquareFill,
} from "react-icons/bs";
import { Input } from "../Inputs/Input";
import { v4 as uuidv4 } from "uuid";
import Datepicker from "../DatePicker/Datepicker";
import { dataTypes } from "../../constants/DateTypes";
import { fileTypes } from "../../constants/DateTypes/fileType";
import axiosInstance from "../../../../apiServices";
import { BACKEND_BASE_URL } from "../../../../apiServices/baseurl";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const FormComponents = ({ next, back, stepper }) => {
  const state = useSelector((state) => state);
  const history = useHistory();
  const [inputFieldList, setInputFieldList] = useState([
    {
      id: uuidv4(),
      sectionName: "",
      completionDuration: "",
      bufferPeriod: "",
      questionSectionId: "",
      questionnaireSection: "",
      inputs: [
        {
          questionnaire_section: "",
          question: "",
          how_get_this_data: "",
          answer_option: "",
          field_type: "Text",
          id: uuidv4(),
          error: {
            isError: false,
            type: "",
            message: "",
          },
        },
      ],
    },
  ]);

  useEffect(() => {}, [inputFieldList]);

  const ondragstart = (event, id) => {
    event.dataTransfer.setData("id", id);
  };

  const ondragover = (event) => {
    event.preventDefault();
  };

  const drop = (event, sectionId, inputSectionId) => {
    const eventId = event.dataTransfer.getData("id");
    const eventType = inputItem.filter((item) => item.id === eventId);

    let temp = [...inputFieldList];

    temp[sectionId].inputs[inputSectionId]["field_type"] =
      eventType[0].valueType;

    setInputFieldList(temp);
  };

  const addNewSection = () => {
    let temp = [...inputFieldList];
    temp.push({
      id: uuidv4(),
      sectionName: "",
      completionDuration: "",
      bufferPeriod: "",
      isError: false,
      questionSectionId: "",
      questionnaireSection: "",
      inputs: [
        {
          questionnaire_section: "",
          question: "",
          how_get_this_data: "",
          answer_option: "",
          field_type: "Text",
          reference_document: "",
          error: {
            isError: false,
            type: "",
            message: "",
          },
        },
      ],
    });

    setInputFieldList(temp);
  };

  const deleteSection = async (id, index) => {
    let temp = [...inputFieldList];

    const payload = { question_section_id: temp[index]?.questionSectionId };

    const deleteSectionName = await axiosInstance.post(
      `${BACKEND_BASE_URL}audit.api.DeleteQuestionnaireSection`,
      payload
    );

    if (deleteSectionName) {
      const { message } = deleteSectionName.data;
      if (message.status) {
      } else {
        toast({ type: "error", message: message.status_response });
      }
    }

    let removeSection = temp.filter((item) => item.id !== id);
    setInputFieldList(removeSection);
  };

  const addCustomRequirement = async (Iindex) => {
    let temp = [...inputFieldList];
    let inputLength = temp[Iindex].inputs.length - 1;
    let previousQuestion = temp[Iindex].inputs[inputLength];
    let section = temp[Iindex];

    if (
      section.sectionName === "" ||
      section.bufferPeriod === "" ||
      section.completionDuration === ""
    ) {
      toast.error("Please enter section name, Buffer time and Duration.");
    } else if (previousQuestion?.questionnaire_section === "") {
      temp[Iindex].inputs[inputLength].error = {
        isError: true,
        type: "questionLabel",
        message: "Requirement is required",
      };
      setInputFieldList(temp);
    } else if (
      previousQuestion?.field_type !== "Text" &&
      previousQuestion?.answer_option !== ""
    ) {
      temp[Iindex].inputs[inputLength].error = {
        isError: true,
        type: "value",
        message: "Value is required",
      };
      setInputFieldList(temp);
    } else {
      const addQuestion = await submitRequirement(section, previousQuestion);

      if (addQuestion) {
        temp[Iindex].inputs.push({
          questionnaire_section: "",
          question: "",
          how_get_this_data: "",
          reference_document: "",
          answer_option: "",
          field_type: "none",
          id: uuidv4(),
          error: {
            isError: false,
            type: "",
            message: "",
          },
        });
        setInputFieldList(temp);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const addSectionName = async (event) => {
    let temp = [...inputFieldList];
    const { value, id, name } = event.target;
    temp[id].isError = false;
    if (name === "sectionName") {
      temp[id].sectionName = value;
    } else if (name === "duration") {
      temp[id].completionDuration = value;
    } else if (name === "buffer") {
      temp[id].bufferPeriod = value;
    }

    setInputFieldList(temp);
  };

  const submitSection = async (event) => {
    let temp = [...inputFieldList];
    const { id } = event.target;
    const { sectionName, completionDuration, bufferPeriod } = temp[id];

    if (
      sectionName &&
      sectionName !== "" &&
      completionDuration &&
      completionDuration !== "" &&
      bufferPeriod &&
      bufferPeriod !== ""
    ) {
      let payload = {
        audit_template_name: state.AuditReducer.templateName,
        questionnaire_section: temp[id].sectionName,
        duration_of_completion: parseInt(temp[id].completionDuration),
        buffer_period: parseInt(temp[id].bufferPeriod),
      };
      let addSectionResponse = "";

      if (temp[id].questionSectionId === "") {
        addSectionResponse = await axiosInstance.post(
          `${BACKEND_BASE_URL}audit.api.AddQuestionnaireSection`,
          payload
        );
      } else {
        payload.question_section_id = temp[id].questionSectionId
          ? temp[id].questionSectionId
          : "";

        addSectionResponse = await axiosInstance.post(
          `${BACKEND_BASE_URL}audit.api.UpdateQuestionnaireSection`,
          payload
        );
      }

      if (addSectionResponse) {
        const { message } = addSectionResponse.data;
        if (message.status) {
          temp[id].questionSectionId = message?.question_section_id;
          temp[id].questionnaireSection = message?.questionnaire_section;
          temp[id].isError = false;
          setInputFieldList(temp);
        } else {
          temp[id].isError = true;
          setInputFieldList(temp);
        }
      }
    }
  };

  const addNewRequirement = async (Iindex) => {
    let temp = [...inputFieldList];
    let inputLength = temp[Iindex].inputs.length - 1;
    let previousQuestion = temp[Iindex].inputs[inputLength];
    let section = temp[Iindex];

    if (
      section.sectionName === "" ||
      section.bufferPeriod === "" ||
      section.completionDuration === ""
    ) {
      toast.error("Please enter section name, Buffer time and Duration.");
    } else if (previousQuestion?.questionnaire_section === "") {
      temp[Iindex].inputs[inputLength].error = {
        isError: true,
        type: "questionLabel",
        message: "Requirement is required",
      };
      setInputFieldList(temp);
    } else if (
      previousQuestion?.field_type !== "Text" &&
      previousQuestion?.answer_option === ""
    ) {
      temp[Iindex].inputs[inputLength].error = {
        isError: true,
        type: "value",
        message: "Value is required",
      };
      setInputFieldList(temp);
    } else {
      const addQuestion = await submitRequirement(section, previousQuestion);

      if (addQuestion) {
        temp[Iindex].inputs.push({
          questionnaire_section: "",
          question: "",
          how_get_this_data: "",
          reference_document: "",
          answer_option: "",
          field_type: "Text",
          id: uuidv4(),
          error: {
            isError: false,
            type: "",
            message: "",
          },
        });
        setInputFieldList(temp);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const deleteRequirement = (index, id) => {
    let temp = [...inputFieldList];

    temp[index].inputs = temp[index].inputs.filter((item) => item.id !== id);
    setInputFieldList(temp);
  };

  const createRequirement = async (event) => {
    let temp = [...inputFieldList];

    const { name, value, id } = event.target;
    const splitId = id.split(",");

    if (name === "questionnaire_section") {
      temp[splitId[1]].inputs[splitId[0]].questionnaire_section = value;
      temp[splitId[1]].inputs[splitId[0]].error = {
        isError: false,
        type: "",
        message: "",
      };
    } else if (name === "answer_option") {
      temp[splitId[1]].inputs[splitId[0]].answer_option = value;
      temp[splitId[1]].inputs[splitId[0]].error = {
        isError: false,
        type: "",
        message: "",
      };
    } else if (name === "how_get_this_data") {
      temp[splitId[1]].inputs[splitId[0]].how_get_this_data = value;
    } else if (name === "reference_document") {
      temp[splitId[1]].inputs[splitId[0]].reference_document =
        event.target.files[0];
    }

    setInputFieldList(temp);
  };

  const submitRequirement = async (section, question) => {
    const {
      questionnaire_section,
      field_type,
      answer_option,
      how_get_this_data,
      reference_document,
    } = question;

    const { questionSectionId } = section;

    let formData = new FormData();
    formData.append("question_section_id", questionSectionId);
    formData.append("question", questionnaire_section);
    formData.append(
      "reference_document",
      reference_document ? reference_document : ""
    );
    formData.append(
      "how_get_this_data",
      how_get_this_data ? how_get_this_data : ""
    );
    formData.append("answer_option", answer_option ? answer_option : "");
    formData.append("field_type", field_type);

    const addSectionResponse = await axiosInstance.post(
      `${BACKEND_BASE_URL}audit.api.AddQuestionQuestionnaire`,
      formData
    );
    if (addSectionResponse) {
      return true;
    } else {
      return false;
    }
  };

  const onNextClick = async (type) => {
    let temp = [...inputFieldList];

    temp.map(async (sectionData, index) => {
      let inputsLength = sectionData?.inputs.length;
      if (sectionData?.inputs?.length > 0) {
        let previousQuestion = sectionData?.inputs[inputsLength - 1];

        if (
          sectionData.sectionName === "" ||
          sectionData.bufferPeriod === "" ||
          sectionData.completionDuration === ""
        ) {
          toast.error("Please enter section name, Buffer time and Duration.");
        } else if (previousQuestion?.questionnaire_section === "") {
          temp[index].inputs[inputsLength - 1].error = {
            isError: true,
            type: "questionLabel",
            message: "Requirement is required",
          };
          toast.error("Please enter Requirement.");
          setInputFieldList(temp);
        } else if (
          previousQuestion?.field_type !== "Text" &&
          previousQuestion?.answer_option === ""
        ) {
          temp[index].inputs[inputsLength].error = {
            isError: true,
            type: "value",
            message: "Value is required",
          };
          toast.error("Please enter Value.");
          setInputFieldList(temp);
        } else {
          const addQuestion = await submitRequirement(
            sectionData,
            previousQuestion
          );
          if (!addQuestion) {
            toast.error("Something went wrong");
          } else {
            if (type === "next") {
              next(stepper?.stepperAcitveSlide);
            } else {
              history.push("/audit");
            }
          }
        }
      }
    });
  };

  return (
    <>
      <ToastContainer />
      <div className={styles.formComponetsContainer}>
        <div className={styles.formBuilderCompoents}>
          <Text heading="h2" text="Form Components" />
          <Text
            heading="span"
            text="Drag & drop items to create questionnaire"
            variant="grey"
          />
          <div className={styles.itemList}>
            {/* <IconButton
              description="New Question"
              onDragStart={(event) => ondragstart(event, uuidv4())}
              draggable={true}
              variant="item"
              icon={<BsPlusSquareFill />}
              size="medium"
            /> */}
            <div className={styles.inputButtons}>
              {inputItem.map((item, index) => (
                <Button
                  description={item.name}
                  onDragStart={ondragstart}
                  draggable={true}
                  variant="item"
                  key={index}
                  id={item.id}
                />
              ))}
            </div>
            <div className={styles.bottomButtonContainer}>
              <Button
                description="SAVE TEMPLATE & QUIT"
                variant="preview"
                size="medium"
                onClick={() => {
                  onNextClick("exist");
                }}
              />
              <Button
                description="NEXT"
                size="small"
                variant="default"
                onClick={() => {
                  next(stepper?.stepperAcitveSlide);
                  // onNextClick();
                  onNextClick("next");
                }}
              />
            </div>
          </div>
        </div>

        <div className={styles.formInputs}>
          <div className={styles.heading}>
            <Text
              heading="h2"
              text="Tax Audit Questionaire Form"
              variant="white"
            />
          </div>
          <div className={styles.inputContainer}>
            {inputFieldList.map((listItem, Iindex) => {
              return (
                <>
                  <div className={styles.sectionName}>
                    <div>
                      <Input
                        type="text"
                        labelText="Section Name"
                        value={listItem.sectionName}
                        name="sectionName"
                        id={Iindex}
                        onChange={addSectionName}
                        onBlur={submitSection}
                      />
                      {listItem.isError && (
                        <Text
                          heading="span"
                          text={`${listItem.sectionName} is already exists`}
                          variant="error"
                        />
                      )}
                    </div>
                    <div>
                      <Input
                        type="number"
                        labelText="Duration"
                        value={listItem.duration}
                        id={Iindex}
                        name="duration"
                        onChange={addSectionName}
                        onBlur={submitSection}
                        variant="small"
                      />
                    </div>
                    <div>
                      <Input
                        type="number"
                        labelText="Buffer Peroid"
                        value={listItem.buffer}
                        id={Iindex}
                        name="buffer"
                        onChange={addSectionName}
                        onBlur={submitSection}
                        variant="small"
                      />
                    </div>
                    <div>
                      <BsTrashFill
                        onClick={() => deleteSection(listItem.id, Iindex)}
                      />
                    </div>
                  </div>
                  <div className={styles.inputSection}>
                    {listItem?.inputs.map((fieldName, index) => {
                      return (
                        <div>
                          <div className={styles.deleteRequirement}>
                            <BsTrashFill
                              onClick={() =>
                                deleteRequirement(Iindex, fieldName.id)
                              }
                            />
                          </div>
                          <div
                            className={`${styles.inputBody} row`}
                            onDragOver={(event) => ondragover(event)}
                            onDrop={(event) => drop(event, Iindex, index)}
                          >
                            {fieldName.field_type !== "none" && (
                              <>
                                <div
                                  className={`${styles.inputField} col-md-6`}
                                >
                                  <Input
                                    type="text"
                                    labelText="Requirement"
                                    variant="medium"
                                    id={`${index},${Iindex}`}
                                    name="questionnaire_section"
                                    value={fieldName.questionnaire_section}
                                    onChange={createRequirement}
                                  />
                                  {fieldName.error?.isError &&
                                    fieldName.error?.type ===
                                      "questionLabel" && (
                                      <Text
                                        heading="span"
                                        text={fieldName.error.message}
                                        variant="error"
                                      />
                                    )}
                                </div>
                                <div
                                  className={`${styles.inputField} col-md-6`}
                                >
                                  {fieldName.field_type === "Text" ? (
                                    <Input
                                      type="select"
                                      labelText="Data Type"
                                      variant="small"
                                      id={`${index},${Iindex}}`}
                                      name="field_type"
                                      valueForDropDown={dataTypes}
                                      onChange={createRequirement}
                                    />
                                  ) : (
                                    <Input
                                      type="text"
                                      labelText="Data Type"
                                      variant="small"
                                      value={fieldName.field_type}
                                      disabled={true}
                                      className={`${styles.inputField} col-md-6`}
                                    />
                                  )}
                                </div>

                                {fieldName.field_type !== "Text" &&
                                  fieldName.field_type !== "Date" && (
                                    <div
                                      className={`${styles.inputField} col-md-6`}
                                    >
                                      <Input
                                        type="text"
                                        labelText="value"
                                        variant="small"
                                        value={fieldName.answer_option}
                                        id={`${index},${Iindex}`}
                                        name="answer_option"
                                        onChange={createRequirement}
                                      />
                                      {fieldName.error?.isError &&
                                        fieldName.error?.type === "value" && (
                                          <Text
                                            heading="span"
                                            text={fieldName.error.message}
                                            variant="error"
                                          />
                                        )}
                                    </div>
                                  )}

                                <div
                                  className={`${styles.inputField} col-md-6`}
                                >
                                  <Input
                                    type="text"
                                    labelText="How get this data"
                                    variant="medium"
                                    id={`${index},${Iindex}`}
                                    name="how_get_this_data"
                                    value={fieldName.how_get_this_data}
                                    onChange={createRequirement}
                                  />
                                </div>

                                <div
                                  className={`${styles.inputField} col-md-6`}
                                >
                                  <Input
                                    type="file"
                                    labelText="Reference Document"
                                    name="reference_document"
                                    onChange={createRequirement}
                                    id={`${index},${Iindex}`}
                                  />
                                </div>
                              </>
                            )}
                            {fieldName.field_type === "Attach" && (
                              <>
                                <div
                                  className={`${styles.inputField} col-md-6`}
                                >
                                  <Input
                                    type="text"
                                    labelText="Attachment Details"
                                  />
                                </div>
                                <div
                                  className={`${styles.inputField} col-md-6`}
                                >
                                  <Input
                                    type="select"
                                    labelText="Attachment Format"
                                    variant="small"
                                    valueForDropDown={fileTypes}
                                  />
                                </div>
                              </>
                            )}

                            {fieldName.field_type === "Date" && (
                              <div className={`${styles.dateRange} col-md-6`}>
                                <Datepicker
                                  labelText="Date Range for Records"
                                  name="answer_option"
                                  onChange={createRequirement}
                                  id={`${index},${Iindex}`}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    <div className={styles.addNewContainer}>
                      <BsPlusSquareFill
                        onClick={() => addNewRequirement(Iindex)}
                      />
                      <Text
                        heading="span"
                        text="NEW REQUIREMENT"
                        variant="primary"
                        size="small"
                      />

                      <BsPlusSquareFill
                        onClick={() => addCustomRequirement(Iindex)}
                      />
                      <Text
                        heading="span"
                        text="CUSTOM REQUIREMENT"
                        variant="primary"
                        size="small"
                      />
                    </div>
                  </div>
                </>
              );
            })}
            <div className={styles.addNewSection} onClick={addNewSection}>
              <BsPlusSquareFill />
              <Text
                heading="p"
                text="NEW SECTION"
                size="small"
                variant="primary"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormComponents;
