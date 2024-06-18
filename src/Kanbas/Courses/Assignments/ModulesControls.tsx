import { FaPlus } from "react-icons/fa6";
import InputSearch from "./InputSearch";
export default function ModulesControls() {
  return (
    <div id="wd-assignment-controls container" className="text-nowrap">
      <div className="row">
        <div className="col">
          <InputSearch />
        </div>
        <div className="col">
          <div className="clearfix">
            <button
              id="wd-add-module-btn"
              className="btn btn-lg btn-secondary me-1 float-end"
            >
              <FaPlus
                className="position-relative me-2"
                style={{ bottom: "1px" }}
              />
              Group
            </button>
            <button
              id="wd-add-module-btn"
              className="btn btn-lg btn-danger me-1 float-end"
            >
              <FaPlus
                className="position-relative me-2"
                style={{ bottom: "1px" }}
              />
              Assignment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
