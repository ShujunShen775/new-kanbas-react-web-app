import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaPlus } from "react-icons/fa";
export default function LessonControlButtons() {
  return (
    <div className="float-end">
      <button className="btn btn-outline-secondary me-3">40% 0f Total</button>
      <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
      <IoEllipsisVertical className="fs-4" />
    </div>
);}