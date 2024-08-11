import { FaFileImport } from "react-icons/fa6";
import { LiaFileImportSolid } from "react-icons/lia";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import * as client from "./client";

export default function Grades() {
  const { cid } = useParams();
  const [grades, setGrades] = useState([]);

  const getGrades = async () => {
    const res = await client.findGradesForQuiz(cid as string);
    res.length && setGrades(res);
  };

  useEffect(() => {
    getGrades();
  }, []);

  return (
    <div>
      <table className="table table-striped">
        <tbody>
          <tr>
            <td>Quiz Name</td>
            <td>Student Name</td>
            <td>Grade</td>
            <td>Date</td>
          </tr>
          {grades.map((g: any) => (
            <tr>
              <td>{g.quizName}</td>
              <td>{g.studentName}</td>
              <td>{g.score}</td>
              <td>{g.updateDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
