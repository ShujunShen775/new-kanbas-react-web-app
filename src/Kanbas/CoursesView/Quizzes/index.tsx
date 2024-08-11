import { useEffect } from "react";
import QuizzesControls from "./QuizzesControls";
import { setQuizzes } from "./reducer";
import * as client from "./client";
import { useSelector, useDispatch } from "react-redux";
import { BsGripVertical } from "react-icons/bs";
import { useParams, useNavigate } from "react-router";
import QuizControlButtons from "./QuizControlButtons";
import "./index.css";

export default function Quizzes() {
  const navigate = useNavigate();
  const { cid } = useParams();
  const dispatch = useDispatch();

  const { quizzes } = useSelector((state: any) => state.quizzesReducer);

  const fetchQuizzes = async () => {
    const quizzes = await client.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
  };

  const getAvailability = (quiz: any) => {
    const t = +new Date();
    const a = +new Date(quiz.availableDate);
    const u = +new Date(quiz.untilDate);
    if (t > a) {
      return "Closed";
    }
    if (t <= u && t >= +quiz.availableDate) {
      return "Available";
    }
    if (t < a) {
      return `Not available until ${quiz.availableDate}`;
    }
  };
  useEffect(() => {
    fetchQuizzes();
  }, []);
  return (
    <div id="wd-assignments">
      <QuizzesControls />
      <ul id="wd-assignment-list" className="list-group rounded-0 mt-3">
        <li className="wd-assignment list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-assignments-title p-3 ps-2  bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            ASSIGNMENTS QUIZZES
          </div>
          <ul className="wd-assignments list-group rounded-0">
            {quizzes
              .filter((quiz: any) => quiz.course === cid)
              .map((quiz: any) => (
                <li
                  className="wd-assignment-list-item list-group-item p-3 ps-1"
                  onClick={() =>
                    navigate(
                      `/Kanbas/Courses/${quiz.course}/Quizzes/${quiz._id}/Details`
                    )
                  }
                >
                  <BsGripVertical className="me-2 fs-3" />
                  <div
                    style={{ display: "inline-flex", flexDirection: "column" }}
                  >
                    <span>{quiz.name}</span>
                    <span style={{ color: "#999", fontSize: "16px" }}>
                      {getAvailability(quiz)} | Not available util{" "}
                      {quiz.untilDate} | Due {quiz.dueDate} | {quiz.points} pts
                      | {quiz.questions?.length || 0} questions
                    </span>
                  </div>
                  <QuizControlButtons published />
                </li>
              ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}
