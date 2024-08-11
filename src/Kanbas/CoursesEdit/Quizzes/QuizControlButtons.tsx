import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { BsGripVertical } from "react-icons/bs";

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
      <span
        style={{ opacity: published ? 1 : "0.6" }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <GreenCheckmark />
      </span>

      <IoEllipsisVertical
        className="fs-4"
        data-bs-toggle="dropdown"
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
      <div className="dropdown" onClick={(e) => e.stopPropagation()}>
        <ul className="dropdown-menu" aria-labelledby="wd-publish-all-btn">
          <li
            onClick={(e) => {
              e.stopPropagation();
              editQuiz(quizId);
            }}
            style={{ padding: "6px 0 6px 15px" }}
          >
            <FaPencil className="text-primary me-2" />
            Edit
          </li>
          <li
            onClick={(e) => e.stopPropagation()}
            data-bs-toggle="modal"
            data-bs-target="#deleteQuizModal"
            style={{ padding: "6px 0 6px 15px" }}
          >
            <FaTrash className="text-danger me-2 mb-1" />
            Delete
          </li>
          <li
            onClick={(e) => {
              e.stopPropagation();
              publishQuiz(quizId);
            }}
            style={{ padding: "6px 0 6px 15px" }}
          >
            <GreenCheckmark />
            Publish
          </li>
          <li
            onClick={(e) => {
              e.stopPropagation();
            }}
            style={{ padding: "6px 0 6px 15px" }}
          >
            <FaPlus className="text-danger me-2 mb-1" />
            Copy
          </li>
          <li
            onClick={(e) => {
              e.stopPropagation();
            }}
            style={{ padding: "6px 0 6px 15px" }}
          >
            <BsGripVertical className="text-danger me-2 mb-1" />
            Sort
          </li>
        </ul>
      </div>
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
