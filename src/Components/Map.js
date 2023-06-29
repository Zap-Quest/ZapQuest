import React, { useState, useCallback } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchNearbyStations, fetchSearchAddress, setToNearby } from "../store";

import "dotenv/config";
import MapFilter from "./MapFilter";
import StationModal from "./StationModal";

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [center, setCenter] = useState(null);
  const [myLocation, setMyLocation] = useState(null);
  const [searchLocation, setSearchLocation] = useState(null);
  const [EVSList, setEVSList] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomParameter, setZoomParameter] = useState(15);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchAddress, allStations } = useSelector((state) => state);
  const { address, stationId } = useParams();

  const handleFilterChange = useCallback(
    (newFilters) => {
      if (allStations) {
        const filteredStations = applyFilters(allStations, newFilters);
        setEVSList(filteredStations);
      }
    },
    [allStations]
  );

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

  //check if URL is an address or nearby
  React.useEffect(() => {
    if (address === "nearby") {
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
    } else {
      dispatch(fetchSearchAddress(address));
    }
  }, [address]);

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
          inputRadius: 10,
        })
      );
    }
  }, [searchAddress]);

  //if we use neaby to search
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

  //navigate to specific station
  const handleStationId = (id) => {
    navigate(`/map/${encodeURIComponent(address)}/${id}`);
  };

  //map style
  const mapOptions = {
    streetViewControl: false,
    mapId: "8a036518220c529",
    fullscreenControl: false,
  };

  console.log("selected station:", selectedStation);
  return (
    <div className="Map">
      <button className="open-modal-button" onClick={openModal}>
        <i class="fa-solid fa-filter"></i>
      </button>
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
          zoom={14}
          options={mapOptions}
        >
          {myLocation ? (
            <Marker
              position={myLocation}
              icon={{
                url: "https://cdn-icons-png.flaticon.com/512/8065/8065913.png",
                scaledSize: new window.google.maps.Size(36, 36), // Adjust the size here
              }}
              zIndex={999}
            />
          ) : null}

          {searchLocation ? (
            <Marker
              position={searchLocation}
              icon={{
                url: "https://cdn-icons-png.flaticon.com/512/9131/9131546.png",
                scaledSize: new window.google.maps.Size(36, 36), // Adjust the size here
              }}
              zIndex={998}
            />
          ) : null}

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
            : null}
        </GoogleMap>
      )}
      {
        selectedStation ? (
          <div>
            <p>{`${selectedStation.properties.street_address}, ${selectedStation.properties.city}`}</p>
            <p>{`Charging points: ${selectedStation.properties.ev_connector_types}`}</p>
            <p>{`Tel: ${selectedStation.properties.station_phone}`}</p>
          </div>
        ) : null /* if we have a selectdStation, we can have specific station infor. if not, should we show the list of all the nearby stations?*/
      }
      ;
    </div>
  );
};
export default Map;
