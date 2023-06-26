import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

//convert the address to zipcode, latitude and longtitude using google geocoding.
const fetchSearchAddress =createAsyncThunk("fetchSearchAddress", async (address) => {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
        address: address,
        key: 'AIzaSyAyylWo4yRMjT_HSowB1jWsz5qwnPDSUWw', // Replace with your own API key
        },
    });
    const addressArr = response.data.results[0].formatted_address.split(',');
    const tempAddressARR =addressArr[addressArr.length-2].split(' ');
    const zipcode = tempAddressARR[tempAddressARR.length-1];
    const latLng = response.data.results[0].geometry.location;
    return {zipcode,latLng};
})


const initialState = '';
const searchAddressSlice = createSlice({
    name:"searchAddress",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder.addCase(fetchSearchAddress.fulfilled,(state,action) => {
            return action.payload;
        })
    }
})

export { fetchSearchAddress };
export default searchAddressSlice.reducer;