import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import Text from "../../components/Text/Text";
import IconButton from "../../components/Buttons/IconButton";
import {
  MdAddBox,
  MdKeyboardArrowRight,
  MdOutlineCheckCircle,
  // MdOutlineCheckCircle,
  MdPlayArrow,
} from "react-icons/md";
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
import { MdModeEdit, MdOutlineNoteAdd } from "react-icons/md";
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

  const CompletionCell = (data) => {
    const value = data?.data?.completion;
    return (
      <p
        title={value}
        className={`${styles.completion} ${value === 100 && styles.success}`}
      >
        {value + "%"}
      </p>
    );
  };

  const EditTemplateAction = (data) => {
    return (
      <IconButton
        variant="iconButtonRound"
        description={<MdModeEdit />}
        size="none"
      />
    );
  };
  const DoneTemplateAction = (data) => {
    const completion = data?.data?.completion;
    return (
      <IconButton
        variant="iconButtonPrimary"
        description={<MdOutlineCheckCircle />}
        size="none"
        disabled={completion === 100}
        disabledVariant="iconButtonPrimaryDisabled"
      />
    );
  };
  const AssignTemplateAction = (data) => {
    const { audit_template_name } = data.data;
    return (
      <IconButton
        variant="iconButtonPrimary"
        description={<MdPlayArrow />}
        size="none"
        onClick={() => {
          history.push({
            pathname: `${path}/template`,
            state: {
              templateName: audit_template_name,
            },
          });
        }}
      />
    );
  };

  const CreateTemplateAction = (data) => {
    return (
      <IconButton
        variant="iconButtonPrimary"
        description={<MdOutlineNoteAdd />}
        size="none"
      />
    );
  };

  const RequiredDataCell = (data) => {
    const value = data?.value;
    const columnName = data?.column?.name;
    return (
      <span className={styles.textBlueDataCell}>
        {value}&nbsp;
        {columnName === "total_question"
          ? "Questions"
          : columnName === "total_checklist"
          ? "Checkpoints"
          : ""}
      </span>
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
  useEffect(() => {
    getAuditTemplatesData();
  }, []);
  return (
    <Container variant="content">
      <div className={styles.topHeading}>
        <Text heading="p" variant="stepperMainHeading" text="Audit Templates" />
      </div>

      {auditTemplatesData && auditTemplatesData?.length > 0 && (
        <DataGrid
          id="dataGrid"
          dataSource={auditTemplatesData}
          columnAutoWidth={true}
          allowColumnReordering={true}
          onSelectionChanged={selectEmployee}
          onExporting={exportGrid}
          paging={{ pageSize: 6 }}
          showColumnLines={false}
          showBorders={false}
          showRowLines={false}
          wordWrapEnabled={true}
          width="100%"
          export={{
            allowExportSelectedData: true,
            enabled: true,
            texts: {
              exportAll: "Export all data",
              exportSelectedRows: "Export selected rows",
              exportTo: "Export",
            },
          }}
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
            <Item location="after">
              <IconButton
                description="New Template"
                variant="createProject"
                icon={<MdAddBox />}
                onClick={() => history.push(`${path}/create-template`)}
              />
            </Item>
            <Item name="exportButton" />
            <Item name="searchPanel" />
            <Item name="groupPanel" location="before" />
          </Toolbar>
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
            caption="Completion"
            cellRender={CompletionCell}
            headerCellRender={renderTitleHeader}
            alignment="left"
          >
            <RequiredRule />
          </Column>
          <Column
            dataField="audit_category"
            caption="audit type"
            headerCellRender={renderTitleHeader}
            cellRender={TemplateNameCell}
          >
            <RequiredRule />
          </Column>
          <Column
            dataField="total_question"
            caption="questionnarie"
            headerCellRender={renderTitleHeader}
            cellRender={RequiredDataCell}
            alignment="left"
          />
          <Column
            dataField="total_checklist"
            caption="Checkpoints"
            headerCellRender={renderTitleHeader}
            cellRender={RequiredDataCell}
            alignment="left"
          >
            <RequiredRule />
          </Column>
          <Column
            caption="Edit"
            headerCellRender={renderTitleHeader}
            cellRender={EditTemplateAction}
          >
            <RequiredRule />
          </Column>
          <Column
            caption="Done"
            headerCellRender={renderTitleHeader}
            cellRender={DoneTemplateAction}
          >
            <RequiredRule />
          </Column>
          <Column
            caption="Assign"
            headerCellRender={renderTitleHeader}
            cellRender={AssignTemplateAction}
          >
            <RequiredRule />
          </Column>
          <Column
            caption="Create"
            headerCellRender={renderTitleHeader}
            cellRender={CreateTemplateAction}
          >
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
