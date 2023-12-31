import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllUsers, fetchVehicles } from "../store";

const MyAccount = () => {
  const dispatch = useDispatch();
  const userAuthObj = useSelector((state) => state.auth);
  const usersList = useSelector((state) => state.user.usersList);
  const userStatus = useSelector((state) => state.user.status);
  const vehicle = useSelector((state) => state.vehicle);

  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchAllUsers());
      dispatch(fetchVehicles());
    }
  }, [dispatch, userStatus]);

  let content;

  if (userStatus === "loading") {
    content = <div>Loading...</div>;
  } else if (userStatus === "succeeded") {
    const user = usersList.find((e) => e.id === userAuthObj.id);
    const userVehicle = vehicle && vehicle.find((e) => e.userId === userAuthObj.id);

    content = (
      <>
        <div className="container-fluid py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-6 mb-4 mb-lg-0">
              {user && (
                <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                  <div className="row g-0">
                    <div
                      className="col-md-4 text-center"
                      style={{
                        borderTopLeftRadius: ".5rem",
                        borderBottomLeftRadius: ".5rem",
                        backgroundColor: "#779DA6",
                      }}
                    >
                      <img
                        className="img-fluid mt-5"
                        src={user.avatar}
                        alt="User Avatar"
                        style={{ width: "80px" }}
                      />
                      <div className="my-account-details my-5">
                        <div>
                          <h6 className="my-account-p underline-text">Username</h6>
                          <p className="text user-text">{user.username}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-8 d-flex flex-column">
                      <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h6>Information</h6>
                          <Link to={`/myaccount/updateuser`}>
                            <button className="btn">
                              <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                          </Link>
                        </div>
                        <hr className="mt-0 mb-4" />
                        <div className="row pt-1">
                          <div className="col-md-6 mt-1">
                            <h6 className="my-account-p">Email</h6>
                            <p className="text-muted mt-1">{user.email}</p>
                          </div>
                          <div className="col-md-6">
                            <h6 className="my-account-p">Password</h6>
                            <p className="text-muted">******</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                <div className="row g-0">
                  <div
                    className="col-md-4 text-center"
                    style={{
                      borderTopLeftRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem",
                      backgroundColor: "#779DA6",
                    }}
                  >
                    {userVehicle && (
                      <img
                        className="img-fluid mt-5"
                        src={userVehicle.image}
                        alt="Vehicle Image"
                        style={{ width: "150px" }}
                      />
                    )}
                  </div>
                  <div className="col-md-8 d-flex flex-column">
                    <div className="card-body p-4">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6>Vehicle Information</h6>
                        <Link to={`/myaccount/updatevehicle`}>
                          <button className="btn">
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                        </Link>
                      </div>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        {userVehicle && (
                          <>
                            <div className="col-md-6 mt-1">
                              <h6 className="my-account-p">Make</h6>
                              <p className="text-muted mt-1">
                                {userVehicle.make}
                              </p>
                            </div>
                            <div className="col-md-6 mt-1">
                              <h6 className="my-account-p">Model</h6>
                              <p className="text-muted mt-1">
                                {userVehicle.model}
                              </p>
                            </div>
                            <div className="col-md-6 mt-4">
                              <h6 className="my-account-p">Year</h6>
                              <p className="text-muted">{userVehicle.year}</p>
                            </div>
                            <div className="col-md-6 mt-4">
                              <h6 className="my-account-p">Charger Type</h6>
                              <p className="text-muted">
                                {userVehicle.chargertype}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else if (userStatus === "failed") {
    content = <div>Error loading user data.</div>;
  }

  return content;
};

export default MyAccount;
