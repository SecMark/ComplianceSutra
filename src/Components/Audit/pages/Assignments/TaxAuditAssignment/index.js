import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useHistory } from "react-router";
import "devextreme/dist/css/dx.light.css";

import IconButton from "../../../components/Buttons/IconButton";
import Container from "../../../components/Containers";
import Text from "../../../components/Text/Text";
import styles from "./style.module.scss";
import Questionare from "./Questionare";
import Checkpoint from "./Checkpoint";
import { isMobile } from "react-device-detect";
const tabs = ["questionnarie", "checklist"];

function TaxAuditAssignment() {
  const history = useHistory();
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [headerHeight, setHeaderHight] = useState(0);
  useEffect(() => {
    const headerRef = document
      ?.querySelector("." + styles.header)
      ?.getClientRects()[0]?.height;
    setHeaderHight(Math.trunc(headerRef));
  }, [currentTab]);
  return (
    // <Container variant="container">
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
      <div
        className="mt-3 pr-2"
        style={{
          height: `calc(95vh - ${headerHeight + (isMobile ? 32 : 96) || 26}px)`,
          overflow: "auto",
        }}
      >
        {currentTab === tabs[0] && <Questionare />}
        {currentTab === tabs[1] && <Checkpoint />}
      </div>
    </Container>
    // </Container>
  );
}

export default TaxAuditAssignment;
