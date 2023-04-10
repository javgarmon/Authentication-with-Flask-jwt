import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Home</span>
        </Link>
        <div className="d-flex">
          <Link to="/signup">
            <button className="btn btn-primary">Signup</button>
          </Link>
          <div className="me-2"></div>
          <div>
            {store.auth === true ? (
              <Link to="/">
                <button className="btn btn-primary" onClick={actions.logout}>
                  Logout
                </button>
              </Link>
            ) : (
              <Link to="/login">
                <button className="btn btn-primary">Login</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
