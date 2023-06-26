import React, { useEffect } from 'react';
import Home from './Home';
import Cart from './Cart';
import Navbar from './Navbar';
import Map from './Map';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken, fetchCart } from '../store';
import { Link, Routes, Route } from 'react-router-dom';
import MyAccount from './Account';

const App = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(loginWithToken());
  }, []);

  useEffect(()=> {
    if(auth.id){
      dispatch(fetchCart());
    }
  }, [auth]);
  return (
    <div>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map/:address" element={<Map />} />
          <Route path="/myaccount" element={<MyAccount />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
