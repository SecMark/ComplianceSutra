import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import Text from "../../../components/Text/Text";
import IconButton from "../../../components/Buttons/IconButton";
import { MdAddBox, MdKeyboardArrowRight, MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { useHistory, useRouteMatch } from "react-router";

import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";

import {
  DataGrid,
  ColumnFixing,
  Column,
  RequiredRule,
  FilterRow,
  SearchPanel,
  Export,
  Toolbar,
  Item,
  GroupPanel,
  Selection,
  Grouping,
} from "devextreme-react/data-grid";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
import Container from "../../../components/Containers";
import axiosInstance from "../../../../../apiServices";

function CompletedWork() {
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [auditTemplatesData, setAuditTemplatesData] = useState([
    {
      company_name: "Bk Tradders",
      audit_type: "Internal & Mandatory",
      start_date: "21 Jan,2021",
      end_date: "21 july,2021",
      duration: "6 month",
      status: "Draft Report Submited",
      required_data_points: 2,
      checkpoints: 3,
    },
    {
      company_name: "Bk Tradders",
      audit_type: "extarnal & optional",
      start_date: "21 Jan,2021",
      end_date: "21 july,2021",
      duration: "6 month",
      status: "work in progress",
      required_data_points: 5,
      checkpoints: 4,
    },
    {
      company_name: "Bk Tradders",
      audit_type: "Mandatory",
      start_date: "21 Jan,2021",
      end_date: "21 july,2021",
      duration: "6 month",
      status: "completed",
      required_data_points: 1,
      checkpoints: 3,
    },
    {
      company_name: "Bk Tradders",
      audit_type: "extarnal & optional",
      start_date: "21 Jan,2021",
      end_date: "21 july,2021",
      duration: "6 month",
      status: "completed",
      required_data_points: 8,
      checkpoints: 6,
    },
  ]);
  const history = useHistory();
  const { path } = useRouteMatch();

  const companyFieldCell = (data) => {
    const value = data?.value;
    return (
      <span className={styles.balckTextCell} title={value}>
        {getSubstring(value)}
      </span>
    );
  };
  const renderTitleHeader = (data) => {
    return <p className={styles.columnHeaderTitle}>{data.column.caption}</p>;
  };

  const CompanyActions = (data) => {
    return (
      <div className="d-flex justify-content-between align-items-center">
        <IconButton
          onClick={() => {
            history.push("/CompletedWork-questionAndCheckPoints");
          }}
          variant="iconButtonRound"
          description={<MdKeyboardArrowRight />}
          size="none"
        />
      </div>
    );
  };

  const RequiredDataCell = (data) => {
    console.log("required cell data", data);
    const value = data?.value;
    return <span className={styles.textBlueDataCell}>{value}&nbsp;</span>;
  };

  const status = (data) => {
    const value = data?.value;
    return (
      <span
        className={
          value === "Draft Report Submited"
            ? styles.statusTextSubmited
            : value === "work in progress"
            ? styles.statusTextProgress
            : styles.statusTextCompleted
        }
      >
        {value}&nbsp;
      </span>
    );
  };

  const checkPointsAndQuestions = (data) => {
    const value = data?.value;
    const columnName = data?.column?.name;
    return (
      <span className={styles.textBlueDataCell}>
        {value}&nbsp;
        {columnName === "required_data_points"
          ? "Questions"
          : columnName === "checkpoints"
          ? "Checkpoints"
          : ""}
      </span>
    );
  };

  function exportGrid(e) {
    console.log("xcel sheet data",e)
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
  //   useEffect(() => {
  //     getAuditTemplatesData();
  //   }, []);
  return (
    <Container variant="container">
      {auditTemplatesData && auditTemplatesData?.length > 0 && (
        <DataGrid
          id="dataGrid"
          dataSource={auditTemplatesData}
          columnAutoWidth={true}
          allowColumnReordering={true}
          paging={{ pageSize: 6 }}
          showColumnLines={false}
          onExporting={exportGrid}
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
            scrollByThumb: true,
            showScrollbar: "onHover",
            useNative: "auto",
          }}
        >
          <Toolbar>
          <Item name="exportButton" />
            <Item name="searchPanel" />
            <Item name="groupPanel" location="before" />
          </Toolbar>
          <Column
            dataField="company_name"
            caption="Company Name"
            headerCellRender={renderTitleHeader}
            cellRender={companyFieldCell}
          >
            <RequiredRule />
          </Column>
          <Column
            dataField="audit_type"
            caption="Audit type"
            cellRender={companyFieldCell}
            headerCellRender={renderTitleHeader}
            alignment="left"
          >
            <RequiredRule />
          </Column>
          <Column
            dataField="start_date"
            caption="Start Date"
            cellRender={companyFieldCell}
            headerCellRender={renderTitleHeader}
          >
            <RequiredRule />
          </Column>
          <Column
            dataField="end_date"
            caption="End date"
            headerCellRender={renderTitleHeader}
            cellRender={companyFieldCell}
            alignment="left"
          />
          <Column
            dataField="duration"
            caption="Duration"
            headerCellRender={renderTitleHeader}
            cellRender={companyFieldCell}
            alignment="left"
          />
          <Column
            dataField="status"
            caption="Status"
            headerCellRender={renderTitleHeader}
            cellRender={status}
            alignment="left"
          />
          <Column
            dataField="required_data_points"
            caption="Data points"
            headerCellRender={renderTitleHeader}
            cellRender={checkPointsAndQuestions}
            alignment="left"
          />
          <Column
            dataField="checkpoints"
            caption="Checkpoints"
            headerCellRender={renderTitleHeader}
            cellRender={checkPointsAndQuestions}
            alignment="left"
          >
            <RequiredRule />
          </Column>
          <Column cellRender={CompanyActions}>
            <RequiredRule />
          </Column>

          <ColumnFixing enabled={true} />
          <FilterRow visible={true} />
          <SearchPanel visible={true} />
          <Grouping contextMenuEnabled={true} />

          <GroupPanel visible={true} allowColumnDragging={true} />
          <Export enabled={true} />
          <Selection mode="single" />
        </DataGrid>
      )}
    </Container>
  );
}

const getSubstring = (str, n = 15) => {
  if (str) {
    return str?.length > n ? str?.substring(0, n) + "..." : str;
  }
  return "";
};

export default CompletedWork;
