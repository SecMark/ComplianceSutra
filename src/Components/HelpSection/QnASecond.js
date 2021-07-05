import React from "react";
import bgReactangle from "../../assets/Images/Rectangle 18.png";
const QnASecond = ({ questionDetail }) => {
  console.log(questionDetail);

  return (
    <div className="Right">
      <div className="Container">
        <h6>{questionDetail?.question}</h6>
        <p>{questionDetail?.answer}</p>
      </div>
      <div id="bgRectangle">
        <img src={bgReactangle} alt="backgroundImage"></img>
      </div>
    </div>
  );
};

export default QnASecond;
