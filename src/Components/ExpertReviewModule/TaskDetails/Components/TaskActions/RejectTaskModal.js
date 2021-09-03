import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import { MdAttachment, MdInsertDriveFile } from "react-icons/md";
import Modal from "../../../../../CommonModules/sharedComponents/Modal";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { actions as taskReportActions } from "../../../../OnBording/SubModules/DashBoardCO/redux/actions";
const RejectTaskModal = ({
  isOpen,
  setIsOpen,
  taskId,
  licenseCode,
  entityName,
}) => {
  const [feedbackInput, setFeedbackInput] = useState("");
  const [fileList, setFileList] = useState([]);
  const [isRejectTaskEnable, setIsRejectTaskEnable] = useState(false);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const userDetails = state && state.auth && state.auth.loginInfo;
  const handleClose = () => {
    if (isOpen) {
      setIsOpen(false);
      setFeedbackInput("");
      setFileList([]);
    }
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

  const handleFinalRejectTask = () => {
    dispatch(
      taskReportActions.taskAssignByTaskID({
        taskID: taskId,
        userType: 1,
        email: "",
        invitee: "",
        isApproved: 3,
        loginID: userDetails.UserID,
        userDetails,
        LicenseCode: licenseCode,
        EntityName: entityName,
      })
    );
    dispatch(
      taskReportActions.postTaskCommentByTaskID({
        actionFlag: 1,
        taskID: taskId,
        comment: feedbackInput,
        commentBy: userDetails.UserID,
        link: 0,
      })
    );
    handleClose();
  };
  useEffect(() => {
    if (fileList.length !== 0 || feedbackInput !== "") {
      setIsRejectTaskEnable(true);
    } else {
      setIsRejectTaskEnable(false);
    }
  }, [fileList, feedbackInput]);
  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <h4>Do you want to reject this task?</h4>
      <p className="task-data__field-value add-references__input-label">
        Add Feedback Comments
      </p>
      <textarea
        cols="30"
        rows="6"
        className="form-control reject-task__textarea"
        placeholder="Type what can be improved"
        value={feedbackInput}
        onChange={(e) => setFeedbackInput(e.target.value)}
      ></textarea>
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
          <div {...getRootProps({ className: "reject-task__dropzone" })}>
            <input {...getInputProps()} />
            <button className="task-data__migrate-file-button task-data__add-references mt-3">
              add file&nbsp;&nbsp;
              <MdAttachment />
            </button>
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
      <div className="mt-3">
        <button
          className="modal__button"
          disabled={!isRejectTaskEnable}
          style={{
            cursor: !isRejectTaskEnable && "not-allowed",
            opacity: !isRejectTaskEnable && "0.5",
          }}
          onClick={handleFinalRejectTask}
        >
          Yes, Reject Task
        </button>
        <button
          className="modal__button modal__button--stroke"
          onClick={handleClose}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default RejectTaskModal;
