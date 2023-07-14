import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilter, resetFilter } from "../store/filter";
import Select from "react-select";

const MapFilter = ({
  filteredMarkers,
  onFilterChange,
  closeModal,
  onRadiusChange,
  radius,
  allStations,
  setFilteredMarkers,
}) => {
  const connectorTypeOptions = [
    { value: "all", label: "All" },
    { value: "J1772", label: "J1772" },
    { value: "J1772COMBO", label: "CCS" },
    { value: "TESLA", label: "TESLA" },
    { value: "CHADEMO", label: "CHAdeMO" },
    { value: "NEMA515", label: "NEMA 5-15" },
    { value: "NEMA520", label: "NEMA 5-20" },
    { value: "NEMA1450", label: "NEMA 14-50" },
  ];

  const chargingSpeedOptions = [
    { value: "all", label: "All" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "dc_fast", label: "DC Fast" },
  ];

  const providerOptions = [
    { value: "all", label: "All" },
    { value: "Tesla", label: "Tesla" },
    { value: "ChargePoint Network", label: "ChargePoint" },
    { value: "Electrify America", label: "Electrify America" },
    { value: "EVGATEWAY", label: "EVGATEWAY" },
    { value: "eVgo Network", label: "eVgo Network" },
    { value: "Volta", label: "Volta" },
    { value: "Blink Network", label: "Blink Network" },
    { value: "EV Connect", label: "EV Connect" },
    { value: "FLO", label: "FLO" },
  ];

  const costOptions = [
    { value: "all", label: "All" },
    { value: "free", label: "Free" },
    { value: "paid", label: "Paid" },
  ];

  const selectedFilters = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setFilter({
        ...selectedFilters,
        radius: radius,
      })
    );
  }, [dispatch, radius]);

  const handleFilterChange = (selectedOptions, filterType) => {
    if (filterType === "radius") {
      onRadiusChange(selectedOptions);
    } else {
      let updatedOptions;
      if (
        selectedOptions.length === 0 ||
        selectedOptions.some((option) => option.value === "all")
      ) {
        updatedOptions = "all";
      } else {
        updatedOptions = selectedOptions.map((option) => option.value);
      }
  
      dispatch(
        setFilter({
          ...selectedFilters,
          [filterType]: updatedOptions,
        })
      );
  
      const filteredMarkers = applyFilters(updatedOptions);
      onFilterChange(filteredMarkers);
      setFilteredMarkers(filteredMarkers);
    }
  };
  
  const applyFilters = (updatedOptions) => {
    if (!allStations) return [];
  
    const filteredMarkers = allStations.filter((station) => {
      if (updatedOptions.includes(station.properties.connectorType)) {
        return true;
      }
      return false;
    });
  
    return filteredMarkers;
  };
  
  const handleReset = () => {
    dispatch(resetFilter());
    onRadiusChange(10);
  };

  return (
    <div className="map-filter">
      <div className="text-center">
        <h3>Filters</h3>
      </div>
      <div className="radius-input mb-2">
        <label htmlFor="radius">Radius:</label>
        <input
          type="number"
          id="radius"
          value={radius}
          className="form-control"
          onChange={(event) => onRadiusChange(event.target.value)}
        />
      </div>
      <div className="filter-dropdown">
        <Select
          options={connectorTypeOptions}
          isMulti
          placeholder="Connector Type"
          value={
            Array.isArray(selectedFilters.connectorType)
              ? selectedFilters.connectorType.map((option) =>
                  connectorTypeOptions.find((item) => item.value === option)
                )
              : []
          }
          onChange={(selected) =>
            handleFilterChange(selected, "connectorType")
          }
          className="mb-2"
        />
        <Select
          options={chargingSpeedOptions}
          isMulti
          placeholder="Charging Speed"
          value={
            Array.isArray(selectedFilters.chargingSpeed)
              ? selectedFilters.chargingSpeed.map((option) =>
                  chargingSpeedOptions.find((item) => item.value === option)
                )
              : []
          }
          onChange={(selected) =>
            handleFilterChange(selected, "chargingSpeed")
          }
          className="mb-2"
        />
        <Select
          options={providerOptions}
          isMulti
          placeholder="Provider"
          value={
            Array.isArray(selectedFilters.provider)
              ? selectedFilters.provider.map((option) =>
                  providerOptions.find((item) => item.value === option)
                )
              : []
          }
          onChange={(selected) => handleFilterChange(selected, "provider")}
          className="mb-2"
        />
        <Select
          options={costOptions}
          isMulti
          placeholder="Cost"
          value={
            Array.isArray(selectedFilters.cost)
              ? selectedFilters.cost.map((option) =>
                  costOptions.find((item) => item.value === option)
                )
              : []
          }
          
          onChange={(selected) => handleFilterChange(selected, "cost")}
          className="mb-2"
        />
        <button
          style={{ width: "100px" }}
          className="btn btn-dark default-button mr-5"
          onClick={closeModal}
        >
          Close
        </button>
        <button
          style={{ width: "100px" }}
          className="btn btn-dark default-button mr-5"
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          style={{ width: "100px" }}
          className="btn btn-dark default-button ml-5"
          onClick={applyFilters}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default MapFilter;
