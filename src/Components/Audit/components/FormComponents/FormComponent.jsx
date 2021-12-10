import React, { useState } from "react";
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

const FormComponents = () => {
  const [inputFieldList, setInputFieldList] = useState([
    {
      id: uuidv4(),
      sectionName: "",
      inputs: [
        {
          questionnaire_section: "",
          question: "",
          how_get_this_data: "",
          answer_option: "",
          field_type: "text",
          id: uuidv4(),
        },
      ],
    },
  ]);

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
      inputs: [
        {
          questionnaire_section: "",
          question: "",
          how_get_this_data: "",
          answer_option: "",
          field_type: "text",
        },
      ],
    });

    setInputFieldList(temp);
  };

  const deleteSection = (id) => {
    let temp = [...inputFieldList];
    let removeSection = temp.filter((item) => item.id !== id);

    setInputFieldList(removeSection);
  };

  const addNewRequirement = (Iindex) => {
    let temp = [...inputFieldList];

    temp[Iindex].inputs.push({
      questionnaire_section: "",
      question: "",
      how_get_this_data: "",
      answer_option: "",
      field_type: "text",
      id: uuidv4(),
    });

    setInputFieldList(temp);
  };

  const deleteRequirement = (index, id) => {
    let temp = [...inputFieldList];
    temp[index].inputs = temp[index].inputs.filter((item) => item.id !== id);

    setInputFieldList(temp);
  };

  const addCustomRequirement = (Iindex) => {
    let temp = [...inputFieldList];

    temp[Iindex].inputs.push({
      questionnaire_section: "",
      question: "",
      how_get_this_data: "",
      answer_option: "",
      field_type: "none",
      id: uuidv4(),
    });

    setInputFieldList(temp);
  };

  const addSectionName = async (event) => {
    let temp = [...inputFieldList];
    const { value, id } = event.target;
    temp[id].sectionName = value;
    setInputFieldList(temp);

    const payload = {
      audit_template_name: "testing Api12",
      questionnaire_section: temp[id].sectionName,
      duration_of_completion: 10,
      buffer_period: 3,
    };

    const addSectionResponse = await axiosInstance.post(
      `${BACKEND_BASE_URL}/audit.api.AddQuestionnaireSection`,
      payload
    );

    console.log(addSectionResponse);
  };

  return (
    <>
      <div className={styles.formComponetsContainer}>
        <div className={styles.formBuilderCompoents}>
          <Text heading="h2" text="Form Components" />
          <Text
            heading="span"
            text="Drag & drop items to create questionnaire"
            variant="grey"
          />
          <div className={styles.itemList}>
            <IconButton
              description="Add New Question"
              onDragStart={(event) => ondragstart(event, uuidv4())}
              draggable={true}
              variant="item"
              icon={<BsPlusCircleFill />}
              size="medium"
            />
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
            <div className={styles.formPreview}>
              <Button description="FORM PREVIEW" variant="preview" />
            </div>
            {inputFieldList.map((listItem, Iindex) => {
              return (
                <div key={listItem.id}>
                  <div className={styles.sectionName}>
                    <div>
                      <Input
                        type="text"
                        labelText="Section Name"
                        value={listItem.sectionName}
                        id={Iindex}
                        onChange={addSectionName}
                      />
                    </div>
                    <BsTrashFill onClick={() => deleteSection(listItem.id)} />
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
                            className={styles.inputBody}
                            onDragOver={(event) => ondragover(event)}
                            onDrop={(event) => drop(event, Iindex, index)}
                          >
                            {fieldName.field_type !== "none" && (
                              <>
                                <div className={styles.inputField}>
                                  <Input
                                    type="text"
                                    labelText="Requirement"
                                    variant="medium"
                                  />
                                </div>
                                <div className={styles.inputField}>
                                  {fieldName.field_type === "text" ? (
                                    <Input
                                      type="select"
                                      labelText="Data Type"
                                      variant="small"
                                      valueForDropDown={dataTypes}
                                    />
                                  ) : (
                                    <Input
                                      type="text"
                                      labelText="Data Type"
                                      variant="small"
                                      value={fieldName.field_type}
                                      disabled={true}
                                    />
                                  )}
                                </div>

                                {fieldName.field_type !== "text" &&
                                  fieldName.field_type !== "date" && (
                                    <div className={styles.inputField}>
                                      <Input
                                        type="text"
                                        labelText="value"
                                        variant="small"
                                      />
                                    </div>
                                  )}
                              </>
                            )}
                            {fieldName.field_type === "file" && (
                              <>
                                <div className={styles.inputField}>
                                  <Input
                                    type="text"
                                    labelText="Attachment Details"
                                  />
                                </div>
                                <div className={styles.inputField}>
                                  <Input
                                    type="select"
                                    labelText="Attachment Format"
                                    variant="small"
                                    valueForDropDown={fileTypes}
                                  />
                                </div>
                              </>
                            )}

                            {fieldName.field_type === "date" && (
                              <div>
                                <div className={styles.dateRange}>
                                  <Datepicker labelText="Date Range for Records" />
                                </div>
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
                </div>
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

      <div className={styles.saveTemplate}>
        <div>
          <Button
            description="SAVE TEMPLATE & QUIT"
            variant="preview"
            size="medium"
          />
        </div>
        <div>
          <Button description="NEXT" size="small" variant="default" />
        </div>
      </div>
    </>
  );
};

export default FormComponents;
