import React, { useEffect } from 'react';
import Home from './Home';
import Favorite from './Favorite';
import Navbar from './Navbar';
import Map from './Map';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken, fetchFavorite } from '../store';
import { Link, Routes, Route } from 'react-router-dom';
import MyAccount from './Account';
import About from './About';
import UpdateUserForm from './UpdateUserForm';
import UpdateVehicleForm from './UpdateVehicleForm';
// require('dotenv').config({path: '../.env'})


const App = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(loginWithToken());
  }, []);

  useEffect(()=> {
    if(auth.id){
      dispatch(fetchFavorite());
    }
  }, [auth]);
  
  return (
    <div>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map/place/:address/:stationId" element={<Map />} />
          <Route path="/map/place/:address" element={<Map />} />
          <Route path="/map/dir/:startAddress/:endAddress" element={<Map />} />
          <Route path="/about" element={<About />} />
        </Routes>
        {
        !!auth.id  && (        
          <div>
            <Routes>
              <Route path='/myaccount/updateuser' element={<UpdateUserForm />} />
              <Route path='/myaccount/updatevehicle' element={<UpdateVehicleForm />} />
              <Route path='/myaccount/updatevehicle/:id' element={<UpdateVehicleForm />} />
              <Route path="/myaccount" element={<MyAccount />} />
            </Routes>
          </div>
        )
      }
      </div>
    </div>
  );
};

export default App;
