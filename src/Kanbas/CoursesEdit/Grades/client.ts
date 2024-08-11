import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

export const findGradesForQuiz = async (courseId: string) => {
  const response = await axiosWithCredentials.get(
    `${QUIZZES_API}/${courseId}/allGrades`
  );
  return response.data;
};
