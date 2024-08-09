import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import ModuleEditor from "./ModuleEditor";

export default function ModulesControls({
  moduleName,
  setModuleName,
  addModule,
}: {
  moduleName: string;
  setModuleName: (title: string) => void;
  addModule: () => void;
}) {
  return (
    <div id="wd-modules-controls" className="text-nowrap clearfix">
      <button
        id="wd-add-module-btn"
        className="btn btn-lg btn-danger me-1 float-end"
        data-bs-toggle="modal"
        data-bs-target="#wd-add-module-dialog"
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </button>
      <button
        id="wd-publish-all-btn"
        className="btn btn-lg btn-secondary dropdown-toggle me-1 float-end"
        type="button"
        data-bs-toggle="dropdown"
      >
        <GreenCheckmark />
        Publish All
      </button>
      <div className="dropdown">
        <ul className="dropdown-menu" aria-labelledby="wd-publish-all-btn">
          <li>
            <a
              id="wd-publish-all-modules-and-items-btn"
              className="dropdown-item"
              href="#"
            >
              <GreenCheckmark />
              Publish all modules and items
            </a>
          </li>
          <li>
            <a
              id="wd-publish-modules-only-button"
              className="dropdown-item"
              href="#"
            >
              <GreenCheckmark />
              Publish modules only
            </a>
          </li>
          {/* Create two more items with IDs wd-unpublish-all-modules-and-items and
              wd-unpublish-modules-only with labels Unpublish all modules and items
              and Unpublish modules only */}
        </ul>
      </div>
      <button
        id="wd-view-progress"
        className="btn btn-lg btn-secondary me-1 float-end"
        type="button"
      >
        View Progress
      </button>
      <button
        id="wd-collapse-all"
        className="btn btn-lg btn-secondary me-1 float-end"
        type="button"
      >
        Collapse All
      </button>
      <ModuleEditor
        dialogTitle="Add Module"
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={addModule}
      />
    </div>
  );
}
