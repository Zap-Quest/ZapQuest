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

  const clickLogin = () => {
    setIsRegisterMode(false);
  };

  const clearForm = () => {
    setCredentials({
      username: "",
      email: "",
      password: "",
    });
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
          clearForm();
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
          error.message || "Invalid Username or Password. Please try again."
        );
      });
  };

  const register = async (ev) => {
    ev.preventDefault();
    try {
      await dispatch(signup(credentials));
      const loginResponse = await dispatch(attemptLogin(credentials));

      // If the login was successful, close the modal
      if (loginResponse.payload.toString().length > 0) {
        const modal = document.getElementById("loginModal");
        if (modal) {
          clearForm();
          modal.classList.remove("show");
          modal.setAttribute("aria-hidden", "true");
          modal.style.display = "none";
          const modalBackdrop = document.querySelector(".modal-backdrop");
          if (modalBackdrop) {
            modalBackdrop.parentNode.removeChild(modalBackdrop);
          }
        }
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.log("Registration error:", error);
      setRegisterError(
        error.message ||
          "An error occurred during registration. Please try again."
      );
    }
  };

  return (
    <nav className="navbar navbar-dark nav-color">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <i
            className="fa-solid fa-charging-station"
            style={{ color: "#EABD00" }}
          ></i>
          <span
            className="ml-2"
            style={{
              fontFamily: "Chantal",
              fontWeight: "bold",
              fontSize: "1.25rem",
              color: "#779DA6",
            }}
          >
            ZapQuest
          </span>
        </Link>
        {auth.username ? (
          <>
            <div>
              <p className="navbar-text mb-0 mr-2" aria-hidden="true">Welcome, {auth.username}!</p>
              <Link to="/myaccount">
                <i
                  className="fa-solid fa-circle-user fa-2xl mr-4"
                  style={{ color: "#779DA6" }}
                ></i>
              </Link>

              <button
                className="btn btn-dark default-button"
                onClick={() => dispatch(logout())}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <button
            type="button"
            className="btn btn-dark default-button"
            data-toggle="modal"
            data-target="#loginModal"
            onClick={clickLogin}
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
              <h4 className="modal-title ml-3" id="loginModalLabel">
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
                  <button type="submit" className="btn btn-dark default-button">
                    Register
                  </button>
                ) : (
                  <button type="submit" className="btn btn-dark default-button">
                    Login
                  </button>
                )}
                {isRegisterMode && registerError && <div>{registerError}</div>}
                {!isRegisterMode && loginError && <div>{loginError}</div>}
              </form>
              {isRegisterMode ? (
                <p className="ml-3">
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
                <p className="ml-3">
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
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
