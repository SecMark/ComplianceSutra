import React, { useState } from "react";
import HelpData from "../../HelpData/Help.json";
import QuestionAnswer from "./QuestionAndAnswers/QuestionAnswer";
import LeftSideBar from "../../CommonModules/SideBar/LeftSideBar";
import logo from "../../assets/Images/LoginDemo/header-logo.png";
import menu from "../../assets/Icons/togglemobile.png";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { RiArrowDownSLine } from "react-icons/ri";
import { RiArrowUpSLine } from "react-icons/ri";
import constant from "../../CommonModules/sharedComponents/constants/constant";

import "./style.css";
const Help = () => {
  const [questionDetail, setQuestionDetail] = useState({});
  const [showMore, setshowMore] = useState(false);
  const [itemsToShow, setitemsToShow] = useState(constant.NumberOfItemsHelp);

  const fetchAnswer = (ID, questionID) => {
    console.log(ID, questionID);
    const getAnswersById = HelpData.find(({ id }) => id === ID);
    const getAnwerDetail = getAnswersById.questions.find(
      ({ questionId }) => questionId === questionID
    );
    setQuestionDetail(getAnwerDetail);
  };
  const showMoreHandler = () => {
    if (itemsToShow === constant.NumberOfItemsHelp) {
      setitemsToShow(questionDetail.length);
      setshowMore(true);
    } else {
      setitemsToShow(constant.NumberOfItemsHelp);
      setshowMore(false);
    }
  };

  return (
    <div className="Parent">
      <div className="Sidebar">
        <LeftSideBar />
      </div>
      <div className="SidebarMobile">
        <img src={menu} alt="" height={18} />

        <img src={logo} alt="" />
      </div>
      <div className="MainHelp">
        <div className="HeaderHelp">
          <h4>Help & Support</h4>
          <span>
            <BsFillQuestionCircleFill
              style={{ color: "#7a73ff", fontSize: "1.5rem" }}
            />
          </span>
        </div>
        <div className="Left"></div>
        {HelpData.map((questionList) => {
          return (
            <div className="Element">
              <h6 id="Title">{questionList.title}</h6>
              {questionList.questions.slice(0, itemsToShow).map((question) => {
                return (
                  <div>
                    <QuestionAnswer
                      id={questionList.id}
                      questionId={question.questionId}
                      question={question.question}
                      answer={question.answer}
                      questionDetail={questionDetail}
                      fetchAnswer={fetchAnswer}
                      showMoreHandler={showMoreHandler}
                    />
                  </div>
                );
              })}
              {questionList.questions.length > constant.NumberOfItemsHelp ? (
                <div>
                  <button className="ViewMore" onClick={showMoreHandler}>
                    {showMore ? (
                      <div>
                        <span>View Less</span>
                        <RiArrowUpSLine />
                      </div>
                    ) : (
                      <div>
                        <span>
                          View All (
                          {questionList.questions.length -
                            constant.NumberOfItemsHelp}{" "}
                          More)
                        </span>
                        <RiArrowDownSLine />
                      </div>
                    )}
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Help;
