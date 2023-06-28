import React, { useState, useCallback } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

import { useSelector,useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchNearbyStations, fetchSearchAddress, setToNearby } from "../store";


import { useMemo } from "react";
import axios from "axios";

import 'dotenv/config';
import MapFilter from "./MapFilter";




const Map = () => {
  
  const { isLoaded } = useLoadScript({
     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [center,setCenter]= useState(null);
  const [myLocation, setMyLocation] = useState(null);
  const [searchLocation, setSearchLocation] = useState(null);
  const [EVSList,setEVSList] = useState(null);
  const [selectedStation,setSelectedStation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchAddress, allStations } = useSelector(state => state);
  const { address,stationId } = useParams();



  const handleFilterChange = useCallback((newFilters) => {
    if (allStations) {
      const filteredStations = applyFilters(allStations, newFilters);
      setEVSList(filteredStations);
    }
  }, [allStations]);

  const applyFilters = (list, filters) => {
    if (!list) return []; 

    const { connectorType, chargingSpeed, provider, cost } = filters;

    const connectorTypeArray = Array.isArray(connectorType) ? connectorType : [connectorType]; 

    return list.filter(station => {
      const connectorMatch = connectorTypeArray.some(connector => station.properties.ev_connector_types.includes(connector)) || connectorType === 'all';
      const chargingSpeedMatch = chargingSpeed.includes(String(station.properties.ev_level2_evse_num)) || chargingSpeed.includes('all');
      const providerMatch = provider.includes(station.properties.ev_network) || provider.includes('all');
      const costMatch = cost.includes(station.properties.ev_pricing ? 'paid' : 'free') || cost.includes('all');

      return connectorMatch && chargingSpeedMatch && providerMatch && costMatch;
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
//check if URL is an address or nearby
  React.useEffect(() => {
    if(address ==='nearby'){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const userLocation = { lat: latitude, lng: longitude };
            setMyLocation(userLocation);
          },
          (error) => {
            console.error(error.message);
          }
        );
      }
    }else{
      dispatch(fetchSearchAddress(address));
    }
     }, [address]);

  // if search specific address
  React.useEffect(() => {
    if(searchAddress){
      setCenter(searchAddress);
      setSearchLocation(searchAddress);
      dispatch(fetchNearbyStations({latitude:searchAddress.lat,longitude:searchAddress.lng,inputRadius:1}));
    };  
  },[searchAddress]);

  //if we use neaby to search
  React.useEffect (() => {
    if(myLocation){
      setCenter(myLocation);
      dispatch(fetchNearbyStations({latitude:myLocation.lat,longitude:myLocation.lng,inputRadius:1}));
    }
  },[myLocation]);

  //fetch stations
  React.useEffect(()=>{
    setEVSList(allStations);
    const station = allStations.filter((s)=>{return s.properties.id ===stationId*1});
    setSelectedStation(station[0]);
  },[allStations,stationId])
    

  //map style 
  const mapOptions = {
      streetViewControl: false
    };
  const handleStationId = (id) =>{
      navigate(`/map/${encodeURIComponent(address)}/${id}`);
    }
    console.log('selected station:',selectedStation);
  return (
    <div className="Map">
      <h4> address: {address}</h4>
      <button onClick={openModal}>Open Modal</button> 
      {isModalOpen && (
        <div className="modal-map-overlay">
        <div className="modal-map">
          <div className="modal-map-content">
            <button onClick={closeModal}>Close Modal</button> 
            <MapFilter onFilterChange={handleFilterChange} />
          </div>
          </div>
        </div>
      )}
      {!isLoaded ? (
          <h1>Loading...</h1>
      ) : (
          <GoogleMap
            mapContainerClassName="map-container"
            center={center}
            zoom={15}
            options={mapOptions}
          >
          
            {myLocation?
              ( 
                <Marker 
                  position={myLocation}
                  icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
                />
              )
              :(null)}

            {searchLocation?
              ( <Marker 
                  position={searchLocation} 
                  icon={"http://maps.google.com/mapfiles/ms/icons/pink-dot.png"}/>
              )
              :(null)
            }
              
            {EVSList?
              (
                EVSList.map((s)=>{
                  let location = {lat:s.geometry.coordinates[1],lng:s.geometry.coordinates[0]};
                  return(
                    <Marker
                        position={location}
                        icon={"http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"}
                        key={s.properties.id}
                        onClick={()=>handleStationId(s.properties.id)}
                    />
                  )
                })
              ):(null)
            }
          </GoogleMap>
      )}
      {selectedStation?(
        <div>
          <p>{`${selectedStation.properties.street_address}, ${selectedStation.properties.city}`}</p>
          <p>{`Charging points: ${selectedStation.properties.ev_connector_types}`}</p>
          <p>{`Tel: ${selectedStation.properties.station_phone}`}</p>
        </div>

      ):(null)/* if we have a selectdStation, we can have specific station infor. if not, should we show the list of all the nearby stations?*/};
    </div>
    
  );
};
export default Map;

