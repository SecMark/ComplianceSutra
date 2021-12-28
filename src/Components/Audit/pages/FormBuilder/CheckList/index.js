import React, { useEffect, useRef, useState } from "react";
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
import Searchable from "react-searchable-dropdown";

import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionList } from "../../../redux/actions";
import { toast } from "react-toastify";
import { severity } from "../../../constants/DateTypes/severity";
import { Upload } from "antd";
import { useHistory } from "react-router";

const CheckList = ({ next, stepper }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const inputFile = useRef(null);
  const history = useHistory();

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
          consequenceOfNonCompliance: "",
          severity: "",
          regulatoryDescription: "",
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

  const [listOfQuestion, setListOfQuestion] = useState([]);

  useEffect(() => {
    getQuestions();
  }, []);

  useEffect(() => {
    console.log(state.AuditReducer);
    if (
      state.AuditReducer?.questionList &&
      state.AuditReducer?.questionList.length > 0
    ) {
      const list = state.AuditReducer?.questionList.map((values) => {
        return { label: values.question, value: values.question };
      });
      setListOfQuestion(list);
    }
  }, [state.AuditReducer?.questionList]);

  const getQuestions = () => {
    const templateName = state.AuditReducer.templateName;
    const audit_template_name = { audit_template_name: templateName };
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
          id: uuidv4() + 1,
          sectionName: "",
          checkListInput: [
            {
              areaForVerfication: "",
              documentReliedUpon: "",
              regulatoryRef: "",
              consequenceOfNonCompliance: "",
              severity: "",
              regulatoryDescription: "",
              id: uuidv4() + 2,
            },
          ],
        },
      ],
    });

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
        audit_template_name: state.AuditReducer.templateName,
        checklist_section: temp[id].sectionName,
        duration_of_completion: parseInt(temp[id].completionDuration),
        buffer_period: parseInt(temp[id].bufferPeriod),
      };
      let addSectionResponse = "";

      if (temp[id].questionSectionId === "") {
        addSectionResponse = await axiosInstance.post(
          `${BACKEND_BASE_URL}audit.api.AddCheckListSection`,
          payload
        );
      } else {
        payload.question_section_id = temp[id].questionSectionId
          ? temp[id].questionSectionId
          : "";

        addSectionResponse = await axiosInstance.post(
          `${BACKEND_BASE_URL}audit.api.UpdateCheckListSection`,
          payload
        );
      }

      if (addSectionResponse) {
        const { message } = addSectionResponse.data;
        if (message.status) {
          temp[id].questionSectionId = message?.checklist_section_id;
          temp[id].isError = false;
          setCheckList(temp);
        } else {
          temp[id].isError = true;
          setCheckList(temp);
        }
      }
    }
  };

  const addNewCheckList = async (Iindex) => {
    let temp = [...checkList];
    let inputLength = temp[Iindex].checkListInput.length - 1;
    let previousQuestion = temp[Iindex].checkListInput[inputLength];
    let section = temp[Iindex];

    if (
      section.sectionName === "" ||
      section.bufferPeriod === "" ||
      section.completionDuration === ""
    ) {
      toast.error("Please enter section name, Buffer time and Duration.");
    } else if (previousQuestion?.areaForVerfication === "") {
      temp[Iindex].checkListInput[inputLength].error = {
        isError: true,
        type: "areaForVerfication",
        message: "Area for verfication is required",
      };
      toast.error("Area of verfication is required");
      setCheckList(temp);
    } else {
      const addQuestion = await submitRequirement(section, previousQuestion);
      if (addQuestion) {
        temp[Iindex].checkListInput.push({
          areaForVerfication: "",
          documentReliedUpon: "",
          regulatoryRef: "",
          consequenceOfNonCompliance: "",
          severity: "",
          regulatoryDescription: "",
          id: uuidv4(),
          error: {
            isError: false,
            type: "",
            message: "",
          },
        });
        setCheckList(temp);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const createRequirement = async (event) => {
    let temp = [...checkList];

    const { name, value, id } = event.target;
    const splitId = id.split(",");

    if (name === "regulatoryRef") {
      temp[splitId[1]].checkListInput[splitId[0]].regulatoryRef =
        event.target.files[0];
    } else {
      temp[splitId[1]].checkListInput[splitId[0]][name] = value;
    }

    setCheckList(temp);
  };

  const onSelect = (index, Iindex, value) => {
    let temp = [...checkList];
    temp[index].checkListInput[Iindex].documentReliedUpon = value.map(
      (item) => {
        return {
          question_questionnaire: item,
        };
      }
    );
    console.log(temp);
    setCheckList(temp);
  };

  const onButtonClick = () => {
    inputFile.current.click();
  };

  const submitRequirement = async (section, question) => {
    const {
      areaForVerfication,
      documentReliedUpon,
      regulatoryRef,
      consequenceOfNonCompliance,
      severity,
      regulatoryDescription,
    } = question;

    const { questionSectionId } = section;

    let formData = new FormData();
    formData.append("checklist_section_id", questionSectionId);
    formData.append("check_point", areaForVerfication);
    formData.append(
      "documents_relied_upon",
      documentReliedUpon ? JSON.stringify(documentReliedUpon) : ""
    );

    formData.append(
      "regulatory_references",
      regulatoryRef ? regulatoryRef : ""
    );
    formData.append(
      "regulatory_description",
      regulatoryDescription ? regulatoryDescription : ""
    );
    formData.append(
      "consequence_of_non_compliance",
      consequenceOfNonCompliance ? consequenceOfNonCompliance : ""
    );
    formData.append("severity", severity ? severity : "High");

    const addSectionResponse = await axiosInstance.post(
      `${BACKEND_BASE_URL}audit.api.AddChecklist`,
      formData
    );
    if (addSectionResponse) {
      return true;
    } else {
      return false;
    }
  };

  const onNextClick = async (type) => {
    let temp = [...checkList];

    temp.map(async (sectionData, index) => {
      let inputsLength = sectionData?.checkListInput.length;
      if (sectionData?.checkListInput?.length > 0) {
        let previousQuestion = sectionData?.checkListInput[inputsLength - 1];

        if (
          sectionData.sectionName === "" ||
          sectionData.bufferPeriod === "" ||
          sectionData.completionDuration === ""
        ) {
          toast.error("Please enter section name, Buffer time and Duration.");
        } else if (previousQuestion?.areaForVerfication === "") {
          console.log("template",temp[index].checkListInput[inputsLength-1]);
          
          temp[index].checkListInput[inputsLength-1].error = {
            isError: true,
            type: "areaForVerfication",
            message: "Area for verfication is required",
          };
          toast.error("Area of verfication is required");
          setCheckList(temp);
        }else if(previousQuestion?.documentReliedUpon === ""){
          temp[index].checkListInput[inputsLength-1].error={
            isError:true,
            type:"documentReliedUpon",
            message: "document relied upon is required"
          }
          setCheckList(temp);
        } 
        else {
          const addQuestion = await submitRequirement(
            sectionData,
            previousQuestion
          );
          if (addQuestion) {
            if (type === "next") {
              next(stepper?.stepperAcitveSlide);
            } else {
              history.push("/audit");
            }
          } else {
            toast.error("Something went wrong");
          }
        }
      }
    });
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
                      name="sectionName"
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
                      <div className={`${styles.checkListInputs} row`}>
                        <div className={`${styles.inputField} col-md-6`}>
                          <Input
                            type="text"
                            labelText="AREA FOR VERFICATION"
                            variant="medium"
                            labelVariant="labelSmall"
                            name="areaForVerfication"
                            onChange={createRequirement}
                            id={`${index},${Iindex}`}
                            value={checkInputs.areaForVerfication}
                          />
                          {checkInputs.error?.isError &&
                            checkInputs.error?.type ===
                              "areaForVerfication" && (
                              <Text
                                heading="span"
                                text={checkInputs.error.message}
                                variant="error"
                              />
                            )}
                        </div>
                        <div className={`${styles.inputField} col-md-6`}>
                          <Label text="DOCUMENT RELIED UPON" variant="small" />
                          <Searchable
                            notFoundText="No result found"
                            listMaxHeight={200}
                            id={`${index},${Iindex}`}
                            options={listOfQuestion}
                            onSelect={(value) => {
                              onSelect(index, Iindex, value);
                            }}
                            multiple={true}
                          />
                          {/* <Input
                            type="select"
                            labelText="DOCUMENT RELIED UPON"
                            variant="medium"
                            labelVariant="labelSmall"
                            valueForDropDown={listOfQuestion}
                            placeholder="Select Question"
                            name="documentReliedUpon"
                            onChange={createRequirement}
                            id={`${index},${Iindex}`}
                          /> */}
                          {checkInputs.error?.isError &&
                            checkInputs.error?.type ===
                              "documentReliedUpon" && (
                              <Text
                                heading="span"
                                text={checkInputs.error.message}
                                variant="error"
                              />
                            )}
                        </div>

                        <div className={`${styles.inputField} col-md-6`}>
                          <Input
                            type="textarea"
                            labelText="Regulatory Description"
                            variant="medium"
                            labelVariant="labelSmall"
                            name="regulatoryDescription"
                            onChange={createRequirement}
                            id={`${index},${Iindex}`}
                          />
                        </div>

                        <div className={`${styles.inputField} col-md-6`}>
                          <Input
                            type="select"
                            labelText="Severity"
                            placeholder="Select Severity"
                            variant="medium"
                            valueForDropDown={severity}
                            labelVariant="labelSmall"
                            name="severity"
                            onChange={createRequirement}
                            id={`${index},${Iindex}`}
                          />
                        </div>

                        <div className={`${styles.inputField} col-md-6`}>
                          <Input
                            type="text"
                            labelText="Consequence of non compliance"
                            variant="medium"
                            labelVariant="labelSmall"
                            name="consequenceOfNonCompliance"
                            onChange={createRequirement}
                            id={`${index},${Iindex}`}
                          />
                        </div>

                        <div className={`${styles.addFileButton} col-md-6`}>
                          <div>
                            <Label text="REGULATORY REF." variant="small" />
                          </div>
                          {checkInputs.regulatoryRef === "" ? (
                            <Button
                              description="Add File"
                              variant="preview"
                              onClick={onButtonClick}
                            ></Button>
                          ) : (
                            <Text
                              heading="span"
                              variant="small"
                              text={checkInputs?.regulatoryRef?.name}
                              style={{ marginTop: "15px" }}
                            />
                          )}

                          <input
                            type="file"
                            id="file"
                            ref={inputFile}
                            name="regulatoryRef"
                            onChange={createRequirement}
                            id={`${index},${Iindex}`}
                            style={{ display: "none" }}
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
      <div className={styles.saveTemplate}>
        <div>
          <Button
            description="SAVE TEMPLATE & QUIT"
            variant="preview"
            size="medium"
            onClick={() => {
              onNextClick("exist");
            }}
          />
        </div>
        <div>
          <Button
            description="NEXT"
            size="small"
            variant="default"
            onClick={() => {
              onNextClick("next");
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CheckList;
