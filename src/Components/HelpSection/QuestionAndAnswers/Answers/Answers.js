import React from "react";
import bgReactangle from "../../../../assets/Images/Rectangle 18.png";
import "../../style.css";
const Answers = ({ questionDetail }) => {
  console.log(questionDetail);

  return (
    <div className="Right">
      <div className="ContainerHelp">
        <h6>{questionDetail?.question}</h6>
        <p>{questionDetail?.answer}</p>
      </div>
      <div id="bgRectangle">
        <img src={bgReactangle} alt="backgroundImage"></img>
      </div>
    </div>
  );
};

export default Answers;
