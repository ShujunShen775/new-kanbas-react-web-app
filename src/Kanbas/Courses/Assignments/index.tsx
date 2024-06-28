import AssignmentsControls from "./AssignmentsControls";
import { deleteAssignment } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { BsGripVertical } from "react-icons/bs";
import { useParams, useNavigate } from "react-router";
import LessonControlButtons from "./LessonControlButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";
import "./index.css";

export default function Assignments() {
  const navigate = useNavigate();
  const { cid } = useParams();
  const dispatch = useDispatch();

  const { assignments } = useSelector((state: any) => state.assignmentsReducer);

  return (
    <div id="wd-assignments">
      <AssignmentsControls
        addAssignment={() => {
          navigate(`/Kanbas/Courses/${cid}/Assignments/tmp`);
        }}
      />
      <ul id="wd-assignment-list" className="list-group rounded-0 mt-3">
        <li className="wd-assignment list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-assignments-title p-3 ps-2">
            <BsGripVertical className="me-2 fs-3" />
            ASSIGNMENTS
            <LessonControlButtons />
          </div>
          <ul className="wd-assignments list-group rounded-0">
            {assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
                <li className="wd-assignment-list-item list-group-item p-3 ps-1">
                  <BsGripVertical className="me-2 fs-3" />
                  <div style={{ display: "inline-flex" }}>
                    {assignment.title}
                    <br />
                    {assignment.description} | Not available util{" "}
                    {assignment.available} | Due{" "}
                    {assignment.until} |{" "}
                    {assignment.points}
                    pts
                  </div>
                  <AssignmentControlButtons
                    assignmentId={assignment._id}
                    deleteAssignment={(assignmentId) => {
                      dispatch(deleteAssignment(assignmentId));
                    }}
                    editAssignment={() =>
                      navigate(
                        `/Kanbas/Courses/${assignment.course}/Assignments/${assignment._id}`
                      )
                    }
                  />
                </li>
              ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}
