import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

const initialState={
  lineItems: [],
  total: 0
}

const orderFavorite = (favorite) => {
  favorite.lineItems.sort((a, b) => (a.createdAt < b.createdAt) ? 1: -1);
  return favorite;
}

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

export const removeItem = createAsyncThunk("removeItem", async(removeItems)=>{
  try{
    const token = window.localStorage.getItem('token');
    const {data} = await axios.put('/api/favorite', removeItems, {
      headers: {
        authorization: token
      }
    });
    return data;
  }catch(er){
    console.log(er);
  }
})

export const addItem = createAsyncThunk("addItem", async(addItem)=>{
  
  try{
    const token = window.localStorage.getItem('token');
    const {data} = await axios.post('/api/favorite', addItem, {
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
      orderFavorite(action.payload);
      return action.payload;
    }),
    builder.addCase(removeItem.fulfilled, (state, action)=>{
      orderFavorite(action.payload);
      return action.payload;
    }),
    builder.addCase(addItem.fulfilled, (state, action)=>{
      orderFavorite(action.payload);
      return action.payload;
    })
  }
})

export default favoriteSlice.reducer;