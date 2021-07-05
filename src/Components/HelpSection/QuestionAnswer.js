import React, { useState } from "react";
import QnASecond from "./QnASecond";
import "./style.css";

const QuestionAnswer = ({
  question,
  answer,
  fetchAnswer,
  questionDetail,
  id,
}) => {
  const [showAnswer, setshowAnswer] = useState(false);

  const handleClick = (e) => {
    setshowAnswer(!showAnswer);
    // fetchAnswer(id);
  };

  const answerStyles = showAnswer ? "showAnswer" : "noAnswer";
  return (
    <div className="QnA">
      <div className="question" onClick={handleClick}>
        <p>{question}</p>
        <button>{">"}</button>
      </div>
      <div className={`${answerStyles} QnASecond`}>
        <QnASecond
          question={question}
          answer={answer}
          showAnswer={showAnswer}
          setshowAnswer={setshowAnswer}
        />
      </div>
    </div>
  );
};

export default QuestionAnswer;
