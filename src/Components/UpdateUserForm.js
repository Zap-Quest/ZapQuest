import React, { useState , useEffect } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, updateUserProfile } from '../store';


const UpdateUserForm = () =>{
    const dispatch = useDispatch();
    const userAuthObj = useSelector(state => state.auth);
    const user = useSelector(state => state.user.usersList.find(e => e.id === userAuthObj.id));
    const navigate = useNavigate();  

    const [userEmail, setUserEmail] = useState(user.email);
    const [userAvatar, setUserAvatar] = useState(user.avatar);
    const [userPassword, setUserPassword] = useState(user.password);


    const handleEmailChange = (e) => setUserEmail(e.target.value);
    const handleAvatarChange = (e) => setUserAvatar(e.target.value);
    const handlePasswordChange = (e) => setUserPassword(e.target.value);

    useEffect(() => {
        dispatch(fetchAllUsers())
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedUserData = {
            id: user.id,
            email: userEmail,
            password: userPassword,
            avatar: userAvatar,
        }
        dispatch(updateUserProfile(updatedUserData))
        setUserEmail('')
        setUserAvatar('')
        setUserPassword('')
        navigate('/myaccount')
    }

    return (
        <div>
          <Link to={`/myaccount`}>
            <p>Back to Dashboard</p>
          </Link>
          {user && (
            <div className='user-details-container'>
              <p>Email: {user.email}</p>
              <p>Avatar: {user.avatar}</p>
            </div>
          )}
          <h2>Update Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                value={userEmail}
                onChange={handleEmailChange}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                type= "password"
                value={userPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="form-group">
              <label>Avatar</label>
              <input
                name="avatar"
                value={userAvatar}
                onChange={handleAvatarChange}
              />
            </div>
            <div className="form-group">
              <button type="submit">Submit Changes</button>
            </div>
          </form>
        </div>
      );
    };
    
    export default UpdateUserForm;