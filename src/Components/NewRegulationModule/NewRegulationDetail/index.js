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
        <div className="popup-header d-flex my-5">
          <div className="TopContent">
            <div className="CloseSidebar">
              <img
                src={closeIcon}
                alt="close-icon"
                onClick={changeShowRegulationDetail}
                style={{
                  marginRight: "2rem",
                  cursor: "pointer",
                }}
              />
            </div>
            <div className="SidebarContent">
              <h1> {detail?.Title}</h1>
              <span
                dangerouslySetInnerHTML={{
                  __html: detail?.Gist,
                }}
              ></span>
            </div>
          </div>

          <div className="SidebarFooter">
            <p>Tags</p>
            <div className="tags">
              <div className="tag-buttons">
                <buton className="tags-button">Stock Marketing</buton>
                <buton className="tags-button">Stock Marketing</buton>
                <buton className="tags-button">Stock Marketing</buton>
              </div>
              <button className="download-file">Download File</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRegulationDetail;
