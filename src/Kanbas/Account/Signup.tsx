import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
export default function Signup() {
  const [user, setUser] = useState<any>({ role: "FACULTY" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signup = async () => {
    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      navigate("/Kanbas/Account/Profile");
      setError("");
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };
  return (
    <div className="wd-signup-screen">
      <h1>Sign up</h1>
      {error && <div className="wd-error alert alert-danger">{error}</div>}
      <input
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="wd-username form-control mb-2"
        placeholder="username"
      />
      <input
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        type="password"
        className="wd-password form-control mb-2"
        placeholder="password"
      />
      <input
        className="wd-firstname form-control mt-2"
        value={user.firstName}
        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
      />
      <input
        className="wd-lastname form-control mt-2"
        value={user.lastName}
        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
      />
      <input
        className="wd-dob form-control mt-2"
        value={user.dob}
        onChange={(e) => setUser({ ...user, dob: e.target.value })}
        type="date"
      />
      <input
        className="wd-email form-control mt-2"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <select
        className="wd-role form-select mt-2"
        value={user.role}
        onChange={(e) => {
          setUser({ ...user, role: e.target.value });
        }}
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>
      <button onClick={signup} className="w-100 wd-signup-btn btn btn-primary mt-2">
        Sign up
      </button>
      <br />
      <Link to="/Kanbas/Account/Signin" className="wd-signin-link mt-2">
        Sign in
      </Link>
    </div>
  );
}
