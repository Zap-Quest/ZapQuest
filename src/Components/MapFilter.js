import React, { useState } from "react";
import Select from "react-select";

const MapFilter = ({ onFilterChange, closeModal, onRadiusChange, radius }) => {
  const connectorTypeOptions = [
    { value: "J1772", label: "J1772" },
    { value: "TESLA", label: "TESLA" },
  ];

  const chargingSpeedOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "dc_fast", label: "DC Fast" },
  ];

  const providerOptions = [
    { value: "Tesla", label: "Tesla" },
    { value: "Electrify America", label: "Electrify America" },
    { value: "CHARGEUP", label: "ChargePoint" },
    { value: "eVgo Network", label: "eVgo Network" },
    { value: "Volta", label: "Volta" },
    { value: "Blink Network", label: "Blink Network" },
    { value: "EVGATEWAY", label: "EVGATEWAY" },
    { value: "EV Connect", label: "EV Connect" },
    { value: "FLO", label: "FLO" },
  ];

  const costOptions = [
    { value: "free", label: "Free" },
    { value: "paid", label: "Paid" },
  ];

  const [selectedFilters, setSelectedFilters] = useState({
    connectorType: "all",
    chargingSpeed: "all",
    provider: "all",
    cost: "all",
    radius: 100,
  });

  const handleFilterChange = (selectedOptions, filterType) => {
    if (filterType === 'radius') {
      onRadiusChange(selectedOptions);
    } else {
      setSelectedFilters({
        ...selectedFilters,
        [filterType]: selectedOptions ? selectedOptions.map((option) => option.value) : "all",
      });
    }
  };

  const applyFilters = () => {
    onFilterChange({...selectedFilters, radius: radius})
    closeModal();
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
          defaultValue={radius}
          className="form-control"
          onChange={onRadiusChange}
        />
      </div>
      <div className="filter-dropdown">
        <Select
          options={connectorTypeOptions}
          isMulti
          placeholder="Connector Type"
          onChange={(selected) => handleFilterChange(selected, "connectorType")}
          className="mb-2"
        />
        <Select
          options={chargingSpeedOptions}
          isMulti
          placeholder="Charging Speed"
          onChange={(selected) => handleFilterChange(selected, "chargingSpeed")}
          className="mb-2"
        />
        <Select
          options={providerOptions}
          isMulti
          placeholder="Provider"
          onChange={(selected) => handleFilterChange(selected, "provider")}
          className="mb-2"
        />
        <Select
          options={costOptions}
          isMulti
          placeholder="Cost"
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
