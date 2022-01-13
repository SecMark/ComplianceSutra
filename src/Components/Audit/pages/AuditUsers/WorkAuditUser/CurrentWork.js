import React, { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useHistory, useRouteMatch } from "react-router";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import { DataGrid, Column, RequiredRule } from "devextreme-react/data-grid";
import styles from "../style.module.scss";
import IconButton from "../../../components/Buttons/IconButton";

function CurrentWork() {
  const history = useHistory();
  const { path } = useRouteMatch();
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      user_name: "test",
      expertise: "test 123",
      role: "test",
      mobile_no: "8765226526",
      email: "test@gmail.com",
    },
    {
      id: 2,
      user_name: "test",
      expertise: "test 123",
      role: "test",
      mobile_no: "8765226526",
      email: "test@gmail.com",
    },
    {
      id: 3,
      user_name: "test",
      expertise: "test 123",
      role: "test",
      mobile_no: "8765226526",
      email: "test@gmail.com",
    },
  ]);
  const selectionChanged = (e) => {
    e.component.collapseAll(-1);
    e.component.expandRow(e.currentSelectedRowKeys[0]);
  };
  const getSubstring = (str, n = 15) => {
    if (str) {
      return str?.length > n ? str?.substring(0, n) + "..." : str;
    }
    return "";
  };
  const renderTitleHeader = (data) => {
    return <p className={styles.columnHeaderTitle}>{data.column.caption}</p>;
  };
  const TemplateNameCellWithBlack = (data) => {
    const value = data?.value;
    return (
      <span className={styles.balckTextCell} title={value}>
        {getSubstring(value)}
      </span>
    );
  };
  const TemplateStatusCell = (data) => {
    const value = data?.value;
    return (
      <span className={styles.balckTextCell} title={value}>
        {getSubstring(value)}
      </span>
    );
  };
  const TemplateNameCellWithBlue = (data) => {
    const value = data?.value;
    return (
      <span className={styles.blueTextCell} title={value}>
        {getSubstring(value)}
      </span>
    );
  };
  const TemplateNameCellWithStatus = (data) => {
    const value = data?.value;
    return (
      <span className={styles.blueTextCell} title={value}>
        {getSubstring(value)}
      </span>
    );
  };
  const TemplateActions = (data) => {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="px-1">
          <IconButton
            onClick={() => {
              history.push(`${path}/current-work`);
            }}
            variant="iconButtonRound"
            description={<MdKeyboardArrowRight />}
            size="none"
          />
        </div>
      </div>
    );
  };
  return (
    <div className="mt-4">
      <DataGrid
        id="dataGrid"
        dataSource={dataSource}
        keyExpr="id"
        onSelectionChanged={selectionChanged}
        columnAutoWidth={true}
        allowColumnReordering={true}
        paging={{ pageSize: 6 }}
        showColumnLines={false}
        showBorders={false}
        showRowLines={false}
        wordWrapEnabled={true}
        width="100%"
        // selection={{
        //   mode: "multiple",
        //   showCheckBoxesMode: "always",
        // }}
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
        <Column
          dataField="user_name"
          caption="Company Name"
          headerCellRender={renderTitleHeader}
          cellRender={TemplateNameCellWithBlack}
        />
        <Column
          dataField="expertise"
          caption="Audit Type"
          headerCellRender={renderTitleHeader}
          cellRender={TemplateNameCellWithBlack}
        />
        <Column
          dataField="role"
          caption="Start Date"
          headerCellRender={renderTitleHeader}
          cellRender={TemplateNameCellWithBlack}
        />
        <Column
          dataField="mobile_no"
          caption="End Date"
          headerCellRender={renderTitleHeader}
          cellRender={TemplateNameCellWithBlack}
        />
        <Column
          dataField="email"
          caption="Duration"
          headerCellRender={renderTitleHeader}
          cellRender={TemplateNameCellWithBlack}
        />
        <Column
          dataField="email"
          caption="Status"
          headerCellRender={renderTitleHeader}
          cellRender={TemplateStatusCell}
        />
        <Column
          dataField="email"
          caption="Questionnaire"
          headerCellRender={renderTitleHeader}
          cellRender={TemplateNameCellWithBlue}
        />
        <Column
          dataField="email"
          caption="Checkpoints"
          headerCellRender={renderTitleHeader}
          cellRender={TemplateNameCellWithBlue}
        />
        <Column cellRender={TemplateActions}>
          <RequiredRule />
        </Column>
      </DataGrid>
    </div>
  );
}

export default CurrentWork;
