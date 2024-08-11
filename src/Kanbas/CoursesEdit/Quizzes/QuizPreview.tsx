import "./index.css";
import { useEffect, useState } from "react";
import * as client from "./client";
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setQuizzes, setQuestions } from "./reducer";

const t = new Date();
export default function QuizGrade() {
  const { qid, cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { quizzes, questions }: { quizzes: any[]; questions: any[] } =
    useSelector((state: any) => state.quizzesReducer);
  const quiz = quizzes.find((quiz: any) => quiz._id === qid);
  const [answers, setAnswers] = useState<any[]>([]);
  const [number, setNumber] = useState(0);

  const submit = async () => {
    const score = await client.createGrade(qid as string, answers);
    alert(`Your Grade is:  ${score}`);
    navigate(`/Kanbas/Courses/${quiz.course}/Quizzes/${quiz._id}/Details`);
  };

  const fetchQuizzes = async () => {
    const quizzes = await client.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
  };

  const fetchQuestions = async () => {
    const questions = await client.findQuestionsForQuiz(qid as string);
    dispatch(setQuestions(questions));
  };

  useEffect(() => {
    fetchQuizzes();
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (!questions.length) {
      return;
    }
    setAnswers(Array.from({ length: questions.length }, (i) => ""));
  }, [questions]);

  const question = questions[number];

  return (
    <div id="wd-quiz-editor">
      <h1>{quiz.name}</h1>
      <div
        className="alert alert-warning d-flex align-items-center"
        role="alert"
      >
        ⚠ This is a preview of the published version of the quiz.
      </div>
      <p>Started: {t.toString()}</p>
      <h3>Quiz Instructions</h3>
      <hr />
      <div className="card mb-4">
        <div className="card-header border border-light-subtle d-flex justify-content-between">
          <span>Question {number + 1}</span>
          <span>{question.points} pts</span>
        </div>
        <div className="card-body">
          <p>{question.title}</p>
          <div>
            {(question.choice as any[]).map((i: any, index) => (
              <div key={index} className="form-check">
                {question.type !== "FILL_IN_MULTIPLE_BLANKS" ? (
                  <>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={answers[number] === i.content}
                      onChange={(e) => {
                        answers[number] = i.content;
                        setAnswers([...answers]);
                      }}
                    />
                    {i.content}
                  </>
                ) : (
                  <>
                    {index + 1}.
                    <input
                      className="form-control"
                      value={answers[number][index]}
                      style={{
                        width: "160px",
                        display: "inline-block",
                      }}
                      onChange={(e) => {
                        answers[number][index] = e.target.value;
                        setAnswers([...answers]);
                      }}
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {number < questions.length - 1 && (
        <div className="clearfix mb-3">
          <div className="float-end">
            <button
              className="btn btn-secondary"
              onClick={() => setNumber((v) => v + 1)}
            >
              Next &gt;
            </button>
          </div>
        </div>
      )}
      <hr />
      <div className="clearfix mb-3">
        <div className="float-end">
          <button className="btn btn-danger" onClick={() => submit()}>
            Submit Quiz
          </button>
        </div>
      </div>
      <h3>Questions</h3>
      <ul className="list-group">
        {questions.map((i, index) => (
          <li
            className={`list-group-item ${
              index === number ? "text-danger" : ""
            }`}
            key={index}
            onClick={() => setNumber(index)}
          >
            Question {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}
