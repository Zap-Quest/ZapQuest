import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllUsers, fetchVehicles } from '../store';

const MyAccount = () => {
  const dispatch = useDispatch();
  const userAuthObj = useSelector(state => state.auth);
  const user = useSelector(state => state.user.usersList.find(e => e.id === userAuthObj.id));
  const vehicle = (state => state.vehicle);

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchVehicles());
  }, [dispatch]);

  return (
    <div className='my-account-container'>
      <div className="account-info">
        {user && (
          <div className="my-account-userdatacontainer">
            <img className='user-avatar' src={user.avatar} alt='User Avatar' />
            <div className="my-account-details">
              <p className='my-account-p'>Username: {user.username}</p>
              <p className='my-account-p'>Email: {user.email}</p>
              <p className='my-account-p'>Address: {user.address}</p>
              <p className='my-account-p'>Password: {user.password}</p>
              <Link to={`/myaccount/updateuserinfo`}>
                <button className='update-info-button'>Update your information</button>
              </Link>
            </div>
          </div>
        )}
           </div>
            <div className="vehicle-info">
              <div className="my-account-vehicledatacontainer">
                <img className='user-avatar' src={vehicle.image} alt='Vehicle' />
                <div className="my-account-details">
                  <p className='my-account-p'>Make: {vehicle.make}</p>
                  <p className='my-account-p'>Model: {vehicle.model}</p>
                  <p className='my-account-p'>Year: {vehicle.year}</p>
                  <p className='my-account-p'>Charger Type: {vehicle.chargertype}</p>
                </div>
          </div>
      </div>
    </div>
  );
  };  

export default MyAccount;