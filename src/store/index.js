import {configureStore} from "@reduxjs/toolkit";
import logger from 'redux-logger';
import auth from './auth';
import cart from './cart';
import user from './user';
import searchAddress from "./searchAddress";
import station from "./station";

const store = configureStore({
  middleware: (defaultMiddleware)=> defaultMiddleware().concat(logger),
  reducer:{
    user: user,
    auth: auth,
    cart: cart,
    searchAddress: searchAddress,
    station:station,

  }
});

export default store;
export * from './auth';
export * from './cart';
export * from './user';
export * from './searchAddress';
export * from './station';

