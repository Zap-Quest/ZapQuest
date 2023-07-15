import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connectorType: 'all',
  chargingSpeed: [],
  provider: [],
  cost: [],
  radius: 10,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      if (action.payload.connectorType.length === 0) {
        action.payload.connectorType = 'all';
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
