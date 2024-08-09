import { useLocation, Route, Routes, useParams } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import { useSelector } from "react-redux";
import CoursesEdit from "../CoursesEdit";
import CoursesView from "../CoursesView";
import "./index.css";

export default function Courses() {
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const { cid } = useParams();
  const course = courses.find((course: any) => course._id === cid);
  const { pathname } = useLocation();

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1 float-start" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />
      {currentUser.role === "FACULTY" ? (
        <CoursesEdit></CoursesEdit>
      ) : (
        <CoursesView></CoursesView>
      )}
    </div>
  );
}
