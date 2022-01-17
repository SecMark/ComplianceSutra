import {
  DataGrid,
  Column,
  RequiredRule,
  MasterDetail,
  SearchPanel,
  Selection,
  Export,
  Toolbar,
  Item,
} from "devextreme-react/data-grid";
import React from "react";
import { MdAdd, MdComment, MdTextsms, MdAddBox } from "react-icons/md";
import IconButton from "../../../components/Buttons/IconButton";
import { Input } from "../../../components/Inputs/Input";
import styles from "./style.module.scss";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
import { useHistory, useRouteMatch } from "react-router";
import {GrDocumentPdf,GrDocumentExcel,GrPriv} from "react-icons/gr"
const Questionnaire = () => {
  const history = useHistory();
  const { path } = useRouteMatch();

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

  const renderTitleHeader = (data) => {
    return <p className={styles.columnHeaderTitle}>{data.column.caption}</p>;
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
  const dropdownAction = (data) => {
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
  const customCell = (option) => {
    const { value } = option;
    return (
      <div className="d-flex align-items-center">
        <IconButton
          variant="iconButtonPrimary"
          className={`${styles.tableIconButton} mr-2 ${styles.messageNotificationDot} mr-2`}
          description={<GrDocumentPdf />}
          size="none"
        />
        {/* <span title={value} className={styles.customDataCell}>
        {value}
      </span> */}
         <IconButton
          variant="iconButtonPrimary"
          className={`${styles.tableIconButton} mr-2 ${styles.messageNotificationDot} mr-2`}
          description={<GrDocumentExcel />}
          size="none"
        />
    
      </div>
    );
  };

  // const DropdownDetails = (data) => {
  //   return (
  //     <div className={styles.masterDetailsContainer}>
  //       <table className={styles.questionnarieCustomTable}>
  //         <thead>
  //           <tr className={styles.headingRow}>
  //             <th className={styles.w40}>Questions</th>
  //             <th className={styles.w10}>Assign to</th>
  //             <th className={styles.w20}>Required Docs</th>
  //             <th className={styles.w20}>Submited Docs</th>
  //             <th></th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           <tr className={styles.dataRow}>
  //             <td className={styles.w40}>
  //               Lorem Ipsum is simply dummy text of the printing and typesetting
  //               industry ?
  //             </td>
  //             <td className={styles.w10}>Amit</td>
  //             <td className={styles.w20}>PDF | Excel</td>
  //             <td className={styles.w20}>PDF | Excel</td>
  //             <td>
  //               <div className="d-flex align-items-center">
  //                 <IconButton
  //                   variant="iconButtonPrimary"
  //                   className={`${styles.tableIconButton} mr-2`}
  //                   description={<MdAdd />}
  //                 />
  //                 <IconButton
  //                   variant="iconButtonPrimary"
  //                   className={`${styles.tableIconButton} ${styles.messageNotificationDot} mr-2`}
  //                   description={<MdTextsms />}
  //                 />
  //                 <Input
  //                   type="select"
  //                   variant="tableDataSelectInput"
  //                   valueForDropDown={[
  //                     "Complied",
  //                     "Not Complied",
  //                     "Not Applicable",
  //                   ]}
  //                 />
  //               </div>
  //             </td>
  //           </tr>
  //           <tr className={styles.dataRow}>
  //             <td className={styles.w40}>
  //               Lorem Ipsum is simply dummy text of the printing and typesetting
  //               industry ?
  //             </td>
  //             <td className={styles.w10}>Amit</td>
  //             <td className={styles.w20}>PDF | Excel</td>
  //             <td className={styles.w20}>PDF | Excel</td>
  //             <td>
  //               <div className="d-flex align-items-center">
  //                 <IconButton
  //                   variant="iconButtonPrimary"
  //                   className={`${styles.tableIconButton} mr-2`}
  //                   description={<MdAdd />}
  //                 />
  //                 <IconButton
  //                   variant="iconButtonPrimary"
  //                   className={`${styles.tableIconButton} ${styles.messageNotificationDot} mr-2`}
  //                   description={<MdTextsms />}
  //                 />
  //                 <Input
  //                   type="select"
  //                   variant="tableDataSelectInput"
  //                   valueForDropDown={[
  //                     "Complied",
  //                     "Not Complied",
  //                     "Not Applicable",
  //                   ]}
  //                 />
  //               </div>
  //             </td>
  //           </tr>
  //           <tr className={styles.dataRow}>
  //             <td className={styles.w40}>
  //               Lorem Ipsum is simply dummy text of the printing and typesetting
  //               industry ?
  //             </td>
  //             <td className={styles.w10}>Amit</td>
  //             <td className={styles.w20}>PDF | Excel</td>
  //             <td className={styles.w20}>PDF | Excel</td>
  //             <td>
  //               <div className="d-flex align-items-center">
  //                 <IconButton
  //                   variant="iconButtonPrimary"
  //                   className={`${styles.tableIconButton} mr-2`}
  //                   description={<MdAdd />}
  //                 />
  //                 <IconButton
  //                   variant="iconButtonPrimary"
  //                   className={`${styles.tableIconButton} ${styles.messageNotificationDot} mr-2`}
  //                   description={<MdTextsms />}
  //                 />
  //                 <Input
  //                   type="select"
  //                   variant="tableDataSelectInput"
  //                   valueForDropDown={[
  //                     "Complied",
  //                     "Not Complied",
  //                     "Not Applicable",
  //                   ]}
  //                 />
  //               </div>
  //             </td>
  //           </tr>
  //           <tr className={styles.dataRow}>
  //             <td className={styles.w40}>
  //               Lorem Ipsum is simply dummy text of the printing and typesetting
  //               industry ?
  //             </td>
  //             <td className={styles.w10}>Amit</td>
  //             <td className={styles.w20}>PDF | Excel</td>
  //             <td className={styles.w20}>PDF | Excel</td>
  //             <td>
  //               <div className="d-flex align-items-center">
  //                 <IconButton
  //                   variant="iconButtonPrimary"
  //                   className={`${styles.tableIconButton} mr-2`}
  //                   description={<MdAdd />}
  //                 />
  //                 <IconButton
  //                   variant="iconButtonPrimary"
  //                   className={`${styles.tableIconButton} ${styles.messageNotificationDot} mr-2`}
  //                   description={<MdTextsms />}
  //                 />
  //                 <Input
  //                   type="select"
  //                   variant="tableDataSelectInput"
  //                   valueForDropDown={[
  //                     "Complied",
  //                     "Not Complied",
  //                     "Not Applicable",
  //                   ]}
  //                 />
  //               </div>
  //             </td>
  //           </tr>
  //         </tbody>
  //       </table>
  //     </div>
  //   );
  // };
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
        padding="500px"
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
          dataField="questions"
          caption="Questions"
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
          dataField="Assign_to"
          caption="Assign to"
          cellRender={customDataCell}
          headerCellRender={customHeaderCell}
        />
        <Column
          dataField="Required_Doc"
          cellRender={customDataCell}
          headerCellRender={customHeaderCell}
        />
        <Column
          dataField="Submited_Doc"
          cellRender={customDataCell}
          headerCellRender={customHeaderCell}
        />
        <Column
          caption="Add Docs"
          cellRender={addAction}
          headerCellRender={customHeaderCell}
          alignment="left"
        />
        <Column
          caption="Comment"
          cellRender={commentAction}
          headerCellRender={customHeaderCell}
          alignment="left"
        />
        <Column
          cellRender={dropdownAction}
          // headerCellRender={customHeaderCell}
          alignment="left"
        />
        {/* <Column
            dataField="questions"
            cellRender={customDataCell}
            headerCellRender={customHeaderCell}
          />
          <Column
            dataField="total_checkpoints"
            caption="Total Checkpoints"
            cellRender={customDataCell}
            headerCellRender={customHeaderCell}
          /> */}
        {/* <MasterDetail enabled={false} component={DropdownDetails} /> */}
        <Export enabled={true} />
        <Selection mode="single" />
      </DataGrid>
    </div>
  );
};
export default Questionnaire;

const data = [
  {
    id: 1,
    section_name: "General Details",
    start_date: "21 Oct, 2021",
    deadline: "21 Oct, 2021",
    questions:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry ?",
    total_checkpoints: "10",
    Required_Doc: "PDF|Excel",
    Submited_Doc: "PDF|Excel",
    Assign_to: "Amit",
  },
  {
    id: 2,
    section_name: "Invoice Details",
    start_date: "21 Oct, 2021",
    deadline: "21 Oct, 2021",
    questions:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry ?",
    Required_Doc: "PDF|Excel",
    Submited_Doc: "PDF|Excel",
    Assign_to: "Ketan",
  },
  {
    id: 3,
    section_name: "Revenue Details",
    start_date: "21 Oct, 2021",
    deadline: "21 Oct, 2021",
    questions:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry ?",
    Required_Doc: "PDF|Excel",
    Submited_Doc: "PDF|Excel",
    Assign_to: "Ketan",
  },
  {
    id: 4,
    section_name: "Revenue Details",
    start_date: "21 Oct, 2021",
    deadline: "21 Oct, 2021",
    questions:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry ?",
    Required_Doc: "PDF|Excel",
    Submited_Doc: "PDF|Excel",
    Assign_to: "Ketan",
  },
];
