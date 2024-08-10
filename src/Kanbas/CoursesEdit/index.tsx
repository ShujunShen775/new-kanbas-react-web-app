import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Grades from "./Grades";
import PeopleTable from "../../Courses/People/Table";
import Quizzes from "./Quizzes";
import QuizEditor from "./Quizzes/Editor";
import QuizDetails from "./Quizzes/QuizDetails";
import QuizPreview from "./Quizzes/QuizPreview";
import { useLocation, Route, Routes, useParams } from "react-router";
import "./index.css";

export default function Courses() {
  return (
    <div className="d-flex">
      <div className="d-none d-md-block">
        <CoursesNavigation />
      </div>
      <div className="flex-fill main-wrapper">
        <Routes>
          <Route path="Home" element={<Home />} />
          <Route path="Modules" element={<Modules />} />
          <Route path="Assignments" element={<Assignments />} />
          <Route path="Assignments/:aid" element={<AssignmentEditor />} />
          <Route path="Grades" element={<Grades />} />
          <Route path="People" element={<PeopleTable />} />
          <Route path="People/:uid" element={<PeopleTable />} />
          <Route path="Quizzes" element={<Quizzes />} />
          <Route path="Quizzes/:qid" element={<QuizEditor />} />
          <Route path="Quizzes/:qid/Preview" element={<QuizPreview />} />
          <Route path="Quizzes/:qid/Details" element={<QuizDetails />} />
        </Routes>
      </div>
    </div>
  );
}
