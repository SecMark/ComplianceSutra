import {
  DataGrid,
  Column,
  MasterDetail,
  SearchPanel,
  Selection,
  Export,
} from "devextreme-react/data-grid";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdAdd, MdTextsms } from "react-icons/md";
import { toast } from "react-toastify";
import axiosInstance from "../../../../../apiServices";
import IconButton from "../../../components/Buttons/IconButton";
import { Input } from "../../../components/Inputs/Input";
import styles from "./style.module.scss";
const Questionnaire = ({ templateName }) => {
  const [questionnarieData, setQuestionnarieData] = useState([]);
  const [fileList, setFileList] = useState([]);
  const customDataCell = (option) => {
    const { value } = option;
    return (
      <span title={value} className={styles.customDataCell}>
        {value || "-"}
      </span>
    );
  };

  const customHeaderCell = (data) => {
    const { caption, name } = data?.column;
    return <span className={styles.customHeaderCell}>{caption || name}</span>;
  };

  const customFileTypesCell = (data) => {
    const { attachment_type } = data.data;
    return (
      <>
        <span className={styles.customDataCell}>{attachment_type || "-"}</span>
      </>
    );
  };

  const AddTemplateAction = (data) => {
    const { questionnaire_section, question } = data.data;
    return (
      <div className={styles.fileInput}>
        <label htmlFor="file-upload" className={styles.addIconButton}>
          <input
            type="file"
            id="file-upload"
            multiple
            onChange={(e) => handleAddDocs(e, questionnaire_section, question)}
          />
          <MdAdd />
        </label>
      </div>
    );
  };
  const CommentsTemplateAction = () => {
    return (
      <IconButton
        variant="iconButtonPrimary"
        description={<MdTextsms />}
        size="none"
        disabledVariant="iconButtonPrimaryDisabled"
      />
    );
  };

  const getQuestionnarie = async () => {
    try {
      const { data, status } = await axiosInstance.get(
        "audit.api.getQuestionFromAudit",
        { params: { audit_template_name: templateName } }
      );
      if (status === 200 && data?.message?.question_list) {
        const questions = data?.message?.question_list || [];
        setQuestionnarieData(questions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddDocs = async (e, questionnaire_section, question) => {
    const files = e.target.files;
    if (files && files?.length > 0 && questionnaire_section && question) {
      let formData = new FormData();
      formData.append("questionnaire_section", questionnaire_section);
      formData.append("question", question);
      formData.append("reference_document", files);

      try {
        const { data, status } = await axiosInstance.post(
          "audit.api.UpdateQuestionQuestionnaire",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (status === 200 && data) {
          toast.success(data.message.status_response);
        } else {
          toast.error("Something went wrong.");
        }
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  useEffect(() => {
    getQuestionnarie();
  }, []);

  // useEffect(() => {
  //   handleAddDocs();
  //   console.log({ acceptedFiles });
  // }, [acceptedFiles]);

  return (
    <div>
      <DataGrid
        id="dataGrid"
        dataSource={questionnarieData}
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
        export={{
          allowExportSelectedData: true,
          enabled: true,
          texts: {
            exportAll: "Export all data",
            exportSelectedRows: "Export selected rows",
            exportTo: "Export",
          },
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
        <SearchPanel visible={true} width={250} />
        <Column
          dataField="questionnaire_section"
          caption="Section Name"
          cellRender={customDataCell}
          headerCellRender={customHeaderCell}
        />
        <Column
          dataField="question"
          cellRender={customDataCell}
          headerCellRender={customHeaderCell}
          width="300"
        />
        <Column
          dataField="start_date"
          caption="Start Date"
          cellRender={customDataCell}
          headerCellRender={customHeaderCell}
        />
        <Column
          dataField="end_date"
          cellRender={customDataCell}
          headerCellRender={customHeaderCell}
        />

        <Column
          dataField="attachment_type"
          caption="Required Doc."
          cellRender={customFileTypesCell}
          headerCellRender={customHeaderCell}
        />
        <Column
          caption="Add Docs."
          cellRender={AddTemplateAction}
          headerCellRender={customHeaderCell}
        />
        <Column
          caption="Comment"
          cellRender={CommentsTemplateAction}
          headerCellRender={customHeaderCell}
        />

        {/* <Column
          dataField="total_checkpoints"
          caption="Total Checkpoints"
          cellRender={customDataCell}
          headerCellRender={customHeaderCell}
        /> */}
        {/* <MasterDetail enabled={true} component={DropdownDetails} /> */}
        <Selection mode="single" />
        <Export enabled={true} />
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
    req_docs: ["PDF", "Excel"],
  },
  {
    id: 2,
    section_name: "Invoice Details",
    start_date: "21 Oct, 2021",
    deadline: "21 Oct, 2021",
    questions:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry ?",
    req_docs: ["PDF", "Excel"],
  },
  {
    id: 3,
    section_name: "Revenue Details",
    start_date: "21 Oct, 2021",
    deadline: "21 Oct, 2021",
    questions:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry ?",
    req_docs: ["PDF", "Excel"],
  },
  {
    id: 4,
    section_name: "Revenue Details",
    start_date: "21 Oct, 2021",
    deadline: "21 Oct, 2021",
    questions:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry ?",
    req_docs: ["PDF", "Excel"],
  },
];