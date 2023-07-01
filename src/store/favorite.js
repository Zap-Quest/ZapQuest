import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

const initialState=[];
// const orderFavorite = (favorite) => {
//   favorite.sort((a, b) => (a.createdAt < b.createdAt) ? 1: -1);
//   return favorite;
// }

export const fetchFavorite = createAsyncThunk("fetchFavorite", async()=>{
  try{
    const token = window.localStorage.getItem('token');
    const response = await axios.get('/api/favorite', {
      headers: {
        authorization: token
      }
    });
    return response.data;
  }catch(err){
    console.log(err)
  }
})

export const removeFavorite = createAsyncThunk("removeFavorite", async(id)=>{
  try{
    const token = window.localStorage.getItem('token');
    const {data} = await axios.delete(`/api/favorite/${id}`, {
      headers: {
        authorization: token
      }
    });
    return data;
  }catch(er){
    console.log(er);
  }
})

export const addFavorite = createAsyncThunk("addFavorite", async(station)=>{
  try{
    const token = window.localStorage.getItem('token');
    console.log('station:',station);
    const {data} = await axios.post('/api/favorite', station, {
      headers:{
        authorization: token
      }
    });
    return data;
  }catch(er){
    console.log(er);
  }
})

const favoriteSlice = createSlice({
  name:"favorite",
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    builder.addCase(fetchFavorite.fulfilled, (state, action)=>{
      return action.payload;
    }),
    builder.addCase(removeFavorite.fulfilled, (state, action)=>{
      return state.filter((station) => station.id !== action.payload.id);
    }),
    builder.addCase(addFavorite.fulfilled, (state, action)=>{
      return [...state,action.payload];
    })
  }
})

export default favoriteSlice.reducer;