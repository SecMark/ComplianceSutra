import React from "react";

import closeIcon from "../../../assets/Icons/closeIcon.png";

const NewRegulationDetail = ({
  isShowRegulationDetail,
  changeShowRegulationDetail,
  newRegulationDetail,
}) => {
  const detail =
    newRegulationDetail && newRegulationDetail?.getNewRegulationDetailById;
  return (
    <div
      className={`filter-popup detail-popup ${
        isShowRegulationDetail && "popup-open"
      }`}
      style={{
        boxShadow: isShowRegulationDetail
          ? "1px 1px 9999px 9999px rgba(0,0,0,0.7)"
          : "none",
      }}
    >
      <div className="container">
        <img
          src={closeIcon}
          alt="close-icon"
          onClick={changeShowRegulationDetail}
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            cursor: "pointer",
          }}
        />
        <h3>{detail?.Title}</h3>
        <div className="detail-popup-main-content">
          <div
            dangerouslySetInnerHTML={{
              __html: detail?.Gist,
            }}
          />
        </div>
        <div className="detail-popup-main-footer">
          <p>Tags:</p>
          <div className="detail-popup-main-footer-labels">
            <div className="tags">
              <div className="tag-buttons">
                <buton className="tags-button">{detail?.Industry}</buton>
                <buton className="tags-button">{detail?.Topic}</buton>
                <buton className="tags-button">{detail?.Regbodies}</buton>
              </div>
              <a
                href={`${detail?.FileLOcation}${detail?.c_file}`}
                className="download-file"
              >
                Download File
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRegulationDetail;
