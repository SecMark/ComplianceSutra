import { React, useState } from "react";
import styles from "./style.module.scss";
import Text from "../../components/Text/Text";
import { AiOutlineSearch } from "react-icons/ai";
import { AiFillPlusSquare } from "react-icons/ai";
import IconButton from "../../components/Buttons/IconButton";
import { Input } from "../../components/Inputs/Input";
import AuditTemplateList from "./AuditTemplateList";

function AuditTemplates() {
  const [options, setOptions] = useState("list");
  const selectOption = (option) => {
    setOptions(option);
  };

  return (
    <div className={styles.container}>
      <Text heading="h1" text="Audit Templates" variant="templateMainHeading" />
      <div className={styles.box}>
        <div className={styles.inputForSearchTemplate}>
          <Input placeholder="Search for Task" variant="inputForSearchTask" />
        </div>
        <div className={styles.searchIcon}>
          <IconButton
            icon={<AiOutlineSearch />}
            variant="auditTemplateSearchIconButton"
          />
        </div>
      </div>
      <div className={styles.horizontalLine}>
        <div className={styles.horizontalDarkLine}></div>
      </div>
      <div className={styles.createTemplate}>
        <IconButton
          icon={<AiFillPlusSquare />}
          variant="auditTemplatePlusIconButton"
        />
      </div>
      <Text
        heading="h6"
        text="Create New Templates"
        variant="createNewTemplate"
      />
      <Text heading="h6" text="Sort By" variant="sortBy" />

      {/* <div className={styles.backgroundColorName}>
                    <Text heading="h6" text="Names" variant="name" />
                </div> */}
      {/* <Text heading="h6" text="Created By" variant="createdBy" />
                <Text heading="h6" text="Audit Type" variant="auditType" />  */}

      <div>
        <div className="options-list">
          <div
            onClick={() => selectOption("list")}
            className={options === "list" && styles.activation}
          >
            <div className={styles.backgroundColorName}>
              <div className={styles.name}>Names</div>
            </div>
          </div>
          <div
            onClick={() => selectOption("createBy")}
            className={options === "createBy" && styles.activations}
          >
            <div className={styles.backgroundCreatedBy}>
              <div className={styles.createdBy}>Created By</div>
            </div>
          </div>
          <div
            onClick={() => selectOption("tasks")}
            className={options === "tasks" && "activation-3"}
          >
            <div className={styles.auditType}>Audit Type</div>
          </div>
        </div>

        {options === "list" && <AuditTemplateList />}
        {/* {options === "createBy" && <AuditCreatedBy />} */}
        {/* {options === "tasks" && <AuditBy/>} */}
      </div>
    </div>
  );
}

export default AuditTemplates;
