import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const GRADE_API = `${REMOTE_SERVER}/api/grades`;

export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};

export const findQuestionsForQuiz = async (quizId: string) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}/questions`);
  return response.data;
};

export const createGrade = async (
  quizId: string,
  courseId: string,
  answers: any
) => {
  const response = await axios.post(
    `${QUIZZES_API}/${courseId}/${quizId}/grade`,
    answers
  );
  return response.data;
};

export const getGrade = async (quizId: string) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}/grade`);
  return response.data;
};
