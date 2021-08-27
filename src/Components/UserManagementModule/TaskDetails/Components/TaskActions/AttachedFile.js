import insertFileIcon from "../../../../../assets/Icons/insert-file.svg";

const AttachedFile = () => {
  return (
    <div className="mt-4">
      <div className="d-flex task-data__file-actions justify-content-between my-2">
        <p className="task-data__field-value d-flex align-items-center task-action__file-name">
          <img src={insertFileIcon} alt="file" /> GST Statement.pdf
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
          <img src={insertFileIcon} alt="file" /> GST.pdf
        </p>
        <button className="task-data__migrate-file-button task-action__button task-action__button--view">
          View
        </button>
        <button className="task-data__migrate-file-button task-action__button task-action__button--download">
          Download
        </button>
      </div>
    </div>
  );
};

export default AttachedFile;
