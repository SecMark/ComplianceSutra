import React, { useEffect, useState } from "react";

const QnASecond = ({ question, answer, setshowAnswer }) => {
  useEffect(() => {
    return () => {
      setshowAnswer(false);
    };
  }, []);
  return (
    <div className="Right">
      <div className="Container">
        <h6>{question}</h6>
        <p>{answer}</p>
      </div>
    </div>
  );
};

export default QnASecond;
