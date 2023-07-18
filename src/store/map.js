import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredMarkers: [],
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setFilteredMarkers: (state, action) => {
      state.filteredMarkers = action.payload;
    },
  },
});

export const { setFilteredMarkers } = mapSlice.actions;

export default mapSlice.reducer;
