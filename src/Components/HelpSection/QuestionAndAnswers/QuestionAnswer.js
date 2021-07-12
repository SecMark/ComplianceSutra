import React, { useState } from "react";
import Answers from "./Answers/Answers";
import "../style.css";
import { RiArrowRightSLine } from "react-icons/ri";
import { RiArrowDownSLine } from "react-icons/ri";
import { RiArrowUpSLine } from "react-icons/ri";

const QuestionAnswer = ({
  question,
  fetchAnswer,
  questionDetail,
  id,
  questionId,
}) => {
  const AnswerHandler = () => {
    setshowAnswer(!showAnswer);
    fetchAnswer(id, questionId);
  };
  const [showAnswer, setshowAnswer] = useState(false);

  const answerStyles = showAnswer ? "showAnswer" : "noAnswer";
  return (
    <div className="Q&A">
      <div className="question" onClick={AnswerHandler}>
        <p>{question}</p>
        <span className="QuestionButton">
          <RiArrowRightSLine />
        </span>
        <span className="QuestionButtonMobile">
          {showAnswer ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
        </span>
      </div>
      <div className={`${answerStyles} AnswersTrue`}>
        <Answers questionDetail={questionDetail} />
      </div>
    </div>
  );
};

export default QuestionAnswer;
