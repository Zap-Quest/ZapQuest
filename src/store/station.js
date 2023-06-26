import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchNearbyStations = createAsyncThunk("fetchNearbyStations", async({address,inputRadius})=>{
    console.log('address zip:',address);
        const response = await axios.get('https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.geojson', {
            params: {
                api_key:'bN0UmPUvm6d9Wqhwl3E4HHigDM8P393YnX30oPdI',
                fuel_type: 'ELEC',
                location:address,
                radius:inputRadius,
                limit:'all'
            },
        });
    
        return response.data.features;
})


const initialState = [];
const stationSlice = createSlice({
    name:"station",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(fetchNearbyStations.fulfilled,(state,action) =>{
            return action.payload;
        })
    }
})

export default stationSlice.reducer;