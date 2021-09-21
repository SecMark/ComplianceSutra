import React, { useState } from "react";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdMoreVert,
} from "react-icons/md";
import { useOuterClick } from "../../OnBording/SubModules/DashBoardCO/components/RightSideGrid/outerClick";

const TeamPerformance = () => {
  const [openViewMoreIndex, setOpenViewMoreIndex] = useState(null);

  const handleOpenIndex = (index) => {
    if (openViewMoreIndex === index) {
      setOpenViewMoreIndex(null);
    } else {
      setOpenViewMoreIndex(index);
    }
  };
  const viewMoreRef = useOuterClick(() => {
    if (openViewMoreIndex) {
      setOpenViewMoreIndex(null);
    }
  });
  return (
    <div className="team-performance my-3">
      <div className="team-performance__navigation">
        <MdKeyboardArrowLeft className="team-performance__navigation-item team-performance__navigation-item--arrow" />
        <span className="team-performance__navigation-month team-performance__navigation-item mx-2">
          May 2021
        </span>
        <MdKeyboardArrowRight className="team-performance__navigation-item team-performance__navigation-item--arrow" />
      </div>
      <div className="d-flex align-items-center position-relative my-3 w-100">
        <div className="name-circle-badge">AS</div>
        <p className="team-performance__task-title mb-0 ml-2">Animesh Mishra</p>
        <div className="team-performance__task-performance d-flex align-items-center justify-content-end mr-5">
          <div className="team-performance__task-performance-item team-performance__task-performance-item--completed"></div>
          <div className="team-performance__task-performance-item "></div>
          <div className="team-performance__task-performance-item"></div>
          <div className="team-performance__task-performance-item team-performance__task-performance-item--overdue"></div>
          <div className="team-performance__task-performance-item"></div>
        </div>
        <MdMoreVert
          onClick={() => handleOpenIndex(2)}
          style={{
            cursor: "pointer",
          }}
        />
        {openViewMoreIndex === 2 && (
          <div
            ref={viewMoreRef}
            className="team-performance__view-more d-flex align-items-center"
          >
            <p className="team-performance__task-title px-2 mb-0">Show Tasks</p>
          </div>
        )}
      </div>
      <div className="d-flex align-items-center position-relative my-3 w-100">
        <div className="name-circle-badge">AS</div>
        <p className="team-performance__task-title mb-0 ml-2">Animesh Mishra</p>
        <div className="team-performance__task-performance d-flex align-items-center justify-content-end mr-5">
          <div className="team-performance__task-performance-item team-performance__task-performance-item--completed"></div>
          <div className="team-performance__task-performance-item "></div>
          <div className="team-performance__task-performance-item"></div>
          <div className="team-performance__task-performance-item team-performance__task-performance-item--overdue"></div>
          <div className="team-performance__task-performance-item"></div>
        </div>
        <MdMoreVert
          onClick={() => handleOpenIndex(1)}
          style={{
            cursor: "pointer",
          }}
        />
        {openViewMoreIndex === 1 && (
          <div
            ref={viewMoreRef}
            className="team-performance__view-more d-flex align-items-center"
          >
            <p className="team-performance__task-title px-2 mb-0">Show Tasks</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamPerformance;
