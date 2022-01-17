import {
  DataGrid,
  Column,
  MasterDetail,
  SearchPanel,
  Selection,
  Export,
  Grouping,
  GroupPanel,
} from "devextreme-react/data-grid";
import { FileIcon, defaultStyles } from "react-file-icon";
import React, { useEffect, useState } from "react";
import { MdAdd, MdExpandLess, MdExpandMore, MdTextsms } from "react-icons/md";
import axiosInstance from "../../../../../apiServices";
import IconButton from "../../../components/Buttons/IconButton";
import { Input } from "../../../components/Inputs/Input";
import styles from "./style.module.scss";
import ProjectManagementModal from "../../../../ProjectManagement/components/ProjectManagementModal";
import Text from "../../../components/Text/Text";
import { getShortStr } from "../../../../../CommonModules/helpers/GetIntialName.helper";
import { toast } from "react-toastify";
const Checkpoints = ({ templateName }) => {
  const [checkpointsData, setCheckpointsData] = useState([]);
  const [isShowReferenceData, setShowReferenceData] = useState({
    isShowReference: false,
    question: "",
  });
  const [references, setReferences] = useState([]);
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

  const DocsReliedUponCell = (data) => {
    const { value } = data;
    return (
      <>
        {value &&
          value?.length > 0 &&
          value?.map((item) => {
            return (
              <span
                title={item}
                onClick={() =>
                  setShowReferenceData({
                    isShowReference: true,
                    question: item,
                  })
                }
                className={`${styles.customDataCell} ${styles.customDataCellLinkColor} mr-2`}
              >
                {item || "-"}
              </span>
            );
          })}
        {!value && <span className={styles.customDataCell}>-</span>}
      </>
    );
  };
  const AddTemplateAction = (data) => {
    const { checklist_section_id, check_point } = data.data;
    console.log({ checklist_section_id, check_point });
    return (
      <div className={styles.fileInput}>
        <label htmlFor="file-upload" className={styles.addIconButton}>
          <input
            type="file"
            id="file-upload"
            multiple
            onChange={(e) =>
              handleAddDocs(e, checklist_section_id, check_point)
            }
          />
          <MdAdd />
        </label>
      </div>
    );
  };
  const handleAddDocs = async (e, checklist_section_id, checkpoint) => {
    const files = e.target.files;
    if (files && files?.length > 0 && checklist_section_id && checkpoint) {
      let formData = new FormData();
      formData.append("checklist_section_id", checklist_section_id);
      formData.append("check_point", checkpoint);
      formData.append("reference_document", files);

      try {
        const { data, status } = await axiosInstance.post(
          "audit.api.AddChecklist",
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

  const getCheckpoints = async () => {
    try {
      const { data, status } = await axiosInstance.get(
        "audit.api.GetChecklistAndSectionFromAudit",
        { params: { audit_template_name: templateName } }
      );
      if (status === 200 && data?.message?.question_list) {
        const checklist = data?.message?.question_list || [];
        setCheckpointsData(checklist);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getReferences = async () => {
    try {
      const { data, status } = await axiosInstance.get(
        "audit.api.getQuestionDocreferences",
        { params: { question: isShowReferenceData.question } }
      );

      if (status === 200 && data?.message) {
        setReferences(data.message?.file || []);
      } else {
        setReferences([]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCheckpoints();
  }, []);

  useEffect(() => {
    if (isShowReferenceData?.isShowReference && isShowReferenceData?.question) {
      getReferences();
    }
  }, [isShowReferenceData]);

  return (
    <div>
      <ProjectManagementModal
        visible={isShowReferenceData.isShowReference}
        onClose={() => {
          setShowReferenceData({
            isShowReference: false,
            question: "",
          });
          setReferences([]);
        }}
      >
        <div className={styles.header}>
          <Text heading="p" variant="stepperMainHeading" text="References" />
        </div>
        <div
          className={`${
            references?.length > 0 ? styles.file_section : ""
          } mt-3`}
        >
          {references?.length > 0 &&
            references?.map((file) => {
              const file_name = file.file_name?.split(".");
              const extension = file_name?.pop();

              return (
                <div>
                  <div className={styles.file_container}>
                    <FileIcon
                      extension={extension}
                      {...defaultStyles[extension]}
                    />
                  </div>
                  <p className={styles.file_name}>
                    {getShortStr(file_name[0])}
                  </p>
                </div>
              );
            })}
          {references?.length === 0 && (
            <p className={`${styles.file_name} ${styles.notFound}`}>
              No files found
            </p>
          )}
        </div>
      </ProjectManagementModal>
      {checkpointsData && checkpointsData.length > 0 && (
        <DataGrid
          id="dataGrid"
          dataSource={checkpointsData}
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
            dataField="checklist_section"
            caption="Section Name"
            cellRender={customDataCell}
            headerCellRender={customHeaderCell}
          />
          <Column
            dataField="check_point"
            caption="Checkpoint"
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
            dataField="end_date"
            cellRender={customDataCell}
            headerCellRender={customHeaderCell}
          />
          <Column
            dataField="attachment_format"
            caption="File Attached Type"
            cellRender={customDataCell}
            headerCellRender={customHeaderCell}
          />
          <Column
            dataField="documents_relied_upon"
            caption="Docs. Relied Upon"
            cellRender={DocsReliedUponCell}
            headerCellRender={customHeaderCell}
          />
          <Column
            caption="Add Docs."
            cellRender={AddTemplateAction}
            headerCellRender={customHeaderCell}
            allowGrouping={false}
          />
          <Column
            caption="Comment"
            cellRender={CommentsTemplateAction}
            headerCellRender={customHeaderCell}
            allowGrouping={false}
            alignment="center"
          />

          <Selection mode="single" />
          <Export enabled={true} />
          <Grouping contextMenuEnabled={true} />

          <GroupPanel visible={true} allowColumnDragging={true} />
        </DataGrid>
      )}
    </div>
  );
};

export default Checkpoints;
