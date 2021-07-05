import React from "react";

const QnASecond = ({ questionDetail }) => {
  console.log(questionDetail);

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
