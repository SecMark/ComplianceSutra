import React, { useEffect, useState } from "react";
import Text from "../../../components/Text/Text";
import { Input } from "../../../components/Inputs/Input";
import Button from "../../../components/Buttons/Button";
import Datepicker from "../../../components/DatePicker/Datepicker";
import { BsTrashFill, BsPlusSquareFill } from "react-icons/bs";
import { fileTypes } from "../../../constants/DateTypes/fileType";
import styles from "./style.module.scss";
import Label from "../../../components/Labels/Label";
import axiosInstance from "../../../../../apiServices";
import { BACKEND_BASE_URL } from "../../../../../apiServices/baseurl";

import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { getQuestionList } from "../../../redux/actions";

const CheckList = () => {
  const dispatch = useDispatch();
  const [checkList, setCheckList] = useState([
    {
      id: uuidv4(),
      sectionName: "",
      completionDuration: "",
      bufferPeriod: "",
      isError: false,
      questionSectionId: "",
      questionnaireSection: "",
      checkListInput: [
        {
          areaForVerfication: "",
          documentReliedUpon: "",
          regulatoryRef: "",
          dateRange: "",
          id: uuidv4(),
        },
      ],
    },
  ]);

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = () => {
    const audit_template_name = { audit_template_name: "testing Api12" };
    dispatch(getQuestionList(audit_template_name));
  };

  const addNewSection = () => {
    let temp = [...checkList];
    temp.push({
      id: uuidv4(),
      sectionName: "",
      completionDuration: "",
      bufferPeriod: "",
      isError: false,
      questionSectionId: "",
      questionnaireSection: "",
      checkListInput: [
        {
          id: uuidv4(),
          sectionName: "",
          checkListInput: [
            {
              areaForVerfication: "",
              documentReliedUpon: "",
              regulatoryRef: "",
              dateRange: "",
              id: uuidv4(),
            },
          ],
        },
      ],
    });

    setCheckList(temp);
  };

  const deleteSection = (id) => {
    let temp = [...checkList];
    let removeSection = temp.filter((item) => item.id !== id);

    setCheckList(removeSection);
  };

  const addNewCheckList = (Iindex) => {
    let temp = [...checkList];

    temp[Iindex].checkListInput.push({
      areaForVerfication: "",
      documentReliedUpon: "",
      regulatoryRef: "",
      dateRange: "",
      id: uuidv4(),
    });

    setCheckList(temp);
  };

  const deleteCheck = (index, id) => {
    let temp = [...checkList];
    temp[index].inputs = temp[index].checkListInput.filter(
      (item) => item.id !== id
    );

    setCheckList(temp);
  };

  const addCheckListSectionName = async (event) => {
    let temp = [...checkList];
    const { value, id, name } = event.target;
    temp[id].isError = false;
    if (name === "sectionName") {
      temp[id].sectionName = value;
    } else if (name === "duration") {
      temp[id].completionDuration = value;
    } else if (name === "buffer") {
      temp[id].bufferPeriod = value;
    }

    setCheckList(temp);
  };

  const submitChecklistSection = async (event) => {
    let temp = [...checkList];
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
        audit_template_name: "testing Api12",
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
          setCheckList(temp);
        } else {
          temp[id].isError = true;
          setCheckList(temp);
        }
      }
    }
  };

  return (
    <>
      <div className={styles.heading}>
        <Text heading="h2" text="Checklist" variant="white" />
      </div>

      <div className={styles.checkListMainContainer}>
        <div className={styles.checkListContainer}>
          {checkList.map((checkItem, Iindex) => {
            return (
              <div className={styles.sectionContainer}>
                <div className={styles.sectionName}>
                  <div>
                    <Input
                      type="text"
                      labelText="Section Name"
                      name="section"
                      id={Iindex}
                      value={checkItem.duration}
                      onChange={addCheckListSectionName}
                      onBlur={submitChecklistSection}
                    />
                  </div>
                  <div>
                    <Input
                      type="number"
                      labelText="Duration"
                      value={checkItem.duration}
                      id={Iindex}
                      name="duration"
                      onChange={addCheckListSectionName}
                      onBlur={submitChecklistSection}
                      variant="small"
                    />
                  </div>
                  <div>
                    <Input
                      type="number"
                      labelText="Buffer Peroid"
                      value={checkItem.buffer}
                      id={Iindex}
                      name="buffer"
                      onChange={addCheckListSectionName}
                      onBlur={submitChecklistSection}
                      variant="small"
                    />
                  </div>
                  <div>
                    <BsTrashFill />
                  </div>
                </div>

                {checkItem.checkListInput.map((checkInputs, index) => {
                  return (
                    <div className={styles.checkListInputContainer}>
                      <div className={styles.checkListInputs}>
                        <div className={styles.inputField}>
                          <Input
                            type="text"
                            labelText="AREA FOR VERFICATION"
                            variant="medium"
                            labelVariant="labelSmall"
                          />
                        </div>

                        <div className={styles.inputField}>
                          <Input
                            type="text"
                            labelText="DOCUMENT RELIED UPON"
                            variant="small"
                            labelVariant="labelSmall"
                          />
                        </div>
                        <div className={styles.addFileButton}>
                          <div>
                            <Label text="REGULATORY REF." variant="small" />
                          </div>
                          <Button description="Add File" variant="preview" />
                        </div>

                        <div className={styles.inputField}>
                          <Input
                            type="select"
                            labelText="Attachment Format"
                            variant="small"
                            valueForDropDown={fileTypes}
                            labelVariant="labelSmall"
                          />
                        </div>
                        <div className={styles.inputField}>
                          <Datepicker
                            labelText="Date Range"
                            labelVariant="labelSmall"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className={styles.addNewCheckList}>
                  <BsPlusSquareFill onClick={() => addNewCheckList(Iindex)} />
                  <Text
                    heading="p"
                    text="NEW CHECKLIST"
                    size="small"
                    variant="primary"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.addNewCheckList}>
          <BsPlusSquareFill onClick={addNewSection} />
          <Text heading="p" text="NEW SECTION" size="small" variant="primary" />
        </div>
      </div>
    </>
  );
};

export default CheckList;
