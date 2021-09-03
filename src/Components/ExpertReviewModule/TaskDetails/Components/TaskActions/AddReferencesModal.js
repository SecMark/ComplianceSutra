import React from "react";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import Modal from "../../../../../CommonModules/sharedComponents/Modal";
import fileUploadIcon from "../../../../../assets/Icons/fileUploadIcon.png";
import { MdAddCircle, MdLink, MdInsertDriveFile } from "react-icons/md";
import isURL from "validator/lib/isURL";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { actions as taskReportActions } from "../../../../OnBording/SubModules/DashBoardCO/redux/actions";

const AddReferencesModal = ({ isOpen, setIsOpen, taskId, fetchReference }) => {
  const [linkInput, setLinkInput] = useState("");
  const [linksList, setLinksList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const state = useSelector((state) => state);
  const userDetails = state && state.auth && state.auth.loginInfo;
  const dispatch = useDispatch();
  const handleLinkAddMore = () => {
    if (linkInput !== "" && isURL(linkInput)) {
      setLinksList([...linksList, linkInput]);
      setLinkInput("");
    }
  };
  const handleLinkUpload = (comment) => {
    dispatch(
      taskReportActions.postTaskCommentByTaskID({
        actionFlag: 1,
        taskID: taskId,
        comment,
        commentBy: userDetails.UserID,
        link: 1,
      })
    );
  };

  const handleFileUpload = (file) => {
    let formData = [];
    formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formData.append("file", file[i]);
    }
    dispatch(
      taskReportActions.postUploadFileByID({
        taskid: taskId,
        fileData: formData,
        ftype: 1,
        userId: userDetails.UserID,
      })
    );
  };
  const handleAddAttachement = () => {
    if (isURL(linkInput) && fileList.length === 0) {
      handleLinkUpload(linkInput);
    }
    if (linkInput === "" && fileList.length !== 0) {
      handleFileUpload(fileList);
    }
    if (linksList.length !== 0 && fileList.length !== 0) {
      handleFileUpload(fileList);
      handleLinkUpload(linkInput);
    }
    fetchReference(taskId);
    handleClose();
  };
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
  const handleClose = () => {
    if (isOpen) {
      setIsOpen(false);
      setLinkInput("");
      setLinksList([]);
      setFileList([]);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <h4 className="mb-0 add-references__heading mb-3">Send an attachment</h4>
      <div className="add-references__input-item my-2">
        <p className="task-data__field-value add-references__input-label">
          Add a link here
        </p>
        <input
          type="text"
          className="form-control comment__input"
          placeholder="Type or Paste a URL here"
          value={linkInput}
          onChange={(e) => setLinkInput(e.target.value)}
        />
        {linkInput !== "" && !isURL(linkInput) && (
          <small
            style={{
              color: "red",
              fontSize: "8px",
            }}
          >
            Please enter valid URL
          </small>
        )}
        <div className="add-references__attached-links">
          {linksList.length > 0 &&
            linksList.map((item) => (
              <div className="add-references__attached-links-item my-2 d-flex align-items-center">
                <MdLink />
                <p className="add-references__attached-link mb-0 mx-1 task-data__field-value">
                  {item}
                </p>
              </div>
            ))}
        </div>
        {/* <button
          className="add-references__add-more mt-2"
          onClick={handleLinkAddMore}
          disabled={!linkInput !== "" && !isURL(linkInput)}
        >
          add more <MdAddCircle />
        </button> */}
      </div>
      <div className="add-references__input-item mt-4 mb-2">
        <p className="task-data__field-value add-references__input-label">
          Add a file here
        </p>
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
      <div className="add-references__input-title mt-5 mb-2">
        <button
          className="add-references__button"
          onClick={handleAddAttachement}
          disabled={
            !isURL(linkInput) && linksList.length === 0 && fileList.length === 0
          }
          style={{
            opacity:
              !isURL(linkInput) &&
              linksList.length === 0 &&
              fileList.length === 0
                ? "0.6"
                : "1",
          }}
        >
          add attachment
        </button>
        <button
          className="add-references__button add-references__button-stroke"
          onClick={handleClose}
        >
          cancel
        </button>
      </div>
    </Modal>
  );
};

export default AddReferencesModal;
