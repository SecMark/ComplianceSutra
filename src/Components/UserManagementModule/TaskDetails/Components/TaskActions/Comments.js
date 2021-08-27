import React from "react";
import { MdArrowForward } from "react-icons/md";

const Comments = () => {
  return (
    <div className="mt-3">
      {/* Comment */}
      <div className="comment-container d-flex mb-3">
        <div className="comment__left">
          <span>PC</span>
        </div>
        <div className="comment__center d-flex flex-column align-items-start flex-grow-1 px-2">
          <div className="comment__center-top d-flex align-items-center mb-1">
            <p className="comment__name mb-0">Ashu Kumar</p>
            <span className="comment__time-ago ml-2">2d ago</span>
          </div>
          <p className="comment__body mb-0">
            This task should be done on a priority basis. Make sure this is
            completed before the due date.
          </p>
        </div>
        <div className="comment__right">
          <span className="comment__commentor-role">Aprover</span>
        </div>
      </div>
      {/* Comment Input */}
      <div className="d-flex mb-3">
        <div className="comment__left">
          <span>PC</span>
        </div>
        <div className="comment-center px-2 d-flex">
          <input
            type="text"
            className="form-control comment__input"
            placeholder="Add a comment"
          />
          <button className="comment__submit-btn">
            <MdArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comments;
