import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import store from "./store";
import { Provider } from "react-redux";
import { Routes, Route, Navigate } from "react-router";
import CourseList from "./CourseList";
import Courses from "./Courses";
import Account from "./Account";
import ProtectedRoute from "./ProtectedRoute";
import "./styles.css";

export default function Kanbas() {
  return (
    <Provider store={store}>
      <div id="wd-kanbas" className="h-100">
        <div className="d-flex h-100">
          <div className="d-none d-md-block bg-black">
            <KanbasNavigation />
          </div>
          <div className="flex-fill p-4">
            <Routes>
              <Route path="/" element={<Navigate to="Dashboard" />} />
              <Route path="/Account/*" element={<Account />} />
              <Route
                path="Dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="Courses/:cid/*"
                element={
                  <ProtectedRoute>
                    <Courses />
                  </ProtectedRoute>
                }
              />
              <Route
                path="Courses"
                element={
                  <ProtectedRoute>
                    <CourseList />
                  </ProtectedRoute>
                }
              />
              <Route path="Calendar" element={<h1>Calendar</h1>} />
              <Route path="Inbox" element={<h1>Inbox</h1>} />
            </Routes>
          </div>
        </div>
      </div>
    </Provider>
  );
}
