import insertFileIcon from "../../../../../assets/Icons/insert-file.svg";
import { MdAddCircle, MdLink } from "react-icons/md";
import React, { useEffect, useState } from "react";
import AddReferencesModal from "./AddReferencesModal";
import { useDispatch, useSelector } from "react-redux";
import { actions as taskReportActions } from "../../../../OnBording/SubModules/DashBoardCO/redux/actions";
import { BACKEND_BASE_URL } from "../../../../../apiServices/baseurl";
const References = React.memo(({ taskId }) => {
  const [linkRefs, setLinkRefs] = useState([]);
  const [fileRefs, setFileRefs] = useState([]);
  const [isAddReferencesOpen, setIsAddReferencesOpen] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const files =
    state &&
    state.taskReport &&
    state.taskReport.taskFilesById &&
    state.taskReport.taskFilesById.taskFilesReference;
  const links =
    state &&
    state.taskReport &&
    state.taskReport.getTaskCommentByRole &&
    state.taskReport.getTaskCommentByRole.getTaskLinksByRole;

  useEffect(() => {
    if (files && files !== undefined && files.length !== 0) {
      setFileRefs(files[0].Files);
    } else {
      setFileRefs([]);
    }
    if (links && links !== undefined && links.length !== 0) {
      setLinkRefs(links);
    } else {
      setLinkRefs([]);
    }
  }, [files, links, taskId]);
  const fetchReferences = (taskid) => {
    dispatch(
      taskReportActions.taskCommentsByTaskIdRequest({
        taskid: taskid,
        link: 1,
      })
    );
    dispatch(
      taskReportActions.getTaskFilesById({
        taskID: taskid,
        actionFlag: 0,
        ftype: 1,
      })
    );
  };
  useEffect(() => {
    fetchReferences(taskId);
  }, [taskId]);
  return (
    <>
      <AddReferencesModal
        isOpen={isAddReferencesOpen}
        setIsOpen={setIsAddReferencesOpen}
        taskId={taskId}
        fileRefs={fileRefs}
        lilnkRefs={linkRefs}
        fetchReference={fetchReferences}
      />
      <div className="mt-4">
        {linkRefs &&
          linkRefs.length !== 0 &&
          linkRefs.map((link) => {
            return (
              <div className="d-flex task-data__file-actions justify-content-between my-2">
                <p className="task-data__field-value d-flex align-items-center task-action__file-name">
                  <MdLink /> &nbsp;{link.Comment} By&nbsp;&nbsp;
                  <strong>{link.B[0].UserName}</strong>
                </p>
                <a
                  href={link.Comment}
                  style={{
                    lineHeight: "normal",
                  }}
                  className="task-data__migrate-file-button task-action__button task-action__button--view"
                >
                  View
                </a>
              </div>
            );
          })}
        {fileRefs &&
          fileRefs.length !== 0 &&
          fileRefs.map((item) => {
            return (
              <div className="d-flex task-data__file-actions justify-content-between my-2">
                <p className="task-data__field-value d-flex align-items-center task-action__file-name">
                  <img src={insertFileIcon} alt="file" /> {item.FileName}{" "}
                  By&nbsp;&nbsp;
                  <strong>{item.FullName}</strong>
                </p>
                <button className="task-data__migrate-file-button task-action__button task-action__button--view">
                  View
                </button>
                <a
                  href={`${BACKEND_BASE_URL}/viewfiles.ashx?id=${taskId}&flag=downloadtaskfiles&file=${item.FileName}`}
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
        <button
          className="task-data__add-references d-flex align-items-center my-3"
          onClick={() => setIsAddReferencesOpen(true)}
        >
          <MdAddCircle />
          &nbsp;add references
        </button>
      </div>
    </>
  );
});
export default References;
