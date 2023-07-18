import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connectorType: 'all',
  chargingSpeed: 'all',
  provider: 'all',
  cost: 'all',
  radius: 10,
  filteredMarkers: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      const { connectorType, chargingSpeed, provider, cost } = action.payload || {};
    
      if (connectorType !== undefined) {
        state.connectorType = connectorType.length ? connectorType : 'all';
      }
      if (chargingSpeed !== undefined) {
        state.chargingSpeed = chargingSpeed.length ? chargingSpeed : 'all';
      }
      if (provider !== undefined) {
        state.provider = provider.length ? provider : 'all';
      }
      if (cost !== undefined) {
        state.cost = cost.length ? cost : 'all';
      }
    
      console.log('action payload store', action.payload);
    },
    
    resetFilter: (state) => {
      return { ...initialState, radius: state.radius, connectorType: 'all' };
    },
    setFilteredMarkers: (state, action) => {
      state.filteredMarkers = action.payload;
    },
  },
});

export const { setFilter, resetFilter, setFilteredMarkers } = filterSlice.actions;

export default filterSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   connectorType: 'all',
//   chargingSpeed: 'all',
//   provider: 'all',
//   cost: 'all',
//   radius: 10,
//   filteredMarkers: [],
// };

// const filterSlice = createSlice({
//   name: "filter",
//   initialState,
//   reducers: {
//     setFilter: (state, action) => {
//       const { connectorType = '', chargingSpeed = '', provider = '', cost = '' } = action.payload || {};
      
//       // If the filter option is not selected, set it to 'all'
//       state.connectorType = connectorType.length ? connectorType : 'all';
//       state.chargingSpeed = chargingSpeed.length ? chargingSpeed : 'all';
//       state.provider = provider.length ? provider : 'all';
//       state.cost = cost.length ? cost : 'all';
      
//       console.log('action payload store', action.payload);
//     },
//     resetFilter: (state) => {
//       return { ...initialState, radius: state.radius, connectorType: 'all' };
//     },
//     setFilteredMarkers: (state, action) => {
//       state.filteredMarkers = action.payload;
//     },
//   },
// });

// export const { setFilter, resetFilter, setFilteredMarkers } = filterSlice.actions;

// export default filterSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   connectorType: 'all',
//   chargingSpeed: 'all',
//   provider: 'all',
//   cost: 'all',
//   radius: 10,
//   filteredMarkers: [],
// };

// const filterSlice = createSlice({
//   name: "filter",
//   initialState,
//   reducers: {
//     setFilter: (state, action) => {
//       // If the filter option is not selected, set it to 'all'
//       if (action.payload.connectorType.length === 0) {
//         action.payload.connectorType = 'all';
//       }
//       if (action.payload.chargingSpeed.length === 0) {
//         action.payload.chargingSpeed = 'all';
//       }
//       if (action.payload.provider.length === 0) {
//         action.payload.provider = 'all';
//       }
//       if (action.payload.cost.length === 0) {
//         action.payload.cost = 'all';
//       }
      
//       console.log('action payload store', action.payload);
//       return action.payload;
      
//     },
//     resetFilter: (state) => {
//       // return { ...initialState, radius: state.radius };
//       return { ...initialState, radius: state.radius, connectorType: 'all' };
//     },
//     setFilteredMarkers: (state, action) => {
//       state.filteredMarkers = action.payload;
//     },
//   },
// });

// export const { setFilter, resetFilter, setFilteredMarkers } = filterSlice.actions;

// export default filterSlice.reducer;
