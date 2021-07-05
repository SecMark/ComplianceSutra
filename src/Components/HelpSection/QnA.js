import React, { useState } from "react";
import "./style.css";
import HelpData from "../../HelpData/Help.json";
const Qna = () => {
  const [showAnswer, setShowAnswer] = useState(false);
  const answerStyles = showAnswer ? "Container" : "noAnswer";

  const handleClick = () => setShowAnswer(!showAnswer);

  return (
    <div>
      <div>
        {HelpData.map((e) => {
          return (
            <div onClick={handleClick}>
              <h6>{e.title}</h6>
              {e.questions.map((q) => {
                return (
                  <div>
                    <div className="question">
                      <p>{q.question}</p>
                    </div>
                    <div className={answerStyles}>
                      <h6>{q.question}</h6>
                      <p>{q.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="Right"></div>
    </div>
  );
};

export default Qna;
//  <div className="Main">
// <div className="Left">
//   <div className="Header">
//     <h4>Help & Support</h4>
//     <span>?</span>
//   </div>
//   <div className="Body">
//     <div className="Element">
//       <h6 id="Title">{title}</h6>
//       <div className="Question" onClick={handleClick}>
//         <p>{e.question}</p>
//         <button>{">"}</button>
//       </div>
//     </div>
//   </div>
// </div>
// <div className="Right">
//   <div className={answerStyles}>
//     <h6>{e.question}</h6>
//     <p>{e.answer}</p>
//   </div>
// </div>
// </div>
/* {HelpData.map((e) => {
        return (
          <>
            <div className="Body">
              <div className="Element">
                <h6 id="Title">{e.title}</h6>
                {e.questions.map((q) => {
                  return (
                    <div className="Question" onClick={handleClick}>
                      <p>{q.question}</p>
                      <button>{">"}</button>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        );
      })} */
