import React, { useState } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { useHistory } from "react-router";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import { DataGrid, Column, RequiredRule } from "devextreme-react/data-grid";
import { ImSearch } from "react-icons/im";
import styles from "./style.module.scss";
import Text from "../../components/Text/Text";
import IconButton from "../../components/Buttons/IconButton";
import Container from "../../components/Containers";
import HeaderNavigation, { UserManagmentPages } from "./HeaderNavigation";

function CurrentWork() {
  const history = useHistory();
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
  const [currentPageView, setCurrentPageView] = useState(UserManagmentPages[0]);
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
  const TemplateNameCell = (data) => {
    const value = data?.value;
    return (
      <span className={styles.balckTextCell} title={value}>
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
              history.push("/tax-audit");
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
    <Container variant="content">
      <div className={styles.header}>
        <div style={{ display: "flex" }}>
          <IconButton
            variant="iconButtonRound"
            description={<MdKeyboardArrowLeft />}
            size="none"
          />
          <Text
            heading="p"
            variant="stepperMainHeading"
            text="Amit Shah(Auditor)"
          />
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
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
      </div>
      <div className={styles.headerBorder}></div>

      <HeaderNavigation
        currentPageView={currentPageView}
        setCurrentPageView={setCurrentPageView}
        pages={UserManagmentPages}
      />

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
          cellRender={TemplateNameCell}
        />
        <Column
          dataField="expertise"
          caption="Audit Type"
          headerCellRender={renderTitleHeader}
          cellRender={TemplateNameCell}
        />
        <Column
          dataField="role"
          caption="Start Date"
          headerCellRender={renderTitleHeader}
          cellRender={TemplateNameCell}
        />
        <Column
          dataField="mobile_no"
          caption="End Date"
          headerCellRender={renderTitleHeader}
          cellRender={TemplateNameCell}
        />
        <Column
          dataField="email"
          caption="Duration"
          headerCellRender={renderTitleHeader}
          cellRender={TemplateNameCell}
        />
        <Column
          dataField="email"
          caption="Questionnaire"
          headerCellRender={renderTitleHeader}
          cellRender={TemplateNameCell}
        />
        <Column
          dataField="email"
          caption="Checkpoints"
          headerCellRender={renderTitleHeader}
          cellRender={TemplateNameCell}
        />
        <Column cellRender={TemplateActions}>
          <RequiredRule />
        </Column>
      </DataGrid>
    </Container>
  );
}

export default CurrentWork;
