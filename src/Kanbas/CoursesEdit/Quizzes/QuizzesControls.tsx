import { FaPlus } from "react-icons/fa6";
import InputSearch from "./InputSearch";
import { useNavigate, useParams } from "react-router";
export default function AssignmentsControls() {
  const navigate = useNavigate();
  const { cid } = useParams();

  return (
    <div id="wd-assignment-controls container" className="text-nowrap">
      <div className="row">
        <div className="col">
          <InputSearch />
        </div>
        <div className="col">
          <div className="clearfix">
            <button
              id="wd-add-quiz-btn"
              className="btn btn-lg btn-danger me-1 float-end"
              onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/tmp`)}
            >
              <FaPlus
                className="position-relative me-2"
                style={{ bottom: "1px" }}
              />
              Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
