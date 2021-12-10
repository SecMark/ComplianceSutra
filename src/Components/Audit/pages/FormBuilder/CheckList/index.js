import React, { useState } from "react";
import Text from "../../../components/Text/Text";
import { Input } from "../../../components/Inputs/Input";
import Button from "../../../components/Buttons/Button";
import Datepicker from "../../../components/DatePicker/Datepicker";
import { BsTrashFill, BsPlusSquareFill } from "react-icons/bs";
import { fileTypes } from "../../../constants/DateTypes/fileType";
import styles from "./style.module.scss";
import Label from "../../../components/Labels/Label";

import { v4 as uuidv4 } from "uuid";

const CheckList = () => {
  const [checkList, setCheckList] = useState([
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
  ]);

  const addNewSection = () => {
    let temp = [...checkList];
    temp.push({
      id: uuidv4(),
      sectionName: "",
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

  return (
    <>
      <div className={styles.heading}>
        <Text heading="h2" text="Checklist" variant="white" />
      </div>

      <div className={styles.checkListMainContainer}>
        <div className={styles.checkListContainer}>
          {checkList.map((checkItem, Iindex) => {
            return (
              <>
                <div className={styles.sectionName}>
                  <div>
                    <Input
                      type="text"
                      placeholder="Section Name"
                      variant="outline"
                    />
                  </div>
                  <BsTrashFill />
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
                <div className={styles.addNewContainer}>
                  <div
                    className={styles.addNew}
                    onClick={() => addNewCheckList(Iindex)}
                  >
                    <Text
                      heading="span"
                      text="ADD NEW CHECKPOINT"
                      variant="primary"
                      size="small"
                    />
                  </div>
                </div>
              </>
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
