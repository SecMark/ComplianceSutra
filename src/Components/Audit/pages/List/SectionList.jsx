import React, { useState } from "react";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";

import {
  DataGrid,
  ColumnChooser,
  ColumnFixing,
  Column,
  RequiredRule,
  FilterRow,
  SearchPanel,
  GroupPanel,
  Selection,
  Summary,
  GroupItem,
  Editing,
  MasterDetail,
  Export,
} from "devextreme-react/data-grid";
import { employees } from "./employees";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";

import { MdModeEdit } from "react-icons/md";

function SelectedEmployee(props) {
  console.log(props);
  if (props.employee) {
    return (
      <p id="selected-employee">
        Selected employee: {props.employee.TemplateName}
      </p>
    );
  }
  return null;
}

function DetailSection(props) {
  const employee = props.data.data;
  return (
    <Column dataField="CheckPoint">
      <RequiredRule />
    </Column>
  );
}

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

const renderGridCell = (data) => {
  return (
    <div>
      {data.data.TemplateName}
      <MdModeEdit></MdModeEdit>
    </div>
  );
};

function SectionList() {
  const [selectedEmployee, setSelectedEmployee] = useState();
  const selectEmployee = (e) => {
    console.log(e.component.byKey(e.currentSelectedRowKeys[0]));
    e.component.byKey(e.currentSelectedRowKeys[0]).done((employee) => {
      setSelectedEmployee(employee);
    });
  };

  return (
    <div className="App">
      <DataGrid
        id="dataGrid"
        dataSource={employees}
        keyExpr="Completion"
        allowColumnResizing={true}
        columnAutoWidth={true}
        allowColumnReordering={true}
        onSelectionChanged={selectEmployee}
        onExporting={exportGrid}
      >
        <ColumnChooser enabled={true} />
        <Column
          dataField="TemplateName"
          groupIndex={0}
          sortOrder="asc"
          allowGrouping={true}
        >
          <RequiredRule />
        </Column>
        <Column dataField="Completion">
          <RequiredRule />
        </Column>
        <Column dataField="MadeBy">
          <RequiredRule />
        </Column>
        <Column dataField="AuditType">
          <RequiredRule />
        </Column>
        <Column dataField="RequiredDataPoints" />
        <Column dataField="CheckPoint" cellRender={renderGridCell}>
          <RequiredRule />
        </Column>

        <ColumnFixing enabled={true} />
        <FilterRow visible={true} />
        <SearchPanel visible={true} />
        <GroupPanel visible={true} />
        <Selection mode="single" />

        <Editing
          mode="popup"
          allowUpdating={true}
          allowDeleting={true}
          allowAdding={true}
        />
        <MasterDetail enabled={true} component={DetailSection} />
        <Export enabled={true} />
      </DataGrid>
      <SelectedEmployee employee={selectedEmployee} />
    </div>
  );
}

export default SectionList;
