import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchNearbyStations = createAsyncThunk("fetchNearbyStations", async({latitude,longitude,inputRadius})=>{
    //console.log('latitude:',latitude,'longitude:',longitude,'radius:',inputRadius);
        const response = await axios.get('https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.geojson', {
            params: {
                api_key:'bN0UmPUvm6d9Wqhwl3E4HHigDM8P393YnX30oPdI',
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
const stationSlice = createSlice({
    name:"station",
    initialState,
    reducers:{
        setToNearby:(state,action) =>{
            return action.payload;
        }
    },
    extraReducers:(builder) => {
        builder.addCase(fetchNearbyStations.fulfilled,(state,action) =>{
            return action.payload;
        })
    }
})

export default stationSlice.reducer;