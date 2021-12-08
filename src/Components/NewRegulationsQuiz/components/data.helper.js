const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const getFormattedQuestion = (data, index) => {
  const question = data?.question;
  const options = [...data?.options].map((element, index) => ({
    index: alphabets[index],
    value: element?.option,
    is_correct: element.is_correct,
  }));
  const correct_answer = [...options].find(
    (element) => element?.is_correct === 1
  );
  return {
    id: index + 1,
    question,
    options,
    correct_answer,
  };
};

const quiz_messages = {
  greet: "congratulations",
  all_wrong: "You have select Totally Wrong Answers",
  select_any_option: "Select Any one option here.",
};

export { getFormattedQuestion, quiz_messages };
