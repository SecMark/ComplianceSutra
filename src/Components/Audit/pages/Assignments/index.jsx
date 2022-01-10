import React, { useState } from "react";
import Status from "./Status";
import styles from "./style.module.scss";
import Text from "../../components/Text/Text";
import Container from "../../components/Containers";
import IconButton from "../../components/Buttons/IconButton";
import { useHistory, useRouteMatch } from "react-router";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import {
  MdAddBox,
  MdKeyboardArrowRight,
  // MdOutlineCheckCircle,
  MdPlayArrow,
} from "react-icons/md";
import { Toolbar, Item } from "devextreme-react/data-grid";

function Assignments() {
  const [options, setOptions] = useState("list");
  const selectOption = (option) => {
    setOptions(option);
  };
  const history = useHistory();
  const { path } = useRouteMatch();
  return (
    <div>
      <Container variant="content">
        <div className={styles.topHeading}>
          <Text
            heading="p"
            variant="stepperMainHeading"
            text="Audit Assignments"
          />
        </div>

        {/* <Toolbar>
            <Item location="after"> */}
        <div className={styles.createAssignments}>
          <IconButton
            description="Create Assignments"
            variant="createProject"
            icon={<MdAddBox />}
            onClick={() => history.push(`${path}/create-template`)}
          />
        </div>
        {/* </Item>
          </Toolbar> */}

        <div className="options-list">
          {/* <div
           onClick={() => selectOption("list")}
           className={options === "list" && styles.activation}
         >
           <div className={styles.backgroundColorName}>
             <div className={styles.name}>Names</div>
           </div>
         </div> */}
          <div
            onClick={() => selectOption("createBy")}
            className={options === "createBy" && styles.activations}
          >
            <div className={styles.backgroundCreatedBy}>
              <div className={styles.auditType}>Audit Type</div>
            </div>
          </div>
          <div
            onClick={() => selectOption("tasks")}
            className={options === "tasks" && "activation-3"}
          >
            <div className={styles.status}>Status</div>
          </div>
        </div>

        {options === "tasks" && <Status />}
        {/* {options === "createBy" && <AuditCreatedBy />} */}
        {/* {options === "tasks" && <AuditBy/>} */}
      </Container>
    </div>
  );
}

export default Assignments;
