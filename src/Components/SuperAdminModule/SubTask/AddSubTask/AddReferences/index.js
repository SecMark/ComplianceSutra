import React, { useState } from "react";
import "./style.css";
import { AiFillPlusCircle, AiFillFile } from "react-icons/ai";
import { MdAddCircle, MdLink } from "react-icons/md";
import isURL from "validator/lib/isURL";

function AddReferences({
  state,
  referencesLinks,
  handleLinkAddMore,
  fileUpload,
  setReferencesLinks,
}) {
  return (
    <div>
      <div>
        <h6 className="RD-document">Reference Documents</h6>
        {/* <button className="RD-fileadd" type="file">
          <AiFillPlusCircle className="BD-Add-button" />{" "}
          <span className="BD-Addtempo">ADD New File</span>
          
        </button> */}
        <div>
          {state.files.map((files, i) => (
            <div>
              <div className="RD-filesinput">
                <h1 className="RD-filebox">
                  <AiFillFile style={{ color: "black" }} /> {files.name}{" "}
                </h1>
              </div>
            </div>
          ))}
        </div>
        <div>
          <label class="custom-file-upload" onChange={fileUpload}>
            <input multiple="multiple" className="RD-fileadd" type="file" />
            <AiFillPlusCircle className="BD-Add-button" />{" "}
            <span className="BD-Addtempo">ADD New File</span>
          </label>
        </div>
        <div>
          <h6 className="RD-document">Reference Links</h6>
          {referencesLinks.linksList.length > 0 &&
            referencesLinks.linksList.map((item) => (
              <div className="add-references__attached-links-item my-2 d-flex align-items-center">
                <div
                  className="AR-links mb-0 mx-1"
                  style={{
                    textTransform: "lowercase",
                  }}
                >
                  <h1 className="RD-Link">{item}</h1>
                </div>
                <button className="task-details__button task-details__button--stroke">
                  delete
                </button>
              </div>
            ))}
          <input
            type="text"
            className="form-control AR-links"
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
      </div>
    </div>
  );
}

export default AddReferences;
