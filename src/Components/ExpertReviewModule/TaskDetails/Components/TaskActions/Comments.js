import moment from "moment";
import React, { useEffect, useState } from "react";
import { MdArrowForward } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getIntialName } from "../../../../../CommonModules/helpers/GetIntialName.helper";
import { actions as taskReportActions } from "../../../../OnBording/SubModules/DashBoardCO/redux/actions";
const Comments = React.memo(({ taskId }) => {
  const [commentInput, setCommentInput] = useState("");
  const [taskComments, setTaskComments] = useState("");
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const userDetails = state && state.auth && state.auth.loginInfo;
  const comments =
    state &&
    state.taskReport &&
    state.taskReport.getTaskCommentByRole &&
    state.taskReport.getTaskCommentByRole.getTaskCommentByRole;
  const getComments = (taskId) => {
    dispatch(
      taskReportActions.taskCommentsByTaskIdRequest({
        taskid: taskId,
        link: 0,
      })
    );
  };
  const postComment = (taskId, comment) => {
    dispatch(
      taskReportActions.postTaskCommentByTaskID({
        actionFlag: 1,
        taskID: taskId,
        comment,
        commentBy: userDetails.UserID,
        link: 0,
      })
    );
  };
  useEffect(() => {
    if (comments && comments !== undefined && comments.length !== 0) {
      setTaskComments(comments);
    } else {
      setTaskComments([]);
    }
  }, [comments]);
  useEffect(() => {
    getComments(taskId);
  }, [taskId]);
  return (
    <div className="mt-3">
      <div>
        {taskComments &&
          taskComments.length !== 0 &&
          taskComments.map((comment) => {
            return (
              <div className="comment-container d-flex mb-3">
                <div className="comment__left">
                  <span>{getIntialName(comment.B[0].UserName)}</span>
                </div>
                <div className="comment__center d-flex flex-column align-items-start flex-grow-1 px-2">
                  <div className="comment__center-top d-flex align-items-center mb-1">
                    <p className="comment__name mb-0">
                      {comment.B[0].UserName}
                    </p>
                    <span className="comment__time-ago ml-2">
                      {getTimeDifference(comment.CommentOn)}
                    </span>
                  </div>
                  <p className="comment__body mb-0">{comment.Comment}</p>
                </div>
                <div className="comment__right">
                  <span className="comment__commentor-role">
                    {comment.B[0].Role}
                  </span>
                </div>
              </div>
            );
          })}
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
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <button
            className="comment__submit-btn"
            onClick={() => {
              postComment(taskId, commentInput);
              setCommentInput("");
            }}
          >
            <MdArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
});

const getTimeDifference = (date) => {
  const fromDate = moment(date);
  const today = moment();
  const differenceInDays = today.diff(fromDate, "days");
  const differenceInMinutes = today.diff(fromDate, "minutes");
  const differenceInHours = today.diff(fromDate, "hours");

  if (differenceInDays > 0) {
    return differenceInDays + " days ago";
  } else if (differenceInHours > 0) {
    return differenceInHours + " hours ago";
  } else if (differenceInMinutes > 0) {
    return differenceInMinutes + " minutes ago";
  } else {
    return today.diff(fromDate, "second") + " seconds ago";
  }
};

export default Comments;
