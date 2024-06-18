import { useLocation, useParams } from "react-router";
import "./index.css";
export default function CoursesNavigation() {
  const { cid } = useParams();
  const { pathname } = useLocation();

  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
  ];
  const path = pathname.split("/")[4]
  return (
    <div id="wd-courses-navigation" className="list-group fs-5 rounded-0 m-3">
      {links.map((link) => (
        <a
          id={`wd-course-${link.toLowerCase()}-link`}
          href={`#/Kanbas/Courses/${cid}/${link}`}
          className={`list-group-item ${
            link === path ? "active" : "text-danger"
          } border border-0`}
        >
          {link}
        </a>
      ))}
    </div>
  );
}
