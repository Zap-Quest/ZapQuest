import React, { useState, useCallback, useRef, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript, DirectionsRenderer,  MarkerClusterer } from "@react-google-maps/api";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchNearbyStations, fetchSearchAddress, setToNearby } from "../store";

import "dotenv/config";
import MapFilter from "./MapFilter";
import SearchBar from "./SearchBar";
import StationInfo from "./StationInfo";
import StationsList from "./StationsLIst";
import FavoriteList from "./FavoriteList";
import RouteModal from "./RoutesModal";
import LoadingSpinner from "./LoadingSpinner";
import HelpLegend from "./HelpLegend";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Map = () => {
  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  // });

 

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
  const [isRoutesOpen, setIsRoutesOpen] = useState(true);//show Route
  const [isStationInfoOpen, setIsStationInfoOpen] = useState(true);//show StationInfo
  const [isHelpLegendOpen, setIsHelpLegendOpen] = useState(false);//show Help Legend
  const [warn,setWarn] = useState('');
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance,setDistance] = useState('');
  const [duration,setDuration] = useState('');
  const [steps,setSteps] = useState(null);
  const [origin,setOrigin] = useState(null);
  const [destination,setDestination] = useState(null);
  const [radius, setRadius] = useState(10);
  const [selectedCenter,setSelectedCenter] = useState(null);
  const [isLoadingModalOpen,setIsLoadingModalOpen] = useState(true);
  const [activeMarker, setActiveMarker] = useState(null);

  /* helper function */
    //filter module

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
    setIsHelpLegendOpen(false);
    setIsFavoriteOpen(true);
  };

  const closeMyFavorite = () => {
    setIsFavoriteOpen(false);
  };

  // my route module
  const openRoutes = () => {
    setIsFavoriteOpen(false);
    setIsStationInfoOpen(false);
    setIsHelpLegendOpen(false);
    setIsRoutesOpen(true);
  };

  const closeRoutes = () => {
    setIsRoutesOpen(false);
  };

  // my StationInfo modal
  const openStationInfo = () => {
    setIsFavoriteOpen(false);
    setIsRoutesOpen(false);
    setIsHelpLegendOpen(false);
    setIsStationInfoOpen(true);
  };

  const closeStationInfo = () => {
    console.log("close Station")
    setIsStationInfoOpen(false);
  };

  // help Legend module
  const openHelpLegend = () => {
  setIsFavoriteOpen(false);
  setIsStationInfoOpen(false);
  setIsRoutesOpen(false);
  setIsHelpLegendOpen(true);
  };

  const closeHelpLegend = () => {
    setIsHelpLegendOpen(false);
  };
 
  //handle copy URL
  const handleCopyURL = async() =>{
    const currentURL = window.location.href;
    try{
      navigator.clipboard.writeText(currentURL);
      toast.success(`URL copied to clipboard`);
    }catch(error){
      console.error("Failed to copy URL to clipboard:", error);
    }
    console.log("copy");
  }


  //navigate to specific station
  const handleStationId = (id) => {
    const selectedStation = allStations.find((s) => s.properties.id === id);
    if (selectedStation) {
      const { coordinates } = selectedStation.geometry;
      setCenter({ lat: coordinates[1], lng: coordinates[0] });
      setIsFavoriteOpen(false);
      setIsRoutesOpen(false);
      setIsStationInfoOpen(true);
      setSelectedCenter({ lat: coordinates[1]-0.00005, lng: coordinates[0] });
      setActiveMarker(id);
    }
    navigate(`/map/place/${encodeURIComponent(address)}/${id}`);
  };

 
  //map style
  const mapOptions = {
    streetViewControl: false,
    mapId: "8a036518220c529",
    fullscreenControl: false,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
    },
  };

  //set to my location button
  const setToMyLocation = () => {
    // setIsLoadingModalOpen();
    // setTimeout(() => {
    //   setIsLoadingModalOpen(false);
    // }, 500);
    toast.success(`Direct to My Location`);
    navigate(`/map/place/${encodeURIComponent("nearby")}`);
  }

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
  }, [startAddress, address, radius]);

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
          inputRadius: radius,
        })
      );
    }
  }, [myLocation, radius]);

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
    }, 3000);
  }, []);
  
  const handleFilterChange = useCallback((newFilters) => {
    if (allStations) {
      const filteredStations = applyFilters(allStations, newFilters);
      setEVSList(filteredStations);
    }
  }, [allStations]);

const handleRadiusChange = useCallback((event) => {
  const newRadius = event.target.value;
  setRadius(newRadius)
}, []);

const applyFilters = (list, filters) => {
  if (!list) return [];

  const { connectorType, chargingSpeed, provider, cost } = filters;

  return list.filter((station) => {
    const connectorMatch =
      !connectorType ||
      connectorType.includes("all") ||
      connectorType.includes(station.properties.ev_connector_types);
    const chargingSpeedMatch =
      !chargingSpeed ||
      chargingSpeed.includes("all") ||
      chargingSpeed.includes(String(station.properties.ev_level2_evse_num));
    const providerMatch =
      !provider ||
      provider.includes("all") ||
      provider.includes(station.properties.ev_network);
    const costMatch =
      !cost ||
      cost.includes("all") ||
      (station.properties.ev_pricing && cost.includes("paid")) ||
      (!station.properties.ev_pricing && cost.includes("free"));

    return connectorMatch && chargingSpeedMatch && providerMatch && costMatch;
  });
};



  /*return, base on the URL , 
    if address exist, it means URL is "/map/place/:address/",will return the result searching all EVstations, 
    else, it indicates URL is "/map/dir/:startAddress/:endAddress", will return the result searching for routes*/

    return (
      <div className="Map">
        
  
        {/* filter modal */}
        <button className="open-modal-button map-btn" onClick={openModal}>
          <i className="fa-solid fa-filter"></i>
        </button>
        {isModalOpen && (
          <div className="modal-map-overlay">
            <div className="modal-map">
              <div className="modal-map-content">
                <MapFilter
                  onFilterChange={handleFilterChange}
                  onRadiusChange={handleRadiusChange}
                  radius={radius}
                  closeModal={closeModal}
                />
              </div>
            </div>
          </div>
        )}
  
        {/* set my location button */}
        <button className="set-mylocation-button map-btn" onClick={setToMyLocation} style={{fontSize:"115%"}}>
            <i className="fa-solid fa-location-dot"></i>
        </button>
        {/* see-station */}
        <button className="see-station map-btn" onClick={openStationInfo}>
          <i className="fa-solid fa-charging-station"></i>
        </button>
        {/* show direction button */}
        <button className="see-direction map-btn" disabled={isRoutesOpen===true} onClick={openRoutes} style={{fontSize:"115%"}}>
          <i className="fa fa-sharp fa-solid fa-turn-down fa-rotate-90"></i>
        </button>

        {/* copy URL */}
        <button className="copy-URL map-btn" onClick={handleCopyURL} >
          <i className="fa-solid fa-share-nodes"></i>
        </button>

        {/* see-help */}
        <button className="see-help map-btn" onClick={openHelpLegend}>
          <i className="fa-sharp fa-solid fa-question"></i>
        </button>
        {/* show my favorite button */}
        <button className="see-my-favorite map-btn" onClick={openMyFavorite} >
          <i className="fa fa-heart" aria-hidden="true"></i>
        </button>

        {/* loading Map */}
        {/*!isLoaded ||*/isLoadingModalOpen ? (
           <LoadingSpinner/>
        ) : (
          <>
            <GoogleMap
              mapContainerClassName="map-container"
              center={center}
              zoom={14}
              options={mapOptions}
            >
              {/* Search Bar */}
              <div className="d-flex justify-content-end p-0">
                <SearchBar/>
              </div>
              {/* Favorite List Modal*/}
              {
                isFavoriteOpen&&(
                  <FavoriteList onClose={closeMyFavorite} openStationInfo={openStationInfo}/>
                )
              }
              {/* StationInfo Modal*/}
              {
              selectedStation && isStationInfoOpen? (
                  <StationInfo value={selectedStation} address={address} closeMyFavorite={closeMyFavorite} closeStationInfo={closeStationInfo}  openRoutes={openRoutes}/>
              ) : (<StationsList />) /* if we have a selectdStation, we can have specific station infor. if not, should we show the list of all the nearby stations?*/
              }
              {/* HelpLegend Modal*/}
              {
                isHelpLegendOpen&&(
                  <HelpLegend closeHelpLegend={closeHelpLegend} />
                )
              }

              {address?
                (
                  <>
                    {/* My Location Marker */}
                    {myLocation ? (
                      <Marker
                        position={myLocation}
                        icon={{
                          url: "https://cdn-icons-png.flaticon.com/512/5501/5501965.png",//"https://cdn-icons-png.flaticon.com/512/8065/8065913.png"
                          scaledSize: new window.google.maps.Size(36, 36), // Adjust the size here
                        }}
                        animation={google.maps.Animation.BOUNCE}
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
                        animation={google.maps.Animation.BOUNCE}
                      />
                    ) : null
                    }
              
                    {/* EVSList Markers */}
                    {/* EVSList Markers */}
                    {EVSList && EVSList.length > 0
                      ? EVSList.map((s) => {
                          let location = {
                            lat: s.geometry.coordinates[1],
                            lng: s.geometry.coordinates[0],
                          };
                          return (
                            <Marker
                              position={location}
                              icon={{
                                url: '../static/images/ElecMapPin.png',/*"https://cdn-icons-png.flaticon.com/512/5868/5868069.png", */
                                scaledSize: new window.google.maps.Size(23,30), // Adjust the size here
                              }}
                              key={s.properties.id}
                              animation = {activeMarker === s.properties.id?window.google.maps.Animation.BOUNCE: null}
                              onClick={() => handleStationId(s.properties.id)}
                            />
                          );
                        })
                      : null
                    }
                    {selectedCenter&&(
                            <Marker
                              position={selectedCenter}
                              icon={{
                                url: "https://cdn-icons-png.flaticon.com/512/686/686751.png",
                                scaledSize: new window.google.maps.Size(20, 10), // Adjust the size here
                                opacity: 0.1,
                              }}
                              zIndex={5}
                            />
                          )
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
              
              
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </GoogleMap>
          
          </>
        )}
      </div>
    );
};

export default Map;
