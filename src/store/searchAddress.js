import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

//convert the address to zipcode, latitude and longtitude using google geocoding.
const fetchSearchAddress =createAsyncThunk("fetchSearchAddress", async (address) => {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
        address: address,
        key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Replace with your own API key
        },
    });
    const latLng = response.data.results[0].geometry.location;
    return latLng;
})


const initialState = '';
const searchAddressSlice = createSlice({
    name:"searchAddress",
    initialState,
    reducers:{
        setToNearby:(state,action) =>{
            return action.payload;
        },
        
    },
    extraReducers:(builder) =>{
        builder.addCase(fetchSearchAddress.fulfilled,(state,action) => {
            return action.payload;
        })
    }
})
export const { setToNearby } = searchAddressSlice.actions;
export { fetchSearchAddress };
export default searchAddressSlice.reducer;