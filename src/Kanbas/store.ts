import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./CoursesEdit/Modules/reducer";
import assignmentsReducer from "./CoursesEdit/Assignments/reducer";
import accountReducer from "./Account/reducer";
import coursesReducer from './CourseList/reducer'
const store = configureStore({
  reducer: {
    modulesReducer,
    assignmentsReducer,
    accountReducer,
    coursesReducer
  },
});
export default store;
