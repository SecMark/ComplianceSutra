import React, { useEffect, useState, useRef, useCallback } from "react";
import styles from "./style.module.scss";
import Text from "../../components/Text/Text";
import IconButton from "../../components/Buttons/IconButton";
import {
  MdAddBox,
  MdKeyboardArrowRight,
  MdOutlineCheckCircle,
  MdPlayArrow,
  MdModeEdit,
  MdDelete,
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
  MasterDetail,
} from "devextreme-react/data-grid";
import { AiFillMessage } from "react-icons/ai";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdPhoneInTalk } from "react-icons/md";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
import Container from "../../components/Containers";
import axiosInstance from "../../../../apiServices";
import { ImSearch } from "react-icons/im";

const CompleteWork = () => {
  return (
    <div className={styles.userDetails}>
      <div></div>
      <div>Mr.Amit Shah</div>
      <div>
        <div className="pb-1">
          <IconButton
            icon={<AiFillMessage />}
            variant="iconButtonPrimary"
            description="Call"
            onClick={() => console.log("e")}
            size="small"
          />
        </div>
        <div className="pt-1">
          <IconButton
            icon={<MdPhoneInTalk />}
            variant="iconButtonPrimary"
            description="Message"
            onClick={() => console.log("e")}
            size="small"
          />
        </div>
      </div>
      <div>
        <div>Address : A/12, Miranagar Road,Boriwali, Mumbai</div>
      </div>
      <div>
        <div>Skydive ID : amitshah_dx_skype</div>
        <div>Phone : 92135 12356</div>
      </div>
    </div>
  );
};

function AuditUsers() {
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
  const dataGrid = useRef(null);

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
            variant="iconButtonPrimary"
            description={<MdModeEdit />}
            size="none"
          />
        </div>
        <div className="px-1">
          <IconButton
            variant="iconButtonDanger"
            description={<MdDelete />}
            size="none"
          />
        </div>
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
        <Text heading="p" variant="stepperMainHeading" text="Users" />
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
          <div style={{ padding: "0 10px" }}>
            <IconButton
              variant="iconButtonRound"
              description={<FaCloudUploadAlt />}
              size="none"
            />
          </div>
        </div>
      </div>
      <div className={styles.headerBorder}></div>
      <div className={styles.newUser}>
        <IconButton
          description="New User"
          variant="createProject"
          icon={<MdAddBox />}
        />
      </div>

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
        <Column
          dataField="user_name"
          caption="User Name"
          headerCellRender={renderTitleHeader}
          cellRender={TemplateNameCell}
        />
        <Column
          dataField="expertise"
          caption="Expertise"
          headerCellRender={renderTitleHeader}
          cellRender={TemplateNameCell}
        />
        <Column
          dataField="role"
          caption="Role"
          headerCellRender={renderTitleHeader}
          cellRender={TemplateNameCell}
        />
        <Column
          dataField="mobile_no"
          caption="Mobile No."
          headerCellRender={renderTitleHeader}
          cellRender={TemplateNameCell}
        />
        <Column
          dataField="email"
          caption="Email"
          headerCellRender={renderTitleHeader}
          cellRender={TemplateNameCell}
        />
        <Column cellRender={TemplateActions}>
          <RequiredRule />
        </Column>
        <MasterDetail enabled={true} component={UserDetails} />
      </DataGrid>
    </Container>
  );
}

export default CompleteWork;
