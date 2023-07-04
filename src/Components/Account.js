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
  const [showPassword, setShowPassword] = React.useState(false);

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
    console.log("user", user);
    console.log("userAurthObj:", userAuthObj);
    const userVehicle = vehicle.find((v) => v.userId === userAuthObj.id);
    console.log("userVehicle:", userVehicle);

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
                          <h6 className="my-account-p">Username</h6>
                          <p className="text-muted">{user.username}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="card-body p-4">
                        <h6>Information</h6>
                        <hr className="mt-0 mb-4" />
                        <div className="row pt-1">
                          <div className="col-md-6 mt-1">
                            <h6 className="my-account-p">Email</h6>
                            <p className="text-muted mt-1">{user.email}</p>
                          </div>
                          <div className="col-md-6">
                            <div className="d-flex align-items-center">
                              <h6 className="my-account-p">Password</h6>
                              <button
                                className="btn btn-link mb-2"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <i className="fas fa-eye-slash"></i>
                                ) : (
                                  <i className="fas fa-eye"></i>
                                )}
                              </button>
                            </div>
                            {showPassword ? (
                              <p className="text-muted">{user.password}</p>
                            ) : (
                              <input
                                type="password"
                                value={user.password}
                                className="form-control"
                                disabled
                              />
                            )}
                          </div>
                          <div className="col-md-6 mt-4">
                            <h6 className="my-account-p">Address</h6>
                            <p className="text-muted">{user.address}</p>
                          </div>
                          <div className="col-md-6 mt-5">
                            <Link to={`/myaccount/updateuserinfo`}>
                              <button className="btn default-button">
                                Update your information
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {userVehicle && (
                <div className="card mt-5" style={{ borderRadius: ".5rem" }}>
                  <div className="my-account-vehicledatacontainer">
                    <div className="text-center">
                      <img
                        className="user-avatar"
                        src={userVehicle.image}
                        alt="Vehicle"
                        style={{ width: "200px" }}
                      />
                    </div>
                    <div className="card-body p-4 text-center">
                      <h6>Vehicle Information</h6>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-md-6 mt-1">
                          <h6 className="my-account-p">Make</h6>
                          <p className="text-muted mt-1">{userVehicle.make}</p>
                        </div>
                        <div className="col-md-6 mt-1">
                          <h6 className="my-account-p">Model</h6>
                          <p className="text-muted mt-1">{userVehicle.model}</p>
                        </div>
                        <div className="col-md-6 mt-1">
                          <h6 className="my-account-p">Year</h6>
                          <p className="text-muted mt-1">{userVehicle.year}</p>
                        </div>
                        <div className="col-md-6 mt-1">
                          <h6 className="my-account-p">Charger Type</h6>
                          <p className="text-muted mt-1">
                            {userVehicle.chargertype}
                          </p>
                        </div>
                      </div>
                      <button className="btn default-button mt-3">
                        Update vehicle information
                      </button>
                    </div>
                  </div>
                </div>
              )}
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
