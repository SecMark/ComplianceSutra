import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import Text from "../../components/Text/Text";
import IconButton from "../../components/Buttons/IconButton";
import { MdAddBox, MdKeyboardArrowRight } from "react-icons/md";
import Button from "../../components/Buttons/Button";
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
import { MdModeEdit } from "react-icons/md";
import Container from "../../components/Containers";

import axiosInstance from "../../../../apiServices/";

function AuditTemplates() {
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [auditTemplatesData, setAuditTemplatesData] = useState([]);
  const history = useHistory();
  const { path } = useRouteMatch();

  const getAuditTemplatesData = async () => {
    try {
      const { data, status } = await axiosInstance.get(
        "audit.api.AuditTemplateDeshBoard"
      );
      if (status === 200 && data && data.message && data.message.status) {
        const templates = data?.message?.data;
        setAuditTemplatesData(templates);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const selectEmployee = (e) => {
    e.component.byKey(e.currentSelectedRowKeys[0]).done((employee) => {
      setSelectedEmployee(employee);
    });
  };
  const CheckPointCell = (data) => {
    return (
      <div className="d-flex justify-content-between align-items-center">
        <span>{data.data.total_checklist} Checks</span>
        <IconButton
          variant="iconButtonRound"
          description={<MdModeEdit />}
          size="none"
        />
      </div>
    );
  };
  const TemplateNameCell = (data) => {
    const value = data?.data?.audit_template_name;
    return <span title={value}>{getSubstring(value)}</span>;
  };
  const AuditTypeCell = (data) => {
    const value = data?.data?.audit_category;
    return <span title={value}>{getSubstring(value)}</span>;
  };
  const MadeByCell = (data) => {
    return (
      <p title={data?.data?.user_id} className={styles.madeBy}>
        {data?.data?.user || data?.data?.user_id}
      </p>
    );
  };
  const renderTitleHeader = (data) => {
    return <p className={styles.columnHeaderTitle}>{data.column.caption}</p>;
  };

  const CompletionCell = (data) => {
    const value = data?.data?.completion;
    return (
      <p
        title={value}
        className={`${styles.completion} ${value === 100 && styles.success}`}
      >
        {value + "% Complete"}
      </p>
    );
  };
  const TemplateActions = (data) => {
    const completion = data?.data?.completion;
    return (
      <div className="d-flex justify-content-between align-items-center">
        <Button
          variant="stroke"
          description={completion < 100 ? "complete" : "view"}
          size="none"
        />
        <Button variant="stroke" description="start audit" size="none" />
        <IconButton
          variant="iconButtonRound"
          description={<MdKeyboardArrowRight />}
          size="none"
        />
      </div>
    );
  };

  const RequiredDataCell = (data) => {
    return <span>{data?.data?.total_question}&nbsp;Questions</span>;
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
  useEffect(() => {
    getAuditTemplatesData();
  }, []);
  return (
    <Container variant="content">
      {auditTemplatesData && auditTemplatesData?.length > 0 && (
        <DataGrid
          id="dataGrid"
          dataSource={auditTemplatesData}
          columnAutoWidth={true}
          allowColumnReordering={true}
          onSelectionChanged={selectEmployee}
          onExporting={exportGrid}
          paging={{ pageSize: 6 }}
        >
          {/* <Toolbar>
            <Item location="before">
              <Text
                heading="p"
                variant="stepperMainHeading"
                text="Audit Templates"
              />
            </Item>
            <Item location="after">
              <IconButton
                description="Create Template"
                variant="createProject"
                icon={<MdAddBox />}
                onClick={() => history.push(`${path}/create-template`)}
              />
            </Item>
            <Item name="exportButton" />
            <Item name="searchPanel" />
          </Toolbar> */}
          <Column
            dataField="audit_template_name"
            caption="Template Name"
            headerCellRender={renderTitleHeader}
            cellRender={TemplateNameCell}
          >
            <RequiredRule />
          </Column>
          <Column
            dataField="completion"
            caption="% Completion"
            cellRender={CompletionCell}
            headerCellRender={renderTitleHeader}
            alignment="left"
          >
            <RequiredRule />
          </Column>
          <Column
            dataField="made_by"
            caption="Made by"
            cellRender={MadeByCell}
            headerCellRender={renderTitleHeader}
          >
            <RequiredRule />
          </Column>
          <Column
            dataField="audit_category"
            caption="audit type"
            headerCellRender={renderTitleHeader}
            cellRender={AuditTypeCell}
          >
            <RequiredRule />
          </Column>
          <Column
            dataField="total_question"
            caption="data points"
            headerCellRender={renderTitleHeader}
            cellRender={RequiredDataCell}
            alignment="left"
          />
          <Column
            dataField="total_checklist"
            caption="Checkpoints"
            headerCellRender={renderTitleHeader}
            cellRender={CheckPointCell}
            alignment="left"
          >
            <RequiredRule />
          </Column>
          <Column cellRender={TemplateActions}>
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

export default AuditTemplates;
