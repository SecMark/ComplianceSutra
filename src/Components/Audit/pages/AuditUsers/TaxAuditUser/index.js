import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { ImSearch } from "react-icons/im";
import { useHistory } from "react-router";
import "devextreme/dist/css/dx.light.css";
import IconButton from "../../../components/Buttons/IconButton";
import Container from "../../../components/Containers";
import Text from "../../../components/Text/Text";
import styles from "./style.module.scss";
import Questionnaire from "./Questionnaire";
import Checkpoints from "./Checkpoints";
import { isMobile } from "react-device-detect";
const tabs = ["Questionnarie", "Checkpoints"];
const TaxAuditUser = () => {
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
    <Container variant="container">
      <Container variant="content">
        <div className={styles.header}>
          <div className="d-flex justify-content-between align-items-center">
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
                text="Amit Shah(Auditor)"
                className="mb-0 ml-3"
              />
            </div>
            <div className="TopSearch">
              <div className="SearchIcon">
                <ImSearch />
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                onChange={(e) => console.log(e)}
              />
            </div>
          </div>
          {tabs.map((tab, index) => (
            <div
              className={`${styles.tab} ${
                currentTab === tab && styles.tabActive
              }`}
              onClick={() => setCurrentTab(tab)}
              key={index}
            >
              {tab}
            </div>
          ))}
        </div>
        <div
          className="mt-1"
          style={{
            height: `calc(95vh - ${
              headerHeight + (isMobile ? 32 : 96) || 26
            }px)`,
            overflowY: "auto",
          }}
        >
          {currentTab === tabs[0] && <Questionnaire />}
          {currentTab === tabs[1] && <Checkpoints />}
        </div>
      </Container>
    </Container>
  );
};

export default TaxAuditUser;
