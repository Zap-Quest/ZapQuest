import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connectorType: 'all',
  chargingSpeed: 'all',
  provider: 'all',
  cost: 'all',
  radius: 10,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      // If the filter option is not selected, set it to 'all'
      if (action.payload.connectorType.length === 0) {
        action.payload.connectorType = 'all';
      }
      if (action.payload.chargingSpeed.length === 0) {
        action.payload.chargingSpeed = 'all';
      }
      if (action.payload.provider.length === 0) {
        action.payload.provider = 'all';
      }
      if (action.payload.cost.length === 0) {
        action.payload.cost = 'all';
      }
      
      console.log('action payload store', action.payload);
      return action.payload;
      
    },
    resetFilter: (state) => {
      // return { ...initialState, radius: state.radius };
      return { ...initialState, radius: state.radius, connectorType: 'all' };
    },
  },
});

export const { setFilter, resetFilter } = filterSlice.actions;

export default filterSlice.reducer;
