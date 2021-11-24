import React, { useEffect, useState } from "react";
import "./style.css";
import { questions, quiz_messages } from "./components/questions";
import BackDrop from "../../CommonModules/sharedComponents/Loader/BackDrop";
import {
  MdArrowBack,
  MdArrowForward,
  MdRadioButtonChecked,
  MdRadioButtonUnchecked,
} from "react-icons/md";
import allInCorrectImage from "../../assets/Images/quiz-all-incorrect.svg";
import allCorrectImage from "../../assets/Images/quiz-all-correct.svg";
import confuseImage from "../../assets/Images/quiz-confuse.svg";
import { Progress } from "antd";
const initialState = {
  currentSlide: questions[0],
  currentStatus: {
    selectedOption: {},
    isSubmited: false,
    isCorrectAnswer: false,
  },
};
const NewRegulationsQuiz = () => {
  const [stepper, setStepper] = useState(initialState);
  const [stepperStatus, setStepperStatus] = useState({
    completedSlides: [],
    skipedSlides: [],
    isAllSubmited: false,
  });
  const [quizResult, setQuizResult] = useState({
    correctAnswers: 0,
    wrongAnswers: 0,
    processInPercentage: 0,
  });
  const [isCountingResults, setIsCountingResults] = useState(false);
  useEffect(() => {
    const { isAllSubmited, completedSlides } = stepperStatus;
    if (isAllSubmited && completedSlides?.length === questions?.length) {
      let correctAnswers = completedSlides?.filter(
        (element) => element?.currentStatus?.isCorrectAnswer === true
      ).length;
      setQuizResult({
        correctAnswers,
        wrongAnswers: questions.length - correctAnswers,
        processInPercentage: (correctAnswers / questions.length) * 100,
      });
      setTimeout(() => {
        setIsCountingResults(false);
      }, 2000);
    }
  }, [stepperStatus]);
  // On top steps click
  const onSlideClick = (slideData) => {
    const alreadySkiped = [...stepperStatus?.skipedSlides].filter(
      (item) => item?.currentSlide?.id === slideData?.id
    );
    const alreadyCompleted = [...stepperStatus?.completedSlides].filter(
      (item) => item?.currentSlide?.id === slideData?.id
    );
    const alreadyVisited =
      (alreadySkiped.length > 0 && alreadySkiped) ||
      (alreadyCompleted.length > 0 && alreadyCompleted);
    if (
      alreadyVisited &&
      alreadyVisited[0] &&
      Object.keys(alreadyVisited[0]).length > 0
    ) {
      setStepper({
        ...alreadyVisited[0],
      });
    } else {
      setStepper({
        ...initialState,
        currentSlide: slideData,
      });
    }
  };
  // On click for skip and next question
  const onNextClick = (slideIndex, type) => {
    if (
      slideIndex + 1 <= questions.length - 1 &&
      type === "next-question" &&
      stepper.currentStatus?.isSubmited
    ) {
      const alreadyVisited = isAlreadyVisited(
        slideIndex + 1,
        stepper,
        stepperStatus
      );
      if (alreadyVisited) setStepper(alreadyVisited?.data);
      else
        setStepper({
          ...initialState,
          currentSlide: questions[slideIndex + 1],
        });
    } else if (
      slideIndex + 1 <= questions.length - 1 &&
      type === "skip" &&
      !stepper.currentStatus.isSubmited
    ) {
      const alreadyVisited = isAlreadyVisited(
        slideIndex + 1,
        stepper,
        stepperStatus
      );
      if (!alreadyVisited) {
        setStepperStatus({
          ...stepperStatus,
          skipedSlides: [...stepperStatus.skipedSlides, stepper],
          isAllSubmited: false,
        });
        setStepper({
          ...initialState,
          currentSlide: questions[slideIndex + 1],
        });
      } else if (alreadyVisited) setStepper(alreadyVisited?.data);
    }
  };
  const onArrowAction = (type) => {
    let slideIndex = questions.indexOf(stepper?.currentSlide);
    if (slideIndex !== null && slideIndex !== undefined) {
      slideIndex = type === "prev" ? slideIndex - 1 : slideIndex + 1;
      let alreadyVisited = isAlreadyVisited(slideIndex, stepper, stepperStatus);
      if (alreadyVisited) setStepper(alreadyVisited?.data);
      else setStepper({ ...initialState, currentSlide: questions[slideIndex] });
    }
  };
  const onOptionClick = (option) => {
    const isCorrectAnswer =
      option && option?.index === stepper.currentSlide?.correct_answer?.index;
    const slideIndex = questions.indexOf(stepper?.currentSlide);
    const stepperStateToUpdate = {
      ...stepper,
      currentStatus: {
        ...stepper.currentStatus,
        selectedOption: option,
        isCorrectAnswer,
        isSubmited: true,
      },
    };
    setStepper(stepperStateToUpdate);
    const alreadyVisited = isAlreadyVisited(slideIndex, stepper, stepperStatus);
    if (
      stepperStatus?.completedSlides.length === questions.length - 1 &&
      !alreadyVisited
    ) {
      setStepperStatus({
        ...stepperStatus,
        completedSlides: [
          ...stepperStatus.completedSlides,
          { ...stepperStateToUpdate },
        ],
        isAllSubmited: true,
      });
      setIsCountingResults(true);
    } else if (!alreadyVisited)
      setStepperStatus({
        ...stepperStatus,
        completedSlides: [
          ...stepperStatus.completedSlides,
          { ...stepperStateToUpdate },
        ],
      });
    else if (
      alreadyVisited &&
      alreadyVisited?.isAlreadySkiped &&
      stepperStatus?.completedSlides.length === questions.length - 1
    ) {
      setStepperStatus({
        ...stepperStatus,
        completedSlides: [
          ...stepperStatus.completedSlides,
          { ...stepperStateToUpdate },
        ],
        skipedSlides: [...stepperStatus.skipedSlides].filter(
          (item) =>
            item?.currentSlide?.id !== alreadyVisited?.data?.currentSlide?.id
        ),
        isAllSubmited: true,
      });
      setIsCountingResults(true);
    } else if (alreadyVisited && alreadyVisited?.isAlreadySkiped) {
      setStepperStatus({
        ...stepperStatus,
        completedSlides: [
          ...stepperStatus.completedSlides,
          { ...stepperStateToUpdate },
        ],
        skipedSlides: [...stepperStatus.skipedSlides].filter(
          (item) =>
            item?.currentSlide?.id !== alreadyVisited?.data?.currentSlide?.id
        ),
      });
    }
  };
  return (
    <>
      <BackDrop isLoading={isCountingResults} />
      <div className="new-regulation-quiz">
        <div className="new-regulation-quiz__container">
          <div className="quiz__header mb-3">
            <p className="mb-0 quiz__header-title">Quiz</p>
          </div>
          <div className="quiz__stepper-steps-container">
            {questions &&
              questions.length > 0 &&
              questions.map((question) => {
                return (
                  <div
                    onClick={() => {
                      if (!stepperStatus?.isAllSubmited) onSlideClick(question);
                    }}
                    className={`quiz__stepper-step ${
                      stepper?.currentSlide?.id === question?.id ||
                      [...stepperStatus?.completedSlides]
                        .map((item) => item.currentSlide)
                        .includes(question)
                        ? "quiz__stepper-step--active"
                        : [...stepperStatus?.skipedSlides]
                            .map((item) => item?.currentSlide)
                            .includes(question)
                        ? "quiz__stepper-step--skipped"
                        : ""
                    }`}
                  ></div>
                );
              })}
          </div>
          <div className="quiz__stepper-main d-flex flex-column align-items-center justify-content-center">
            {!stepperStatus?.isAllSubmited && (
              <div className="quiz__stepper-slide-container">
                <p className="quiz__stepper-slide-count mb-0">
                  Question {stepper.currentSlide?.id + "/" + questions.length}
                </p>
                <p className="quiz__stepper-slide-title mb-0 mb-4">
                  {stepper.currentSlide?.question}
                </p>
                <div className="quiz__stepper-options position-relative d-flex flex-column align-items-center justify-content-center">
                  {stepper.currentSlide?.options?.map((option) => {
                    const { currentSlide, currentStatus } = stepper;
                    return (
                      <div
                        onClick={() => {
                          if (!currentStatus.isSubmited) {
                            onOptionClick(option);
                          }
                        }}
                        className={`quiz__stepper-option d-flex justify-content-between align-items-center ${
                          currentStatus?.isSubmited &&
                          currentStatus?.isCorrectAnswer &&
                          currentSlide?.correct_answer?.index ===
                            currentStatus?.selectedOption?.index &&
                          currentStatus?.selectedOption?.index === option?.index
                            ? "quiz__stepper-option--correct"
                            : currentStatus?.isSubmited &&
                              !currentStatus?.isCorrectAnswer &&
                              currentSlide?.correct_answer?.index !==
                                currentStatus?.selectedOption?.index &&
                              currentStatus?.selectedOption?.index ===
                                option?.index
                            ? "quiz__stepper-option--incorrect"
                            : currentSlide?.correct_answer.index ===
                                option.index &&
                              currentStatus?.isSubmited &&
                              "quiz__stepper-option--correct"
                        }`}
                      >
                        <p className="quiz__stepper-option-title mb-0">
                          {option.index + ". " + option.value}
                        </p>
                        <p className="mb-0 quiz__stepper-option-title radio">
                          {currentStatus.selectedOption?.index ===
                          option?.index ? (
                            <MdRadioButtonChecked />
                          ) : (
                            <MdRadioButtonUnchecked />
                          )}
                        </p>
                      </div>
                    );
                  })}

                  <div
                    onClick={() => onArrowAction("prev")}
                    className={`navigation-arrow left ${
                      questions.indexOf(stepper?.currentSlide) > 0 && "active"
                    }`}
                    style={{
                      ...(!(questions.indexOf(stepper?.currentSlide) > 0) && {
                        cursor: "not-allowed",
                        pointerEvents: "none",
                      }),
                    }}
                  >
                    <MdArrowBack />
                  </div>
                  <div
                    onClick={() => onArrowAction("next")}
                    className={`navigation-arrow right ${
                      questions.indexOf(stepper?.currentSlide) <
                        questions.length - 1 && "active"
                    }`}
                    style={{
                      ...(questions.indexOf(stepper?.currentSlide) >=
                        questions.length - 1 && {
                        cursor: "not-allowed",
                        pointerEvents: "none",
                      }),
                    }}
                  >
                    <MdArrowForward />
                  </div>
                </div>
                <p className="quiz__current-status">
                  {!stepper?.currentStatus?.isSubmited &&
                    quiz_messages.select_any_option}
                  <span className="quiz__current-status--correct">
                    {stepper?.currentStatus?.isSubmited &&
                      stepper.currentStatus?.isCorrectAnswer &&
                      "Correct Answer"}
                  </span>
                  {stepper?.currentStatus?.isSubmited &&
                    !stepper.currentStatus?.isCorrectAnswer && (
                      <>
                        You have select,
                        <span className="quiz__current-status--incorrect">
                          &nbsp;Wrong Answer, &nbsp;
                        </span>
                        Correct Answer is&nbsp;
                        <span className="quiz__current-status--correct">
                          {stepper.currentSlide?.correct_answer.index}
                        </span>
                      </>
                    )}
                </p>
                <div className="d-flex quiz-buttons-container align-items-center justify-content-between">
                  <button
                    onClick={() => {
                      const slideIndex = questions.indexOf(
                        stepper?.currentSlide
                      );
                      if (slideIndex !== null && slideIndex !== undefined)
                        onNextClick(slideIndex, "skip");
                    }}
                    className="quiz-button quiz-button--outlined"
                    disabled={
                      questions.indexOf(stepper?.currentSlide) >=
                      questions.length - 1
                    }
                  >
                    skip
                  </button>
                  <button
                    onClick={() => {
                      const slideIndex = questions.indexOf(
                        stepper?.currentSlide
                      );
                      if (slideIndex !== null && slideIndex !== undefined)
                        onNextClick(slideIndex, "next-question");
                    }}
                    className="quiz-button quiz-button--primary"
                    style={{
                      ...(!stepper?.currentStatus?.isSubmited && {
                        opacity: "0.5",
                        pointerEvents: "none",
                      }),
                    }}
                    disabled={!stepper?.currentStatus?.isSubmited}
                  >
                    {questions.indexOf(stepper?.currentSlide) >=
                    questions.length - 1
                      ? "Submit"
                      : "Next Question"}
                  </button>
                </div>
              </div>
            )}
            {stepperStatus?.isAllSubmited &&
              !isCountingResults &&
              Object.keys(quizResult).length > 0 && (
                <div className="quiz__stepper-slide-container my-0">
                  <p className="quiz__result-message mt-5 mb-3">
                    {quizResult?.correctAnswers === questions.length
                      ? quiz_messages.greet
                      : quizResult?.wrongAnswers === questions.length
                      ? quiz_messages.all_wrong
                      : quiz_messages.greet}
                  </p>
                  <div className="d-flex align-items-center quiz__result-container justify-content-center">
                    <div className="quiz__result-item quiz__result-image">
                      <img
                        src={
                          quizResult.processInPercentage === 100
                            ? allCorrectImage
                            : quizResult.processInPercentage === 0
                            ? allInCorrectImage
                            : confuseImage
                        }
                        alt="quiz-result"
                      />
                    </div>
                    <div className="quiz__result-item d-flex flex-column justify-content-between align-items-center">
                      <div className="d-flex w-100 justify-content-between align-items-center">
                        <div className="quiz__result-count-container d-flex align-items-center justify-content-between flex-column">
                          <div className="">
                            <p className="quiz__count-title">Correct Answers</p>
                            <p className="quiz__count-value">
                              {quizResult?.correctAnswers}
                            </p>
                          </div>
                          <div className="">
                            <p className="quiz__count-title">Wrong Answers</p>
                            <p className="quiz__count-value red">
                              {quizResult?.wrongAnswers}
                            </p>
                          </div>
                        </div>
                        <div className="quiz__result-progress-container">
                          <Progress
                            type="circle"
                            percent={quizResult.processInPercentage}
                            strokeWidth={10}
                            status={
                              quizResult.processInPercentage === 0 &&
                              "exception"
                            }
                            strokeColor="#7a73ff"
                            width={150}
                          />
                        </div>
                      </div>
                      <div
                        className={`quiz__result-button-container d-flex justify-content-${
                          quizResult.processInPercentage === 0
                            ? "between"
                            : "center"
                        } align-items-center w-100 mt-5`}
                      >
                        {quizResult.processInPercentage === 0 && (
                          <button className="quiz-button quiz-button--primary">
                            play agin
                          </button>
                        )}
                        <button className="quiz-button quiz-button--primary">
                          back to home
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
};

// Check if current slide is already visited
const isAlreadyVisited = (slideIndex, stepper, stepperStatus) => {
  const alreadySkiped = [...stepperStatus?.skipedSlides].filter(
    (item) => item?.currentSlide?.id === questions[slideIndex]?.id
  );
  const alreadyCompleted = [...stepperStatus?.completedSlides].filter(
    (item) => item?.currentSlide?.id === questions[slideIndex]?.id
  );
  const alreadyVisited =
    (alreadySkiped.length > 0 && alreadySkiped[0]) ||
    (alreadyCompleted.length > 0 && alreadyCompleted[0]) ||
    {};
  return (
    (alreadyVisited &&
      Object.keys(alreadyVisited).length > 0 && {
        data: alreadyVisited,
        isAlreadySkiped:
          alreadySkiped && alreadySkiped.length > 0 ? true : false,
      }) ||
    false
  );
};

export default NewRegulationsQuiz;
