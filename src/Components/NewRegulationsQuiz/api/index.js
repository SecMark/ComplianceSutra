import api from "../../../apiServices";

const getNewRegulationsQuiz = (payload) =>
  api.post("compliance.api.getQuizList", payload);
const setNewRegulationsQuizResult = (payload) =>
  api.post("compliance.api.setQuizResult", payload);

export { getNewRegulationsQuiz, setNewRegulationsQuizResult };
