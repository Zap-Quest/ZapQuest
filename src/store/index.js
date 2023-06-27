import {configureStore} from "@reduxjs/toolkit";
import logger from 'redux-logger';
import auth from './auth';
import cart from './cart';
import user from './user';
import vehicle from "./vehicle";
import searchAddress from "./searchAddress";
import allStations from "./allStations";

const store = configureStore({
  middleware: (defaultMiddleware)=> defaultMiddleware().concat(logger),
  reducer:{
    user: user,
    auth: auth,
    cart: cart,
    vehicle: vehicle,
    searchAddress: searchAddress,
    allStations:allStations,

  }
});

export default store;
export * from './auth';
export * from './cart';
export * from './user';
export * from './searchAddress';
export * from './allStations';
export * from './vehicle'

