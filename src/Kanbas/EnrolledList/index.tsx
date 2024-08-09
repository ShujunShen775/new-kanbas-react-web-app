import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as client from "../Courses/client";
import { setCourses } from "../CourseList/reducer";
import "./index.css";

export default function EnrolledList() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const dispatch = useDispatch();

  const enrolledCourses = courses.filter((i: any) =>
    i.enrollers?.includes(currentUser._id)
  );

  const unenrollCourse = async (cid: string) => {
    await client.unenrollCourse(cid);

    const courses = await client.fetchAllCourses();
    dispatch(setCourses(courses));
  };

  return (
    <div id="wd-enrolled">
      <h1 id="wd-dashboard-title">
        Enrolled Courses ({enrolledCourses.length})
      </h1>
      <div id="wd-dashboard-courses" className="row">
        {enrolledCourses.length ? (
          <div className="row row-cols-1 row-cols-md-5 g-4">
            {enrolledCourses.map((course: any) => (
              <div
                className="wd-dashboard-course col"
                style={{ width: "300px" }}
              >
                <Link
                  to={`/Kanbas/Courses/${course._id}/Home`}
                  className="text-decoration-none"
                >
                  <div className="card rounded-3 overflow-hidden">
                    <img src="/images/stacked.jpg" height="{160}" alt="" />
                    <div className="card-body">
                      <span
                        className="wd-dashboard-course-link"
                        style={{
                          textDecoration: "none",
                          color: "navy",
                          fontWeight: "bold",
                        }}
                      >
                        {course.name}
                      </span>
                      <p
                        className="wd-dashboard-course-title card-text"
                        style={{ maxHeight: 53, overflow: "hidden" }}
                      >
                        {course.description}
                      </p>
                      <Link
                        to={`/Kanbas/Courses/${course._id}/Home`}
                        className="btn btn-primary"
                      >
                        Go
                      </Link>
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          unenrollCourse(course._id);
                        }}
                        className="btn btn-danger float-end"
                        id="wd-delete-course-click"
                      >
                        Unenroll
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <Link to={`/Kanbas/Courses`} className="btn btn-primary">
            to courses
          </Link>
        )}
      </div>
    </div>
  );
}
