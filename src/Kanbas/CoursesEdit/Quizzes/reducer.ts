import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  quizzes: [],
  questions: [],
};
const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
  },
});
export const { setQuizzes, setQuestions } = quizzesSlice.actions;
export default quizzesSlice.reducer;
