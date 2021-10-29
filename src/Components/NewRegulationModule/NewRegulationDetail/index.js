import React from "react";

import closeIcon from "../../../assets/Icons/closeIcon.png";

const NewRegulationDetail = ({
  isShowRegulationDetail,
  changeShowRegulationDetail,
  newRegulationDetail,
}) => {
  const detail = newRegulationDetail;
  console.log(detail);
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
        <h3>{detail?.title}</h3>
        <div className="detail-popup-main-content">
          <div
            dangerouslySetInnerHTML={{
              __html: detail?.description,
            }}
          ></div>
        </div>
        <div className="detail-popup-main-footer">
          <p>Tags:</p>
          <div className="detail-popup-main-footer-labels">
            <div className="tags">
              <div className="tag-buttons">
                {detail?.tags &&
                  detail?.tags.map((item) => (
                    <button className="tags-button">{item}</button>
                  ))}
              </div>
              <a
                href={`data:application/${
                  detail?.file_details &&
                  detail?.file_details[0].file_name.split(".").pop()
                };base64,${
                  detail?.file_details && detail?.file_details[0].encoded_string
                }`}
                className="download-file"
                download={
                  detail?.file_details && detail?.file_details[0].file_name
                }
                target="_blank"
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
