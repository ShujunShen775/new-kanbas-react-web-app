import Quizzes from "../Quizzes";
export default function Home() {
  return (
    <div id="wd-home" className="d-flex">
      <div className="flex-fill me-5">
        <Quizzes />
      </div>
    </div>
  );
}
