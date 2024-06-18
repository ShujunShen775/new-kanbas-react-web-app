import { FaCheckCircle } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
export default function InputSearch() {
  return (
    <div className="form-control">
      <FaSearch style={{ color: "#ddd" }} />
      <input
        id="wd-search-assignment"
        placeholder="Search for Assignments"
        style={{ border: 0, outline: 0 }}
      />
    </div>
  );
}
