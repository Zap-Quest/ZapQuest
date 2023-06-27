import React, { useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

import { useMemo } from "react";
import axios from "axios";
import 'dotenv/config';

const Map = () => {
  // console.log(proces.env.REACT_APP_GOOGLE_MAPS_API_KEY)
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });


    const originCenter = useMemo(() => ({ lat: 41.8781, lng: -87.000 }), []);
    const [center,setCenter]= useState(null);
    // const originCenter = useMemo(() => ({ lat: 41.8781, lng: -87.000 }), []);
    // const [center,setCenter]= useState(originCenter);
    const [myLocation, setMyLocation] = useState(null);
    const [searchInput,setSearchInput] = useState('');
    const [searchLocation, setSearchLocation] = useState(null);
    const [addressList,setAddressList] = useState([center]);
    const [EVSList,setEVSList] = useState(null);

    React.useEffect(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              const userLocation = { lat: latitude, lng: longitude };
              setMyLocation(userLocation);
              setCenter(userLocation);
              setAddressList((prevAddressList) => [...prevAddressList, userLocation]);
            },
            (error) => {
              console.error(error.message);
            }
          );
        }
      }, []);


    const handleLocalLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              console.log(`Latitude: ${latitude}`, typeof latitude);
              console.log(`Longitude: ${longitude}`);
              const newLocation = { lat: latitude, lng: longitude };
              setMyLocation(newLocation);
              setAddressList((prevAddressList) => [...prevAddressList, newLocation]);
              setCenter(newLocation);
            },
            (error) => {
              console.error(error.message);
            }
          );
        }
      };
      
    const oldhandleEVStations = async (zipcode) => {
        try {
            const response = await axios.get('https://developer.nrel.gov/api/alt-fuel-stations/v1.json', {
                params: {
                    api_key: process.env.REACT_APP_NREI_API_KEY,
                    fuel_type: 'ELEC',
                    zip:zipcode,
                },
            });

            setEVSList(response.data.fuel_stations);
            console.log(EVSList);
            
        } catch (ex) {
            console.log(ex);
        }
    };
    const handleEVStations = async (zipcode) => {
      try {
          const response = await axios.get('https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.geojson', {
              params: {
                  api_key: process.env.REACT_APP_NREI_API_KEY,
                  fuel_type: 'ELEC',
                  location:zipcode,
                  radius:2,
                  limit:'all'
              },
          });
          setEVSList(response.data.features);
          console.log('response',response);
          console.log('features:',response.data.features)
          console.log(EVSList);

          // setEVSList(response.data.fuel_stations);
          // console.log(EVSList);
          
      } catch (ex) {
          console.log(ex);
      }
  };

     
    const handleSearchGeo = async (ev) => {
        ev.preventDefault();
        try {
            console.log('searchInput:',searchInput)
            const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                address: searchInput,
                key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Replace with your own API key
                },
            });
            console.log('search address:',response.data);
            const addressArr = response.data.results[0].formatted_address.split(',');
            const tempAddressARR =addressArr[addressArr.length-2].split(' ');
            const zipcode = tempAddressARR[tempAddressARR.length-1];
            const tempZipcode = response.data.results[0].address_components[response.data.results[0].address_components.length - 1].long_name
            console.log('search address response:',response.data.results[0])
            console.log('zipcode type:',typeof zipcode,'zipcode:',zipcode);
            const mySearchLocation = response.data.results[0].geometry.location;
            handleEVStations(zipcode);
            setSearchLocation(mySearchLocation);
            setCenter(mySearchLocation);
            setAddressList((prevAddressList) => [...prevAddressList, mySearchLocation]);
        } catch (ex) {
            console.log(ex);
        }
    };

    const onLoad = (map) => {
        const bounds = new google.maps.LatLngBounds();
        console.log('addressList:', addressList);
        if(addressList[0]){
            addressList.forEach(({ lat, lng }) => {
          bounds.extend({ lat, lng });
        });}
        map.fitBounds(bounds);
      };
    const onChange = (ev)=>{
        setSearchInput(ev.target.value);
    } 
    const mapOptions = {
        streetViewControl: false
      };

    
return (
  <div className="Map">
      <form onSubmit={handleSearchGeo}>
          <input placeholder=" search city, place or address" value={searchInput} onChange={onChange}/>
          <button>search</button>
      </form>

  {!isLoaded ? (
      <h1>Loading...</h1>
  ) : (
      <GoogleMap
      mapContainerClassName="map-container"
      center={center}
      zoom={15}
      options={mapOptions}
      >
          <Marker 
              position={center} 
              icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
          />
          {myLocation?
          ( <Marker 
              position={myLocation} />
          )
          :(null)}

          {searchLocation?
          ( <Marker 
              position={searchLocation} 
              icon={"http://maps.google.com/mapfiles/ms/icons/pink-dot.png"}/>
          )
          :(null)
          }
          {
            EVSList?
            (
              EVSList.map((s)=>{
              //console.log(`here,latitude:${s.geometry.coordinates[1]},longitude:${s.geometry.coordinates[0]}`);
              let location = {lat:s.geometry.coordinates[1],lng:s.geometry.coordinates[0]};
              //console.log(location);
                return(
                    <Marker
                    position={location}
                    icon={"http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"}
                    key={s.properties.id}
                    />
                )
              })
            ):(null)
          }
          
      </GoogleMap>
  )}
  <button className="map-button" onClick={handleLocalLocation}>My Location</button>
  <button onClick={handleSearchGeo}>getGeoCode</button>
  <button onClick ={handleEVStations}>getEVStations</button>
  </div>
);
};
export default Map;