import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { MdAddCircle, MdInsertDriveFile, MdLink } from "react-icons/md";
import { toast } from "react-toastify";
import isURL from "validator/lib/isURL";
const TaskReferences = () => {
  const [fileList, setFileList] = useState([]);
  const [referencesLinks, setReferencesLinks] = useState({
    linksList: [],
    linkInput: "",
  });
  const handleLinkAddMore = () => {
    if (referencesLinks.linkInput !== "" && isURL(referencesLinks.linkInput)) {
      setReferencesLinks({
        ...referencesLinks,
        linksList: [...referencesLinks.linksList, referencesLinks.linkInput],
        linkInput: "",
      });
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
  return (
    <>
      <div className="task-details__row mb-5 w-100">
        <div className="col-12 col-md-8">
          <h6>Files</h6>
          {fileList &&
            fileList.length > 0 &&
            fileList.map((item) => {
              const { name } = item;
              return (
                <div className="add-references__attached-links-item my-2 d-flex align-items-center">
                  <MdInsertDriveFile />
                  <p className="add-references__attached-link mb-0 mx-1 task-data__field-value">
                    {name}
                  </p>

                  <button className="task-details__button task-details__button--stroke">
                    view
                  </button>
                  <button className="task-details__button task-details__button--stroke">
                    delete
                  </button>
                </div>
              );
            })}
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
                <button className="d-flex align-items-center task-details__button task-details__button--stroke p-0">
                  <MdAddCircle />
                  &nbsp;add new file
                </button>
              </div>
            )}
          </Dropzone>
        </div>
      </div>
      <div className="task-details__row mb-5 w-100">
        <div className="col-12 col-md-8">
          <h6>Links</h6>
          {referencesLinks.linksList.length > 0 &&
            referencesLinks.linksList.map((item) => (
              <div className="add-references__attached-links-item my-2 d-flex align-items-center">
                <MdLink />
                <p
                  className="add-references__attached-link mb-0 mx-1 task-data__field-value"
                  style={{
                    textTransform: "lowercase",
                  }}
                >
                  {item}
                </p>
                <a
                  href={item}
                  className="task-details__button task-details__button--stroke"
                >
                  view
                </a>
                <button className="task-details__button task-details__button--stroke">
                  delete
                </button>
              </div>
            ))}
          <input
            type="text"
            className="form-control comment__input"
            placeholder="Type or Paste a URL here"
            value={referencesLinks.linkInput}
            onChange={(e) =>
              setReferencesLinks({
                ...referencesLinks,
                linkInput: e.target.value,
              })
            }
            style={{
              width: "250px",
              ...(referencesLinks.linkInput !== "" &&
                !isURL(referencesLinks.linkInput) && {
                  border: "1px solid red",
                }),
            }}
          />
          {referencesLinks.linkInput !== "" &&
            !isURL(referencesLinks.linkInput) && (
              <small
                style={{
                  color: "red",
                  fontSize: "8px",
                }}
              >
                Please enter valid URL
              </small>
            )}
        </div>
        <button
          className="d-flex align-items-center task-details__button task-details__button--stroke"
          onClick={handleLinkAddMore}
          disabled={!isURL(referencesLinks.linkInput)}
          style={{
            ...(!isURL(referencesLinks.linkInput) && { opacity: "0.5" }),
          }}
        >
          <MdAddCircle />
          &nbsp;add new link
        </button>
      </div>
      <div className="task-details__row mb-5 w-100">
        <div className="col-6 col-md-12">
          <h6>Frequently Asked Questions</h6>
        </div>
        <div className="col-12 col-md-8 task-details__references-faqs py-2 ml-0 ml-md-3 mb-3">
          <div className="d-flex align-items-center justify-content-between px-2">
            <h6 className="task-details__references-faqs-heading mb-0">
              01 - What is GST subsidiary form?
            </h6>
            <button className="task-details__button task-details__button--stroke">
              edit
            </button>
          </div>
          <p className="task-details__refrences-faqs-paragraph px-2">
            GSTR-3 is a monthly return with the summarized details of sales,
            purchases, sales during the month along with the amount of GST
            liability. This return is auto-generated pulling information from
            GSTR-1 and GSTR-2
          </p>
        </div>
        <div className="col-12 col-md-8 task-details__references-faqs py-2 ml-0 ml-md-3">
          <div className="d-flex align-items-center justify-content-between px-2">
            <h6 className="task-details__references-faqs-heading mb-0">
              01 - What is GST subsidiary form?
            </h6>
            <button className="task-details__button task-details__button--stroke">
              edit
            </button>
          </div>
          <p className="task-details__refrences-faqs-paragraph px-2">
            GSTR-3 is a monthly return with the summarized details of sales,
            purchases, sales during the month along with the amount of GST
            liability. This return is auto-generated pulling information from
            GSTR-1 and GSTR-2
          </p>
        </div>
        <button className="d-flex align-items-center task-details__button task-details__button--stroke">
          <MdAddCircle />
          &nbsp;add new question
        </button>
      </div>
    </>
  );
};

export default TaskReferences;
