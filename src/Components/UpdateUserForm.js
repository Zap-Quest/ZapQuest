import React, { useState, useEffect } from "react";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, updateUserProfile } from "../store";
import axios from "axios";

const UpdateUserForm = () => {
  const dispatch = useDispatch();
  const userAuthObj = useSelector((state) => state.auth);
  const usersList = useSelector((state) => state.user.usersList);
  const user = usersList.find((e) => e.id === userAuthObj.id);
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [userAvatar, setUserAvatar] = useState(null);
  const [userPassword, setUserPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleEmailChange = (e) => setUserEmail(e.target.value);
  const handleAvatarChange = (e) => {
    setSelectedAvatar(e.target.files[0]);
  };
  const handlePasswordChange = (e) => setUserPassword(e.target.value);
  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleGoBack = () => navigate("/myaccount");

  useEffect(() => {
    if (usersList.length === 0) {
      dispatch(fetchAllUsers());
    } else {
      setUserEmail(user.email);
      setUserPassword(user.password);
    }
  }, [dispatch, usersList, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("avatar", selectedAvatar);
    formData.append("email", userEmail);
    formData.append("password", userPassword);

    try {
      const response = await axios.put(`/api/user/${user.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the correct content type for form data
        },
      });

      // Handle the response
      console.log(response.data);
      // ...

      // Reset the form fields
      setUserEmail("");
      setUserAvatar(null);
      setUserPassword("");

      // Navigate to the desired page
      navigate("/myaccount");
    } catch (error) {
      // Handle errors
      console.log(error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid py-5 h-100">
      <div className="row justify-content-center">
        <div className="col-md-6 bg-white p-4 rounded">
          <div className="my-3">
            <button className="btn btn-link" onClick={handleGoBack}>
              <i className="fa-solid fa-arrow-left fa-lg"></i>
            </button>
          </div>
          <div className="text-center">
            <h2>Update Information</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                value={userEmail}
                onChange={handleEmailChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <div className="d-flex align-items-center">
                <h6 className="my-account-p">Password</h6>
                <button
                  type="button"
                  className="btn btn-link mb-2"
                  onClick={handleTogglePassword}
                >
                  {showPassword ? (
                    <i className="fas fa-eye-slash"></i>
                  ) : (
                    <i className="fas fa-eye"></i>
                  )}
                </button>
              </div>
              {showPassword ? (
                <input
                  type="text"
                  value={userPassword}
                  onChange={handlePasswordChange}
                  className="form-control"
                />
              ) : (
                <input
                  type="password"
                  value={userPassword}
                  onChange={handlePasswordChange}
                  className="form-control"
                />
              )}
            </div>
            <div className="form-group">
              <label>Avatar</label>
              <input
                type="file"
                name="avatar"
                onChange={handleAvatarChange}
                className="form-control-file"
              />
            </div>
            <div className="form-group">
              <label>Current Avatar</label>
              <div>
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Avatar"
                    style={{ width: "100px" }}
                  />
                ) : (
                  <div className="text-muted">No avatar available</div>
                )}
              </div>
            </div>

            <div className="form-group">
              <button type="submit" className="btn default-button">
                Submit Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserForm;
