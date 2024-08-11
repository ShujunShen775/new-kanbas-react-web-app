import "./index.css";
import { useEffect, useState } from "react";
import * as client from "./client";
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setQuizzes, setQuestions } from "./reducer";
import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";

export default function QuizEditor() {
  const { qid, cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { quizzes, questions }: { quizzes: any[]; questions: any[] } =
    useSelector((state: any) => state.quizzesReducer);
  const [quiz, setQuiz] = useState(
    quizzes.find((quiz: any) => quiz._id === qid) || {
      name: "New Quiz",
      introduction: "Quiz introductions...",
      type: "GRADED_QUIZ",
      group: "QUIZZES",
      timeLimit: 20,
      points: 100,
    }
  );
  const [question, setQuestion] = useState({
    title: "New Question",
    points: 10,
    description: "New question description",
    choice: [] as any[],
    type: "MULTIPLE_CHOICE",
    _id: null,
  });
  const [error, setError] = useState("");

  const save = async (published = false) => {
    let id = "";
    if (qid === "tmp") {
      id = await createQuiz({
        ...quiz,
        published: quiz.published ?? published,
      });
    } else {
      await updateQuiz({ ...quiz, published: quiz.published ?? published });
    }
    navigate(
      published
        ? `/Kanbas/Courses/${cid}/Quizzes`
        : `/Kanbas/Courses/${cid}/Quizzes/${quiz._id || id}/Details`
    );
  };
  const createQuiz = async (quiz: any) => {
    try {
      const res = await client.createQuiz(cid as string, quiz);
      const quizzes = await client.findQuizzesForCourse(cid as string);
      dispatch(setQuizzes(quizzes));
      return res._id;
    } catch (err: any) {
      document
        .querySelector("#wd-quiz-editor")
        ?.parentElement?.scrollTo({ top: 0 });
      setError(err.response.data.message);
    }
  };
  const updateQuiz = async (quiz: any) => {
    await client.updateQuiz(quiz);
    const quizzes = await client.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
  };

  const fetchQuizzes = async () => {
    const quizzes = await client.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
  };

  const fetchQuestions = async () => {
    const questions = await client.findQuestionsForQuiz(qid as string);
    dispatch(setQuestions(questions));
  };

  const createQuestion = async () => {
    try {
      await (question._id
        ? client.updateQuestion(question._id, question)
        : client.createQuestion(quiz._id as string, question));
      (document.querySelector("#closeQuestion") as HTMLElement)?.click();
      const questions = await client.findQuestionsForQuiz(qid as string);
      setQuestion({
        title: "New Question",
        points: 10,
        description: "New question description",
        choice: [] as any[],
        type: "MULTIPLE_CHOICE",
        _id: null,
      });
      dispatch(setQuestions(questions));
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };

  useEffect(() => {
    fetchQuizzes();
    fetchQuestions();
  }, []);

  return (
    <div id="wd-quiz-editor">
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#home-tab-pane"
            type="button"
            role="tab"
            aria-controls="home-tab-pane"
            aria-selected="true"
          >
            Details
          </button>
        </li>
        {quiz._id && (
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile-tab-pane"
              type="button"
              role="tab"
              aria-controls="profile-tab-pane"
              aria-selected="false"
            >
              Questions
            </button>
          </li>
        )}
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="home-tab-pane"
          role="tabpanel"
          aria-labelledby="home-tab"
          tabIndex={0}
        >
          <div>
            {error && (
              <div className="wd-error alert alert-danger">{error}</div>
            )}
            <div className="mb-3">
              <label htmlFor="wd-name" className="form-label">
                Quiz Name
              </label>
              <input
                id="wd-name"
                className="form-control mb-3"
                value={quiz.name}
                onChange={(e) =>
                  setQuiz((v: any) => ({ ...v, name: e.target.value }))
                }
              />
              <label htmlFor="wd-name" className="form-label">
                Quiz Introductions
              </label>
              <textarea
                id="wd-introduction"
                className="form-control col-12"
                rows={2}
                style={{ resize: "none" }}
                value={quiz.introduction}
                onChange={(e) =>
                  setQuiz((v: any) => ({ ...v, introduction: e.target.value }))
                }
              />
            </div>
            <div className="mb-3 row">
              <label htmlFor="wd-type" className="form-label col-3 text-end">
                Quiz Type
              </label>
              <div className="col-9">
                <select
                  className="wd-type form-select mt-2"
                  value={quiz.type}
                  onChange={(e) => {
                    setQuiz({ ...quiz, type: e.target.value });
                  }}
                >
                  <option value="GRADED_QUIZ">Graded Quiz</option>
                  <option value="PRACTICE_QUIZ">Practice Quiz</option>
                  <option value="GRADED_SURVEY">Graded Survey</option>
                  <option value="UNGRADED_SURVEY">Ungraded Survey</option>
                </select>
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="wd-points" className="form-label col-3 text-end">
                Points
              </label>
              <div className="col-9">
                <input
                  id="wd-points"
                  className="form-control mb-3"
                  value={quiz.points}
                  type="number"
                  onChange={(e) =>
                    setQuiz((v: any) => ({ ...v, points: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label
                className="form-label col-3 text-end"
                htmlFor="flexCheckDefault"
              >
                Time Limit
              </label>
              <div className="col-2">
                <input
                  className="form-control"
                  type="number"
                  value={quiz.timeLimit}
                  onChange={(e) => {
                    setQuiz({ ...quiz, timeLimit: e.target.value });
                  }}
                ></input>
              </div>
              <label className="form-label col-2" htmlFor="flexCheckDefault">
                Minutes
              </label>
            </div>
            <div className="mb-3 row">
              <label htmlFor="wd-assign" className="form-label col-3 text-end">
                Assign
              </label>
              <div className="col-9">
                <div className="border rounded p-3">
                  <label htmlFor="wd-options" className="form-label mb-3">
                    Due
                  </label>
                  <input
                    className="form-control mb-3"
                    type="date"
                    value={quiz.dueDate}
                    onChange={(e) =>
                      setQuiz((v: any) => ({ ...v, dueDate: e.target.value }))
                    }
                  />
                  <div className="row">
                    <div className="col-6">
                      <label htmlFor="wd-options" className="form-label">
                        Available from
                      </label>
                      <input
                        className="form-control"
                        type="date"
                        value={quiz.availableDate}
                        onChange={(e) =>
                          setQuiz((v: any) => ({
                            ...v,
                            availableDate: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="col-6">
                      <label htmlFor="wd-options" className="form-label">
                        Until
                      </label>
                      <input
                        className="form-control"
                        type="date"
                        value={quiz.untilDate}
                        onChange={(e) =>
                          setQuiz((v: any) => ({
                            ...v,
                            untilDate: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="wd-group" className="form-label col-3 text-end">
                Assignment Group
              </label>
              <div className="col-9">
                <select
                  className="wd-group form-select mt-2"
                  value={quiz.group}
                  onChange={(e) => {
                    setQuiz({ ...quiz, group: e.target.value });
                  }}
                >
                  <option value="QUIZZES">QUIZZES</option>
                  <option value="EXAMS">EXAMS</option>
                  <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                  <option value="PROJECT">PROJECT</option>
                </select>
              </div>
            </div>
            <div className="mb-3 row">
              <label
                htmlFor="wd-options"
                className="form-label mb-3 col-3 text-end"
              >
                Options
              </label>
              <div className="col-9 mt-2">
                <div className="mb-3">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    value={quiz.shuffleAnswers}
                    onChange={(e) => {
                      setQuiz({ ...quiz, shuffleAnswers: e.target.value });
                    }}
                  ></input>
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Shuffle Answers
                  </label>
                </div>

                <div className="mb-3">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    value={quiz.multipleAttempts}
                    onChange={(e) => {
                      setQuiz({ ...quiz, multipleAttempts: e.target.value });
                    }}
                  ></input>
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Allow multiple Attempts
                  </label>
                </div>
                <div className="mb-3">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    value={quiz.showCorrectAnswers}
                    onChange={(e) => {
                      setQuiz({ ...quiz, showCorrectAnswers: e.target.value });
                    }}
                  ></input>
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Show Correct Answers
                  </label>
                </div>
                <div className="mb-3">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    value={quiz.multipleAttempts}
                    onChange={(e) => {
                      setQuiz({ ...quiz, multipleAttempts: e.target.value });
                    }}
                  ></input>
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Allow multiple Attempts
                  </label>
                </div>
                <div className="mb-3">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    value={quiz.oneQuestionAtATime}
                    onChange={(e) => {
                      setQuiz({ ...quiz, oneQuestionAtATime: e.target.value });
                    }}
                  ></input>
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    One Question at a Time
                  </label>
                </div>
                <div className="mb-3">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    value={quiz.webcamRequired}
                    onChange={(e) => {
                      setQuiz({ ...quiz, webcamRequired: e.target.value });
                    }}
                  ></input>
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Webcam Required
                  </label>
                </div>
                <div className="mb-3">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    value={quiz.lockQuestionsAfterAnswering}
                    onChange={(e) => {
                      setQuiz({
                        ...quiz,
                        lockQuestionsAfterAnswering: e.target.value,
                      });
                    }}
                  ></input>
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Lock Questions After Answering
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="wd-points" className="form-label col-3 text-end">
                Access Code
              </label>
              <div className="col-9">
                <input
                  id="wd-points"
                  className="form-control mb-3"
                  value={quiz.accessCode}
                  type="number"
                  onChange={(e) =>
                    setQuiz((v: any) => ({ ...v, accessCode: e.target.value }))
                  }
                />
              </div>
            </div>

            <hr />
            <div className="clearfix mb-3">
              <div className="float-end">
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary me-2" onClick={() => save()}>
                  Save
                </button>
                <button className="btn btn-danger" onClick={() => save(true)}>
                  Save and Publish
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="profile-tab-pane"
          role="tabpanel"
          aria-labelledby="profile-tab"
          tabIndex={0}
        >
          <div style={{ margin: "40px 0 0 40px" }}>
            <button
              className="btn btn-outline-secondary "
              data-bs-toggle="modal"
              data-bs-target="#newQuestionModal"
              id="newQuestion"
            >
              + New Question
            </button>
            <ol
              className="list-group list-group-numbered"
              style={{ marginTop: 20 }}
            >
              {questions.map((i: any, index) => (
                <li className="list-group-item" key={index}>
                  <span className="me-2">{i.title}</span>
                  <FaPencil
                    className="text-primary  "
                    onClick={() => {
                      setQuestion(i);
                      (
                        document.querySelector("#newQuestion") as HTMLElement
                      )?.click();
                    }}
                  />
                  <br />
                  <span style={{ color: "#999", fontSize: "16px" }}>
                    {i.type} | {i.points} pts
                  </span>
                </li>
              ))}
            </ol>
            <div
              className="modal fade"
              id="newQuestionModal"
              tabIndex={-1}
              aria-labelledby="newQuestionModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      New Question
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3 row">
                      <label
                        htmlFor="wd-name"
                        className="form-label col-3 text-end"
                      >
                        Questions
                      </label>
                      <div className="col-9">
                        <textarea
                          id="wd-introduction"
                          className="form-control "
                          rows={2}
                          style={{ resize: "none" }}
                          value={question.title}
                          onChange={(e) =>
                            setQuestion((v: any) => ({
                              ...v,
                              title: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label
                        htmlFor="wd-name"
                        className="form-label col-3 text-end"
                      >
                        Type
                      </label>
                      <div className="col-9">
                        <select
                          className="wd-type form-select mt-2"
                          value={question.type}
                          onChange={(e) => {
                            switch (e.target.value) {
                              case "TRUE/FALSE":
                                setQuestion({
                                  ...question,
                                  type: e.target.value,
                                  choice: [
                                    { isCorrect: false, content: "True" },
                                    { isCorrect: false, content: "False" },
                                  ],
                                });
                                break;
                              case "MULTIPLE_CHOICE":
                                setQuestion({
                                  ...question,
                                  type: e.target.value,
                                });
                                break;
                              case "FILL_IN_MULTIPLE_BLANKS":
                                setQuestion({
                                  ...question,
                                  type: e.target.value,
                                  choice: [
                                    { isCorrect: true, content: "" },
                                    { isCorrect: true, content: "" },
                                  ],
                                });
                                break;
                              default:
                                break;
                            }
                          }}
                        >
                          <option value="TRUE/FALSE">
                            True/false question
                          </option>
                          <option value="MULTIPLE_CHOICE">
                            Multiple choice question
                          </option>
                          <option value="FILL_IN_MULTIPLE_BLANKS">
                            Fill in multiple blanks question
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label
                        htmlFor="wd-name"
                        className="form-label col-3 text-end"
                      >
                        Points
                      </label>
                      <div className="col-9">
                        <input
                          id="wd-points"
                          className="form-control mb-3 "
                          value={question.points}
                          type="number"
                          onChange={(e) =>
                            setQuestion((v: any) => ({
                              ...v,
                              points: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label
                        htmlFor="wd-name"
                        className="form-label col-3 text-end"
                      >
                        Answers
                      </label>
                      <div className="col-9">
                        {question.choice.map((i, index) => {
                          return (
                            <div key={index} className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={i.isCorrect}
                                onChange={(e) => {
                                  question.choice.forEach((j) => ({
                                    ...j,
                                    isCorrect: false,
                                  }));
                                  question.choice[index].isCorrect = true;
                                  setQuestion({
                                    ...question,
                                  });
                                }}
                              />
                              {question.type === "TRUE/FALSE" ? (
                                i.content
                              ) : (
                                <>
                                  <div
                                    style={{
                                      width: "130px",
                                      display: "inline-block",
                                    }}
                                  >
                                    {i.isCorrect
                                      ? "Correct Answer"
                                      : "Possible Answer"}
                                  </div>
                                  <input
                                    className="form-control"
                                    value={i.content}
                                    style={{
                                      width: "160px",
                                      display: "inline-block",
                                    }}
                                    onChange={(e) => {
                                      question.choice[index].content =
                                        e.target.value;
                                      setQuestion({ ...question });
                                    }}
                                  />
                                  <FaTrash
                                    className="text-danger ms-2"
                                    onClick={() => {
                                      setQuestion({
                                        ...question,
                                        choice: question.choice.filter(
                                          (j, jdx) => jdx !== index
                                        ),
                                      });
                                    }}
                                  />
                                </>
                              )}
                            </div>
                          );
                        })}
                        {question.type !== "TRUE/FALSE" && (
                          <button
                            className="btn text-danger"
                            onClick={() =>
                              setQuestion({
                                ...question,
                                choice: [
                                  ...question.choice,
                                  { content: "New Answer", isCorrect: false },
                                ],
                              })
                            }
                          >
                            + Add Another Answer
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      id="closeQuestion"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => createQuestion()}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
