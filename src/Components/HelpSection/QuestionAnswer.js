import React, { useState } from "react";
import QnASecond from "./QnASecond";
import "./style.css";

const QuestionAnswer = ({
  question,
  answer,
  fetchAnswer,
  questionDetail,
  id,
  questionId,
  viewMore,
  showMoreHandler,
  active,
}) => {
  const [showAnswer, setshowAnswer] = useState(false);

  // const checkActive = active ? "Active" : "";
  const AnswerHandler = () => {
    setshowAnswer(!showAnswer);
    fetchAnswer(id, questionId);
  };

  const answerStyles = showAnswer ? "showAnswer" : "noAnswer";
  return (
    <div className="QnA">
      <div className="question" onClick={AnswerHandler}>
        <p>{question}</p>
        <button>{">"}</button>
      </div>

      <div className={`${answerStyles} QnASecond`}>
        <QnASecond
          question={question}
          answer={answer}
          showAnswer={showAnswer}
          setshowAnswer={setshowAnswer}
          questionDetail={questionDetail}
        />
      </div>
    </div>
  );
};

export default QuestionAnswer;
