import {
  DataGrid,
  Column,
  MasterDetail,
  SearchPanel,
} from "devextreme-react/data-grid";
import React, { useState } from "react";
import { MdAdd, MdExpandLess, MdExpandMore, MdTextsms } from "react-icons/md";
import IconButton from "../../../components/Buttons/IconButton";
import { Input } from "../../../components/Inputs/Input";
import styles from "./style.module.scss";
const Checkpoints = () => {
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
  const DropdownDetails = (data) => {
    return (
      <div className={styles.masterDetailsContainer}>
        <div className={styles.checkpointsDataContainer}>
          <div className={styles.checkpointsHeaderRow}>
            <div className={`${styles.w30}`}>
              <p className={styles.checkpointsHeadingText}>Questions</p>
            </div>
            <div className={`${styles.w20}`}>
              <p className={styles.checkpointsHeadingText}>File Type</p>
            </div>
            <div className={`${styles.w15}`}>
              <p className={styles.checkpointsHeadingText}>Checkpoints</p>
            </div>
            <div className={`${styles.w15}`}>
              <p className={styles.checkpointsHeadingText}>Referance</p>
            </div>
          </div>
          <div className={styles.checkpointsMainContainer}>
            <CheckpointsDataRow />
            <CheckpointsDataRow />
            <CheckpointsDataRow />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <DataGrid
        id="dataGrid"
        dataSource={data}
        columnAutoWidth={true}
        allowColumnReordering={true}
        paging={{ pageSize: 6 }}
        showColumnLines={false}
        showBorders={false}
        showRowLines={false}
        wordWrapEnabled={true}
        width="100%"
        scrolling={{
          columnRenderingMode: "standard",
          mode: "standard",
          preloadEnabled: false,
          renderAsync: undefined,
          rowRenderingMode: "virtual",
          scrollByContent: true,
          scrollByThumb: false,
          showScrollbar: "onHover",
          useNative: "auto",
        }}
      >
        <SearchPanel visible={true} width={250} />
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
          caption="Questionnaries"
          cellRender={customDataCell}
          headerCellRender={customHeaderCell}
        />
        <Column
          dataField="total_checkpoints"
          caption="Total Checkpoints"
          cellRender={customDataCell}
          headerCellRender={customHeaderCell}
        />
        <MasterDetail enabled={true} component={DropdownDetails} />
      </DataGrid>
    </div>
  );
};

export default Checkpoints;
const data = [
  {
    id: 1,
    section_name: "General Details",
    start_date: "21 Oct, 2021",
    deadline: "21 Oct, 2021",
    questions: "10",
    total_checkpoints: "10",
  },
  {
    id: 2,
    section_name: "Invoice Details",
    start_date: "21 Oct, 2021",
    deadline: "21 Oct, 2021",
    questions: "5",
    total_checkpoints: "9",
  },
  {
    id: 3,
    section_name: "Revenue Details",
    start_date: "21 Oct, 2021",
    deadline: "21 Oct, 2021",
    questions: "10",
    total_checkpoints: "20",
  },
  {
    id: 4,
    section_name: "Revenue Details",
    start_date: "21 Oct, 2021",
    deadline: "21 Oct, 2021",
    questions: "10",
    total_checkpoints: "20",
  },
];

const CheckpointsDataRow = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      <div className={styles.checkpointsDataRow}>
        <div className={`${styles.w30}`}>
          <p
            className={`${styles.checkpointsDataText} ${styles.checkpointsDataTextPrimary}`}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry ?
          </p>
        </div>
        <div className={`${styles.w20}`}></div>
        <div className={`${styles.w15}`}>
          <p
            className={`${styles.checkpointsDataText} ${styles.checkpointsDataTextPrimary}`}
          >
            3 Checks
          </p>
        </div>
        <div className={`${styles.w15}`}></div>
        <div
          className={`${styles.w20} d-flex align-items-center justify-content-end`}
        >
          <IconButton
            variant="iconButtonRound"
            className={isExpanded ? styles.dropdownExpanded : ""}
            description={<MdExpandMore />}
            onClick={() => setIsExpanded(!isExpanded)}
          />
        </div>
      </div>
      {/* {isExpanded && ( */}
      <div
        className={`${styles.dataRowDropdownContainer} ${
          !isExpanded && styles.closed
        }`}
      >
        <div
          className={`${styles.dataDropdownRow} ${styles.checkpointsDataRow}`}
        >
          <div className={`${styles.w30}`}>
            <p className={`${styles.checkpointsDataText} `}>
              Lorem Ipsum is simply dummy text of the.
            </p>
          </div>
          <div className={`${styles.w20}`}>
            <p className={`${styles.checkpointsDataText}`}>PDF</p>
          </div>
          <div className={`${styles.w15}`}></div>
          <div className={`${styles.w15}`}>
            <p
              className={`${styles.checkpointsDataText} ${styles.checkpointsDataTextPrimary}`}
            >
              Trading
            </p>
          </div>
          <div
            className={`${styles.w20} d-flex align-items-center justify-content-end`}
          >
            <IconButton
              variant="iconButtonPrimary"
              className={`${styles.tableIconButton} mr-2`}
              description={<MdAdd />}
            />
            <IconButton
              variant="iconButtonPrimary"
              className={`${styles.tableIconButton} ${styles.messageNotificationDot} mr-2`}
              description={<MdTextsms />}
            />
            <Input
              type="select"
              variant="tableDataSelectInput"
              valueForDropDown={["Complied", "Not Complied", "Not Applicable"]}
            />
          </div>
        </div>
        <div
          className={`${styles.dataDropdownRow} ${styles.checkpointsDataRow}`}
        >
          <div className={`${styles.w30}`}>
            <p className={`${styles.checkpointsDataText} `}>
              Lorem Ipsum is simply dummy text of the.
            </p>
          </div>
          <div className={`${styles.w20}`}>
            <p className={`${styles.checkpointsDataText}`}>PDF</p>
          </div>
          <div className={`${styles.w15}`}></div>
          <div className={`${styles.w15}`}>
            <p
              className={`${styles.checkpointsDataText} ${styles.checkpointsDataTextPrimary}`}
            >
              Trading
            </p>
          </div>
          <div
            className={`${styles.w20} d-flex align-items-center justify-content-end`}
          >
            <IconButton
              variant="iconButtonPrimary"
              className={`${styles.tableIconButton} mr-2`}
              description={<MdAdd />}
            />
            <IconButton
              variant="iconButtonPrimary"
              className={`${styles.tableIconButton} ${styles.messageNotificationDot} mr-2`}
              description={<MdTextsms />}
            />
            <Input
              type="select"
              variant="tableDataSelectInput"
              valueForDropDown={["Complied", "Not Complied", "Not Applicable"]}
            />
          </div>
        </div>
        <div
          className={`${styles.dataDropdownRow} ${styles.checkpointsDataRow}`}
        >
          <div className={`${styles.w30}`}>
            <p className={`${styles.checkpointsDataText} `}>
              Lorem Ipsum is simply dummy text of the.
            </p>
          </div>
          <div className={`${styles.w20}`}>
            <p className={`${styles.checkpointsDataText}`}>PDF</p>
          </div>
          <div className={`${styles.w15}`}></div>
          <div className={`${styles.w15}`}>
            <p
              className={`${styles.checkpointsDataText} ${styles.checkpointsDataTextPrimary}`}
            >
              Trading
            </p>
          </div>
          <div
            className={`${styles.w20} d-flex align-items-center justify-content-end`}
          >
            <IconButton
              variant="iconButtonPrimary"
              className={`${styles.tableIconButton} mr-2`}
              description={<MdAdd />}
            />
            <IconButton
              variant="iconButtonPrimary"
              className={`${styles.tableIconButton} ${styles.messageNotificationDot} mr-2`}
              description={<MdTextsms />}
            />
            <Input
              type="select"
              variant="tableDataSelectInput"
              valueForDropDown={["Complied", "Not Complied", "Not Applicable"]}
            />
          </div>
        </div>
      </div>
    </>
  );
};
