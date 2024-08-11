import { IoEllipsisVertical } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";

export default function AssignmentControlButtons({
  published,
}: {
  published: boolean;
}) {
  return (
    <div className="float-end">
      <span
        style={{ opacity: published ? 1 : "0.6" }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <GreenCheckmark />
      </span>
    </div>
  );
}
