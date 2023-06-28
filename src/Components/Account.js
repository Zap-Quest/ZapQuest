import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllUsers, fetchVehicles } from '../store';

const MyAccount = () => {
  const dispatch = useDispatch();
  const userAuthObj = useSelector(state => state.auth);
  const usersList = useSelector(state => state.user.usersList);
  const userStatus = useSelector(state => state.user.status);
  const vehicle = useSelector(state => state.vehicle);

  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchAllUsers());
      dispatch(fetchVehicles());
    }
  }, [dispatch, userStatus]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    setSelectedMake('');
    setSelectedModel('');
  };

  const handleMakeChange = (event) => {
    setSelectedMake(event.target.value);
    setSelectedModel('');
  };

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  let content;

  if (userStatus === 'loading') {
    content = <div>Loading...</div>;
  } else if (userStatus === 'succeeded') {
    const user = usersList.find(e => e.id === userAuthObj.id);
    const userVehicle = vehicleList.find(
      (vehicle) =>
        vehicle.user.id === userAuthObj.id &&
        vehicle.year === selectedYear &&
        vehicle.make === selectedMake &&
        vehicle.model === selectedModel
    );

    content = (
      <>
        {user && (
          <div className='my-account-container'>
            <div className='account-info'>
              <div className='my-account-userdatacontainer'>
                <img className='user-avatar' src={user.avatar} alt='User Avatar' />
                <div className='my-account-details'>
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
        {userVehicle && (
          <div className='vehicle-info'>
            <div className='my-account-vehicledatacontainer'>
              <img className='user-avatar' src={userVehicle.image} alt='Vehicle' />
              <div className='my-account-details'>
                <p className='my-account-p'>Make: {userVehicle.make}</p>
                <p className='my-account-p'>Model: {userVehicle.model}</p>
                <p className='my-account-p'>Year: {userVehicle.year}</p>
                <p className='my-account-p'>Charger Type: {userVehicle.chargertype}</p>
              </div>
            </div>
          </div>
        )}

        <div className='vehicle-filter'>
          <h3>Filter Vehicle:</h3>
          <select value={selectedYear} onChange={handleYearChange}>
            <option value=''>Select Year</option>
            {/* Replace with your available year options */}
            <option value='2021'>2021</option>
            <option value='2022'>2022</option>
            <option value='2023'>2023</option>
          </select>

          <select value={selectedMake} onChange={handleMakeChange} disabled={!selectedYear}>
            <option value=''>Select Make</option>
            {/* Replace with your available make options */}
            <option value='Audi'>Audi</option>
            <option value='Tesla'>Tesla</option>
          </select>

          <select value={selectedModel} onChange={handleModelChange} disabled={!selectedMake}>
            <option value=''>Select Model</option>
            {/* Replace with your available model options */}
            <option value='e-tron GT/RS e-tron GT'>e-tron GT/RS e-tron GT</option>
            <option value='Model 3'>Model 3</option>
          </select>
        </div>
      </>
    );
  } else if (userStatus === 'failed') {
    content = <div>Error loading user data.</div>;
  }

  return content;
};

export default MyAccount;