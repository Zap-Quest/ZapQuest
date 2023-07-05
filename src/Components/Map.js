import React, { useState, useCallback, useRef, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript, DirectionsRenderer } from "@react-google-maps/api";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addFavorite, fetchNearbyStations, fetchSearchAddress, setToNearby } from "../store";

import "dotenv/config";
import MapFilter from "./MapFilter";
import SearchBar from "./SearchBar";
import StationInfo from "./StationInfo";
import StationsList from "./StationsLIst";
import FavoriteList from "./FavoriteList";
import RouteModal from "./RoutesModal";
import LoadingSpinner from "./LoadingSpinner";

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

 

  const navigate = useNavigate();
  const dispatch = useDispatch();
  //redux store
  const { searchAddress, allStations,favorite } = useSelector((state) => state);
  const { address, stationId,startAddress,endAddress } = useParams();
  //set
  const [center, setCenter] = useState(null);
  const [myLocation, setMyLocation] = useState(null);
  const [searchLocation, setSearchLocation] = useState(null);
  const [EVSList, setEVSList] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavoriteOpen, setIsFavoriteOpen] = useState(false);//show my favorite list
  const [isRoutesOpen, setIsRoutesOpen] = useState(true);//show my favorite list
  const [isStationInfoOpen, setIsStationInfoOpen] = useState(true);//show my favorite list
  const [warn,setWarn] = useState('');
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance,setDistance] = useState('');
  const [duration,setDuration] = useState('');
  const [steps,setSteps] = useState(null);
  const [origin,setOrigin] = useState(null);
  const [destination,setDestination] = useState(null);
  const [radius, setRadius] = useState(30);
  const [isLoadingModalOpen,setIsLoadingModalOpen] = useState(true);

  console.log('is loading modal open:',isLoadingModalOpen);
  /* helper function */
    //filter module
  const handleFilterChange = useCallback(
    (newFilters) => {
      if (allStations) {
        const filteredStations = applyFilters(allStations, newFilters);
        setEVSList(filteredStations);
      }
    },
    [allStations]
  );

  const handleRadiusChange = useCallback((event) => {
    const newRadius = event.target.value;
    setRadius(newRadius)
  }, []);

  const applyFilters = (list, filters) => {
    if (!list) return [];

    const { connectorType, chargingSpeed, provider, cost } = filters;

    const connectorTypeArray = Array.isArray(connectorType)
      ? connectorType
      : [connectorType];

    return list.filter((station) => {
      const connectorMatch =
        connectorTypeArray.some((connector) =>
          station.properties.ev_connector_types.includes(connector)
        ) || connectorType === "all";
      const chargingSpeedMatch =
        chargingSpeed.includes(String(station.properties.ev_level2_evse_num)) ||
        chargingSpeed.includes("all");
      const providerMatch =
        provider.includes(station.properties.ev_network) ||
        provider.includes("all");
      const costMatch =
        cost.includes(station.properties.ev_pricing ? "paid" : "free") ||
        cost.includes("all");

      return connectorMatch && chargingSpeedMatch && providerMatch && costMatch;
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // my favorite module
  const openMyFavorite = () => {
    setIsRoutesOpen(false);
    setIsStationInfoOpen(false);
    setIsFavoriteOpen(true);
  };

  const closeMyFavorite = () => {
    setIsFavoriteOpen(false);
  };

  // my route module
  const openRoutes = () => {
    setIsFavoriteOpen(false);
    setIsStationInfoOpen(false);
    setIsRoutesOpen(true);
  };

  const closeRoutes = () => {
    setIsRoutesOpen(false);
  };

  // my StationInfo modal
  const openStationInfo = () => {
    setIsFavoriteOpen(false);
    setIsRoutesOpen(false);
    setIsStationInfoOpen(true);
  };

  const closeStationInfo = () => {
    console.log("close Station")
    setIsStationInfoOpen(false);
  };


    //navigate to specific station
    const handleStationId = (id) => {
      const selectedStation = allStations.find((s) => s.properties.id === id);
      if (selectedStation) {
        const { coordinates } = selectedStation.geometry;
        setCenter({ lat: coordinates[1], lng: coordinates[0] });
      }
      navigate(`/map/place/${encodeURIComponent(address)}/${id}`);
    };
    
    
    
    

    //map style
  const mapOptions = {
    streetViewControl: false,
    mapId: "8a036518220c529",
    fullscreenControl: false,
  };

    //set to my location button
  const setToMyLocation = () => {
    // setIsLoadingModalOpen();
    // setTimeout(() => {
    //   setIsLoadingModalOpen(false);
    // }, 500);
    navigate(`/map/place/${encodeURIComponent("nearby")}`);
  }
  //probably can add use watchPosition feature.

    //direction
  const calculateRoute = async() =>{
    if(origin && destination){
      const directionsService = new google.maps.DirectionsService()
      const results = await directionsService.route({
        origin:origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
      })
      setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
      setSteps(results.routes[0].legs[0].steps);
    }
  }

  const getMyLocation = () =>{
    if (navigator.geolocation) {
      setWarn("");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLocation = { lat: latitude, lng: longitude };
          setMyLocation(userLocation);
          setOrigin(userLocation);
        },
        (error) => {
          console.error(error.message);
        }
      );
    }else{
      setWarn(" YOu do not have location enabled");
    }
  } 

  /* useEffect */

    //check if URL params is an address or nearby
  React.useEffect(() => { 
    if(startAddress===undefined){
      if (address === "nearby") {//this might need to change for the route search, because address can be undefine
        getMyLocation();
        setSearchLocation(null);
      } else {
        dispatch(fetchSearchAddress(address));
      }
    }else{
      if(startAddress==="nearby") {
        getMyLocation();
      }else{
        setOrigin(startAddress);
      }
      setDestination(endAddress);
    }
  }, [startAddress,address]);

  // if search specific address
  /*
  inputRadius is the search radius around your searching location, now it sets to 10 mile.
  By modifying the inputRadius, you can control the distance within which you want to search for places or points of interest.
  */
  React.useEffect(() => {
    if (searchAddress) {
      setCenter(searchAddress);
      setSearchLocation(searchAddress);
      dispatch(
        fetchNearbyStations({
          latitude: searchAddress.lat,
          longitude: searchAddress.lng,
          inputRadius: radius,
        })
      );
    }
  }, [searchAddress, radius]);

  //use neaby to search
  React.useEffect(() => {
    if (myLocation) {
      setCenter(myLocation);
      dispatch(
        fetchNearbyStations({
          latitude: myLocation.lat,
          longitude: myLocation.lng,
          inputRadius: 10,
        })
      );
    }
  }, [myLocation]);

  //fetch stations
  React.useEffect(() => {
    setEVSList(allStations);
    const station = allStations.filter((s) => {
      return s.properties.id === stationId * 1;
    });
    setSelectedStation(station[0]);
  }, [allStations, stationId]);
  
  React.useEffect(()=>{
    calculateRoute()
  },[origin,destination])

  useEffect(() => {
    // Simulate a loading delay
    setTimeout(() => {
      setIsLoadingModalOpen(false);
    }, 1500);
  }, []);
  

  /*return, base on the URL , 
    if address exist, it means URL is "/map/place/:address/",will return the result searching all EVstations, 
    else, it indicates URL is "/map/dir/:startAddress/:endAddress", will return the result searching for routes*/

    return (
      <div className="Map">
  
        {/* filter modal */}
        <button className="open-modal-button" onClick={openModal}>
          <i className="fa-solid fa-filter"></i>
        </button>
        {isModalOpen && (
          <div className="modal-map-overlay">
            <div className="modal-map">
              <div className="modal-map-content">
                <MapFilter onFilterChange={handleFilterChange} onRadiusChange={handleRadiusChange} radius={radius} closeModal={closeModal}/>
              </div>
            </div>
          </div>
        )}
  
        {/* set my location button */}
        <button className="set-mylocation-button" onClick={setToMyLocation} >
            <i className="fa-solid fa-location-dot"></i>
        </button>

        {/* show my favorite button */}
        <button className="see-my-favorite" onClick={openMyFavorite} >
          <i className="fa fa-heart" aria-hidden="true"></i>
        </button>
        {/* show direction button */}
        <button className="see-direction" disabled={isRoutesOpen===true} onClick={openRoutes} >
          <i className="fa fa-sharp fa-solid fa-turn-down fa-rotate-90"></i>
        </button>

        {/* loading Map */}
        {!isLoaded ||isLoadingModalOpen ? (
           <LoadingSpinner/>
        ) : (
          <>
          <GoogleMap
            mapContainerClassName="map-container"
            center={center}
            zoom={14}
            options={mapOptions}
          >
            {/* Favorite List Modal*/}
            {
              isFavoriteOpen&&(
                <FavoriteList onClose={closeMyFavorite}/>
              )
            }
            {/* StationInfo Modal*/}
            {
            selectedStation && isStationInfoOpen? (
                <StationInfo value={selectedStation} address={address} closeMyFavorite={closeMyFavorite} closeStationInfo={closeStationInfo}/>
            ) : (<StationsList />) /* if we have a selectdStation, we can have specific station infor. if not, should we show the list of all the nearby stations?*/
            }

            {address?
              (
                <>
                  {/* My Location Marker */}
                  {myLocation ? (
                    <Marker
                      position={myLocation}
                      icon={{
                        url: "https://cdn-icons-png.flaticon.com/512/8065/8065913.png",
                        scaledSize: new window.google.maps.Size(36, 36), // Adjust the size here
                      }}
                      zIndex={999}
                    />
                  ) : null
                  }
            
                  {/* Search Location Marker */}
                  {searchLocation ? (
                    <Marker
                      position={searchLocation}
                      icon={{
                        url: "https://cdn-icons-png.flaticon.com/512/9131/9131546.png",
                        scaledSize: new window.google.maps.Size(36, 36), // Adjust the size here
                      }}
                      zIndex={998}
                    />
                  ) : null
                  }
            
                  {/* EVSList Markers */}
                  {EVSList
                    ? EVSList.map((s) => {
                        let location = {
                          lat: s.geometry.coordinates[1],
                          lng: s.geometry.coordinates[0],
                        };
                        return (
                          <Marker
                            position={location}
                            icon={{
                              url: "https://cdn-icons-png.flaticon.com/512/5868/5868069.png",
                              scaledSize: new window.google.maps.Size(32, 32), // Adjust the size here
                            }}
                            key={s.properties.id}
                            onClick={() => handleStationId(s.properties.id)}
                          />
                        );
                      })
                    : null
                  }
                </>
              ):(
                <>
                  {directionsResponse && <DirectionsRenderer directions={directionsResponse}/>}
                  {
                    isRoutesOpen&&(
                      <RouteModal onClose={closeRoutes} steps={steps} duration={duration} distance={distance}/>
                    )
                  }
                </>
              )
            }
            
            {/* Search Bar */}
            <div className="d-flex justify-content-end p-0">
              <SearchBar/>
            </div>
          </GoogleMap>
         
          </>
        )
        }
  
      </div>
    );
 
};

export default Map;
