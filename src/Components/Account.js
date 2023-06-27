import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllUsers, fetchOrders } from '../store';

const MyAccount = () => {
  const dispatch = useDispatch();
  const userAuthObj = useSelector(state => state.auth);
  const user = useSelector(state => state.user.usersList.find(e => e.id === userAuthObj.id));
  const orders = useSelector(state => state.orders)

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className='my-account-container'>
      <h2>
        Hello, {user && `${user.firstName} ${user.lastName}`}
      </h2>
      <div className="my-account-content">
        {user && (
          <div className="my-account-userdatacontainer">
            <img className='user-avatar' src={user.avatar} alt='User Avatar' />
            <div className="my-account-details">
              <p className='my-account-p'>Full Name: {user.firstName} {user.lastName}</p>
              <p className='my-account-p'>Email: {user.email}</p>
              <p className='my-account-p'>Home Address: {user.homeAddress}</p>
              <p className='my-account-p'>Shipping Address: {user.shippingAddress}</p>
              <Link to={`/myaccount/updateuserinfo`}>
                <button className='update-info-button'>Update your information</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  };  

export default MyAccount;