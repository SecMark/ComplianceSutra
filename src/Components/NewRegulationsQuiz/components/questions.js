const questions = [
  {
    id: 1,
    question: "How are the Compliance changes defined for the week?",
    options: [
      {
        index: "A",
        value: "Everyday",
      },
      {
        index: "B",
        value: "Only Monday",
      },
      {
        index: "C",
        value: "Weekend",
      },
      {
        index: "D",
        value: "Wednesday",
      },
    ],
    correct_answer: {
      index: "B",
      value: "Only Monday",
    },
  },
  {
    id: 2,
    question: "When should we submit the Compliance?",
    options: [
      {
        index: "A",
        value: "Monthly",
      },
      {
        index: "B",
        value: "Yearly",
      },
      {
        index: "C",
        value: "Bi Annually",
      },
      {
        index: "D",
        value: "Weekly",
      },
    ],
    correct_answer: {
      index: "D",
      value: "Weekly",
    },
  },
  {
    id: 3,
    question: "How are the Compliance changes defined for the week?",
    options: [
      {
        index: "A",
        value: "Everyday",
      },
      {
        index: "B",
        value: "Only Monday",
      },
      {
        index: "C",
        value: "Weekend",
      },
      {
        index: "D",
        value: "Wednesday",
      },
    ],
    correct_answer: {
      index: "B",
      value: "Only Monday",
    },
  },
  {
    id: 4,
    question: "What is New Regulations?",
    options: [
      {
        index: "A",
        value: "Task List",
      },
      {
        index: "B",
        value: "Dashboard",
      },
      {
        index: "C",
        value: "Circular Updates",
      },
      {
        index: "D",
        value: "Notifications",
      },
    ],
    correct_answer: {
      index: "C",
      value: "Circular Updates",
    },
  },
  {
    id: 5,
    question: "What is Dashboard?",
    options: [
      {
        index: "A",
        value: "Task List",
      },
      {
        index: "B",
        value: "Overview of all tasks",
      },
      {
        index: "C",
        value: "Circular Updates",
      },
      {
        index: "D",
        value: "Notifications",
      },
    ],
    correct_answer: {
      index: "B",
      value: "Overview of all tasks",
    },
  },
];

const quiz_messages = {
  greet: "congratulations",
  all_wrong: "You have select Totally Wrong Answers",
  select_any_option: "Select Any one option here.",
};

export { questions, quiz_messages };
