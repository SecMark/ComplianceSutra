import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Dropzone from "react-dropzone";
import { BACKEND_BASE_URL } from "../../../../../apiServices/baseurl";
import insertFileIcon from "../../../../../assets/Icons/insert-file.svg";
import fileUploadIcon from "../../../../../assets/Icons/fileUploadIcon.png";
import { actions as taskReportActions } from "../../../../OnBording/SubModules/DashBoardCO/redux/actions";
import { MdInsertDriveFile } from "react-icons/md";

const AttachedFile = React.memo(({ taskId }) => {
  const [taskFiles, setTaskFiles] = useState([]);
  const [fileList, setFileList] = useState([]);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const files =
    state &&
    state.taskReport &&
    state.taskReport.taskFilesById &&
    state.taskReport.taskFilesById.taskFiles;

  const handleUploadFile = (file) => {
    const _fileList = (fileList && fileList[0] && fileList[0].Files) || [];
    let isAlreadyPresent = false;
    let filesArray = [];
    file.forEach((file) => {
      isAlreadyPresent = _fileList.some(
        (element) => element.FileName === file.name
      );
      if (!isAlreadyPresent) {
        filesArray.push(file);
      } else {
        toast.error(`File ${file.name} is already exists.`);
        return;
      }
    });
    setFileList(filesArray);
  };
  useEffect(() => {
    dispatch(
      taskReportActions.getTaskFilesById({
        taskID: taskId,
        actionFlag: 0,
        ftype: 0,
      })
    );
  }, [taskId]);

  useEffect(() => {
    if (files && files !== undefined && files.length !== 0) {
      setTaskFiles(files[0]);
    }
  }, [files]);
  return (
    <div className="mt-4">
      {taskFiles &&
        taskFiles.length !== 0 &&
        taskFiles.Files &&
        taskFiles.Files.length !== 0 &&
        taskFiles.Files.map((item) => {
          return (
            <div className="d-flex task-data__file-actions justify-content-between my-2">
              <p className="task-data__field-value d-flex align-items-center task-action__file-name">
                <img src={insertFileIcon} alt="file" /> {item.FileName}
              </p>
              <button className="task-data__migrate-file-button task-action__button task-action__button--view">
                View
              </button>
              <a
                href={`${BACKEND_BASE_URL}/viewfiles.ashx?id=${taskFiles.TaskId}&flag=downloadtaskfiles&file=${item.FileName}`}
                className="task-data__migrate-file-button task-action__button task-action__button--download"
                style={{
                  lineHeight: "normal",
                }}
              >
                Download
              </a>
            </div>
          );
        })}
      {taskFiles && taskFiles.length === 0 && <p>No Files Available</p>}
      {false && (
        <Dropzone
          multiple={true}
          maxSize={26214400}
          accept=".png,.jpg,
      application/pdf,application/rtf,application/msword,image/bmp,
      application/vnd.ms-excel,image/tiff,image/tif,image/jpeg,
      application/ms-excel,
      .tiff,.pdf,.doc,.docx,
      .XLS,.xlsx,.CSV,.zip,.rar,.txt"
          onDrop={(acceptedFiles) => handleUploadFile(acceptedFiles)}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ className: "add-references__dropzone" })}>
              <input {...getInputProps()} />
              <img src={fileUploadIcon} alt="file-upload-icon" className="" />
              <p className="add-references__dropzone-title">
                Drag and drop your files here or{" "}
                <span className="add-references__dropzone-title--blue">
                  Upload files
                </span>
              </p>
            </div>
          )}
        </Dropzone>
      )}
      {fileList.length > 0 &&
        fileList.map((item) => {
          const { name } = item;
          return (
            <div className="add-references__attached-links-item my-2 d-flex align-items-center">
              <MdInsertDriveFile />
              <p className="add-references__attached-link mb-0 mx-1 task-data__field-value">
                {name}
              </p>
            </div>
          );
        })}
    </div>
  );
});

export default AttachedFile;
