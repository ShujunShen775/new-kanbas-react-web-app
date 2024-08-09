import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import Grades from "./Grades";
import PeopleTable from "../../Courses/People/Table";
import { useLocation, Route, Routes, useParams } from "react-router";
import "./index.css";

export default function CoursesView() {
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
          <Route path="Grades" element={<Grades />} />
          <Route path="People" element={<PeopleTable />} />
        </Routes>
      </div>
    </div>
  );
}
