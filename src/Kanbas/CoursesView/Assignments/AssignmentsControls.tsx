import { FaPlus } from "react-icons/fa6";
import InputSearch from "./InputSearch";
export default function AssignmentsControls({
  addAssignment,
}: {
  addAssignment: () => void;
}) {
  return (
    <div id="wd-assignment-controls container" className="text-nowrap">
      <div className="row">
        <div className="col">
          <InputSearch />
        </div>
      </div>
    </div>
  );
}
