import {
    DataGrid,
    Column,
    MasterDetail,
    SearchPanel,
  } from "devextreme-react/data-grid";
  import React from "react";
  import { MdAdd, MdTextsms } from "react-icons/md";
  import IconButton from "../../../components/Buttons/IconButton";
  import { Input } from "../../../components/Inputs/Input";
  import styles from "./style.module.scss";
  const Questionnaire = () => {
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
    const DropdownDetails = (data) => {
      return (
        <div className={styles.masterDetailsContainer}>
          <table className={styles.questionnarieCustomTable}>
            <tr className={styles.headingRow}>
              <th className={styles.w40}>Questions</th>
              <th className={styles.w10}>Assign to</th> 
              <th className={styles.w20}>Required Docs</th>
              <th className={styles.w20}>Submited Docs</th>
              <th></th>
            </tr>
            <tr className={styles.dataRow}>
              <td className={styles.w40}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry ?
              </td>
              <td className={styles.w10}>Amit</td>
              <td className={styles.w20}>PDF | Excel</td>
              <td className={styles.w20}>PDF | Excel</td>
              <td>
                <div className="d-flex align-items-center">
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
                  <Input
                    type="select"
                    variant="tableDataSelectInput"
                    valueForDropDown={[
                      "Complied",
                      "Not Complied",
                      "Not Applicable",
                    ]}
                  />
                </div>
              </td>
            </tr>
            <tr className={styles.dataRow}>
              <td className={styles.w40}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry ?
              </td>
              <td className={styles.w10}>Amit</td>
              <td className={styles.w20}>PDF | Excel</td>
              <td className={styles.w20}>PDF | Excel</td>
              <td>
                <div className="d-flex align-items-center">
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
                  <Input
                    type="select"
                    variant="tableDataSelectInput"
                    valueForDropDown={[
                      "Complied",
                      "Not Complied",
                      "Not Applicable",
                    ]}
                  />
                </div>
              </td>
            </tr>
            <tr className={styles.dataRow}>
              <td className={styles.w40}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry ?
              </td>
              <td className={styles.w10}>Amit</td>
              <td className={styles.w20}>PDF | Excel</td>
              <td className={styles.w20}>PDF | Excel</td>
              <td>
                <div className="d-flex align-items-center">
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
                  <Input
                    type="select"
                    variant="tableDataSelectInput"
                    valueForDropDown={[
                      "Complied",
                      "Not Complied",
                      "Not Applicable",
                    ]}
                  />
                </div>
              </td>
            </tr>
            <tr className={styles.dataRow}>
              <td className={styles.w40}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry ?
              </td>
              <td className={styles.w10}>Amit</td>
              <td className={styles.w20}>PDF | Excel</td>
              <td className={styles.w20}>PDF | Excel</td>
              <td>
                <div className="d-flex align-items-center">
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
                  <Input
                    type="select"
                    variant="tableDataSelectInput"
                    valueForDropDown={[
                      "Complied",
                      "Not Complied",
                      "Not Applicable",
                    ]}
                  />
                </div>
              </td>
            </tr>
          </table>
        </div>
      );
    };
  
    return (
      <div>
        <DataGrid
          id="dataGrid"
          dataSource={data}
          columnAutoWidth={true}
          allowColumnReordering={true}
          paging={{ pageSize: 6 }}
          showColumnLines={false}
          showBorders={false}
          showRowLines={false}
          wordWrapEnabled={true}
          width="100%"
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
          <SearchPanel visible={true} width={250} />
          <Column
            dataField="section_name"
            caption="Section Name"
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
            dataField="questions"
            cellRender={customDataCell}
            headerCellRender={customHeaderCell}
          />
          {/* <Column
            dataField="total_checkpoints"
            caption="Total Checkpoints"
            cellRender={customDataCell}
            headerCellRender={customHeaderCell}
          /> */}
          <MasterDetail enabled={true} component={DropdownDetails} />
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
      questions: "10",
      total_checkpoints: "10",
    },
    {
      id: 2,
      section_name: "Invoice Details",
      start_date: "21 Oct, 2021",
      deadline: "21 Oct, 2021",
      questions: "5",
      total_checkpoints: "9",
    },
    {
      id: 3,
      section_name: "Revenue Details",
      start_date: "21 Oct, 2021",
      deadline: "21 Oct, 2021",
      questions: "10",
      total_checkpoints: "20",
    },
    {
      id: 4,
      section_name: "Revenue Details",
      start_date: "21 Oct, 2021",
      deadline: "21 Oct, 2021",
      questions: "10",
      total_checkpoints: "20",
    },
  ];
  