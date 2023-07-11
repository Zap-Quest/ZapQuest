import React, { useState, useEffect } from "react";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, updateUserProfile } from "../store";

const UpdateUserForm = () => {
  const dispatch = useDispatch();
  const userAuthObj = useSelector((state) => state.auth);
  const usersList = useSelector((state) => state.user.usersList);
  const user = usersList.find((e) => e.id === userAuthObj.id);
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleEmailChange = (e) => setUserEmail(e.target.value);
  const handleAvatarChange = (e) => setUserAvatar(e.target.value);
  const handlePasswordChange = (e) => setUserPassword(e.target.value);
  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleFileSelect = (e) => setSelectedFile(e.target.files[0]);
  const handleGoBack = () => navigate("/myaccount");

  useEffect(() => {
    if (usersList.length === 0) {
      dispatch(fetchAllUsers());
    } else {
      setUserEmail(user.email);
      setUserAvatar(user.avatar);
      setUserPassword(user.password);
    }
  }, [dispatch, usersList, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUserData = {
      id: user.id,
      email: userEmail,
      password: userPassword,
      avatar: userAvatar,
    };
    dispatch(updateUserProfile(updatedUserData));
    setUserEmail("");
    setUserAvatar("");
    setUserPassword("");
    setSelectedFile(null);
    navigate("/myaccount");
  };

  if (!user) {
    return <div>Loading...</div>; // Render a loading state or handle the case when user is not found
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
                accept="image/*"
                onChange={handleFileSelect}
                className="form-control-file"
              />
              {selectedFile && (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected Avatar"
                  className="mt-2"
                  style={{ maxHeight: "200px" }}
                />
              )}
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

