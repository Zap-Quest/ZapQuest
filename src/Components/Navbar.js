import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, attemptLogin, signup } from "../store";

const Navbar = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [registerError, setRegisterError] = useState(null);

  const toggleRegisterMode = () => {
    setIsRegisterMode(!isRegisterMode);
  };

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
    setLoginError(null);
    setRegisterError(null);
  };

  const login = (ev) => {
    ev.preventDefault();
    dispatch(attemptLogin(credentials))
      .unwrap()
      .then(() => {
        const modal = document.getElementById("loginModal");
        if (modal) {
          modal.classList.remove("show");
          modal.setAttribute("aria-hidden", "true");
          modal.style.display = "none";
          const modalBackdrop = document.querySelector(".modal-backdrop");
          if (modalBackdrop) {
            modalBackdrop.parentNode.removeChild(modalBackdrop);
          }
        }
      })
      .catch((error) => {
        setLoginError(
          error.message || "An error occurred during login. Please try again."
        );
      });
  };

  const register = (ev) => {
    ev.preventDefault();
    dispatch(signup(credentials))
      .unwrap()
      .then(() => dispatch(attemptLogin(credentials)))
      .then(() => {
        const modal = document.getElementById("loginModal");
        if (modal) {
          modal.classList.remove("show");
          modal.setAttribute("aria-hidden", "true");
          modal.style.display = "none";
          const modalBackdrop = document.querySelector(".modal-backdrop");
          if (modalBackdrop) {
            modalBackdrop.parentNode.removeChild(modalBackdrop);
          }
        }
      })
      .catch((error) => {
        console.log("Registration error:", error); 
        setRegisterError(
          error.message || "An error occurred during registration. Please try again."
        );
      });
  };
  

  return (
    <nav className="navbar navbar-light bg-secondary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <i className="fa-solid fa-charging-station"></i>
          <span className="ml-2" style={{ fontFamily: 'Chantal', fontWeight: 'bold', fontSize: '1.25rem'}}>ZapQuest</span>
        </Link>
        {auth.username ? (
          <>
            <span className="navbar-text mr-2">Welcome, {auth.username}!</span>
            <div>
              <i
                className="fa-solid fa-circle-user fa-2xl mr-3"
                style={{ color: "#212529" }}
              ></i>
              <button
                className="btn btn-dark"
                onClick={() => dispatch(logout())}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <button
            type="button"
            className="btn btn-dark"
            data-toggle="modal"
            data-target="#loginModal"
          >
            Login
          </button>
        )}
      </div>
      {/* Login Modal */}
      <div
        className="modal fade"
        id="loginModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="loginModalLabel"
      >
        <div className="modal-dialog modal-md" role="document">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between align-items-center">
              <h4 className="modal-title" id="loginModalLabel">
                {isRegisterMode ? "Register" : "Sign In"}
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={isRegisterMode ? register : login}>
                <div className="form-group">
                  <label htmlFor="modalUsername">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="modalUsername"
                    placeholder="Username"
                    name="username"
                    value={credentials.username}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="modalPassword">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="modalPassword"
                    placeholder="Password"
                    name="password"
                    value={credentials.password}
                    onChange={onChange}
                  />
                </div>
                {isRegisterMode && (
                  <div className="form-group">
                    <label htmlFor="modalEmail">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="modalEmail"
                      placeholder="Email"
                      name="email"
                      value={credentials.email}
                      onChange={onChange}
                    />
                  </div>
                )}
                {isRegisterMode ? (
                  <button type="submit" className="btn btn-dark">
                    Register
                  </button>
                ) : (
                  <button type="submit" className="btn btn-dark">
                    Login
                  </button>
                )}
              </form>
              {isRegisterMode ? (
                <p>
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={toggleRegisterMode}
                  >
                    Sign In
                  </button>
                </p>
              ) : (
                <p>
                  Need an account?{" "}
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={toggleRegisterMode}
                  >
                    Register
                  </button>
                </p>
              )}
              {isRegisterMode && registerError && <div>{registerError}</div>}
              {!isRegisterMode && loginError && <div>{loginError}</div>}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
