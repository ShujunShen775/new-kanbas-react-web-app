import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "react-router";
import LessonControlButtons from "./LessonControlButtons";
import ModulesControlButtons from "./ModulesControlButtons";
import { assignments, courses } from "../../Database";
import "./index.css";

export default function Assignments() {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);

  return (
    <div id="wd-assignments">
      <ModulesControls />
      <ul id="wd-assignment-list" className="list-group rounded-0 mt-3">
        <li className="wd-assignment list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-assignments-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            ASSIGNMENTS
            <ModulesControlButtons />
          </div>
          <ul className="wd-assignments list-group rounded-0">
            {assignments
              .filter((assignment) => assignment.course === cid)
              .map((assignment) => (
                <li className="wd-assignment-list-item list-group-item p-3 ps-1">
                  <a
                    href={`#/Kanbas/Courses/${assignment.course}/Assignments/${assignment._id}`}
                  >
                    <BsGripVertical className="me-2 fs-3" />
                    <div style={{ display: "inline-flex" }}>
                      {assignment.title}
                      <br />
                      Multiple Modules | Not available util{" "}
                      {course && course.startDate} | Due{" "}
                      {course && course.endDate} | {course && course.credits}
                      pts
                    </div>
                    <LessonControlButtons />
                  </a>
                </li>
              ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}
