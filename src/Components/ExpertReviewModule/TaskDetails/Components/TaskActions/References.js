import insertFileIcon from "../../../../../assets/Icons/insert-file.svg";
import { MdAddCircle } from "react-icons/md";
import { useState } from "react";
import AddReferencesModal from "./AddReferencesModal";
const References = () => {
  const [isAddReferencesOpen, setIsAddReferencesOpen] = useState(false);

  return (
    <>
      <AddReferencesModal
        isOpen={isAddReferencesOpen}
        setIsOpen={setIsAddReferencesOpen}
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
};
export default References;
