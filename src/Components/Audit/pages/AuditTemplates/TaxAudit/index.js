import React, { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useHistory } from "react-router";
import "devextreme/dist/css/dx.light.css";
import { Template } from "devextreme-react/core/template";
import {
  TreeList,
  SearchPanel,
  Column,
  HeaderFilter,
  Button,
} from "devextreme-react/tree-list";
import IconButton from "../../../components/Buttons/IconButton";
import Container from "../../../components/Containers";
import Text from "../../../components/Text/Text";
import styles from "./style.module.scss";
const tabs = ["questionnarie", "checkpoints"];
const TaxAudit = () => {
  const history = useHistory();
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const expandedKeys = [1];

  const customDataCell = (option) => {
    const { value } = option;
    return (
      <span title={value} className={styles.customDataCell}>
        {value}
      </span>
    );
  };

  const customHeaderCell = (data) => {
    const { caption, name } = data?.column;
    return <span className={styles.customHeaderCell}>{caption || name}</span>;
  };

  //   const customTextDiv = () => {
  //     return "123";
  //   };
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
        <div className="mt-4">
          <TreeList
            showColumnLines={false}
            id="treeList"
            keyExpr="id"
            parentIdExpr="parent_id"
            dataSource={data}
            autoExpandAll={true}
            defaultExpandedRowKeys={expandedKeys}
            showRowLines={true}
          >
            <SearchPanel visible={true} width={250} />
            <HeaderFilter visible={true} />
            <Column
              dataField="section_name"
              caption="Section Name"
              cellRender={customDataCell}
              headerCellRender={customHeaderCell}
            />
            <Column
              dataField="start_date"
              caption="Start Date"
              cellRender={customDataCell}
              headerCellRender={customHeaderCell}
            />
            <Column
              dataField="deadline"
              cellRender={customDataCell}
              headerCellRender={customHeaderCell}
            />
            <Column
              dataField="questions"
              cellRender={customDataCell}
              headerCellRender={customHeaderCell}
            />
            <Column
              dataField="total_checkpoints"
              caption="Total Checkpoints"
              cellRender={customDataCell}
              headerCellRender={customHeaderCell}
            />
          </TreeList>
        </div>
      </Container>
    </Container>
  );
};

const data = [
  {
    id: 1,
    section_name: "General Details",
    start_date: "21 Oct, 2021",
    deadline: "21 Oct, 2021",
    questions: "10",
    total_checkpoints: "10",
    parent_id: 0,
  },
  {
    id: 2,
    section_name: "Invoice Details",
    start_date: "21 Oct, 2021",
    deadline: "21 Oct, 2021",
    questions: "5",
    total_checkpoints: "9",
    parent_id: 0,
  },
  {
    id: 3,
    section_name: "Revenue Details",
    start_date: "21 Oct, 2021",
    deadline: "21 Oct, 2021",
    questions: "10",
    total_checkpoints: "20",
    parent_id: 1,
  },
  {
    id: 4,
    section_name: "Revenue Details",
    start_date: "21 Oct, 2021",
    deadline: "21 Oct, 2021",
    questions: "10",
    total_checkpoints: "20",
    parent_id: 1,
  },
];

export default TaxAudit;
