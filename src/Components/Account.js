import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllUsers, fetchVehicles } from '../store';

const MyAccount = () => {
  const dispatch = useDispatch();
  const userAuthObj = useSelector(state => state.auth);
  const usersList = useSelector(state => state.user.usersList);
  const userStatus = useSelector(state => state.user.status);
  const vehicle = useSelector(state => state.vehicle);

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchAllUsers());
      dispatch(fetchVehicles());
    }
  }, [dispatch, userStatus]);

  let content;

  if (userStatus === 'loading') {
    content = <div>Loading...</div>;
  } else if (userStatus === 'succeeded') {
    const user = usersList.find(e => e.id === userAuthObj.id);
    console.log('user',user);
    console.log('userAurthObj:',userAuthObj);
    const userVehicle = vehicle.find(v =>  v.userId === userAuthObj.id);
    console.log('userVehicle:',userVehicle);

    content = (
      <>
        {user && (
          <div className='my-account-container'>
            <div className="account-info">
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
            </div>
          </div>
        )}
        console.log('userVehicle' userVehicle)
        {userVehicle && (
          <div className="vehicle-info">
            <div className="my-account-vehicledatacontainer">
              <img className='user-avatar' src={userVehicle.image} alt='Vehicle' />
              <div className="my-account-details">
                <p className='my-account-p'>Make: {userVehicle.make}</p>
                <p className='my-account-p'>Model: {userVehicle.model}</p>
                <p className='my-account-p'>Year: {userVehicle.year}</p>
                <p className='my-account-p'>Charger Type: {userVehicle.chargertype}</p>
              </div>
            </div>
          </div>
        )}
      </>
    );
  } else if (userStatus === 'failed') {
    content = <div>Error loading user data.</div>;
  }

  return content;
};

export default MyAccount;
