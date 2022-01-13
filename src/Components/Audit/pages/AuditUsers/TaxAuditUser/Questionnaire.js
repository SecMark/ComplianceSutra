import React, { useState, useRef, useCallback } from "react";
import {
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdAdd,
  MdTextsms,
} from "react-icons/md";
import { useHistory } from "react-router";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import {
  DataGrid,
  Column,
  RequiredRule,
  MasterDetail,
} from "devextreme-react/data-grid";
import styles from "./style.module.scss";
import IconButton from "../../../components/Buttons/IconButton";

const DropdownDetails = (data) => {
  return (
    <div className={styles.masterDetailsContainer}>
      <table className={styles.questionnarieCustomTable}>
        <tr className={styles.headingRow}>
          <th className={styles.w40}>Questions</th>
          <th className={styles.w20}>Required Doc.</th>
          <th className={styles.w20}>Submited Doc.</th>
          <th></th>
        </tr>
        {Array(3)
          .fill(1)
          .map((item) => {
            return (
              <tr className={styles.dataRow} key={item}>
                <td className={styles.w40}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry ?
                </td>
                <td className={styles.w20}>PDF | Excel</td>
                <td className={styles.w20}>3 Checks</td>
                <td>
                  <div className="d-flex align-items-center justify-content-center">
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
                  </div>
                </td>
              </tr>
            );
          })}
      </table>
    </div>
  );
};

function Questionnaire() {
  const history = useHistory();
  const dataGrid = useRef(null);
  const [isToggle, setIsToggle] = useState(null);
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
  const toggleMasterRow = useCallback((rowKey) => {
    console.log("rowKey", rowKey);
    if (dataGrid.current.instance.isRowExpanded(rowKey)) {
      dataGrid.current.instance.collapseRow(rowKey);
      setIsToggle(null);
    } else {
      dataGrid.current.instance.expandRow(rowKey);
      setIsToggle(rowKey);
    }
  }, []);
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
  const TemplateActions = (item) => {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="px-1">
          <IconButton
            onClick={() => toggleMasterRow(item.data?.id)}
            variant="iconButtonRound"
            description={
              isToggle === item.data?.id ? (
                <MdKeyboardArrowUp />
              ) : (
                <MdKeyboardArrowDown />
              )
            }
            size="none"
          />
        </div>
      </div>
    );
  };
  return (
    <div className="mt-4">
      <DataGrid
        ref={dataGrid}
        id="dataGrid"
        dataSource={dataSource}
        keyExpr="id"
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
          caption="Template Name"
          headerCellRender={renderTitleHeader}
          cellRender={TemplateNameCell}
        />
        <Column
          dataField="expertise"
          caption="Assignment Name"
          headerCellRender={renderTitleHeader}
          cellRender={TemplateNameCell}
        />
        <Column
          dataField="role"
          caption="Section Name"
          headerCellRender={renderTitleHeader}
          cellRender={TemplateNameCell}
        />
        <Column
          dataField="mobile_no"
          caption="Start Date"
          headerCellRender={renderTitleHeader}
          cellRender={TemplateNameCell}
        />
        <Column
          dataField="email"
          caption="Deadline"
          headerCellRender={renderTitleHeader}
          cellRender={TemplateNameCell}
        />
        <Column
          dataField="email"
          caption="Questions"
          headerCellRender={renderTitleHeader}
          cellRender={TemplateNameCell}
        />
        <Column cellRender={TemplateActions}>
          <RequiredRule />
        </Column>
        <MasterDetail enabled={false} component={DropdownDetails} />
      </DataGrid>
    </div>
  );
}

export default Questionnaire;