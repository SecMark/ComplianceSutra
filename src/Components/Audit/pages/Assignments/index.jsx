import React, { useState } from "react";
import Status from "./Status";
import styles from "./style.module.scss";
import Text from "../../components/Text/Text";
import Container from "../../components/Containers";
import IconButton from "../../components/Buttons/IconButton";
import { useHistory, useRouteMatch } from "react-router";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import { MdAddBox } from "react-icons/md";
import { DataGrid, Export, Toolbar, Item } from "devextreme-react/data-grid";

function Assignments() {
  const [options, setOptions] = useState("status");
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
            text="Audit Templates"
          />
          {/* <div className={styles.inputForSearchTemplate}>
            <Input
              placeholder="Search"
              variant="inputForSearchAssignment"
            />
          </div>
          <div className={styles.searchIcon}>
            <IconButton
              icon={<AiOutlineSearch />}
              variant="auditAssignmentIconButton"
            />
          </div>*/}
        </div>
        {/* <Toolbar>
            <Item location="after"> */}
        <div className={styles.createAssignments}>
          <IconButton
            description="New Template"
            variant="createProject"
            icon={<MdAddBox />}
            onClick={() => history.push(`${path}/create-template`)}
          />
        </div>
        <div className={styles.sortby}>
          <Text text="Sort By" heading="p"  variant="sortText"/>
        </div>
        <div className="options-list">
          <div
            onClick={() => selectOption("status")}
            className={options === "status" && styles.activations}
          >
            <div className={styles.backgroundStatus}>
              <div className={styles.status}>Names</div>
            </div>
          </div>
          <div
            onClick={() => selectOption("auditType")}
            className={options === "auditType" && styles.activation}
          >
            <div className={styles.backgroundAuditType}>
              <div className={styles.auditType}>Audit By</div>
            </div>
          </div>
          <div
            onClick={() => selectOption("location")}
            className={options === "location" && styles.activationFirst}
          >
            <div className={styles.backgroundLocation}>
              <div className={styles.location}>Created By</div>
            </div>
          </div>
          {/* <div
            onClick={() => selectOption("auditor")}
            className={options === "auditor" && styles.activationSecond}
          >
            <div className={styles.backgroundAuditor}>
              <div className={styles.auditor}>Auditor</div>
            </div>
          </div>
          <div
            onClick={() => selectOption("companies")}
            className={options === "companies" && styles.activationThird}
          >
            <div className={styles.backgroundCompanies}>
              <div className={styles.companies}>Companies</div>
            </div>
          </div> */}
        </div>

        {options === "status" && <Status />}
      </Container>
    </div>
  );
}

export default Assignments;
