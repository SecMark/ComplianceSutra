import React, { useEffect, useState } from "react";
import styles from "../../WorkStatus/style.module.scss";
import classes from "./style.module.scss";
import Text from "../../../../components/Text/Text";
import IconButton from "../../../../components/Buttons/IconButton";
import {
  MdAddBox,
  MdKeyboardArrowRight,
  MdTextsms
} from "react-icons/md";
import {GrDocumentPdf} from "react-icons/gr"
import {SiMicrosoftexcel} from "react-icons/si";
import {RiEdit2Fill} from "react-icons/ri"
import { useHistory, useRouteMatch } from "react-router";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";

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
import Container from "../../../../components/Containers";
import axiosInstance from "../../../../../../apiServices";

function Questionnaire() {
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [auditTemplatesData, setAuditTemplatesData] = useState([
      {
          template_name:"tax audit",
          assignment_name:"taxt audit",
          section_name:"Genral Details",
          questions:"lorem ispusm lorem ipsum",
          assign_name:"Amit",
          start_date:"21 Jan,2021",
          dead_line:"21 july,2021",
          required_documents:"PDF",
          submited_document:"Excel"
          
      },
      {
        template_name:"tax audit",
          assignment_name:"taxt audit",
          section_name:"Genral Details",
          questions:"lorem ispusm lorem ipsum",
          assign_name:"Amit",
          start_date:"21 Jan,2021",
          dead_line:"21 july,2021",
          required_documents:"Excel",
          submited_document:"PDF|Excel"
          
    },
    {
      template_name:"tax audit",
      assignment_name:"taxt audit",
      section_name:"Genral Details",
      questions:"lorem ispusm lorem ipsum",
      assign_name:"Amit",
      start_date:"21 Jan,2021",
      dead_line:"21 july,2021",
      required_documents:"Excel",
      submited_document:"PDF|Excel"
      
    },
    {
      template_name:"tax audit",
      assignment_name:"taxt audit",
      section_name:"Genral Details",
      questions:"lorem ispusm lorem ipsum",
      assign_name:"Amit",
      start_date:"21 Jan,2021",
      dead_line:"21 july,2021",
      required_documents:"PDF",
      submited_document:"PDF|Excel"
      
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


  const documentFields = (data) =>{
    const value = data?.value;
    return (
      <span className={styles.balckTextCell} title={value}>
           {value === "PDF" ?(<><GrDocumentPdf
            className={classes.pdficon}
           />{value}&nbsp;</>):(<><SiMicrosoftexcel/>{value}</>)}
      </span>
    );
  }
  
  const CompanyActions = (data) => {
    return (
      <div className="d-flex justify-content-between align-items-center">
        <IconButton
          onClick={() => {
            history.push("/CurrentWork-questionAndCheckPoints");
          }}
          variant="iconButtonRound"
          description={<MdKeyboardArrowRight />}
          size="none"
        />
      </div>
    );
  };

  const CommentAction = (data) =>{
    return (
      <div className="d-flex justify-content-between align-items-center">
        <IconButton
          variant="iconButtonPrimary"
          className={`${classes.tableIconButton} ${classes.messageNotificationDot} mr-2`}
          description={<MdTextsms />}
          size="none"
        />
      </div>
    );
  }

  const RequiredDataCell = (data) => {
      console.log("required cell data",data);
    const value = data?.value;
    return (
      <span className={styles.textBlueDataCell}>
        {value}&nbsp;
      </span>
    );
  };

 
  const checkPointsAndQuestions = (data) =>{
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
  }
  
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
          onExporting={exportGrid}
          showColumnLines={false}
          showBorders={false}
          showRowLines={false}
          wordWrapEnabled={true}
          selection={{
            mode: "multiple",
            showCheckBoxesMode: "always",
          }}
          width="100%"
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
            dataField="template_name"
            caption="Template Name"
            headerCellRender={renderTitleHeader}
            cellRender={companyFieldCell}
          >
            <RequiredRule />
          </Column>
          <Column
            dataField="assignment_name"
            caption="Assignment Name"
            cellRender={companyFieldCell}
            headerCellRender={renderTitleHeader}
            alignment="left"
          >
            <RequiredRule />
          </Column>
          <Column
            dataField="section_name"
            caption="Section Name"
            cellRender={companyFieldCell}
            headerCellRender={renderTitleHeader}
          >
            <RequiredRule />
          </Column>
          <Column
            dataField="questions"
            caption="Checkpoints"
            headerCellRender={renderTitleHeader}
            cellRender={companyFieldCell}
            alignment="left"
          />
          <Column
            dataField="assign_name"
            caption="Assign To"
            headerCellRender={renderTitleHeader}
            cellRender={companyFieldCell}
            alignment="left"
          />
           <Column
            dataField="start_date"
            caption="Start Date"
            headerCellRender={renderTitleHeader}
            cellRender={companyFieldCell}
            alignment="left"
          />
           <Column
            dataField="dead_line"
            caption="Dead line"
            headerCellRender={renderTitleHeader}
            cellRender={companyFieldCell}
            alignment="left"
          />
           <Column
            dataField="required_documents"
            caption="Required Document"
            headerCellRender={renderTitleHeader}
            cellRender={documentFields}
            alignment="left"
          />
           <Column
            dataField="submited_document"
            caption="Submited Doc"
            headerCellRender={renderTitleHeader}
            cellRender={companyFieldCell}
            alignment="left"
          />
           <Column
            caption="Comment"
            headerCellRender={renderTitleHeader}
            cellRender={CommentAction}
            alignment="left"
          />
          
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

export default Questionnaire;


























// import {
//   DataGrid,
//   Column,
//   MasterDetail,
//   SearchPanel,
// } from "devextreme-react/data-grid";
// import React from "react";
// import { MdAdd, MdTextsms } from "react-icons/md";
// import IconButton from "../../../../components/Buttons/IconButton";
// import { Input } from "../../../../components/Inputs/Input";
// import styles from "./style.module.scss";
// const Questionnaire = () => {
//   const customDataCell = (option) => {
//     const { value } = option;
//     return (
//       <span title={value} className={styles.customDataCell}>
//         {value}
//       </span>
//     );
//   };

//   const customHeaderCell = (data) => {
//     const { caption, name } = data?.column;
//     return <span className={styles.customHeaderCell}>{caption || name}</span>;
//   };
//   const DropdownDetails = (data) => {
//     return (
//       <div className={styles.masterDetailsContainer}>
//         <table className={styles.questionnarieCustomTable}>
//           <tr className={styles.headingRow}>
//             <th className={styles.w40}>Questions</th>
//             <th className={styles.w20}>Required Docs</th>
//             <th className={styles.w20}>Checkpoints</th>
//             <th></th>
//           </tr>
//           <tr className={styles.dataRow}>
//             <td className={styles.w40}>
//               Lorem Ipsum is simply dummy text of the printing and typesetting
//               industry ?
//             </td>
//             <td className={styles.w20}>PDF | Excel</td>
//             <td className={styles.w20}>3 Checks</td>
//             <td>
//               <div className="d-flex justify-content-end">
                
//                 <IconButton
//                   variant="iconButtonPrimary"
//                   className={`${styles.tableIconButton} ${styles.messageNotificationDot} mr-2`}
//                   description={<MdTextsms />}
//                 />
               
//               </div>
//             </td>
//           </tr>
//           <tr className={styles.dataRow}>
//             <td className={styles.w40}>
//               Lorem Ipsum is simply dummy text of the printing and typesetting
//               industry ?
//             </td>
//             <td className={styles.w20}>PDF | Excel</td>
//             <td className={styles.w20}>3 Checks</td>
//             <td>
//               <div className="d-flex justify-content-end">
                
//                 <IconButton
//                   variant="iconButtonPrimary"
//                   className={`${styles.tableIconButton} ${styles.messageNotificationDot} mr-2`}
//                   description={<MdTextsms />}
//                 />
                
//               </div>
//             </td>
//           </tr>
//           <tr className={styles.dataRow}>
//             <td className={styles.w40}>
//               Lorem Ipsum is simply dummy text of the printing and typesetting
//               industry ?
//             </td>
//             <td className={styles.w20}>PDF | Excel</td>
//             <td className={styles.w20}>3 Checks</td>
//             <td>
//               <div className="d-flex justify-content-end">
               
//                 <IconButton
//                   variant="iconButtonPrimary"
//                   className={`${styles.tableIconButton} ${styles.messageNotificationDot} mr-2`}
//                   description={<MdTextsms />}
//                 />
               
//               </div>
//             </td>
//           </tr>
//           <tr className={styles.dataRow}>
//             <td className={styles.w40}>
//               Lorem Ipsum is simply dummy text of the printing and typesetting
//               industry ?
//             </td>
//             <td className={styles.w20}>PDF | Excel</td>
//             <td className={styles.w20}>3 Checks</td>
//             <td>
//               <div className="d-flex justify-content-end">
               
//                 <IconButton
//                   variant="iconButtonPrimary"
//                   className={`${styles.tableIconButton} ${styles.messageNotificationDot} mr-2`}
//                   description={<MdTextsms />}
//                 />
              
//               </div>
//             </td>
//           </tr>
//         </table>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <DataGrid
//         id="dataGrid"
//         dataSource={data}
//         columnAutoWidth={true}
//         allowColumnReordering={true}
//         paging={{ pageSize: 6 }}
//         showColumnLines={false}
//         showBorders={false}
//         showRowLines={false}
//         wordWrapEnabled={true}
//         width="100%"
//         scrolling={{
//           columnRenderingMode: "standard",
//           mode: "standard",
//           preloadEnabled: false,
//           renderAsync: undefined,
//           rowRenderingMode: "virtual",
//           scrollByContent: true,
//           scrollByThumb: false,
//           showScrollbar: "onHover",
//           useNative: "auto",
//         }}
//       >
//         <SearchPanel visible={true} width={250} />
//         <Column
//           dataField="section_name"
//           caption="Section Name"
//           cellRender={customDataCell}
//           headerCellRender={customHeaderCell}
//         />
//         <Column
//           dataField="start_date"
//           caption="Start Date"
//           cellRender={customDataCell}
//           headerCellRender={customHeaderCell}
//         />
//         <Column
//           dataField="deadline"
//           cellRender={customDataCell}
//           headerCellRender={customHeaderCell}
//         />
//         <Column
//           dataField="questions"
//           cellRender={customDataCell}
//           headerCellRender={customHeaderCell}
//         />
//         <Column
//           dataField="total_checkpoints"
//           caption="Total Checkpoints"
//           cellRender={customDataCell}
//           headerCellRender={customHeaderCell}
//         />
//         <MasterDetail enabled={true} component={DropdownDetails} />
//       </DataGrid>
//     </div>
//   );
// };

// export default Questionnaire;
// const data = [
//   {
//     id: 1,
//     section_name: "General Details",
//     start_date: "21 Oct, 2021",
//     deadline: "21 Oct, 2021",
//     questions: "10",
//     total_checkpoints: "10",
//   },
//   {
//     id: 2,
//     section_name: "Invoice Details",
//     start_date: "21 Oct, 2021",
//     deadline: "21 Oct, 2021",
//     questions: "5",
//     total_checkpoints: "9",
//   },
//   {
//     id: 3,
//     section_name: "Revenue Details",
//     start_date: "21 Oct, 2021",
//     deadline: "21 Oct, 2021",
//     questions: "10",
//     total_checkpoints: "20",
//   },
//   {
//     id: 4,
//     section_name: "Revenue Details",
//     start_date: "21 Oct, 2021",
//     deadline: "21 Oct, 2021",
//     questions: "10",
//     total_checkpoints: "20",
//   },
// ];
