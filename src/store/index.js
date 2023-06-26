import {configureStore} from "@reduxjs/toolkit";
import logger from 'redux-logger';
import auth from './auth';
import cart from './cart';
import user from './user'

const store = configureStore({
  middleware: (defaultMiddleware)=> defaultMiddleware().concat(logger),
  reducer:{
    user: user,
    auth: auth,
    cart: cart
  }
});

export default store;
export * from './auth';
export * from './cart';
export * from './user';

