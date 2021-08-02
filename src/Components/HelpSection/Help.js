import React, { useState, useRef } from "react";
import { isMobile } from "react-device-detect";
import HelpData from "../../HelpData/Help.json";
import QuestionAnswer from "./QuestionAndAnswers/QuestionAnswer";
import sideBarlogo from "../../assets/Icons/sideBarlogo.png";
import togglemobile from "../../assets/Icons/togglemobile.png";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { RiArrowDownSLine } from "react-icons/ri";
import { RiArrowUpSLine } from "react-icons/ri";
import constant from "../../CommonModules/sharedComponents/constants/constant";

import bgReactangle from "../../assets/Images/BackgroundHelpRectangle.png";

import "./style.css";
import MobileLeftSidebar from "../OnBording/SubModules/DashBoardCO/components/MobileLeftSidebar";
const Help = () => {
  const [questionDetail, setQuestionDetail] = useState({});
  const [showMore, setshowMore] = useState(false);
  const sideBarParent = useRef(null);
  const sideBarChild = useRef(null);
  const [itemsToShow, setitemsToShow] = useState(constant.NumberOfItemsHelp);
  const [showHB, setShowHBMenu] = useState(false); // For showing Hamburger Menu
  const [navigationHideShow, setNavigationHideShow] = useState(false);

  const fetchAnswer = (ID, questionID) => {
    const getAnswersById = HelpData.find(({ id }) => id === ID);
    const getAnwerDetail = getAnswersById.questions.find(
      ({ questionId }) => questionId === questionID
    );
    setQuestionDetail(getAnwerDetail);
  };
  const onHBMenu = () => {
    setNavigationHideShow(true);
    const drawerParent = sideBarParent;
    const drawerChild = sideBarChild;
    if (drawerParent) {
      drawerParent.current.classList.add("overlay");
      drawerChild.current.style.left = "0%";
    }
  };

  const closeMobileSidebar = () => {
    const drawerParent = document.getElementById("sideBarParent");
    const drawerChild = document.getElementById("sideBarChild");
    if (drawerParent) {
      drawerParent.classList.remove("overlay");
      drawerChild.style.left = "-100%";
    }
    setShowHBMenu(false);
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
      {isMobile && (
        <div id="sideBarParent" className="" ref={sideBarParent}>
          <div
            id="sideBarChild"
            className="leftSideBarFixed"
            ref={sideBarChild}
          >
            <MobileLeftSidebar
              className="d-block d-lg-none"
              close={() => closeMobileSidebar()}
            />
          </div>
        </div>
      )}
      <div className="d-block mobile-head d-md-none">
        {showHB === false && (
          <div className="d-flex justify-content-between d-lg-none">
            <div
              className=""
              style={{ cursor: "pointer" }}
              onClick={() => {
                onHBMenu();
              }}
            >
              <img src={togglemobile} alt="toggle mobile" />
            </div>
            <div className="pr-4">
              {" "}
              <img
                className="mobile-logo"
                src={sideBarlogo}
                alt="sideBarlogo"
              />{" "}
            </div>
          </div>
        )}
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

      <div id="bgRectangle">
        <img src={bgReactangle} alt="backgroundImage"></img>
      </div>
    </div>
  );
};
export default Help;
