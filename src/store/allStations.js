import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchNearbyStations = createAsyncThunk("fetchNearbyStations", async({latitude,longitude,inputRadius})=>{
    //console.log('latitude:',latitude,'longitude:',longitude,'radius:',inputRadius);
        const response = await axios.get('https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.geojson', {
            params: {
                api_key:process.env.REACT_APP_NREI_API_KEY,
                fuel_type: 'ELEC',
                latitude:latitude,
                longitude:longitude,
                radius:inputRadius,
                limit:'all'
            },
        });
    
        return response.data.features;
})


const initialState = [];
const allStationsSlice = createSlice({
    name:"allStations",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(fetchNearbyStations.fulfilled,(state,action) =>{
            return action.payload;
        })
    }
})

export default allStationsSlice.reducer;