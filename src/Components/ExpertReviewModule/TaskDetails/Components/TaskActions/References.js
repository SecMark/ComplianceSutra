import insertFileIcon from "../../../../../assets/Icons/insert-file.svg";
import { MdAddCircle } from "react-icons/md";
import React, { useEffect, useState } from "react";
import AddReferencesModal from "./AddReferencesModal";
import { useDispatch, useSelector } from "react-redux";
const References = React.memo(({ taskId }) => {
  const [linkRefs, setLinkRefs] = useState([]);
  const [fileRefs, setFileRefs] = useState([]);
  const [isAddReferencesOpen, setIsAddReferencesOpen] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log(state);
  const files =
    state &&
    state.taskReport &&
    state.taskReport.taskFilesById &&
    state.taskReport.taskFilesById.taskFiles;
  const links =
    state &&
    state.taskReport &&
    state.taskReport.getTaskCommentByRole &&
    state.taskReport.getTaskCommentByRole.getTaskCommentByRole;

  useEffect(() => {
    if (files && files !== undefined && files.length !== 0) {
      setFileRefs(files);
    }
    if (links && links !== undefined && links.length !== 0) {
      setLinkRefs(files);
    }
  }, [files, links]);
  return (
    <>
      <AddReferencesModal
        isOpen={isAddReferencesOpen}
        setIsOpen={setIsAddReferencesOpen}
        taskId={taskId}
        fileRefs={fileRefs}
        lilnkRefs={linkRefs}
      />
      <div className="mt-4">
        <div className="d-flex task-data__file-actions justify-content-between my-2">
          <p className="task-data__field-value d-flex align-items-center task-action__file-name">
            <img src={insertFileIcon} alt="file" /> Holding Statement.pdf
          </p>
          <button className="task-data__migrate-file-button task-action__button task-action__button--view">
            View
          </button>
          <button className="task-data__migrate-file-button task-action__button task-action__button--download">
            Download
          </button>
        </div>
        <div className="d-flex task-data__file-actions justify-content-between my-2">
          <p className="task-data__field-value d-flex align-items-center task-action__file-name">
            <img src={insertFileIcon} alt="file" /> Validation Form.pdf
          </p>
          <button className="task-data__migrate-file-button task-action__button task-action__button--view">
            View
          </button>
          <button className="task-data__migrate-file-button task-action__button task-action__button--download">
            Download
          </button>
        </div>
        <div className="d-flex task-data__file-actions justify-content-between my-2">
          <p className="task-data__field-value d-flex align-items-center task-action__file-name">
            <img src={insertFileIcon} alt="file" /> Holding Statement.pdf
          </p>
          <button className="task-data__migrate-file-button task-action__button task-action__button--view">
            View
          </button>
          <button className="task-data__migrate-file-button task-action__button task-action__button--download">
            Download
          </button>
        </div>
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
