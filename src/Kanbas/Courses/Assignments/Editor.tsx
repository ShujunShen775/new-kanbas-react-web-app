import "./index.css";
import { useState } from "react";
import * as client from "./client";
import { addAssignment, updateAssignment } from "./reducer";
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";

export default function AssignmentEditor() {
  const { aid, cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const [assignment, setAssignment] = useState(
    assignments.find((assignment: any) => assignment._id === aid) || {
      title: "",
      description: "",
      points: "",
      assignTo: "",
      due: "",
      available: "",
      until: "",
    }
  );

  const createAssignment = async (aid: any) => {
    const newAssignment = await client.createAssignment(
      aid as string,
      assignment
    );
    dispatch(addAssignment(newAssignment));
  };
  const saveAssignment = async (module: string) => {
    await client.updateAssignment(module);
    dispatch(updateAssignment(module));
  };

  return (
    <div id="wd-assignments-editor">
      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label">
          Assignment Name
        </label>
        <input
          id="wd-name"
          className="form-control mb-3"
          value={assignment.title}
          onChange={(e) =>
            setAssignment((v: any) => ({ ...v, title: e.target.value }))
          }
        />
        <textarea
          id="wd-description"
          className="form-control col-12"
          rows={5}
          style={{ resize: "none" }}
          value={assignment.description}
          onChange={(e) =>
            setAssignment((v: any) => ({ ...v, description: e.target.value }))
          }
        />
      </div>
      <div className="mb-3 row">
        <label htmlFor="wd-points" className="form-label col-3 text-end">
          Points
        </label>
        <div className="col-9">
          <input
            id="wd-points"
            className="form-control"
            value={assignment.points}
            onChange={(e) =>
              setAssignment((v: any) => ({ ...v, points: e.target.value }))
            }
          />
        </div>
      </div>
      <div className="mb-3 row">
        <label htmlFor="wd-group" className="form-label col-3 text-end">
          Assignment Group
        </label>
        <div className="col-9">
          <select className="form-select" aria-label="Assignment Group">
            <option value="assignments" selected>
              ASSIGNMENTS
            </option>
            <option value="modules">MODULES</option>
          </select>
        </div>
      </div>
      <div className="mb-3 row">
        <label htmlFor="wd-grade" className="form-label col-3 text-end">
          Display Grade as
        </label>
        <div className="col-9">
          <select className="form-select" aria-label="Display Grade as">
            <option value="percentage" selected>
              percentage
            </option>
            <option value="number">number</option>
          </select>
        </div>
      </div>
      <div className="mb-3 row">
        <label htmlFor="wd-type" className="form-label col-3 text-end">
          Submission Type
        </label>
        <div className="col-9">
          <div className="border rounded p-3">
            <select className="form-select mb-3" aria-label="Submission Type">
              <option value="Online" selected>
                Online
              </option>
              <option value="modules">MODULES</option>
            </select>
            <label htmlFor="wd-options" className="form-label mb-2">
              Online Entry Options
            </label>
            <div className="mb-3">
              <input
                className="form-check-input me-2"
                type="checkbox"
                value=""
              ></input>
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Text Entry
              </label>
            </div>
            <div className="mb-3">
              <input
                className="form-check-input me-2"
                type="checkbox"
                value=""
              ></input>
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Website URL
              </label>
            </div>
            <div className="mb-3">
              <input
                className="form-check-input me-2"
                type="checkbox"
                value=""
              ></input>
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Media Recordings
              </label>
            </div>
            <div className="mb-3">
              <input
                className="form-check-input me-2"
                type="checkbox"
                value=""
              ></input>
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Student Annotation
              </label>
            </div>
            <div className="mb-3">
              <input
                className="form-check-input me-2"
                type="checkbox"
                value=""
              ></input>
              <label className="form-check-label" htmlFor="flexCheckDefault">
                File Uploads
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-3 row">
        <label htmlFor="wd-assign" className="form-label col-3 text-end">
          Assign
        </label>
        <div className="col-9">
          <div className="border rounded p-3">
            <label htmlFor="wd-options" className="form-label mb-3">
              Assign to
            </label>
            <input
              className="form-control mb-3"
              value={assignment.assignTo}
              onChange={(e) =>
                setAssignment((v: any) => ({ ...v, assignTo: e.target.value }))
              }
            />
            <label htmlFor="wd-options" className="form-label mb-3">
              Due
            </label>
            <input
              className="form-control mb-3"
              type="date"
              value={assignment.due}
              onChange={(e) =>
                setAssignment((v: any) => ({ ...v, due: e.target.value }))
              }
            />
            <div className="row">
              <div className="col-6">
                <label htmlFor="wd-options" className="form-label">
                  Available from
                </label>
                <input
                  className="form-control"
                  type="date"
                  value={assignment.available}
                  onChange={(e) =>
                    setAssignment((v: any) => ({
                      ...v,
                      available: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="col-6">
                <label htmlFor="wd-options" className="form-label">
                  Until
                </label>
                <input
                  className="form-control"
                  type="date"
                  value={assignment.until}
                  onChange={(e) =>
                    setAssignment((v: any) => ({ ...v, until: e.target.value }))
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="clearfix mb-3">
        <div className="float-end">
          <button
            className="btn btn-secondary me-2"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              aid === "tmp"
                ? createAssignment({
                    ...assignment,
                    course: cid,
                  })
                : saveAssignment(assignment);
              navigate(-1);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
