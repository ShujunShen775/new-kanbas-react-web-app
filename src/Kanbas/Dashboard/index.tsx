import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import * as db from "../Database";
import EnrolledList from "../EnrolledList";
import PublishedList from "../PublishedList";
import * as client from "../Courses/client";
import "./index.css";
import { setCourses } from "../CourseList/reducer";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  const fetchCourses = async () => {
    const courses = await client.fetchAllCourses();
    dispatch(setCourses(courses));
  };

  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <div id="wd-dashboard">
      {currentUser.role === "FACULTY" ? (
        <PublishedList></PublishedList>
      ) : (
        <EnrolledList></EnrolledList>
      )}
    </div>
  );
}
