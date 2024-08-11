import { useEffect } from "react";
import AssignmentsControls from "./AssignmentsControls";
import { deleteAssignment, setAssignments } from "./reducer";
import * as client from "../Assignments/client";
import { useSelector, useDispatch } from "react-redux";
import { BsGripVertical } from "react-icons/bs";
import { useParams, useNavigate } from "react-router";
import "./index.css";

export default function Assignments() {
  const navigate = useNavigate();
  const { cid } = useParams();
  const dispatch = useDispatch();

  const { assignments } = useSelector((state: any) => state.assignmentsReducer);

  const fetchAssignments = async () => {
    const assignments = await client.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };
  useEffect(() => {
    fetchAssignments();
  }, []);
  return (
    <div id="wd-assignments">
      <AssignmentsControls
        addAssignment={() => {
          navigate(`/Kanbas/Courses/${cid}/Assignments/tmp`);
        }}
      />
      <ul id="wd-assignment-list" className="list-group rounded-0 mt-3">
        <li className="wd-assignment list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-assignments-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            ASSIGNMENTS
          </div>
          <ul className="wd-assignments list-group rounded-0">
            {assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
                <li className="wd-assignment-list-item list-group-item p-3 ps-1">
                  <BsGripVertical className="me-2 fs-3" />
                  <div
                    style={{ display: "inline-flex", flexDirection: "column" }}
                  >
                    {assignment.title}
                    <br />
                    <span style={{ color: "#999", fontSize: 16 }}>
                      {assignment.description} | Not available util{" "}
                      {assignment.available} | Due {assignment.until} |{" "}
                      {assignment.points}
                      pts
                    </span>
                  </div>
                </li>
              ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}
