import { FaFileImport } from "react-icons/fa6";
import { LiaFileImportSolid } from "react-icons/lia";
import { useParams } from "react-router";
import { users, enrollments, grades, assignments } from "../../Database";

export default function Grades() {
  const { cid } = useParams();
  const userIds = enrollments
    .filter((enrollment) => enrollment.course === cid)
    .map((enrollment) => enrollment.user);
  const userList = users.filter((user) => userIds.includes(user._id));
  const assignmentList = assignments.filter(
    (assignment) => assignment.course === cid
  );
  return (
    <div>
      <div className="mb-3 clearfix">
        <button
          className="btn btn-lg btn-secondary float-end dropdown-toggle"
          id="wd-export-grade-btn"
          data-bs-toggle="dropdown"
        >
          <LiaFileImportSolid className="me-2 fs-5" />
          Export
        </button>
        <button className="btn btn-lg btn-secondary me-1 float-end">
          <FaFileImport className="me-2 fs-5" />
          Import
        </button>
        <div className="dropdown">
          <ul className="dropdown-menu" aria-labelledby="wd-export-grade-btn">
            <li>1</li>
            <li>2</li>
          </ul>
        </div>
      </div>
      <table className="table table-striped">
        <tbody>
          <tr>
            <td>Student Name</td>
            {assignmentList.map((assignment) => (
              <td>
                {assignment._id} {assignment.title}
              </td>
            ))}
          </tr>
          {userList.map((user) => (
            <tr>
              <td>{user.username}</td>
              {assignmentList.map((assignment) => (
                <td>
                  {
                    grades.find(
                      (grade) =>
                        grade.student === user._id &&
                        grade.assignment === assignment._id
                    )?.grade
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
