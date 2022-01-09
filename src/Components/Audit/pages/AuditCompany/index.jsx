import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import Text from "../../components/Text/Text";
import IconButton from "../../components/Buttons/IconButton";
import {
  MdAddBox,
  MdKeyboardArrowRight,
  MdDelete
} from "react-icons/md";
import {RiEdit2Fill} from "react-icons/ri"
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
import Container from "../../components/Containers";
import axiosInstance from "../../../../apiServices/";

function AuditCompany() {
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [auditTemplatesData, setAuditTemplatesData] = useState([
      {
          company_name:"Bk Tradders",
          registration_no:"123456",
          company_category:"textile",
          contact_no:"8764736459",
          email_id:"amvv@jvh.vfsv",
          branches:2,
      },
      {
        company_name:"IEX",
        registration_no:"123456",
        company_category:"electricity trading platform",
        contact_no:"8764736459",
        email_id:"amvv@jvh.vfsv",
        branches:2,
    },
    {
        company_name:"sona coms",
        registration_no:"123456",
        company_category:"auto parts",
        contact_no:"8764736459",
        email_id:"amvv@jvh.vfsv",
        branches:2,
    },
    {
        company_name:"Asian paints",
        registration_no:"123456",
        company_category:"paints",
        contact_no:"8764736459",
        email_id:"amvv@jvh.vfsv",
        branches:8,
    },
  ]);
  const history = useHistory();
  const { path } = useRouteMatch();
  console.log("data that i am getting",auditTemplatesData)

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
          variant="iconButtonPrimary"
          description={<RiEdit2Fill />}
          size="none"
        />
        <IconButton
          variant="iconButtonDelete"
          description={<MdDelete />}
          size="none"
        />

        <IconButton
          onClick={() => {
            history.push("/audit-company-branch");
          }}
          variant="iconButtonRound"
          description={<MdKeyboardArrowRight />}
          size="none"
        />
      </div>
    );
  };

  const RequiredDataCell = (data) => {
      console.log("required cell data",data);
    const value = data?.value;
    return (
      <span className={styles.textBlueDataCell}>
        {value}&nbsp;
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
//   useEffect(() => {
//     getAuditTemplatesData();
//   }, []);
  return (
    <Container variant="content">
      <div className={styles.topHeading}>
        <Text heading="p" variant="stepperMainHeading" text="Company" />
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
                description="New Company"
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
            dataField="company_name"
            caption="Company Name"
            headerCellRender={renderTitleHeader}
            cellRender={companyFieldCell}
          >
            <RequiredRule />
          </Column>
          <Column
            dataField="registration_no"
            caption="Registration No."
            cellRender={companyFieldCell}
            headerCellRender={renderTitleHeader}
            alignment="left"
          >
            <RequiredRule />
          </Column>
          <Column
            dataField="company_category"
            caption="Company Category"
            cellRender={companyFieldCell}
            headerCellRender={renderTitleHeader}
          >
            <RequiredRule />
          </Column>
          <Column
            dataField="contact_no"
            caption="Contact No."
            headerCellRender={renderTitleHeader}
            cellRender={companyFieldCell}
          >
            <RequiredRule />
          </Column>
          <Column
            dataField="email_id"
            caption="Email Id"
            headerCellRender={renderTitleHeader}
            cellRender={companyFieldCell}
            alignment="left"
          />
          <Column
            dataField="branches"
            caption="Branches"
            headerCellRender={renderTitleHeader}
            cellRender={RequiredDataCell}
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

export default AuditCompany;
