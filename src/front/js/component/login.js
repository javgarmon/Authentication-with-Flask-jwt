import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store, actions } = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      actions.login(email, password);
    } else {
      alert("Fill out all fields");
    }
  };
  return (
    <>
      {store.auth === true ? (
        <Navigate to="/profile" />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3 row">
            <label
              htmlFor="exampleFormControlInput1"
              className=" col-sm-4 col-form-label"
            >
              Email
            </label>
            <div className="col-md-8">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div class="mb-3 row">
            <label htmlFor="inputPassword" className="col-sm-4 col-form-label">
              Password
            </label>
            <div className="col-md-8">
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="col-12">
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default Login;
