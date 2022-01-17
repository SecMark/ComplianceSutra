import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import Text from "../../components/Text/Text";
import { Input } from "../../components/Inputs/Input";
import Button from "../../components/Buttons/Button";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import IconButton from "../../components/Buttons/IconButton";
import axiosInstance from "../../../../apiServices";
import PreviewAllocation from "./PreviewAllocation/PreviewAllocation";
const QuestionnaireForm = () => {
  const [data, setData] = useState([]);
  const [open,setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    getSectionAndQuestion();
  }, []);

  console.log("data", data);
  const getSectionAndQuestion = () => {
    try {
      axiosInstance
        .get("audit.api.getQuestionFromAudit", {
          params: {
            audit_template_name: "template checking",
          },
        })
        .then((res) => {
          if (res?.data?.message?.question_list) {
            let sections = [...res?.data?.message?.question_list].map(
              (item) => item.questionnaire_section
            );
            sections = [...new Set([...sections])];
            let requiredData = [...sections].map((element) => {
              console.log(element);
              let temp = [];
              res?.data?.message?.question_list.forEach((item) => {
                if (item.questionnaire_section === element) {
                  temp.push({ ...item, assignTo: "", deadlineDay: "" });
                }
              });
              return {
                section: element,
                questions: temp,
                expand: false,
                assignTo:""
              };
            });
            setData(requiredData);
          }
        });
    } catch (err) {}
  };

  const expandFunction = (index) => {
    console.log("check index", index);
    let temp = [...data];
    temp[index].expand = !temp[index].expand;
    setData([...temp]);
  };

  const superDropDownAssignTo = (event) => {
    let temp = [...data];
    temp.map((item)=>{
      item.assignTo= event.target.value
      item.questions.map((item)=>{
        item.assignTo = event.target.value
      })
    })
    setData([...temp]);
  };

  const subDropDownDeadline = (event, sectionIndex, dataIndex) => {
    let temp = [...data];
    temp[sectionIndex].questions[dataIndex].deadlineDay = event.target.value;
    setData([...temp]);
  };

  const subDropDownAssignTo = (event, sectionIndex, dataIndex) =>{
    let temp = [...data];
    temp[sectionIndex].questions[dataIndex].assignTo = event.target.value;
    setData([...temp]);
  }

  const dropDownAssignTo = (event, sectionIndex) =>{
    let temp = [...data];
    temp[sectionIndex].questions?.map((item, i) => {
      item.assignTo = event.target.value;
    });
    setData(temp);
  }

  const dropDownChangeDeadline = (event, sectionIndex) => {
    let temp = [...data];
    temp[sectionIndex].questions?.map((item, i) => {
      item.deadlineDay = event.target.value;
    });
    setData(temp);
  };

  const onDataSubmit = ()=>{
    const formData = new FormData();
    let temp = [...data];
    let arr = []
    temp?.map((item)=>{
      item.questions.map((item)=>{
          arr.push({
            questionnaire_section: item.questionnaire_section || "",
            question_questionnaire:item.question || "",
            assigned_to:item.assignTo || "",
            deadline_start_from:item.deadlineDay || "" 
          })
      })
    })
    formData.append("question_assignment", arr.length>0&&JSON.stringify(arr));
    formData.append("assignment_id","ASS0069")

    try{
      axiosInstance.post("audit.api.AssignQuestionnaire",formData)
      .then((res)=>{
        console.log("submiting data",res);
      })
    }catch(err){

    }
  }
  return (
    <div className={styles.questionnaireForm}>
     
      <div className={styles.questionnaireFormHeader}>
        <Text
          heading="p"
          text="Questionnaire Form"
          variant="stepperSubHeading"
        />
        <div className={styles.questionnaireFormHeaderOptions}>
          <div className={styles.inputGroupRowReverse}>
            <Input
              type="select"
              variant="auditAssignmentInputWhite"
              placeholder="Select"
              onChange={(e)=>superDropDownAssignTo(e)}
              valueForDropDown={[
                { label: "amit", value: "amit" },
                { label: "raj", value: "raj" },
                { label: "ram", value: "ram" },
              ]}
            />
          </div>
          <Button 
           description="preveiw allocation"
           variant="preview"
           onClick={()=>handleOpen()}
           />
        </div>
      </div>
       <PreviewAllocation open={open} setOpen={setOpen} handleClose={handleClose} data={data}/>
      <div className={styles.questionnaireFormMain}>
        <table className={styles.questionnaireFormTable}>
          <thead>
            <th>
              <Text
                heading="p"
                text="section name"
                variant="smallTableHeading"
              />
            </th>
            <th>
              <Text
                heading="p"
                text="Deadline Starts from"
                variant="smallTableHeading"
              />
            </th>
            <th>
              <Text heading="p" text="Assign to" variant="smallTableHeading" />
            </th>
          </thead>

          {/* General Details */}
          {data?.map((item, index) => {
            return (
              <tbody key={index}>
                <tr>
                  <td className={styles.questionnaireFormSectionName}>
                    <Text
                      heading="p"
                      text={item.section}
                      variant="stepperSubHeadingBold"
                    />
                    <IconButton
                      variant="iconButtonRound"
                      icon={item.expand ? <MdExpandMore /> : <MdExpandLess />}
                      size="none"
                      onClick={() => expandFunction(index)}
                    />
                  </td>
                  <td className={styles.questionnaireFormDeadline}>
                    <Input
                      type="select"
                      variant="auditAssignmentInputWhite"
                      placeholder="Select"
                      valueForDropDown={[
                        { label: "7 days", value: "7 days" },
                        { label: "14 days", value: "14 days" },
                        { label: "21 days", value: "21 days" },
                      ]}
                      onChange={(e) => dropDownChangeDeadline(e, index)}
                    />
                  </td>

                  <td className={styles.questionnaireFormAssignTo}>
                    <Input
                      type="select"
                      variant="auditAssignmentInputWhite"
                      placeholder="Select"
                      value={item.assignTo}
                      onChange={(e)=>dropDownAssignTo(e, index)}
                      valueForDropDown={[
                        { label: "amit", value: "amit" },
                        { label: "raj", value: "raj" },
                        { label: "ram", value: "ram" },
                      ]}
                    />
                  </td>
                </tr>

                <tr>
                  <td></td>
                  <td colSpan="2">
                    <table className={styles.questionnaireFormTable}>
                      {item.expand && (
                        <div>
                          <thead>
                            <th>
                              <Text
                                heading="p"
                                text="checkpoint"
                                variant="smallTableHeading"
                              />
                            </th>
                            <th>
                              <Text
                                heading="p"
                                text="Deadline Starts from"
                                variant="smallTableHeading"
                              />
                            </th>
                            <th>
                              <Text
                                heading="p"
                                text="Assign to"
                                variant="smallTableHeading"
                              />
                            </th>
                          </thead>
                          {item.questions.map((item, i) => {
                            return (
                              <tbody>
                                <tr>
                                  <td
                                    className={
                                      styles.questionnaireFormSectionName
                                    }
                                  >
                                    <Text
                                      heading="p"
                                      text={item.question}
                                      variant="stepperSubHeadingBold"
                                    />
                                  </td>
                                  <td
                                    className={styles.questionnaireFormDeadline}
                                  >
                                    <Input
                                      type="select"
                                      variant="auditAssignmentInputWhite"
                                      placeholder="Select"
                                      value={item.deadlineDay}
                                      onChange={(e) =>
                                        subDropDownDeadline(e, index, i)
                                      }
                                      valueForDropDown={[
                                        { label: "7 days", value: "7 days" },
                                        { label: "14 days", value: "14 days" },
                                        { label: "21 days", value: "21 days" },
                                      ]}
                                    />
                                  </td>
                                  <td
                                    className={styles.questionnaireFormAssignTo}
                                  >
                                    <Input
                                      type="select"
                                      variant="auditAssignmentInputWhite"
                                      placeholder="Select"
                                      value={item.assignTo}
                                      onChange={(e)=>subDropDownAssignTo(e, index, i)}
                                      valueForDropDown={[
                                        { label: "amit", value: "amit" },
                                        { label: "raj", value: "raj" },
                                        { label: "ram", value: "ram" },
                                      ]}
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            );
                          })}
                        </div>
                      )}
                    </table>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
        <button onClick={()=>onDataSubmit()}>Submit</button>
      </div>
    </div>
  );
};

export default QuestionnaireForm;
