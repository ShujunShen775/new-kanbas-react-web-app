import { IoEllipsisVertical } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";

export default function AssignmentControlButtons({
  quizId,
  deleteQuiz,
  editQuiz,
  published,
  publishQuiz,
}: {
  published: boolean;
  quizId: string;
  deleteQuiz: (qid: string) => void;
  editQuiz: (qid: string) => void;
  publishQuiz: (qid: string) => void;
}) {
  return (
    <div className="float-end">
      <FaPencil
        onClick={(e) => {
          e.stopPropagation();
          editQuiz(quizId);
        }}
        className="text-primary me-2"
      />
      <FaTrash
        className="text-danger me-2 mb-1"
        data-bs-toggle="modal"
        data-bs-target="#deleteQuizModal"
        onClick={(e) => e.stopPropagation()}
      />
      <span
        style={{ opacity: published ? 1 : "0.6" }}
        onClick={(e) => {
          e.stopPropagation();
          publishQuiz(quizId);
        }}
      >
        <GreenCheckmark />
      </span>
      <div
        className="modal fade"
        id="deleteQuizModal"
        tabIndex={-1}
        aria-labelledby="deleteQuizModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Remove
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to remove the quiz?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => deleteQuiz(quizId)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
