import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  usersList: [],
  status: 'idle',
  error: null,
};

export const fetchAllUsers = createAsyncThunk('fetchAllUsers', async () => {
  try {
    const response = await axios.get(`/api/user`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const addUserProfile = createAsyncThunk('addUserProfile', async(user) => {
  try {
    const {data} = await axios.post('/api/user', user)
    return data
  } catch(err){
    console.log(err)
  }
})


export const updateUserProfile = createAsyncThunk('updateUserProfile', async (formData) => {
  const { id } = formData;
  try {
    const response = await axios.put(`/api/user/${id}`, formData);
    return response.data;
  } catch (error) {
    console.log(error)
  }
});


const user = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.usersList = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.usersList = state.usersList.map(user=>user.id === action.payload.id ? action.payload:user);
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
      })
      .addCase(addUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.usersList.push(action.payload);
      })
      .addCase(addUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
      });
  },
});

export default user.reducer;
