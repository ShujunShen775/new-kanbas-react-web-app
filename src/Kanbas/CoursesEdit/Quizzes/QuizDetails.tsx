import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { FaPencil } from "react-icons/fa6";

export default function QuizDetails() {
  const { qid, cid } = useParams();
  const navigate = useNavigate();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const quiz = quizzes.find((quiz: any) => quiz._id === qid);
  return (
    <div>
      <button className="btn btn-outline-secondary me-3">Preview</button>
      <button
        className="btn btn-outline-secondary "
        onClick={() =>
          navigate(`/Kanbas/Courses/${quiz.course}/Quizzes/${quiz._id}`)
        }
      >
        <FaPencil className="me-2" />
        Edit
      </button>
      <br />
      <hr />
      <h1>{quiz.name}</h1>
      <h3>{quiz.introductions}</h3>
      <div>
        <div className="row">
          <div className="col-3 text-end">Quiz Type</div>
          <div className="col-9">{quiz.type}</div>
        </div>
        <div className="row">
          <div className="col-3 text-end">Points</div>
          <div className="col-9">{quiz.points}</div>
        </div>
        <div className="row">
          <div className="col-3 text-end">Assignment Group</div>
          <div className="col-9">{quiz.group}</div>
        </div>
        <div className="row">
          <div className="col-3 text-end">Shuffle Answers</div>
          <div className="col-9">{quiz.shuffleAnswers ? "Yes" : "No"}</div>
        </div>
        <div className="row">
          <div className="col-3 text-end">Time Limit</div>
          <div className="col-9">{quiz.timeLimit} Minutes</div>
        </div>
        <div className="row">
          <div className="col-3 text-end">Multiple Attempts</div>
          <div className="col-9">{quiz.multipleAttempts ? "Yes" : "No"}</div>
        </div>
        <div className="row">
          <div className="col-3 text-end">Show Correct Answers</div>
          <div className="col-9">{quiz.showCorrectAnswers ? "Yes" : "No"}</div>
        </div>
        <div className="row">
          <div className="col-3 text-end">One Question at a Time</div>
          <div className="col-9">{quiz.oneQuestionAtATime ? "Yes" : "No"}</div>
        </div>

        <div className="row">
          <div className="col-3 text-end">Webcam Required</div>
          <div className="col-9">{quiz.webcamRequired ? "Yes" : "No"}</div>
        </div>
        <div className="row">
          <div className="col-3 text-end">Lock Questions After Answering</div>
          <div className="col-9">
            {quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
          </div>
        </div>

        <div className="row">
          <div className="col-3 text-end">Due</div>
          <div className="col-9">{quiz.dueDate}</div>
        </div>
        <div className="row">
          <div className="col-3 text-end">For</div>
          <div className="col-9">Everyone</div>
        </div>
        <div className="row">
          <div className="col-3 text-end">Available from</div>
          <div className="col-9">{quiz.availableDate}</div>
        </div>
        <div className="row">
          <div className="col-3 text-end">Until</div>
          <div className="col-9">{quiz.untilDate}</div>
        </div>
        <br />
        <br />
        <table className="table">
          <tbody>
            <tr>
              <td>Due</td>
              <td>For</td>
              <td>Available from</td>
              <td>Until</td>
            </tr>
            <tr>
              <td>{quiz.dueDate}</td>
              <td>Everyone</td>
              <td>{quiz.availableDate}</td>
              <td>{quiz.untilDate}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
