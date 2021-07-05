import React, { useEffect, useState } from "react";

const QnASecond = ({ question, answer, setshowAnswer, questionDetail }) => {
  console.log(questionDetail);
  useEffect(() => {
    return () => {
      setshowAnswer(false);
    };
  }, []);
  return (
    <div className="Right">
      <div className="Container">
        <h6>{questionDetail?.question}</h6>
        <p>{questionDetail?.answer}</p>
      </div>
    </div>
  );
};

export default QnASecond;
