import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const QUESTION_API = `${REMOTE_SERVER}/api/question`;
export const deleteQuiz = async (qid: string) => {
  const response = await axios.delete(`${QUIZZES_API}/${qid}`);
  return response.data;
};
export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};
export const createQuiz = async (courseId: string, quiz: any) => {
  const response = await axios.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
  return response.data;
};
export const updateQuiz = async (quiz: any) => {
  const response = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return response.data;
};
export const publishQuiz = async (qid: string) => {
  const response = await axios.put(`${QUIZZES_API}/${qid}/publish`);
  return response.data;
};

export const createQuestion = async (quizId: string, question: any) => {
  const response = await axios.post(
    `${QUIZZES_API}/${quizId}/question`,
    question
  );
  return response.data;
};
export const findQuestionsForQuiz = async (quizId: string) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}/questions`);
  return response.data;
};
export const createGrade = async (quizId: string, answers: any) => {
  const response = await axios.post(`${QUIZZES_API}/${quizId}/grade`, answers);
  return response.data;
};