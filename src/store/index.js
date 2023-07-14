import {configureStore} from "@reduxjs/toolkit";
import logger from 'redux-logger';
import auth from './auth';
import favorite from './favorite';
import user from './user';
import vehicle from "./vehicle";
import searchAddress from "./searchAddress";
import allStations from "./allStations";
import filter from "./filter"

const store = configureStore({
  middleware: (defaultMiddleware)=> defaultMiddleware().concat(logger),
  reducer:{
    user: user,
    auth: auth,
    favorite: favorite,
    vehicle: vehicle,
    searchAddress: searchAddress,
    allStations:allStations,
    filter: filter,
  }
});

export default store;
export * from './auth';
export * from './favorite';
export * from './user';
export * from './searchAddress';
export * from './allStations';
export * from './vehicle';
export * from './filter';

