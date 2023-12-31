import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchVehicles = createAsyncThunk('fetchVehicles', async () => {
  try {
    const { data } = await axios.get('/api/vehicle');
    return data.map(vehicle => ({ ...vehicle, user: vehicle.User }));
  } catch (err) {
    console.log(err);
    throw err; // Re-throw the error
  }
});

export const fetchVehicleById = createAsyncThunk('fetchVehicleById', async (id) => {
  try {
    const { data } = await axios.get(`/api/vehicle/${id}`);
    return { ...data };
  } catch (err) {
    console.log(err);
    throw err;
  }
});

export const updateVehicle = createAsyncThunk('updateVehicle', async (formData) => {
  const { id } = formData;
  try {
    const response = await axios.put(`/api/vehicle/${id}`, formData);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
});

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(fetchVehicleById.fulfilled, (state, action) => {
        const index = state.findIndex(vehicle => vehicle.id === action.payload.id);
        if (index !== -1) {
          state[index] = action.payload;
        } else {
          state.push(action.payload);
        }
      })
      .addCase(updateVehicle.fulfilled, (state, action) => {
        return state.map(vehicle => vehicle.id === action.payload.id ? action.payload : vehicle)
      });
  }
});

export default vehicleSlice.reducer;
