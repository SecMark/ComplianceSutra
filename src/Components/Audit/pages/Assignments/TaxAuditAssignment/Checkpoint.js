import {
  DataGrid,
  Column,
  MasterDetail,
  SearchPanel,
  Selection,
  Export,
  Toolbar,
  Item,
} from "devextreme-react/data-grid";
import React, { useState } from "react";
import {
  MdAdd,
  MdExpandLess,
  MdExpandMore,
  MdTextsms,
  MdInfo,
  MdPictureAsPdf,
} from "react-icons/md";
import IconButton from "../../../components/Buttons/IconButton";
import Button from "../../../components/Buttons/Button";
import { Input } from "../../../components/Inputs/Input";
import styles from "./style.module.scss";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
import { GrDocumentPdf } from "react-icons/gr";
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

  const addAction = (data) => {
    return (
      <div className="d-flex align-items-center">
        <IconButton
          variant="iconButtonPrimary"
          className={`${styles.tableIconButton} mr-2`}
          description={<MdAdd />}
          size="none"
        />
      </div>
    );
  };
  const commentAction = (data) => {
    return (
      <div className="d-flex align-items-center">
        <IconButton
          variant="iconButtonPrimary"
          className={`${styles.tableIconButton} mr-2 ${styles.messageNotificationDot} mr-2`}
          description={<MdTextsms />}
          size="none"
        />
      </div>
    );
  };
  const infoAction = (data) => {
    return (
      <div className="d-flex align-items-center">
        <IconButton
          variant="iconButtonPrimary"
          className={`${styles.tableIconButton} mr-2 ${styles.messageNotificationDot} mr-2`}
          description={<MdInfo />}
          size="none"
        />
      </div>
    );
  };
  const dropdownAction = (data) => {
    return (
      <div className="d-flex align-items-center">
        <Input
          type="select"
          variant="tableDataSelectInput"
          valueForDropDown={["Low", "Medium", "High"]}
        />
      </div>
    );
  };
  const dropAction = (data) => {
    return (
      <div className="d-flex align-items-center">
        <Input
          type="select"
          variant="tableDataSelectInput"
          valueForDropDown={["Complied", "Not Complied", "Not Applicable"]}
        />
      </div>
    );
  };
  const pdfAction = (data) => {
    return (
      <div className="d-flex align-items-center">
        <IconButton
          variant="iconButtonPrimary"
          className={`${styles.tableIconButton} mr-2 ${styles.messageNotificationDot} mr-2`}
          description="PDF"
          size="none"
        />
      </div>
    );
  };
  const tradingAction = (data) => {
    return (
      <div className="d-flex align-items-center">
        <Button
          variant="ButtonForTrading"
          className={`${styles.tableIconButton} mr-2 ${styles.messageNotificationDot} mr-2`}
          description="Tranding"
          size="none"
        />
      </div>
    );
  };

  function exportGrid(e) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Main sheet");
    exportDataGrid({
      worksheet: worksheet,
      component: e.component,
    }).then(function () {
      workbook.xlsx.writeBuffer().then(function (buffer) {
        saveAs(
          new Blob([buffer], { type: "application/octet-stream" }),
          "DataGrid.xlsx"
        );
      });
    });
    e.cancel = true;
  }
  // const DropdownDetails = (data) => {
  //   return (
  //     <div className={styles.masterDetailsContainer}>
  //       <div className={styles.checkpointsDataContainer}>
  //         <div className={styles.checkpointsHeaderRow}>
  //           <div className={`${styles.w30}`}>
  //             <p className={styles.checkpointsHeadingText}>Questions</p>
  //           </div>
  //           <div className={`${styles.w20}`}>
  //             <p className={styles.checkpointsHeadingText}>Assign to</p>

  //           </div>
  //           <div className={`${styles.w20}`}>
  //             <p className={styles.checkpointsHeadingText}>Required Docs</p>
  //           </div>
  //           <div className={`${styles.w20}`}>
  //             <p className={styles.checkpointsHeadingText}>Submited Docs</p>
  //           </div>
  //           <div className={`${styles.w15}`}>
  //             <p className={styles.checkpointsHeadingText}>Checkpoints</p>
  //           </div>
  //           <div className={`${styles.w15}`}>
  //             <p className={styles.checkpointsHeadingText}>Referance</p>
  //           </div>
  //         </div>
  //         <div className={styles.checkpointsMainContainer}>
  //           <CheckpointsDataRow />
  //           <CheckpointsDataRow />
  //           <CheckpointsDataRow />
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div>
      <DataGrid
        id="dataGrid"
        dataSource={data}
        columnAutoWidth={true}
        onExporting={exportGrid}
        allowColumnReordering={true}
        paging={{ pageSize: 6 }}
        showColumnLines={false}
        showBorders={false}
        showRowLines={false}
        wordWrapEnabled={true}
        width="100%"
        selection={{
          mode: "multiple",
          showCheckBoxesMode: "always",
        }}
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
        <Toolbar>
          <Item name="searchPanel" />
          <Item name="exportButton" />
          <Item name="groupPanel" location="before" />
        </Toolbar>
        <SearchPanel visible={true} width={250} />
        <Column
          dataField="section_name"
          caption="Section Name"
          cellRender={customDataCell}
          headerCellRender={customHeaderCell}
        />
        <Column
          dataField="checkpoints"
          caption="Checkpoints"
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
          dataField="assign_to"
          cellRender={customDataCell}
          headerCellRender={customHeaderCell}
        />
        <Column
          dataField="Require_docs"
          cellRender={customDataCell}
          headerCellRender={customHeaderCell}
        />
        <Column
          dataField="Submited_docs"
          cellRender={customDataCell}
          headerCellRender={customHeaderCell}
        />
        <Column
          dataField="Docs_Relied_Upon"
          cellRender={tradingAction}
          headerCellRender={customHeaderCell}
        />
        <Column
          dataField="add_docs"
          caption="Add Docs"
          cellRender={addAction}
          headerCellRender={customHeaderCell}
        />
        <Column
          dataField="Comment"
          caption="Comments"
          cellRender={commentAction}
          headerCellRender={customHeaderCell}
        />
        <Column
          dataField="Info"
          caption="Info"
          cellRender={infoAction}
          headerCellRender={customHeaderCell}
        />
        <Column
          dataField="Severtiy"
          caption="Severity"
          cellRender={dropdownAction}
          headerCellRender={customHeaderCell}
        />
        <Column
          dataField=""
          caption=""
          cellRender={dropAction}
          headerCellRender={customHeaderCell}
        />
        {/* <MasterDetail enabled={true} component={DropdownDetails} /> */}
        <Export enabled={true} />
        <Selection mode="single" />
      </DataGrid>
    </div>
  );
};

export default Checkpoints;
const data = [
  {
    id: 1,
    section_name: "General Details",
    checkpoints:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry ?",
    start_date: "21 Oct, 2021",
    deadline: "21 Oct, 2021",
    assign_to: "amit",
    Require_docs: "PDF",
    Submited_docs: "PDF",
    Docs_Relied_Upon: "Trading",
    // Comment:
    // Info
    // Severtiy
    // questions: "10",
    // total_checkpoints: "10",
  },
  {
    id: 2,
    section_name: "Invoice Details",
    checkpoints:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry ?",
    start_date: "21 Oct, 2021",
    deadline: "21 Oct, 2021",
    assign_to: "amit",
    Require_docs: "PDF",
    Submited_docs: "PDF",
    Docs_Relied_Upon: "Trading",
  },
  {
    id: 3,
    section_name: "Revenue Details",
    checkpoints:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry ?",
    start_date: "21 Oct, 2021",
    deadline: "21 Oct, 2021",
    assign_to: "amit",
    Require_docs: "PDF",
    Submited_docs: "PDF",
    Docs_Relied_Upon: "Trading",
  },
  {
    id: 4,
    section_name: "Revenue Details",
    checkpoints:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry ?",
    start_date: "21 Oct, 2021",
    deadline: "21 Oct, 2021",
    assign_to: "amit",
    Require_docs: "PDF",
    Submited_docs: "PDF",
    Docs_Relied_Upon: "Trading",
  },
];
