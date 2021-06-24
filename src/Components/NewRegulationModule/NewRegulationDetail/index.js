import React from "react";
import closeIcon from "../../../assets/Icons/closeIcon.png";

const NewRegulationDetail = ({
  isShowRegulationDetail,
  changeShowRegulationDetail,
  newRegulationDetail,
}) => {
  const { id, Title, Submissiondate } =
    newRegulationDetail.getNewRegulationDetailById;
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
              <h1> {Title}</h1>
              <span>
                NISM through its website has informed that it has extended the
                validity of certificates of all those NISM certificate holders
                who could not appear or attend or enroll for certification
                examinations or CPE / eCPE programmes and as such, could not
                renew / are not in a position to renew their certificates,
                during of March 15, 2020 to June 30, 2021 till July 1, 2021, (or
                any time period based on future developments / the Government
                directions). For more information click on the below link:
              </span>
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
