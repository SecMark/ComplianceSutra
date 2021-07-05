import React, { useState } from "react";
import HelpData from "../../HelpData/Help.json";
import QuestionAnswer from "./QuestionAnswer";
import LeftSideBar from "../../CommonModules/SideBar/LeftSideBar";
import logo from "../../assets/Images/LoginDemo/header-logo.png";
import menu from "../../assets/Icons/togglemobile.png";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { RiArrowDownSLine } from "react-icons/ri";
import { RiArrowUpSLine } from "react-icons/ri";

import "./style.css";
const Help = () => {
  const [questionDetail, setQuestionDetail] = useState({});
  const [showMore, setshowMore] = useState(false);
  const [itemsToShow, setitemsToShow] = useState(3);
  // const [active, setActive] = useState(false);

  // const activeHandler = () => {
  //   setActive(!active);
  // };

  const fetchAnswer = (ID, questionID) => {
    console.log(ID, questionID);
    const getAnswersById = HelpData.find(({ id }) => id === ID);
    const getAnwerDetail = getAnswersById.questions.find(
      ({ questionId }) => questionId === questionID
    );
    setQuestionDetail(getAnwerDetail);
    // activeHandler();
  };
  // const viewMore = itemsToShow > 3 ? "noView" : "ViewMore";
  const showMoreHandler = () => {
    if (itemsToShow === 3) {
      setitemsToShow(questionDetail.length);
      setshowMore(true);
    } else {
      setitemsToShow(3);
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
      <div className="Main">
        <div className="Header">
          <h4>Help & Support</h4>
          <span>
            <BsFillQuestionCircleFill
              style={{ color: "#7a73ff", fontSize: "1.5rem" }}
            />
          </span>
        </div>
        <div className="Left"></div>
        {HelpData.map((e) => {
          return (
            <div className="Element">
              <h6 id="Title">{e.title}</h6>
              {e.questions.slice(0, itemsToShow).map((q) => {
                return (
                  <div>
                    <QuestionAnswer
                      id={e.id}
                      questionId={q.questionId}
                      question={q.question}
                      answer={q.answer}
                      questionDetail={questionDetail}
                      fetchAnswer={fetchAnswer}
                      showMoreHandler={showMoreHandler}
                      // viewMore={viewMore}
                      // active={active}
                    />
                  </div>
                );
              })}
              {e.questions.length > 3 ? (
                <div>
                  <button className="ViewMore" onClick={showMoreHandler}>
                    {showMore ? (
                      <div>
                        <span>View Less</span>
                        <RiArrowUpSLine />
                      </div>
                    ) : (
                      <div>
                        <span>View All ({e.questions.length - 3} More)</span>
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
