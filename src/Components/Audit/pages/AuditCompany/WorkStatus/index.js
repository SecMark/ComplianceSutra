import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import Text from "../../../components/Text/Text";
import IconButton from "../../../components/Buttons/IconButton";
import { MdKeyboardArrowLeft } from "react-icons/md";
import {RiEdit2Fill} from "react-icons/ri"
import { useHistory, useRouteMatch } from "react-router";

import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";

import Container from "../../../components/Containers";


function AuditCompanyWorkStatus() {
  
  const tabs = ["Current Work", "Completed Work"];
  
  const history = useHistory();
  const { path } = useRouteMatch();
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  return (
      <Container variant="container">
          <Container variant="content">
          <div className={styles.header}>
          <div className="d-flex mb-3">
            <IconButton
              onClick={() => {
                history.goBack();
              }}
              variant="iconButtonRound"
              description={<MdKeyboardArrowLeft />}
              size="none"
            />
            <Text
              heading="p"
              variant="stepperMainHeading"
              text="Tax Audit"
              className="mb-0 ml-3"
            />
          </div>
          {tabs.map((tab) => (
            <div
              className={`${styles.tab} ${
                currentTab === tab && styles.tabActive
              }`}
              onClick={() => setCurrentTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
          </Container>
    <Container variant="content">
      
    </Container>
    </Container>
  );
}



export default AuditCompanyWorkStatus;
