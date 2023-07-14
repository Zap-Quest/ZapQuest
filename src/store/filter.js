import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connectorType: [],
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
      return { ...state, ...action.payload };
    },
    resetFilter: (state) => {
      return { ...initialState, radius: state.radius };
    },
  },
});

export const { setFilter, resetFilter } = filterSlice.actions;

export default filterSlice.reducer;
