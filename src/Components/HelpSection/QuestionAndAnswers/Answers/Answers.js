import React from "react";
import "../../style.css";

const Answers = ({ questionDetail }) => {
  return (
    <div className="Right">
      <div className="ContainerHelp">
        <h6>{questionDetail?.question}</h6>
        <p>{questionDetail?.answer}</p>
      </div>
    </div>
  );
};

export default Answers;
