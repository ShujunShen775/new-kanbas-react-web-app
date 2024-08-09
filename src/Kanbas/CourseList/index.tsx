import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as client from "../Courses/client";
import { setCourses } from "./reducer";
import "./index.css";

export default function CourseList() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const dispatch = useDispatch();

  const enrollCourse = async (cid: string) => {
    await client.enrollCourse(cid);
    const courses = await client.fetchAllCourses();
    dispatch(setCourses(courses));
  };

  const unenrollCourse = async (cid: string) => {
    await client.unenrollCourse(cid);
    const courses = await client.fetchAllCourses();
    dispatch(setCourses(courses));
  };

  const fetchCourses = async () => {
    const courses = await client.fetchAllCourses();
    dispatch(setCourses(courses));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div id="wd-course-list">
      <h2 id="wd-course-list-published">
        Published Courses ({courses.length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course: any) => (
            <div className="wd-dashboard-course col" style={{ width: "300px" }}>
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
                    {currentUser?.role === "STUDENT" &&
                      (course.enrollers?.includes(currentUser._id) ? (
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
                      ) : (
                        <button
                          id="wd-enroll-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            enrollCourse(course._id);
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Enroll
                        </button>
                      ))}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
