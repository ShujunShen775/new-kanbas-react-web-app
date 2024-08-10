import { FaPlus } from "react-icons/fa6";
import InputSearch from "./InputSearch";
import { useNavigate, useParams } from "react-router";
export default function AssignmentsControls() {
  const navigate = useNavigate();
  const { cid } = useParams();

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
